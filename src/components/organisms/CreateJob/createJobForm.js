import React, { Fragment, useEffect, useState } from 'react';
import { shape, string, number } from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Form } from 'informed';
import FormError from '../../atoms/FormError';
import Field from '../../atoms/Field';
import TextInput from '../../atoms/TextInput';
import TextArea from '../../atoms/TextArea';
import Button from '../../atoms/Button';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Editor } from '@tinymce/tinymce-react';
import { useCreateJobForm } from '../../../hooks/CreateJob';
import { useStyle } from '../../classify';
import { isRequired, hasLengthAtMost } from '../../../utils/formValidators';
import combine from '../../../utils/combineValidators';
import Success from './success';
import defaultClasses from './createJobForm.module.css';

const CreateJobForm = (props) => {
  const { classes: propClasses, jobId } = props;

  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('createjob');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {
    errors,
    handleSubmit,
    handleCancel,
    isBusy,
    setFormApi,
    detailsEditorRef,
    initialValues,
    response
  } = useCreateJobForm({ jobId });

  const [result, setResult] = useState({
    jobId: null
  });

  useEffect(() => {
    if (response) {
      if (response.update_job_item) {
        toast.success(
          t("You have just updated job's information successfully."),
          {}
        );
        setResult({ jobId: response.update_job_item.id });
        response.update_job_item = null;
      } else if (response.create_job_item) {
        toast.success(t("You have just created a job's successfully."), {});
        setResult({ jobId: response.create_job_item.id });
        response.create_job_item = null;
      }
    }
  }, [t, response, setResult]);

  let child = null;
  if (result.jobId) {
    child = <Success jobId={result.jobId} />;
    // setResult({"jobId": null});
  } else {
    if (!isBusy) {
      child = (
        <div className={`${classes.formWrapper}`}>
          <h2 className={classes.title}>{t('Job introduction')}</h2>
          <FormError allowErrorMessages errors={Array.from(errors.values())} />
          <Form
            getApi={setFormApi}
            className={classes.form}
            initialValues={initialValues}
            onSubmit={() =>
              handleSubmit({
                startDate,
                endDate
              })
            }
          >
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
            <Field id="job-description" label={t('Job detail')}>
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
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'help',
                    'wordcount'
                  ],
                  toolbar:
                    'undo redo | blocks | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
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
            <div className={`flex`}>
              <Field
                id="job-date_started"
                classes={{ root: classes.datePickerField }}
                label={t('Start date')}
              >
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  dateFormat="yyyy/MM/dd h:mm aa"
                  placeholderText={t('Select one date...')}
                  showTimeSelect
                  timeIntervals={15}
                />
              </Field>
              <Field
                id="job-date_ends"
                classes={{ root: classes.datePickerField }}
                label={t('End date')}
              >
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  dateFormat="yyyy/MM/dd h:mm aa"
                  placeholderText={t('Select one date...')}
                  showTimeSelect
                  timeIntervals={15}
                />
              </Field>
            </div>
            <div className={classes.buttonsContainer}>
              <Button
                priority="normal"
                onClick={() => handleCancel()}
                type="button"
                disabled={isBusy}
              >
                {t('Cancel')}
              </Button>
              <Button priority="high" type="submit" disabled={isBusy}>
                {t('Next Step')}
              </Button>
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
