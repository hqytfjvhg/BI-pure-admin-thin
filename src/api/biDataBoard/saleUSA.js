import { http } from "@/utils/http";

export const getAmericaRegionAllDistributorEveryMonthSale = data => {
  return http.request(
    "post",
    "/saleData/getAmericaRegionAllDistributorEveryMonthSale",
    { data }
  );
};
