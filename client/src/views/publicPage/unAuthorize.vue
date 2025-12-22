<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-2xl text-center p-8"
    >
      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div
          class="flex items-center justify-center w-16 h-16 rounded-full bg-red-100"
        >
          <i class="pi pi-lock text-red-500 text-3xl"></i>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-semibold text-gray-800">
        403 - Unauthorized
      </h1>

      <!-- Description -->
      <p class="text-gray-600 mt-3">
        You don’t have permission to access this page.
      </p>

      <p class="text-sm text-gray-500 mt-1">
        Please contact your administrator or go back.
      </p>

      <!-- Actions -->
      <div class="flex justify-center gap-4 mt-8">
        <button
          @click="goToDashboard"
          class="flex items-center gap-2 px-5 py-2.5
                 bg-indigo-600 hover:bg-indigo-700
                 text-white text-sm font-medium
                 rounded-lg transition"
        >
          <i class="pi pi-home"></i>
          Dashboard
        </button>

        <button
          @click="goToLogin"
          class="flex items-center gap-2 px-5 py-2.5
                 border border-gray-300
                 text-gray-700 text-sm font-medium
                 rounded-lg hover:bg-gray-100
                 transition"
        >
          <i class="pi pi-sign-in"></i>
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const goToLogin = () => {
  router.push({ name: 'login' });
};

const goToDashboard = () => {
  if (authStore.userRole ==='Super-Admin') {
    router.push({ name: 'super-admin-dashboard' });
  } else if (authStore.userRole === 'Admin') {
    router.push({ name: 'admin-dashboard' });
  } else {
    router.push({ name: 'user-dashboard' });
  }
};
</script>
