import React, { FunctionComponent, Fragment } from 'react';
import { Bidding } from 'src/ducks/nouns/nouns.types';
import ButtonLink from '../atoms/ButtonLink';
import Text from '../atoms/Text';
import TextLink from '../atoms/TextLink';

export type BiddingHistoryListProps = {
  tokenId: number;
  biddings: Bidding[];
};

const BiddingHistoryList: FunctionComponent<BiddingHistoryListProps> = ({
  tokenId,
  biddings,
}) => {
  const cloneBiddings = [...biddings];
  const firstBidding = cloneBiddings.shift();
  const lastBidding = cloneBiddings.pop();

  return (
    <Fragment>
      {biddings.length > 0 && (
        <div className="flex justify-center mt-8">
          <ul className="bg-white rounded-lg border border-gray-200 w-1/2 text-gray-900">
            {firstBidding && (
              <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                <div className="flex justify-between">
                  <div>
                    <TextLink
                      className="underline"
                      href={`${process.env.BSC_EXPLORER_URL}/tx/${firstBidding.transactionHash}`}
                    >
                      {firstBidding.fromAddress}
                    </TextLink>
                  </div>
                  <div>{firstBidding.biddedAmount} BNB</div>
                </div>
              </li>
            )}
            {cloneBiddings.map((bidding) => (
              <li
                key={bidding.nonce}
                className="px-6 py-2 border-b border-gray-200 w-full"
              >
                <div className="flex justify-between">
                  <div>
                    <TextLink
                      className="underline"
                      href={`${process.env.BSC_EXPLORER_URL}/tx/${bidding.transactionHash}`}
                    >
                      {bidding.fromAddress}
                    </TextLink>
                  </div>
                  <div>{bidding.biddedAmount} BNB</div>
                </div>
              </li>
            ))}
            {lastBidding && (
              <li className="px-6 py-2 w-full rounded-b-lg">
                <div className="flex justify-between">
                  <div>
                    <TextLink
                      className="underline"
                      href={`${process.env.BSC_EXPLORER_URL}/tx/${lastBidding.transactionHash}`}
                    >
                      {lastBidding.fromAddress}
                    </TextLink>
                  </div>
                  <div>{lastBidding.biddedAmount} BNB</div>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}

      {biddings.length === 0 && (
        <div className="flex justify-center mt-8">
          <div className="w-1/2">
            <div className="flex justify-start">
              <Text>No bidding</Text>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <div className="w-1/2">
          <div className="flex justify-end">
            <ButtonLink className="btn-blue" href={`/?tokenId=${tokenId}`}>
              Back
            </ButtonLink>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BiddingHistoryList;
