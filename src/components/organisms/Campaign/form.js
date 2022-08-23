import React, { Fragment, useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
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
import { useCampaignForm } from '../../../hooks/Campaign';
import { useStyle } from '../../classify';
import defaultClasses from './form.module.css';
import { Percent } from 'react-feather';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Selector from './NFTCollectionSelector';

const CampaignForm = (props) => {
  const { classes: propClasses, campaignId } = props;

  const classes = useStyle(defaultClasses, propClasses);

  const discountUnit = <Percent />;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [selectedNFTCollection, setSelectedNFTOption] = useState(null);

  const { plugins, toolbar } = TINY_MCE_CONFIG;

  const { t } = useTranslation('create_campaign');

  const [currentCampaign, setCurrentCampaign] = useState({
    id: null,
    title: null
  });

  const {
    errors,
    handleSaveCampaign,
    handleCancel,
    isBusy,
    setFormApi,
    formApiRef,
    detailsEditorRef,
    initialValues,
    saveCampaignResult
  } = useCampaignForm({ campaignId });

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
        setCurrentCampaign({
          id: savedObj.id,
          title: savedObj.title
        });
        if (!isBusy) {
          toast.success(
            t("You have just saved campaign's information successfully."),
            {}
          );
        }
      }
    }

    // return () => {};
  }, [saveCampaignResult]);

  let child = null;
  if (currentCampaign.id) {
    child = 'DONE';
  } else {
    if (!isBusy) {
      child = (
        <div className={`${classes.root}`}>
          <h2 className={`${classes.pageTitle}`}>
            {t('Campaign introduction')}
          </h2>
          <FormError allowErrorMessages errors={Array.from(errors.values())} />
          <Form
            getApi={setFormApi}
            className={classes.form}
            initialValues={initialValues}
            onSubmit={() =>
              handleSaveCampaign({
                nft_collection_id: selectedNFTCollection.value,
                description: detailsEditorRef.current.getContent(),
                startDate,
                endDate,
                ...formApiRef.current.getValues()
              })
            }
          >
            <div className={`${classes.fields}`}>
              <Field id="campaign-nft-collection" label={t('NFT Collection')}>
                <Selector onChange={setSelectedNFTOption} />
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
                  init={{
                    height: 300,
                    menubar: false,
                    placeholder: t('Other detail for your customers?'),
                    plugins,
                    toolbar,
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
                <span className={classes.tip}>
                  {t('Describe the campaign in detail.')}
                </span>
              </Field>
              <Checkbox
                id="show_on_rada"
                field="show_on_rada"
                value={true}
                label="Enable show your campaign on RADA"
              />
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
              <Field id="campaign-dates" label={t('Start date & End date')}>
                <DatePicker
                  selected={startDate}
                  onChange={onDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  isClearable={true}
                  dateFormatCalendar={'MMM yyyy'}
                  minDate={new Date()}
                  // inline
                  // withPortal
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

CampaignForm.propTypes = {
  classes: shape({
    root: string
  }),
  campaignId: string
};

export default CampaignForm;
