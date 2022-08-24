export const ellipsify = (props) => {
  if (typeof props.start === 'undefined') props.start = 5;
  if (!props.end) props.end = 3;
  const { str, start, end } = props;
  if (str.length > start) {
    return str.slice(0, start) + '...' + str.slice(str.length - end);
  }
  return str;
};

export default {
  ellipsify
};
