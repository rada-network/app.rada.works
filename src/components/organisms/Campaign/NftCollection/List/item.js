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
      <div className="overflow-hidden rounded-t-lg -ml-px -mr-px -mt-px max-h-52">
        <img
          src="collection/quark/quark-3.png"
          alt="Quark 1"
          className="w-full"
        />
      </div>

      <div className="flex items-center justify-center flex-col px-4 -mt-10">
        <div className="border-4 border-white shadow-md w-20 h-20 overflow-hidden rounded-full">
          <img src="/collection/collection-avt.png" alt="Connection" />
        </div>

        <div className="pt-4 text-center">
          <h3 className="mt-0 mb-2 font-semilbold text-lg text-gray-800 leading-none">
            Collection name
          </h3>
          <div className="m-0 flex items-center">
            <span
              className={`${classes.bsc} bg-gray-50 inline-block h-7 w-7 rounded-full mr-2 bsc`}
            />
            {contractAdd}
          </div>
        </div>
      </div>

      <div className="p-4 text-center">
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt.
      </div>
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
