import { defineStore } from "pinia";
import {
  store,
  debounce,
  ascending,
  getKeyList,
  filterTree,
  constantMenus,
  filterNoPermissionTree,
  formatFlatteningRoutes
} from "../utils";
import { useMultiTagsStoreHook } from "./multiTags";
import { storageLocal } from "@pureadmin/utils";
export { constantMenus } from "@/router";

export const usePermissionStore = defineStore({
  id: "pure-permission",
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
    // 缓存页面keepAlive
    cachePageList: []
  }),
  actions: {
    /** 组装整体路由生成的菜单,传入的routes是动态路由 */
    handleWholeMenus(routes) {
      // 先拿到所有静态路由再和动态路由合并做排序，过滤不显示的菜单，再过滤无权限的路由
      this.wholeMenus = filterNoPermissionTree(
        filterTree(ascending(this.constantMenus.concat(routes)))
      );
      storageLocal().setItem("wholeMenus", this.wholeMenus);
      let defaultTags = [
        {
          path: "/overview",
          meta: {
            title: "menus.pureHome",
            icon: "ep:home-filled"
          },
          name: "Overview",
          fullPath: "/overview"
        }
      ];
      let arr = [];
      if (routes.length > 0 && routes[0].path != "/overview") {
        defaultTags = defaultTags.concat(routes);
      }
      this.flatteningRoutes = formatFlatteningRoutes(
        this.constantMenus.concat(routes)
      );

      //设置标签页

      storageLocal().setItem("tagMenus", defaultTags);
    },
    cacheOperate({ mode, name }) {
      // console.log(mode, name, 666);

      const delIndex = this.cachePageList.findIndex(v => v === name);
      switch (mode) {
        case "refresh":
          this.cachePageList = this.cachePageList.filter(v => v !== name);
          break;
        case "add":
          this.cachePageList.push(name);
          break;
        case "delete":
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          break;
      }
      /** 监听缓存页面是否存在于标签页，不存在则删除 */
      debounce(() => {
        let cacheLength = this.cachePageList.length;
        const nameList = getKeyList(useMultiTagsStoreHook().multiTags, "name");
        while (cacheLength > 0) {
          nameList.findIndex(v => v === this.cachePageList[cacheLength - 1]) ===
            -1 &&
            this.cachePageList.splice(
              this.cachePageList.indexOf(this.cachePageList[cacheLength - 1]),
              1
            );
          cacheLength--;
        }
      })();
      // console.log(this.cachePageList, "缓存路由");
    },
    /** 清空缓存页面 */
    clearAllCachePage() {
      this.wholeMenus = [];
      this.cachePageList = [];
    },
    resetConstant(data) {
      this.constantMenus = data;
    }
  }
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
