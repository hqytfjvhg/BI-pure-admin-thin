// import { $t } from "@/plugins/i18n";
import { storageLocal } from "@pureadmin/utils";

const Layout = () => import("@/layout/index.vue");

const status = storageLocal().getItem("user-info")?.oneLevelPermission;
export default {
  path: "/dataBoard",
  component: Layout,
  name: "DataBoard",
  meta: {
    title: "menus.dataBoard",
    icon: "ep:lollipop",
    rank: 4
  },

  children: [
    // 应收账款
    {
      path: "/dataBoard/receivables",
      name: "receivables",
      component: () => import("@/views/dataBoard/receivables.vue"),
      meta: {
        title: "menus.receivables",
        showLink: status ? status : -2
        // showLink: -1
        // roles: ["admin", "common"]
      }
    },
    // 销售额
    {
      path: "/dataBoard/saleroom",
      name: "saleroom",
      component: () => import("@/views/dataBoard/saleroom.vue"),
      meta: {
        title: "menus.saleroom",
        showLink: status ? status : -2
        // showLink: -1
        // roles: ["admin", "common"]
      }
    },
    {
      path: "/permission/distributors/sales",
      name: "sales",
      component: () => import("@/views/permission/distributors/sales.vue"),
      meta: {
        title: "menus.purePermissionDistributorsSales",
        showLink: status ? status : -2
      }
    },
    {
      path: "/dataBoard/productCost",
      name: "productCost",
      component: () => import("@/views/dataBoard/productCost.vue"),
      meta: {
        title: "menus.productCost",
        showLink: status ? status : -2
      }
    },
    {
      path: "/dataBoard/newProduct",
      name: "newProduct",
      component: () => import("@/views/dataBoard/newProduct.vue"),
      meta: {
        title: "menus.newProduct",
        showLink: status ? status : -2
      }
    },
    {
      path: "/dataBoard/monthlyData",
      name: "monthlyData",
      component: () => import("@/views/dataBoard/monthlyData.vue"),
      meta: {
        title: "menus.monthlyData",
        showLink: status ? status : -2
      }
    },
    {
      path: "/dataBoard/progressProduct",
      name: "progressProduct",
      component: () => import("@/views/dataBoard/progressProduct.vue"),
      meta: {
        title: "menus.progressProduct",
        showLink: status ? status : -2
      }
    }
  ]
};
