import React, { Fragment, useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Form } from 'informed';
import { isRequired, hasLengthAtMost } from '../../../utils/formValidators';
import combine from '../../../utils/combineValidators';
import FormError from '../../atoms/FormError';
import Field from '../../atoms/Field';
import TextInput from '../../atoms/TextInput';
import TextArea from '../../atoms/TextArea';
import Button from '../../atoms/Button';
import Checkbox from '../../atoms/Checkbox';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import TINY_MCE_CONFIG from './tinyMCE.config';
import Uploader from '../../organisms/Uploader';
import { useCreateJobForm } from '../../../hooks/CreateJob';
import { useStyle } from '../../classify';
import Success from './success';
import defaultClasses from './createJobForm.module.css';

const CreateJobForm = (props) => {
  const { classes: propClasses, jobId } = props;

  const classes = useStyle(defaultClasses, propClasses);

  const { plugins, toolbar } = TINY_MCE_CONFIG;

  const { t } = useTranslation('createjob');

  const [currentJob, setCurrentJob] = useState({
    id: null,
    title: null
  });

  const {
    errors,
    handleSubmit,
    handleCancel,
    isBusy,
    setFormApi,
    formApiRef,
    detailsEditorRef,
    initialValues,
    visualStyleFieldData,
    response
  } = useCreateJobForm({ jobId });

  //generate visual style selection
  const visualStyleField = visualStyleFieldData
    ? visualStyleFieldData.fields_by_name.meta.options.choices.map(
        (option, key) => (
          <li key={`${key}`}>
            <Checkbox
              id={`visual_style_${key}`}
              field={`visual_style__${option.value}`}
              value={`${option.value}`}
              label={option.text}
            />
          </li>
        )
      )
    : null;

  useEffect(() => {
    if (response) {
      if (response.update_job_item) {
        toast.success(
          t("You have just updated job's information successfully."),
          {}
        );
        setCurrentJob({
          id: response.update_job_item.id,
          title: response.update_job_item.title
        });
        response.update_job_item = null;
      } else if (response.create_job_item) {
        toast.success(t("You have just created a job's successfully."), {});
        setCurrentJob({
          id: response.create_job_item.id,
          title: response.create_job_item.title
        });
        response.create_job_item = null;
      }
    }

    return true;
  }, [response]);

  let child = null;
  if (currentJob.id) {
    child = <Success jobId={currentJob.id} jobTitle={currentJob.title} />;
  } else {
    if (!isBusy) {
      child = (
        <div className={`${classes.root}`}>
          <h2 className={`${classes.pageTitle}`}>{t('Job introduction')}</h2>

          <FormError allowErrorMessages errors={Array.from(errors.values())} />

          <Form
            getApi={setFormApi}
            className={classes.form}
            initialValues={initialValues}
            onSubmit={() =>
              handleSubmit({
                description: detailsEditorRef.current.getContent(),
                ...formApiRef.current.getValues()
              })
            }
          >
            <div className={`${classes.fields}`}>
              <Field id="job-title" label={t('Job title')}>
                <TextInput
                  autoComplete="title"
                  field="title"
                  id="job-title"
                  validate={isRequired}
                  validateOnBlur
                  mask={(value) => value && value.trim()}
                  maskOnBlur={true}
                  placeholder={t('E.g 10000 NFT in 2d/3d')}
                />
              </Field>
              <Field id="job-short-desc" label={t('Introduce your job')}>
                <TextArea
                  autoComplete="short-desc"
                  field="short_desc"
                  id="job-short-desc"
                  validate={combine([isRequired, [hasLengthAtMost, 200]])}
                  validateOnBlur
                  mask={(value) => value && value.trim()}
                  maskOnBlur={true}
                  placeholder={t('Enter the introduce')}
                />
                <span className={classes.tip}>
                  {t(
                    'Introducing an overview of the job as well as the organizer personally so that participant can better understand you.'
                  )}
                </span>
              </Field>
              <Field id="job-duration" label={t('Job Duration')}>
                <TextInput
                  autoComplete="duration"
                  field="duration"
                  id="job-duration"
                  validate={isRequired}
                  validateOnBlur
                  mask={(value) => value && parseInt(value)}
                  maskOnBlur={true}
                  placeholder={t('E.g 7')}
                />
                <span className={classes.unit}>{t('days')}</span>
              </Field>
            </div>
            <div className={`${classes.fields}`}>
              <h3 className={classes.priceTitle}>
                {t('What is your budget for this services?')}
              </h3>
              <Field id="job-price" label={t('Price')}>
                <TextInput
                  autoComplete="price"
                  field="price"
                  id="job-price"
                  validate={isRequired}
                  validateOnBlur
                  mask={(value) => value && parseFloat(value)}
                  maskOnBlur={true}
                  placeholder={t('E.g 0.02')}
                />
              </Field>
              <span className={classes.tip}>
                {t('Price does not include service fee.')}
              </span>
            </div>
            <div className={`${classes.fields}`}>
              <h3 className={classes.visualTitle}>{t('Visual style')}</h3>
              <h4 className={`${classes.visualSubTitle}`}>
                {t('In what type of art  do you want?')}
              </h4>
              <span className={classes.tip}>
                {t(
                  'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.'
                )}
              </span>
              <Field id="job-visual-style">
                <ul className={classes.visualStyleOptions}>
                  {visualStyleField}
                </ul>
              </Field>

              <h4 className={`${classes.visualSubTitle}`}>
                {t('Your suggestion for the style of the artwork?')}
              </h4>
              <span className={classes.tip}>
                {t('Drag or choose your file to upload')}
              </span>
              <Field id="job-attachments">
                <Uploader />
              </Field>
              <span className={classes.tip}>
                {t(
                  'E.g. Your favorite artwork, photos, illustration, content, layout ideas etc...'
                )}
              </span>
            </div>
            <div className={`${classes.fields}`}>
              <h3 className={classes.detailsTitle}>{t('Other')}</h3>
              <Field
                id="job-description"
                label={t('Is there any detail you would provide?')}
              >
                <Editor
                  tinymceScriptSrc={
                    process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'
                  }
                  onInit={(evt, editor) => (detailsEditorRef.current = editor)}
                  initialValue={
                    initialValues.description ? initialValues.description : ''
                  }
                  init={{
                    height: 500,
                    menubar: false,
                    placeholder: t('Other detail for creator?'),
                    plugins,
                    toolbar,
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
                <span className={classes.tip}>
                  {t(
                    'Describe the job in detail, the background, the reason for the organization as well as the meaning of this job for you and the community.'
                  )}
                </span>
              </Field>
            </div>
            <div className={`${classes.buttonsContainer}`}>
              <div className={`w-1/2 h-12`}>
                <Button
                  priority="normal"
                  onClick={() => handleCancel()}
                  type="button"
                  disabled={isBusy}
                >
                  {t('Cancel')}
                </Button>
              </div>
              <div className={`w-1/2 h-12 text-right`}>
                <Button priority="high" type="submit" disabled={isBusy}>
                  {t('Next Step')}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      );
    } else {
      child = t('Loading...');
    }
  }

  return <Fragment>{child}</Fragment>;
};

CreateJobForm.propTypes = {
  classes: shape({
    root: string
  }),
  jobId: string
};

export default CreateJobForm;
