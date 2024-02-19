<script setup>
import {ref} from "vue";

const tags = ref(["Software", "Web"]);
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

const selectedSchedule = ref("Production");
const scheduleOptions = ref(["Save as draft", "Send NOW", "Custom time"]);
const scheduleDate = ref();
const scheduleTime = ref();
const images = ref([
  {
    itemImageSrc: "https://placehold.co/50x50",
    thumbnailImageSrc: "https://placehold.co/20x20",
    alt: "Description for Image 1",
  },
]);
const responsiveOptions = ref([
  {
    breakpoint: "1300px",
    numVisible: 4,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
  },
]);
</script>

<template>
  <div class="card">
    <span class="block text-900 font-bold text-xl mb-4">Create a new post</span>

    <TabView>
      <TabPanel header="POST">
        <div></div>
      </TabPanel>
      <TabPanel header="STORIES">
        <div></div>
      </TabPanel>
      <TabPanel header="REELS">
        <div></div>
      </TabPanel>
    </TabView>
    <div class="grid nested-grid">
      <div class="col-12 lg:col-8">
        <div class="grid">
          <div class="col-4 mb-4 flex flex-column">
            <Galleria
                :numVisible="5"
                :responsiveOptions="responsiveOptions"
                :value="images"
                class=""
                containerStyle="max-width: 300px"
            >
              <template #item="slotProps">
                <img
                    :alt="slotProps.item.alt"
                    :src="slotProps.item.itemImageSrc"
                    style="width: 100%"
                />
              </template>
              <template #thumbnail="slotProps">
                <div class="flex align-items-center">
                  <img
                      :alt="slotProps.item.alt"
                      :src="slotProps.item.thumbnailImageSrc"
                      class="w-2rem h-2rem mr-2"
                  />

                  <Button
                      class="w-2rem h-2rem mr-2"
                      icon="pi pi-plus"
                      outlined
                      @click="onChooseUploadFiles"
                  />
                </div>
              </template>
            </Galleria>
          </div>
          <div class="col-8 flex flex-column mb-4">
            <h5 class="flex">Schedule your post</h5>

            <div class="flex flex-column gap-3">
              <div
                  v-for="schedule in scheduleOptions"
                  :key="schedule"
                  class="flex align-items-center"
              >
                <RadioButton
                    v-model="selectedSchedule"
                    :inputId="schedule"
                    :value="schedule"
                    name="dynamic"
                />
                <label :for="schedule" class="ml-2">{{ schedule }}</label>
              </div>
            </div>
            <div v-if="selectedSchedule === 'Custom time'" class="mt-8 flex gap-3">
              <Calendar v-model="scheduleDate" iconDisplay="input" showIcon/>
              <Calendar v-model="scheduleTime" iconDisplay="input" showIcon timeOnly>
                <template #inputicon="{ clickCallback }">
                  <i class="pi pi-clock" @click="clickCallback"/>
                </template>
              </Calendar>
            </div>
          </div>
        </div>

        <!-- <FileUpload
          ref="fileUploaderRef"
          name="demo[]"
          accept="image/*"
          customUpload
          multiple
          auto
          :maxFileSize="1000000"
          @select="onSelectedFiles"
          :pt="{
            root: { class: 'border-1 surface-border surface-card p-0 border-round mb-4' },
            buttonbar: { class: 'hidden' },
            removeButton: { class: 'flex' },
          }"
        >
          <template v-if="uploadFiles.length > 0" #content>
            <div class="h-20rem m-1 border-round">
              <div
                v-for="file in uploadFiles"
                :key="file.name"
                class="w-full h-full relative border-round p-0"
                :style="{ cursor: 'copy' }"
              >
                <div
                  class="remove-file-wrapper h-full relative border-3 border-transparent border-round hover:bg-primary transition-duration-100 cursor-auto"
                  :style="{ padding: '1px' }"
                >
                  <img
                    :src="file.objectURL"
                    :alt="file.name"
                    class="w-full h-full border-round"
                  />
                  <Button
                    icon="pi pi-times"
                    class="remove-button text-sm absolute justify-content-center align-items-center cursor-pointer hidden"
                    rounded
                    :style="{ top: '-10px', right: '-10px' }"
                    @click="onRemoveFile(file)"
                  ></Button>
                </div>
              </div>
            </div>

            <div
              @click="onChooseUploadFiles"
              class="flex flex-column w-full h-full justify-content-center align-items-center cursor-pointer"
              :style="{ cursor: 'copy' }"
            >
              <i class="pi pi-fw pi-file text-4xl text-primary"></i>
              <span class="block font-semibold text-900 text-lg mt-3"
                >Drop or select a cover image</span
              >
            </div>
          </template>
          <template #empty>
            <div v-if="uploadFiles.length < 1" class="h-20rem m-1 border-round">
              <div
                @click="onChooseUploadFiles"
                class="flex flex-column w-full h-full justify-content-center align-items-center cursor-pointer"
                :style="{ cursor: 'copy' }"
              >
                <i class="pi pi-fw pi-file text-4xl text-primary"></i>
                <span class="block font-semibold text-900 text-lg mt-3"
                  >Drop or select a cover image</span
                >
              </div>
            </div>
          </template>
        </FileUpload> -->

        <div class="flex flex-column mb-4">
          <Button icon="pi pi-plus" label="Connect Social Media Platform" outlined/>
        </div>
        <div class="flex flex-column p-fluid">
          <Editor editorStyle="height: 320px" placeholder="Content description"></Editor>
        </div>
      </div>
      <div class="col-12 lg:col-4">
        <div class="border-1 surface-border border-round mb-4">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3"
          >Publish</span
          >
          <div class="p-3">
            <div class="surface-100 p-3 flex align-items-center border-round">
              <span class="text-900 font-semibold mr-3">Status:</span>
              <span class="font-medium">Draft</span>
              <Button
                  class="ml-auto"
                  icon="pi pi-fw pi-pencil"
                  rounded
                  text
                  type="button"
              ></Button>
            </div>
          </div>
          <div class="p-3">
            <div class="surface-100 p-3 flex align-items-center border-round">
              <span class="text-900 font-semibold mr-3">Visibility:</span>
              <span class="font-medium">Private</span>
              <Button
                  class="ml-auto"
                  icon="pi pi-fw pi-pencil"
                  rounded
                  text
                  type="button"
              ></Button>
            </div>
          </div>
        </div>
        <div class="border-1 surface-border border-round mb-4">
          <span class="text-900 font-bold block border-bottom-1 surface-border p-3"
          >Tags</span
          >
          <div class="p-3 flex gap-2">
            <Chip v-for="(tag, i) in tags" :key="i" :label="tag"></Chip>
          </div>
        </div>

        <div class="flex justify-content-center align-items-center mb-4">
          <router-link to="/generate-ai-caption-hashtags/1">
            <Button
                class="flex-1"
                icon="pi pi-fw pi-tags"
                label="AI Caption & Hashtags"
                severity="info"
            ></Button>
          </router-link>
        </div>
        <div class="flex justify-content-between gap-3">
          <Button
              class="flex-1"
              icon="pi pi-fw pi-trash"
              label="Discard"
              outlined
              severity="danger"
          ></Button>
          <Button class="flex-1" icon="pi pi-fw pi-check" label="Publish"></Button>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-content-center align-items-center mt-4 card">
    <div class="iphone-preview">
      <div class="marvel-device iphone-x">
        <div class="notch">
          <div class="camera"></div>
          <div class="speaker"></div>
        </div>
        <div class="top-bar"></div>
        <div class="overflow">
          <div class="shadow shadow--tr"></div>
          <div class="shadow shadow--tl"></div>
          <div class="shadow shadow--br"></div>
          <div class="shadow shadow--bl"></div>
        </div>
        <div class="screen">
          <div class="profile-bar flex align-items-start p-4 pt-7">
            <Avatar class="mr-2" icon="pi pi-user" shape="circle" size="xlarge"/>
            <div class="flex flex-column">
              <h4 class="my-2">@nabeel.dar</h4>
              <div class="flex">
                <Button class="flex" label="ALL" size="xsmall" text/>
                <Button class="flex" label="SCHEDULED" size="xsmall" text/>
              </div>

              <!-- <SelectButton
                v-model="selectedSchedule"
                :options="['ALL', 'SCHEDULED']"
                aria-labelledby="basic"
                size="small"
              /> -->
            </div>
          </div>
          <div>
            <div>
              <TabView>
                <TabPanel header="POSTS"></TabPanel>
                <TabPanel header="STORIES"></TabPanel>
                <TabPanel header="REELS"></TabPanel>
              </TabView>
              <div class="bg-blue-50 flex flex-wrap justify-content-center">
                <Image
                    v-for="n in 20"
                    :key="n"
                    class="m-2"
                    src="https://placehold.co/100x100"
                />
              </div>
            </div>
          </div>
          <!-- Content goes here -->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "@/assets/devices.min.css";

.iphone-preview {
}
</style>
