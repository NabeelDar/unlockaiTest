<script setup>
import {onMounted, ref} from 'vue';
import {CustomerService} from '@/service/CustomerService';
import {FilterMatchMode} from 'primevue/api';
import {useRouter} from 'vue-router';

const router = useRouter();

const tableRef = ref(null);
const curtomerService = new CustomerService();
const customers = ref([]);
const filterTable = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS}
});

onMounted(async () => {
  customers.value = await curtomerService.getCustomersLarge();
});

const formatDate = (value) => {
  return new Date(value).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const navigateToCreateListPage = () => {
  router.push({name: 'user-create'});
};
</script>

<template>
  <div class="card">
    <DataTable
        ref="tableRef"
        v-model:filters="filterTable"
        :globalFilterFields="['name', 'country.name', 'representative.name']"
        :rows="10"
        :rowsPerPageOptions="[10, 25, 50]"
        :value="customers"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        showCurrentPageReport
    >
      <template #header>
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                        <i class="pi pi-search"></i>
                        <InputText v-model="filterTable.global.value" class="w-full" placeholder="Global Search"/>
                    </span>
          <Button class="w-full sm:w-auto flex-order-0 sm:flex-order-1" icon="pi pi-user-plus" label="Add New"
                  outlined type="button" @click="navigateToCreateListPage"/>
        </div>
      </template>
      <Column :style="{ width: '25%' }" field="name" header="Name" headerClass="white-space-nowrap" sortable>
        <template #body="{ data }">
          <span class="p-column-title">Name</span>
          {{ data.name }}
        </template>
      </Column>
      <Column :style="{ width: '25%' }" field="country.name" header="Country" headerClass="white-space-nowrap" sortable>
        <template #body="{ data }">
          <img :alt="data.country.name" :class="'w-2rem mr-2 flag flag-' + data.country.code"
               src="/demo/images/flag/flag_placeholder.png"/>
          <span class="image-text">{{ data.country.name }}</span>
        </template>
      </Column>
      <Column :style="{ width: '25%' }" field="date" header="Join Date" headerClass="white-space-nowrap" sortable>
        <template #body="{ data }"> {{ formatDate(data.date) }}</template>
      </Column>
      <Column :style="{ width: '25%' }" field="representative.name" header="Created By" headerClass="white-space-nowrap"
              sortable>
        <template #body="{ data }">
          <div class="inline-flex align-items-center">
            <img :alt="data.representative.name" :src="`/demo/images/avatar/${data.representative.image}`"
                 class="w-2rem mr-2"/>
            <span>{{ data.representative.name }}</span>
          </div>
        </template>
      </Column>
      <Column :style="{ width: '25%' }" field="activity" header="Activity" headerClass="white-space-nowrap" sortable>
        <template #body="{ data }">
          <ProgressBar
              :showValue="false"
              :style="{
                            height: '.5rem'
                        }"
              :value="data.activity"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
