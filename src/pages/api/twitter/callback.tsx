import { Client, auth } from 'twitter-api-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import BrowserPersistence from '../../../utils/simplePersistence';
// eslint-disable-next-line import/no-anonymous-default-export
const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_ID,
  client_secret: process.env.TWITTER_SECRET,
  callback: process.env.NEXTAUTH_URL + '/api/twitter/callback',
  scopes: ['tweet.read', 'users.read', 'offline.access']
});
const client = new Client(authClient);
const storage = new BrowserPersistence();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code, state } = req.query;
    if (state === 'login') {
      const authUrl = authClient.generateAuthURL({
        state: 'verify',
        code_challenge_method: 's256'
      });
      res.redirect(authUrl);
    } else {
      const access_res = await authClient.requestAccessToken(code as string);
      if (access_res) {
        const response = await client.users.findMyUser();
        storage.setItem('twitter', response, 24 * 60 * 60 * 1000);
        const ref = storage.getItem('reference_url');
        res.redirect(ref ? ref : '/');
      }
    }
  } catch (error) {
    console.log(error);
  }
};
