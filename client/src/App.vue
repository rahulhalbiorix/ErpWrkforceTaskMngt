<script lang="ts" setup>
import verticalHeader from '@/components/verticalHeader.vue'
import { useAuthStore } from './stores/authStore';

const store = useAuthStore();

</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <verticalHeader v-if="store.isUserLogin" />

    <!-- Main Content -->
    <main class="flex-1 p-6 overflow-auto">
      <router-view />
    </main>
  </div>
</template>
