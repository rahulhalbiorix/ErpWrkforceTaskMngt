<script lang="ts" setup>
import { ref, computed } from 'vue'
import router from '@/router'
import { Avatar, Button, PanelMenu } from 'primevue'
import { useAuthStore } from '@/stores/authStore'
import avatarImage from '@/assets/settings_17174989.png'


const store = useAuthStore();

const isExpanded = ref(true)

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value
}


/**
 * Menu items change label dynamically
 */
const menuItems = computed(() => [
  {
    label: isExpanded.value ? 'Dashboard' : '',
    icon: 'pi pi-home',
    command: () => router.push({ name: 'superAdminDashboard' })
  },
  {
    label: isExpanded.value ? 'Organization' : '',
    icon: 'pi pi-building',
    command: () => router.push({ name: 'superAdminOrganizations' })
  },
  {
    label: isExpanded.value ? 'Users' : '',
    icon: 'pi pi-users',
    command: () => router.push({ name: 'superAdminUsers' })
  },
  {
    label: isExpanded.value ? 'Projects' : '',
    icon: 'pi pi-folder',
    command: () => router.push({ name: 'superAdminProjects' })
  },
  {
    label: isExpanded.value ? 'Tasks' : '',
    icon: 'pi pi-check-square',
    command: () => router.push({ name: 'superAdminTasks' })
  }
])

const logout = () => {
      store.logOutUser()
  router.push({ name: 'login' })
}
</script>

<template>
  <aside
    :class="[
      'bg-white border-r shadow-sm sticky top-0 h-screen flex flex-col transition-all duration-300',
      isExpanded ? 'w-64' : 'w-20'
    ]"
  >
    
  <!-- HEADER -->
<div
  class="relative px-4 py-4 border-b"
>
  <!-- TOP BRAND -->
  <div
    class="flex items-center justify-between mb-4"
    :class="isExpanded ? '' : 'justify-center'"
  >
    <div class="flex items-center gap-2">
      <Avatar icon="pi pi-briefcase" shape="circle" />
      <span
        v-if="isExpanded"
        class="font-semibold text-gray-800"
      >
        Enterprise
      </span>
    </div>

    <Button
      :icon="isExpanded ? 'pi pi-angle-left' : 'pi pi-angle-right'"
      rounded
      text
      class="sidebar-toggle"
      :class="isExpanded ? 'toggle-expanded' : 'toggle-collapsed'"
      @click="toggleSidebar"
    />
  </div>

  <!-- PROFILE -->
  <div
    v-if="isExpanded"
    class="flex items-center gap-3"
  >
    <Avatar
      :image="avatarImage"
      shape="circle"
      size="large"
    />

    <div class="flex-1 leading-tight">
      <p class="font-medium text-gray-800 text-sm">
        {{ store.userName }}
      </p>
      <p class="text-xs text-gray-500">
        {{ store.userRole }}
      </p>
    </div>

  </div>

  <!-- COLLAPSED PROFILE -->
  <div
    v-else
    class="flex justify-center"
  >
    <Avatar
      :image="avatarImage"
      shape="circle"
      size="small"
    />
  </div>
</div>


    <!-- MENU -->
    <div class="flex-1 overflow-y-auto px-2 py-4">
      <PanelMenu
        :model="menuItems"
        class="border-none"
      />
    </div>

    <!-- FOOTER -->
    <div class="px-3 py-4 border-t">
      <Button
        :label="isExpanded ? 'Logout' : ''"
        icon="pi pi-sign-out"
        severity="danger"
        class="w-full"
        @click="logout"
      />
    </div>
  </aside>
</template>

<style scoped>

.sidebar-toggle {
  position: absolute;
  z-index: 20;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.sidebar-toggle:hover {
  transform: scale(1.05);
}

.toggle-expanded {
  right: 12px;
  top: 20px;
}

.toggle-collapsed {
  right: -14px;
  top: 20px;
}


</style>
