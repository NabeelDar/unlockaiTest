<script setup>
import {ref} from 'vue';

const countries = ref([
  {name: 'Australia', code: 'AU'},
  {name: 'Brazil', code: 'BR'},
  {name: 'China', code: 'CN'},
  {name: 'Egypt', code: 'EG'},
  {name: 'France', code: 'FR'},
  {name: 'Germany', code: 'DE'},
  {name: 'India', code: 'IN'},
  {name: 'Japan', code: 'JP'},
  {name: 'Spain', code: 'ES'},
  {name: 'United States', code: 'US'}
]);
const selectedCountry = ref(null);
</script>

<template>
  <div class="card">
    <span class="text-900 text-xl font-bold mb-4 block">Create User</span>
    <div class="grid">
      <div class="col-12 lg:col-2">
        <div class="text-900 font-medium text-xl mb-3">Profile</div>
        <p class="m-0 p-0 text-600 line-height-3 mr-3">Odio euismod lacinia at quis risus sed vulputate odio.</p>
      </div>
      <div class="col-12 lg:col-10">
        <div class="grid formgrid p-fluid">
          <div class="field mb-4 col-12">
            <label class="font-medium text-900" for="nickname"> Nickname </label>
            <InputText id="nickname" type="text"/>
          </div>
          <div class="field mb-4 col-12">
            <label class="font-medium text-900" for="avatar"> Avatar </label>
            <FileUpload :maxFileSize="1000000" accept="image/*" chooseLabel="Upload Image" class="p-button-outlined p-button-plain" customUpload
                        mode="basic" name="avatar"></FileUpload>
          </div>
          <div class="field mb-4 col-12">
            <label class="font-medium text-900" for="bio"> Bio </label>
            <Textarea id="bio" :rows="5" autoResize type="text"></Textarea>
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label class="font-medium text-900" for="email"> Email </label>
            <InputText id="email" type="text"/>
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label class="font-medium text-900" for="country"> Country </label>
            <Dropdown v-model="selectedCountry" :filter="true" :options="countries" :showClear="true"
                      optionLabel="name" placeholder="Select a Country">
              <template #value="slotProps">
                <div v-if="slotProps.value" class="country-item country-item-value flex align-items-center">
                  <span :class="`mr-2 flag flag-${selectedCountry.code.toLowerCase()}`"
                        style="width: 18px; height: 12px"/>
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
              </template>
              <template #option="slotProps">
                <div class="country-item flex align-items-center">
                  <span :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                        style="width: 18px; height: 12px"/>
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label class="font-medium text-900" for="city"> City </label>
            <InputText id="city" type="text"/>
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label class="font-medium text-900" for="state"> State </label>
            <InputText id="state" type="text"/>
          </div>
          <div class="field mb-4 col-12">
            <label class="font-medium text-900" for="website"> Website </label>
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">www</span>
              <InputText id="website" type="text"/>
            </div>
          </div>
          <div class="col-12">
            <Button class="w-auto mt-3" label="Create User"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.country-item {
  img {
    width: 17px;
    margin-right: 0.5rem;
  }
}
</style>
