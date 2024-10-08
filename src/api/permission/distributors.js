import { http } from "@/utils/http";

//获取bi经销商列表
export const getDistributorPage = data => {
  return http.request("post", "/distributor/getDistributorPage", { data });
};
//获取经销商不分页
export const selectDistributor = () => {
  return http.request(
    "get",
    "/distributor/selectDistributorNameFromStreamLine"
  );
};

//删除经销商
export const deleteDistributor = data => {
  return http.request("delete", "/distributor/deleteDistributor?id=" + data);
};

//修改经销商
export const updateDistributor = data => {
  return http.request("post", "/distributor/updateDistributor", { data });
};
//新增经销商
export const addDistributor = data => {
  return http.request("post", "/distributor/addDistributor", { data });
};
//查询streamline已存在的经销商
export const selectDistributorNameFromStreamLine = () => {
  return http.request(
    "get",
    "/distributor/selectDistributorNameFromStreamLine"
  );
};

//拉取
export const pullAllDistributorFromStreamLineImportBI = () => {
  return http.request(
    "get",
    "/distributor/pullAllDistributorFromStreamLineImportBI"
  );
};
//绑定
export function toAllDistributorBindLineType() {
  return http.request("get", "/distributor/toAllDistributorBindLineType");
}

//未绑定的经销商
export function selectAllUnBindLineTypeDistributor() {
  return http.request("get", "/distributor/selectAllUnBindLineTypeDistributor");
}

//绑定另一个
export function bindDistributorToFourResource() {
  return http.request("get", "/resource/bindDistributorToFourResource");
}
