<script setup>
import {ref} from 'vue';

const emit = defineEmits(['checkbox:change', 'delete:task', 'open:edit:dialog']);
defineProps({
  title: {
    type: String,
    required: true
  },
  taskList: {
    type: Array,
    required: true
  }
});
const menu = ref(null);
const clickedTask = ref(null);
const menuItems = ref([
  {label: 'Edit', icon: 'pi pi-pencil', command: () => onEdit()},
  {label: 'Delete', icon: 'pi pi-trash', command: () => handleDelete()}
]);

const onEdit = () => {
  emit('open:edit:dialog', clickedTask.value);
};

const handleDelete = () => {
  emit('delete:task', clickedTask.value);
};
const parseDate = (timestamp) => {
  return new Date(timestamp).toTimeString().split(':').slice(0, 2).join(':');
};
const onCheckboxChange = (task) => {
  emit('checkbox:change', task);
};
const toggleMenu = (event, i, task) => {
  clickedTask.value = task;

  menu.value[i].toggle(event);
};
</script>

<template>
  <div class="text-900 font-semibold text-lg mt-5 mb-3 border-bottom-1 surface-border py-3">{{ title }}</div>
  <ul class="list-none p-0 m-0">
    <li v-for="(task, i) in taskList" :key="task"
        class="flex flex-column gap-3 md:flex-row md:align-items-center p-2 border-bottom-1 surface-border">
      <div class="flex align-items-center flex-1">
        <Checkbox v-model="task.completed" :inputId="task.id?.toString()" binary
                  @change="onCheckboxChange(task)"></Checkbox>
        <label :class="{ 'line-through': task.completed }"
               class="font-medium white-space-nowrap text-overflow-ellipsis overflow-hidden ml-2" style="max-width: 500px">{{ task.name }}</label>
      </div>
      <div class="flex flex-1 gap-3 flex-column sm:flex-row sm:justify-content-between">
        <div class="flex align-items-center">
          <span v-if="task.comments" class="flex align-items-center font-semibold mr-3"><i
              class="pi pi-comment mr-2"></i>{{ task.comments }}</span>
          <span v-if="task.attachments" class="flex align-items-center font-semibold mr-3"><i
              class="pi pi-paperclip mr-2"></i>{{ task.attachments }}</span>
          <span v-if="task.startDate" class="flex align-items-center font-semibold white-space-nowrap"><i
              class="pi pi-clock mr-2"></i>{{ parseDate(task.startDate) }}</span>
        </div>
        <div class="flex align-items-center sm:justify-content-end">
          <div class="mr-3">
            <AvatarGroup v-if="task.members?.length > 0">
              <Avatar v-for="member in task.members.slice(0, 4)" :key="member"
                      :image="'/demo/images/avatar/' + member.image" shape="circle" size="large"></Avatar>
              <Avatar
                  v-if="task && task.members && task.members.length > 4"
                  :label="`+${task.members.length - 4}`"
                  :style="{ color: '#212121', border: '2px solid var(--surface-border)' }"
                  class="bg-blue-500"
                  shape="circle"
                  size="large"
              ></Avatar>
            </AvatarGroup>
          </div>
          <Button class="z-3 ml-auto sm:ml-0" icon="pi pi-ellipsis-v" rounded text type="button"
                  @click="toggleMenu($event, i, task)"></Button>
          <Menu ref="menu" :model="menuItems" class="w-8rem" popup></Menu>
        </div>
      </div>
    </li>
  </ul>
</template>
