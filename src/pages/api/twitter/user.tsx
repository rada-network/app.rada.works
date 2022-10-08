import { Client } from 'twitter-api-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Client(process.env.TWITTER_BEARER_TOKEN);

  try {
    const { task } = req.query;
    if (task === 'follower') {
      const user_id = req.query.user_id;
      const owner_id = `${req.query.owner_id}`;
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
    } else if (task === 'getid') {
      const screen_name = req.query.screen_name;
      const user = await client.users.findUserByUsername(screen_name as string);

      return res.status(200).json(user);
    } else if (task === 'tweets') {
      const { user_id, tweet_id } = req.query;
      const lists = client.users.tweetsIdRetweetingUsers(tweet_id as string);

      let checked = false;
      for await (const list of lists) {
        console.log('====================================');
        console.log(list.data);
        console.log('====================================');
        if (!list.data) break;
        list.data.forEach((item) => {
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
    } else if (task === 'liked') {
      const { user_id, tweet_id } = req.query;
      const lists = client.users.tweetsIdLikingUsers(tweet_id as string);

      let checked = false;
      for await (const list of lists) {
        console.log('====================================');
        console.log(list.data);
        console.log('====================================');
        if (!list.data) break;
        list.data.forEach((item) => {
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
    } else {
      return res.status(200).json({
        status: 'Ok'
      });
    }
  } catch (error) {
    // return error;
    return res.status(500).send({ error });
  }
};
