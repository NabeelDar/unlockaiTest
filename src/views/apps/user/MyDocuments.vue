<script setup>
import {ref} from "vue";

const previousVoiceovers = [
  {
    name: "A beautiful image cover for a rock band",
    type: "AI Image Generator",
    date: "23/02/2023",
    download: true,
  },
  {
    name: "We discover Jupiter together",
    type: "AI Voiceover",
    date: "23/02/2023",
    download: true,
  },
  {
    name: "Social Media Expert - how to write tags",
    type: "AI Expert Chat",
    date: "23/02/2023",
    download: true,
  },
  {
    name: "This is sample audio generated from a file",
    type: "AI Speech to Text",
    date: "23/02/2023",
    download: true,
    favourite: true,
  },
];
const formatLink = (str) => {
  return str.toLowerCase().replace(/\s+/g, "-");
};

const isSpeechToTextEditVisible = ref(false);
</script>
<template>
  <div class="card">
    <div class="mb-4">
      <h3 class="font-bold text-5xl text-900">My Documents</h3>
      <p class="text-500 font-bold">View all activity.</p>
    </div>

    <div class="card shadow-2">
      <DataTable :value="previousVoiceovers">
        <Column field="name" header="Name" sortable style="width: 40%">
          <template #body="slotProps">
            <a
                v-if="slotProps.data.type === 'AI Speech to Text'"
                href="#"
                @click="isSpeechToTextEditVisible = true"
            >
              {{ slotProps.data.name }}
            </a>
            <router-link v-else :to="formatLink(slotProps.data.type)">{{
                slotProps.data.name
              }}
            </router-link>

            <Dialog
                v-model:visible="isSpeechToTextEditVisible"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
                :style="{ width: '50rem' }"
                header="Caption and Hashtag Generator"
                modal
            >
              <Editor v-model="slotProps.data.name" editorStyle="height: 320px"/>
            </Dialog>
          </template>
        </Column>
        <Column field="type" header="Type" sortable></Column>
        <Column field="date" header="Date" sortable></Column>
        <Column field="action" header="Action">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button
                  :outlined="!slotProps.data.favourite"
                  icon="pi pi-star"
                  rounded
                  @click="slotProps.data.favourite = !slotProps.data.favourite"
              ></Button>
              <Button icon="pi pi-times" outlined rounded></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
