<script setup>
import {onBeforeUnmount, onMounted, onUpdated, ref} from 'vue';
import {FilterMatchMode} from 'primevue/api';
import {useRouter} from 'vue-router';

const emit = defineEmits(['spam', 'archive', 'trash', 'change:mail:type', 'reply']);

defineProps({
  mails: {
    type: Array
  }
});

const router = useRouter();
const menuRef = ref(null);
const mailTable = ref(null);
const selectedMails = ref([]);
const menuItems = ref([
  {label: 'Archive', icon: 'pi pi-file', command: () => onSelectedMailsAction('archive')},
  {label: 'Spam', icon: 'pi pi-ban', command: () => onSelectedMailsAction('spam')},
  {label: 'Delete', icon: 'pi pi-trash', command: () => onSelectedMailsAction('trash')}
]);
const filterTable = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS}
});

onMounted(() => {
  setEventListenersOnRow('addEventListener');
});

onUpdated(async () => {
  await setEventListenersOnRow('removeEventListener');
  await setEventListenersOnRow('addEventListener');
});

onBeforeUnmount(() => {
  setEventListenersOnRow('addEventListener');
});

const setEventListenersOnRow = (type) => {
  const mailRowsRefs = [...mailTable.value.$el.querySelectorAll('tbody > tr')];

  mailRowsRefs.forEach((mailRow) => {
    mailRow[type]('mouseenter', (event) => actionButtonToggle(event, mailRow));
    mailRow[type]('mouseleave', (event) => actionButtonToggle(event, mailRow));
  });
};
const actionButtonToggle = (event, mailRow) => {
  const actionButtonsRef = mailRow.querySelector('.action-buttons');
  const dateRef = mailRow.querySelector('.date-text');

  if (!actionButtonsRef || !dateRef) return;

  if (event.type === 'mouseenter') {
    actionButtonsRef.style.display = 'flex';
    dateRef.style.display = 'none';
  } else {
    actionButtonsRef.style.display = 'none';
    dateRef.style.display = 'flex';
  }
};

const onSelectedMailsAction = (emitType) => {
  if (selectedMails.value.length !== 0) {
    for (const mail of selectedMails.value) {
      clearMaileActions(mail);
    }

    emit(emitType, selectedMails.value);
    selectedMails.value = [];
  }
};

const onSingleMailAction = (emitType, mail) => {
  clearMaileActions(mail);

  emit(emitType, mail);

  selectedMails.value = [];
};

const changeMailType = (mailType, mail) => {
  emit('change:mail:type', mailType, mail, !mail[mailType]);
};

const onReplyMail = (mail) => {
  emit('reply', mail);
};

const onNavigateToDetailPage = (id) => {
  router.push({name: 'mail-detail', params: {id}});
};

const clearMaileActions = (mail) => {
  Object.keys(mail).forEach((key) => {
    if (mail[key] === true) {
      mail[key] = false;
    }
  });
};
</script>

<template>
  <DataTable ref="mailTable" v-model:filters="filterTable" v-model:selection="selectedMails" :globalFilterFields="['from', 'to', 'title', 'message']" :rows="10"
             :rowsPerPageOptions="[10, 20, 30]" :value="mails" dataKey="id" paginator
             rowHover>
    <Column selectionMode="multiple" style="width: 4rem"></Column>
    <Column style="width: 8rem">
      <template #header>
        <div class="flex -ml-2">
          <Button icon="pi pi-refresh" plain rounded text type="button"></Button>
          <Button class="ml-3" icon="pi pi-ellipsis-v" plain rounded text type="button"
                  @click="menuRef.toggle($event)"></Button>
          <Menu ref="menuRef" :model="menuItems" class="w-8rem" popup></Menu>
        </div>
        <div></div>
      </template>
      <template #body="{ data }">
        <td v-if="!data.trash && !data.spam" class="w-4rem">
                    <span class="cursor-pointer" @click="changeMailType('starred', data)">
                        <i :class="{ 'pi-star-fill': data.starred, 'pi-star': !data.starred }"
                           class="pi pi-fw text-xl"></i>
                    </span>
        </td>
        <td v-if="!data.trash && !data.spam" class="w-4rem">
                    <span class="cursor-pointer ml-3" @click="changeMailType('important', data)">
                        <i :class="{ 'pi-bookmark-fill': data.important, 'pi-bookmark': !data.important }"
                           class="pi pi-fw text-xl"></i>
                    </span>
        </td>
      </template>
    </Column>
    <Column style="min-width: 4rem">
      <template #body="{ data }">
        <Avatar v-if="!data.image" icon="pi pi-user" shape="circle"></Avatar>
        <Avatar v-else :id="data.id" :image="`/demo/images/avatar/${data.image ? data.image : '.png'}`"
                class="cursor-pointer" @click="onNavigateToDetailPage(data.id)"></Avatar>
      </template>
    </Column>
    <Column style="min-width: 4rem">
      <template #body="{ data }">
        <div :style="{ minWidth: '12rem' }" class="text-900 font-semibold cursor-pointer"
             @click="onNavigateToDetailPage(data.id)">{{ data.from || data.to }}
        </div>
      </template>
    </Column>
    <Column style="min-width: 30rem">
      <template #body="{ data }">
                <span class="font-medium white-space-nowrap overflow-hidden text-overflow-ellipsis block cursor-pointer"
                      style="max-width: 30rem"
                      @click="onNavigateToDetailPage(data.id)">
                    {{ data.title }}
                </span>
      </template>
    </Column>
    <Column field="date">
      <template #header>
                <span class="p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <InputText v-model="filterTable.global.value" class="w-full sm:w-auto" placeholder="Search Mail"
                               type="text"/>
                </span>
      </template>
      <template #body="{ data }">
        <div :style="{ minWidth: '10rem' }">
          <div class="flex justify-content-end w-full px-0">
                        <span ref="dateRef" class="date-text text-700 font-semibold white-space-nowrap">
                            {{ data.date }}
                        </span>
            <div ref="actionRef" class="action-buttons" style="display: none">
              <Button v-tooltip.top="'Archive'" class="h-2rem w-2rem mr-2" icon="pi pi-inbox"
                      type="button" @click="onSingleMailAction('archive', data)"></Button>
              <Button v-tooltip.top="'Reply'" class="h-2rem w-2rem mr-2" icon="pi pi-reply" severity="secondary"
                      type="button" @click="onReplyMail(data)"></Button>
              <Button v-tooltip.top="'Trash'" class="h-2rem w-2rem" icon="pi pi-trash"
                      severity="danger" type="button" @click="onSingleMailAction('trash', data)"></Button>
            </div>
          </div>
        </div>
      </template>
    </Column>
  </DataTable>
</template>
