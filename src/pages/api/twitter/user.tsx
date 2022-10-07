import { Client } from 'twitter-api-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const access_token: any = token?.credentials;
    // const twUserProfile: any = token?.twUserProfile;
    // const twitterClient = new Twitter({
    //   consumer_key: `${process.env.TWITTER_CONSUMER_KEY}`,
    //   consumer_secret: `${process.env.TWITTER_CONSUMER_SECRET}`,
    //   access_token_key: access_token?.authToken, // from your User (oauth_token)
    //   access_token_secret: access_token?.authSecret // from your User (oauth_token_secret)
    // });
    //
    // const userData = await twitterClient.get('users/show', {
    //   id: twUserProfile.userId,
    //   screen_name: twUserProfile.screenName
    // });

    // const data = {
    //   screenName: userData.screen_name,
    //   followersCount: userData.followers_count,
    //   followingCount: userData.friends_count,
    //   description: userData.description,
    //   location: userData.location
    // };

    const user_id = req.query.user_id;
    const owner_id = `${req.query.owner_id}` || '1574963666918600704';
    const client = new Client(process.env.TWITTER_BEARER_TOKEN);
    const followers = client.users.usersIdFollowers(owner_id);
    let checked = false;
    for await (const page of followers) {
      page.data.forEach((item) => {
        if (item.id === user_id) {
          checked = true;
        }
      });
      if (checked) break;
    }

    return res.status(200).json({
      status: 'Ok',
      checked
    });
  } catch (error) {
    // return error;
    return res.status(500).send({ error });
  }
};
