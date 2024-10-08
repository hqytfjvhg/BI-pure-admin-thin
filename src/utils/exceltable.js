//各区域销售收入导出excel文件
import ExcelJS from "exceljs";
import FileSaver from "file-saver";

//导出excel表格
export const down = (data, fileName, sheetName) => {
  // 创建工作簿
  const _workbook = new ExcelJS.Workbook();
  // 添加工作表
  const _sheet1 = _workbook.addWorksheet(sheetName);

  //表头设置
  _sheet1.columns = [
    {
      header: ["各区域销售收入 Sales revenue by region", "序号", "Serial No"],
      key: "sort",
      width: 10
    },
    { header: ["", "区域", "Region"], key: "name", width: 20 },
    {
      header: ["", "本月销售", "Sales this month"],
      key: "currentMonthSale",
      width: 20
    },
    {
      header: ["", "上月销售", "Last month's sales"],
      key: "lastMonthSale",
      width: 20
    },
    {
      header: ["", "上一季度销售", "Last quarter sales"],
      key: "lastQuarterSale",
      width: 20
    },
    {
      header: ["", "去年同期销售", "Sales in the same period last year"],
      key: "lastYearCurrentMonthSale",
      width: 20
    },
    { header: ["", "人口", "Population"], key: "population", width: 20 },
    {
      header: ["", "人均收入", "GNI Per Capita"],
      key: "perCapitaIncome",
      width: 20
    }
  ];
  //设置内容
  data.forEach((item, index) => {
    _sheet1.addRow({
      sort: index + 1,
      name: item.name,
      currentMonthSale: item.currentMonthSale,
      lastMonthSale: item.lastMonthSale,
      lastQuarterSale: item.lastQuarterSale,
      lastYearCurrentMonthSale: item.lastYearCurrentMonthSale,
      population: item.population,
      perCapitaIncome: item.perCapitaIncome
    });
  });

  //合并第一行
  _sheet1.mergeCells("A1:H1");

  //设置单元格样式
  _sheet1.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    row.height = 25;
    row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
      cell.height = 25;
      cell.font = {
        name: "微软雅黑",
        size: 12
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center"
      };
    });
  });

  //表头样式
  const _oneRow = _sheet1.getRow(1);
  _oneRow.height = 30;
  _oneRow.font = {
    name: "微软雅黑",
    size: 20
  };
  const _twoRow = _sheet1.getRow(2);
  _twoRow.height = 30;
  _twoRow.eachCell(cell => {
    cell.font = {
      name: "微软雅黑",
      bold: true,
      size: 12
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "D0CECE"
      }
    };
  });

  // 获取第3行
  const _titleCell = _sheet1.getRow(3);
  // 设置第3行的高度
  _titleCell.height = 30;
  _titleCell.eachCell(cell => {
    // 设置第3行的字体样式
    cell.font = {
      name: "微软雅黑",
      bold: true,
      size: 12
    };
    // 设置第3行的背景颜色
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "D0CECE"
      }
    };
  });

  _sheet1.getCell("F3").alignment = {
    wrapText: true,
    vertical: "middle",
    horizontal: "center"
  };

  // 导出表格
  _workbook.xlsx.writeBuffer().then(buffer => {
    let _file = new Blob([buffer], {
      type: "application/octet-stream"
    });
    FileSaver.saveAs(_file, fileName + ".xlsx");
  });
};
