import { http } from "@/utils/http";
//销售金额数量前10
export const getTopTenData = data => {
  return http.request("POST", "/saleData/getTopNumberProductSaleInfoByRegion", { data });
};
//销售金额数量前20
export const getTwentyData = data => {
  return http.request("POST", "/saleData/getTopNumberDistributorNameByRegionAndProductName", { data });
};