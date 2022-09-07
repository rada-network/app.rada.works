import React from 'react';
import Router from 'next/router';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';
import { ellipsify } from '../../../../../utils/strUtils';
import classes from './item.module.css';
import { useTheme } from 'next-themes';

const Item = (props) => {
  const { data } = props;

  const { data: session } = useSession();
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = React.useState(resolvedTheme === 'dark');
  React.useEffect(() => {
    resolvedTheme === 'dark' ? setIsDark(true) : setIsDark(false);
  }, [resolvedTheme]);
  const rootClassName = isDark ? 'rootDark' : 'root';

  const { t } = useTranslation('nft_collection_details');
  const viewDetails = () => {
    const path = `/nft-collection-details/${data.slug}`;
    Router.push(path);
  };

  const contractAdd = ellipsify({
    str: data.contract_address,
    start: 6,
    end: 4
  });
  return (
    <div className={`${classes[rootClassName]}`} onClick={viewDetails}>
      <div>Chain: {data.chain_name}</div>
      <div>Contract: {contractAdd}</div>
      ...Sub info of a NFT Collection here
    </div>
  );
};

Item.propTypes = {
  classes: shape({
    root: string
  }),
  data: shape({
    id: string,
    title: string
  })
};

export default Item;
