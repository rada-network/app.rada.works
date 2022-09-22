import React from 'react';
import Router from 'next/router';
import slugify from 'slugify';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import { toHTML, subStrWords } from '../../../../utils/strUtils';
import Button from '../../../atoms/Button';
import classes from './item.module.css';
import TextLink from '../../../atoms/TextLink';

const DESC_MAX_LENGTH = 200;

const UserItem = (props: any) => {
  const { data } = props;

  const { t } = useTranslation('campaign_details');

  const viewDetails = () => {
    const path = `/campaign-details/${slugify(data.title).toLowerCase()}`;
    Router.push(path);
  };

  const handleEdit = () => {
    const path = `/edit-campaign/${data.id}`;
    Router.push(path);
  };
  const handleDelete = () => {
    const path = `/edit-campaign/${data.id}`;
    Router.push(path);
  };

  const editButton = (
    <Button priority="normal" type="button" onPress={handleEdit}>
      {t('Edit')}
    </Button>
  );

  // Build store info
  const storeLogo = data.store_logo_url ? (
    <img
      className={`${classes.storeLogo}`}
      src={data.store_logo_url}
      alt={`cover_${data.store_name}`}
    />
  ) : null;
  const storeInfo = data.store_url ? (
    <TextLink
      className={classes.storeLink}
      target={`_blank`}
      href={data.store_url}
    >
      {storeLogo}
      <span className={classes.storeName}> {data.store_name} </span>
    </TextLink>
  ) : (
    <span className={classes.storeName}> {data.store_name} </span>
  );

  return (
    <div className="flex items-center border border-gray-200 hover:border-blue-500 py-4 mb-3 rounded-xl hover:shadow-md transition-all duration-300">
      <div className="flex items-center px-4">{storeInfo}</div>
      <div className="font-semibold px-4">{data.title}</div>

      {/* <div
        className="px-4"
        dangerouslySetInnerHTML={toHTML(
          subStrWords(data?.description, DESC_MAX_LENGTH)
        )}
      /> */}

      <div className="px-4 ml-auto">
        <a
          href="#"
          title="Edit"
          className="bg-white border border-blue-500 hover:border-blue-700 hover:bg-blue-700 text-gray-600 hover:text-white text-sm font-semibold rounded-md mr-4 py-1.5 px-4 transition-all duration-300"
          onClick={viewDetails}
        >
          View Details
        </a>

        {editButton}

        <a
          href="#"
          title="Delete"
          className="bg-white hover:bg-red-700 border border-red-500 hover:border-red-700 text-sm font-semibold text-gray-600 hover:text-white rounded-md py-1.5 px-4 transition-all duration-300 ml-4"
          onClick={handleDelete}
        >
          Delete
        </a>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  classes: shape({
    root: string
  }),
  data: shape({
    id: string,
    title: string
  })
};

export default UserItem;
