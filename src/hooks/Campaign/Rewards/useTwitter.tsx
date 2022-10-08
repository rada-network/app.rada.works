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
  await fetch(
    '/api/twitter/user?task=follower&user_id=' +
      user_id +
      '&owner_id=' +
      owner_id
  )
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
const getTwitterUserIdByUsermame = async (props: any) => {
  const { user_id } = props;
  let id = 0;
  await fetch('/api/twitter/user?task=getid&screen_name=' + user_id)
    .then((res) => res.json())
    .then((data) => {
      id = data?.data?.id;
    });
  return id;
};
const TwitterLike = async (props: any) => {
  const { user_id, tweet_id } = props;
  let checked = false;
  await fetch(
    '/api/twitter/user?task=tweets&user_id=' + user_id + '&tweet_id=' + tweet_id
  )
    .then((res) => res.json())
    .then((data) => {
      checked = data.checked;
    });

  return checked;
};
export { TwitterLogin, TwitterFollow, TwitterLike, getTwitterUserIdByUsermame };
