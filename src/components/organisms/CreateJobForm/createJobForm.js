import React, { Fragment } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslation } from 'next-i18next';
import { shape, string } from 'prop-types';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import classes from './createJobForm.module.css';

const CreateJobForm = (props) => {
  const { t } = useTranslation('common');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted...');
  };

  return (
    <Fragment>
      <div className={classes.formWrapper}>
        <form onSubmit={onSubmit}>
          <div className="w-full mb-6">
            <label className={classes.formLabel}>{t('Title')}</label>
            <Input className={classes.formInput} type="text" required />
          </div>
          <div className="w-full mb-6">
            <label className={classes.formLabel}>{t('Overview')}</label>
            <TextareaAutosize
              className={classes.textArea}
              title={t('Overview')}
              placeholder={t('Overview')}
            />
          </div>
          <div className="w-full mb-6">
            <label className={classes.formLabel}>{t('Details')}</label>
            <TextareaAutosize
              className={classes.textArea}
              title={t('Details')}
              placeholder={t('Details')}
            />
          </div>
          <Button type="submit" className={classes.btnSubmit}>
            {t('Submit Job')}
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

CreateJobForm.propTypes = {
  classes: shape({
    root: string,
  }),
};

export default CreateJobForm;
