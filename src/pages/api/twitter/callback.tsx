import { Client, auth } from 'twitter-api-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_ID,
  client_secret: process.env.TWITTER_SECRET,
  callback: process.env.NEXTAUTH_URL + '/api/twitter/callback',
  scopes: ['tweet.read', 'users.read', 'offline.access']
});
const client = new Client(authClient);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code, state, reference_url, error } = req.query;
    if (state === 'login') {
      const authUrl = authClient.generateAuthURL({
        state: `${reference_url}`,
        code_challenge_method: 's256'
      });
      res.redirect(authUrl);
      res.end();
    } else if (state) {
      const accessToken = await authClient.requestAccessToken(code as string);
      if (accessToken) {
        const response = await client.users.findMyUser();
        const redirectUrl = state
          ? `${state}?user=${encodeURIComponent(
              response.data.username
            )}&name=${encodeURIComponent(response.data.name)}&uid=${
              response.data.id
            }`
          : '/';
        res.redirect(redirectUrl);
        res.end();
      } else {
        res.redirect(decodeURIComponent(state as string));
      }
    }
    if (error) {
      res.redirect(decodeURIComponent(state as string) + '?error=' + error);
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error);
    }
    res.status(404).json({ error: 'Something went wrong.' });
  }
};
