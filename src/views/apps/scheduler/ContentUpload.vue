<script setup>
import {onMounted, ref} from "vue";
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

const tags = ref(["Software", "Web"]);
const fileUploaderRef = ref(null);
const uploadFiles = ref([]);
const userLoggedIn = ref(false);
const oldPosts = ref([]); // Placeholder array for old posts
const postContent = ref('');
const accessToken = ref(localStorage.getItem('linkedin_access_code')); // Retrieve stored access token
const linkedInUserDetails = ref({});

const onChooseUploadFiles = () => {
  fileUploaderRef.value.choose();
};
const onSelectedFiles = (event) => {
  uploadFiles.value = event.files;
};
const onRemoveFile = (removeFile) => {
  uploadFiles.value = uploadFiles.value.filter((file) => file.name !== removeFile.name);
};


// Function to start the LinkedIn OAuth process
const startLinkedInOAuth = () => {
  const linkedInAuthURL = 'https://www.linkedin.com/oauth/v2/authorization';
  const state = uuidv4();
  localStorage.setItem('oauthState', state);
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    redirect_uri: "https://www.app.unlockai.xyz/scheduler",
    scope: 'w_member_social profile email openid', // Adjust scope as needed
    state: state // Use a unique state value for each auth request
  });

  window.location.href = `${linkedInAuthURL}?${params.toString()}`;
};

const fetchLinkedInProfile = async () => {
  try {
    const profileResponse = await axios.get(`https://r30tt6z7fb.execute-api.us-east-1.amazonaws.com/default/LinkedinLambda?access_token=${accessToken.value}`);
    linkedInUserDetails.value = profileResponse.data;
  } catch (error) {
    console.error('Error fetching LinkedIn profile:', error);
  }
};

const postToLinkedIn = async () => {
  if (!linkedInUserDetails.value.sub || !postContent.value) {
    console.error('User ID or Post Content is missing');
    return;
  }
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = postContent.value;
  // Extract the text content, effectively removing all HTML tags
  const plainTextContent = tempDiv.textContent || tempDiv.innerText || "";

  try {
    const response = await axios.post('https://r30tt6z7fb.execute-api.us-east-1.amazonaws.com/default/LinkedinLambda', {
      access_token: accessToken.value,
      postContent: plainTextContent,  // Plain text content
      authorURN: linkedInUserDetails.value.sub  // User's URN
    });

    if (response.status === 200) {
      console.log('Post created successfully:', response.data);
    } else {
      console.error('Failed to create post');
    }
  } catch (error) {
    console.error('Error posting to LinkedIn:', error);
  }
};

// Function to handle the OAuth callback
const handleOAuthCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  const originalState = localStorage.getItem('oauthState');

  if (code && state === originalState) {
    try {
      const tokenResponse = await axios.post('https://r30tt6z7fb.execute-api.us-east-1.amazonaws.com/default/LinkedinLambda', {
        code: code
      });

      if (tokenResponse.data.access_token) {
        accessToken.value = tokenResponse.data.access_token;
        localStorage.setItem('linkedin_access_code', accessToken.value);
        userLoggedIn.value = true;
        await fetchLinkedInProfile();
      } else {
        console.error('Failed to retrieve access token');
      }
    } catch (error) {
      console.error('Error during token exchange:', error);
    }
  }
};

// On component mount, check for OAuth callback
onMounted(() => {
  if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
    handleOAuthCallback();
  }
});

// onMounted(() => {
//   handleTiktokOAuthCallback();
// });

const startTikTokOAuth = () => {
  const tikTokAuthURL = 'https://www.tiktok.com/v2/auth/authorize/';
  const csrfState = uuidv4();
  localStorage.setItem('oauthState', csrfState);

  const params = new URLSearchParams({
    response_type: 'code',
    client_key: import.meta.env.VITE_TIKTOK_CLIENT_KEY,
    redirect_uri: import.meta.env.VITE_TIKTOK_REDIRECT_URI,
    scope: 'user.info.basic',
    state: csrfState
  });

  window.location.href = `${tikTokAuthURL}?${params.toString()}`;
};

const handleTiktokOAuthCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  const originalState = localStorage.getItem('oauthState');

  if (code && state === originalState) {
    // Call your Lambda function
    try {
      const response = await axios.get(`https://c9lf805478.execute-api.us-east-1.amazonaws.com/default/tiktokOAuth?code=${code}`);
      const data = response.data;

      if (data.access_token) {
        // Handle successful response
      } else {
        console.error('Failed to retrieve access token');
      }
    } catch (error) {
      console.error('Error during token exchange:', error
      );
    }
  }
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
    <div class="mb-4">
      <h3 class="font-bold text-5xl text-900">Scheduler</h3>
      <p class="text-500 font-bold">Create a new post.</p>
    </div>

    <div class="flex flex-column xl:flex-row">
      <div class="card shadow-2">

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
            <div v-if="userLoggedIn">
              <h3>Welcome, {{ linkedInUserDetails.name }}</h3>
              <img :src="linkedInUserDetails.picture" alt="Profile Picture">
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
              <Button label="Connect to LinkedIn" @click="startLinkedInOAuth"/>
              <Button label="Connect to TikTok" @click="startTikTokOAuth"/>
            </div>
            <div class="flex flex-column p-fluid">
              <Editor v-model="postContent" editorStyle="height: 320px" placeholder="Content description"></Editor>
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
              <Button class="flex-1" icon="pi pi-fw pi-check" label="Publish" @click="postToLinkedIn"></Button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-content-center align-items-center ml-4 mt-4">
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
                  <div v-if="userLoggedIn" class="bg-blue-50 flex flex-wrap justify-content-center">
                    <!-- Render old posts -->
                    <div v-for="post in oldPosts" :key="post.id">
                      <!-- Display each old post -->
                      <!-- Replace with actual display logic for posts -->
                    </div>
                  </div>
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
    </div>
  </div>

</template>

<style lang="scss">
@import "@/assets/devices.min.css";

.iphone-preview {
}
</style>

