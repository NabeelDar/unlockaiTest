<script setup>
import {onMounted, ref} from 'vue';

const emit = defineEmits(['close', 'save']);
const props = defineProps({
  selectedTask: {
    type: Object,
    default: null
  }
});
const task = ref({});
const filteredMembers = ref([]);
onMounted(() => {
  if (props.selectedTask) {
    task.value = props.selectedTask;
  }
});
const getMembers = async () => {
  const response = await fetch('/demo/data/members.json');
  const {data} = await response.json();

  return data;
};
const onHide = () => {
  emit('close', task.value);
};

const onSave = () => {
  emit('save', task.value);
};

const filterMembers = async (event) => {
  const members = await getMembers();

  if (!event.query) return [];

  filteredMembers.value = members.filter((member) => member.name.toLowerCase().indexOf(event.query.toLowerCase()) === 0);
};
</script>

<template>
  <div class="p-4">
    <div class="grid p-fluid formgrid">
      <div class="col-12 field">
        <label class="text-900 font-semibold" for="name">Task Name</label>
        <InputText id="name" v-model="task.name" placeholder="Title" type="text"/>
      </div>
      <div class="col-12 field">
        <label class="text-900 font-semibold" for="description">Description</label>
        <Editor
            v-model="task.description"
            :pt="{
                        root: { style: { height: '150px' }, class: 'mb-6' }
                    }"
        ></Editor>
      </div>
      <div class="col-6 field">
        <label class="text-900 font-semibold" for="start">Start Date</label>
        <Calendar v-model="task.startDate" :show-time="false" dateFormat="yy-mm-dd" inputId="start"
                  placeholder="Start Date"></Calendar>
      </div>
      <div class="col-6 field">
        <label class="text-900 font-semibold" for="end">Due Date</label>
        <Calendar v-model="task.endDate" :show-time="false" dateFormat="yy-mm-dd" inputId="end"
                  placeholder="End Date"></Calendar>
      </div>
      <div class="col-12 field">
        <label class="text-900 font-semibold" for="members">Add Team Member</label>
        <AutoComplete v-model="task.members" :inputStyle="{ height: '2.5rem' }" :suggestions="filteredMembers" field="name" inputId="members"
                      multiple @complete="filterMembers($event)">
          <template #chip="{ value }">
            <div class="flex align-items-center">
              <img :alt="value.name" :src="'/demo/images/avatar/' + value.image" class="h-2rem w-2rem mr-2"/>
              <span class="text-900 font-medium">{{ value.name }}</span>
            </div>
          </template>
          <template #item="{ item }">
            <div class="flex align-items-center">
              <img :alt="item.name" :src="'/demo/images/avatar/' + item.image" class="h-2rem w-2rem mr-2"/>
              <span class="text-900 font-medium">{{ item.name }}</span>
            </div>
          </template>
        </AutoComplete>
      </div>

      <div class="col-12 flex justify-content-end mt-4">
        <Button class="w-8rem mr-3" icon="pi pi-times" label="Cancel" outlined @click="onHide()"></Button>
        <Button class="w-8rem" icon="pi pi-check" label="Save" @click="onSave()"></Button>
      </div>
    </div>
  </div>
</template>
