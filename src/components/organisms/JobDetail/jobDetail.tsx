import React, { Fragment } from 'react';
import Image from 'next/image';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import '@reach/tabs/styles.css';
import { useJob } from '../../../hooks/JobList';
import { formatEndDate, subString } from 'src/libs/useFunc';
import Button from '../../atoms/Button';
import classes from './jobDetail.module.css';
import { Brief } from './brief';
import { SubmitedArtworks } from './submitedArtworks';
import { Discussion } from './discussion';
import { ArtistDetail } from './artistDetail';
import { AboutContest } from './aboutContest';
import { JoinContest } from './joinContest';
import { DateCounting } from './dateCounting';

const JobDetail = (props: { slug: string }) => {
  const { t } = useTranslation('jobDetail');
  const { slug } = props;
  const { loading, data, error } = useJob({
    slug: { _eq: slug } ?? ''
  });

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (error !== undefined || !data?.job?.[0]) {
      return <div>Job not found...</div>;
    } else {
      const dataBrief = {
        classes: '',
        id: data?.job?.[0]?.id,
        title: data?.job?.[0]?.title,
        description: data?.job?.[0]?.description
      };
      const startDate = moment(data?.job?.[0]?.date_created).format(
        'ddd: DD MMM, YYYY'
      );
      const endDate = moment(
        formatEndDate(
          data?.job?.[0]?.duration,
          new Date(data?.job?.[0]?.date_created)
        )
      ).format('ddd: DD MMM, YYYY');
      const owner = {
        address: data?.job?.[0]?.user_created?.email,
        avatar: 'https://avatars3.githubusercontent.com/u/8186664?s=460&v=4',
        date_created: startDate,
        date_ends: endDate
      };

      return (
        <Fragment>
          <div>
            <div className="font-bold text-4xl dark:text-white">
              {data?.job?.[0]?.title}
            </div>
            <div className={'flex items-center justify-between mb-2'}>
              <div className={'flex items-center'}>
                <img
                  className={'avatar-sm w-6 h-6 rounded-full mr-2'}
                  src="https://picsum.photos/200"
                />
                <div className={'text-sm font-medium'}>
                  {subString({
                    str: data?.job?.[0]?.user_created?.email,
                    start: 5,
                    end: 3
                  })}
                </div>
                <div className="flex items-center">
                  <img
                    className="w-5 h-5 text-yellow-400"
                    src="/star.svg"
                    alt="star"
                  />
                  <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                    4.95
                  </p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                </div>
                <span className={'opacity-70 text-xs ml-2 -mb-0.5'}>
                  Posted 16 days ago
                </span>
              </div>
              <div>
                <Button type="button" priority="high">
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
            <TabList className="flex mb-6">
              <Tab className="border-b">Brief</Tab>
              <Tab>Submited Artworks</Tab>
              <Tab>Discussion</Tab>
            </TabList>
            <DateCounting date={owner.date_ends} />
            <TabPanels>
              <TabPanel>
                <div className="flex">
                  <div className=" flex justify-between items-center basis-3/4 border-r border-r-gray-200 dark:border-r-gray-800 pr-16">
                    <Brief data={dataBrief} />
                  </div>
                  <div className="basis-1/4 pl-16 flex items-center">
                    <div>
                      <AboutContest data={owner} />
                      <ArtistDetail data={{ demo: true }} />
                      <JoinContest data={{ demo: true }} />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <SubmitedArtworks data={[]} />
              </TabPanel>
              <TabPanel>
                <Discussion />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Fragment>
      );
    }
  }
};

export default JobDetail;
