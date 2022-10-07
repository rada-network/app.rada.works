import Router from 'next/router';
const TwitterLogin = (props: any) => {
  let { reference_url } = props;
  const lastChar = reference_url.substr(reference_url.length - 1);
  if (lastChar === '#') {
    reference_url = reference_url.slice(0, -1);
  }
  Router.push(
    '/api/twitter/callback?state=login&reference_url=' +
      encodeURIComponent(reference_url)
  );

  return true;
};
export default TwitterLogin;
