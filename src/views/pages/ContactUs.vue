<script setup>
import {ref} from 'vue';
import {useLayout} from '@/layout/composables/layout';

const name = ref('');
const email = ref('');
const message = ref('');
const content = ref([
  {icon: 'pi pi-fw pi-phone', title: 'Phone', info: '1 (833) 597-7538'},
  {icon: 'pi pi-fw pi-map-marker', title: 'Our Head Office', info: 'Churchill-laan 16 II, 1052 CD, Amsterdam'},
  {icon: 'pi pi-fw pi-print', title: 'Fax', info: '3 (833) 297-1548'}
]);
const {layoutConfig} = useLayout();
</script>

<template>
  <div class="grid card grid-nogutter" style="column-gap: 2rem; row-gap: 2rem">
    <div class="col-12">
      <p class="text-900 font-bold">Contact Us</p>
    </div>
    <div :style="{ backgroundImage: `url('/demo/images/contact/map-${layoutConfig.colorScheme.value === 'light' ? 'light' : 'dark'}.svg')` }"
         class="col-12 mt-3 h-20rem border-1 surface-border p-0 w-full bg-cover border-round"></div>
    <div class="col-12 mt-5">
      <div :style="{ columnGap: '2rem', rowGap: '2rem' }" class="grid grid-nogutter px-2 flex-column md:flex-row">
        <div v-for="(item, i) in content" :key="i"
             class="col flex flex-column justify-content-center text-center align-items-center border-1 surface-border py-5 px-4 border-round">
          <i :class="item.icon" class="pi pi-fw text-2xl text-primary"></i>
          <span class="text-900 font-bold mt-4 mb-1">{{ item.title }}</span>
          <span class="text-500">{{ item.info }}</span>
        </div>
      </div>
    </div>

    <div class="col-12 mt-5">
      <p class="text-900 font-bold">Send Us Email</p>
      <div :style="{ rowGap: '2rem', columnGap: '2rem' }"
           class="grid flex-column md:flex-row formgrid grid-nogutter mt-6">
        <div class="field col">
          <label class="block text-primary font-bold" for="name"> Name </label>
          <span :style="{ height: '3.5rem' }" class="p-input-icon-left w-full">
                        <i :style="{ left: '1.5rem' }" class="pi pi-user"></i>
                        <InputText id="name" v-model="name" :style="{ height: '3.5rem' }" class="w-full px-7 text-900 font-semibold"
                                   placeholder="Name" type="text"/>
                    </span>
        </div>

        <div class="field col">
          <label class="block text-primary font-bold" for="email"> Email Address </label>
          <span :style="{ height: '3.5rem' }" class="p-input-icon-left w-full">
                        <i :style="{ left: '1.5rem' }" class="pi pi-envelope"></i>
                        <InputText v-model="email" :style="{ height: '3.5rem' }" class="w-full px-7 text-900 font-semibold"
                                   placeholder="Email" type="text"/>
                    </span>
        </div>

        <div class="field col-12 flex flex-column">
          <label class="block text-primary font-bold" for="message"> Message </label>
          <Textarea id="message" v-model="message" :cols="30" :rows="5" class="text-900 font-semibold"/>
          <Button class="ml-auto mt-3 border-round" label="Send Message"></Button>
        </div>
      </div>
    </div>
  </div>
</template>
