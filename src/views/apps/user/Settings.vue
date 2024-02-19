<script setup>
import {ref} from "vue";

const user = ref({
  name: "",
  surname: "",
  phone: "",
  email: "test@test.com",
  country: null,
});

const passwords = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const countryOptions = ref([
  // Populate this array with country options
  {name: "United States", code: "US"},
  {name: "Canada", code: "CA"},
  // ... other countries
]);

const saveSettings = () => {
  // TODO: Implement save settings logic
};
</script>
<template>
  <div class="card">
    <div class="mb-4">
      <h3 class="font-bold text-5xl text-900">Settings</h3>
      <!--      <p class="text-500 font-bold">Modify your experience</p>-->
    </div>
    <div class="flex justify-content-center">
      <div class="flex flex-column max-w-30rem">
        <!-- Avatar Upload -->
        <div class="field">
          <label class="mb-2 flex align-items-baseline" for="avatar">Avatar</label>
          <FileUpload id="avatar" accept="image/*" class="" mode="basic"/>
        </div>

        <!-- Name Input -->
        <div class="field">
          <label class="mb-2 flex align-items-baseline" for="name">Name</label>
          <InputText
              id="name"
              v-model="user.name"
              class="w-full"
              placeholder="Enter your name"
          />
        </div>

        <!-- Surname Input -->
        <div class="field">
          <label class="mb-2 flex align-items-baseline" for="surname">Surname</label>
          <InputText
              id="surname"
              v-model="user.surname"
              class="w-full"
              placeholder="Enter your surname"
          />
        </div>

        <!-- Phone Input -->
        <div class="field">
          <label class="mb-2 flex align-items-baseline" for="phone">Phone</label>
          <InputText
              id="phone"
              v-model="user.phone"
              class="w-full"
              placeholder="Enter your phone number"
          />
        </div>

        <!-- Email Input -->
        <div class="field">
          <label class="mb-2 flex align-items-baseline" for="email">Email</label>
          <InputText id="email" v-model="user.email" class="w-full" disabled/>
        </div>

        <!-- Country Dropdown -->
        <div class="field">
          <label class="mb-2 flex align-items-baseline" for="country">Country</label>
          <Dropdown
              id="country"
              v-model="user.country"
              :options="countryOptions"
              class="w-full"
              optionLabel="name"
              placeholder="Select your country"
          />
        </div>

        <p class="mb-2 flex align-items-baseline">Change Password</p>
        <Message>Please leave empty if you don't want to change your password.</Message>

        <!-- Password Fields -->
        <div class="field">
          <label class="mb-2 flex align-items-baseline" for="oldPassword"
          >Old Password</label
          >
          <Password
              id="oldPassword"
              v-model="passwords.oldPassword"
              :inputStyle="{ width: '100%' }"
              class="w-full"
          />
        </div>
        <div class="field">
          <label class="mb-2 flex align-items-baseline" for="newPassword"
          >New Password</label
          >
          <Password
              id="newPassword"
              v-model="passwords.newPassword"
              :inputStyle="{ width: '100%' }"
              class="w-full"
          />
        </div>
        <div class="field">
          <label class="mb-2 flex align-items-baseline" for="confirmNewPassword"
          >Confirm New Password</label
          >
          <Password
              id="confirmNewPassword"
              v-model="passwords.confirmPassword"
              :inputStyle="{ width: '100%' }"
              class="w-full"
          />
        </div>

        <!-- Save Button -->
        <Button class="mt-4" label="Save" @click="saveSettings"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
