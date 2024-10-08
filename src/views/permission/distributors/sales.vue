<template>
  <div>
    <Table
      v-model:formData="formData"
      :showIndex="true"
      :showPage="false"
      :tableData="tableData"
      :showRefresh="true"
      :showSum="true"
      :sumList="[2, 3, 4, 5, 6, 8, 9]"
      id="table"
      @refresh="selectSales"
    >
      <template #formItem>
        <el-form-item :label="t('permission.sales.name')">
          <!-- <el-input v-model="formData.name" /> -->
          <el-select
            v-model="formData.name"
            style="width: 200px"
            clearable
            filterable
          >
            <el-option
              v-for="item in option"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
      </template>
      <template #funButton>
        <!-- <el-button type="success" @click="handleAdd">{{
          t("status.add")
        }}</el-button> -->
        <!-- <el-button type="warning" @click="handleDown">{{
          t("status.down")
        }}</el-button> -->
        <el-button type="warning" @click="Down">{{
          t("status.down")
        }}</el-button>

        <el-radio-group
          v-model="currency"
          style="margin-left: 12px"
          @change="changeRate"
        >
          <el-radio-button
            :label="t('permission.sales.million')"
            value="million"
          />
          <el-radio-button
            v-for="item in currencyOption"
            :key="item.id"
            :label="locale === 'zh' ? item.name : item.enName"
            :value="item.id"
          />
        </el-radio-group>
      </template>
      <template #columns>
        <el-table-column prop="name" :label="t('permission.sales.name')">
          <el-table-column prop="name" label="Region" v-if="locale !== 'en'" />
        </el-table-column>
        <el-table-column
          prop="currentMonthSale"
          :label="t('permission.sales.cMonth')"
        >
          <el-table-column
            prop="currentMonthSale"
            label="Sales this month"
            v-if="locale !== 'en'"
          />
        </el-table-column>
        <el-table-column
          prop="lastMonthSale"
          :label="t('permission.sales.lMonth')"
        >
          <el-table-column
            prop="lastMonthSale"
            label="Last month's sales"
            v-if="locale !== 'en'"
        /></el-table-column>
        <el-table-column
          prop="lastQuarterSale"
          :label="t('permission.sales.lQuarter')"
        >
          <el-table-column
            prop="lastQuarterSale"
            label="Last quarter sales"
            v-if="locale !== 'en'"
        /></el-table-column>
        <el-table-column
          prop="lastYearCurrentMonthSale"
          :label="t('permission.sales.lYear')"
        >
          <el-table-column
            prop="lastYearCurrentMonthSale"
            label="Sales in the same period last year"
            v-if="locale !== 'en'"
        /></el-table-column>
        <el-table-column
          prop="population"
          :label="t('permission.sales.people')"
        >
          <el-table-column
            prop="population"
            label="Population"
            v-if="locale !== 'en'"
        /></el-table-column>
        <el-table-column
          prop="perCapitaIncome"
          :label="t('permission.sales.perCapita')"
        >
          <el-table-column
            prop="perCapitaIncome"
            label="GNI Per Capita"
            v-if="locale !== 'en'"
        /></el-table-column>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import Table from "@/components/table/index.vue";
import { useI18n } from "vue-i18n";
import { selectAllAreaSaleData } from "@/api/permission/sales";
import { getAllRateInfo } from "@/api/permission/currency";
import { downExcel } from "@/utils/excel";
import { down } from "@/utils/exceltable";

const { t, locale } = useI18n();
const formData = ref({});

const currency = ref(null);
const currencyOption = ref([]);
const getCurrencyList = () => {
  getAllRateInfo().then(res => {
    if (res.success) {
      const data = res.data.find(
        it => it.name === "美元" || it.enName === "dollar"
      );
      currency.value = data.id;
      currencyOption.value = res.data;
      getSalesList();
    }
  });
};

const tableData = ref([]);
const option = ref([]);
const sheetName = ref("");
const getSalesList = () => {
  const data = { isMillion: false };
  if (currency.value === "million") {
    data.isMillion = true;
    sheetName.value = t("permission.sales.million");
  } else {
    data.currencyId = currency.value;
    const title = currencyOption.value.find(it => it.id === currency.value);
    sheetName.value = locale.value === "zh" ? title?.name : title?.enName;
  }
  selectAllAreaSaleData(data).then(res => {
    if (res.success) {
      tableData.value = res.data;
      option.value = res.data;
      if (formData.value.name) {
        tableData.value = tableData.value.filter(
          it => it.name === formData.value.name
        );
      }
    }
  });
};
const selectSales = () => {
  if (formData.value.name) {
    tableData.value = option.value.filter(
      it => it.name.indexOf(formData.value.name) > -1
    );
  } else {
    tableData.value = option.value;
  }
};

//切换汇率
const changeRate = val => {
  currency.value = val;
  getSalesList();
};

//下载
const handleDown = () => {
  downExcel(tableData.value);
  // var wb = XLSX.utils.table_to_book(document.querySelector("#table"));
  // var wbout = XLSX.write(wb, {
  //   bookType: "xlsx",
  //   book: true,
  //   type: "array"
  // });
  // try {
  //   FileSaver.saveAs(
  //     // Blob: 对象表示一个不可变 原始数据的类文件对象,不一定是JS原生格式的数据。
  //     // File: 基于Blob，继承了blob的功能并将其扩展使其支持用户系统上的文件。
  //     new Blob([wbout], { type: "appliction/octet-stream" }),
  //     // 设置导出的文件名称可随意
  //     "result.xlsx"
  //   );
  // } catch (e) {
  //   if (typeof console != "undefined") console.log(e, wbout);
  // }
  // // 返回一个新创建的Blob对象，其内容由参数中给定的数组串联组成。
  // return wbout;
};
const Down = () => {
  down(tableData.value, t("permission.sales.title"), sheetName.value);
};
onMounted(async () => {
  await getCurrencyList();
  // getSalesList();
});
</script>

<style lang="scss" scoped>
:deep(.el-radio-group) {
  font-size: 16px !important;
}
:deep(.el-form--inline .el-form-item) {
  margin-right: 20px !important;
}
</style>
