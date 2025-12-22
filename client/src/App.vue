<script lang="ts" setup>
import verticalHeader from '@/components/verticalHeader.vue'
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <verticalHeader />

    <!-- Main Content -->
    <main class="flex-1 p-6 overflow-auto">
      <router-view />
    </main>
  </div>
</template>
