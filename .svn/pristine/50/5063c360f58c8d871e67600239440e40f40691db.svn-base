import { defineStore } from "pinia";
import {
  store,
  router,
  resetRouter,
  routerArrays,
  storageLocal
} from "../utils";
import { getLogin } from "@/api/user";
import { useMultiTagsStoreHook } from "./multiTags";
import { setToken, removeToken, userKey } from "@/utils/auth";
// import { usePermissionStoreHook } from "@/store/modules/permission";

export const useUserStore = defineStore({
  id: "pure-user",
  state: () => ({
    token: storageLocal().getItem(userKey)?.token ?? "",
    userId: storageLocal().getItem(userKey)?.userId ?? "",
    userName: storageLocal().getItem(userKey)?.userName ?? "",
    roleId: storageLocal().getItem(userKey)?.roleId ?? null,
    roleName: storageLocal().getItem(userKey)?.roleName ?? "",
    resourceInfoVoList:
      storageLocal().getItem(userKey)?.resourceInfoVoList ?? [],
    distributorList: storageLocal().getItem(userKey)?.distributorList ?? [],
    userInfo: storageLocal().getItem(userKey) ?? {},
    cnyRate: storageLocal().getItem(userKey)?.cnyRate ?? null,
    oneLevelPermission:
      storageLocal().getItem(userKey)?.oneLevelPermission ?? null,
    saleList: storageLocal().getItem(userKey)?.saleList ?? [] //分析页面的自定义回显数据
  }),
  actions: {
    /** 存储token */
    SET_TOKEN(token) {
      this.token = token;
    },
    SET_USERID(userId) {
      this.userId = userId;
    },
    /** 存储用户名 */
    SET_USERNAME(username) {
      this.username = username;
    },
    /** 存储昵称 */
    // SET_NICKNAME(nickname) {
    //   this.nickname = nickname;
    // },
    /** 存储角色 */
    SET_ROLEID(roleId) {
      this.roleId = roleId;
    },
    SET_ROLENAME(roleName) {
      this.roleName = roleName;
    },
    SET_RESOURCEINFOLIST(resourceInfoVoList) {
      this.resourceInfoVoList = resourceInfoVoList;
    },
    SET_DISTRIBUTORLIST(distributorList) {
      this.distributorList = distributorList;
    },
    SET_USERINFO(data) {
      this.userInfo = data;
    },
    SET_ONELEVELPERMISSION(oneLevelPermission) {
      this.oneLevelPermission = oneLevelPermission;
    },
    SET_CNYRATE(cnyRate) {
      this.cnyRate = cnyRate;
    },
    //自定义销售额
    SET_SALELIST(saleList) {
      this.saleList = saleList;
    },
    /** 存储是否勾选了登录页的免登录 */
    // SET_ISREMEMBERED(bool) {
    //   this.isRemembered = bool;
    // },
    // /** 设置登录页的免登录存储几天 */
    // SET_LOGINDAY(value) {
    //   this.loginDay = Number(value);
    // },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise((resolve, reject) => {
        getLogin(data)
          .then(data => {
            if (data?.success) {
              setToken(data.data);
            }

            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      // console.log("退出登录");
      this.username = "";
      this.roleId = "";
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      // usePermissionStoreHook().clearConstant();
      resetRouter();
      router.push("/login");
    }
    /** 刷新`token` */
    // async handRefreshToken(data) {
    //   return new Promise((resolve, reject) => {
    //     refreshTokenApi(data)
    //       .then(data => {
    //         if (data) {
    //           setToken(data.data);
    //           resolve(data);
    //         }
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
