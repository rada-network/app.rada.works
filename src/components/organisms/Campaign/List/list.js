import React, { useEffect } from 'react';
import { shape, string, number } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { Form } from 'informed';
import { useTranslation } from 'next-i18next';
import { Heading } from '../../../atoms/Heading';
// import Select from '../../../atoms/Select';
import classes from './list.module.css';
import useThemes from '../../../../hooks/useThemes';
import { useList } from '../../../../hooks/Campaign';
import Item from './item';

const List = (props) => {
  const { t } = useTranslation('list_campaign');

  const { rootClassName } = useThemes();

  const { position, nftCollectionId = null } = props;

  const {
    data,
    loading,
    error,
    totalItems,
    handleSearch,
    limit,
    page,
    setPage,
    getNextItems,
    infiniteItems,
    setInfiniteItems,
    infiniteHasMore,
    setInfiniteHasMore
  } = useList({ position, nftCollectionId });

  useEffect(() => {
    if (data) {
      const size = data.campaign.length;
      if (size) {
        setInfiniteItems(data.campaign);
        if (size < totalItems) {
          setInfiniteHasMore(true);
        } else {
          setInfiniteHasMore(false);
        }
      }
    }
  }, [data, totalItems]);

  let child = null;
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
        <div className="bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 rounded-lg p-4">
          {t("Don't have Campaigns published now.")}
        </div>
      );
    } else {
      const fetchMoreData = async () => {
        // Load items in next page
        const nextItems = await getNextItems();
        // Set more items
        setInfiniteItems([...infiniteItems, ...nextItems]);
        if (!nextItems.length) {
          setInfiniteHasMore(false);
        }
        setPage(page + 1);
      };
      const loader = (
        <div className={classes.infiniteLoading}>{t('Loading more...')}</div>
      );
      const endMessage = (
        <div className={classes.infiniteFinished}>
          <span>{t('That is all!')}</span>
        </div>
      );
      child = (
        <InfiniteScroll
          className={classes.listWrap}
          dataLength={infiniteItems.length}
          next={fetchMoreData}
          hasMore={infiniteHasMore}
          loader={loader}
          endMessage={endMessage}
        >
          {infiniteItems.map((campaign) => (
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
    <div className={classes.headingWrap}>
      <Heading HeadingType="h1" subHeading={`${subheading}`}>
        {headingTitle}
      </Heading>
    </div>
  );

  const searchField = (
    <input
      autoComplete="off"
      className={classes.searchInput}
      type="text"
      id="campaign_keyword"
      name="keyword"
      onChange={handleSearch}
      placeholder={t('Search by keyword...')}
    />
  );

  const sortField = totalItems ? '[WIP] Sort options...' : null;

  const toolbar = (
    <div className={classes.toolbarWrap}>
      <div className={classes.searchField}>{searchField}</div>
      <div
        className={classes.totalResults}
      >{`${totalItems.toLocaleString()} ${t('items')}`}</div>
      <div className={classes.sortWrap}>{sortField}</div>
    </div>
  );

  return (
    <div className={`${classes[rootClassName]}`}>
      {heading}
      {toolbar}
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
