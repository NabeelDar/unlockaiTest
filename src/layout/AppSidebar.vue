<script setup>
import AppMenu from "./AppMenu.vue";
import {useLayout} from "@/layout/composables/layout";
import {useRouter} from "vue-router";

const router = useRouter();

const navigateToDashboard = () => {
  router.push("/");
};

const {layoutState} = useLayout();

let timeout = null;

const onMouseEnter = () => {
  if (!layoutState.anchored.value) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    layoutState.sidebarActive.value = true;
  }
};

const onMouseLeave = () => {
  if (!layoutState.anchored.value) {
    if (!timeout) {
      timeout = setTimeout(() => (layoutState.sidebarActive.value = false), 300);
    }
  }
};

const anchor = () => {
  layoutState.anchored.value = !layoutState.anchored.value;
};
</script>

<template>
  <div class="layout-sidebar" @mouseenter="onMouseEnter()" @mouseleave="onMouseLeave()">
    <div class="sidebar-header flex flex-column">
      <button
          class="layout-sidebar-anchor p-link align-self-end"
          type="button"
          @click="anchor()"
      ></button>
      <div class="flex flex-row items-center gap-2">
        <a class="app-logo cursor-pointer align-self-center" @click="navigateToDashboard">
          <img
              alt="logo"
              class="max-w-full max-h-16 object-contain"
              src="../assets/custom/smallLogo.png"
          /> </a>
        <h2 :class="{ 'minimized-text': !layoutState.sidebarActive.value }" class="gradient-text text-center">
          UnlockAI</h2></div>
    </div>

    <div ref="menuContainer" class="layout-menu-container">
      <AppMenu></AppMenu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gradient-text {
  background: linear-gradient(to right, rgba(40, 152, 255, 1) 0%, rgba(171, 100, 241, 1) 100%);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
  transition: opacity 0.3s ease, font-size 0.3s ease;
}

.minimized-text {
  font-size: 0;
  opacity: 0;
}
</style>
