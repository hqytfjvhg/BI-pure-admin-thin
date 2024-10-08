import { http } from "@/utils/http";

//查询用户列表
export const selectByPage = data => {
  return http.request("post", "/user/selectByPage", { data });
};

//新增用户
export const addUser = data => {
  return http.request("post", "/user/addUser", { data });
};

//重置密码
export const resetPasswordByUserId = data => {
  return http.request("post", "/user/resetPasswordByUserId", { data });
};

//修改角色
export const updateUserById = data => {
  return http.request("post", "/user/updateUserById", { data });
};

//删除用户
export const deleteUserByIdList = data => {
  return http.request("post", "/user/deleteUserByIdList", { data });
};

//退出系统
export const logout = () => {
  return http.request("post", "/user/logout");
};

//修改密码
export const updateOneselfPassword = data => {
  return http.request("post", "/user/updateOneselfPassword", { data });
};

//刷新用户本人的经销商列表和资源列表
export const getLastUserResource = () => {
  return http.request("post", "/user/getLastUserResource");
};
