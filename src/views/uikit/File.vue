<script setup>
import {useToast} from 'primevue/usetoast';

const toast = useToast();

const onUpload = () => {
  toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Advanced</h5>
        <FileUpload :maxFileSize="1000000" :multiple="true" accept="image/*" customUpload name="demo[]"
                    @uploader="onUpload"/>

        <h5>Basic</h5>
        <FileUpload :maxFileSize="1000000" accept="image/*" customUpload mode="basic" name="demo[]"
                    @uploader="onUpload"/>
      </div>
    </div>
  </div>
</template>
