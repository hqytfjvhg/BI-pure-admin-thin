import { http } from "@/utils/http";

//获取角色列表
export function getAllRoleNameList() {
  return http.request("get", "/role/getAllRoleNameList");
}

//新增角色
export function addRoleAndDistributionResource(data) {
  return http.request("post", "/role/addRoleAndDistributionResource", { data });
}

//修改角色信息
export function updateRoleInfoById(data) {
  return http.request("post", "/role/updateRoleInfoById", { data });
}

//修改角色拥有的资源
export function updateRoleResource(data) {
  return http.request("post", "/role/updateRoleResource", { data });
}

//获取全部资源
export function getTreeResourceInfo() {
  return http.request("get", "/resource/getTreeResourceInfo");
}

//查询某角色的资源
export function getResourceInfoByRole(data) {
  return http.request("get", "/resource/getResourceInfoByRole?roleId=" + data);
}
