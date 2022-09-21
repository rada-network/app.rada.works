import React, { Fragment, useCallback, useState, useEffect } from 'react';
import Router from 'next/router';
import { shape, string } from 'prop-types';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import { Form } from 'informed';
import { isRequired } from '../../../utils/formValidators';
import FormError from '../../atoms/FormError';
import Field from '../../atoms/Field';
import TextInput from '../../atoms/TextInput';
import TextArea from '../../atoms/TextArea';
import Button from '../../atoms/Button';
import Checkbox from '../../atoms/Checkbox';
import { Editor } from '@tinymce/tinymce-react';
import TINY_MCE_CONFIG from './tinyMCE.config';
import { useForm } from '../../../hooks/Campaign';
import { useStyle } from '../../classify';
import { Percent } from 'react-feather';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Selector from './NftCollection/Selector';
import defaultClasses from './form.module.css';

const CampaignForm = (props) => {
  const { classes: propClasses, campaignId } = props;

  const classes = useStyle(defaultClasses, propClasses);

  const { t } = useTranslation('create_campaign');

  const { theme } = useTheme();
  const rootClassName = theme === 'dark' ? 'rootDark' : 'root';

  const { plugins, toolbar } = TINY_MCE_CONFIG;
  const tinyInit = {
    branding: false,
    height: 300,
    menubar: false,
    placeholder: t('Other detail for your customers?'),
    plugins,
    toolbar,
    skin: 'oxide',
    content_css: 'default',
    content_style: 'body {}'
  };
  if (theme === 'dark') {
    tinyInit.skin = 'oxide-dark';
    tinyInit.content_css = 'dark';
  }

  const discountUnit = <Percent />;

  const afterSavedCampaign = useCallback(() => {
    toast.success(
      t(
        "You have just saved campaign's information successfully. We will consider to approve your campaign as soon as possible."
      ),
      {
        onClose: () => {
          //coming soon
          Router.push('/coupons');
        }
      }
    );
  }, [toast, t]);

  const {
    errors,
    handleSaveCampaign,
    handleCancel,
    isBusy,
    setFormApi,
    formApiRef,
    detailsEditorRef,
    initialValues
  } = useForm({ campaignId, afterSavedCampaign });

  const [nftCollections, setNftCollections] = useState([]);
  const [activeDates, setActiveDates] = useState({});
  const onDateChange = (dates) => {
    const [start, end] = dates;
    setActiveDates({
      start_date: start,
      end_date: end
    });
  };

  useEffect(() => {
    const initNftCollections =
      initialValues && initialValues.nft_collection_opt_selected
        ? initialValues.nft_collection_opt_selected
        : [];
    if (initNftCollections.length) {
      setNftCollections(initNftCollections);
    }

    const initDates = {
      start_date:
        initialValues && initialValues.date_start
          ? new Date(initialValues.date_start)
          : null,
      end_date:
        initialValues && initialValues.date_end
          ? new Date(initialValues.date_end)
          : null
    };
    setActiveDates(initDates);
  }, [initialValues]);

  let child = null;
  if (!isBusy) {
    child = (
      <div className={`${classes[rootClassName]}`}>
        <h2 className={`${classes.pageTitle}`}>{t('Campaign introduction')}</h2>
        <FormError allowErrorMessages errors={Array.from(errors.values())} />
        <Form
          getApi={setFormApi}
          className={classes.form}
          initialValues={initialValues}
          onSubmit={() =>
            handleSaveCampaign({
              nftCollections,
              description: detailsEditorRef.current.getContent(),
              date_start: activeDates.start_date,
              date_end: activeDates.end_date,
              ...formApiRef.current.getValues()
            })
          }
        >
          <div className={`${classes.fields}`}>
            <Field id="campaign-nft-collection" label={t('NFT Collection')}>
              <Selector
                selectedOption={
                  initialValues && initialValues.nft_collection_opt_selected
                    ? initialValues.nft_collection_opt_selected
                    : []
                }
                handleChange={setNftCollections}
              />
            </Field>
            <Field id="campaign-title" label={t('Title')}>
              <TextInput
                autoComplete="title"
                field="title"
                id="campaign-title"
                validate={isRequired}
                validateOnBlur
                mask={(value) => value && value.trim()}
                maskOnBlur={true}
                placeholder={t('E.g 30% off all products')}
              />
            </Field>
            <Field id="campaign-discount-value" label={t('Discount Value')}>
              <TextInput
                after={discountUnit}
                autoComplete="campaign-discount-value"
                field="discount_value"
                id="discount_value"
                validate={isRequired}
                validateOnBlur
                mask={(value) => value && parseInt(value)}
                maskOnBlur={true}
                placeholder={t('E.g 30')}
              />
            </Field>
            <Field
              id="campaign-description"
              label={t('Additional value/benefit')}
            >
              <Editor
                tinymceScriptSrc={
                  process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'
                }
                onInit={(evt, editor) => (detailsEditorRef.current = editor)}
                initialValue={
                  initialValues && initialValues.description
                    ? initialValues.description
                    : ''
                }
                init={tinyInit}
              />
              <span className={classes.tip}>
                {t('Describe the campaign in detail.')}
              </span>
            </Field>
            <Field id="campaign-show-on-rada" label={``}>
              <Checkbox
                id="show_on_rada"
                field="show_on_rada"
                value={true}
                label="Enable show your campaign on RADA"
              />
            </Field>
          </div>
          <div className={`${classes.fields}`}>
            <h3 className={classes.detailsTitle}>
              {t('Configure your discount')}
            </h3>
            <Field id="campaign-coupon-codes" label={t('Coupon Codes')}>
              <TextArea
                id="coupon_codes"
                field="coupon_codes"
                validate={isRequired}
                validateOnBlur
                mask={(value) => value && value.trim()}
                maskOnBlur={true}
                placeholder={t('Enter coupon codes...')}
              />
              <span className={classes.tip}>
                {t('Separate codes by coma. Eg: CT65K6962NV8, ZZ8EP933J925')}
              </span>
            </Field>
            <Field
              id="campaign-dates"
              classes={{ root: classes['rdwDatepicker'] }}
              label={t('Active dates')}
            >
              <DatePicker
                onChange={onDateChange}
                startDate={activeDates.start_date}
                endDate={activeDates.end_date}
                selectsRange
                isClearable={true}
                dateFormatCalendar={'MMM yyyy'}
                minDate={new Date()}
              />
            </Field>
            <Field id="campaign-store-name" label={t('Store Name')}>
              <TextInput
                autoComplete="store-name"
                field="store_name"
                id="store_name"
                validate={isRequired}
                validateOnBlur
                mask={(value) => value && value.trim()}
                maskOnBlur={true}
                placeholder={t('Enter store name')}
              />
            </Field>
            <Field id="campaign-store-logo-url" label={t('Store Logo')}>
              <TextInput
                autoComplete="store-logo"
                field="store_logo_url"
                id="store_logo_url"
                validate={isRequired}
                validateOnBlur
                mask={(value) => value && value.trim()}
                maskOnBlur={true}
                placeholder={t('Enter logo image url')}
              />
            </Field>
            <Field id="campaign-store-url" label={t('Store URL')}>
              <TextInput
                autoComplete="store-url"
                field="store_url"
                id="store_url"
                validate={isRequired}
                validateOnBlur
                mask={(value) => value && value.trim()}
                maskOnBlur={true}
                placeholder={t('Enter store url')}
              />
              <span className={classes.tip}>
                {t('Specify the shop URL where apply the coupons.')}
              </span>
            </Field>
          </div>
          <div className={`${classes.buttonsContainer}`}>
            <div className={`w-1/2 h-12`}>
              <Button
                priority="normal"
                onPress={() => handleCancel()}
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
    child = <div className={classes.loading}>{t('Loading...')}</div>;
  }

  return <Fragment>{child}</Fragment>;
};

CampaignForm.propTypes = {
  classes: shape({
    root: string
  }),
  campaignId: string
};

export default CampaignForm;
