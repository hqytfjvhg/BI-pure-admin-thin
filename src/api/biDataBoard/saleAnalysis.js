import { http } from "@/utils/http";

//图一和图七
export function getDistributorMonthAndYearSaleMoney(data) {
  return http.request(
    "get",
    "/distributorData/getDistributorMonthAndYearSaleMoney?distributorName=" +
      data
  );
}

//获取经销商
export function getDistributorSearchCondition() {
  return http.request("get", "/distributorData/getDistributorSearchCondition");
}

//获取图二数据
export function getDistributorSaleMoneyByQuarter(data) {
  return http.request(
    "get",
    "/distributorData/getDistributorSaleMoneyByQuarter?distributorName=" + data
  );
}

//获取图四的数据
export function getDistributorSaleMoneyRangeProduct(data) {
  return http.request(
    "post",
    "/distributorData/getDistributorSaleMoneyRangeProduct",
    { data }
  );
}

//获取图三的数据
export function getDistributorProductSaleClass(data) {
  return http.request(
    "get",
    "/distributorData/getDistributorProductSaleClass?distributorName=" + data
  );
}

//获取图五的数据
export function getDistributorSaleQTYRangeProduct(data) {
  return http.request(
    "post",
    "/distributorData/getDistributorSaleQTYRangeProduct",
    { data }
  );
}

//获取图六的数据
export function getDistributorProductSaleDataGather(data) {
  return http.request(
    "get",
    "/distributorData/getDistributorProductSaleDataGather?distributorName=" +
      data.distributorName +
      "&notAllYear=" +
      data.notAllYear
  );
}
