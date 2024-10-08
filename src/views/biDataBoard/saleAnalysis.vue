<template>
  <div id="printContent" class="page-style">
    <!-- 检索框 -->
    <el-form
      :inline="true"
      :rules="rule"
      :model="formData"
      ref="form"
      style="background-color: #fff"
    >
      <el-form-item
        style="margin-left: 20px"
        class="item_select"
        :label="t(`analysis.distributor`)"
        prop="distributorName"
      >
        <!-- <el-select
          v-model="formData.distributorName"
          style="width: 240px"
          filterable
        >
          <el-option-group
            v-for="group in distributorList"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-option-group>
        </el-select> -->
        <el-cascader
          v-model="formData.distributorName"
          :show-all-levels="false"
          :options="distributorList"
          :filter-method="filterMethod"
          filterable
          clearable
          :props="{ children: 'options', label: 'label', value: 'value' }"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item class="form-style">
        <el-button type="primary" @click="getData">{{
          t(`status.inquire`)
        }}</el-button>
      </el-form-item>
      <el-form-item class="form-style">
        <!-- <el-button
          type="warning"
          v-print="{ id: 'printContent' }"
          >{{
        }}</el-button>     -->
        <el-tooltip
          :content="t('analysis.exportReg')"
          effect="light"
          placement="top"
        >
          <el-dropdown
            split-button
            type="warning"
            trigger="click"
            @click="handleClick"
          >
            {{ t(`status.export1`) }}
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  ><span v-print="{ id: 'printContent' }">
                    {{ t("analysis.exppdf") }}</span
                  ></el-dropdown-item
                >
                <el-dropdown-item :disabled="true">{{
                  t("analysis.expimg")
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-tooltip>
      </el-form-item>
    </el-form>

    <el-row :gutter="24" justify="space-around" type="flex" class="onecharts">
      <!-- 图一 -->
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
          <h4 class="h4-style">
            {{ t("analysis.title1") }}
          </h4>
          <div
            class="flex items-center justify-around"
            style="margin-bottom: 30px"
          >
            <el-table
              :data="oneTableData"
              style="width: 45%"
              :cell-style="{ textAlign: 'center' }"
              :header-cell-style="{ textAlign: 'center' }"
            >
              <el-table-column :label="t(`analysis.ytoy`)">
                <el-table-column :label="t(`analysis.year`)" prop="year" />
                <el-table-column :label="t(`analysis.month`)" prop="month" />
                <el-table-column :label="t(`analysis.amount`)" prop="amount" />
              </el-table-column>
            </el-table>
            <el-table
              :data="twoTableData"
              style="width: 45%"
              :cell-style="{ textAlign: 'center' }"
              :header-cell-style="{ textAlign: 'center' }"
            >
              <el-table-column :label="t(`analysis.rate`)">
                <el-table-column :label="t(`analysis.year`)" prop="year" />
                <el-table-column :label="t(`analysis.amount`)" prop="amount" />
              </el-table-column>
            </el-table>
          </div>
          <div class="flex items-start justify-between mt-3">
            <div
              id="one-bar"
              style="width: 100%; height: 450px"
              ref="oneChart"
            />
          </div>
        </el-card>
      </re-col>
      <!-- 图二 -->
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
          <h4 class="h4-style">
            {{ t("analysis.title2") }}
          </h4>
          <div class="flex items-center justify-around">
            <el-table
              :data="threeTableData"
              style="width: 90%"
              :cell-style="{ textAlign: 'center' }"
              :header-cell-style="{ textAlign: 'center' }"
            >
              <el-table-column :label="t(`analysis.amount2`)">
                <el-table-column :label="t(`analysis.year`)" prop="year" />
                <el-table-column :label="t(`analysis.Q1`)" prop="Q1" />
                <el-table-column :label="t(`analysis.Q2`)" prop="Q2" />
                <el-table-column :label="t(`analysis.Q3`)" prop="Q3" />
                <el-table-column :label="t(`analysis.Q4`)" prop="Q4" />
                <el-table-column :label="t(`analysis.total`)" prop="total" />
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </re-col>
      <!-- 图七 -->
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
        style="padding-left: 0; padding-right: 0; margin-top: 20px"
      >
        <el-card class="bar-card" shadow="never">
          <h4 class="h4-style">{{ t("analysis.title7") }}</h4>
          <div class="flex items-start justify-between mt-3">
            <div
              id="serven-bar"
              ref="servenBar"
              style="width: 100%; height: 450px"
            />
          </div>
        </el-card>
      </re-col>
      <!-- 图三 -->
      <re-col
        v-motion
        class="mb-[18px] three-style"
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
          <div class="flex justify-between">
            <h4 class="h4-style">
              {{ t("analysis.title3") }}
            </h4>
          </div>
          <div class="flex items-start justify-between mt-3">
            <div
              id="three-bar"
              style="width: 100%; height: 700px; min-width: 800px"
              ref="threeBar"
            />
          </div>
        </el-card>
      </re-col>
      <!-- 图四 -->
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
          <!-- 全年是指去年是全年的，今年是到上月的，同期累计是去年到上月的，今年到上月 -->
          <el-form :model="formData" :inline="true" class="four-style">
            <el-form-item :label="t('analysis.button')">
              <el-radio-group
                v-model="formData.notAllYear"
                @change="changeData"
              >
                <el-radio-button
                  :label="t('analysis.allYear')"
                  :value="false"
                />
                <el-radio-button :label="t('analysis.term')" :value="true" />
              </el-radio-group>
            </el-form-item>
          </el-form>
          <h4 class="h4-style">
            {{ t("analysis.title4") }}
            <span style="color: #62c23a" v-if="fourDate != ''"
              >{{ t("salesBoard.common.thisYear")
              }}{{
                locale === "zh" ? fourDate[0] : transformDate(fourDate[0])
              }}~{{
                locale === "zh" ? fourDate[1] : transformDate(fourDate[1])
              }}</span
            >
          </h4>
          <el-form :inline="true" :model="fourForm" class="form-style">
            <el-form-item :label="t('analysis.four')">
              <el-select
                v-model="fourForm.sale"
                style="width: 240px"
                filterable
                remote
                @change="getFourData"
              >
                <el-option
                  v-for="item in saleOption"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                  @click="
                    (fourForm.minSaleMoney = null),
                      (fourForm.maxSaleMoney = null)
                  "
                />
              </el-select>
              <!-- <span v-if="!fourForm.sale">
                <el-input
                  type="number"
                  v-model="fourForm.minSaleMoney"
                  style="width: 80px"
                />--
                <el-input
                  type="number"
                  v-model="fourForm.maxSaleMoney"
                  style="width: 80px"
                />
                <el-button
                  type="primary"
                  @click="getFourData"
                  style="margin-left: 20px"
                  >{{ t("status.inquire") }}</el-button
                >
              </span> -->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dialogFour.show = true">{{
                t("analysis.custom")
              }}</el-button>
            </el-form-item>
          </el-form>
          <div id="four-bar" style="width: 100%; height: 450px" ref="fourBar" />
        </el-card>
      </re-col>
      <!-- 图五 -->
      <re-col
        v-motion
        class="mb-[18px] five-style"
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
          <h4 class="h4-style">
            {{ t("analysis.title5") }}
            <span style="color: #62c23a" v-if="fiveDate != ''"
              >{{ t("salesBoard.common.thisYear")
              }}{{
                locale === "zh" ? fiveDate[0] : transformDate(fiveDate[0])
              }}~{{
                locale === "zh" ? fiveDate[1] : transformDate(fiveDate[1])
              }}</span
            >
          </h4>
          <el-form :inline="true" :model="fiveForm" class="form-style">
            <el-form-item :label="t('analysis.five')">
              <el-select
                v-model="fiveForm.sale"
                style="width: 240px"
                filterable
                remote
                @change="getFiveData"
              >
                <el-option
                  v-for="item in qtyOption"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                  @click="
                    (fiveForm.minSaleMoney = null),
                      (fiveForm.maxSaleMoney = null)
                  "
                />
              </el-select>

              <!-- <span v-if="!fiveForm.sale">
                <el-input
                  type="number"
                  v-model="fiveForm.minSaleMoney"
                  style="width: 80px"
                />--
                <el-input
                  type="number"
                  v-model="fiveForm.maxSaleMoney"
                  style="width: 80px"
                />
                <el-button
                  type="primary"
                  @click="getFiveData"
                  style="margin-left: 20px"
                  >{{ t("status.inquire") }}</el-button
                >
              </span> -->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dialogFive.show = true">{{
                t("analysis.custom")
              }}</el-button>
            </el-form-item>
          </el-form>
          <div id="five-bar" style="width: 100%; height: 450px" ref="fiveBar" />
        </el-card>
      </re-col>
      <!-- 图六 -->
      <re-col
        v-motion
        class="mb-[18px] six-style"
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
          <h4 class="h4-style">
            {{ t("analysis.title6") }}
            <span style="color: #62c23a" v-if="sixDate != ''"
              >{{ t("salesBoard.common.thisYear")
              }}{{
                locale === "zh" ? sixDate[0] : transformDate(sixDate[0])
              }}~{{
                locale === "zh" ? sixDate[1] : transformDate(sixDate[1])
              }}</span
            >
          </h4>
          <div class="flex items-center justify-around">
            <!-- <el-table
              :data="sixTableData"
              border
              style="width: 90%"
              height="450"
              :cell-style="{ textAlign: 'center' }"
              :header-cell-style="{ textAlign: 'center' }"
            >
              <el-table-column :label="t('analysis.prod')" prop="productName" />
              <el-table-column :label="now - 1 + '(QTY)'" prop="lastSaleQTY" />
              <el-table-column
                :label="now - 1 + '(Amount)'"
                prop="lastSaleMoney"
              />
              <el-table-column :label="now + '(QTY)'" prop="currentSaleQTY" />
              <el-table-column
                :label="now + '(Amount)'"
                prop="currentSaleMoney"
              />
            </el-table> -->
            <table
              cellpadding="6"
              cellspacing="6"
              class="table-style"
              id="six-table"
            >
              <thead>
                <tr>
                  <th>{{ t("analysis.prod") }}</th>
                  <th>{{ now - 1 + "(QTY)" }}</th>
                  <th>{{ now - 1 + "(Amount)" }}</th>
                  <th>{{ now + "(QTY)" }}</th>
                  <th>{{ now + "(Amount)" }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in sixTableData" :key="item.productName">
                  <td>{{ item.productName }}</td>
                  <td>{{ item.lastSaleQTY }}</td>
                  <td>{{ item.lastSaleMoney }}</td>
                  <td>{{ item.currentSaleQTY }}</td>
                  <td>{{ item.currentSaleMoney }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </re-col>
    </el-row>
    <Dialog
      :dialog="dialogFour"
      @confirm="handleSummitFour"
      @close="handleCloseFour"
    >
      <div style="margin: 20px; text-align: center">
        <!-- <span v-if="fourForm.sale === false" style="margin-bottom: 20px"> -->
        <!-- {{ t("analysis.customSaleDialog") }} -->
        <el-input
          type="number"
          v-model="fourForm.minSaleMoney"
          :placeholder="t('analysis.min')"
          style="width: 80px"
        />
        ~
        <el-input
          type="number"
          :placeholder="t('analysis.max')"
          v-model="fourForm.maxSaleMoney"
          style="width: 80px"
        />
        <!-- </span> -->
        <!-- <span v-if="fiveForm.sale === false" style="margin-bottom: 20px">
          {{ t("analysis.customQtyDialog") }}
          <el-input
            type="number"
            :placeholder="t('analysis.min')"
            v-model="fiveForm.minSaleMoney"
            style="width: 80px"
          />--
          <el-input
            type="number"
            :placeholder="t('analysis.max')"
            v-model="fiveForm.maxSaleMoney"
            style="width: 80px"
          />
        </span> -->
      </div>
    </Dialog>
    <Dialog
      :dialog="dialogFive"
      @confirm="handleSummitFive"
      @close="handleCloseFive"
    >
      <div style="margin: 20px; text-align: center">
        <!-- <span v-if="fiveForm.sale === false" style="margin-bottom: 20px"> -->
        <!-- {{ t("analysis.customQtyDialog") }} -->
        <el-input
          type="number"
          :placeholder="t('analysis.min')"
          v-model="fiveForm.minSaleMoney"
          style="width: 80px"
        />
        ~
        <el-input
          type="number"
          :placeholder="t('analysis.max')"
          v-model="fiveForm.maxSaleMoney"
          style="width: 80px"
        />
        <!-- </span> -->
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import ReCol from "@/components/ReCol";
import {
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
  reactive
} from "vue";
import * as echarts from "echarts";
import { useI18n } from "vue-i18n";
import {
  getDistributorMonthAndYearSaleMoney,
  getDistributorSearchCondition,
  getDistributorSaleMoneyByQuarter,
  getDistributorSaleMoneyRangeProduct,
  getDistributorSaleQTYRangeProduct,
  getDistributorProductSaleDataGather,
  getDistributorProductSaleClass
} from "@/api/biDataBoard/saleAnalysis";
import Dialog from "@/components/dialog/index.vue";
import { storageLocal } from "@pureadmin/utils";
import { ElMessage } from "element-plus";
import { transformDate } from "@/utils/transformDate";
// import { useUserStoreHook } from "@/store/modules/user";

const { t, locale } = useI18n();

const form = ref([]);
const formData = ref({
  distributorName: "",
  notAllYear: true
});

const distributionList = ref([]);
const saleList = ref(storageLocal().getItem("user-info")?.saleList || []);

//图四五
const saleOption = computed(() => {
  let list = [
    { label: "0-1K", value: "[0, 1000]" },
    { label: "1-2K", value: "[1000, 2000]" },
    { label: "2-3K", value: "[2000, 3000]" },
    { label: "3-4K", value: "[3000, 4000]" },
    { label: "4-5K", value: "[4000, 5000]" },
    { label: t("analysis.K5"), value: true },
    { label: t("analysis.limit"), value: "[null, null]" },
    { label: t("analysis.custom"), value: false, disabled: true }
  ];

  return list.concat(saleList.value);
});
const qtyList = ref(storageLocal().getItem("user-info")?.qtyList || []);
const qtyOption = computed(() => {
  let list = [
    { label: "0-20pcs", value: "[0, 20]" },
    { label: "20-40pcs", value: "[20, 40]" },
    { label: "40-60pcs", value: "[40, 60]" },
    { label: t("analysis.pcs60"), value: true },
    { label: t("analysis.limit"), value: "[null, null]" },
    { label: t("analysis.custom"), value: false, disabled: true }
  ];

  return list.concat(qtyList.value);
});
const fourForm = reactive({ sale: saleOption.value[0].value });
const fiveForm = reactive({ sale: qtyOption.value[0].value });
const dialogFour = reactive({
  title: t("analysis.customSaleDialog"),
  show: false,
  width: "20%",
  showClose: false
});
const dialogFive = reactive({
  title: t("analysis.customQtyDialog"),
  show: false,
  width: "20%",
  showClose: false
});

const rule = computed(() => {
  return {
    distributorName: [
      { required: true, message: t("analysis.rule1"), trigger: "blur" }
    ]
  };
});

//图六
const sixData = ref([]);
let now =
  new Date().getMonth() + 1 === 1
    ? new Date().getFullYear() - 1
    : new Date().getFullYear();

//图七
const paintSeven = arr => {
  let xData = [];
  let yData = [];
  arr.forEach(it => {
    xData.push(locale.value === "zh" ? it.dateString : it.enDateString);
    yData.push(it.total);
  });
  let myChart = echarts.init(document.getElementById("serven-bar"));
  myChart.clear();
  document.getElementById("serven-bar").removeAttribute("_echarts_instance_");
  myChart.setOption({
    title: {
      text: t("salesBoard.saleChartsOne.rolling"),
      left: "center",
      textStyle: {}
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
    },
    yAxis: {
      type: "value",
      name: "USD",
      nameTextStyle: {
        fontWeight: "600"
      },
      axisLabel: {
        fontSize: 14
      }
    },
    series: [
      {
        data: yData,
        type: "line",
        lineWidth: 20,
        label: { show: true, position: "top" }
      }
    ]
  });
};

//图一
const paintOne = (
  xData,
  yData1,
  yData2,
  id,
  title,
  isRotate,
  unit,
  isLabel,
  legend1,
  legend2
) => {
  let myChart = echarts.init(document.getElementById(id));
  myChart.clear();
  document.getElementById(id).removeAttribute("_echarts_instance_");
  myChart.setOption({
    title: {
      text: title,
      left: "center"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      show: true,
      // data: [now - 1, now],
      left: "right"
      // top: "bottom"
    },
    xAxis: {
      type: "category",
      data: xData,
      axisLabel: {
        rotate: isRotate,
        interval: 0,
        formatter: function (value) {
          if (value.length > 15) {
            return value.substring(0, 15) + "...";
          }
          return value;
        }
      }
    },
    grid: {
      left: "8%",
      right: "4%",
      bottom: "25%"
    },
    yAxis: {
      type: "value",
      name: unit,
      nameTextStyle: {
        fontWeight: "600"
      },
      axisLabel: {
        fontSize: 14
      }
    },
    series: [
      {
        name: legend1,
        type: "bar",
        data: yData1,
        label: { show: isLabel, position: "top" }
        // barWidth: 20
      },
      {
        name: legend2,
        type: "bar",
        data: yData2,
        label: { show: isLabel, position: "top" }
        // barWidth: 20
      }
    ],
    dataZoom: [
      {
        show: true,
        type: "slider",
        shartValue: 0,
        endValue: 30,
        filterable: "empty",
        width: "80%",
        left: "center",
        height: 0,
        zoomLoxk: true,
        handleSize: 0,
        bottom: 0
      },
      {
        type: "inside",
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true
      }
    ]
  });
};

//图三
const paintThree = (
  arr1,
  arr2,
  arr3,
  arr4,
  id,
  title1,
  title2,
  title3,
  title4
) => {
  let myChart = echarts.init(document.getElementById(id));
  myChart.clear();
  document.getElementById(id).removeAttribute("_echarts_instance_");
  myChart.setOption({
    // title: {
    //   text: "11111",
    //   left: "center"
    // },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        let value = params.data.isNegative
          ? params.data.value * -1
          : params.data.value;
        return `${params.name}: ${value}%`;
      }
    },
    legend: { orient: "vertical", left: "right", top: "center" },
    // grid: {
    //   right: "10%"
    // },
    graphic: [
      {
        type: "text",
        left: locale.value === "en" ? "16%" : "19%", // 与第一个饼图的中心对齐
        top: "1%",
        // rotation: Math.PI / -2,
        style: {
          text: title1,
          fill: "#000",
          font: "bold 16px sans-serif"
        }
      },
      {
        type: "text",
        left: locale.value == "en" ? "65%" : "69%", // 与第二个饼图的中心对齐
        top: "1%",
        style: {
          text: title2,
          fill: "#000",
          font: "bold 16px sans-serif"
        }
      },
      {
        type: "text",
        left: locale.value === "en" ? "16%" : "19%",
        top: "51%",
        style: {
          text: title3,
          fill: "#000",
          font: "bold 16px sans-serif"
        }
      },
      {
        type: "text",
        left: locale.value == "en" ? "65%" : "69%",
        top: "51%",
        style: {
          text: title4,
          fill: "#000",
          font: "bold 16px sans-serif"
        }
      }
    ],
    series: [
      {
        name: "",
        type: "pie",
        radius: "40%",
        center: ["25%", "27%"],
        label: {
          show: true,
          position: "outside",
          distance: 10,
          color: "inherit",
          fontWeight: "bold",
          fontSize: 14,
          // formatter: "{c}%",
          formatter: function (e) {
            let value = arr1[e.dataIndex].isNegative
              ? arr1[e.dataIndex].value * -1
              : arr1[e.dataIndex].value;
            return e.data.name + ": " + value + "%";
          }
        },
        data: arr1
      },
      {
        name: "",
        type: "pie",
        radius: "40%",
        center: ["75%", "27%"],
        label: {
          show: true,
          position: "outside",
          distance: 10,
          color: "inherit",
          fontWeight: "bold",
          fontSize: 14,
          // formatter: "{c}%",
          formatter: function (e) {
            let value = arr2[e.dataIndex].isNegative
              ? arr2[e.dataIndex].value * -1
              : arr2[e.dataIndex].value;
            return e.data.name + ": " + value + "%";
          }
        },
        data: arr2
      },
      {
        name: "",
        type: "pie",
        radius: "40%",
        center: ["25%", "77%"],
        label: {
          show: true,
          position: "outside",
          distance: 10,
          color: "inherit",
          fontWeight: "bold",
          fontSize: 14,
          // formatter: "{c}%"
          formatter: function (e) {
            let value =
              arr3[e.dataIndex].isNegative > 0
                ? arr3[e.dataIndex].value * -1
                : arr3[e.dataIndex].value;
            return e.data.name + ": " + value + "%";
          }
        },
        data: arr3
      },
      {
        name: "",
        type: "pie",
        radius: "40%",
        center: ["75%", "77%"],
        label: {
          show: true,
          position: "outside",
          distance: 10,
          color: "inherit",
          fontWeight: "bold",
          fontSize: 14,
          // formatter: "{c}%"
          formatter: function (e) {
            let value =
              arr4[e.dataIndex].isNegative > 0
                ? arr4[e.dataIndex].value * -1
                : arr4[e.dataIndex].value;
            return e.data.name + ": " + value + "%";
          }
        },
        data: arr4
      }
    ]
  });
};

//获取图一和图七的数据
const oneTableData = ref([]);
const twoTableData = ref([]);
const getOneAndSevenData = async () => {
  form.value.validate(valid => {
    if (valid) {
      getDistributorMonthAndYearSaleMoney(formData.value.distributorName).then(
        res => {
          if (res.code === 0 && res.data) {
            nextTick(() => {
              paintSeven(res.data.sortedList);
            });
            oneTableData.value = [];
            twoTableData.value = [];

            oneTableData.value.push(
              {
                year: res.data.lastYearMonthDate.split("-")[0],
                month: res.data.lastYearMonthDate.split("-")[1],
                amount: res.data.lastYearLastMonthSaleMoney
              },
              {
                year: res.data.currentYearMonthDate.split("-")[0],
                month: res.data.currentYearMonthDate.split("-")[1],
                amount: res.data.currentYearLastMonthSaleMoney
              },
              { year: "%chg", month: null, amount: res.data.monthRatio + "%" }
            );
            //TODO
            const cnDate1 =
              res.data.lastYearMonthDate.split("-")[0] +
              "-01 ~ " +
              res.data.lastYearMonthDate.split("-")[0] +
              "-" +
              res.data.lastYearMonthDate.split("-")[1];
            const cnDate2 =
              res.data.currentYearMonthDate.split("-")[0] +
              "-01 ~ " +
              res.data.currentYearMonthDate.split("-")[0] +
              "-" +
              res.data.currentYearMonthDate.split("-")[1];

            const enDate1 =
              "01/" +
              res.data.lastYearMonthDate.split("-")[0] +
              " ~ " +
              res.data.lastYearMonthDate.split("-")[1] +
              "/" +
              res.data.lastYearMonthDate.split("-")[0];
            const enDate2 =
              "01/" +
              res.data.currentYearMonthDate.split("-")[0] +
              " ~ " +
              res.data.currentYearMonthDate.split("-")[1] +
              "/" +
              res.data.currentYearMonthDate.split("-")[0];

            twoTableData.value.push(
              {
                year: locale.value === "zh" ? cnDate1 : enDate1,
                amount: res.data.lastYearTotalSaleMoney
              },
              {
                year: locale.value === "zh" ? cnDate2 : enDate2,
                amount: res.data.currentYearTotalSaleMoeny
              },
              { year: "%chg", amount: res.data.yearRatio + "%" }
            );
            //图一数据
            let xData = [];
            let yData1 = [];
            let yData2 = [];
            let last = [];
            let current = [];
            let months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ];

            res.data.lastYearMonthSaleMoneyList.forEach((it, index) => {
              last.push(months[Number(it.dateString.split("-")[1]) - 1]);
              yData1.push(it.total);
            });
            res.data.currentYearMonthSaleMoneyList.forEach((it, index) => {
              current.push(months[Number(it.dateString.split("-")[1]) - 1]);
              yData2.push(it.total);
            });
            xData = [...new Set([...last, ...current])];
            nextTick(() => {
              paintOne(
                xData,
                yData1,
                yData2,
                "one-bar",
                res.data.lastYearMonthDate.split("-")[0] +
                  " VS " +
                  res.data.currentYearLastMonthDate.split("-")[0] +
                  t("analysis.oneTitle"),
                0,
                "USD",
                true,
                res.data.lastYearMonthDate.split("-")[0],
                res.data.currentYearLastMonthDate.split("-")[0]
              );
            });
          }
        }
      );
    }
  });
};

//获取图二的数据
const threeTableData = ref([]);
const getTwoData = async () => {
  form.value.validate(valid => {
    if (valid) {
      getDistributorSaleMoneyByQuarter(formData.value.distributorName).then(
        res => {
          if (res.code === 0 && res.data) {
            threeTableData.value = [];
            let last = res.data.lastYearQuarterData;
            let current = res.data.currentYearQuarterData;
            let i = 0;
            threeTableData.value.push(
              {
                year: now - 1,
                Q1: last[i].total,
                Q2: last[i + 1].total,
                Q3: last[i + 2].total,
                Q4: last[i + 3].total,
                total: (
                  last[i].total +
                  last[i + 1].total +
                  last[i + 2].total +
                  last[i + 3].total
                ).toFixed(2)
              },
              {
                year: now,
                Q1: current[i].total,
                Q2: current[i + 1].total,
                Q3: current[i + 2].total,
                Q4: current[i + 3].total,
                total: (
                  current[i].total +
                  current[i + 1].total +
                  current[i + 2].total +
                  current[i + 3].total
                ).toFixed(2)
              }
            );
            const totalData = (
              ((
                threeTableData.value[i + 1]?.total -
                threeTableData.value[i]?.total
              ).toFixed(2) /
                threeTableData.value[i]?.total) *
              100
            ).toFixed(2);
            threeTableData.value.push({
              year: "%chg",
              Q1: res.data.Q1 + "%",
              Q2: res.data.Q2 + "%",
              Q3: res.data.Q3 + "%",
              Q4: res.data.Q4 + "%",
              total: totalData === "Infinity" ? "0%" : totalData + "%"
            });
          }
        }
      );
    }
  });
};

//获取图三数据
const getThreeData = async () => {
  form.value.validate(valid => {
    if (valid) {
      getDistributorProductSaleClass(formData.value.distributorName).then(
        res => {
          if (res.code === 0 && res.data) {
            //功能
            const last = res.data.lastData.map(it => ({
              name: it.productClass,
              value:
                it.saleMoenyRate < 0
                  ? Math.abs(it.saleMoenyRate)
                  : it.saleMoenyRate,
              isNegative: it.saleMoenyRate < 0
            }));
            const current = res.data.currentData.map(it => ({
              name: it.productClass,
              value:
                it.saleMoenyRate < 0
                  ? Math.abs(it.saleMoenyRate)
                  : it.saleMoenyRate,
              isNegative: it.saleMoenyRate < 0
            }));
            //价格

            const lastPrice = Object.keys(res.data.lastSaleMoneyGroupRange).map(
              it => ({
                name: it,
                value:
                  res.data.lastSaleMoneyGroupRange[it] < 0
                    ? Math.abs(res.data.lastSaleMoneyGroupRange[it])
                    : res.data.lastSaleMoneyGroupRange[it],
                isNegative: res.data.lastSaleMoneyGroupRange[it] < 0
              })
            );
            const currentPrice = Object.keys(
              res.data.currentSaleMoneyGroupRange
            ).map(it => ({
              name: it,
              value:
                res.data.currentSaleMoneyGroupRange[it] < 0
                  ? Math.abs(res.data.currentSaleMoneyGroupRange[it])
                  : res.data.currentSaleMoneyGroupRange[it],
              isNegative: res.data.currentSaleMoneyGroupRange[it] < 0
            }));

            const thisYear =
              new Date().getMonth() + 1 === 1
                ? new Date().getFullYear() - 1
                : new Date().getFullYear();
            const lastYear = thisYear - 1;
            //前三个月的月份，如果当前月份是1月，则取上一年12月，前三月是指上月开始往前推三个月
            const lastThreeMonth =
              (new Date().getMonth() + 1 === 1 ? 12 : new Date().getMonth()) -
              2;
            //上月
            const lastMonth =
              new Date().getMonth() + 1 === 1 ? 12 : new Date().getMonth();

            const cnDate1 =
              lastYear +
              "." +
              lastThreeMonth +
              "-" +
              lastYear +
              "." +
              lastMonth +
              "  ";
            const cnDate2 =
              thisYear +
              "." +
              lastThreeMonth +
              "-" +
              thisYear +
              "." +
              lastMonth +
              "  ";
            const enDate1 =
              lastThreeMonth +
              "/" +
              lastYear +
              "-" +
              lastMonth +
              "/" +
              lastYear +
              "  ";
            const enDate2 =
              lastThreeMonth +
              "/" +
              thisYear +
              "-" +
              lastMonth +
              "/" +
              thisYear +
              "  ";
            const title1 =
              locale.value === "zh"
                ? cnDate1 + t("analysis.threeTitle1")
                : enDate1 + t("analysis.threeTitle1");
            const title2 =
              locale.value === "zh"
                ? cnDate2 + t("analysis.threeTitle1")
                : enDate2 + t("analysis.threeTitle1");
            const title3 =
              locale.value === "zh"
                ? cnDate1 + t("analysis.threeTitle2")
                : enDate1 + t("analysis.threeTitle2");
            const title4 =
              locale.value === "zh"
                ? cnDate2 + t("analysis.threeTitle2")
                : enDate2 + t("analysis.threeTitle2");

            nextTick(() => {
              paintThree(
                last,
                current,
                lastPrice,
                currentPrice,
                "three-bar",
                title1,
                title2,
                title3,
                title4
              );
            });
          }
        }
      );
    }
  });
};

//自定义确认按钮
const handleSummitFour = () => {
  // if (fourForm.sale === false) {
  // console.log(
  //   fourForm.minSaleMoney,
  //   fourForm.maxSaleMoney,
  //   fourForm.minSaleMoney < fourForm.maxSaleMoney,
  //   typeof fourForm.minSaleMoney,
  //   "si"
  // );

  if (Number(fourForm.minSaleMoney) < Number(fourForm.maxSaleMoney)) {
    getFourData();
  } else {
    ElMessage.error(t("analysis.error"));
  }
  // }
  //  else if (fiveForm.sale === false) {
  //   console.log(fiveForm.minSaleMoney, fiveForm.maxSaleMoney, "wu");

  //   if (fiveForm.minSaleMoney < fiveForm.maxSaleMoney) {
  //     getFiveData();
  //   } else {
  //     ElMessage.error(t("analysis.error"));
  //   }
  // }
};
//自定义取消按钮
const handleCloseFour = () => {
  //   console.log("自定义取消按钮");
  dialogFour.show = false;
  fourForm.minSaleMoney = "";
  fourForm.maxSaleMoney = "";

  // if (fiveForm.sale === false) {
  //   fiveForm.sale = qtyOption.value[0].value;
  // } else
  // if (fourForm.sale === false) {
  //   fourForm.sale = saleOption.value[0].value;
  // }
};

const handleSummitFive = () => {
  if (Number(fiveForm.minSaleMoney) < Number(fiveForm.maxSaleMoney)) {
    getFiveData();
  } else {
    ElMessage.error(t("analysis.error"));
  }
};

const handleCloseFive = () => {
  dialogFive.show = false;
  fiveForm.minSaleMoney = "";
  fiveForm.maxSaleMoney = "";
};

//获取图四数据
const fourDate = ref("");
const getFourData = async val => {
  form.value.validate(valid => {
    if (valid) {
      let data = {
        distributorName: formData.value.distributorName,
        notAllYear: formData.value.notAllYear
      };
      //当5k以上时
      if (typeof val == "boolean" && val) {
        data.noMaxData = true;
        data.minSaleMoney = 5000;
        //正常值时
      } else if (typeof val == "string") {
        val = JSON.parse(val);
        data.maxSaleMoney = val[1];
        data.minSaleMoney = val[0];
        //自定义时 为false
      } else {
        dialogFour.show = true;
        // fiveForm.sale = "";
        data.maxSaleMoney = fourForm.maxSaleMoney;
        data.minSaleMoney = fourForm.minSaleMoney;
        let userInfo = storageLocal().getItem("user-info");
        if (!userInfo.saleList) {
          userInfo.saleList = [];
        }
        //如果重复不添加
        if (
          !userInfo.saleList.find(
            it =>
              it.label ===
              `${Number(fourForm.minSaleMoney) / 1000}-${Number(fourForm.maxSaleMoney) / 1000}k`
          ) &&
          fourForm.minSaleMoney &&
          fourForm.maxSaleMoney
        ) {
          userInfo.saleList.push({
            label: `${Number(fourForm.minSaleMoney) / 1000}-${Number(fourForm.maxSaleMoney) / 1000}k`,
            value: JSON.stringify([
              fourForm.minSaleMoney,
              fourForm.maxSaleMoney
            ])
          });
        }

        storageLocal().setItem("user-info", userInfo);
        saleList.value = userInfo.saleList;
      }
      if (val !== false) {
        getDistributorSaleMoneyRangeProduct(data).then(res => {
          if (res.code === 0 && res.data) {
            dialogFour.show = false;
            //更新绑定的值
            if (fourForm.minSaleMoney && fourForm.maxSaleMoney) {
              fourForm.sale = `${Number(fourForm.minSaleMoney) / 1000}-${Number(fourForm.maxSaleMoney) / 1000}k`;
            }
            fourDate.value = [res.data.start, res.data.end];
            let xData = [];
            let yData1 = [];
            let yData2 = [];
            res.data.saleMoney.forEach(it => {
              xData.push(it.productName);
              yData1.push(it.lastSale);
              yData2.push(it.currentSale);
            });
            nextTick(() => {
              paintOne(
                xData,
                yData1,
                yData2,
                "four-bar",
                t("analysis.fourTitle"),
                -90,
                "USD",
                false,
                now - 1,
                now
              );
            });
          }
        });
      }
    } else {
      fourForm.sale = saleOption.value[0].value;
      dialogFour.show = false;
      fourForm.minSaleMoney = "";
      fourForm.maxSaleMoney = "";
    }
  });
};

//获取图五数据
const fiveDate = ref("");
const getFiveData = async val => {
  form.value.validate(valid => {
    if (valid) {
      let data = {
        distributorName: formData.value.distributorName,
        notAllYear: formData.value.notAllYear
      };
      //60以上
      if (typeof val == "boolean" && val) {
        data.noMaxData = true;
        data.minSaleMoney = 60;
        //正常选值
      } else if (typeof val == "string") {
        val = JSON.parse(val);
        data.maxSaleMoney = val[1];
        data.minSaleMoney = val[0];
        //如果是自定义，val要为false并要有区间
      } else {
        dialogFive.show = true;
        // fourForm.sale = "";
        data.maxSaleMoney = fiveForm.maxSaleMoney;
        data.minSaleMoney = fiveForm.minSaleMoney;
        let userInfo = storageLocal().getItem("user-info");
        if (!userInfo.qtyList) {
          userInfo.qtyList = [];
        }
        //如果重复不添加
        if (
          !userInfo.qtyList.find(
            it =>
              it.label ===
              `${fiveForm.minSaleMoney}-${fiveForm.maxSaleMoney}pcs`
          ) &&
          fiveForm.minSaleMoney &&
          fiveForm.maxSaleMoney
        ) {
          userInfo.qtyList.push({
            label: `${fiveForm.minSaleMoney}-${fiveForm.maxSaleMoney}pcs`,
            value: JSON.stringify([
              fiveForm.minSaleMoney,
              fiveForm.maxSaleMoney
            ])
          });
        }

        storageLocal().setItem("user-info", userInfo);
        qtyList.value = userInfo.qtyList;
      }

      if (val !== false) {
        getDistributorSaleQTYRangeProduct(data).then(res => {
          if (res.code === 0 && res.data) {
            dialogFive.show = false;
            //更新绑定的值
            if (fiveForm.minSaleMoney && fiveForm.maxSaleMoney) {
              fiveForm.sale = `${fiveForm.minSaleMoney}-${fiveForm.maxSaleMoney}pcs`;
            }
            fiveDate.value = [res.data.start, res.data.end];
            let xData = [];
            let yData1 = [];
            let yData2 = [];
            res.data.saleQTY.forEach(it => {
              xData.push(it.productName);
              yData1.push(it.lastSale);
              yData2.push(it.currentSale);
            });
            nextTick(() => {
              paintOne(
                xData,
                yData1,
                yData2,
                "five-bar",
                t("analysis.fiveTitle"),
                -90,
                t("status.salesQuantity"),
                false,
                now - 1,
                now
              );
            });
          }
        });
      }
    } else {
      fiveForm.sale = qtyOption.value[0].value;
      dialogFive.show = false;
      fiveForm.minSaleMoney = "";
      fiveForm.maxSaleMoney = "";
    }
  });
};

//获取图六数据
const sixDate = ref("");
const sixTableData = ref([]);
const getSixData = async () => {
  form.value.validate(valid => {
    if (valid) {
      getDistributorProductSaleDataGather({
        distributorName: formData.value.distributorName,
        notAllYear: formData.value.notAllYear
      }).then(res => {
        if (res.code === 0 && res.data) {
          sixDate.value = [res.data.start, res.data.end];
          sixTableData.value = res.data.result;
        }
      });
    }
  });
};

//获取经销商
const distributorList = ref([]);
const getDistributor = async () => {
  const res = await getDistributorSearchCondition();
  if (res.code === 0 && res.data) {
    distributorList.value = [];
    Object.keys(res.data).forEach(it => {
      let children = [];
      res.data[it].map(op => {
        children.push({ label: op, value: op });
      });
      distributorList.value.push({
        label: it,
        value: it,
        options: children
      });
    });
    //按label首字母排序
    distributorList.value.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });
  }
};
//改变经销商
const handleChange = val => {
  if (val && val.length > 0) {
    formData.value.distributorName = val[1];
  }
};
//模糊查询经销商
const filterMethod = (node, key) => {
  const lowerCaseQuery = key.toLowerCase();
  const lowerCaseLabel = node.label.toLowerCase();
  return lowerCaseLabel.includes(lowerCaseQuery);
};

//切换全年还是同期
const changeData = val => {
  formData.value.notAllYear = val;
  getFourData(fourForm.sale);
  getFiveData(fiveForm.sale);
  getSixData();
};

//获取所有数据
const getData = () => {
  // getDistributor();
  getOneAndSevenData();
  getTwoData();
  getThreeData();
  getFourData(fourForm.sale);
  getFiveData(fiveForm.sale);
  getSixData();
};

//下载
const handleDown = () => {
  let newstr = document.getElementById("printContent").innerHTML;
  let oldstr = document.body.innerHTML;
  document.body.innerHTML = newstr;
  window.print();
  document.body.innerHTML = oldstr;
  return false;
};

const side = computed(() => {
  return window.scrollY;
});
onMounted(() => {
  getDistributor();
  // getData();
  window.addEventListener("setItemEvent", getData, true);
});

onUnmounted(() => {
  // 移除对 sessionStorage 的监听
  window.removeEventListener("setItemEvent", getData, true);
});
</script>

<style lang="scss" scoped>
.page-style {
  height: 100% !important;
}
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
.h4-style {
  margin-bottom: 10px;
}
table {
  text-align: center;
  border: 2px soild #000;
}
table tbody {
  display: block;
  height: 450px;
  overflow-y: scroll;
}
table thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
table thead {
  width: calc(100% - 1em);
}
.table-style {
  text-indent: 10px;
  border: 2px soild #000 !important;
  //   width: -webkit-fill-available;
  width: 80%;
  height: 450px;
  tr,
  th,
  td {
    border: 1px solid #ebeef5;
  }
  th {
    color: #909399;
  }
  td {
    color: #606266;
  }
}
// :deep(.el-table--fit) {
//   height: 100% !important;
// }
// :deep(.el-table__inner-wrapper) {
//   height: 100% !important;
// }
@media print {
  html,
  body {
    transform: scale(0.42);
    transform-origin: top left;
    zoom: 42%;
  }
  :deep(.el-table--fit) {
    height: 100% !important;
  }
  :deep(.el-table__inner-wrapper) {
    height: 100% !important;
  }
  .four-style {
    display: none;
  }
  .form-style,
  .h4-style {
    display: none;
  }
  .four-style {
    page-break-before: always;
  }
  #six-table {
    height: 100% !important;
  }
  table tbody {
    height: auto !important;
  }

  //   #printContent {
  //     width: 80% !important;
  //   }
  .six-style {
    //   page-break-before: always;
    // page-break-inside: avoid;
    padding-top: 100px !important;
  }
}
</style>
<style media="print">
@media print {
  html,
  body {
    /* zoom: 77%; */
  }
}
</style>
