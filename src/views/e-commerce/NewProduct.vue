<script setup>
import {ref} from 'vue';

const colorOptions = ref([
  {name: 'Black', background: 'bg-gray-900'},
  {name: 'Orange', background: 'bg-orange-500'},
  {name: 'Navy', background: 'bg-blue-500'}
]);
const product = ref({
  name: '',
  price: '',
  code: '',
  sku: '',
  status: 'Draft',
  tags: ['Nike', 'Sneaker'],
  category: 'Sneakers',
  colors: [],
  stock: 'Sneakers',
  inStock: true,
  description: '',
  images: []
});
const selectedCategory = ref(null);
const selectedStock = ref(null);
const categoryOptions = ['Sneakers', 'Apparel', 'Socks'];
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

const toggleColor = (color) => {
  const index = product.value.colors.indexOf(color);
  if (index > -1) {
    product.value.colors.splice(index, 1);
  } else {
    product.value.colors.push(color);
  }
};
const onRemoveTags = (tag) => {
  product.value.tags = product.value.tags.filter((t) => t !== tag);
};
</script>

<template>
  <div class="card">
    <span class="block text-900 font-bold text-xl mb-4">Create Product</span>
    <div class="grid grid-nogutter flex-wrap gap-3 p-fluid">
      <div class="col-12 lg:col-8">
        <div class="grid formgrid">
          <div class="col-12 field">
            <InputText v-model="product.name" placeholder="Product Name" type="text"/>
          </div>
          <div class="col-12 lg:col-4 field">
            <InputText v-model="product.price" label="Price" placeholder="Price" type="text"/>
          </div>
          <div class="col-12 lg:col-4 field">
            <InputText v-model="product.code" label="Product Code" placeholder="Product Code" type="text"/>
          </div>
          <div class="col-12 lg:col-4 field">
            <InputText v-model="product.sku" label="SKU" placeholder="Product SKU" type="text"/>
          </div>
          <div class="col-12">
            <Editor editorStyle="height: 320px"></Editor>
          </div>
          <div class="col-12 mt-3">
            <FileUpload
                id="files-fileupload"
                ref="fileUploaderRef"
                :maxFileSize="1000000"
                :pt="{
                                buttonbar: { class: 'hidden' },
                                root: { style: { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }
                            }"
                accept="image/*"
                auto
                class="border-1 surface-border surface-card p-0 border-round"
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
                        class="remove-file-wrapper h-full relative border-3 border-transparent border-round hover:bg-primary transition-duration-100 cursor-auto">
                      <img :alt="file.name" :src="file.objectURL" class="w-full h-full border-round"/>
                      <Button
                          :style="{ top: '-10px', right: '-10px', display: 'none', width: '3rem' }"
                          class="remove-button text-sm absolute justify-content-center align-items-center cursor-pointer"
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
          </div>
        </div>
      </div>
      <div class="flex-1 w-full lg:w-3 xl:w-4 flex flex-column row-gap-3">
        <div class="border-1 surface-border border-round">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Publish</span>
          <div class="p-3">
            <div class="surface-100 py-2 px-3 flex align-items-center border-round">
              <span class="text-black-alpha-90 font-bold mr-3">Status:</span>
              <span class="text-black-alpha-60 font-semibold">Draft</span>
              <Button class="ml-auto" icon="pi pi-fw pi-pencil" rounded text type="button"></Button>
            </div>
          </div>
        </div>
        <div class="border-1 surface-border border-round">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Tags</span>
          <div class="p-3 flex flex-wrap gap-1">
            <Chip v-for="(tag, i) in product.tags" :key="i" :label="tag"
                  class="mr-2 py-2 px-3 text-900 font-bold surface-card border-1 surface-border"
                  style="border-radius: 20px">
              <span class="mr-3">{{ tag }}</span>
              <span
                  :style="{ width: '1.5rem', height: '1.5rem' }"
                  class="flex align-items-center justify-content-center border-1 surface-border bg-gray-100 border-circle cursor-pointer" @click="onRemoveTags(tag)">
                                <i :style="{ fontSize: '9px' }"
                                   class="pi pi-fw pi-times text-black-alpha-60"></i> </span
              ></Chip>
          </div>
        </div>
        <div class="border-1 surface-border border-round">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Category</span>
          <div class="p-3">
            <Dropdown v-model="selectedCategory" :options="categoryOptions" placeholder="Select a category"></Dropdown>
          </div>
        </div>

        <div class="border-1 surface-border border-round">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Colors</span>
          <div class="p-3 flex">
            <div
                v-for="(color, i) in colorOptions"
                :key="i"
                :class="color.background"
                class="w-2rem h-2rem mr-2 border-1 surface-border border-circle cursor-pointer flex justify-content-center align-items-center"
                @click="toggleColor(color.name)"
            >
              <i v-if="product.colors.includes(color.name)" :key="i" class="pi pi-check text-sm text-white z-5"></i>
            </div>
          </div>
        </div>

        <div class="border-1 surface-border border-round">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3">Stock</span>
          <div class="p-3">
            <Dropdown v-model="selectedStock" :options="categoryOptions" placeholder="Select stock"></Dropdown>
          </div>
        </div>
        <div class="border-1 surface-border flex justify-content-between align-items-center px-3 border-round">
          <span class="text-900 font-bold p-3">In stock</span>
          <InputSwitch v-model="product.inStock"></InputSwitch>
        </div>
        <div class="flex justify-content-between gap-3">
          <Button class="flex-1" icon="pi pi-fw pi-trash" label="Discard" outlined severity="danger"></Button>
          <Button class="flex-1" icon="pi pi-fw pi-check" label="Publish"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.remove-file-wrapper:hover {
  .remove-button {
    display: flex !important;
  }
}
</style>
