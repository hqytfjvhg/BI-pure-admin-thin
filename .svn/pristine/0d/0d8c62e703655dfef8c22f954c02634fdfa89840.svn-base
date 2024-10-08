import { http } from "@/utils/http";
import { transformI18n } from "@/plugins/i18n";
//应收账款数据
export const getReceivablesData = data => {
  return http.request("POST", "/boardData/getReceivableData", { data });
};
//销售数据
export const getSalesData = data => {
  return http.request("POST", "/boardData/getSaleData", { data });
};

//产品成本excel模板下载
export const downTemplateExcel = () => {
  return http
    .request("get", "/productCostDetail/downTemplateExcel", {
      responseType: "blob"
    })
    .then(res => {
      if (res) {
        let url = window.URL.createObjectURL(res);
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          transformI18n("permission.cost.excel") + ".xlsx"
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    })
    .catch(error => {
      // 异常处理
      console.error("下载文件时发生错误:", error);
    });
};
//新增
export const addProductCostDetail = data => {
  return http.request("post", "/productCostDetail/addProductCostDetail", {
    data
  });
};

//查询
export const getProductCostDetail = data => {
  return http.request(
    "post",
    "/productCostDetail/pageSelectProductCostDetail",
    {
      data
    }
  );
};

//删除
export const delProductCostDetail = data => {
  return http.request("post", "/productCostDetail/delProductCostDetail", {
    data
  });
};

//修改
export const updateProductCostDetail = data => {
  return http.request("post", "/productCostDetail/updateProductCostDetail", {
    data
  });
};
