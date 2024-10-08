import { http } from "@/utils/http";

export function selectAllAreaSaleData(data) {
  let mess;
  if (data.isMillion) {
    mess = "?isMillion=" + data.isMillion;
  } else {
    mess = "?currencyId=" + data.currencyId + "&isMillion=" + data.isMillion;
  }
  return http.request("get", "/distributor/selectAllAreaSaleData" + mess);
}
