<template>
  <div>
    <Table
      :showIndex="true"
      :showPage="false"
      :tableData="tableData"
      :showRefresh="false"
    >
      <template #formItem>
        <el-form-item>
          <el-button type="success" @click="handleAdd">{{
            t("status.add")
          }}</el-button></el-form-item
        >
      </template>
      <template #columns>
        <el-table-column
          :prop="locale === 'zh' ? 'name' : 'enName'"
          :label="t('permission.currency.name')"
        />
        <!-- <el-table-column
          prop="enName"
          :label="t('permission.currency.enName')"
        /> -->
        <el-table-column prop="code" :label="t('permission.currency.code')" />
        <el-table-column prop="rate" :label="t('permission.currency.rate')" />
        <el-table-column
          prop="symbol"
          :label="t('permission.currency.symbol')"
        />
        <el-table-column :label="t('status.operate')">
          <template #default="{ row }">
            <el-text type="primary" @click="handleEdit(row)">{{
              t("status.edit")
            }}</el-text>
            <el-text type="primary" @click="handleDel(row)">{{
              t("status.del")
            }}</el-text>
          </template>
        </el-table-column>
      </template>
    </Table>

    <Dialog :dialog="dialog" align-center @confirm="submitEdit">
      <el-form
        ref="ruleForm"
        :model="editFormData"
        :rules="rules"
        :label-position="right"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item :label="t('permission.currency.name')" prop="name">
          <el-input v-model="editFormData.name"
        /></el-form-item>
        <el-form-item :label="t('permission.currency.enName')" prop="enName">
          <el-input v-model="editFormData.enName"
        /></el-form-item>
        <el-form-item :label="t('permission.currency.code')" prop="code">
          <el-input v-model="editFormData.code"
        /></el-form-item>
        <el-form-item :label="t(`permission.currency.rate`)" prop="rate">
          <el-input v-model="editFormData.rate"
        /></el-form-item>
        <el-form-item :label="t(`permission.currency.symbol`)" prop="symbol">
          <el-input v-model="editFormData.symbol"
        /></el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import Table from "@/components/table/index.vue";
import { useI18n } from "vue-i18n";
import Dialog from "@/components/dialog/index.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  addRate,
  deleteRateById,
  getAllRateInfo,
  updateRateInfo
} from "@/api/permission/currency";

const { t, locale } = useI18n();

const ruleForm = ref(null);
const editFormData = ref({});
const dialog = reactive({
  show: false,
  title: t("permission.currency.addInfo"),
  width: "50%"
});
const rules = computed(() => {
  return {
    name: [
      {
        required: true,
        message: t("permission.currency.nameReg"),
        trigger: "bulr"
      }
    ],
    enName: [
      {
        required: true,
        message: t("permission.currency.enNameReg"),
        trigger: "bulr"
      }
    ],
    code: [
      {
        required: true,
        message: t("permission.currency.codeReg"),
        trigger: "bulr"
      }
    ],
    rate: [
      {
        required: true,
        message: t("permission.currency.rateReg")
      },
      {
        trigger: "bulr",
        validator: validateRate,
        message: t("permission.currency.rateReg2")
      }
    ],
    symbol: [
      {
        required: true,
        message: t("permission.currency.symbolReg"),
        trigger: "bulr"
      }
    ]
  };
});

// 定义验证规则函数
const validateRate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error(t("permission.currency.rateRequired")));
  }
  if (!/^-?\d+(\.\d+)?$/.test(value)) {
    return callback(new Error(t("permission.currency.rateReg")));
  }
  callback();
};

//查询
const tableData = ref([]);
const getRateList = () => {
  getAllRateInfo().then(res => {
    if (res.data && res.success) {
      tableData.value = res.data;
    }
  });
};

//新增
const handleAdd = () => {
  if (ruleForm.value) {
    ruleForm.value.resetFields();
  }
  dialog.show = true;
  dialog.title = t("permission.currency.addInfo");
  editFormData.value = {};
};
//修改
const handleEdit = row => {
  if (ruleForm.value) {
    ruleForm.value.resetFields();
  }
  dialog.show = true;
  dialog.title = t("permission.brand.editInfo");
  editFormData.value = JSON.parse(JSON.stringify(row));
};

//删除
const handleDel = row => {
  ElMessageBox.confirm(t("status.delReg"), t("status.warn"), {
    confirmButtonText: t("status.confirm"),
    cancelButtonText: t("status.cancle"),
    type: "warning"
  }).then(() => {
    deleteRateById(row.id).then(res => {
      if (res.success) {
        ElMessage.success(t("status.pureSuccess"));
        getRateList();
      }
    });
  });
};

//提交
const submitEdit = () => {
  if (ruleForm.value) {
    ruleForm.value.validate(valid => {
      if (valid) {
        //新增
        if (dialog.title == t("permission.currency.addInfo")) {
          addRate(editFormData.value).then(res => {
            if (res.success) {
              ElMessage.success(t("status.pureSuccess"));
              dialog.show = false;
              getRateList();
            }
          });
        } else {
          updateRateInfo(editFormData.value).then(res => {
            if (res.success) {
              ElMessage.success(t("status.pureSuccess"));
              dialog.show = false;
              getRateList();
            }
          });
        }
      }
    });
  }
};

onMounted(() => {
  getRateList();
});
</script>

<style lang="scss" scoped></style>
