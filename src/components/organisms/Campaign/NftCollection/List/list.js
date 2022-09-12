import React from 'react';
import { shape, string } from 'prop-types';
import { Form } from 'informed';
import { useTranslation } from 'next-i18next';
import { Heading } from '../../../../atoms/Heading';
import Select from '../../../../atoms/Select';
import classes from './list.module.css';
import { useList } from '../../../../../hooks/Campaign/NftCollection';
import Item from './item';

const List = (props) => {
  const { t } = useTranslation('list_nft_collections');

  const { position } = props;

  const { loading, data, error } = useList({ position });

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
    if (data.nft_collection && !data.nft_collection.length) {
      child = (
        <div className={classes.noResult}>
          {t("Don't have NFT Collection published now.")}
        </div>
      );
    } else {
      child = data.nft_collection.map((nftCollection) => (
        <Item key={nftCollection.id} data={nftCollection} />
      ));
    }
  }

  // const loadMoreBtn = (
  //   <a title="Load more..." className={classes.loadMore}>
  //     Load more...
  //   </a>
  // );

  const subheading =
    position === 'home-page'
      ? t(
          'Aliquam dignissim enim ut est suscipit, ut euismod lacus tincidunt. Nunc feugiat ex id mi hendrerit, et efficitur ligula bibendum.'
        )
      : '';
  const headingTitle =
    position === 'home-page'
      ? t('Best NFT Collections')
      : t('🎉 Browse NFT Collections');
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
    <div className="py-24 mx-auto max-w-screen-xl relative">
      <div className={classes.headingWrap}>{heading}</div>

      {/* {filters} */}
      <div className={classes.listWrap}>{child}</div>

      {/*<div className={classes.actionWrap}>{loadMoreBtn}</div>*/}
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
