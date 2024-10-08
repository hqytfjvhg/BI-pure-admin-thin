<template>
  <div>
    <h4 class="title-style">{{ t("permission.distributors.title") }}</h4>
    <Table
      v-model:formData="formData"
      :showIndex="true"
      :showPage="false"
      :tableData="tableData"
      :showRefresh="false"
    >
      <template #formItem>
        <!-- <el-form-item :label="t('permission.distributors.name')"
            ><el-input v-model="formData.name"
          /></el-form-item>
          <el-form-item :label="t('permission.distributors.enName')"
            ><el-input v-model="formData.enName"
          /></el-form-item> -->
        <el-form-item>
          <el-button type="success" @click="handleAdd">{{
            t("status.add")
          }}</el-button></el-form-item
        >
      </template>
      <template #columns>
        <el-table-column
          prop="name"
          :label="t('permission.distributors.name')"
        />
        <!-- <el-table-column
          prop="createTime"
          :label="t('permission.distributors.createTime')"
        />
        <el-table-column
          prop="updateTime"
          :label="t('permission.distributors.updateTime')"
        /> -->

        <el-table-column :label="t('status.operate')">
          <template #default="{ row }">
            <!-- <el-text type="primary" @click="handleEdit(row)">{{
                t("status.edit")
              }}</el-text> -->
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
        <el-form-item :label="t('permission.distributors.name')" prop="name">
          <!-- <el-input v-model="editFormData.name"
        /> -->
          <el-select v-model="editFormData.name" filterable>
            <el-option
              v-for="item in distributorOption"
              :key="item.id"
              :label="locale === 'zh' ? item.name : item.enName"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item :label="t('permission.brand.enName')" prop="enName">
          <el-input v-model="editFormData.enName"
        /></el-form-item>
        <el-form-item :label="t('permission.brand.desc')" prop="remark">
          <el-input v-model="editFormData.remark"
        /></el-form-item> -->
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
  getAllDistributor,
  addInternalClearingOrganization,
  deleteInternalClearingOrganization,
  selectAllInternalClearingOrganization
} from "@/api/permission/internal";

const { t, locale } = useI18n();

const ruleForm = ref(null);
const editFormData = ref({});
const dialog = reactive({
  show: false,
  title: t("permission.role.addInfo"),
  width: "50%"
});
const rules = computed(() => {
  return {
    name: [
      {
        required: true,
        message: t("permission.distributors.nameReg"),
        trigger: "change"
      }
    ]
  };
});

//查询
const tableData = ref([]);
const getInternalList = () => {
  selectAllInternalClearingOrganization().then(res => {
    if (res.data && res.success) {
      tableData.value = res.data;
    }
  });
};

//查询所有经销商，用于新增内部结算组织
const distributorOption = ref([]);
const getDistributorList = () => {
  getAllDistributor().then(res => {
    if (res.data && res.success) {
      distributorOption.value = res.data;
    }
  });
};

//新增
const handleAdd = async () => {
  if (ruleForm.value) {
    ruleForm.value.resetFields();
  }
  await getDistributorList();
  dialog.show = true;
  dialog.title = t("permission.distributors.addInfo");
  editFormData.value = {};
};

//删除
const handleDel = row => {
  ElMessageBox.confirm(t("status.delReg"), t("status.warn"), {
    confirmButtonText: t("status.confirm"),
    cancelButtonText: t("status.cancle"),
    type: "warning"
  }).then(() => {
    deleteInternalClearingOrganization(row.id).then(res => {
      if (res.success) {
        ElMessage.success(t("status.pureSuccess"));
        getInternalList();
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
        addInternalClearingOrganization(editFormData.value).then(res => {
          if (res.success) {
            ElMessage.success(t("status.pureSuccess"));
            dialog.show = false;
            getInternalList();
          }
        });
      }
    });
  }
};

onMounted(() => {
  getInternalList();
});
</script>

<style lang="scss" scoped>
.title-style {
  margin-bottom: 10px;
}
</style>
