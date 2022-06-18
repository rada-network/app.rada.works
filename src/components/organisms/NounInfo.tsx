import BigNumber from 'bignumber.js';
import Image from 'src/components/atoms/Image';
import Text from 'src/components/atoms/Text';
import Title from 'src/components/atoms/Title';
import React, { FunctionComponent, Fragment } from 'react';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import { useRouter } from 'next/router';
import styles from './NounInfo.module.css';
import Web3 from 'web3';
import { formatISO, isAfter, isBefore } from 'date-fns';
import ConnectWallet from './ConnectWallet';
import { getCurrentTime } from 'src/libs/dateUtil';
import { useDispatch, useSelector } from 'react-redux';
import { settleAuction } from 'src/ducks/wallets/wallets.operations';
import { useWeb3Context } from 'src/libs/web3-context';
import CreateBidForm from './CreateBidForm';
import { useCurrentTokenId } from 'src/libs/useCurrentTokenId';
import TextLink from '../atoms/TextLink';

export type NounInfoProps = {
  nounInfo: {
    name: string;
    description: string;
    imageSrc: string;
    ownerAddress: string;
  };
  nounAuctionInfo: {
    nftId: number;
    amount: BigNumber;
    startTime: Date;
    endTime: Date;
    bidder: string;
    settled: boolean;
  };
};

const NounInfo: FunctionComponent<NounInfoProps> = ({
  nounInfo,
  nounAuctionInfo,
}) => {
  const router = useRouter();
  const web3Context = useWeb3Context();

  const currentTokenId = useCurrentTokenId();
  const now = getCurrentTime();
  const walletsSelector = useSelector((state) => state.wallets);
  const dispatch = useDispatch();

  const goLeft: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = (
    event,
  ) => {
    event.preventDefault();
    if (!currentTokenId || currentTokenId === 1) {
      return;
    }

    router.push({
      pathname: router.pathname,
      query: { ...router.query, tokenId: (currentTokenId - 1).toString() },
    });
  };

  const goRight: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void = (event) => {
    event.preventDefault();

    if (!currentTokenId) {
      return;
    }

    router.push({
      pathname: router.pathname,
      query: { ...router.query, tokenId: (currentTokenId + 1).toString() },
    });
  };

  const settleAuctionClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void = (event) => {
    event.preventDefault();

    if (!currentTokenId) {
      return;
    }

    settleAuction(
      dispatch,
      router,
      web3Context.bscWeb3 as Web3,
      walletsSelector.walletInfo?.web3 as Web3,
      walletsSelector.walletInfo?.account as string,
    );
  };

  if (!currentTokenId) {
    return <></>;
  }

  return (
    <Fragment>
      <div className="container mx-auto">
        <div className="flex m-8 ">
          <ConnectWallet />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex m-8">
          <div className={`${styles['c-NounInfoImage']} flex-1 w-64`}>
            <Image src={nounInfo.imageSrc} />
          </div>
          <div className={`flex-1 w-32 ml-8`}>
            <div>
              <Button
                className={styles['btn-blue']}
                onClick={goLeft}
                disabled={currentTokenId <= 0}
              >
                <Icon className="fas fa-angle-left" />
              </Button>
              <Button className={styles['btn-blue']} onClick={goRight}>
                <Icon className="fas fa-angle-right" />
              </Button>
            </div>
            <Title className="size-medium">{nounInfo.name}</Title>
            <Text>{nounInfo.description}</Text>

            {currentTokenId !== nounAuctionInfo.nftId && nounInfo.ownerAddress && (
              <Fragment>
                <div>
                  <Title className="size-small">Winner</Title>
                  <Text>{nounInfo.ownerAddress}</Text>
                </div>
                <div className="mt-8">
                  <TextLink
                    className="underline"
                    href={`/bidding-history/${currentTokenId}`}
                  >
                    View bidding history
                  </TextLink>
                </div>
              </Fragment>
            )}
            {currentTokenId === nounAuctionInfo.nftId &&
              !nounAuctionInfo.settled && (
                <Fragment>
                  <div>
                    <Title className="size-small">Current Bid</Title>
                    <Text>
                      {Web3.utils.fromWei(
                        nounAuctionInfo.amount.toString(),
                        'ether',
                      )}{' '}
                      BNB
                    </Text>
                  </div>
                  {nounAuctionInfo.bidder !==
                    '0x0000000000000000000000000000000000000000' && (
                    <Fragment>
                      <div>
                        <Title className="size-small">Winning Bidder</Title>
                        <Text>{nounAuctionInfo.bidder}</Text>
                      </div>
                      <div className="mt-6">
                        <TextLink
                          className="underline"
                          href={`/bidding-history/${currentTokenId}`}
                        >
                          View bidding history
                        </TextLink>
                      </div>
                    </Fragment>
                  )}

                  <div className="mb-6 mt-6">
                    <Title className="size-small">Auction end in</Title>
                    {/* TODO: use countdown component */}
                    <Text>{formatISO(nounAuctionInfo.endTime)}</Text>
                  </div>

                  {/* TODO: automatically settle by settle watcher */}
                  {isAfter(now, nounAuctionInfo.endTime) &&
                    !nounAuctionInfo.settled &&
                    walletsSelector.walletInfo && (
                      <div className="mt-8">
                        <Button
                          className={styles['btn-blue']}
                          onClick={settleAuctionClick}
                        >
                          Settle auction
                        </Button>
                      </div>
                    )}

                  {isBefore(now, nounAuctionInfo.endTime) &&
                    nounAuctionInfo.endTime &&
                    walletsSelector.walletInfo && (
                      <CreateBidForm tokenId={currentTokenId} />
                    )}
                </Fragment>
              )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NounInfo;
