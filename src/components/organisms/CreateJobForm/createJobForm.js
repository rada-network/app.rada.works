import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Form } from 'informed';
import FormError from '../../atoms/FormError';
import Field from '../../atoms/Field';
import TextInput from '../../atoms/TextInput';
import TextArea from '../../atoms/TextArea';
import Button from '../../atoms/Button';
import { useCreateJobForm } from '../../../hooks/CreateJobForm';
import { useStyle } from '../../classify';
import { isRequired } from '../../../utils/formValidators';
import defaultClasses from './createJobForm.module.css';

const CreateJobForm = (props) => {
  const { classes: propClasses } = props;
  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('common');

  const { errors, handleSubmit, isBusy, isLoading, setFormApi, response } =
    useCreateJobForm({});

  if (isLoading) {
    return t('Loading...');
  }

  console.log(response);

  return (
    <Fragment>
      <div className={`${classes.formWrapper}`}>
        <FormError allowErrorMessages errors={Array.from(errors.values())} />
        <Form
          getApi={setFormApi}
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Field id="job-title" label={t('Title')}>
            <TextInput
              autoComplete="title"
              field="title"
              id="job-title"
              validate={isRequired}
              placeholder={t('Title')}
              data-cy="title"
            />
          </Field>

          <Field id="job-short-desc" label={t('Overview')}>
            <TextArea
              autoComplete="short-desc"
              field="short_desc"
              id="job-short-desc"
              validate={isRequired}
              placeholder={t('Overview')}
              data-cy="short-desc"
            />
          </Field>

          <Field id="job-description" label={t('Details')}>
            <TextArea
              autoComplete="description"
              field="description"
              id="job-description"
              validate={isRequired}
              placeholder={t('Details')}
              data-cy="description"
            />
          </Field>

          <div className={classes.buttonsContainer}>
            <Button
              priority="high"
              type="submit"
              disabled={isBusy}
              data-cy="submit"
            >
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
    root: string,
  }),
};

export default CreateJobForm;
