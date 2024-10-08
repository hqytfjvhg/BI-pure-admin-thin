import { http } from "@/utils/http";

//获取图一数据
export function getRegionSaleData() {
  return http.request("get", "/monthlySummary/getRegionSaleData");
}

//获取图二数据
export function getTop10SaleMoneyRegion() {
  return http.request("get", "/monthlySummary/getTop10SaleMoneyRegion");
}
//获取图三数据
export function getLastAndCurrentYearSaleMoney() {
  return http.request("get", "/monthlySummary/getLastAndCurrentYearSaleMoney");
}
//获取图四数据
export function getProductMarketDateToLastMonthSaleQTY() {
  return http.request(
    "get",
    "/monthlySummary/getProductMarketDateToLastMonthSaleQTY"
  );
}
//获取图五数据
export function getSaleContemporaneousComparison() {
  return http.request(
    "get",
    "/monthlySummary/getSaleContemporaneousComparison"
  );
}
//获取图六数据
export function getCurrentYearTotalSaleMoney() {
  return http.request("get", "/monthlySummary/getCurrentYearTotalSaleMoney");
}
//获取图七八数据
export function getLastMonthCompareGroupByProductClass() {
  return http.request(
    "get",
    "/monthlySummary/getLastMonthCompareGroupByProductClass"
  );
}
