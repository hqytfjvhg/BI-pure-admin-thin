<template>
  <div>
    <Table
      v-model:formData="formData"
      :page="page"
      :showIndex="true"
      :showPage="true"
      :tableData="tableData"
      :showRefresh="true"
      :showSum="false"
      id="table"
      @refresh="getProductCost"
    >
      <template #formItem>
        <el-form-item :label="t('permission.cost.name')">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item :label="t('permission.cost.code')">
          <el-input v-model="formData.code"
        /></el-form-item>
      </template>
      <template #funButton>
        <el-upload
          class="upload-demo"
          action="#"
          accept=".xlsx,.xls"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :on-change="loadFile"
          :auto-upload="false"
          :show-file-list="false"
          :limit="1"
          ref="uploadRef"
          style="width: 100%"
        >
          <el-button type="warning">{{ t("status.export") }}</el-button>
        </el-upload>

        <el-button type="warning" @click="handleDown">{{
          t("status.down")
        }}</el-button>
        <el-radio-group
          v-model="currency"
          style="margin-left: 12px"
          @change="changeRate"
        >
          <el-radio-button
            :label="t('permission.cost.million')"
            value="million"
          />
          <el-radio-button :label="t('permission.cost.cny')" value="cny" />
        </el-radio-group>
      </template>
      <template #columns>
        <el-table-column
          prop="name"
          :label="t('permission.cost.name')"
          fixed="left"
          width="180"
        />
        <el-table-column
          prop="code"
          :label="t('permission.cost.code')"
          width="180"
        />
        <el-table-column
          :prop="locale === 'zh' ? 'listingDate' : 'enListingDate'"
          :label="t('permission.cost.listingDate')"
          width="120"
        />

        <template v-for="item in column" :key="item.id">
          <el-table-column
            :label="t(`${'permission.cost.' + item.prop}`)"
            :prop="item.prop"
            min-width="120"
          >
            <!-- <template #default="{ row }">
              <span v-if="!row.status">{{ row[item.prop] }}</span>
              <el-input v-if="row.status" v-model="row[item.prop]" />
            </template>  -->
          </el-table-column></template
        >
        <!-- <el-table-column
          prop="ppBomCost"
          :label="t('permission.cost.ppbom')"
          min-width="120"
        />
        <el-table-column
          min-width="120"
          prop="mpBomCost"
          :label="t('permission.cost.mpbom')"
        />
        <el-table-column
          prop="productCost"
          :label="t('permission.cost.cost')"
          min-width="120"
        />
        <el-table-column
          prop="budgetSale"
          :label="t('permission.cost.budget')"
          min-width="120"
        />
        <el-table-column
          prop="budgetRate"
          :label="t('permission.cost.finish')"
          min-width="120"
        />
        <el-table-column
          prop="saleQuantity"
          :label="t('permission.cost.qty')"
          min-width="120"
        />
        <el-table-column
          prop="saleMoney"
          min-width="120"
          :label="t('permission.cost.sales')"
        />
        <el-table-column
          prop="saleProduct"
          :label="t('permission.cost.salesCost')"
          min-width="120"
        />
        <el-table-column
          prop="researchCost"
          :label="t('permission.cost.invest')"
          min-width="120"
        />
        <el-table-column
          prop="marketPromotion"
          :label="t('permission.cost.market')"
          min-width="120"
        />
        <el-table-column
          prop="grossProfit"
          :label="t('permission.cost.profit')"
          min-width="120"
        />
        <el-table-column
          prop="grossProfitRate"
          :label="t('permission.cost.profitRate')"
          min-width="120"
        />
        <el-table-column
          prop="productQuantity"
          :label="t('permission.cost.productqty')"
          min-width="120"
        />
        <el-table-column
          prop="balanceInventoryQuantity"
          :label="t('permission.cost.bsq')"
          min-width="120"
        /> -->
        <el-table-column :label="t('status.operate')" fixed="right" width="120">
          <template #default="{ row }">
            <el-text type="primary" @click="handleEdit(row)">
              {{ t("status.edit") }}
            </el-text>
            <!-- <el-text
              v-if="row.status"
              type="primary"
              @click="handleSave(row)"
              >{{ t("status.save") }}</el-text
            > -->
            <el-text type="primary" @click="handleDel(row)">
              {{ t("status.del") }}
            </el-text>
          </template>
        </el-table-column>
      </template>
    </Table>

    <Dialog
      :dialog="dialog"
      @confirm="handleSave(addFormData)"
      :title="t(`status.edit`)"
      :label-position="right"
      label-width="auto"
    >
      <el-form
        ref="ruleForm"
        :model="addFormData"
        :rules="rules"
        :label-position="right"
        label-width="auto"
      >
        <el-row>
          <template v-for="item in column" :key="item.id">
            <el-col :span="12">
              <el-form-item
                :label="t(`${'permission.cost.' + item.prop}`)"
                :prop="item.prop"
              >
                <el-input v-model="addFormData[item.prop]" />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import Table from "@/components/table/index.vue";
import { useI18n } from "vue-i18n";
import * as XLSX from "xlsx/xlsx.mjs";
import {
  addProductCostDetail,
  getProductCostDetail,
  downTemplateExcel,
  delProductCostDetail,
  updateProductCostDetail
} from "@/api/dataBoard/dataBoard";
import { ElMessage, ElMessageBox } from "element-plus";
import Dialog from "@/components/dialog/index.vue";
import { storageLocal } from "@pureadmin/utils";

const { t, locale } = useI18n();
const isRoot = storageLocal().getItem("user-info")?.roleName === "ROOT";

const page = reactive({
  page: 1,
  length: 10,
  total: 0
});
const formData = reactive({});

const tableData = ref([]);
const rateData = ref([]);
const column = ref([]);
const getProductCost = () => {
  const data = {
    page: page.page,
    length: page.length,
    name: formData.name,
    code: formData.code
  };

  getProductCostDetail(data).then(res => {
    if (res.success) {
      res.data.list.map(item => {
        item.status = false;
        return item;
      });
      tableData.value = res.data.list;
      rateData.value = res.data.list;
      page.total = res.data.totalCount;
      const keys = Object.keys(tableData.value[0]);
      column.value = keys
        .filter(
          key =>
            key !== "id" &&
            key !== "status" &&
            key !== "listingDate" &&
            key !== "name" &&
            key !== "code" &&
            key !== "updateTime" &&
            key !== "enListingDate"
        )
        .map(key => ({ prop: key }));
    }
  });
};

//导入
const budget = ref([]);
const loadFile = file => {
  if (file) {
    const reader = new FileReader();
    reader.readAsBinaryString(file.raw);
    reader.onload = ev => {
      try {
        const f = ev.target.result;
        const workbook = XLSX.read(f, { type: "binary" });
        let excelData = [];
        for (let i = 0; i < workbook.SheetNames.length; i++) {
          const worksheet = workbook.Sheets[workbook.SheetNames[i]];
          // 将sheet转换为json数组
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          excelData.push(jsonData);
        }
        //第一张工作表找对应的id
        excelData[0].splice(0, 1);
        excelData[0].splice(0, 1);

        excelData[0].map((item, index) => {
          budget.value.push({
            listingDate: item[0],
            code: item[1],
            name: item[2],
            ppBomCost: item[3],
            mpBomCost: item[4],
            productCost: item[5],
            budgetSale: item[6],
            budgetRate: item[7],
            saleQuantity: item[8],
            saleMoney: item[9],
            saleCost: item[10],
            researchCost: item[11],
            marketPromotion: item[12],
            grossProfit: item[13],
            grossProfitRate: item[14],
            productQuantity: item[15],
            balanceInventoryQuantity: item[16]
          });
        });
        addProductCostDetail(budget.value).then(res => {
          if (res.success) {
            ElMessage.success(t("status.pureSuccess"));
            getProductCost();
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
  }
};

//移除文件
const uploadRef = ref(null);
const handleRemove = file => {
  budget.value = [];
  uploadRef.value.clearFiles();
};
// 覆盖上一个文件
const handleExceed = files => {
  uploadRef.value.clearFiles();
  const file = files[0];
  uploadRef.value.handleStart(file);
};

//下载
const handleDown = () => {
  downTemplateExcel();
};

//删除
const handleDel = row => {
  ElMessageBox.confirm(t("status.delReg"), t("status.warn"), {
    confirmButtonText: t("status.confirm"),
    cancelButtonText: t("status.cancle"),
    type: "warning"
  }).then(() => {
    delProductCostDetail([row.id]).then(res => {
      if (res.success) {
        ElMessage.success(t("status.pureSuccess"));
        getProductCost();
      }
    });
  });
};

//修改
const dialog = reactive({
  show: false,
  title: t("status.edit"),
  width: "50%"
});
const addFormData = ref({});

const handleEdit = row => {
  //   row.status = true;
  dialog.show = true;
  addFormData.value = JSON.parse(JSON.stringify(row));
};

//保存
const handleSave = row => {
  updateProductCostDetail(row).then(res => {
    if (res.success) {
      row.status = false;
      dialog.show = false;
      ElMessage.success(t("status.pureSuccess"));
      getProductCost();
    }
  });
};

const currency = ref("cny");
const cnyRate = storageLocal().getItem("user-info")?.cnyRate;
const changeRate = val => {
  currency.value = val;
  const data = JSON.parse(JSON.stringify(rateData.value));
  if (val === "million") {
    tableData.value = data.map((item, index) => {
      //   column.value.forEach(it => {
      //     item[it] = (item[it] / cnyRate).toFixed(2);
      //   });

      item.ppBomCost = (item.ppBomCost / cnyRate).toFixed(2);
      item.mpBomCost = (item.mpBomCost / cnyRate).toFixed(2);
      item.productCost = (item.productCost / cnyRate).toFixed(2);
      item.budgetSale = (item.budgetSale / cnyRate).toFixed(2);
      item.budgetRate = (item.budgetRate / cnyRate).toFixed(2);
      item.saleQuantity = (item.saleQuantity / cnyRate).toFixed(2);
      item.saleMoney = (item.saleMoney / cnyRate).toFixed(2);
      item.saleProduct = (item.saleProduct / cnyRate).toFixed(2);
      item.researchCost = (item.researchCost / cnyRate).toFixed(2);
      item.marketPromotion = (item.marketPromotion / cnyRate).toFixed(2);
      item.grossProfit = (item.grossProfit / cnyRate).toFixed(2);
      item.grossProfitRate = (item.grossProfitRate / cnyRate).toFixed(2);
      item.productQuantity = (item.productQuantity / cnyRate).toFixed(2);
      item.balanceInventoryQuantity = (
        item.balanceInventoryQuantity / cnyRate
      ).toFixed(2);
      return item;
    });
  } else if (val === "cny") {
    tableData.value = data;
  }
};

onMounted(() => {
  getProductCost();
});
</script>

<style lang="scss" scoped>
:deep(.upload-demo) {
  display: inline-block;
  margin-right: 12px;
  width: auto !important;
  .el-upload-list .el-upload-list--text {
    display: none;
  }
}
:deep(.el-radio-group) {
  font-size: 16px !important;
}
:deep(.el-form--inline .el-form-item) {
  margin-right: 20px !important;
}
</style>
