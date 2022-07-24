import React, { Fragment, useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
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
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useCreateJobForm } from '../../../hooks/CreateJobForm';
import { useStyle } from '../../classify';
import { isRequired } from '../../../utils/formValidators';
import defaultClasses from './createJobForm.module.css';

const CreateJobForm = (props) => {
  const { classes: propClasses } = props;
  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('common');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();

  const { errors, handleSubmit, isBusy, setFormApi, response } =
    useCreateJobForm({});

  useEffect(() => {
    if (response && response.create_job_item) {
      toast.success(t('You have just submitted a new Job successfully.'), {});
    }
  }, [t, response]);

  return (
    <Fragment>
      <div className={`${classes.formWrapper}`}>
        <h1 className={classes.title}>{t('Job introduction')}</h1>
        <FormError allowErrorMessages errors={Array.from(errors.values())} />
        <Form
          getApi={setFormApi}
          className={classes.form}
          onSubmit={handleSubmit}
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
              validate={isRequired}
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
            <TextArea
              autoComplete="description"
              field="description"
              id="job-description"
              validate={isRequired}
              validateOnBlur
              placeholder={t('Enter job detail')}
            />
            <span className={classes.tip}>
              {t(
                'Describe the job in detail, the background, the reason for the organization as well as the meaning of this job for you and the community.'
              )}
            </span>
          </Field>

          <Field id="job-date_started" label={t('Start date')}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              //maxDate={addMonths(new Date(), 6)}
              showDisabledMonthNavigation
              showTimeSelect
              dateFormat="yyyy/MM/dd h:mm aa"
              placeholderText={t('Select one date...')}
            />
          </Field>

          <Field id="job-date_ends" label={t('End date')}>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={new Date()}
              showDisabledMonthNavigation
              showTimeSelect
              dateFormat="yyyy/MM/dd h:mm aa"
              placeholderText={t('Select one date...')}
            />
          </Field>

          <div className={classes.buttonsContainer}>
            <Button priority="high" type="submit" disabled={isBusy}>
              {t('Submit Job')}
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

CreateJobForm.propTypes = {
  classes: shape({
    root: string
  })
};

export default CreateJobForm;
