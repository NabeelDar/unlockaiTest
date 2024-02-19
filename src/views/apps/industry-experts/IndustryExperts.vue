<template>
  <div class="card">
    <div class="mb-4">
      <h3 class="font-bold text-5xl text-900">AI Industry Experts</h3>
      <p class="text-500 font-bold">Contact AI for specific niches.</p>
    </div>

    <div class="p-inputgroup">
      <InputText v-model="searchText" placeholder="Search by niche"/>
      <Button icon="pi pi-search"/>
    </div>

    <div class="expert-grid mt-4">
      <!-- Loop through the experts and create cards -->
      <router-link v-for="(expert, index) in filteredExperts" :key="index" :to="expert.route">
        <div class="expertcard card shadow-2">
          <div class="p-card text-center">
            <div class="profile mb-4">
              <img :src="expert.imgPath" alt="Profile">
            </div>
            <p class="font-semibold text-xl">{{ expert.name }}</p>
          </div>
        </div>

      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Fuse from 'fuse.js';

// List of AI industry experts
const aiExperts = [
  {name: "Social Media Expert", route: "/ai-industry-experts/social-media", imgPath: "demo/images/headshots/Social Media Expert.png"},
  {name: "Finance Expert", route: "/ai-industry-experts/finance", imgPath: "demo/images/headshots/Finance Expert.png"},
  {name: "Nutritionist", route: "/ai-industry-experts/nutritionist", imgPath: "demo/images/headshots/Nutritionist.png"},
  {name: "Career Counselor", route: "/ai-industry-experts/career-counselor", imgPath: "demo/images/headshots/Career Counselor.png"},
  {name: "Time Management", route: "/ai-industry-experts/time-management", imgPath: "demo/images/headshots/Time Management.png"},
  {name: "Language Tutor", route: "/ai-industry-experts/language-tutor", imgPath: "demo/images/headshots/Language Tutor.png"},
  {name: "Cybersecurity Expert", route: "/ai-industry-experts/cybersecurity", imgPath: "demo/images/headshots/Cybersecurity Expert.png"},
  {name: "Interior Designer", route: "/ai-industry-experts/interior-designer", imgPath: "demo/images/headshots/Interior Designer.png"},
  {name: "Parenting Coach", route: "/ai-industry-experts/parenting-coach", imgPath: "demo/images/headshots/Parenting Coach.png"},
  {name: "Fitness Trainer", route: "/ai-industry-experts/fitness-trainer", imgPath: "demo/images/headshots/Fitness Trainer.png"},
  {name: "Travel Advisor", route: "/ai-industry-experts/travel-advisor", imgPath: "demo/images/headshots/Travel Advisor.png"},
  {name: "Sustainability Expert", route: "/ai-industry-experts/sustainability", imgPath: "demo/images/headshots/Sustainability Expert.png"},
  {name: "Event Planner", route: "/ai-industry-experts/event-planner", imgPath: "demo/images/headshots/Event Planner.png"},
];

// Search functionality
let searchText = ref('');

// Fuse.js options for fuzzy search
const fuseOptions = {
  keys: ['name'],
  includeScore: true,
  threshold: 0.2, // Adjust the threshold as needed for the desired matching sensitivity
};

// Create the Fuse instance
const fuse = new Fuse(aiExperts, fuseOptions);


// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

// Computed property for filtered experts
const filteredExperts = computed(() => {
  const query = searchText.value;
  if (!query) return aiExperts;

  const result = fuse.search(query);
  return result.map(({ item }) => item);
});

</script>

<style lang="scss" scoped>
.expert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.expertcard {
  height: 300px;
  transition: transform 0.3s ease;
}

.expertcard:hover {
  transform: scale(1.05);
}

.profile {
  width: 150px; // Set your preferred width
  height: 150px; // Set your preferred height
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto; // Center the profile horizontally using auto margins
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

</style>
