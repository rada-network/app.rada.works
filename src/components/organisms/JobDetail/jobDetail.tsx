import React, { Fragment, useEffect, useState } from 'react';
import { useJobList } from '../../../hooks/JobList';
import Image from 'next/image';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import '@reach/tabs/styles.css';
import Button from 'src/components/atoms/Button';
import classes from './jobDetail.module.css';
import { Brief } from './brief';
import { SubmitArtworks } from './submitArtworks';
import { Discussion } from './discussion';
const JobDetail = (props: { slug: [] }) => {
  const { slug } = props;
  const [isLoading, setLoading] = useState(false);
  const { loading, data, error } = useJobList({
    page: 'jobdetail',
    slug: slug ? slug[0] : '',
    operations: ''
  });
  useEffect(() => {
    setLoading(true);
    if (data) {
      setLoading(false);
    }
  }, [data, data?.jobs]);

  console.log(data);
  if (loading) {
    return <div>Loading...</div>;
  } else {
    const dataBrief = {
      classes: '',
      id: data?.job[0]?.id,
      title: data?.job[0]?.title,
      description: data?.job[0]?.description
    };
    return (
      <Fragment>
        <div>
          <div className="font-bold text-4xl dark:text-white">
            10000 NFT in 2d/3d
          </div>
          <div className={'flex items-center justify-between mb-2'}>
            <div className={'flex items-center'}>
              <img
                className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                src="https://picsum.photos/200"
              />
              <div className={'text-sm font-medium'}>
                {data?.user_id?.email}
              </div>
              <span className={'opacity-70 text-xs ml-2 -mb-0.5'}>
                Posted 16 days ago
              </span>
            </div>
            <div>
              <Button className={`${classes.Submit} btn`}>
                Submit your work
              </Button>
            </div>
            <Image
              src="/chains/ethereum.svg"
              alt="Ethereum"
              width="24"
              height="24"
              className={''}
            />
          </div>
        </div>
        <Tabs>
          <TabList>
            <Tab>Brief</Tab>
            <Tab>Submit Artworks</Tab>
            <Tab>Discussion</Tab>
          </TabList>
          <hr />
          <TabPanels>
            <TabPanel>
              <Brief data={dataBrief} />
            </TabPanel>
            <TabPanel>
              <SubmitArtworks />
            </TabPanel>
            <TabPanel>
              <Discussion />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Fragment>
    );
  }
};

export default JobDetail;
