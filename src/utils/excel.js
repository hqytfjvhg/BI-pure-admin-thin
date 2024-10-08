import FileSaver from "file-saver";
import * as XLSX from "xlsx";
// import XLSXStyle from "xlsx-style";
//各区域销售收入导出excel文件
export const downExcel = data => {
  const newArr = [];
  data.map((item, index) => {
    var obj = {};
    obj.index = index + 1;
    obj.name = item.name;
    obj.currentMonthSale = item.currentMonthSale;
    obj.lastMonthSale = item.lastMonthSale;
    obj.lastQuarterSale = item.lastQuarterSale;
    obj.lastYearCurrentMonthSale = item.lastYearCurrentMonthSale;
    obj.population = item.population;
    obj.perCapitaIncome = item.perCapitaIncome;
    newArr.push(obj);
  });

  // 创建工作簿
  const workbook = XLSX.utils.book_new();
  // //表头
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["各区域销售收入 Sales revenue by region"],
    [
      "序号",
      "区域",
      "本月销售",
      "上月销售",
      "上一季度销售",
      "去年同期销售",
      "人口",
      "人均收入"
    ],
    [
      "Serial No",
      "Region",
      "Sales this month",
      "Last month's sales",
      "Last quarter sales",
      "Sales in the same period last year",
      "Population",
      "GNI Per Capita"
    ]
  ]);

  // //合并单元格,只有一行
  let excelMerges = [];
  excelMerges.push({
    s: { r: 0, c: 0 },
    e: { r: 0, c: 7 }
  });
  worksheet["!merges"] = excelMerges;

  // // 遍历后端数据并写入工作表
  newArr.forEach((row, rowIndex) => {
    const sheetRow = [];
    for (let i = 0; i < 8; i++) {
      sheetRow.push(Object.values(row)[i]);
    }

    XLSX.utils.sheet_add_aoa(worksheet, [sheetRow], { origin: rowIndex + 3 });
  });

  //样式
  // const styles = {
  //   firstHeader: {
  //     font: { bold: true, name: "微软雅黑", sz: 16 },
  //     alignment: {
  //       //文字居中
  //       horizontal: "center",
  //       vertical: "center",
  //       wrap_text: true
  //     },
  //     border: {
  //       top: { style: "thin" },
  //       left: { style: "thin" },
  //       right: { style: "thin" },
  //       bottom: { style: "thin" }
  //     }
  //   },
  //   headerStyle: {
  //     font: { bold: true, name: "微软雅黑", sz: 11 },
  //     fill: { fgColor: { rgb: "C0C0C0" } }, // 背景色
  //     alignment: {
  //       //文字居中
  //       horizontal: "center",
  //       vertical: "center",
  //       wrap_text: true
  //     },
  //     border: {
  //       top: { style: "thin" },
  //       left: { style: "thin" },
  //       right: { style: "thin" },
  //       bottom: { style: "thin" }
  //     }
  //     // height: 40,
  //   },
  //   cellStyle: {
  //     font: { name: "微软雅黑", sz: 11 },
  //     alignment: {
  //       //文字居中
  //       horizontal: "center",
  //       vertical: "center",
  //       wrap_text: true
  //     },
  //     border: {
  //       top: { style: "thin" },
  //       left: { style: "thin" },
  //       right: { style: "thin" },
  //       bottom: { style: "thin" }
  //     }
  //     // height: 40,
  //   }
  // };

  if (!worksheet["!rows"] || !worksheet["!cols"]) {
    worksheet["!rows"] = [];
    worksheet["!cols"] = [];
  }
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  // console.log(range);
  for (var i = 0; i < 9; i++) {
    worksheet["!cols"][i] = { wch: 20 };
  }
  for (let i = range.s.r + 1; i < range.e.r + 1; i++) {
    worksheet["!rows"][0] = { hpx: 40 };
    worksheet["!rows"][i] = { hpx: 30 };
  }
  // console.log(worksheet);

  // 应用样式到列头
  // for (let col of ["A", "B", "C", "D", "E", "F", "G", "H"]) {
  //   let cellRef1 = `${col}1`;
  //   if (worksheet[cellRef1]) {
  //     worksheet[cellRef1].s = styles.firstHeader;
  //   }
  //   let cellRef2 = `${col}2`;
  //   if (worksheet[cellRef2]) {
  //     worksheet[cellRef2].s = styles.headerStyle;
  //   }
  //   let cellRef3 = `${col}3`;
  //   if (worksheet[cellRef3]) {
  //     worksheet[cellRef3].s = styles.headerStyle;
  //   }
  // }
  // console.log(Number(worksheet["!ref"].split(":")[1].slice(1)) + 1);
  // const bigestRow = Number(worksheet["!ref"].split(":")[1].slice(1)) + 1;
  // for (let row = 4; row < bigestRow; row++) {
  //   for (let col of ["A", "B", "C", "D", "E", "F", "G", "H"]) {
  //     let cellRef = `${col}${row}`;
  //     if (worksheet[cellRef]) {
  //       worksheet[cellRef].s = styles.cellStyle;
  //       // worksheet[cellRef].t = "n";
  //     }
  //   }
  // }

  // 添加工作表到工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // 确保导出时包含样式信息
  const wbOut = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  FileSaver.saveAs(
    // Blob: 对象表示一个不可变 原始数据的类文件对象,不一定是JS原生格式的数据。
    // File: 基于Blob，继承了blob的功能并将其扩展使其支持用户系统上的文件。
    new Blob([wbOut], { type: "appliction/octet-stream" }),
    // 设置导出的文件名称可随意
    `各区域销售收入.xlsx`
  );
};
