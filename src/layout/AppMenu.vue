<script setup>
import {ref} from "vue";
import AppMenuItem from "./AppMenuItem.vue";
import {useLayout} from "@/layout/composables/layout";

const {layoutState} = useLayout();

const model = ref([
  {
    label: "",
    icon: "pi pi-home",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-home font-bold",
        iconColor: "#2898ff",
        to: "/",
      },
      {
        label: "Calendar",
        icon: "pi pi-fw pi-calendar font-bold",
        iconColor: "#3493fe",
        to: "/calendar",
      },
      {
        label: "Scheduler",
        icon: "pi pi-fw pi-pencil font-bold",
        iconColor: "#3c90fd",
        to: "/scheduler",
      },
      {
        label: "AI Auto Photo Editing",
        icon: "pi pi-fw pi-star font-bold",
        iconColor: "#4d89fb",
        to: "/ai-auto-photo-editor",
      },
      {
        label: "Image Generator",
        icon: "pi pi-fw pi-images font-bold",
        iconColor: "#5885fa",
        to: "/image-generator",
      },
      {
        label: "Speech to Text",
        icon: "pi pi-fw pi-file font-bold",
        iconColor: "#5e82f9",
        to: "/speech-to-text",
      },

      {
        label: "Voiceover",
        icon: "pi pi-fw pi-microphone font-bold",
        iconColor: "#697ef8",
        to: "/voiceover",
      },
      {
        label: "AI Chat",
        icon: "pi pi-fw pi-user font-bold",
        iconColor: "#707bf7",
        to: "/ai-chat",
      },
      {
        label: "Industry Experts",
        icon: "pi pi-fw pi-users font-bold",
        iconColor: "#7978f6",
        to: "/industry-experts",
      },
      {
        label: "Instagram Reporting",
        icon: "pi pi-fw pi-chart-bar font-bold",
        iconColor: "#8075f5",
        to: "/reporting",
      },
      {
        label: "Brands",
        icon: "pi pi-fw pi-shopping-bag font-bold",
        iconColor: "#8e6ff4",
        to: "/brands",
      },
      {
        label: "Plans",
        icon: "pi pi-fw pi-money-bill font-bold",
        iconColor: "#976cf3",
        to: "/plans",
      },
      {
        label: "My Documents",
        icon: "pi pi-fw pi-bookmark font-bold",
        iconColor: "#a068f2",
        to: "/my-documents",
      },
      {
        label: "Settings",
        icon: "pi pi-fw pi-cog font-bold",
        iconColor: "#ab64f1",
        to: "/settings",
      },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="i">
      <AppMenuItem :item="{ ...item, items: item.items.slice(0, 1) }"/>
      <h5 :class="{ 'minimized-text': !layoutState.sidebarActive.value }" class="pt-5 ml-5 text-gray-600">Tools</h5>
      <AppMenuItem :item="{ ...item, items: item.items.slice(1, -4) }"/>
      <h5 :class="{ 'minimized-text': !layoutState.sidebarActive.value }" class="pt-5 ml-5 text-gray-600">Profile</h5>
      <AppMenuItem :item="{ ...item, items: item.items.slice(-4) }"/>

      <li class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped>
.minimized-text {
  font-size: 0;
  opacity: 0;
}

</style>
