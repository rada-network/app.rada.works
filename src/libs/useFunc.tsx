export const subString = (props: any) => {
  if (typeof props.start === 'undefined') props.start = 5;
  if (!props.end) props.end = 3;
  const { str, start, end } = props;
  if (str.length > start) {
    return str.slice(0, start) + '...' + str.slice(str.length - end);
  }
  return str;
};
export const formatDate = (date: {
  getDate: () => any;
  getMonth: () => number;
  getFullYear: () => any;
}) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear()
  ].join('-');
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}
