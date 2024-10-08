import { http } from "@/utils/http";

//查询日期下的产品
export const getProductNameByProdctDate = data => {
  return http.request(
    "post",
    "/productClassification/getProductNameByProdctDate",
    { data }
  );
};

//图一
export const getSaleDataByProductAndDate = data => {
  return http.request(
    "post",
    "/saleData/getSaleDataByProductAndDate?productName=" +
      data.productName +
      "&pruductDate=" +
      data.productDate
  );
};

//图二
export const getSaleDataInRegionByProductAndDate = data => {
  return http.request(
    "post",
    "/saleData/getSaleDataInRegionByProductAndDate?productName=" +
      data.productName +
      "&pruductDate=" +
      data.productDate +
      "&month=" +
      data.month
  );
};
