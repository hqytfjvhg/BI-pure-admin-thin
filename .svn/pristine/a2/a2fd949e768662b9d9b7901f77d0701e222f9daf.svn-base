<template>
  <div>
    <Table
      v-model:formData="formData"
      :page="page"
      :showIndex="true"
      :showPage="false"
      :showRefresh="false"
      :tableData="tableData"
      @refresh="getLevelFourList"
      @add="addUser"
    >
      <template #funButton>
        <el-button type="warning" @click="handlePull()">{{
          t("status.pull")
        }}</el-button>

        <!-- <el-button type="success" @click="handleAdd()">{{
          t("status.add")
        }}</el-button> -->
      </template>
      <template #columns>
        <!-- <el-table-column prop="name" label="名称" /> -->
        <el-table-column prop="name" :label="t('permission.levelFour.name')" />
        <el-table-column
          prop="fromK3"
          :label="t('permission.levelFour.fromK3')"
        >
          <template #default="{ row }">
            <span v-if="row.fromK3">{{ t("permission.levelFour.k3") }}</span>
            <span v-if="!row.fromK3">{{
              t("permission.levelFour.system")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          :label="t('permission.levelFour.remark')"
        />
        <el-table-column
          prop="createTime"
          :label="t('permission.levelFour.createTime')"
        />
        <!-- <el-table-column :label="t('status.operate')">
          <template #default="{ row }">
            <el-text type="primary" @click="handleEdit(row, 'role')">{{
              t("status.edit")
            }}</el-text>
            <el-text type="primary" @click="handleReset(row, 'pass')">{{
              t("status.reset")
            }}</el-text>
            <el-text type="primary" @click="handleDel(row)">{{
              t("status.del")
            }}</el-text></template
          >
        </el-table-column> -->
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
        <el-form-item :label="t('permission.levelFour.name')" prop="name">
          <el-input v-model="editFormData.name"
        /></el-form-item>
        <el-form-item :label="t('permission.levelFour.enName')" prop="enName">
          <el-input v-model="editFormData.enName"
        /></el-form-item>
        <el-form-item :label="t('permission.levelFour.desc')" prop="remark">
          <el-input v-model="editFormData.remark"
        /></el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import Table from "@/components/table/index.vue";
import { reactive, ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  getFourLevelResourceList,
  pullFourResourceFromsStreamlinr,
  addFourResource
} from "@/api/permission/resource";
import Dialog from "@/components/dialog/index.vue";
import { ElMessage } from "element-plus";

const { t } = useI18n();

//获取四级资源
const tableData = ref([]);
const getLevelFourList = () => {
  getFourLevelResourceList().then(res => {
    if (res.success) {
      tableData.value = res.data;
    }
  });
};
//拉取资源
const handlePull = () => {
  pullFourResourceFromsStreamlinr();
  getLevelFourList();
};

const editFormData = ref({});
const dialog = reactive({
  show: false,
  title: t("status.add"),
  width: "50%"
});

const rules = computed(() => {
  return {
    name: [
      {
        required: true,
        message: t("permission.levelFour.nameReg"),
        trigger: "bulr"
      }
    ],
    enName: [
      {
        required: true,
        message: t("permission.levelFour.enNameReg"),
        trigger: "bulr"
      }
    ]
  };
});

//新增
const ruleForm = ref(null);
const handleAdd = () => {
  if (ruleForm.value) {
    ruleForm.value.resetFields();
  }
  dialog.show = true;
  dialog.title = t("status.add");
  editFormData.value = {};
};

//提交
const submitEdit = () => {
  if (ruleForm.value) {
    ruleForm.value.validate(valid => {
      if (valid) {
        editFormData.value.level = 4;
        addFourResource(editFormData.value).then(res => {
          if (res.success) {
            ElMessage.success(t("status.pureSuccess"));
            dialog.show = false;
            getLevelFourList();
          }
        });
      }
    });
  }
};

onMounted(() => {
  getLevelFourList();
});
</script>

<style lang="scss" scoped></style>
