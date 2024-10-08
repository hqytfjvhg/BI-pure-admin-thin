import { http } from "@/utils/http";

export function getAllBrand() {
  return http.request("get", "/productClassification/getAllBrand");
}

export function delBrand(data) {
  return http.request("post", "/productClassification/delBrand", { data });
}

export function addBrand(data) {
  return http.request("post", "/productClassification/addBrand", { data });
}

export function updateBrand(data) {
  return http.request("post", "/productClassification/updateBrand", { data });
}

//查看单品牌下的系列
export function getAllSeriesByBrandId(data) {
  return http.request(
    "get",
    "/productClassification/getAllSeriesByBrandId?brandId=" + data
  );
}
