import React, { Fragment } from 'react';
import AbountContest from '../AboutContest';
import ArtistDetail from '../ArtistDetail';
import HowtoJoinContest from '../HowtoJoinContest';
import classes from './sidebars.module.css';
const Sidebars = (props: any) => {
  const { owner, artist, joinContest } = props;
  console.log(joinContest);
  return (
    <Fragment>
      <div className={classes.root}>
        {owner && <AbountContest data={owner} />}
        {artist && <ArtistDetail data={{ a: true }} />}
        {joinContest && <HowtoJoinContest data={joinContest} />}
      </div>
    </Fragment>
  );
};
export default Sidebars;
