import React, { useState } from 'react';
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

  const { position } = props;

  const { loading, data, error } = useList({ position });

  let child = null;

  const [visible, setVisible] = useState(6);
  const [allItem, setAllItem] = useState(false);

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
      child = data.campaign
        ?.slice(0, visible)
        .map((campaign) => <Item key={campaign.id} data={campaign} />);
    }
  }
  const showMoreItems = () => {
    setVisible((prevValue) => {
      if (data.campaign && data.campaign.length <= prevValue) {
        setAllItem(true);
        return;
      } else {
        prevValue + 6;
      }
    });
  };
  const loadMore =
    position === 'home-page' ? (
      <a
        href="/search-coupon"
        title="Load more..."
        className={classes.loadMore}
      >
        Load more...
      </a>
    ) : allItem ? (
      <a
        href="#"
        onClick={showMoreItems}
        title="All Item Loaded"
        className={classes.loadMore}
      >
        All Item Loaded
      </a>
    ) : (
      <a
        href="#"
        onClick={showMoreItems}
        title="Load more..."
        className={classes.loadMore}
      >
        Load more...
      </a>
    );
  const subheading =
    position === 'home-page'
      ? t(
          'Aliquam dignissim enim ut est suscipit, ut euismod lacus tincidunt. Nunc feugiat ex id mi hendrerit, et efficitur ligula bibendum.'
        )
      : '';
  const headingTitle =
    position === 'home-page' ? t('Best Offers') : t('🎉 Browse Coupons');
  const heading = (
    <Heading HeadingType="h1" subHeading={`${subheading}`}>
      {headingTitle}
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
      <div className={classes.headingWrap}>{heading}</div>

      {/* {filters} */}

      <div className={classes.listWrap}>{child}</div>

      <div className={classes.actionWrap}>{loadMore}</div>
    </div>
  );
};

List.propTypes = {
  classes: shape({
    root: string
  }),
  position: string
};

export default List;
