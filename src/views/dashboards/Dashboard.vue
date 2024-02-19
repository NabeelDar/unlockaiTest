<template>
  <div class="card">
    <h3 class="font-bold text-5xl text-900 mb-6">Welcome, Admin.</h3>
    <div class="card">
      <div class="flex justify-content-between">
        <div class="flex flex-column">
          <h5 class="mb-6">VIP PLAN</h5>

          <router-link to="/plans">
            <Button label="Check out other plans"></Button>
          </router-link>
        </div>
        <Image src="/demo/images/dashboard/dashboard-chart.jpeg" width="500"></Image>
      </div>
    </div>
    <div class="card">
      <div class="flex justify-content-between">
        <div class="flex flex-column">
          <h5 class="mb-6">Overview</h5>
          <div class="flex flex-wrap gap-8">
            <div class="card shadow-1">
              <p class="mb-2">Words Generated</p>
              <p class="text-2xl font-semibold">12345</p>
            </div>
            <div class="card shadow-1">
              <p class="mb-2">Images Generated</p>
              <p class="text-2xl font-semibold">234</p>
            </div>
            <div class="card shadow-1 mb-5">
              <p class="mb-2">Documents Generated</p>
              <p class="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-content-between">
      <div class="flex flex-column card">
        <p class="font-semibold mb-5">Documents Activity</p>
        <!-- Document -->
        <div>
          <div class="flex justify-content-between">
            <p class="font-semibold mb-1">Caption Generated</p>
            <p class="font-semibold mb-1">In workbook</p>
          </div>
          <div class="flex justify-content-between">
            <p class="text-400 mr-4">Create custom code in seconds! Leverage our...</p>
            <p class="text-400">Dec 20, 2023</p>
          </div>
        </div>
        <!-- Document -->
        <div>
          <div class="flex justify-content-between">
            <p class="font-semibold mb-1">Caption Generated</p>
            <p class="font-semibold mb-1">In workbook</p>
          </div>
          <div class="flex justify-content-between">
            <p class="text-400 mr-4">Create custom code in seconds! Leverage our...</p>
            <p class="text-400">Dec 20, 2023</p>
          </div>
        </div>
        <!-- Document -->
        <div>
          <div class="flex justify-content-between">
            <p class="font-semibold mb-1">Caption Generated</p>
            <p class="font-semibold mb-1">In workbook</p>
          </div>
          <div class="flex justify-content-between">
            <p class="text-400 mr-4">Create custom code in seconds! Leverage our...</p>
            <p class="text-400">Dec 20, 2023</p>
          </div>
        </div>
      </div>

      <div class="flex flex-column card mb-5">
        <p class="font-semibold mb-5">Favourite Templates</p>
        <!-- Document -->
        <div>
          <div class="flex justify-content-between">
            <p class="font-semibold mb-1">AI Voiceover</p>
            <p class="font-semibold mb-1">In workbook</p>
          </div>
          <div class="flex justify-content-between">
            <p class="text-400 mr-4">Create custom code in seconds! Leverage our...</p>
            <p class="text-400">Jun 20, 2023</p>
          </div>
        </div>
        <!-- Document -->
        <div>
          <div class="flex justify-content-between">
            <p class="font-semibold mb-1">Caption Generated</p>
            <p class="font-semibold mb-1">In workbook</p>
          </div>
          <div class="flex justify-content-between">
            <p class="text-400 mr-4">Create custom code in seconds! Leverage our...</p>
            <p class="text-400">Apr 20, 2023</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
