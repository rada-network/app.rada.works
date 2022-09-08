import React, { Fragment, useEffect, useState } from 'react';
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
import defaultClasses from './form.module.css';
import Selector from './NftCollection/Selector';

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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const {
    errors,
    handleSaveCampaign,
    handleCancel,
    handleFinished,
    isBusy,
    setFormApi,
    formApiRef,
    detailsEditorRef,
    initialValues,
    saveCampaignResult
  } = useForm({ campaignId });

  const selectedNftCollectionOptions = initialValues.nft_collection_opt_selected
    ? JSON.parse(initialValues.nft_collection_opt_selected)
    : [];
  const [nftCollectionOption, setNFTCollectionOption] = useState(
    selectedNftCollectionOptions
  );

  useEffect(() => {
    if (saveCampaignResult) {
      let savedObj = null;
      if (saveCampaignResult.update_campaign_item) {
        savedObj = saveCampaignResult.update_campaign_item;
        saveCampaignResult.update_campaign_item = null;
      } else if (saveCampaignResult.create_campaign_item) {
        savedObj = saveCampaignResult.create_campaign_item;
        saveCampaignResult.create_campaign_item = null;
      }
      if (savedObj && savedObj.id) {
        if (!isBusy) {
          toast.success(
            t(
              "You have just saved campaign's information successfully. We will consider to approve your campaign as soon as possible."
            ),
            {
              onClose: () => {
                handleFinished();
              }
            }
          );
        }
      }
    }

    // return () => {};
  }, [saveCampaignResult]);

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
              nftCollectionOption,
              description: detailsEditorRef.current.getContent(),
              date_start: startDate,
              date_end: endDate,
              ...formApiRef.current.getValues()
            })
          }
        >
          <div className={`${classes.fields}`}>
            <Field id="campaign-nft-collection" label={t('NFT Collection')}>
              <Selector
                selectedOption={selectedNftCollectionOptions}
                handleChange={setNFTCollectionOption}
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
                  initialValues.description ? initialValues.description : ''
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
                selected={startDate}
                onChange={onDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable={true}
                dateFormatCalendar={'MMM yyyy'}
                minDate={new Date()}
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
                placeholder={t('Enter your Store URL...')}
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
    child = t('Loading...');
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
