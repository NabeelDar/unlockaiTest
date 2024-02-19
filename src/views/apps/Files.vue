<script setup>
import {ref} from 'vue';
import {FileService} from '@/service/FileService';

const metrics = ref([]);
const files = ref([]);
const folders = ref([]);
const chartData = ref([]);
const chartOptions = ref({});
const chartPlugins = ref({});
const menuItems = ref([
  {label: 'View', icon: 'pi pi-search'},
  {label: 'Refresh', icon: 'pi pi-refresh'}
]);
const menuRef = ref(null);
const fileUploaderRef = ref(null);
const uploadFiles = ref([]);
const fileService = new FileService();
fileService.getFiles().then((data) => (files.value = data));
fileService.getMetrics().then((data) => (metrics.value = data));
fileService.getFoldersLarge().then((data) => (folders.value = data));

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');

chartPlugins.value = [
  {
    beforeDraw: function (chart) {
      let ctx = chart.ctx;
      let width = chart.width;
      let height = chart.height;
      let fontSize = 1.5;
      let oldFill = ctx.fillStyle;

      ctx.restore();
      ctx.font = fontSize + 'rem sans-serif';
      ctx.textBaseline = 'middle';

      let text = 'Free Space';
      let text2 = 50 + 'GB / ' + 80 + 'GB';
      let textX = Math.round((width - ctx.measureText(text).width) / 2);
      let textY = (height + chart.chartArea.top) / 2.25;

      let text2X = Math.round((width - ctx.measureText(text).width) / 2.1);
      let text2Y = (height + chart.chartArea.top) / 1.75;

      ctx.fillStyle = chart.config.data.datasets[0].backgroundColor[0];
      ctx.fillText(text, textX, textY);
      ctx.fillText(text2, text2X, text2Y);
      ctx.fillStyle = oldFill;
      ctx.save();
    }
  }
];
chartData.value = {
  datasets: [
    {
      data: [300, 100],
      backgroundColor: [documentStyle.getPropertyValue('--primary-600'), documentStyle.getPropertyValue('--primary-100')],
      hoverBackgroundColor: [documentStyle.getPropertyValue('--primary-700'), documentStyle.getPropertyValue('--primary-200')],
      borderColor: 'transparent',
      fill: true
    }
  ]
};

chartOptions.value = {
  animation: {
    duration: 0
  },
  responsive: true,
  maintainAspectRatio: false,
  cutout: '90%',
  plugins: {
    legend: {
      labels: {
        color: textColor
      }
    }
  }
};

const toggleMenuItem = (event, index) => {
  menuRef.value[index].toggle(event);
};

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
  <div class="grid">
    <div v-for="(metric, i) in metrics" :key="i" class="col-12 md:col-6 lg:col-3">
      <div class="card h-full">
        <div class="flex align-items-center justify-content-between mb-3">
          <span class="text-900 text-xl font-semibold">{{ metric.title }}</span>
          <div>
            <Button :icon="metric.icon" rounded size="small" text @click="toggleMenuItem($event, i)"></Button>
            <Menu ref="menuRef" :model="menuItems" popup></Menu>
          </div>
        </div>
        <div>
          <div :class="metric.color" :style="{ height: '6px' }" class="border-round">
            <div :class="metric.fieldColor" :style="{ width: '34%' }" class="h-full border-round"></div>
          </div>
          <div class="flex align-item-center justify-content-between">
            <span class="text-900 mt-3 text-md font-medium">{{ metric.files }}</span>
            <span class="text-900 mt-3 text-md font-medium">{{ metric.fileSize }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 md:col-5 xl:col-3">
      <div class="card">
        <div class="text-900 text-xl font-semibold mb-3">Account Storage</div>
        <div class="flex flex-row justify-content-center" style="height: 200px">
          <Chart :data="chartData" :options="chartOptions" :plugins="chartPlugins" type="doughnut"></Chart>
        </div>
        <div class="mt-5 flex gap-3">
          <Button class="flex-1" icon="pi pi-search" label="Details" outlined></Button>
          <Button class="flex-1" icon="pi pi-upload" label="Upgrade"></Button>
        </div>
      </div>

      <div class="card">
        <div class="text-900 text-xl font-semibold mb-3">Categories</div>
        <ul class="list-none p-0 m-0">
          <li class="p-3 mb-3 flex align-items-center justify-content-between cursor-pointer border-round bg-indigo-50 text-indigo-900">
            <div class="flex align-items-center">
              <i class="pi pi-image text-2xl mr-3"></i>
              <span class="ext-lg font-medium">Images</span>
            </div>
            <span class="text-lg font-bold">85</span>
          </li>
          <li class="p-3 mb-3 flex align-items-center justify-content-between cursor-pointer border-round bg-purple-50 text-purple-900">
            <div class="flex align-items-center">
              <i class="pi pi-file text-2xl mr-3"></i>
              <span class="ext-lg font-medium">Documents</span>
            </div>
            <span class="text-lg font-bold">231</span>
          </li>
          <li class="p-3 flex align-items-center justify-content-between cursor-pointer border-round bg-teal-50 text-teal-900">
            <div class="flex align-items-center">
              <i class="pi pi-video text-2xl mr-3"></i>
              <span class="ext-lg font-medium">Videos</span>
            </div>
            <span class="text-lg font-bold">40</span>
          </li>
        </ul>
      </div>

      <div class="card p-0">
        <div class="card">
          <FileUpload
              id="files-fileupload"
              ref="fileUploaderRef"
              :maxFileSize="1000000"
              :pt="{
                            buttonbar: { class: 'hidden' },
                            content: { class: 'border-none' }
                        }"
              accept="image/*"
              auto
              class="upload-button-hidden w-full"
              customUpload
              invalidFileSizeMessage="Invalid File Size"
              invalidFileTypeMessage="Invalid File Type"
              multiple
              name="demo[]"
              url="./upload.php"
              @select="onSelectedFiles"
          >
            <template #content>
              <div v-if="uploadFiles.length > 0" :style="{ cursor: 'copy' }" class="w-full py-3">
                <div v-for="file in uploadFiles" :key="file.name" class="flex flex-wrap gap-5">
                  <div
                      :style="{ padding: '1px' }"
                      class="remove-file-wrapper h-full relative w-7rem h-7rem border-3 border-transparent border-round hover:bg-primary transition-duration-100 cursor-auto">
                    <img :alt="file.name" :src="file.objectURL" class="w-full h-full border-round shadow-2"/>
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
              <div v-if="uploadFiles.length < 1" :style="{ cursor: 'copy' }" class="w-full py-3"
                   @click="onChooseUploadFiles">
                <div class="h-full flex flex-column justify-content-center align-items-center">
                  <i class="pi pi-upload text-900 text-2xl mb-3"></i>
                  <span class="font-bold text-900 text-xl mb-3">Upload Files</span>
                  <span class="font-medium text-600 text-md text-center">Drop or select files</span>
                </div>
              </div>
            </template>
          </FileUpload>
        </div>
      </div>
    </div>
    <div class="col-12 md:col-7 xl:col-9">
      <div class="card">
        <div class="text-900 text-xl font-semibold mb-3">Folders</div>
        <div class="grid">
          <div v-for="(folder, i) in folders" :key="i" class="col-12 md:col-6 xl:col-4">
            <div
                class="p-3 border-1 surface-border flex align-items-center justify-content-between hover:surface-100 cursor-pointer border-round">
              <div class="flex align-items-center">
                <i :class="folder.icon" class="text-2xl mr-3"></i>
                <span class="text-900 text-lg font-medium">{{ folder.name }}</span>
              </div>
              <span class="text-600 text-lg font-semibold">{{ folder.size }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="text-900 text-xl font-semibold mb-3">Recent Uploads</div>
        <DataTable :rows="8" :value="files" dataKey="id" paginator>
          <Column :headerStyle="{ minWidth: '12rem' }" field="name" header="Name" sortable>
            <template #body="{ data }">
              <div class="flex align-items-center">
                <i :class="data.icon" class="text-xl text-primary mr-2"></i>
                <span>{{ data.name }}</span>
              </div>
            </template>
          </Column>
          <Column :headerStyle="{ minWidth: '12rem' }" field="date" header="Date"
                  headerClass="white-space-nowrap"></Column>
          <Column :headerStyle="{ minWidth: '12rem' }" field="fileSize" header="File Size" sortable></Column>
          <Column class="w-10rem">
            <template #body>
              <div class="text-center">
                <Button class="mr-2" icon="pi pi-times" rounded severity="danger" text></Button>
                <Button icon="pi pi-search" rounded text></Button>
              </div>
            </template>
          </Column>
        </DataTable>
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
