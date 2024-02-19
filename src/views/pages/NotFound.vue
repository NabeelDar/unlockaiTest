<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();

const navigateToDashboard = () => {
  router.push('/');
};
</script>

<template>
  <div>
    <div class="flex align-items-center py-0 px-3 w-full z-2 px-5"
         style="height: 62px; box-shadow: 0 10px 40px 0 rgb(41 50 65 / 6%); background: var(--surface-card)">
      <a id="logolink" @click="navigateToDashboard">
      </a>
    </div>
    <div class="flex flex-column justify-content-center align-items-center px-4" style="min-height: calc(100vh - 62px)">
      <div class="flex flex-column justify-content-center align-items-center text-center">
        <img alt="freya-layout" src="/demo/images/pages/asset-404.svg"
             style="margin-bottom: -150px; width: 332px; height: 271px"/>
        <span class="" style="font-size: 140px; line-height: 171px">404</span>
        <span class="block text-300 text-center font-medium">Looks like you are lost.</span>
        <Button class="mt-4 font-medium" label="Go back to home" size="large" style="" type="button"
                @click="navigateToDashboard"></Button>
      </div>
    </div>
  </div>
</template>
