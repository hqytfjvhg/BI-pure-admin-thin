import { http } from "@/utils/http";

//新增资源
export const addResource = data => {
  return http.request("post", "/resource/addResource", { data });
};

//获取所有资源
export const getTreeResourceInfo = () => {
  return http.request("get", "/resource/getTreeResourceInfo");
};

//获取四层资源
export const getFourLevelResourceList = () => {
  return http.request("get", "/resource/getFourLevelResourceList");
};

//查询某层拥有的子级
export const getResourceByResourceLevel = data => {
  return http.request(
    "get",
    "/resource/getResourceByResourceLevel?level=" + data
  );
};
//为层级分配资源
export const bindSonResource = data => {
  return http.request("post", "/resource/bindSonResource", { data });
};

//修改资源的备注和名称
export const updateResourceInfo = data => {
  return http.request("post", "/resource/updateResourceInfo", { data });
};

//拉取
export const importAllResourceFromFourResource = () => {
  return http.request("get", "/resource/importAllResourceFromFourResource");
};

//拉取sl资源到bi系统
export const pullFourResourceFromsStreamlinr = () => {
  return http.request("get", "/resource/pullFourResourceFromsStreamlinr");
};

//删除资源
export const deleteResourceByResourceId = data => {
  return http.request("post", "/resource/deleteResourceByResourceId", { data });
};

//新增四级资源库
export const addFourResource = data => {
  return http.request("post", "/resource/addFourResource", { data });
};
