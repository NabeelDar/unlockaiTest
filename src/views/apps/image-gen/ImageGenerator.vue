<script setup>
import {onMounted, ref} from "vue";

// import base64 from "../Helper"

const inputText = ref();
const selectedImage = ref(null);
const isLoading = ref(false);
const resultImages = ref([]);

const apiEndpoint = "https://k75hg4f709.execute-api.us-east-1.amazonaws.com/default/QueryRDS";

const postRequest = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

function base64ToFile(base64, filename, mimeType) {
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([int8Array], {type: mimeType});
  return new File([blob], filename, {type: mimeType, lastModified: new Date().getTime()});
}

const downloadImage = (imageUrl, imageName) => {
  fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = imageName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading the image:', error));
};

const deleteImage = async (image) => {
  const userId = sessionStorage.getItem('user_id');
  if (userId && image && image.name) {
    try {
      const response = await postRequest(apiEndpoint, {
        action: 'delete',
        user_id: userId,
        file_name: image.name
      });

      // Check if the deletion was successful
      if (response && response.message === "Image deleted successfully") {
        // Find the image in the array and remove it
        const index = resultImages.value.findIndex(img => img.name === image.name);
        if (index !== -1) {
          resultImages.value.splice(index, 1);
        }
      } else {
        // Handle the case where deletion was not successful
        console.error('Error deleting the image:', response.error || 'Deletion failed');
      }
    } catch (error) {
      console.error('Error deleting the image:', error);
    }
  }
};


const generateImage = async () => {
  isLoading.value = true;
  resultImages.value.unshift({
    image: null,
    name: "Generating...",
    loading: true
  });

  // Generate the image
  try {
    const generatedImage = await postRequest('https://vsvk3301gj.execute-api.us-east-1.amazonaws.com/default/Generate-Img', {prompt: inputText.value});

    if (generatedImage && generatedImage.image_base64) {

      const userId = sessionStorage.getItem('user_id');
      if (userId) {
        // Get the presigned URL for upload
        const presignedData = await postRequest(apiEndpoint, {
          action: 'generate_presigned_url',
          file_name: inputText.value + ".png"
        });

        if (presignedData && presignedData.url) {
          // Upload the file to S3
          const filename = inputText.value + ".png"; // Create a filename for the image
          const imageFile = base64ToFile(generatedImage.image_base64, filename, 'image/png');

          const uploadResponse = await fetch(presignedData.url, {
            method: 'PUT',
            body: imageFile, // Assuming the generated image is a file
            headers: {'Content-Type': 'image/png'}
          });

          if (uploadResponse.ok) {
            // Store image metadata in the database
            await postRequest(apiEndpoint, {
              action: 'store_metadata',
              user_id: userId,
              created_at: new Date().toISOString(),
              file_name: inputText.value + ".png",
              image_file_path: presignedData.url.split('?')[0] // S3 file URL
            });

            // Update the UI with the new image
            resultImages.value[0] = {
              image: presignedData.url.split('?')[0],
              name: inputText.value,
              loading: false
            };
          } else {
            console.error('Failed to upload image to S3');
            resultImages.value.shift();
          }
        } else {
          console.error('Failed to get presigned URL');
          resultImages.value.shift();
        }
      }
    } else {
      console.error('Error generating image');
      resultImages.value.shift();
    }
  } catch (error) {
    console.error('Error in generating image:', error);
    resultImages.value.shift();
  }
  isLoading.value = false;
};


onMounted(async () => {
  const userId = sessionStorage.getItem('user_id');
  if (userId) {
    const imagesData = await postRequest(apiEndpoint, {action: 'retrieve', user_id: userId});
    if (imagesData && imagesData.images) {
      resultImages.value = imagesData.images;
    }
  }
});

const viewImage = (image) => {
  selectedImage.value = image;
};

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>
<template>
  <div class="card">
    <div class="mb-4">
      <h3 class="font-bold text-5xl text-900">AI Image Generator</h3>
      <p class="text-500 font-bold">
        Unleash your creativity with our AI Image Generator - produce stunning visuals!
        in seconds
      </p>
    </div>

    <div class="card shadow-2">
      <div class="grid">
        <div class="col-12 field">
          <div class="flex justify-content-between">
            <label
                class="text-900 text-xl font-semibold mb-3 flex align-items-baseline"
                for="ideaInput"
            >I want to create...
            </label>

            3000 images
          </div>

          <InputGroup class="input-group flex align-items-center">
            <InputText
                id="ideaInput"
                v-model="inputText"
                autoResize
                class="flex-grow-1 w-full"
                filled
                placeholder="A delicious looking pizza..."
            />

            <Button
                :disabled="isLoading"
                class="ml-2 pr-5"
                icon="pi pi-arrow-right"
                iconPos="right"
                label="Generate"
                @click="generateImage"
            />
          </InputGroup>
        </div>
      </div>
    </div>

    <div class="card shadow-2">
      <h5>Result</h5>

      <Carousel
          :numScroll="5"
          :numVisible="5"
          :responsiveOptions="responsiveOptions"
          :value="resultImages"
      >
        <template #item="slotProps">
          <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
            <div class="mb-3">
              <!-- Show spinner when loading -->
              <div v-if="slotProps.data.loading" class="loading-spinner"></div>

              <!-- Show image when not loading -->
              <img
                  v-else
                  :alt="slotProps.data.name"
                  :src="slotProps.data.image"
                  class="shadow-2"
                  height="200"
                  width="200"
              />
            </div>
            <div>
              <p>{{ slotProps.data.name }}</p>
              <div class="mt-5 flex align-items-center justify-content-center gap-2">
                <Button class="w-2rem h-2rem" icon="pi pi-eye" outlined rounded
                        @click="() => viewImage(slotProps.data.image)"/>
                <Button class="w-2rem h-2rem" icon="pi pi-download" outlined rounded
                        @click="() => downloadImage(slotProps.data.image, `UnlockAI-${slotProps.data.name}.png`)"/>
                <Button class="w-2rem h-2rem" icon="pi pi-trash" outlined rounded
                        @click="() => deleteImage(slotProps.data)"/>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>

  <!-- Modal for Viewing Images -->
  <div v-if="selectedImage" class="modal" @click="selectedImage = null">
    <img :src="selectedImage" class="enlarged-image"/>
  </div>
</template>

<style lang="scss" scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(231, 51, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #1e78ff;
  width: 200px;
  height: 200px;
  animation: spin 1.2s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.enlarged-image {
  max-width: 90%;
  max-height: 90%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>