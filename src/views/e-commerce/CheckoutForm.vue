<script setup>
import {onMounted, ref} from 'vue';
import {CountryService} from '@/service/CountryService';

const value = ref('');
const quantities = ref([1, 1, 1]);
const checked = ref(true);
const checked2 = ref(true);
const selectedCountry = ref(null);
const countries = ref([]);
const countryService = new CountryService();

onMounted(() => {
  countryService.getCountries().then((data) => (countries.value = data));
});
</script>

<template>
  <div class="card">
    <div class="grid grid-nogutter">
      <div class="col-12 px-4 mt-4 md:mt-6 md:px-6">
        <span class="text-900 block font-bold text-xl">Checkout</span>
      </div>
      <div class="col-12 lg:col-6 h-full px-4 py-4 md:px-6">
        <ul class="flex list-none flex-wrap p-0 mb-6">
          <li class="flex align-items-center text-primary mr-2">Cart <i
              class="pi pi-chevron-right text-500 text-xs ml-2"></i></li>
          <li class="flex align-items-center text-500 mr-2">Information<i
              class="pi pi-chevron-right text-500 text-xs ml-2"></i></li>
          <li class="flex align-items-center text-500 mr-2">Shipping<i
              class="pi pi-chevron-right text-500 text-xs ml-2"></i></li>
          <li class="flex align-items-center text-500 mr-2">Payment</li>
        </ul>
        <div class="grid formgrid">
          <div class="col-12 field mb-6">
            <span class="text-900 text-2xl block font-medium mb-5">Contact Information</span>
            <input id="email" class="p-inputtext w-full mb-4" placeholder="Email" type="text"/>
            <div class="field-checkbox">
              <Checkbox v-model="checked" binary inputId="checkbox-1" name="checkbox-1"></Checkbox>
              <label for="checkbox-1">Email me with news and offers</label>
            </div>
          </div>
          <div class="col-12 field mb-4">
            <span class="text-900 text-2xl block font-medium mb-5">Shipping</span>
            <Dropdown v-model="selectedCountry" :options="countries" class="w-full" optionLabel="name"
                      placeholder="Country / Region" showClear></Dropdown>
          </div>
          <div class="col-12 lg:col-6 field mb-4">
            <input id="name" class="p-inputtext w-full" placeholder="Name" type="text"/>
          </div>
          <div class="col-12 lg:col-6 field mb-4">
            <input id="lastname" class="p-inputtext w-full" placeholder="Last Name" type="text"/>
          </div>
          <div class="col-12 field mb-4">
            <input id="address" class="p-inputtext w-full" placeholder="Address" type="text"/>
          </div>
          <div class="col-12 field mb-4">
            <input id="address2" class="p-inputtext w-full" placeholder="Apartment, suite, etc" type="text"/>
          </div>
          <div class="col-12 lg:col-6 field mb-4">
            <input id="pc" class="p-inputtext w-full" placeholder="Postal Code" type="text"/>
          </div>
          <div class="col-12 lg:col-6 field mb-4">
            <input id="city" class="p-inputtext w-full" placeholder="City" type="text"/>
          </div>
          <div class="col-12 lg:col-6 field mb-4">
            <div class="field-checkbox">
              <Checkbox v-model="checked2" binary inputId="checkbox-2" name="checkbox-2"></Checkbox>
              <label for="checkbox-2">Save for next purchase</label>
            </div>
          </div>
          <div
              class="col-12 flex flex-column lg:flex-row justify-content-center align-items-center lg:justify-content-end my-6">
            <Button class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4" icon="pi pi-fw pi-arrow-left"
                    label="Return to Cart" outlined severity="secondary"></Button>
            <Button class="w-full lg:w-auto flex-order-1 lg:flex-order-2" icon="pi pi-fw pi-check"
                    label="Continue to Shipping"></Button>
          </div>
        </div>
      </div>
      <div class="col-12 lg:col-6 px-4 py-4 md:px-6">
        <div class="pb-3 surface-border">
          <span class="text-900 font-medium text-xl">Your Cart</span>
        </div>
        <div class="flex flex-column lg:flex-row flex-wrap lg:align-items-center py-2 mt-3 surface-border">
          <img alt="product" class="w-8rem h-8rem flex-shrink-0 mb-3" src="/demo/images/ecommerce/shop/shop-1.png"/>
          <div class="flex-auto lg:ml-3">
            <div class="flex align-items-center justify-content-between mb-3">
              <span class="text-900 font-bold">Product Name</span>
              <span class="text-900 font-bold">$123.00</span>
            </div>
            <div class="text-600 text-sm mb-3">Black | Large</div>
            <div class="flex flex-auto justify-content-between align-items-center">
              <InputNumber
                  v-model="quantities[0]"
                  :min="0"
                  buttonLayout="horizontal"
                  class="border-1 surface-border border-round"
                  decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                  decrementButtonIcon="pi pi-minus"
                  incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                  incrementButtonIcon="pi pi-plus"
                  inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                  showButtons
              ></InputNumber>
              <Button icon="pi pi-trash" rounded text></Button>
            </div>
          </div>
        </div>
        <div class="py-2 mt-3 surface-border">
          <div class="p-inputgroup mb-3">
            <InputText v-model="value" class="w-full" placeholder="Promo code" type="text"/>
            <Button :disabled="!value" label="Apply" type="button"></Button>
          </div>
        </div>
        <div class="py-2 mt-3">
          <div class="flex justify-content-between align-items-center mb-3">
            <span class="text-900 font-medium">Subtotal</span>
            <span class="text-900">$123.00</span>
          </div>
          <div class="flex justify-content-between align-items-center mb-3">
            <span class="text-900 font-medium">Shipping</span>
            <span class="text-primary font-bold">Free</span>
          </div>
          <div class="flex justify-content-between align-items-center mb-3">
            <span class="text-900 font-bold">Total</span>
            <span class="text-900 font-medium text-xl">$123.00</span>
          </div>
        </div>
        <div class="py-2 mt-3 bg-yellow-100 flex align-items-center justify-content-center border-round">
          <img alt="Country Flag" class="mr-2" src="/demo/images/ecommerce/shop/flag.png"/>
          <span class="text-black-alpha-90 font-medium">No additional duties or taxes.</span>
        </div>
      </div>
    </div>
  </div>
</template>
