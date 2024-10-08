import { http } from "@/utils/http";

//查询产品列表
export function getProductByPage(data) {
  return http.request("post", "/productClassification/getProductByPage", {
    data
  });
}

//新增产品
export function addProduct(data) {
  return http.request("post", "/productClassification/addProduct", { data });
}

//修改产品信息
export function updateProduct(data) {
  return http.request("post", "/productClassification/updateProduct", { data });
}

//删除产品
export function deleteProduct(data) {
  return http.request(
    "post",
    "/productClassification/deleteProduct?id=" + data
  );
}
//查询产品名称
export function getAllProductFromStreamLine() {
  return http.request(
    "get",
    "/productClassification/getAllProductFromStreamLine"
  );
}
//查询产品基础信息
export function getAllProductBaseInfo() {
  return http.request("get", "/productClassification/getAllProduct");
}

//查询产品系列
export function getAllSeries() {
  return http.request("get", "/productClassification/getAllSeries");
}

//查询产品功能
export function getAllFunction() {
  return http.request("get", "/productClassification/getAllFunction");
}

//新增产品系列
export function addSeries(data) {
  return http.request("post", "/productClassification/addSeries", { data });
}

//新增产品类型
export function addFunction(data) {
  return http.request("post", "/productClassification/addFunction", { data });
}

//查询功能类型
export function getAllFunctionally() {
  return http.request("get", "/productClassification/getAllFunctionally");
}

//新增功能类型
export function addFunctionally(data) {
  return http.request("post", "/productClassification/addFunctionally", {
    data
  });
}

//修改产品系列
export function updateSeries(data) {
  return http.request("post", "/productClassification/updateSeries", { data });
}

//修改产品功能
export function updateFunction(data) {
  return http.request("post", "/productClassification/updateFunction", {
    data
  });
}

//修改功能类型
export function updateFunctionally(data) {
  return http.request("post", "/productClassification/updateFunctionally", {
    data
  });
}

//拉取
export function pullAllProductFromStreamLineImportBI() {
  return http.request(
    "get",
    "/productClassification/pullAllProductFromStreamLineImportBI"
  );
}

//删除系列
export function delSeries(data) {
  return http.request("post", "/productClassification/delSeries", {
    data
  });
}

//删除产品类型
export function delFunction(data) {
  return http.request("post", "/productClassification/delFunction", {
    data
  });
}

//删除功能类型
export function delFunctionally(data) {
  return http.request("post", "/productClassification/delFunctionally", {
    data
  });
}

//统一新增或者修改的接口
export function addOrUpdate(url, data) {
  return http.request("post", url, { data });
}
