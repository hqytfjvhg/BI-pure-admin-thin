<script setup lang="js">
import { useNav } from "@/layout/hooks/useNav";
import LaySearch from "../lay-search/index.vue";
import LayNotice from "../lay-notice/index.vue";
import LayNavMix from "../lay-sidebar/NavMix.vue";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import LaySidebarFullScreen from "../lay-sidebar/components/SidebarFullScreen.vue";
import LaySidebarBreadCrumb from "../lay-sidebar/components/SidebarBreadCrumb.vue";
import LaySidebarTopCollapse from "../lay-sidebar/components/SidebarTopCollapse.vue";
import LaySidebarRefresh from "../lay-sidebar/components/SidebarRefresh.vue";

import GlobalizationIcon from "@/assets/svg/globalization.svg?component";
import AccountSettingsIcon from "@iconify-icons/ri/user-settings-line";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import Setting from "@iconify-icons/ri/settings-3-line";
import Check from "@iconify-icons/ep/check";

import { reactive } from "vue";
import Dialog from "@/components/dialog/changePass.vue";

const {
  layout,
  device,
  logout,
  onPanel,
  pureApp,
  username,
  userAvatar,
  avatarsStyle,
  toggleSideBar,
  getDropdownItemStyle,
  getDropdownItemClass
} = useNav();
const { t, locale, translationCh, translationEn, translationHk } =
  useTranslationLang();
const changeLanguage = type => {
  type == "zh"
    ? translationCh()
    : type == "hk"
      ? translationHk()
      : translationEn();
  sessionStorage.setItem("languageShow", type);
  window.location.reload();
};

const dialog = reactive({
  show: false
});
const changePass = () => {
  dialog.show = true;
};
</script>

<template>
  <div class="navbar bg-[#fff] shadow-sm shadow-[rgba(0,21,41,0.08)]">
    <LaySidebarTopCollapse
      v-if="device === 'mobile'"
      class="hamburger-container"
      :is-active="pureApp.sidebar.opened"
      @toggleClick="toggleSideBar"
    />

    <LaySidebarBreadCrumb
      v-if="layout !== 'mix' && device !== 'mobile'"
      class="breadcrumb-container"
    />

    <LayNavMix v-if="layout === 'mix'" />

    <div v-if="layout === 'vertical'" class="vertical-header-right">
      <!-- 菜单搜索 -->
      <!-- <LaySearch
        id="header-search"
        style="width: 40px;"
      /> -->
      <!-- 刷新 -->
      <LaySidebarRefresh id="header-refresh" />
      <!-- 国际化 -->
      <el-dropdown id="header-translation" trigger="click">
        <GlobalizationIcon
          class="navbar-bg-hover w-[40px] h-[48px] p-[11px] cursor-pointer outline-none"
        />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <!-- <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'zh')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'zh')]"
              @click="translationCh"
            > -->
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'zh')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'zh')]"
              @click="changeLanguage('zh')"
            >
              <IconifyIconOffline
                v-show="locale === 'zh'"
                class="check-zh"
                :icon="Check"
              />
              简体中文
            </el-dropdown-item>
            <!-- 中文繁體 -->
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'hk')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'hk')]"
              @click="changeLanguage('hk')"
            >
              <span v-show="locale === 'hk'" class="check-en">
                <IconifyIconOffline :icon="Check" />
              </span>
              繁體中文
            </el-dropdown-item>
            <!-- <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'en')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]"
              @click="translationEn"
            > -->
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'en')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]"
              @click="changeLanguage('en')"
            >
              <span v-show="locale === 'en'" class="check-en">
                <IconifyIconOffline :icon="Check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 全屏 -->
      <!-- <LaySidebarFullScreen id="full-screen" /> -->
      <!-- 消息通知 -->
      <!-- <LayNotice id="header-notice" /> -->

      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <span class="select-none el-dropdown-link navbar-bg-hover">
          <img :src="userAvatar" :style="avatarsStyle" />
          <p v-if="username" class="dark:text-white">{{ username }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="changePass">
              <IconifyIconOffline :icon="Check" style="margin: 5px" />
              {{ t("status.pass") }}
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <IconifyIconOffline
                :icon="LogoutCircleRLine"
                style="margin: 5px"
              />
              {{ t("status.logout") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span
        class="set-icon navbar-bg-hover"
        title="打开系统配置"
        @click="onPanel"
      >
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>

    <!-- 修改密码弹窗 -->
    <Dialog :dialog="dialog" v-if="dialog.show" />
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;
  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 48px;
    cursor: pointer;
  }

  .vertical-header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 280px;
    height: 48px;
    color: #000000d9;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 48px;
      padding: 10px;
      color: #000000d9;
      cursor: pointer;

      p {
        font-size: 14px;
      }

      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }
  }

  .breadcrumb-container {
    float: left;
    margin-left: 16px;
  }
}
.translation {
  ::v-deep(.el-dropdown-menu__item) {
    // padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}

.logout {
  min-width: 120px;
  ::v-deep(.el-dropdown-menu__item) {
    display: inline-flex;
    //flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
