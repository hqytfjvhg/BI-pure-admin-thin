import { http } from "@/utils/http";

export function addRate(data) {
  return http.request("post", "/rate/addRate", { data });
}

export function deleteRateById(data) {
  return http.request("delete", "/rate/deleteRateById?id=" + data);
}

export function getAllRateInfo() {
  return http.request("get", "/rate/getAllRateInfo");
}

export function updateRateInfo(data) {
  return http.request("post", "/rate/updateRateInfo", { data });
}
