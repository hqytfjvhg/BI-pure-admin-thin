import { i18n } from "@/plugins/i18n";
const { locale } = i18n.global;
//转换英文日期
export const transformDate = date => {
  return (
    date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0]
  );
};

//获取某月到月底的日期，并根据中英文转换

export const getMonthEnd = val => {
  const year = new Date(val).getFullYear();
  const month = new Date(val).getMonth() + 1;
  const day = new Date(year, month, 0).getDate();
  if (locale.value === "zh") {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  } else {
    return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  }
};
