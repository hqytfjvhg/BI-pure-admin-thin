<template>
  <div>
    <el-dialog
      v-model="dialog.show"
      :title="dialog.title"
      :width="dialog.width"
      :show-close="dialog.showClose"
      destroy-on-close
      center
      @close="close"
    >
      <slot />
      <template #footer>
        <div>
          <el-button @click="close">{{ t("status.cancle") }}</el-button>
          <el-button type="primary" @click="confirm">{{
            t("status.confirm")
          }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
  dialog: {
    type: Object,
    default: () => {
      return { show: false, title: "", width: "", showClose: true };
    }
  }
});

const emit = defineEmits(["confirm", "close"]);
const confirm = () => {
  emit("confirm");
};
const close = () => {
  props.dialog.show = false;
  emit("close");
};
</script>

<style lang="scss" scoped></style>
