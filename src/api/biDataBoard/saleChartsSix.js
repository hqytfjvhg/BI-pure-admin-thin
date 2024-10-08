import { http } from "@/utils/http";

export function comparisonDistributorSaleProductData(data) {
  return http.request(
    "post",
    "/saleData/comparisonDistributorSaleProductData",
    {
      data
    }
  );
}
