<script setup>
import {computed, ref} from "vue";
import axios from 'axios';

// Refs for your Vue.js data properties
const inputText = ref('');
const audioSrc = ref('');

const generateVoiceover = async () => {
  try {
    const apiResponse = await axios.post('https://c13dlay9sl.execute-api.us-east-1.amazonaws.com/GenerateAudio', {
      modelId: 'eleven_multilingual_v2', // Adjust as needed
      voiceId: selectedVoice.value,
      text: inputText.value
    }, {
      responseType: 'arraybuffer'  // Handle binary data
    });

    if (apiResponse.data) {
      const audioBlob = new Blob([apiResponse.data], {type: 'audio/mpeg'});
      audioSrc.value = URL.createObjectURL(audioBlob);
    } else {
      throw new Error('No audio data returned');
    }
  } catch (error) {
    console.error('Error generating voiceover:', error);
  }
};

const voices = ref([
  {
    "name": "Rachel",
    "voice_id": "21m00Tcm4TlvDq8ikWAM",
    "accent": "American",
    "gender": "Female",
    "description": "Calm, Young, Narration"
  },
  {
    "name": "Drew",
    "voice_id": "29vD33N1CtxCmqQRPOHJ",
    "accent": "American",
    "gender": "Male",
    "description": "Well-rounded, Middle aged, News"
  },
  {
    "name": "Clyde",
    "voice_id": "2EiwWnXFnvU5JabPnv8n",
    "accent": "American",
    "gender": "Male",
    "description": "War veteran, Middle aged, Video games"
  },
  {
    "name": "Paul",
    "voice_id": "5Q0t7uMcjvnagumLfvZi",
    "accent": "American",
    "gender": "Male",
    "description": "Ground reporter, Middle aged, News"
  },
  {
    "name": "Domi",
    "voice_id": "AZnzlk1XvdvUeBnXmlld",
    "accent": "American",
    "gender": "Female",
    "description": "Strong, Young, Narration"
  },
  {
    "name": "Dave",
    "voice_id": "CYw3kZ02Hs0563khs1Fj",
    "accent": "British-essex",
    "gender": "Male",
    "description": "Conversational, Young, Video games"
  },
  {
    "name": "Fin",
    "voice_id": "D38z5RcWu1voky8WS1ja",
    "accent": "Irish",
    "gender": "Male",
    "description": "Sailor, Old, Video games"
  },
  {
    "name": "Sarah",
    "voice_id": "EXAVITQu4vr4xnSDxMaL",
    "accent": "American",
    "gender": "Female",
    "description": "Soft, Young, News"
  },
  {
    "name": "Antoni",
    "voice_id": "ErXwobaYiN019PkySvjV",
    "accent": "American",
    "gender": "Male",
    "description": "Well-rounded, Young, Narration"
  },
  {
    "name": "Thomas",
    "voice_id": "GBv7mTt0atIp3Br8iCZE",
    "accent": "American",
    "gender": "Male",
    "description": "Calm, Young, Meditation"
  },
  {
    "name": "Charlie",
    "voice_id": "IKne3meq5aSn9XLyUdCD",
    "accent": "Australian",
    "gender": "Male",
    "description": "Casual, Middle aged, Conversational"
  },
  {
    "name": "George",
    "voice_id": "JBFqnCBsd6RMkjVDRZzb",
    "accent": "British",
    "gender": "Male",
    "description": "Raspy, Middle aged, Narration"
  },
  {
    "name": "Emily",
    "voice_id": "LcfcDJNUP1GQjkzn1xUU",
    "accent": "American",
    "gender": "Female",
    "description": "Calm, Young, Meditation"
  },
  {
    "name": "Elli",
    "voice_id": "MF3mGyEYCl7XYWbV9V6O",
    "accent": "American",
    "gender": "Female",
    "description": "Emotional, Young, Narration"
  },
  {
    "name": "Callum",
    "voice_id": "N2lVS1w4EtoT3dr4eOWO",
    "accent": "American",
    "gender": "Male",
    "description": "Hoarse, Middle aged, Video games"
  },
  {
    "name": "Patrick",
    "voice_id": "ODq5zmih8GrVes37Dizd",
    "accent": "American",
    "gender": "Male",
    "description": "Shouty, Middle aged, Video games"
  },
  {
    "name": "Harry",
    "voice_id": "SOYHLrjzK2X1ezoPC6cr",
    "accent": "American",
    "gender": "Male",
    "description": "Anxious, Young, Video games"
  },
  {
    "name": "Dorothy",
    "voice_id": "ThT5KcBeYPX3keUQqHPh",
    "accent": "British",
    "gender": "Female",
    "description": "Pleasant, Young, Children's stories"
  },
  {
    "name": "Josh",
    "voice_id": "TxGEqnHWrfWFTfGW9XjX",
    "accent": "American",
    "gender": "Male",
    "description": "Deep, Young, Narration"
  },
  {
    "name": "Arnold",
    "voice_id": "VR6AewLTigWG4xSOukaG",
    "accent": "American",
    "gender": "Male",
    "description": "Crisp, Middle aged, Narration"
  },
  {
    "name": "Charlotte",
    "voice_id": "XB0fDUnXU5powFXDhCwa",
    "accent": "English-swedish",
    "gender": "Female",
    "description": "Seductive, Middle aged, Video games"
  },
  {
    "name": "Matilda",
    "voice_id": "XrExE9yKIg1WjnnlVkGX",
    "accent": "American",
    "gender": "Female",
    "description": "Warm, Young, Audiobook"
  },
  {
    "name": "James",
    "voice_id": "ZQe5CZNOzWyzPSCn5a3c",
    "accent": "Australian",
    "gender": "Male",
    "description": "Calm , Old, News"
  },
  {
    "name": "Jeremy",
    "voice_id": "bVMeCyTHy58xNoL34h3p",
    "accent": "American-irish",
    "gender": "Male",
    "description": "Excited, Young, Narration"
  },
  {
    "name": "Gigi",
    "voice_id": "jBpfuIE2acCO8z3wKNLl",
    "accent": "American",
    "gender": "Female",
    "description": "Childlish, Young, Animation"
  },
  {
    "name": "Daniel",
    "voice_id": "onwK4e9ZLuTAKqWW03F9",
    "accent": "British",
    "gender": "Male",
    "description": "Deep, Middle aged, News presenter"
  },
  {
    "name": "Lily",
    "voice_id": "pFZP5JQG7iQjIQuC4Bku",
    "accent": "British",
    "gender": "Female",
    "description": "Raspy, Middle aged, Narration"
  },
  {
    "name": "Serena",
    "voice_id": "pMsXgVXv3BLzUgSXRplE",
    "accent": "American",
    "gender": "Female",
    "description": "Pleasant, Middle aged, Interactive"
  },
  {
    "name": "Adam",
    "voice_id": "pNInz6obpgDQGcFmaJgB",
    "accent": "American",
    "gender": "Male",
    "description": "Deep, Middle aged, Narration"
  },
  {
    "name": "Nicole",
    "voice_id": "piTKgcLEGmPE4e6mEKli",
    "accent": "American",
    "gender": "Female",
    "description": "Whisper, Young, Audiobook"
  },
  {
    "name": "Bill",
    "voice_id": "pqHfZKP75CvOlQylNhV4",
    "accent": "American",
    "gender": "Male",
    "description": "Strong, Middle aged, Documentary"
  },
  {
    "name": "Jessie",
    "voice_id": "t0jbNlBVZ17f02VDIeMI",
    "accent": "American",
    "gender": "Male",
    "description": "Raspy , Old, Video games"
  },
  {
    "name": "Sam",
    "voice_id": "yoZ06aMxZJJ28mfd3POQ",
    "accent": "American",
    "gender": "Male",
    "description": "Raspy, Young, Narration"
  },
  {
    "name": "Glinda",
    "voice_id": "z9fAnlkpzviPz146aGWa",
    "accent": "American",
    "gender": "Female",
    "description": "Witch, Middle aged, Video games"
  },
  {
    "name": "Giovanni",
    "voice_id": "zcAOhNBS3c14rBihAFp1",
    "accent": "English-italian",
    "gender": "Male",
    "description": "Foreigner, Young, Audiobook"
  },
  {
    "name": "Mimi",
    "voice_id": "zrHiDhphv9ZnVXBqCLjz",
    "accent": "English-swedish",
    "gender": "Female",
    "description": "Childish, Young, Animation"
  }
]);

const selectedVoice = ref(voices.value[0].voice_id);
const voiceOptions = computed(() => {
  return voices.value.map(voice => ({
    label: `${voice.name} (${voice.accent}, ${voice.gender})`,
    value: voice.voice_id
  }));
});

const selectedLanguage = ref("English");

const selectedPace = ref("Very slow");
const selectedPause = ref("1s");
const selectedSpeech = ref("Say as");

const languageOptions = ["English", "French"];


const paceOptions = ["Very slow", "Fuck slow"];
const pauseOptions = ["1s", "2s"];
const speechOptions = ["Say as", "Say as 2"];


const previousVoiceovers = [
  {
    file: "goodname.voice",
    language: "English",
    voice: "Lily",
    date: "23/02/2023",
    play: "Slow",
    download: true,
  },
  {
    file: "goodname.voice",
    language: "English",
    voice: "Lily",
    date: "23/02/2023",
    play: "Slow",
    download: true,
  },
];
</script>
<template>
  <div class="card">
    <div class="mb-4">
      <h3 class="font-bold text-5xl text-900">AI Voiceover</h3>
      <p class="text-500 font-bold"> Turn your text into speech!
      </p>
    </div>

    <div class="card shadow-2">
      <h5>Untitled Document..</h5>
      <Divider/>
      <div class="grid mt-2">
        <!-- Language Dropdown -->
        <div class="col-3 field">
          <label class="text-900 font-semibold mb-0 flex align-items-baseline" for="language">
            Language
            <Button aria-label="Info" icon="pi pi-info-circle" rounded severity="secondary" text/>
          </label>
          <Dropdown id="language" v-model="selectedLanguage" :options="languageOptions"
                    class="w-full text-900 font-semibold"/>
        </div>

        <!-- Voice Dropdown -->
        <div class="col-3 field">
          <label class="text-900 font-semibold mb-0 flex align-items-baseline" for="voice">
            Voice
            <Button aria-label="Info" icon="pi pi-info-circle" rounded severity="secondary" text/>
          </label>
          <Dropdown id="voice" v-model="selectedVoice" :options="voiceOptions" class="w-full text-900 font-semibold"
                    optionLabel="label" optionValue="value"/>
        </div>

        <!-- Pace Dropdown -->
        <div class="col-3 field">
          <label class="text-900 font-semibold mb-0 flex align-items-baseline" for="pace">
            Pace
            <Button aria-label="Info" icon="pi pi-info-circle" rounded severity="secondary" text/>
          </label>
          <Dropdown id="pace" v-model="selectedPace" :options="paceOptions" class="w-full text-900 font-semibold"/>
        </div>

        <!-- Pause Dropdown -->
        <div class="col-3 field">
          <label class="text-900 font-semibold mb-0 flex align-items-baseline" for="pause">
            Pause
            <Button aria-label="Info" icon="pi pi-info-circle" rounded severity="secondary" text/>
          </label>
          <Dropdown id="pause" v-model="selectedPause" :options="pauseOptions" class="w-full text-900 font-semibold"/>
        </div>

        <!-- Speech Dropdown -->
        <div class="col-4 field">
          <label class="text-900 font-semibold mb-2 flex align-items-baseline" for="speech">
            Speeches
            <Button aria-label="Info" icon="pi pi-info-circle" rounded severity="secondary" text/>
            <Button class="border-round-sm bg-green-200 gray-500" label="Add New" size="small"/>
          </label>
          <Dropdown id="speech" v-model="selectedSpeech" :options="speechOptions"
                    class="w-full text-900 font-semibold"/>
        </div>

        <!-- Textarea for Input Text -->
        <div class="col-12 field">
          <Textarea v-model="inputText" autoResize class="w-full p-4 pt-5 text-center mb-4" filled
                    placeholder="write something..."/>
          <Button label="Generate" @click="generateVoiceover"></Button>
        </div>
      </div>
    </div>

    <!-- Section for Playing and Downloading the Voiceover -->
    <div v-if="audioSrc" class="card">
      <h5>Your Voiceover is Ready</h5>
      <audio :src="audioSrc" controls></audio>
      <Button label="Download">
        <a :href="audioSrc" download="voiceover.mp3" style="color:white">Download</a>
      </Button>
    </div>
  </div>

  <!-- Previous Voiceovers -->
  <div class="card">
    <DataTable :value="previousVoiceovers">
      <Column field="file" header="File"></Column>
      <Column field="language" header="Language"></Column>
      <Column field="voice" header="Voice"></Column>
      <Column field="date" header="Date"></Column>
      <Column field="play" header="Play"></Column>
      <Column field="action" header="Action">
        <template #body="slotProps">
          <Button label="Download"></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
/* Your existing styles */
</style>
<style lang="scss" scoped></style>
