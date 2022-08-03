import React, { Fragment } from 'react';
import { useJobList } from '../../../hooks/JobList';
import Image from 'next/image';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import '@reach/tabs/styles.css';
import Button from 'src/components/atoms/Button';
import classes from './jobDetail.module.css';
import { Brief } from './brief';
import { SubmitArtworks } from './submitArtworks';
import { Discussion } from './discussion';
import Sidebars from '../Sidebars';

const JobDetail = (props: { slug: string }) => {
  const { slug } = props;
  const { loading, data, error } = useJobList({
    page: 'jobdetail',
    slug: slug ?? '',
    operations: ''
  });

  if (loading) {
    return <div>Loading...</div>;
  } else if (error || !data?.job?.[0]) {
    return <div>Job not found...</div>;
  } else {
    const dataBrief = {
      classes: '',
      id: data?.job[0]?.id,
      title: data?.job[0]?.title,
      description: data?.job[0]?.description
    };
    const owner = {
      address: '0x947b3337aC64d4676F11431AA67BDE90E63B11E9'
    };
    return (
      <Fragment>
        <div>
          <div className="font-bold text-4xl dark:text-white">
            {data?.job[0]?.title}
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
          <TabPanels>
            <TabPanel>
              <div className="flex">
                <div className=" flex justify-between items-center basis-3/4 border-r border-r-gray-200 pr-16">
                  <Brief data={dataBrief} />
                </div>
                <div className="basis-1/4 pl-16 flex items-center">
                  <Sidebars
                    owner={owner}
                    artist={{ a: true }}
                    joinContest={{ demo: true }}
                  />
                </div>
              </div>
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
