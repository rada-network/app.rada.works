import React, { useState, useMemo, Fragment } from 'react';
import { shape, string } from 'prop-types';
import classes from './selector.module.css';
import { useTranslation } from 'next-i18next';
import AsyncSelect from 'react-select/async';
import { useQuery } from '@apollo/client';
import API from './api.gql';

const Selector = (props) => {
  const { onChange } = props;

  const [state, setState] = useState({ inputValue: '' });

  const { t } = useTranslation('common');

  let filter = {
    status: { _eq: 'published' }
  };
  const { getNFTCollection } = API;
  const { data, loading } = useQuery(getNFTCollection, {
    variables: { filter },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });
  const options = useMemo(() => {
    const rs = [];
    if (data && data.nft_collection) {
      data.nft_collection.map(function (obj) {
        rs.push({
          value: parseInt(obj.id),
          label: obj.name
        });
      });
    }
    return rs;
  }, [data]);

  const filterOptions = (inputValue) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 1000);
    });

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    setState({ inputValue });
    return inputValue;
  };

  const child = loading ? (
    t('Loading...')
  ) : (
    <AsyncSelect
      placeholder={t('Select one NFT collection')}
      cacheOptions
      defaultOptions={options}
      loadOptions={loadOptions}
      onInputChange={handleInputChange}
      onChange={onChange}
    />
  );

  return (
    <Fragment>
      <div className={classes.root}>{child}</div>
    </Fragment>
  );
};

Selector.defaultProps = {};

Selector.propTypes = {
  classes: shape({
    root: string
  })
};

export default Selector;
