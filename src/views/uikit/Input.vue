<script setup>
import {onMounted, ref} from 'vue';
import {CountryService} from '@/service/CountryService';

const floatValue = ref(null);
const autoValue = ref(null);
const selectedAutoValue = ref(null);
const autoFilteredValue = ref([]);
const calendarValue = ref(null);
const inputNumberValue = ref(null);
const chipsValue = ref(null);
const sliderValue = ref(50);
const ratingValue = ref(null);
const colorValue = ref('#1976D2');
const radioValue = ref(null);
const checkboxValue = ref([]);
const switchValue = ref(false);
const listboxValues = ref([
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
]);
const listboxValue = ref(null);
const dropdownValues = ref([
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
]);
const dropdownValue = ref(null);
const multiselectValues = ref([
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

const multiselectValue = ref(null);
const toggleValue = ref(false);
const selectButtonValue1 = ref(null);
const selectButtonValues1 = ref([{name: 'Option 1'}, {name: 'Option 2'}, {name: 'Option 3'}]);
const selectButtonValue2 = ref(null);
const selectButtonValues2 = ref([{name: 'Option 1'}, {name: 'Option 2'}, {name: 'Option 3'}]);
const knobValue = ref(50);
const inputGroupValue = ref(false);
const countryService = new CountryService();

onMounted(() => {
  countryService.getCountries().then((data) => (autoValue.value = data));
});

const searchCountry = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      autoFilteredValue.value = [...autoValue.value];
    } else {
      autoFilteredValue.value = autoValue.value.filter((country) => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};
</script>

<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-6">
      <div class="card">
        <h5>InputText</h5>
        <div class="grid formgrid">
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <InputText placeholder="Default" type="text"></InputText>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <InputText :disabled="true" placeholder="Disabled" type="text"></InputText>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <InputText class="p-invalid" placeholder="Invalid" type="text"/>
          </div>
        </div>

        <h5>Icons</h5>
        <div class="grid formgrid">
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                        <span class="p-input-icon-left">
                            <i class="pi pi-user"/>
                            <InputText placeholder="Username" type="text"/>
                        </span>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                        <span class="p-input-icon-right">
                            <InputText placeholder="Search" type="text"/>
                            <i class="pi pi-search"/>
                        </span>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
                        <span class="p-input-icon-left p-input-icon-right">
                            <i class="pi pi-user"/>
                            <InputText placeholder="Search" type="text"/>
                            <i class="pi pi-search"/>
                        </span>
          </div>
        </div>

        <h5>Float Label</h5>
        <span class="p-float-label">
                    <InputText id="username" v-model="floatValue" type="text"/>
                    <label for="username">Username</label>
                </span>

        <h5>Textarea</h5>
        <Textarea :autoResize="true" cols="30" placeholder="Your Message" rows="5"/>

        <h5>AutoComplete</h5>
        <AutoComplete id="dd" v-model="selectedAutoValue" :dropdown="true" :multiple="true"
                      :suggestions="autoFilteredValue" field="name" @complete="searchCountry($event)"/>

        <h5>Calendar</h5>
        <Calendar v-model="calendarValue" :showButtonBar="true" :showIcon="true"></Calendar>

        <h5>Spinner</h5>
        <InputNumber v-model="inputNumberValue" mode="decimal" showButtons></InputNumber>

        <h5>Chips</h5>
        <Chips v-model="chipsValue"/>
      </div>

      <div class="card">
        <div class="grid">
          <div class="col-12">
            <h5>Slider</h5>
            <InputText v-model.number="sliderValue"/>
            <Slider v-model="sliderValue"/>
          </div>
          <div class="col-12 md:col-6">
            <h5>Rating</h5>
            <Rating v-model="ratingValue"/>
          </div>
          <div class="col-12 md:col-6">
            <h5>ColorPicker</h5>
            <ColorPicker v-model="colorValue" style="width: 2rem"/>
          </div>
          <div class="col-12">
            <h5>Knob</h5>
            <Knob v-model="knobValue" :max="50" :min="-50" :step="10" valueTemplate="{value}%"/>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="card">
        <h5>RadioButton</h5>
        <div class="grid">
          <div class="col-12 md:col-4">
            <div class="field-radiobutton mb-0">
              <RadioButton id="option1" v-model="radioValue" name="option" value="Chicago"/>
              <label for="option1">Chicago</label>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="field-radiobutton mb-0">
              <RadioButton id="option2" v-model="radioValue" name="option" value="Los Angeles"/>
              <label for="option2">Los Angeles</label>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="field-radiobutton mb-0">
              <RadioButton id="option3" v-model="radioValue" name="option" value="New York"/>
              <label for="option3">New York</label>
            </div>
          </div>
        </div>

        <h5>Checkbox</h5>
        <div class="grid">
          <div class="col-12 md:col-4">
            <div class="field-checkbox mb-0">
              <Checkbox id="checkOption1" v-model="checkboxValue" name="option" value="Chicago"/>
              <label for="checkOption1">Chicago</label>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="field-checkbox mb-0">
              <Checkbox id="checkOption2" v-model="checkboxValue" name="option" value="Los Angeles"/>
              <label for="checkOption2">Los Angeles</label>
            </div>
          </div>
          <div class="col-12 md:col-4">
            <div class="field-checkbox mb-0">
              <Checkbox id="checkOption3" v-model="checkboxValue" name="option" value="New York"/>
              <label for="checkOption3">New York</label>
            </div>
          </div>
        </div>

        <h5>Input Switch</h5>
        <InputSwitch v-model="switchValue"/>
      </div>

      <div class="card">
        <h5>Listbox</h5>
        <Listbox v-model="listboxValue" :filter="true" :options="listboxValues" optionLabel="name"/>

        <h5>Dropdown</h5>
        <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select"/>

        <h5>MultiSelect</h5>
        <MultiSelect v-model="multiselectValue" :filter="true" :options="multiselectValues"
                     optionLabel="name" placeholder="Select Countries">
          <template #value="slotProps">
            <div v-for="option of slotProps.value"
                 :key="option.code" class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2">
              <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width: 18px; height: 12px"/>
              <div>{{ option.name }}</div>
            </div>
            <template v-if="!slotProps.value || slotProps.value.length === 0">
              <div>Select Countries</div>
            </template>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <span :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()" style="width: 18px; height: 12px"/>
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </MultiSelect>
      </div>

      <div class="card">
        <h5>ToggleButton</h5>
        <ToggleButton v-model="toggleValue" :style="{ width: '10em' }" offLabel="No" onLabel="Yes"/>

        <h5>SelectButton</h5>
        <SelectButton v-model="selectButtonValue1" :options="selectButtonValues1" optionLabel="name"/>

        <h5>SelectButton - Multiple</h5>
        <SelectButton v-model="selectButtonValue2" :multiple="true" :options="selectButtonValues2" optionLabel="name"/>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Input Groups</h5>
        <div class="grid p-fluid">
          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-user"></i>
                            </span>
              <InputText placeholder="Username"/>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"><i class="pi pi-shopping-cart"></i></span>
              <span class="p-inputgroup-addon"><i class="pi pi-globe"></i></span>
              <InputText placeholder="Price"/>
              <span class="p-inputgroup-addon">$</span>
              <span class="p-inputgroup-addon">.00</span>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
              <Button label="Search"/>
              <InputText placeholder="Keyword"/>
            </div>
          </div>

          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
                            <span class="p-inputgroup-addon p-inputgroup-addon-checkbox">
                                <Checkbox v-model="inputGroupValue" :binary="true"/>
                            </span>
              <InputText placeholder="Confirm"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.p-chips .p-chips-token) {
  background-color: var(--primary-color);
  color: var(--primary-color-text);
}

:deep(.p-chips .p-chips-multiple-container) {
  gap: 0.5rem;
}
</style>
