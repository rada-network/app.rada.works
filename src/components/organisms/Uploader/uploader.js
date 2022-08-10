import React, { useEffect } from 'react';
import { shape, string } from 'prop-types';
import classes from './uploader.module.css';
import { useTranslation } from 'next-i18next';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { DragDrop, useUppy } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import BrowserPersistence from '../../../utils/simplePersistence';

const Uploader = (props) => {
  const {
    uploadEndpoint = 'https://tusd.tusdemo.net/files',
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

  const uppy = useUppy(() => {
    return new Uppy({
      id: 'job-attachments',
      autoProceed: true,
      allowMultipleUploadBatches: true,
      debug: false,
      restrictions: {
        maxNumberOfFiles: 8,
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
      // store: new DefaultStore(),
      // logger: justErrorsLogger,
      // infoTimeout: 5000
    }).use(Tus, { endpoint: uploadEndpoint });
  });
  uppy.on('upload', (data) => {
    setUploadingState();
  });
  uppy.on('upload-success', (file, response) => {
    updatePreview(t, file, response.uploadURL);
    addUploadedFiles(file.id, response.uploadURL);
  });
  uppy.on('complete', (result) => {
    cleanUploadingState();
  });

  useEffect(() => {
    //refresh uploaded files from local storage
    const storage = new BrowserPersistence();
    storage.removeItem('attachmentFiles');

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

const updatePreview = (t, file, uploadedUrl) => {
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
      document.getElementById(file.id).remove();
      removeUploadedFile(file.id);
    };
    item.appendChild(rmBtn);
  }

  document.getElementById('preview-container').appendChild(item);
};

const addUploadedFiles = (id, url) => {
  const storage = new BrowserPersistence();
  const keyName = 'attachmentFiles';
  let attachmentFiles = storage.getItem(keyName);
  if (attachmentFiles === undefined) {
    attachmentFiles = [];
  }
  // check exist
  if (attachmentFiles.length) {
    const found = attachmentFiles.some((el) => el.id === id);
    if (!found) {
      attachmentFiles.push({
        id,
        url
      });
    }
  } else {
    attachmentFiles.push({
      id,
      url
    });
  }
  //save
  storage.setItem(keyName, attachmentFiles, 24 * 60 * 60);
  // console.log(attachmentFiles);
};

const removeUploadedFile = (id) => {
  const storage = new BrowserPersistence();
  const keyName = 'attachmentFiles';
  const uploadedFiles = storage.getItem(keyName);
  const newFiles = uploadedFiles.filter((item) => {
    return item.id !== id;
  });
  storage.setItem(keyName, newFiles);
  // console.log(newFiles);
};

Uploader.propTypes = {
  classes: shape({
    root: string
  })
};

export default Uploader;
