import React, { Fragment, FunctionComponent } from 'react';
import Image from 'next/image';
import { ArtistData } from './sampleData';
interface Props {
  data: typeof ArtistData;
}
export const SubmitedArtworks: FunctionComponent<Props> = (props) => {
  const { data } = props;
  console.log(data);
  if (data === undefined) {
    const child = (
      <div className="flex justify-center">
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src={/*data.avatar*/ 'https://picsum.photos/200'}
            alt="No artworks"
            width="400"
            height="400"
          />
        </div>
      </div>
    );
  } else {
    const child = (
      <div>
        {data.title} {data.description}
      </div>
    );
  }
  return (
    <Fragment>
      <div>{child}</div>
    </Fragment>
  );
};
