<script lang="ts" setup>
import { ref } from 'vue'

import router from '@/router'
import { Avatar, Button, PanelMenu } from 'primevue'

const menuItems = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    // command: () => router.push({ name: 'dashboard' })
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    // command: () => router.push({ name: 'users' })
  },
  {
    label: 'Projects',
    icon: 'pi pi-briefcase',
    // command: () => router.push({ name: 'projects' })
  },
  {
    label: 'Tasks',
    icon: 'pi pi-check-square',
    // command: () => router.push({ name: 'tasks' })
  }
])

const logout = () => {
  router.push({ name: 'login' })
}
</script>

<template>
  <aside
    class="w-64 bg-white border-r shadow-sm
           sticky top-0 h-screen
           flex flex-col"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-6 py-5 border-b">
      <Avatar icon="pi pi-briefcase" size="large" shape="circle" />
      <span class="font-semibold text-gray-800 text-lg">
        Enterprise
      </span>
    </div>

    <!-- Menu -->
    <div class="flex-1 overflow-y-auto px-3 py-4">
      <PanelMenu :model="menuItems" class="border-none" />
    </div>

    <!-- Footer -->
    <div class="px-4 py-4 border-t">
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        severity="danger"
        class="w-full"
        @click="logout"
      />
    </div>
  </aside>
</template>
