import { defineFakeRoute } from "vite-plugin-fake-server/client";

const systemManagementRouter = {
  path: "/system",
  meta: {
    icon: "ri:settings-3-line",
    title: "menus.pureSysManagement",
    rank: 12
  },
  children: [
    {
      path: "/system/user/index",
      name: "SystemUser",
      meta: {
        icon: "ri:ROOT-line",
        title: "menus.pureUser",
        roles: ["ROOT"]
      }
    },
    {
      path: "/system/role/index",
      name: "SystemRole",
      meta: {
        icon: "ri:ROOT-fill",
        title: "menus.pureRole",
        roles: ["ROOT"]
      }
    },
    {
      path: "/system/menu/index",
      name: "SystemMenu",
      meta: {
        icon: "ep:menu",
        title: "menus.pureSystemMenu",
        roles: ["ROOT"]
      }
    },
    {
      path: "/system/dept/index",
      name: "SystemDept",
      meta: {
        icon: "ri:git-branch-line",
        title: "menus.pureDept",
        roles: ["ROOT"]
      }
    }
  ]
};

export default defineFakeRoute([
  {
    url: "/get-async-routes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [systemManagementRouter]
      };
    }
  }
]);
