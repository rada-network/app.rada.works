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
};
const TwitterFollow = async (props: any) => {
  const { user_id, owner_id } = props;
  let checked = false;
  await fetch('/api/twitter/user?user_id=' + user_id + '&owner_id=' + owner_id)
    .then((res) => res.json())
    .then((data) => {
      checked = data.checked;

      console.log('====================================');
      console.log(data);
      console.log('====================================');
    });
  console.log('====================================');
  console.log(checked);
  console.log('====================================');
  return checked;
};
const TwitterLike = async (props: any) => {
  const { user_id, tweet_id } = props;
  let checked = false;
  await fetch('/api/twitter/like?user_id=' + user_id + '&tweet_id=' + tweet_id)
    .then((res) => res.json())
    .then((data) => {
      checked = data.checked;
    });

  return checked;
};
export { TwitterLogin, TwitterFollow, TwitterLike };
