<template>
<div class="container">
  <Toast/>

  <div class="card">
    <div class="mb-4">
      <h3 class="font-bold text-5xl text-900">AI Photo Editor</h3>
      <p class="text-500 font-bold">Upload your photo, select effects below, and click generate to edit!</p>
    </div>

    <div class="flex flex-row gap-5">
      <div class="card shadow-2 flex-1 mb-0">
        <div class="image-preview h-30rem bg-black-alpha-10 mb-4" :style="{ backgroundImage: `url(public/demo/images/ai-photo-editor/upload-image.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }">
              <img v-if="uploadedImage" :src="uploadedImage" alt="Uploaded Image"
                   class="uploadedImage w-full h-full" style="object-fit: cover"/>
            </div>
            <div class="flex justify-content-center">
              <FileUpload
                  class="bg-gray-200"
                  customUpload
                  mode="basic"
                  name="demo[]"
                  choose-label="Upload"
                  :auto="true"
                  @select="onFileSelected"
              />
              <Button
                  class="ml-2"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  label="Generate"
                  @click="processFile"
              />
            </div>
      </div>
      <div class="card shadow-2 flex-1">
          <div class="image-output h-30rem bg-black-alpha-10 mb-4">
            <img v-if="editedImages" :src="editedImages" alt="Uploaded Image"
                 class="uploadedImage w-full h-full" style="object-fit: cover"/>
          </div>
        <div class="flex justify-content-between align-items-center">
          <Button
              class="mb-0"
              label="⬇️ Download"
              @click="downloadImage(editedImages)"
          />
          <h4 class="text-center m-0">Generated Images: 0/15</h4>

        </div>
      </div>
    </div>
  </div>


    <div class="card">
      <div class="font-bold text-3xl text-900 mb-4">Presets:</div>
      <div class="card shadow-2 flex justify-content-evenly">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>

      </div>
    <div class="card flex-column">
      <div class="font-bold text-3xl text-900 mb-4">Advanced FX:</div>

      <div v-for="(value, key) in effectsInfo.effects" :key="key" class="card shadow-2 flex-column">
        <div class="font-bold text-2xl text-700">{{ value.title }}:</div>
        <div class="flex justify-content-between">
          <div v-for="number in effectsInfo.range + 1" :key="number">
            {{ number - 1 }}
          </div>
        </div>
        <input v-model="value.value" :max="effectsInfo.range" min="0" type="range" class="w-full"/>
      </div>
    </div>
</div>

</template>

<script setup>
import {ref} from 'vue';
import {useToast} from "primevue/usetoast";

const aiLabApiKey = "ndSciGrFTV6MkJx36Q49gwL5vrx7jqF97DeWaBKJEIihOfHbm8qtRRIuDAMG1CSy";

let file = ref(null);
const toast = useToast();
const uploadedImage = ref(null);
const editedImages = ref("");
const effectsInfo = ref({
  range: 5,
  effects: {
    makeup: {title: "Makeup", value: 0},
    skinSmooth: {title: "Skin Smoothing", value: 0},
  }
});

const uploadImage = (file) => {
  console.log('Received file:', file); // Debugging line to inspect the file object

  if (!file) {
    console.log('No file provided for upload');
    return;
  }

  // Additional check to ensure 'file' is of the correct type
  if (!(file instanceof File)) {
    console.error('The provided file is not a Blob or File object');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.value = e.target.result;
    console.log("Image loaded: ", uploadedImage.value);
  };
  reader.onerror = () => {
    console.error('Error reading file');
  };
  reader.readAsDataURL(file);
};


const onFileSelected = (event) => {

  if (event.files && event.files.length > 0) {
    file = event.files[0];
  } else {
    toast.add({
      severity: "warn",
      summary: "No file",
      detail: "No file was selected.",
      life: 3000,
    });
    return;
  }
  if (file.size > 6 * 1024 * 1024) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "File is too large. Please upload files smaller than 6MB.",
      life: 5000,
    });
    return;
  }
  if (!(file instanceof File)) {
    console.error('FILE SECLECTED IS NOT A FILE');
    return;
  } else {
    console.log("FILE IS BEING PASSED!!!");
  }
  uploadImage(file);
};

const processFile = async () => {
  if (!uploadedImage.value) {
    toast.add({
      severity: "warn",
      summary: "No Image",
      detail: "Please upload an image before generating.",
      life: 3000,
    });
    return;
  }

  toast.add({
    severity: "info",
    summary: "Generating Image",
    detail: "Give AI a sec to edit your image...",
    life: 5000,
  });


  const formData = new FormData();
  formData.append('image', file, "file");
  // Add additional parameters here as needed
  formData.append('sharp', 0.1);
  formData.append('smooth', 1.0);
  formData.append('white', 0);


  try {
    //POST api call for smoothing
    const response = await fetch('https://www.ailabapi.com/api/portrait/effects/face-beauty', {
      method: 'POST',
      headers: {
        'ailabapi-api-key': aiLabApiKey, // Include the API key in the request headers
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    const imageResponse = await fetch(result.data.image_url);
    if (!imageResponse.ok) {
      throw new Error(`HTTP error! status: ${imageResponse.status}`);
    }
    const imageBlob = await imageResponse.blob();


    const formData2 = new FormData();
    formData2.append('image', imageBlob, "file");
    // Add additional parameters here as needed
    formData2.append('resource_type', 1.0);
    formData2.append('strength', 1.0);

    //POST api call for makeup
    const response2 = await fetch('https://www.ailabapi.com/api/portrait/effects/face-makeup', {
      method: 'POST',
      headers: {
        'ailabapi-api-key': aiLabApiKey, // Include the API key in the request headers
      },
      body: formData2,
    });

    const result2 = await response2.json();

    console.log("Here is result 2: ")
    console.log(result2)

    editedImages.value = result2.data.image_url;
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Enjoy your new pic!",
      life: 5000,
    });
  } catch (error) {
    console.error('Error processing file:', error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Encountered an issue while generating.",
      life: 3000,
    });  }

};

const downloadImage = async (editedImage) => {
  const imageUrl = editedImage.value;
  if (!imageUrl) {
    toast.add({
      severity: "warn",
      summary: "No File",
      detail: "There is no generated image.",
      life: 3000,
    });
    return;
  }

  try {
    // Fetch the image using a proxy or server endpoint
    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'ailabapi-api-key': aiLabApiKey, // Include the API key in the request headers
      },
    });
    // Convert the response to a blob
    const blob = await response.blob();

    // Create a blob URL and initiate the download
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'downloaded_image.jpg';
    anchor.click();

    // Release the blob URL
    window.URL.revokeObjectURL(url);
    toast.add({
      severity: "success",
      summary: "Download Success!",
      detail: "Your image has been downloaded.",
      life: 3000,
    });

  } catch (error) {
    console.error('Error downloading image:', error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Encountered an issue when downloading generated image from server.",
      life: 3000,
    });
  }
};

</script>

<style scoped>

</style>