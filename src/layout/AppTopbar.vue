<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import {useLayout} from '@/layout/composables/layout';
import AppSidebar from '@/layout/AppSidebar.vue';
import {usePrimeVue} from 'primevue/config';

const $primevue = usePrimeVue();

defineExpose({
  $primevue
});
const {isHorizontal, onMenuToggle, showConfigSidebar, showSidebar} = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector('.layout-topbar-menu');
  const topbarEl = document.querySelector('.layout-topbar-menu-button');

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
const onMenuButtonClick = () => {
  onMenuToggle();
};

const onConfigButtonClick = () => {
  showConfigSidebar();
};
const onSidebarButtonClick = () => {
  showSidebar();
};
</script>

<template>
  <div class="layout-topbar">
    <div class="topbar-start">
      <Button ref="menubutton" class="topbar-menubutton p-link p-trigger transition-duration-300" type="button"
              @click="onMenuButtonClick()">
        <i class="pi pi-bars"></i>
      </Button>
    </div>
    <div class="layout-topbar-menu-section">
      <AppSidebar></AppSidebar>
    </div>
    <div class="topbar-end">
      <ul class="topbar-menu">
        <li :class="isHorizontal ? 'topbar-search hidden' : 'topbar-search hidden sm:block'">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search"></i>
                        <InputText class="w-12rem sm:w-full" placeholder="Search" type="text"/>
                    </span>
        </li>
        <li :class="isHorizontal ? 'block topbar-item' : 'block sm:hidden topbar-item'">
          <a v-ripple
             v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }">
            <Button icon="pi pi-search" severity="secondary" text type="button"></Button>
          </a>
          <ul :class="'hidden topbar-menu active-topbar-menu p-3 w-15rem  z-5'" style="bottom: -5.8rem">
                        <span class="p-input-icon-left w-full">
                            <i class="pi pi-search"></i>
                            <InputText class="w-full" placeholder="Search" type="text"/>
                        </span>
          </ul>
        </li>
        <li class="topbar-item">
          <a v-ripple
             v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }" class="cursor-pointer">
            <img alt="Profile" class="border-round-xl" src="/layout/images/avatar-m-1.jpg"/>
          </a>
          <ul :class="'topbar-menu active-topbar-menu p-4 w-15rem z-5 hidden'">
            <li class="m-0 mb-3" role="menuitem">
              <a
                  v-styleclass="{ selector: '@grandparent', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }"
                  class="flex align-items-center hover:text-primary-500 transition-duration-200"
                  href="#"
              >
                <i class="pi pi-fw pi-lock mr-2"></i>
                <span>Privacy</span>
              </a>
            </li>
            <li class="m-0 mb-3" role="menuitem">
              <a
                  v-styleclass="{ selector: '@grandparent', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }"
                  class="flex align-items-center hover:text-primary-500 transition-duration-200"
                  href="#"
              >
                <i class="pi pi-fw pi-cog mr-2"></i>
                <span>Settings</span>
              </a>
            </li>
            <li class="m-0" role="menuitem">
              <a
                  v-styleclass="{ selector: '@grandparent', enterClass: 'hidden', enterActiveClass: 'px-scalein', leaveToClass: 'hidden', leaveActiveClass: 'px-fadeout', hideOnOutsideClick: 'true' }"
                  class="flex align-items-center hover:text-primary-500 transition-duration-200"
                  href="#"
              >
                <i class="pi pi-fw pi-sign-out mr-2"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <Button class="flex-shrink-0" icon="pi pi-cog" severity="secondary" text type="button"
                  @click="onConfigButtonClick()"></Button>
        </li>
        <li>
          <Button class="flex-shrink-0" icon="pi pi-arrow-left" severity="secondary" text type="button"
                  @click="onSidebarButtonClick()"></Button>
        </li>
      </ul>
    </div>
  </div>
</template>
