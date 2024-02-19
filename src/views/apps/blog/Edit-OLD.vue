<script setup>
import {ref} from 'vue';

const tags = ref(['Software', 'Web']);
const fileUploaderRef = ref(null);
const uploadFiles = ref([]);

const onChooseUploadFiles = () => {
  fileUploaderRef.value.choose();
};
const onSelectedFiles = (event) => {
  uploadFiles.value = event.files;
};
const onRemoveFile = (removeFile) => {
  uploadFiles.value = uploadFiles.value.filter((file) => file.name !== removeFile.name);
};
</script>

<template>
  <div class="card">
    <span class="block text-900 font-bold text-xl mb-4">Create a new post</span>
    <div class="grid">
      <div class="col-12 lg:col-8">
        <FileUpload
            ref="fileUploaderRef"
            :maxFileSize="1000000"
            :pt="{
                        root: { class: 'border-1 surface-border surface-card p-0 border-round mb-4' },
                        buttonbar: { class: 'hidden' },
                        removeButton: { class: 'flex' }
                    }"
            accept="image/*"
            auto
            customUpload
            multiple
            name="demo[]"
            @select="onSelectedFiles"
        >
          <template v-if="uploadFiles.length > 0" #content>
            <div class="h-20rem m-1 border-round">
              <div v-for="file in uploadFiles" :key="file.name" :style="{ cursor: 'copy' }"
                   class="w-full h-full relative border-round p-0">
                <div
                    :style="{ padding: '1px' }"
                    class="remove-file-wrapper h-full relative border-3 border-transparent border-round hover:bg-primary transition-duration-100 cursor-auto">
                  <img :alt="file.name" :src="file.objectURL" class="w-full h-full border-round"/>
                  <Button
                      :style="{ top: '-10px', right: '-10px' }"
                      class="remove-button text-sm absolute justify-content-center align-items-center cursor-pointer hidden"
                      icon="pi pi-times"
                      rounded
                      @click="onRemoveFile(file)"
                  ></Button>
                </div>
              </div>
            </div>
          </template>
          <template #empty>
            <div v-if="uploadFiles.length < 1" class="h-20rem m-1 border-round">
              <div :style="{ cursor: 'copy' }"
                   class="flex flex-column w-full h-full justify-content-center align-items-center cursor-pointer"
                   @click="onChooseUploadFiles">
                <i class="pi pi-fw pi-file text-4xl text-primary"></i>
                <span class="block font-semibold text-900 text-lg mt-3">Drop or select a cover image</span>
              </div>
            </div>
          </template>
        </FileUpload>
        <div class="flex flex-column p-fluid">
          <div class="mb-4 mt-3">
            <InputText placeholder="Title" type="text"/>
          </div>
          <div class="mb-4">
            <Textarea autoResize placeholder="Content" rows="6"></Textarea>
          </div>

          <Editor editorStyle="height: 320px"></Editor>
        </div>
      </div>
      <div class="col-12 lg:col-4">
        <div class="border-1 surface-border border-round mb-4">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Publish</span>
          <div class="p-3">
            <div class="surface-100 p-3 flex align-items-center border-round">
              <span class="text-900 font-semibold mr-3">Status:</span>
              <span class="font-medium">Draft</span>
              <Button class="ml-auto" icon="pi pi-fw pi-pencil" rounded text type="button"></Button>
            </div>
          </div>
          <div class="p-3">
            <div class="surface-100 p-3 flex align-items-center border-round">
              <span class="text-900 font-semibold mr-3">Visibility:</span>
              <span class="font-medium">Private</span>
              <Button class="ml-auto" icon="pi pi-fw pi-pencil" rounded text type="button"></Button>
            </div>
          </div>
        </div>
        <div class="border-1 surface-border border-round mb-4">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Tags</span>
          <div class="p-3 flex gap-2">
            <Chip v-for="(tag, i) in tags" :key="i" :label="tag"></Chip>
          </div>
        </div>
        <div class="border-1 surface-border border-round p-fluid mb-4">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Meta</span>
          <div class="p-3">
            <div class="mb-4">
              <InputText placeholder="Title" type="text"/>
            </div>
            <div>
              <Textarea autoResize placeholder="Description" rows="6"></Textarea>
            </div>
          </div>
        </div>
        <div class="flex justify-content-between gap-3">
          <Button class="flex-1" icon="pi pi-fw pi-trash" label="Discard" outlined severity="danger"></Button>
          <Button class="flex-1" icon="pi pi-fw pi-check" label="Publish"></Button>
        </div>
      </div>
    </div>
  </div>
</template>
