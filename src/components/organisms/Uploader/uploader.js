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
import {
  importFileFunc,
  deleteFileFunc
} from '../../../hooks/CreateJob/createJobForm.gql';

const Uploader = (props) => {
  const {
    id = 'upload-files',
    storageKeyName = 'uploadedFiles',
    // tusUploadEndpoint = 'http://127.0.0.1:8585',
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

  const addFile = (file) => {
    const storage = new BrowserPersistence();
    let uploadedFiles = storage.getItem(storageKeyName);
    if (uploadedFiles === undefined) {
      uploadedFiles = [];
    }
    uploadedFiles.push(file);
    storage.setItem(storageKeyName, uploadedFiles, 24 * 60 * 60);
  };

  const uppy = useUppy(() => {
    return new Uppy({
      id,
      autoProceed: true,
      allowMultipleUploadBatches: true,
      debug: true,
      restrictions: {
        allowedFileTypes,
        maxNumberOfFiles,
        maxFileSize,
        minFileSize
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
    setTimeout(function () {
      // import as directus file
      importFileFunc({
        url: response.uploadURL,
        data: {
          title: file.name,
          type: file.type,
          storage: 'local',
          folder: {
            id: '39561e14-335c-4f11-b6bb-33a9814c67e0',
            name: 'attachments',
            parent: {
              id: '9eb6ae9d-acce-4b44-ab23-2b660fb48e01',
              name: 'job'
            }
          },
          filename_download: file.name,
          uploaded_on: new Date(),
          modified_on: new Date()
        }
      }).then(function (rs) {
        console.log(rs);

        const directusFile = {
          id: rs.data.import_file.id,
          storage: rs.data.import_file.storage,
          filename_download: rs.data.import_file.filename_download,
          uploaded_on: rs.data.import_file.uploaded_on,
          modified_on: rs.data.import_file.modified_on
        };
        file.directus_file = directusFile;

        addFile(file.directus_file);

        updatePreview(
          t,
          storageKeyName,
          'preview-container',
          uppy,
          file,
          response.uploadURL
        );
      });
    }, 1000);
  });
  uppy.on('complete', (result) => {
    cleanUploadingState();
  });

  useEffect(() => {
    return () => {
      uppy.reset();
      uppy.close({ reason: 'unmount' });
    };
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
  if (!document.getElementById(file.directus_file.id)) {
    // preview item
    const item = document.createElement('li');
    item.id = file.directus_file.id;
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
        //delete the related directus file
        deleteFileFunc(file.directus_file.id).then(function (rs) {
          console.log(rs);

          // remove file from uppy
          uppy.removeFile(file.id);

          //delete from local storage
          const storage = new BrowserPersistence();
          const uploadedFiles = storage.getItem(storageKeyName);
          if (uploadedFiles) {
            const newIds = uploadedFiles.filter((val) => {
              return val !== file.directus_file.id;
            });
            storage.setItem(storageKeyName, newIds);
          }

          //clean preview element on DOM
          document.getElementById(file.directus_file.id).remove();
        });
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
