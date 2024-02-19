<script setup>
import {onMounted, ref, watch} from 'vue';

const content = ref({});
const newMail = ref({});

const emit = defineEmits(['save', 'update:dialogVisible']);
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
  mailDetail: {
    type: Object,
    default: null
  }
});

const displayMessage = ref(false);
const localDialogVisible = ref(false);

onMounted(() => {
  updateContent();
});

watch(
    () => props.mailDetail,
    () => {
      updateContent();
    }
);

const updateContent = () => {
  content.value = {...props.mailDetail};
};

const sendMail = () => {
  const replyMail = setMailAction();

  emit('save', replyMail);
};

const setMailAction = () => {
  return {
    ...content.value,
    ...newMail.value,
    id: generateId(),
    to: props.mailDetail.to || props.mailDetail.from,
    sent: true,
    archived: false,
    trash: false,
    spam: false,
    starred: false,
    important: false,
    date: generateDate()
  };
};

const toggleMessage = () => {
  displayMessage.value = !displayMessage.value;
};

const generateId = () => {
  let text = '';
  let possible = '0123456789';

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const generateDate = () => {
  return new Date().toDateString().split(' ').slice(1, 4).join(' ');
};
watch(
    () => props.dialogVisible,
    (newValue) => {
      localDialogVisible.value = newValue;
    }
);
watch(
    () => localDialogVisible.value,
    (newValue) => {
      emit('update:dialogVisible', newValue);
    }
);
</script>

<template>
  <Dialog v-model:visible="localDialogVisible" class="mx-3 sm:mx-0 sm:w-full md:w-8 lg:w-6" contentClass="border-round-bottom border-top-1 surface-border p-0" header="New Message"
          modal>
    <div class="p-0 m-0">
      <div class="surface-section grid grid-nogutter formgrid flex-column md:flex-row gap-6 p-5 border-round">
        <div class="col">
          <label class="block text-900 font-semibold mb-3" for="to">To</label>
          <span class="p-input-icon-left w-full" style="height: 3.5rem">
                        <i class="pi pi-user" style="left: 1.5rem"></i>
                        <InputText id="to" v-model="content.from" class="w-full pl-7 text-900 font-semibold" disabled
                                   style="height: 3.5rem" type="text"/>
                    </span>
        </div>
        <div class="col">
          <label class="block text-900 font-semibold mb-3" for="Subject">Subject</label>
          <span class="p-input-icon-left w-full" style="height: 3.5rem">
                        <i class="pi pi-pencil" style="left: 1.5rem"></i>
                        <InputText id="subject" v-model="content.title" class="w-full pl-7 text-900 font-semibold" disabled
                                   placeholder="Subject" style="height: 3.5rem"
                                   type="text"/>
                    </span>
        </div>
        <div v-if="displayMessage" class="col-12 field">
          <div class="border-1 surface-border border-round p-4">{{ content.message }}</div>
        </div>
        <div class="col-12 field">
                    <span v-tooltip="displayMessage ? 'Hide content' : 'Show content'" class="surface-ground cursor-pointer border-round px-2"
                          @click="toggleMessage()">
                        <i class="pi pi-ellipsis-h"></i>
                    </span>
          <Editor v-model="newMail.message" :editorStyle="{ height: '250px' }" class="mt-3"></Editor>
        </div>
      </div>
      <div class="flex column-gap-3 justify-content-end p-5 border-top-1 surface-border">
        <Button icon="pi pi-image" outlined type="button"></Button>
        <Button icon="pi pi-paperclip" outlined type="button"></Button>
        <Button class="h-3rem" icon="pi pi-send" label="Send" type="button" @click="sendMail()"></Button>
      </div>
    </div>
  </Dialog>
</template>
