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
    <Button
      priority="normal"
      type="button"
      onPress={handleEdit}
      className={`${classes.btnEdit}`}
    >
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
    <div className="flex items-center border border-gray-200 hover:border-blue-500 dark:border-gray-800 dark:hover:border-blue-500  py-4 mb-3 rounded-xl hover:shadow-md transition-all duration-300">
      <div className="flex items-center px-4 w-24">{storeInfo}</div>
      <div className="text-lg dark:text-white font-semibold px-4">
        <a
          href="#"
          title="View detail"
          className="hover:text-blue-600"
          onClick={viewDetails}
        >
          {data.title}
        </a>
      </div>

      {/* <div
        className="px-4"
        dangerouslySetInnerHTML={toHTML(
          subStrWords(data?.description, DESC_MAX_LENGTH)
        )}
      /> */}

      <div className="px-4 ml-auto flex items-stretch">
        {editButton}
        <a
          href="#"
          title="Delete"
          className="hover:bg-red-700 border border-gray-300 hover:border-red-700 flex items-center text-sm font-semibold text-gray-700 hover:text-white rounded-md py-2 px-3 transition-all duration-300 ml-2"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current w-4 h-4 mr-1"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
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
