// 响应式storage
// import type { App } from "vue";
import Storage from "responsive-storage";
// import { routerArrays } from "@/layout/types";
import { responsiveStorageNameSpace } from "@/config";
import { $t } from "@/plugins/i18n";

const { VITE_HIDE_HOME } = import.meta.env;

export const routerArrays =
  VITE_HIDE_HOME === "false"
    ? [
        {
          path: "/overview",
          meta: {
            title: $t("menus.pureHome"),
            icon: "ep:home-filled"
          }
        }
      ]
    : [];

export const injectResponsiveStorage = (app, config) => {
  const nameSpace = responsiveStorageNameSpace();
  const configObj = Object.assign(
    {
      // TODO
      // 国际化 默认中文zh
      locale: Storage.getData("locale", nameSpace) ?? {
        locale: config.Locale ?? "zh"
      },
      // layout模式以及主题
      layout: Storage.getData("layout", nameSpace) ?? {
        layout: config.Layout ?? "vertical",
        theme: config.Theme ?? "light",
        darkMode: config.DarkMode ?? false,
        sidebarStatus: config.SidebarStatus ?? true,
        epThemeColor: config.EpThemeColor ?? "#409EFF",
        themeColor: config.Theme ?? "light", // 主题色（对应系统配置中的主题色，与theme不同的是它不会受到浅色、深色整体风格切换的影响，只会在手动点击主题色时改变）
        overallStyle: config.OverallStyle ?? "light" // 整体风格（浅色：light、深色：dark、自动：system）
      },
      // 系统配置-界面显示
      configure: Storage.getData("configure", nameSpace) ?? {
        grey: config.Grey ?? false,
        weak: config.Weak ?? false,
        hideTabs: config.HideTabs ?? false,
        hideFooter: config.HideFooter ?? true,
        showLogo: config.ShowLogo ?? true,
        showModel: config.ShowModel ?? "smart",
        multiTagsCache: config.MultiTagsCache ?? true,
        stretch: config.Stretch ?? false
      }
    },

    config.MultiTagsCache
      ? {
          // 默认显示顶级菜单tag
          tags: Storage.getData("tags", nameSpace) ?? routerArrays
        }
      : {}
  );
  app.use(Storage, { nameSpace, memory: configObj });
};
