<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
  </el-config-provider>
</template>

<script lang="js">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import { ReDialog } from "@/components/ReDialog";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import hk from "../locales/zh-HK";

export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog
  },
  setup() {
    const zh_hk = {
      ...hk,
      el: {
        datepicker: {
          clear: "清除",
          today: "今天",
          cancel: "取消",
          confirm: "确认",
          selectDate: "选择日期",
          selectTime: "选择时间",
          startDate: "开始日期",
          startTime: "开始时间",
          endDate: "结束日期",
          endTime: "结束时间",
          prevYear: "上一年",
          nextYear: "下一年",
          prevMonth: "上一月",
          nextMonth: "下一月",
          year: "年",
          month1: "1月",
          month2: "2月",
          month3: "3月",
          month4: "4月",
          month5: "5月",
          month6: "6月",
          month7: "7月",
          month8: "8月",
          month9: "9月",
          month10: "10月",
          month11: "11月",
          month12: "12月",
          week1: "周一",
          week2: "周二",
          week3: "周三",
          week4: "周四",
          week5: "周五",
          week6: "周六",
          week7: "周日",
          am: "上午",
          pm: "下午"
        }
      }
    };
  },
  computed: {
    currentLocale() {
      return this.$storage.locale?.locale === "zh"
        ? zhCn
        : this.$storage.locale?.locale === "en"
          ? en
          : this.zh_hk;
    }
  }
});
</script>
<style>
body {
  font-family: "Microsoft YaHei", "微软雅黑";
}
.el-text.el-text--primary {
  margin-right: 10px;
  cursor: pointer;
}
</style>
