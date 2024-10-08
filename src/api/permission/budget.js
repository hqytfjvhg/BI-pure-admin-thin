import { http } from "@/utils/http";
import { transformI18n } from "@/plugins/i18n";

export function downloadExcel() {
  return http
    .request("get", "/forecast/downloadExcel", { responseType: "blob" })
    .then(res => {
      if (res) {
        let url = window.URL.createObjectURL(res);
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          transformI18n("permission.budget.excel") + ".xlsx"
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
}

//新增预算额
export function addForecastData(data) {
  return http.request("post", "/forecast/addForecastData", { data });
}

//获取列表数据
export function selectForecastDataByYear(data) {
  // let queryParams = `year=${data.year}`;
  // if (data.distributorId !== undefined) {
  //   queryParams += `&distributorId=${data.distributorId}`;
  // }
  return http.request("post", "/forecast/getForecastDataByPage", { data });
}

//修改预算额
export function updateForecastData(data) {
  return http.request("post", "/forecast/updateForecastData", { data });
}
