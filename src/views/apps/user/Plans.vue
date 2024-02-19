<script setup>
import {computed, ref} from "vue";

const selectedFrequency = ref("Daily");
const frequencyOptions = ["Daily", "Monthly", "Yearly"];

const selectedFrequencyTerm = computed(() => {
  switch (selectedFrequency.value) {
    case "Daily":
      return "Day";
    case "Monthly":
      return "Month";
    case "Yearly":
      return "Year";
    default:
      return "Day";
  }
});

const planOptions = [
  {
    name: "Creator",
    description: "Best for Solo Creators",
    dailyPrice: 0.5,
    brandSelection: "1 brand (1 of each)",
    baseOptions: [
      "Unlimited Scheduled Posts",
      "AI Captions & Hashtags Generator",
      "AI Industry Experts",
      "AI Speech to Text",
      "Link in bio tool",
    ],
  },
  {
    name: "Entrepeneur",
    description: "Perfect for Entrepeneurs",
    dailyPrice: 1.0,
    brandSelection: "3 brands (3 of each)",
    baseOptions: [
      "Unlimited Scheduled Posts",
      "AI Captions & Hashtags Generator",
      "AI Industry Experts",
      "AI Speech to Text",
      "Link in bio tool",
    ],
    premiumOptions: ["24/7 Support"],
  },
  {
    name: "Influencer",
    description: "Perfect for Influencers",
    dailyPrice: 2.22,
    brandSelection: "5 brands (5 of each)",
    baseOptions: [
      "Unlimited Scheduled Posts",
      "AI Captions & Hashtags Generator",
      "AI Industry Experts",
      "AI Speech to Text",
      "Link in bio tool",
    ],
    premiumOptions: ["24/7 Support", "AI Auto Photo Editing"],
  },
  {
    name: "VIP",
    description: "Excellent for Agency Owners",
    dailyPrice: 5.55,
    brandSelection: "Add unlimited brands",
    baseOptions: [
      "Unlimited Scheduled Posts",
      "AI Captions & Hashtags Generator",
      "AI Industry Experts",
      "AI Speech to Text",
      "Link in bio tool",
    ],
    premiumOptions: [
      "24/7 Support",
      "AI Auto Photo Editing",
      "Instagram Reporting, Unlimited accounts, Unlimited reports",
    ],
  },
];

const getSelectedPrice = (price) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let cost;
  switch (selectedFrequency.value) {
    case "Daily":
      cost = price;
      break;
    case "Monthly":
      cost = price * 30;
      break;
    case "Yearly":
      cost = price * 365;
      break;
    default:
      cost = price;
      break;
  }

  return USDollar.format(cost);
};
</script>
<template>
  <div class="card">
      <h3 class="font-bold text-5xl text-900">Plans</h3>
      <p class="text-500 font-bold">Choose a Package!</p>
  </div>

    <div class="flex justify-content-center">
      <SelectButton
          v-model="selectedFrequency"
          :allowEmpty="false"
          :options="frequencyOptions"
          class="mb-4"
      />
    </div>
    <div class="flex flex-row flex-wrap gap-5 justify-content-center">
      <div
          v-for="plan in planOptions"
          :key="plan.name"
          class="card shadow-4 p-col-12 p-md-6 p-lg-4 h-55rem w-20rem flex flex-column justify-content-between"
      >
        <div>
          <h3
              :class="{
              'rainbow-title-vip': plan.name === 'VIP',
              'rainbow-title': plan.name !== 'VIP',
            }"
              class="mb-0 text-5xl"
          >
            {{ plan.name }}
          </h3>
          <p class="text-400">{{ plan.description }}</p>
          <h5 class="text-3xl">
            {{ getSelectedPrice(plan.dailyPrice) }} /{{ selectedFrequencyTerm }}
          </h5>
          <div class="card shadow-1 p-3 border-round-lg">
            <p class="text-sm mb-2">{{ plan.brandSelection }}</p>
            <div class="flex gap-1">
              <i class="pi pi-facebook"></i>
              <i class="pi pi-instagram"></i>
              <i class="pi pi-linkedin"></i>
            </div>
          </div>
          <ul class="list-none pl-0">
            <li
                v-for="option in plan.baseOptions"
                :key="option"
                class="flex align-items-start h-3rem"
            >
              <!-- <i class="pi pi-check rainbow-success text-white"></i> -->
              <Image
                  class="mr-2"
                  src="/demo/images/icons/rainbow-check.jpeg"
                  width="20"
              />
              {{ option }}
            </li>
            <li
                v-for="option in plan.premiumOptions"
                :key="option"
                class="font-semibold flex align-items-start h-3rem"
            >
              <Image
                  class="mr-2"
                  src="/demo/images/icons/rainbow-check.jpeg"
                  width="20"
              />
              {{ option }}
            </li>
          </ul>
        </div>

        <div class="flex align-items-center flex-column">
          <Button class="w-full rainbow-success mb-2" label="Choose Plan"></Button>
          <p class="text-400">No commitment, Cancel Anytime</p>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped></style>
