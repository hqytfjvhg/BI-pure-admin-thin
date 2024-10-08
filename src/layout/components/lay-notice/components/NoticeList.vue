<script setup lang="js">
// import { PropType } from "vue";
// import { ListItem } from "../data";
import NoticeItem from "./NoticeItem.vue";
import { transformI18n } from "@/plugins/i18n";

defineProps({
  list: {
    type: Array,
    default: () => []
  },
  emptyText: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <div v-if="list.length">
    <NoticeItem v-for="(item, index) in list" :key="index" :noticeItem="item" />
  </div>
  <el-empty v-else :description="transformI18n(emptyText)" />
</template>
