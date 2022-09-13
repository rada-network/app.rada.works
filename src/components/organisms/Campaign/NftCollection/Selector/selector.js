import React, { useState, useMemo, Fragment } from 'react';
import { func, shape, string, array } from 'prop-types';
import classes from './selector.module.css';
import { useTranslation } from 'next-i18next';
import AsyncSelect from 'react-select/async';
import { useQuery } from '@apollo/client';
import API from './api.gql';
import { ellipsify, capitalize } from '../../../../../utils/strUtils';

const Selector = (props) => {
  const { selectedOption, handleChange } = props;

  const [state, setState] = useState({ inputValue: '' });

  const { t } = useTranslation('common');

  let filter = {
    status: { _eq: 'published' }
  };
  const { getNFTCollection } = API;
  const { data, loading } = useQuery(getNFTCollection, {
    variables: {
      filter,
      sort: ['-id', 'chain_name'],
      limit: 10,
      offset: null,
      page: 1,
      search: state.inputValue
    },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  const options = useMemo(() => {
    const rs = [];
    if (data && data.nft_collection) {
      data.nft_collection.map(function (obj) {
        const chainName = capitalize(obj.chain_name);
        const contractAdd = ellipsify({
          str: obj.contract_address,
          start: 5,
          end: 4
        });
        rs.push({
          value: parseInt(obj.id),
          label: `${chainName} > ${obj.name} (${contractAdd})`
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
      }, 2000);
    });

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    setState({ inputValue });
    return inputValue;
  };

  return (
    <Fragment>
      <div className={`${classes.rwdSelector}`}>
        <AsyncSelect
          placeholder={t('Select one NFT collection')}
          cacheOptions
          closeMenuOnSelect={false}
          isMulti
          defaultValue={selectedOption}
          defaultInputValue={state.inputValue}
          defaultOptions={options}
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={handleChange}
          className="rdwSelectorContainer"
          classNamePrefix="rdw"
        />
      </div>
    </Fragment>
  );
};

Selector.defaultProps = {};

Selector.propTypes = {
  classes: shape({
    root: string
  }),
  selectedOption: array,
  handleChange: func
};

export default Selector;
