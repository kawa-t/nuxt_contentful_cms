import { Plugin } from "@nuxt/types";

const getFormattedDate = (date: Date) => {
  const originDate = new Date(date);
  const year = originDate.getFullYear();
  const month = originDate.getMonth() + 1;
  const day = originDate.getDate();
  return `${year}年${month}月${day}日`;
};

const myPlugin: Plugin = (context, inject) => {
  inject("getFormattedDate", getFormattedDate);
};

export default myPlugin;
