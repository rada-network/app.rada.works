import { getToken } from 'next-auth/jwt';
import Twitter from 'twitter-lite';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  try {
    const access_token: any = token?.credentials;
    const userProfile: any = token?.userProfile;
    const twitterClient = new Twitter({
      consumer_key: `${process.env.TWITTER_CONSUMER_KEY}`,
      consumer_secret: `${process.env.TWITTER_CONSUMER_SECRET}`,
      access_token_key: access_token?.authToken, // from your User (oauth_token)
      access_token_secret: access_token?.authSecret // from your User (oauth_token_secret)
    });
    //
    const userData = await twitterClient.get('users/show', {
      id: userProfile.userID,
      screen_name: userProfile.twitterHandle
    });

    const data = {
      twitterHandle: userData.screen_name,
      followersCount: userData.followers_count,
      followingCount: userData.friends_count,
      description: userData.description,
      location: userData.location
    };

    return res.status(200).json({
      status: 'Ok',
      data
    });
  } catch (error) {
    // return error;
    return res.status(500).send({ error });
  }
};
