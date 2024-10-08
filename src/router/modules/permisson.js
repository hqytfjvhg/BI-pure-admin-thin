// import { storageLocal } from "@pureadmin/utils";
const Layout = () => import("@/layout/index.vue");
// const status = storageLocal().getItem("user-info")?.oneLevelPermission;
// 基础资料管理
export default {
  path: "/permission",
  component: Layout,
  name: "Permission",
  meta: {
    title: "menus.purePermission",
    icon: "ep:lollipop",
    rank: 5,
    roles: ["ROOT"]
  },
  children: [
    {
      path: "/permission/user",
      name: "PermissionUser",
      redirect: "/permission/user/index",
      // component: () => import("@/views/permission/user/index.vue"),
      meta: {
        title: "menus.purePermissionUser",
        roles: ["ROOT"]
      },
      children: [
        {
          path: "/permission/user/index",
          name: "userList",
          component: () => import("@/views/permission/user/userList.vue"),
          meta: {
            title: "menus.purePermissionUserList"
            // roles: ["admin", "common"]
          }
        },
        {
          path: "/permission/user/role",
          name: "role",
          component: () => import("@/views/permission/user/role.vue"),
          meta: {
            title: "menus.purePermissionUserRole"
            // roles: ["admin", "common"]
          }
        }
      ]
    },
    {
      path: "/permission/resource",
      name: "PermissionResource",
      redirect: "/permission/resource/index",
      // component: () => import("@/views/permission/resource/index.vue"),
      meta: {
        title: "menus.purePermissionResource",
        roles: ["ROOT"]
        // roles: ["admin", "common"]
      },
      children: [
        {
          path: "/permission/resource/index",
          name: "resourceList",
          component: () =>
            import("@/views/permission/resource/resourceList.vue"),
          meta: {
            title: "menus.purePermissionResourceList"
            // roles: ["admin", "common"]
          }
        },
        {
          path: "/permission/resource/levelFour",
          name: "levelFour",
          component: () => import("@/views/permission/resource/levelFour.vue"),
          meta: {
            title: "menus.purePermissionResourceLevelFour"
            // roles: ["admin", "common"]
          }
        }
      ]
    },
    {
      path: "/permission/distributors",
      name: "PermissionDistributors",
      redirect: "/permission/distributors/index",
      meta: {
        title: "menus.purePermissionDistributors"
      },
      children: [
        {
          path: "/permission/distributors/index",
          name: "distributorsList",
          component: () =>
            import("@/views/permission/distributors/distributorsList.vue"),
          meta: {
            title: "menus.purePermissionDistributorsList",
            roles: ["ROOT"]
            // roles: ["admin", "common"]
          }
        },
        {
          path: "/permission/distributors/budget",
          name: "budget",
          component: () => import("@/views/permission/distributors/budget.vue"),
          meta: {
            title: "menus.purePermissionDistributorsBudget",
            roles: ["ROOT"]
            // roles: ["admin", "common"]
          }
        },
        {
          path: "/permission/distributors/internal",
          name: "internal",
          component: () =>
            import("@/views/permission/distributors/internal.vue"),
          meta: {
            title: "menus.purePermissionDistributorsInternal",
            roles: ["ROOT"]
            // roles: ["admin", "common"]
          }
        }
        // {
        //   path: "/permission/distributors/sales",
        //   name: "PermissionDistributorsSales",
        //   component: () => import("@/views/permission/distributors/sales.vue"),
        //   meta: {
        //     title: "menus.purePermissionDistributorsSales",
        //     showLink: status ? status : -2
        //   }
        // }
      ]
    },
    {
      path: "/permission/product",
      name: "PermissionProduct",
      redirect: "/permission/product/index",
      meta: {
        title: "menus.purePermissionProduct",
        roles: ["ROOT"]
      },
      children: [
        {
          path: "/permission/product/index",
          name: "productList",
          component: () => import("@/views/permission/product/productList.vue"),
          meta: {
            title: "menus.purePermissionProductList"
          }
        },
        {
          path: "/permission/product/attribute",
          name: "attribute",
          component: () => import("@/views/permission/product/attribute.vue"),
          meta: {
            title: "menus.purePermissionProductAttribute"
          }
        },
        {
          path: "/permission/product/brand",
          name: "brandList",
          component: () => import("@/views/permission/brand/brandList.vue"),
          meta: {
            title: "menus.purePermissionBrandList"
          }
        }
      ]
    },
    {
      path: "/permission/currency/index",
      name: "currencyList",
      // redirect: "/permission/currency/index",
      meta: {
        title: "menus.purePermissionCurrency",
        roles: ["ROOT"]
      },
      component: () => import("@/views/permission/currency/currencyList.vue")

      // children: [
      //   {
      //     path: "/permission/brand/index",
      //     name: "PermissionLogBrand",
      //     meta: {
      //       title: "menus.purePermissionBrandList"
      //     }
      //   }
      // ]
    },
    {
      path: "/permission/log",
      name: "PermissionLog",
      redirect: "/permission/log/index",
      meta: {
        title: "menus.purePermissionLog",
        roles: ["ROOT"]
      },
      children: [
        {
          path: "/permission/log/index",
          name: "logList",
          component: () => import("@/views/permission/log/logList.vue"),
          meta: {
            title: "menus.purePermissionLogList"
          }
        }
      ]
    }
  ]
};
