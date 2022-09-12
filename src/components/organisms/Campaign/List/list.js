import React, { useState } from 'react';
import { shape, string, number } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { Form } from 'informed';
import { useTranslation } from 'next-i18next';
import { Heading } from '../../../atoms/Heading';
// import Select from '../../../atoms/Select';
import classes from './list.module.css';
import { useList } from '../../../../hooks/Campaign';
import Item from './item';

const List = (props) => {
  const { t } = useTranslation('list_campaign');

  const { position, nftCollectionId = null } = props;

  const { loading, data, error } = useList({ position, nftCollectionId });

  let child = null;

  const [visible, setVisible] = useState(12);
  const [dataItems, setDataItems] = useState({
    items: [],
    hasMore: true
  });

  if (!data) {
    if (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
      child = t('Something went wrong.');
    } else if (loading) {
      child = <div className={classes.loading}>{t('Loading...')}</div>;
    }
  } else {
    if (data.campaign && !data.campaign.length) {
      child = (
        <div className={classes.noResult}>
          {t("Don't have Campaigns published now.")}
        </div>
      );
    } else {
      const fetchMoreData = () => {
        if (visible >= data.campaign.length) {
          setDataItems({
            items: data.campaign.slice(0, visible),
            hasMore: false
          });
          return;
        }
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
          setVisible(visible + 6);
          setDataItems({
            items: data.campaign.slice(0, visible),
            hasMore: visible < data.campaign.length
          });
        }, 1500);
      };
      child = (
        <InfiniteScroll
          dataLength={dataItems.items.length}
          next={fetchMoreData}
          hasMore={dataItems.hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          className={classes.listWrap}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {data.campaign.slice(0, visible).map((campaign) => (
            <Item key={campaign.id} data={campaign} />
          ))}
        </InfiniteScroll>
      );
    }
  }

  const subheading =
    position === 'home-page'
      ? t(
          'Aliquam dignissim enim ut est suscipit, ut euismod lacus tincidunt. Nunc feugiat ex id mi hendrerit, et efficitur ligula bibendum.'
        )
      : '';
  let headingTitle = t('🎉 Browse Coupons');
  if (position === 'home-page') {
    headingTitle = t('Best Offers');
  } else if (position === 'nft-collection-details') {
    headingTitle = t('All Deals');
  }

  const heading = (
    <Heading HeadingType="h1" subHeading={`${subheading}`}>
      {headingTitle}
    </Heading>
  );

  /*const filters = (
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
  );*/

  return (
    <div className={`${classes.root}`}>
      <div className={classes.headingWrap}>{heading}</div>

      {/*{filters}*/}

      {child}
    </div>
  );
};

List.propTypes = {
  classes: shape({
    root: string
  }),
  position: string,
  nftCollectionId: number
};

export default List;
