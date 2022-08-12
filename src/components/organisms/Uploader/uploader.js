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
    id = 'upload-files',
    storageKeyName = 'uploadedFiles',
    //tusUploadEndpoint = 'http://127.0.0.1:8585',
    tusUploadEndpoint = 'https://tusd.tusdemo.net/files/',
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
    ],
    maxNumberOfFiles = 5,
    maxFileSize = 3000000, // 3M
    minFileSize = 1024 //1KB
  } = props;

  const { t } = useTranslation('common');

  const storage = new BrowserPersistence();

  const uppy = useUppy(() => {
    return new Uppy({
      id,
      autoProceed: true,
      allowMultipleUploadBatches: true,
      debug: true,
      restrictions: {
        allowedFileTypes,
        maxNumberOfFiles,
        maxFileSize, //3MB
        minFileSize //1KB
      }
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
    updatePreview(
      t,
      storageKeyName,
      'preview-container',
      uppy,
      file,
      response.uploadURL
    );
  });
  uppy.on('complete', (result) => {
    //saving uploaded files for other contexts
    storage.setItem(storageKeyName, uppy.getFiles(), 24 * 60 * 60);
    cleanUploadingState();
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
              dropHereOr: t('Drag and drop file here or click to %{browse}'),
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

const ellipsify = (props) => {
  if (typeof props.start === 'undefined') props.start = 5;
  if (!props.end) props.end = 3;
  const { str, start, end } = props;
  if (str.length > start) {
    return str.slice(0, start) + '...' + str.slice(str.length - end);
  }
  return str;
};

const updatePreview = (
  t,
  storageKeyName,
  previewElId,
  uppy,
  file,
  uploadedUrl
) => {
  if (!document.getElementById(file.id)) {
    // preview item
    const item = document.createElement('li');
    item.id = file.id;
    item.className = classes.previewItem;

    if (/(jpe?g|png|gif|bmp)$/i.test(file.extension)) {
      // create thumb
      const img = new Image();
      img.width = 100;
      img.alt = file.name;
      img.src = uploadedUrl;
      img.className = classes.thumb;
      item.appendChild(img);
    }

    // create file name with link
    const fileLink = document.createElement('a');
    fileLink.href = uploadedUrl;
    fileLink.target = '_blank';
    fileLink.className = classes.fileAttachment;
    const fileLinkText = document.createTextNode(
      ellipsify({ str: file.name, start: 5, end: 4 })
    );
    fileLink.appendChild(fileLinkText);
    item.appendChild(fileLink);

    // create remove button
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

    document.getElementById(previewElId).appendChild(item);
  }
};

Uploader.propTypes = {
  classes: shape({
    root: string
  })
};

export default Uploader;
