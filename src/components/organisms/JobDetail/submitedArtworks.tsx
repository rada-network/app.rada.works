import React, { Fragment, FunctionComponent } from 'react';
import { useSession } from 'next-auth/react';
import ConnectWallet from '../ConnectWallet';
import { useTranslation } from 'next-i18next';
import { subString } from 'src/libs/useFunc';
import Image from 'next/image';
import Button from '../../atoms/Button';

import { ArtistData } from './sampleData';
interface Props {
  data: object;
}
export const SubmitedArtworks: FunctionComponent<Props> = (props) => {
  const { data } = props;
  const { status } = useSession();
  const { t } = useTranslation('submitArtwork');
  console.log(data);
  const submitHandle = (e: any) => {
    e.preventDefault();
    console.log('submit');
  };
  let child;
  if (ArtistData === undefined || ArtistData.length === 0) {
    child = (
      <div className="flex justify-center">
        <div className="">
          <Image
            src="/submited-artworks.png"
            alt="No artworks"
            width="400"
            height="400"
          />
          <h2> {t(`No designs yet!`)}</h2>
          <p>
            {t(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac leo dui.Sed porttitor augue erat, a hendrerit neque.'
            )}
          </p>
          {status === 'authenticated' ? (
            <Button type="button" priority="high" onClick={submitHandle}>
              {t('Submit a design')}
            </Button>
          ) : (
            <ConnectWallet />
          )}
        </div>
      </div>
    );
  } else {
    child = ArtistData.map((art: any, index: number) => {
      return (
        <div key={index}>
          <div className="font-bold text-4xl dark:text-white">
            {art?.job?.[0]?.title}
          </div>
          <div className={'flex items-center justify-between mb-2'}>
            <div className={'flex items-center'}>
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                src="https://picsum.photos/200"
              />
              <div className={'text-sm font-medium'}>
                {subString({ str: art?.email, start: 5, end: 3 })}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <Fragment>
      <div>{child}</div>
    </Fragment>
  );
};
