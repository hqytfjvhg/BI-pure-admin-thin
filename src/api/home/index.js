import { http } from "@/utils/http";

export function getLastThreeMonthSaleMoney() {
  return http.request("post", "/home/getLastThreeMonthSaleMoney");
}

export function getLast12MonthTotalSaleMoneyTop10Product() {
  return http.request("post", "/home/getLast12MonthTotalSaleMoneyTop10Product");
}
export function getTotalSaleMoneyTop10Product() {
  return http.request("post", "/home/getTotalSaleMoneyTop10Product");
}

export function getLastYearAndCurrentYearTotalSaleMoney() {
  return http.request("post", "/home/getLastYearAndCurrentYearTotalSaleMoney");
}

export function getLast5YearTotalSaleMoney() {
  return http.request("post", "/home/getLast5YearTotalSaleMoney");
}
export function getAllSaleMoneyTop10DistributorName() {
  return http.request("post", "/home/getAllSaleMoneyTop10DistributorName");
}
