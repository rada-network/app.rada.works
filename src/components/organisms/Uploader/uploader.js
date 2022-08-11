import React, { useEffect } from 'react';
import { shape, string } from 'prop-types';
import classes from './uploader.module.css';
import { useTranslation } from 'next-i18next';
import Uppy from '@uppy/core';
import { DragDrop, useUppy } from '@uppy/react';
import Tus from '@uppy/tus';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import BrowserPersistence from '../../../utils/simplePersistence';

const Uploader = (props) => {
  const {
    storageKeyName = 'attachmentFiles',
    tusUploadEndpoint = 'http://127.0.0.1:8585/uploads',
    allowedFileTypes = [
      'image/*',
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.pdf',
      '.zip',
      '.gz',
      '.tar.gz'
    ]
  } = props;

  const { t } = useTranslation('common');

  const storage = new BrowserPersistence();

  const uppy = useUppy(() => {
    return new Uppy({
      id: 'job-attachments',
      autoProceed: true,
      allowMultipleUploadBatches: true,
      debug: true,
      restrictions: {
        maxNumberOfFiles: 5,
        maxFileSize: 3000000, //3MB
        minFileSize: 1024, //1KB
        allowedFileTypes
        // maxTotalFileSize: null,
        // minNumberOfFiles: null,
        // requiredMetaFields: [],
      }
      // meta: {},
      // onBeforeFileAdded: (currentFile, files) => currentFile,
      // onBeforeUpload: (files) => {},
      // locale: {},
      // infoTimeout: 5000
    }).use(Tus, {
      endpoint: tusUploadEndpoint,
      onError(error) {
        console.log('Failed because: ' + error);
      }
    });
  });
  uppy.on('upload', (data) => {
    setUploadingState();
  });
  uppy.on('upload-success', (file, response) => {
    updatePreview(t, storageKeyName, uppy, file, response.uploadURL);
  });
  uppy.on('complete', (result) => {
    cleanUploadingState();
    //save uploaded file for other contexts
    storage.setItem(storageKeyName, uppy.getFiles(), 24 * 60 * 60);
  });

  useEffect(() => {
    //reset
    uppy.reset();
    storage.removeItem(storageKeyName);
    return () => uppy.close({ reason: 'unmount' });
  }, [uppy]);

  const child = (
    <div id={`uploader-container`} className={`${classes.uploaderContainer}`}>
      <div className={`w-1/4 block`}>
        <DragDrop
          uppy={uppy}
          locale={{
            strings: {
              dropHereOr: t('Drop and drop file here or click to %{browse}'),
              browse: t('browse')
            }
          }}
        />
      </div>
      <div className={`w-3/4 block order-last`}>
        <ul
          id={`preview-container`}
          className={`${classes.previewContainer}`}
        />
      </div>
    </div>
  );

  return <div className={`${classes.root}`}>{child}</div>;
};

const setUploadingState = () => {
  const uploaderContainer = document.getElementById('uploader-container');
  uploaderContainer.className = uploaderContainer.className + ' uploading';
};

const cleanUploadingState = () => {
  setTimeout(function () {
    const uploaderContainer = document.getElementById('uploader-container');
    uploaderContainer.className = uploaderContainer.className.replace(
      'loading',
      ''
    );
  }, 1000);
};

const updatePreview = (t, storageKeyName, uppy, file, uploadedUrl) => {
  if (!document.getElementById(file.id)) {
    // preview item
    const item = document.createElement('li');
    item.id = file.id;
    item.className = classes.previewItem;

    if (/(jpe?g|png|gif|bmp)$/i.test(file.extension)) {
      // preview thumb
      const img = new Image();
      img.width = 100;
      img.alt = file.name;
      img.src = uploadedUrl;
      img.className = classes.thumb;
      item.appendChild(img);
    } else {
      const fileLink = document.createElement('a');
      fileLink.href = uploadedUrl;
      fileLink.target = '_blank';
      fileLink.className = classes.fileAttachment;
      const fileLinkText = document.createTextNode(file.name);
      fileLink.appendChild(fileLinkText);
      item.appendChild(fileLink);
    }
    //remove button
    if (item) {
      const rmBtn = document.createElement('span');
      rmBtn.className = classes.btnDelete;
      const rmBtnText = document.createTextNode(t('Remove'));
      rmBtn.appendChild(rmBtnText);
      rmBtn.onclick = (e) => {
        uppy.removeFile(file.id);

        const storage = new BrowserPersistence();
        storage.setItem(storageKeyName, uppy.getFiles(), 24 * 60 * 60);

        document.getElementById(file.id).remove();
      };
      item.appendChild(rmBtn);
    }

    document.getElementById('preview-container').appendChild(item);
  }
};

Uploader.propTypes = {
  classes: shape({
    root: string
  })
};

export default Uploader;
