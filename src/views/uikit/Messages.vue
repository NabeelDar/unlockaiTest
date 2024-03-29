<script setup>
import {ref} from 'vue';
import {useToast} from 'primevue/usetoast';

const toast = useToast();
const message = ref([]);
const username = ref(null);
const email = ref(null);
const count = ref(0);

const addMessage = (type) => {
  if (type === 'success') {
    message.value = [{severity: 'success', detail: 'Success Message', content: 'Message sent', id: count.value++}];
  } else if (type === 'info') {
    message.value = [{severity: 'info', detail: 'Info Message', content: 'PrimeVue rocks', id: count.value++}];
  } else if (type === 'warn') {
    message.value = [{
      severity: 'warn',
      detail: 'Warn Message',
      content: 'There are unsaved changes',
      id: count.value++
    }];
  } else if (type === 'error') {
    message.value = [{severity: 'error', detail: 'Error Message', content: 'Validation failed', id: count.value++}];
  }
};

const showSuccess = () => {
  toast.add({severity: 'success', summary: 'Success Message', detail: 'Message Detail', life: 3000});
};

const showInfo = () => {
  toast.add({severity: 'info', summary: 'Info Message', detail: 'Message Detail', life: 3000});
};

const showWarn = () => {
  toast.add({severity: 'warn', summary: 'Warn Message', detail: 'Message Detail', life: 3000});
};

const showError = () => {
  toast.add({severity: 'error', summary: 'Error Message', detail: 'Message Detail', life: 3000});
};
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6">
      <div class="card">
        <h5>Toast</h5>
        <Button class="mr-2" label="Success" severity="success" @click="showSuccess()"/>
        <Button class="mr-2" label="Info" severity="info" @click="showInfo()"/>
        <Button class="mr-2" label="Warn" severity="warning" @click="showWarn()"/>
        <Button class="mr-2" label="Error" severity="danger" @click="showError()"/>
      </div>
    </div>

    <div class="col-12 lg:col-6">
      <div class="card">
        <h5>Messages</h5>
        <Button class="mr-2" label="Success" severity="success" @click="addMessage('success')"/>
        <Button class="mr-2" label="Info" severity="info" @click="addMessage('info')"/>
        <Button class="mr-2" label="Warn" severity="warning" @click="addMessage('warn')"/>
        <Button class="mr-2" label="Error" severity="danger" @click="addMessage('error')"/>

        <transition-group name="p-message" tag="div">
          <Message v-for="msg of message" :key="msg.content" :severity="msg.severity">{{ msg.content }}</Message>
        </transition-group>
      </div>
    </div>

    <div class="col-12 lg:col-8">
      <div class="card">
        <h5>Inline</h5>
        <div class="field grid">
          <label class="col-fixed w-9rem" for="username1">Username</label>
          <div class="col">
            <InputText id="username1" v-model="username" :required="true" class="p-invalid mr-2"></InputText>
            <InlineMessage>Username is required</InlineMessage>
          </div>
        </div>
        <div class="field grid">
          <label class="col-fixed w-9rem" for="email">Email</label>
          <div class="col">
            <InputText id="email" v-model="email" :required="true" class="p-invalid mr-2"></InputText>
            <InlineMessage/>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 lg:col-4">
      <div class="card">
        <h5>Help Text</h5>
        <div class="field p-fluid">
          <label for="username2">Username</label>
          <InputText id="username2" aria-describedby="username-help" class="p-error" type="username"/>
          <small id="username-help" class="p-error">Enter your username to reset your password.</small>
        </div>
      </div>
    </div>
  </div>
</template>
