import { http } from "@/utils/http";

export function selectAllInternalClearingOrganization() {
  return http.request(
    "get",
    "/internalClearingOrganization/selectAllInternalClearingOrganization"
  );
}

export function deleteInternalClearingOrganization(data) {
  return http.request(
    "delete",
    "/internalClearingOrganization/deleteInternalClearingOrganization?id=" +
      data
  );
}

export function addInternalClearingOrganization(data) {
  return http.request(
    "post",
    "/internalClearingOrganization/addInternalClearingOrganization",
    { data }
  );
}

export function getAllDistributor() {
  return http.request("get", "/distributor/getAllDistributor");
}
