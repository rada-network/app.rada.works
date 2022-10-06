import Router from 'next/router';
import BrowserPersistence from '../../utils/simplePersistence';
const TwitterLogin = (props: any) => {
  const { reference_url } = props;
  const storage = new BrowserPersistence();
  if (reference_url) {
    storage.setItem('reference_url', reference_url, 24 * 60 * 60);
  }
  Router.push(
    '/api/twitter/callback?state=login&reference_url=' +
      encodeURIComponent(reference_url)
  );

  return true;
};
export default TwitterLogin;
