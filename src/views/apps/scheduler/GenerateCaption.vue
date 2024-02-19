<template>
  <div class="card px-4 py-8 md:px-6 lg:px-8 grid">
    <!-- AI Caption Generator Section -->
    <div class="col-4">
      <h3 class="font-bold text-5xl text-900 mb-6">AI Caption Generator</h3>
      <div class="col-12 field">
        <label class="text-900 font-semibold mb-2" for="industry">Industry</label>
        <InputText
            id="industry"
            v-model="industry"
            class="w-full pl-7 text-900 font-semibold"
            placeholder="General"
            style="height: 3.5rem"
            type="text"
        />
      </div>
      <div class="col-12 field">
        <label class="text-900 font-semibold mb-2" for="tone">Tone</label>
        <Dropdown
            id="tone"
            v-model="selectedTone"
            :options="['Casual', 'Serious']"
            class="w-full pl-7 text-900 font-semibold"
            style="height: 3.5rem"
        />
      </div>
      <div class="col-12 field">
        <label class="text-900 font-semibold mb-2" for="description"
        >Describe your post</label
        >
        <Textarea
            id="description"
            v-model="description"
            class="w-full pl-7 text-900 font-semibold"
            placeholder="Post description here"
            style="height: 3.5rem"
            type="text"
        />
      </div>
      <div class="col-12 field">
        <label class="text-900 font-semibold mb-2" for="length">Length</label>
        <Dropdown
            id="length"
            v-model="selectedLength"
            :options="['Short', 'Medium', 'Long']"
            class="w-full pl-7 text-900 font-semibold"
            style="height: 3.5rem"
        />
      </div>
      <Button label="Generate Caption" @click="generateCaption"/>
    </div>
    <div class="col-8 pl-8">
      <div class="card p-4">
        <h5 class="mb-3">Your Generated Caption:</h5>
        <Textarea
            v-model="generatedCaption"
            autoResize
            class="w-full p-4 pt-5 text-center"
            filled
            placeholder="Your caption will be here"
            readonly
        />
      </div>
    </div>

    <!-- AI Hashtag Generator Section -->
    <div class="col-4">
      <h3 class="font-bold text-5xl text-900 mb-6">AI Hashtag Generator</h3>
      <div class="col-12 field">
        <label class="text-900 font-semibold mb-2" for="descriptionHashtag">Describe your post for Hashtags</label>
        <Textarea
            id="descriptionHashtag"
            v-model="descriptionForHashtags"
            class="w-full pl-7 text-900 font-semibold"
            placeholder="Brief description for hashtags"
            style="height: 3.5rem"
            type="text"
        />
      </div>
      <Button label="Generate Hashtags" @click="generateHashtags"/>
    </div>
    <div class="col-8 pl-8">
      <div class="card p-4">
        <h5 class="mb-3">Your Generated Hashtags:</h5>
        <Textarea
            v-model="generatedHashtags"
            autoResize
            class="w-full p-4 pt-5 text-center"
            filled
            placeholder="Your hashtags will be here"
            readonly
        />
      </div>
    </div>
    <div class="card p-4">
      <div class="flex justify-content-between align-items-baseline mb-2">
        <h5 class="mb-3">Your AI History:</h5>
        <Chip class="bg-green-300 text-white" label="2" severity="info"/>
      </div>
      <div>
        <div class="grid">
          <div class="col-1 flex align-items-center">
            <Button icon="pi pi-plus" rounded></Button>
          </div>
          <div class="col-11">
            <p class="mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
            </p>
            <div class="flex justify-content-end">
              <span class="font-semibold">December, 19</span>
            </div>
          </div>

          <Divider/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';

// AI Caption Generator Variables
const industry = ref('');
const description = ref('');
const selectedTone = ref('Casual');
const selectedLength = ref('Short');
const generatedCaption = ref('');

// AI Hashtag Generator Variables
const descriptionForHashtags = ref('');
const generatedHashtags = ref('');

const apiUrl = 'https://g8ahzrgyyb.execute-api.us-east-1.amazonaws.com/UnlockAI-Dev/generate-content';

// Function to generate caption
const generateCaption = async () => {
  const requestBody = {
    action: "generate_caption",
    description: description.value,
    tone: selectedTone.value,
    length: selectedLength.value,
    audience: industry.value,
    languageStyle: 'casual',
    keywords: '',
    emotionalAppeal: ''
  };

  try {
    const response = await axios.post(apiUrl, JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    generatedCaption.value = response.data.message;
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to generate caption. Please try again.');
  }
};

// Function to generate hashtags
const generateHashtags = async () => {
  const requestBody = {
    action: "generate_hashtags",
    description: descriptionForHashtags.value
  };

  try {
    const response = await axios.post(apiUrl, JSON.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    generatedHashtags.value = response.data.message;
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to generate hashtags. Please try again.');
  }
};
</script>


<style scoped></style>