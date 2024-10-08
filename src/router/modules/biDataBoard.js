import { KeepAlive } from "vue";

const Layout = () => import("@/layout/index.vue");
//销售看板
export default {
  path: "/salesProduct",
  component: Layout,
  name: "salesProduct",
  meta: {
    title: "menus.salesProduct",
    icon: "ep:lollipop",
    rank: 3
  },

  children: [
    // 图一
    // {
    //   path: "/salesBoard/saleChartsOne",
    //   name: "saleChartsOne",
    //   component: () => import("@/views/biDataBoard/saleChartsOne.vue"),
    //   meta: {
    //     title: "menus.saleChartsOne"
    //     // roles: ["admin", "common"]
    //   }
    // },
    // 图二
    {
      path: "/salesBoard/saleChartsTwo",
      name: "saleChartsTwo",
      component: () => import("@/views/biDataBoard/saleChartsTwo.vue"),
      meta: {
        title: "menus.saleChartsTwo",
        saveSrollTop: true,
        KeepAlive: true

        // roles: ["admin", "common"]
      }
    },
    //图三
    {
      path: "/salesBoard/saleChartsThree",
      name: "saleChartsThree",
      component: () => import("@/views/biDataBoard/saleChartsThree.vue"),
      meta: {
        title: "menus.saleChartsThree",
        saveSrollTop: true,
        KeepAlive: true
        // roles: ["admin", "common"]
      }
    },
    //图六
    {
      path: "/salesBoard/saleChartsSix",
      name: "saleChartsSix",
      component: () => import("@/views/biDataBoard/saleChartsSix.vue"),
      meta: {
        title: "menus.saleChartsSix",
        KeepAlive: true
        // roles: ["admin", "common"]
      }
    },
    //图四
    {
      path: "/salesBoard/saleChartsFour",
      name: "saleChartsFour",
      component: () => import("@/views/biDataBoard/saleChartsFour.vue"),
      meta: {
        title: "menus.saleChartsFour",
        saveSrollTop: true,
        KeepAlive: true
        // roles: ["admin", "common"]
      }
    }
  ]
};
