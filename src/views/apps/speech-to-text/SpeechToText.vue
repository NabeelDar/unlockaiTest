<script setup>
import {ref} from "vue";
import {useToast} from "primevue/usetoast";

const toast = useToast();
const inputAudio = ref();
const resultSpeech = ref("This is just some example audio I recorded."); // Make resultSpeech a reactive reference
const uploadedFile = ref(null);

const onFileSelected = (event) => {
  const file = event?.target?.files[0] || event?.files[0];

  if (!file) {
    toast.add({
      severity: "warn",
      summary: "No file",
      detail: "No file was selected.",
      life: 3000,
    });
    return;
  }

  // ... existing checks for file type and size ...


  // Check if the file size is greater than 6MB
  if (file.size > 6 * 1024 * 1024) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "File is too large. Please upload files smaller than 6MB.",
      life: 5000,
    });
    return;
  }

  uploadedFile.value = file;

};

const processFile = async () => {
  if (!uploadedFile.value) {
    toast.add({
      severity: "warn",
      summary: "Warning",
      detail: "Please upload a file before generating.",
      life: 3000,
    });
    return;
  }

  const base64 = await toBase64(uploadedFile.value);
  console.log("Base64 String:", base64); // Log the base64 string for debugging

  // Construct the request body in the correct format

  fetch('https://0xqrgwjpj8.execute-api.us-east-1.amazonaws.com/Speech-to-text', {
    method: 'POST',
    body: String(base64),  // Send the correctly structured data
    headers: {
      'Content-Type': 'application/json'
    }
  })
      .then(response => response.json())
      .then(data => {
        resultSpeech.value = data.transcript;  // Update the transcription result
      })
      .catch(error => {
        console.error('Error:', error);
      });
};


function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);  // Split to get the base64 part
    reader.onerror = error => reject(error);
  });
}

</script>
<template>
  <div class="card">
    <div class="mb-4">
      <h3 class="font-bold text-5xl text-900">AI Speech to Text</h3>
      <p class="text-500 font-bold">
        Generate custom texts from speech.</p>
    </div>

    <div class="card shadow-2">
      <div class="grid">
        <div class="col-12 field">
          <div class="flex justify-content-between">
            <label class="text-400 mb-3 flex align-items-baseline" for="Explain idea"
            >Upload an Audio File (mp3, mp4, mpeg, mpga, mp4a, wav and webnm) (Max:
              25mb)
            </label>
          </div>

          <InputGroup class="flex align-items-center">
            <Toast/>
            <FileUpload
                :maxFileSize="6 * 1024 * 1024"
                accept="audio/*"
                class="bg-gray-200"
                customUpload
                mode="basic"
                name="demo[]"
                @select="onFileSelected"
            />
            <Button
                class="ml-2"
                icon="pi pi-arrow-right"
                iconPos="right"
                label="Generate"
                @click="processFile"
            />
          </InputGroup>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <h5>Result</h5>
    <Textarea v-model="resultSpeech" :autoResize="true" class="w-full" rows="5"/>
  </div>
</template>

<style lang="scss" scoped></style>
