import React, { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'next-i18next';
import useUserList from '../../../../hooks/User';
import UserItem from './item';
import classes from './myCampaign.module.css';
const UserCampaign = (props: any) => {
  const { t } = useTranslation('list_campaign');
  const { walletAddress } = props;
  // const walletAddress = '0x26f9Cb15a8527C34B794897B004BC51c7b917930';
  const {
    data,
    loading,
    error,
    totalItems,
    handleSearch,
    sortProps,
    page,
    setPage,
    getNextItems,
    infiniteItems,
    setInfiniteItems,
    infiniteHasMore,
    setInfiniteHasMore
  } = useUserList({ walletAddress });
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
      console.log(infiniteItems);
      const fetchMoreData = async () => {
        if (infiniteItems.length < totalItems) {
          // Load items in next page
          const nextItems = await getNextItems();
          // Set more items
          setInfiniteItems([...infiniteItems, ...nextItems]);
          if (!nextItems.length) {
            setInfiniteHasMore(false);
          }
          setPage(page + 1);
        } else {
          setInfiniteHasMore(false);
        }
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
        <Fragment>
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200 py-4">
              <div className="px-4">
                <span className="chain bsc">Title</span>
              </div>
              <div className="px-4">Description</div>
              <div className="px-4 ml-auto">actions</div>
            </div>
          </div>
          <InfiniteScroll
            className={classes.listWrap}
            dataLength={infiniteItems.length}
            next={fetchMoreData}
            hasMore={infiniteHasMore}
            loader={loader}
            endMessage={endMessage}
          >
            {infiniteItems.map((campaign, idx) => (
              <UserItem key={idx} data={campaign} />
            ))}
          </InfiniteScroll>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      <div className="">
        <div className="container max-w-screen-xl mx-auto py-12 lg:py-24">
          <div>
            <h3>coupon list</h3>
          </div>
          {child}
        </div>
      </div>
    </Fragment>
  );
  return (
    <div className="">
      <div className="container max-w-screen-xl mx-auto py-12 lg:py-24">
        Dashboard: {walletAddress}
        {/* Address list */}
        <div className="border-t border-gray-200">
          <div className="flex border-b border-gray-200 hover:bg-gray-50 py-4">
            <div className="px-4">
              <span className="chain bsc">BSC</span>
            </div>
            <div className="px-4">
              0xC8E5823245c0041426C272628064075351C675e7
            </div>
            <div className="px-4 ml-auto">
              <a
                href="#"
                title="Edit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded py-2 px-4 transition-all duration-300"
              >
                Edit
              </a>
            </div>
            <div className="px-4">
              <a
                href="#"
                title="Edit"
                className="bg-red-600 hover:bg-red-700 text-white rounded py-2 px-4 transition-all duration-300"
              >
                Delete
              </a>
            </div>
          </div>

          <div className="flex border-b border-gray-200 hover:bg-gray-50 py-4">
            <div className="px-4">
              <span className="chain bsc">BSC</span>
            </div>
            <div className="px-4">
              0xC8E5823245c0041426C272628064075351C675e7
            </div>
            <div className="px-4 ml-auto">
              <a
                href="#"
                title="Edit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded py-2 px-4 transition-all duration-300"
              >
                Edit
              </a>
            </div>
            <div className="px-4">
              <a
                href="#"
                title="Edit"
                className="bg-red-600 hover:bg-red-700 text-white rounded py-2 px-4 transition-all duration-300"
              >
                Delete
              </a>
            </div>
          </div>
        </div>
        {/* End: Address list */}
      </div>
    </div>
  );
};
export default UserCampaign;