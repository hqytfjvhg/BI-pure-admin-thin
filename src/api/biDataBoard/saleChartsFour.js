import { http } from "@/utils/http";
//第一个图表
export const getOneData = (name, timeArr) => {
  let startDate = ''
  let endDate = ''
  if(timeArr.length > 0){
    startDate = timeArr[0]
    endDate = timeArr[1]
  }
  return http.request(
    "POST",
    `/saleData/getProductSaleDataFromStartToCurrent?productName=${name}&startDate=${startDate}&endDate=${endDate}`
  );
};
//第二个图表
export const getTwoData = data => {
  return http.request(
    "POST",
    "/saleData/getTopNumberProductSaleMoneyByCurrentTime",
    { data }
  );
};
