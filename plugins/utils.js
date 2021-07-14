const getFormattedDate = date => {
  const originDate = new Date(date);
  const year = originDate.getFullYear();
  const month = originDate.getMonth() + 1;
  const day = originDate.getDate();
  return `${year}年${month}月${day}日`;
};

export default ({ app }, inject) => {
  inject("getFormattedDate", getFormattedDate);
};
