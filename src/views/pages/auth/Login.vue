<script setup>
import {useRouter} from 'vue-router';
import AppConfig from '@/layout/AppConfig.vue';

const router = useRouter();

const navigateToDashboard = () => {
  router.push('/');
};
</script>
<template>
  <div class="surface-0">
    <div class="flex align-items-center justify-content-between flex-column h-screen">
      <div
          class="flex flex-column align-items-center justify-content-center w-full md:w-4 h-full text-center py-6 px-4">
        <a class="mb-6" style="cursor: pointer" @click="navigateToDashboard">
          <svg fill="none" height="56" viewBox="0 0 17 20" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 0H6.00019V3.82345L17 1.66667V6.66667L6.00019 8.82345V10.4901L17 8.33333V13.3333L6.00019 15.4901V20H0V0Z"
                fill="url(#paint0_linear)"/>
            <defs>
              <linearGradient id="paint0_linear" gradientUnits="userSpaceOnUse" x1="3.33335" x2="8.49995" y1="3.08442e-08"
                              y2="20">
                <stop stop-color="var(--primary-400)"/>
                <stop offset="1" stop-color="var(--primary-700)"/>
              </linearGradient>
            </defs>
          </svg>
        </a>
        <div class="flex flex-column">
                    <span class="p-input-icon-left w-full mb-4">
                        <i class="pi pi-envelope"></i>
                        <InputText id="email" class="w-full md:w-25rem text-color-secondary surface-50 border-200"
                                   placeholder="Email"
                                   type="text"/>
                    </span>
          <span class="p-input-icon-left w-full mb-4">
                        <i class="pi pi-lock"></i>
                        <InputText id="password" class="w-full md:w-25rem text-color-secondary surface-50 border-200"
                                   placeholder="Password"
                                   type="password"/>
                    </span>

          <Button class="w-full mb-4" label="Sign Up" @click="navigateToDashboard"></Button>
          <a class="font-medium text-sm text-300" href="#">forget password?</a>
          <p class="font-medium text-400 m-0 mt-6">Don’t you have an account, <a class="text-primary cursor-pointer"
                                                                                 href="#">sign
            up</a></p>
        </div>
      </div>
      <div class="flex flex-wrap align-items-center pb-8 px-4">
        <h4 class="m-0 mr-5" style="line-height: 22px">freya</h4>
        <h6 class="m-0 font-medium text-300" style="line-height: 17px">Copyright Ⓒ PrimeTek Informatics</h6>
      </div>
    </div>
  </div>

  <AppConfig simple/>
</template>
