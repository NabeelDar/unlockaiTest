<script setup></script>
<template>
  <div class="card">
    <div class="mb-4">
      <h3 class="font-bold text-5xl text-900">Reports and Analytics</h3>
      <p class="text-500 font-bold">View analytics related to your Instagram account.</p>
    </div>

    <div class="card shadow-2">
      <div class="flex flex-column justify-content-center">
        <Image
            class="mt-5 mb-8"
            preview
            src="/demo/images/report-analytics/report-preview.png"
            width="800"
        ></Image>
        <Button class="rainbow-success" label="Generate Instagram Report"></Button>
      </div>
    </div>
  </div>
  <div class="card">
    <h5>History</h5>
    <div class="card shadow-2">
      <li class="list-none">
        <div class="flex align-items-baseline justify-content-between w-full">
          <p class="text-400">December 16th, 2023 @Nabeel.dar</p>
          <Button icon="pi pi-download" outlined rounded></Button>
        </div>
      </li>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
