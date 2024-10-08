import { storageLocal } from "@pureadmin/utils";
const Layout = () => import("@/layout/index.vue");
const status = storageLocal().getItem("user-info")?.america;

//销售看板
export default {
  path: "/salesDistributor",
  component: Layout,
  name: "salesDistributor",
  meta: {
    title: "menus.salesDistributor",
    icon: "ep:lollipop",
    rank: 2
  },

  children: [
    // 图一
    {
      path: "/salesBoard/saleChartsOne",
      name: "saleChartsOne",
      component: () => import("@/views/biDataBoard/saleChartsOne.vue"),
      meta: {
        title: "menus.saleChartsOne",
        KeepAlive: true
        // roles: ["admin", "common"]
      }
    },
    {
      path: "/salesBoard/saleChartsFive",
      name: "saleChartsFive",
      component: () => import("@/views/biDataBoard/saleChartsFive.vue"),
      meta: {
        title: "menus.saleChartsFive",
        KeepAlive: true
        // roles: ["admin", "common"]
      }
    },
    {
      path: "/salesBoard/saleUSA",
      name: "saleUSA",
      component: () => import("@/views/biDataBoard/saleUSA.vue"),
      meta: {
        title: "menus.saleUSA",
        showLink: status ? status : -2,
        KeepAlive: true
        // roles: ["admin", "common"]
      }
    },
    {
      path: "/salesBoard/saleAnalysis",
      name: "saleAnalysis",
      component: () => import("@/views/biDataBoard/saleAnalysis.vue"),
      meta: {
        title: "menus.saleAnalysis",
        KeepAlive: true
        // showLink: status ? status : -2
        // roles: ["admin", "common"]
      }
    }
  ]
};
