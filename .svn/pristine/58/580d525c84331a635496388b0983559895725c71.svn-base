import { storageLocal } from "@pureadmin/utils";

//经销商级联选择器数据，并排序
export const distributorList = () => {
  const data = storageLocal().getItem("user-info")?.distributorSearchCondition;
  distributorList.value = [];
  Object.keys(data).forEach(it => {
    let children = [];
    data[it].map(op => {
      children.push({
        label: op,
        value: op
      });
    });
    distributorList.value.push({
      label: it,
      value: it,
      options: children
    });
  });
  //按label首字母排序
  distributorList.value.sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });

  return distributorList.value;
};
