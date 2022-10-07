import { Client } from 'twitter-api-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.query.userId;
    const client = new Client(process.env.TWITTER_BEARER_TOKEN);
    const followers = client.users.usersIdFollowers('1574963666918600704');
    const checked = false;
    for await (const page of followers) {
      page.data.forEach((item) => {
        console.log(item.name + ':' + item.id);
        // if (item.id === userId) {
        //   checked = true;
        // }
      });
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
