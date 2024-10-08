<template>
  <el-row :gutter="24" justify="space-around" type="flex">
    <re-col
      v-motion
      class="mb-[18px]"
      :value="24"
      :xs="24"
      :initial="{
        opacity: 0,
        y: 100
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 400
        }
      }"
      style="padding-left: 0; padding-right: 0"
    >
      <el-card class="bar-card" shadow="never">
        <div class="flex justify-between">
          <!-- <span class="font-medium text-md">{{
            t("salesBoard.sales")
          }}</span> -->
          <el-form
            :inline="true"
            :model="formData"
            ref="ruleForm"
            :rules="rules"
          >
            <el-form-item :label="t('salesBoard.common.date')" prop="date">
              <el-date-picker
                v-model="formData.date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                type="daterange"
                range-separator="To"
                :start-placeholder="t('salesBoard.common.starts')"
                :end-placeholder="t('salesBoard.common.endTime')"
              />
            </el-form-item>
            <!-- <el-form-item :label="t('salesBoard.common.sku')">
              <el-select
                v-model="formData.productName"
                style="width: 240px"
                clearable
                filterable
                remote
              >
                <el-option
                  v-for="item in productList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item> -->
            <el-form-item
              :label="t('salesBoard.common.customer')"
              prop="list"
              class="item_select"
            >
              <!-- <el-select
                v-model="formData.distributorNameList"
                collapse-tags
                filterable
                clearable
                multiple
                :multiple-limit="5"
              >
                <el-option
                  v-for="item in customerOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>  -->
              <el-cascader
                style="min-width: 500px; width: 80% !important; display: flex"
                v-model="formData.list"
                :show-all-levels="false"
                :options="customerOptions"
                :filter-method="filterMethod"
                filterable
                clearable
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="5"
                :props="{
                  children: 'options',
                  label: 'label',
                  value: 'value',
                  multiple: true
                }"
              /> </el-form-item
            ><el-form-item
              ><el-button type="primary" @click="getDataPaint">{{
                t("status.inquire")
              }}</el-button></el-form-item
            >
            <el-form-item
              style="color: #67c23a"
              v-if="formData.date.length > 0"
            >
              {{ t("salesBoard.common.dateStr")
              }}{{
                locale === "zh"
                  ? formData.date[0]
                  : transformDate(formData.date[0])
              }}~{{
                locale === "zh"
                  ? formData.date[1]
                  : transformDate(formData.date[1])
              }}
            </el-form-item>
          </el-form>
        </div>
        <div class="flex items-start justify-between mt-3">
          <div
            id="sales-bar"
            ref="salesBar"
            style="width: 100%; height: 600px"
          />
        </div>
      </el-card>
    </re-col>
  </el-row>
</template>

<script setup>
import ReCol from "@/components/ReCol";
import {
  ref,
  reactive,
  onMounted,
  nextTick,
  onUnmounted,
  computed,
  watch
} from "vue";
import { useI18n } from "vue-i18n";
// import { getAllProductBaseInfo } from "@/api/permission/product";
import * as echarts from "echarts";
import { storageLocal } from "@pureadmin/utils";
import { comparisonDistributorSaleMoney } from "@/api/biDataBoard/saleChartsFive";
import { distributorList } from "@/utils/distributor";
import { ElMessage } from "element-plus";
import { transformDate } from "@/utils/transformDate";

const { t, locale } = useI18n();
const rate = ["US$m", "USD", "CNY"];
const cnyRate = storageLocal().getItem("user-info")?.cnyRate;

//获取经销商
const customerOptions = distributorList();
const formData = reactive({
  distributorNameList: [customerOptions[0]?.options[0]?.value],
  list: [customerOptions[0]?.options[0]?.value],
  date: []
});
//模糊查询经销商
const filterMethod = (node, key) => {
  const lowerCaseQuery = key.toLowerCase();
  const lowerCaseLabel = node.label.toLowerCase();
  return lowerCaseLabel.includes(lowerCaseQuery);
};

watch(
  () => formData.list,
  (newVal, oldVal) => {
    // 处理 oldVal 的不同结构
    let processedOldVal = [];
    if (Array.isArray(newVal[0])) {
      // 如果 oldVal 是嵌套数组的形式，则只取第二个元素
      processedOldVal = newVal.map(item => item[1]);
    } else {
      // 如果 oldVal 是普通数组的形式，则直接使用
      processedOldVal = newVal;
    }
    formData.distributorNameList = processedOldVal;
    if (newVal.length > 5) {
      ElMessage.warning(t("salesBoard.common.maxSix"));
      // 将 formData.distributorNameList 的值设置为最多五个选项
      formData.distributorNameList = processedOldVal.slice(0, 5);
      formData.list = processedOldVal.slice(0, 5);
    }
  }
);

// 时间格式化
const formatDate = dateString => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formatter = new Intl.DateTimeFormat("zh-CN", options);
  return formatter.format(date).replace(/\//g, "-");
};
// 获取当前年第一天
const getFirstDayOfYear = () => {
  const now = new Date();
  now.setMonth(0); // 设置月份为1（一月）
  now.setDate(1); // 设置日期为1
  formData.date[0] = formatDate(now);
  formData.date[1] = formatDate(new Date());
};

const rules = computed(() => {
  return {
    date: [
      {
        required: true,
        message: t("salesBoard.common.commonPlaceHolder"),
        trigger: "change"
      }
    ],
    list: [
      {
        required: true,
        message: t("salesBoard.common.commonPlaceHolder"),
        trigger: "change"
      }
    ]
  };
});

//图表
const saleOne = ref(rate[1]);
const painting = arr => {
  let xData = [];
  let yData = [];
  arr.forEach(op => {
    xData.push(op.distributorName);
    if (saleOne.value == "US$m") {
      yData.push((op.data / 1000000).toFixed(4));
    } else if (saleOne.value == "USD") {
      yData.push(op.data);
    } else if (saleOne.value == "CNY") {
      yData.push((op.data * cnyRate).toFixed(2));
    }
  });
  let myChart = echarts.init(document.getElementById("sales-bar"));
  myChart.clear();
  document.getElementById("sales-bar").removeAttribute("_echarts_instance_");
  myChart.setOption({
    title: {
      text: t("salesBoard.saleChartsFive.compared"),
      left: "center",
      textStyle: {}
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    // legend: {
    //   top: '2%',
    //   icon: 'rect',
    //   left: '2%'
    // },
    grid: {
      left: "4%",
      right: "4%",
      bottom: "0",
      top: "10%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: xData
      // axisLabel: {
      //   rotate: 45 // 将标签倾斜45度
      // }
    },
    yAxis: {
      type: "value",
      name: saleOne.value,
      nameTextStyle: {
        fontWeight: "600"
      },
      axisLabel: {
        fontSize: 14
      }
    },
    toolbox: {
      show: true,
      itemSize: 14,
      feature: {
        myTool1: {
          show: true, //是否显示
          title: "US$m", //鼠标悬空的提示文字
          icon: "path://M337.6384 303.04h85.1072L488.128 482.56c8.3072 23.872 15.5648 49.3184 23.36 74.24h2.56c8.2944-24.9088 15.0656-50.3552 23.36-74.24l63.8208-179.5328h85.1072v384h-70.0288V526.6944c0-36.3264 5.696-89.7792 9.3312-126.0928h-2.0736l-31.1296 90.2784-59.1616 161.3824h-44.1088L429.504 490.88 398.8864 400.64H396.8c3.6352 36.3136 9.856 89.7664 9.856 126.0928v160.3072h-69.0176z",
          onclick: e => {
            saleOne.value = "US$m";
            getDataPaint(painBarOne.value);
          }
        },
        myTool2: {
          show: true, //是否显示
          title: "USD", //鼠标悬空的提示文字
          icon: "path://M568.612571 493.275429l-16.603428-5.193143V196.754286l31.670857 11.190857c33.206857 11.702857 59.830857 35.620571 78.848 70.582857 2.998857 4.461714 9.728 6.948571 19.529143 7.314286a19.309714 19.309714 0 0 0 16.749714-10.24c3.803429-10.24 4.534857-18.578286 1.901714-22.893715-32.694857-54.125714-76.288-86.893714-129.609142-97.426285l-19.017143-3.803429v-55.222857a29.696 29.696 0 0 0-5.412572-19.017143C545.426286 76.068571 541.257143 73.142857 528.822857 73.142857c-8.045714 0-13.897143 1.828571-17.846857 5.339429-2.925714 2.925714-4.900571 9.654857-5.266286 17.846857v57.051428l-21.211428 2.340572c-43.300571 4.534857-78.994286 21.357714-106.422857 50.102857-31.817143 31.817143-48.274286 75.044571-48.932572 128.512 0 85.796571 52.150857 142.994286 159.451429 174.957714l17.115428 4.973715v314.294857l-30.427428-8.777143c-38.912-11.264-71.460571-36.278857-96.768-74.24-5.339429-7.753143-13.385143-11.556571-25.088-11.995429-7.899429 0-11.556571 2.340571-14.043429 8.338286-3.437714 12.288-2.852571 22.162286 1.682286 29.988571 34.742857 54.857143 83.382857 87.771429 144.603428 97.718858l20.041143 3.218285v54.857143c0 9.216 1.755429 15.725714 5.266286 19.017143 1.316571 1.243429 5.558857 4.169143 17.846857 4.169143 6.582857 0 12.434286-2.048 17.92-6.217143 3.510857-2.706286 5.266286-8.411429 5.266286-16.969143v-54.710857l19.748571-3.364571c38.4-6.582857 72.557714-23.698286 101.668572-50.761143 35.913143-34.011429 54.491429-77.092571 55.149714-128 0-98.816-52.370286-163.474286-159.963429-197.558857z m-62.902857-15.579429l-33.792-15.652571c-63.049143-29.330286-95.524571-72.265143-96.548571-127.707429 0-39.716571 12.288-72.557714 36.278857-97.426286 15.579429-17.554286 38.034286-28.745143 66.56-33.353143l27.501714-4.388571v278.528z m133.851429 310.198857c-15.506286 13.897143-34.230857 24.868571-55.734857 32.548572l-31.817143 11.410285V525.970286l34.596571 17.334857c62.610286 31.817143 94.793143 81.408 95.670857 147.456 0 38.912-14.336 71.606857-42.642285 97.133714z",
          onclick: e => {
            saleOne.value = "USD";
            getDataPaint(painBarOne.value);
          }
        },
        myTool3: {
          show: true, //是否显示
          title: "CNY", //鼠标悬空的提示文字
          icon: "path://M675.861 192l45.611 44.907-166.997 169.6H792v64H544v144.597h248v64H544v176.597h-64V679.104H232v-64h248V470.507H232v-64h237.483l-166.955-169.6L348.138 192 512 358.464 675.861 192z",
          onclick: e => {
            saleOne.value = "CNY";
            getDataPaint(painBarOne.value);
          }
        }
      }
    },
    series: [
      {
        data: yData,
        type: "bar",
        label: { show: true, position: "top" }
      }
    ]
  });
};

//查询
const ruleForm = ref(null);
const painBarOne = ref([]);
const getDataPaint = () => {
  if (ruleForm.value) {
    ruleForm.value.validate(valid => {
      if (valid) {
        formData.startDate = formData.date[0];
        formData.endDate = formData.date[1];
        comparisonDistributorSaleMoney(formData).then(res => {
          if (res.data && res.success) {
            painBarOne.value = res.data;
            nextTick(() => {
              painting(res.data);
            });
          }
        });
      }
    });
  }
};

const side = computed(() => {
  return window.scrollY;
});

onMounted(() => {
  getFirstDayOfYear();
  getDataPaint();
  window.addEventListener("setItemEvent", e => {
    getDataPaint();
  });
});

onUnmounted(() => {
  // 移除对 sessionStorage 的监听
  window.removeEventListener("setItemEvent", () => {});
});
</script>

<style lang="scss" scoped>
:deep(.el-card) {
  --el-card-border-color: none;

  /* 解决概率进度条宽度 */
  .el-progress--line {
    width: 85%;
  }

  /* 解决概率进度条字体大小 */
  .el-progress-bar__innerText {
    font-size: 15px;
  }

  /* 隐藏 el-scrollbar 滚动条 */
  .el-scrollbar__bar {
    display: none;
  }

  /* el-timeline 每一项上下、左右边距 */
  .el-timeline-item {
    margin: 0 6px;
  }
}
:deep(.el-form--inline .el-form-item) {
  margin-right: 20px !important;
}
.main-content {
  margin: 20px 20px 0 !important;
  background: none !important;
  padding: 0 !important;
}
:deep(.item_select) {
  min-width: 250px; /* 设置最小宽度 */
}
</style>
