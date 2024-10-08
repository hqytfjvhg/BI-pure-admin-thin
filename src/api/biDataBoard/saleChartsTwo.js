import { http } from "@/utils/http";

//经销商产品销售数据
export const getTopNumberProductSaleInfoByCondition = data => {
  return http.request(
    "POST",
    "/saleData/getTopNumberProductSaleInfoByCondition",
    {
      data
    }
  );
};

//产品类型的销售数据
export const getTopNumberProductTypeSaleInfoByCondition = data => {
  return http.request(
    "POST",
    "/saleData/getTopNumberProductTypeSaleInfoByCondition",
    {
      data
    }
  );
};
