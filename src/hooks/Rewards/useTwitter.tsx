import Router from 'next/router';
import BrowserPersistence from '../../utils/simplePersistence';
const TwitterLogin = (props: any) => {
  const { reference_url } = props;
  const storage = new BrowserPersistence();
  if (reference_url) {
    storage.setItem('reference_url', reference_url, 24 * 60 * 60 * 1000);
  }
  Router.push('/api/twitter/callback?state=login');

  return true;
};
export default TwitterLogin;
