<template>
  <div>
    <el-row :gutter="24" justify="space-around" type="flex" class="onecharts">
      <!-- 月份柱状 -->
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
          <!-- 检索框 -->
          <!-- <el-form
          style="display: flex; flex-wrap: wrap"
          :rules="oneRules"
          ref="oneForm"
          :model="product"
        >
          <el-form-item
            style="margin-left: 20px"
            class="item_select"
            :label="t(`salesBoard.saleChartsThree.productName`)"
            prop="name"
          >
            <el-select
              v-model="product.name"
              :placeholder="t(`salesBoard.common.commonPlaceHolder`)"
              style="width: 240px"
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
          </el-form-item>
          <el-form-item
            style="margin-left: 20px"
            class="item_select"
            :label="t(`salesBoard.saleChartsThree.month`)"
          >
            <el-date-picker
              v-model="timeArr"
              type="monthrange"
              range-separator="To"
              :start-placeholder="t(`salesBoard.saleChartsThree.starts`)"
              :end-placeholder="t(`salesBoard.saleChartsThree.endTime`)"
              value-format="YYYY-MM-DD"
              :disabled-date="disabledDate"
            />
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <el-button type="primary" @click="getOneChartData">{{
              t(`salesBoard.saleChartsThree.inquire`)
            }}</el-button>
          </el-form-item>
        </el-form> -->
          <el-form
            :inline="true"
            :rules="rules"
            ref="oneForm"
            :model="searchOneForm"
            ><el-form-item :label="t('newProduct.date')" prop="productDate">
              <!-- :format="locale === 'zh' ? 'YYYY-MM' : 'MM-YYYY'"
                :value-format="
                  locale.value === 'zh' ? 'YYYY-MM-DD' : 'DD-MM-YYYY'
                " -->
              <el-date-picker
                class="date-style"
                v-model="searchOneForm.productDate"
                type="month"
                format="YYYY-MM"
                value-format="YYYY-MM-DD"
                @change="getProduct"
                :disabled-date="disabledDate"
              />
            </el-form-item>
            <el-form-item :label="t('newProduct.product')" prop="productName">
              <el-select
                v-model="searchOneForm.productName"
                style="width: 200px"
                clearable
                filterable
              >
                <el-option
                  v-for="item in option"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 20px">
              <el-button type="primary" @click="getOneChartData">{{
                t(`status.inquire`)
              }}</el-button>
            </el-form-item></el-form
          >
          <div class="flex justify-between" />
          <div class="flex items-start justify-between mt-3">
            <div id="bar-one" style="width: 100%; height: 450px" ref="barOne" />
          </div>
        </el-card>
      </re-col>
      <!--第二个  -->
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
        style="padding-left: 0; padding-right: 0; margin-top: 10px"
      >
        <el-card class="bar-card" shadow="never">
          <el-form
            :inline="true"
            :model="searchTwoForm"
            :rules="rules"
            ref="twoForm"
          >
            <el-form-item :label="t('newProduct.product')" prop="productName">
              <el-input v-model="searchOneForm.productName" disabled />
              <!-- <el-select
                v-model="searchOneForm.productName"
                style="width: 200px"
                clearable
                filterable
              >
                <el-option
                  v-for="item in option"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select> -->
            </el-form-item>
            <el-form-item
              class="item_select"
              :label="t(`newProduct.period`)"
              prop="month"
            >
              <el-select
                v-model="searchTwoForm.month"
                style="width: 80px"
                filterable
                remote
              >
                <el-option
                  v-for="item in 8"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 20px">
              <!-- <el-tooltip
                :content="`${t(
                  'newProduct.time'
                )}: ${searchOneForm.productDate} ~ ${dateString}`"
                placement="top"
                effect="light"
              > -->
              <el-button type="primary" @click="getTwoChartData">{{
                t(`status.inquire`)
              }}</el-button>
              <!-- </el-tooltip> -->
              <span style="margin-left: 10px; color: #62c23a"
                >{{ t("salesBoard.common.dateStr") }}
                {{
                  locale === "zh"
                    ? searchOneForm.productDate
                    : transformDate(searchOneForm.productDate)
                }}~{{ dateString }}</span
              >
            </el-form-item>
          </el-form>
          <div class="flex justify-between">
            <!-- <span class="font-medium text-md">产品销售额</span> -->
          </div>
          <div class="flex items-start justify-between mt-3">
            <div id="bar-two" style="width: 100%; height: 450px" ref="barTwo" />
          </div>
        </el-card>
      </re-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed, nextTick, onUnmounted } from "vue";
import Table from "@/components/table/index.vue";
import { useI18n } from "vue-i18n";
import ReCol from "@/components/ReCol";
import * as echarts from "echarts";
import {
  getProductNameByProdctDate,
  getSaleDataByProductAndDate,
  getSaleDataInRegionByProductAndDate
} from "@/api/dataBoard/newProduct";
import { storageLocal } from "@/store/utils";
import { transformDate } from "@/utils/transformDate";

const { t, locale } = useI18n();
const rate = ["US$m", "USD", "CNY"];
const cnyRate = storageLocal().getItem("user-info")?.cnyRate;

const searchOneForm = reactive({
  productDate:
    new Date().getFullYear() +
    "-" +
    String(new Date().getMonth() + 1).padStart(2, "0") +
    "-01"
  // productDate:
  //   locale.value === "zh"
  //     ? new Date().getFullYear() +
  //       "-" +
  //       String(new Date().getMonth() + 1).padStart(2, "0") +
  //       "-01"
  //     : "01-" +
  //       String(new Date().getMonth() + 1).padStart(2, "0") +
  //       "-" +
  //       new Date().getFullYear()
});
const searchTwoForm = reactive({ month: 1 });

//计算周期的时间
const getLastDayOfMonth = (year, month, offset) => {
  month -= 1;
  const date = new Date(year, month + offset, 0);
  const formattedYear = date.getFullYear();
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const lastDay = String(date.getDate()).padStart(2, "0");
  return locale.value === "zh"
    ? `${formattedYear}-${formattedMonth}-${lastDay}`
    : `${lastDay}/${formattedMonth}/${formattedYear}`;
  // return `${formattedYear}-${formattedMonth}-${lastDay}`;
};
const dateString = computed(() => {
  let newDate = new Date(searchOneForm.productDate);
  return getLastDayOfMonth(
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    searchTwoForm.month
  );
});

const tableData = ref([]);
const option = ref([]);

const rules = computed(() => {
  return {
    month: [
      {
        required: true,
        message: t("newProduct.monthTip"),
        trigger: "blur"
      }
    ],
    productDate: [
      {
        required: true,
        message: t("newProduct.dateTip"),
        trigger: "change"
      }
    ],
    productName: [
      {
        required: true,
        message: t("newProduct.productTip"),
        trigger: "blur"
      }
    ]
  };
});

const getProduct = val => {
  option.value = [];
  searchOneForm.productName = "";
  if (val) {
    getProductNameByProdctDate({ productDate: searchOneForm.productDate }).then(
      res => {
        option.value = res.data;
      }
    );
  }
};

const nameOne = ref(rate[1]);
let view = true;
const oneTitle = ref(t("newProduct.saleTitle"));
const oneTool = ref(t("newProduct.sqtTitle"));
const paintOne = arr => {
  let xData = [];
  let yData = [];
  arr.forEach(item => {
    if (view) {
      if (nameOne.value == "US$m") {
        yData.push((item.total / 1000000).toFixed(4));
      } else if (nameOne.value == "USD") {
        yData.push(item.total);
      } else if (nameOne.value == "CNY") {
        yData.push((item.total * cnyRate).toFixed(2));
      }
    } else {
      yData.push(item.total);
    }
    xData.push(locale.value === "zh" ? item.dateString : item.enDateString);
  });
  let myChart = echarts.init(document.getElementById("bar-one"));
  myChart.clear();
  document.getElementById("bar-one").removeAttribute("_echarts_instance_");
  myChart.setOption({
    title: {
      text: oneTitle.value,
      left: "center"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
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
      //   axisLabel: {
      //     rotate: 45 // 将标签倾斜45度
      //   }
    },
    yAxis: {
      type: "value",
      name: view ? nameOne.value : "",
      nameTextStyle: {
        fontWeight: "600"
      },
      axisLabel: {
        fontSize: 14
      }
    },
    toolbox: {
      itemSize: 14,
      feature: {
        myTool1: {
          show: view, //是否显示
          title: "US$m", //鼠标悬空的提示文字
          icon: "path://M337.6384 303.04h85.1072L488.128 482.56c8.3072 23.872 15.5648 49.3184 23.36 74.24h2.56c8.2944-24.9088 15.0656-50.3552 23.36-74.24l63.8208-179.5328h85.1072v384h-70.0288V526.6944c0-36.3264 5.696-89.7792 9.3312-126.0928h-2.0736l-31.1296 90.2784-59.1616 161.3824h-44.1088L429.504 490.88 398.8864 400.64H396.8c3.6352 36.3136 9.856 89.7664 9.856 126.0928v160.3072h-69.0176z",
          onclick: e => {
            nameOne.value = "US$m";
            getOneChartData();
          }
        },
        myTool2: {
          show: view, //是否显示
          title: "USD", //鼠标悬空的提示文字
          icon: "path://M568.612571 493.275429l-16.603428-5.193143V196.754286l31.670857 11.190857c33.206857 11.702857 59.830857 35.620571 78.848 70.582857 2.998857 4.461714 9.728 6.948571 19.529143 7.314286a19.309714 19.309714 0 0 0 16.749714-10.24c3.803429-10.24 4.534857-18.578286 1.901714-22.893715-32.694857-54.125714-76.288-86.893714-129.609142-97.426285l-19.017143-3.803429v-55.222857a29.696 29.696 0 0 0-5.412572-19.017143C545.426286 76.068571 541.257143 73.142857 528.822857 73.142857c-8.045714 0-13.897143 1.828571-17.846857 5.339429-2.925714 2.925714-4.900571 9.654857-5.266286 17.846857v57.051428l-21.211428 2.340572c-43.300571 4.534857-78.994286 21.357714-106.422857 50.102857-31.817143 31.817143-48.274286 75.044571-48.932572 128.512 0 85.796571 52.150857 142.994286 159.451429 174.957714l17.115428 4.973715v314.294857l-30.427428-8.777143c-38.912-11.264-71.460571-36.278857-96.768-74.24-5.339429-7.753143-13.385143-11.556571-25.088-11.995429-7.899429 0-11.556571 2.340571-14.043429 8.338286-3.437714 12.288-2.852571 22.162286 1.682286 29.988571 34.742857 54.857143 83.382857 87.771429 144.603428 97.718858l20.041143 3.218285v54.857143c0 9.216 1.755429 15.725714 5.266286 19.017143 1.316571 1.243429 5.558857 4.169143 17.846857 4.169143 6.582857 0 12.434286-2.048 17.92-6.217143 3.510857-2.706286 5.266286-8.411429 5.266286-16.969143v-54.710857l19.748571-3.364571c38.4-6.582857 72.557714-23.698286 101.668572-50.761143 35.913143-34.011429 54.491429-77.092571 55.149714-128 0-98.816-52.370286-163.474286-159.963429-197.558857z m-62.902857-15.579429l-33.792-15.652571c-63.049143-29.330286-95.524571-72.265143-96.548571-127.707429 0-39.716571 12.288-72.557714 36.278857-97.426286 15.579429-17.554286 38.034286-28.745143 66.56-33.353143l27.501714-4.388571v278.528z m133.851429 310.198857c-15.506286 13.897143-34.230857 24.868571-55.734857 32.548572l-31.817143 11.410285V525.970286l34.596571 17.334857c62.610286 31.817143 94.793143 81.408 95.670857 147.456 0 38.912-14.336 71.606857-42.642285 97.133714z",
          onclick: e => {
            nameOne.value = "USD";
            getOneChartData();
          }
        },
        myTool3: {
          show: view, //是否显示
          title: "CNY", //鼠标悬空的提示文字
          icon: "path://M675.861 192l45.611 44.907-166.997 169.6H792v64H544v144.597h248v64H544v176.597h-64V679.104H232v-64h248V470.507H232v-64h237.483l-166.955-169.6L348.138 192 512 358.464 675.861 192z",
          onclick: e => {
            nameOne.value = "CNY";
            getOneChartData();
          }
        },
        myTool: {
          show: true, //是否显示
          title: oneTool.value, //鼠标悬空的提示文字
          icon: "path://M853.333333 609.834667L652.501333 810.666667l-60.352-60.330667 55.168-55.146667-494.314666-0.021333v-85.333333H853.333333z m-499.498666-384l60.330666 60.330666L358.997333 341.333333H853.333333v85.333334H153.002667l200.832-200.832z", //这个是阿里icon svg 后 b的全部字符串
          onclick: e => {
            // e.option.series[0].label.show = !e.option.series[0].label.show; //设置show的值对图表进行切换
            view = !view;
            if (view) {
              oneTitle.value = t("newProduct.saleTitle");
              oneTool.value = t("newProduct.sqtTitle");
              paintOne(barOneData.value.saleMonsy);
            } else {
              oneTitle.value = t("newProduct.sqtTitle");
              oneTool.value = t("newProduct.saleTitle");
              paintOne(barOneData.value.qty);
            }
          }
        }
      }
    },
    series: [
      {
        data: yData,
        type: "bar",
        label: { show: true, position: "top" }
        // barWidth: 20
      },
      {
        type: "line",
        data: yData,
        tooltip: {
          trigger: "none"
        }
      }
    ]
  });
};

const barOneData = ref([]);
const oneForm = ref(null);
const getOneChartData = () => {
  if (oneForm.value) {
    oneForm.value.validate(valid => {
      if (valid) {
        getSaleDataByProductAndDate(searchOneForm).then(res => {
          barOneData.value = JSON.parse(JSON.stringify(res.data));
          view = true;
          oneTitle.value = t("newProduct.saleTitle");
          oneTool.value = t("newProduct.sqtTitle");
          nextTick(() => {
            paintOne(res.data.saleMonsy ?? []);
          });
        });
        getTwoChartData();
      }
    });
  }
};

const name = ref(rate[1]);
let viewShow = true;
const twoTool = ref(t("newProduct.sqtTitle"));
const twoTitle = ref(t("newProduct.saleTitle"));
const paintTwo = arr => {
  let xData = [];
  let yData = [];
  arr.forEach(item => {
    if (viewShow) {
      if (name.value == "US$m") {
        yData.push((item.total / 1000000).toFixed(4));
      } else if (name.value == "USD") {
        yData.push(item.total);
      } else if (name.value == "CNY") {
        yData.push((item.total * cnyRate).toFixed(2));
      }
    } else {
      yData.push(item.total);
    }
    if (locale.value === "zh") {
      xData.push(item.regionName);
    } else {
      xData.push(item.enRegionName);
    }
  });
  let myChart = echarts.init(document.getElementById("bar-two"));
  myChart.clear();
  document.getElementById("bar-two").removeAttribute("_echarts_instance_");
  myChart.setOption({
    title: {
      text: twoTitle.value,
      left: "center"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
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
      //   axisLabel: {
      //     rotate: 45 // 将标签倾斜45度
      //   }
    },
    yAxis: {
      type: "value",
      name: viewShow ? name.value : "",
      nameTextStyle: {
        fontWeight: "600"
      },
      axisLabel: {
        fontSize: 14
      }
    },
    toolbox: {
      itemSize: 14,
      feature: {
        myTool1: {
          show: viewShow, //是否显示
          title: "US$m", //鼠标悬空的提示文字
          icon: "path://M337.6384 303.04h85.1072L488.128 482.56c8.3072 23.872 15.5648 49.3184 23.36 74.24h2.56c8.2944-24.9088 15.0656-50.3552 23.36-74.24l63.8208-179.5328h85.1072v384h-70.0288V526.6944c0-36.3264 5.696-89.7792 9.3312-126.0928h-2.0736l-31.1296 90.2784-59.1616 161.3824h-44.1088L429.504 490.88 398.8864 400.64H396.8c3.6352 36.3136 9.856 89.7664 9.856 126.0928v160.3072h-69.0176z",
          onclick: e => {
            name.value = "US$m";
            getTwoChartData();
          }
        },
        myTool2: {
          show: viewShow, //是否显示
          title: "USD", //鼠标悬空的提示文字
          icon: "path://M568.612571 493.275429l-16.603428-5.193143V196.754286l31.670857 11.190857c33.206857 11.702857 59.830857 35.620571 78.848 70.582857 2.998857 4.461714 9.728 6.948571 19.529143 7.314286a19.309714 19.309714 0 0 0 16.749714-10.24c3.803429-10.24 4.534857-18.578286 1.901714-22.893715-32.694857-54.125714-76.288-86.893714-129.609142-97.426285l-19.017143-3.803429v-55.222857a29.696 29.696 0 0 0-5.412572-19.017143C545.426286 76.068571 541.257143 73.142857 528.822857 73.142857c-8.045714 0-13.897143 1.828571-17.846857 5.339429-2.925714 2.925714-4.900571 9.654857-5.266286 17.846857v57.051428l-21.211428 2.340572c-43.300571 4.534857-78.994286 21.357714-106.422857 50.102857-31.817143 31.817143-48.274286 75.044571-48.932572 128.512 0 85.796571 52.150857 142.994286 159.451429 174.957714l17.115428 4.973715v314.294857l-30.427428-8.777143c-38.912-11.264-71.460571-36.278857-96.768-74.24-5.339429-7.753143-13.385143-11.556571-25.088-11.995429-7.899429 0-11.556571 2.340571-14.043429 8.338286-3.437714 12.288-2.852571 22.162286 1.682286 29.988571 34.742857 54.857143 83.382857 87.771429 144.603428 97.718858l20.041143 3.218285v54.857143c0 9.216 1.755429 15.725714 5.266286 19.017143 1.316571 1.243429 5.558857 4.169143 17.846857 4.169143 6.582857 0 12.434286-2.048 17.92-6.217143 3.510857-2.706286 5.266286-8.411429 5.266286-16.969143v-54.710857l19.748571-3.364571c38.4-6.582857 72.557714-23.698286 101.668572-50.761143 35.913143-34.011429 54.491429-77.092571 55.149714-128 0-98.816-52.370286-163.474286-159.963429-197.558857z m-62.902857-15.579429l-33.792-15.652571c-63.049143-29.330286-95.524571-72.265143-96.548571-127.707429 0-39.716571 12.288-72.557714 36.278857-97.426286 15.579429-17.554286 38.034286-28.745143 66.56-33.353143l27.501714-4.388571v278.528z m133.851429 310.198857c-15.506286 13.897143-34.230857 24.868571-55.734857 32.548572l-31.817143 11.410285V525.970286l34.596571 17.334857c62.610286 31.817143 94.793143 81.408 95.670857 147.456 0 38.912-14.336 71.606857-42.642285 97.133714z",
          onclick: e => {
            name.value = "USD";
            getTwoChartData();
          }
        },
        myTool3: {
          show: viewShow, //是否显示
          title: "CNY", //鼠标悬空的提示文字
          icon: "path://M675.861 192l45.611 44.907-166.997 169.6H792v64H544v144.597h248v64H544v176.597h-64V679.104H232v-64h248V470.507H232v-64h237.483l-166.955-169.6L348.138 192 512 358.464 675.861 192z",
          onclick: e => {
            name.value = "CNY";
            getTwoChartData();
          }
        },
        myTool: {
          show: true, //是否显示
          title: twoTool.value, //鼠标悬空的提示文字
          icon: "path://M853.333333 609.834667L652.501333 810.666667l-60.352-60.330667 55.168-55.146667-494.314666-0.021333v-85.333333H853.333333z m-499.498666-384l60.330666 60.330666L358.997333 341.333333H853.333333v85.333334H153.002667l200.832-200.832z", //这个是阿里icon svg 后 b的全部字符串
          onclick: e => {
            // e.option.series[0].label.show = !e.option.series[0].label.show; //设置show的值对图表进行切换
            viewShow = !viewShow;
            if (viewShow) {
              twoTitle.value = t("newProduct.saleTitle");
              twoTool.value = t("newProduct.sqtTitle");

              paintTwo(barTwoData.value.saleMoney);
            } else {
              twoTitle.value = t("newProduct.sqtTitle");
              twoTool.value = t("newProduct.saleTitle");
              paintTwo(barTwoData.value.qty);
            }
          }
        }
      }
    },
    series: [
      {
        data: yData,
        type: "bar",
        label: { show: true, position: "top" }
        // barWidth: 20
      }
    ]
  });
};

const barTwoData = ref([]);
const twoForm = ref(null);
const getTwoChartData = () => {
  searchTwoForm.productDate = searchOneForm.productDate;
  searchTwoForm.productName = searchOneForm.productName;
  twoForm.value.validate(valid => {
    if (valid) {
      getSaleDataInRegionByProductAndDate(searchTwoForm).then(res => {
        barTwoData.value = res.data;
        viewShow = true;
        twoTool.value = t("newProduct.sqtTitle");
        twoTitle.value = t("newProduct.saleTitle");
        nextTick(() => {
          paintTwo(res.data.saleMoney ?? []);
        });
      });
    }
  });
};

//禁用日期
const disabledDate = time => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const year = time.getFullYear();
  return year !== currentYear || time.getTime() > Date.now();
};

onMounted(() => {
  window.addEventListener("setItemEvent", e => {
    getOneChartData();
    getTwoChartData();
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
}
:deep(el-date-picker .el-popper .el-picker__popper .el-picker-panel__icon-btn) {
  display: none !important;
}
el-date-picker {
  .el-picker-panel__icon-btn.d-arrow-left,
  .el-picker-panel__icon-btn.d-arrow-right {
    display: none !important;
  }
}
:deep(.el-form--inline .el-form-item) {
  margin-right: 20px !important;
}
</style>
