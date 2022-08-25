import React from 'react';
import { shape, string } from 'prop-types';
import { Form } from 'informed';
import { useTranslation } from 'next-i18next';
import { Heading } from '../../../atoms/Heading';
import Select from '../../../atoms/Select';
import classes from './list.module.css';
import { useList } from '../../../../hooks/Campaign';
import Item from './item';

const List = (props) => {
  const { t } = useTranslation('list_campaign');

  const { page } = props;

  const { loading, data, error } = useList({ page });

  let child = null;
  if (!data) {
    if (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
      child = t('Something went wrong.');
    } else if (loading) {
      child = <div>{t('Loading...')}</div>;
    }
  } else {
    if (data.campaign && !data.campaign.length) {
      child = (
        <div className={classes.noResult}>
          {t("Don't have Campaigns published now.")}
        </div>
      );
    } else {
      child = data.campaign.map((campaign) => (
        <Item key={campaign.id} data={campaign} />
      ));
    }
  }

  const subheading =
    page === 'home'
      ? t(
          'Aliquam dignissim enim ut est suscipit, ut euismod lacus tincidunt. Nunc feugiat ex id mi hendrerit, et efficitur ligula bibendum.'
        )
      : '';
  const headingTitle =
    page === 'home' ? t('Best Offers') : t('🎉 Browse Coupons');
  const heading = (
    <Heading HeadingType="h1" subHeading={`${subheading}`}>
      {' '}
      {headingTitle}{' '}
    </Heading>
  );

  const filters = (
    <div className={classes.filter}>
      <Form className={classes.filterForm}>
        <Select
          field="filter"
          items={[
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2' }
          ]}
        />
      </Form>
    </div>
  );

  return (
    <div className={`${classes.root}`}>
      {heading}
      {filters}
      {child}
    </div>
  );
};

List.propTypes = {
  classes: shape({
    root: string
  }),
  page: string
};

export default List;
