import { Client } from 'twitter-api-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
