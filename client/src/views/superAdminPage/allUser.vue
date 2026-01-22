<template>
  <div class="main-org-container">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center
                 rounded-xl bg-[#6366f11a] border border-[#6366f133]"
        >
          <i class="pi pi-users text-[#6366f1]"></i>
        </div>

        <h1 class="text-3xl font-bold">Users</h1>
      </div>

      <p class="mt-2 ml-13 text-gray-500">
        Manage users, roles, and access
      </p>
    </div>

    <!-- Search + Add -->
    <div class="flex items-center justify-between mb-6">
      <IconField class="w-full max-w-md">
        <InputIcon class="pi pi-search text-gray-400" />
        <InputText placeholder="Search users..." />
      </IconField>

      <Button
        label="Add User"
        icon="pi pi-plus"
        class="add-user-btn ml-4"
        @click="showCreateDialog = true"
      />
    </div>

    <!-- Stats -->
    <StatsCards :items="userStats" />

    <!-- Table -->
    <DataTable
      :value="isLoading ? skeletonRows : users"
      rowHover
      size="small"
      responsiveLayout="scroll"
    >
      <!-- Index -->
      <Column header="No.">
        <template #body="{ index }">
          <Skeleton v-if="isLoading" width="1.5rem" />
          <span v-else>{{ index + 1 }}</span>
        </template>
      </Column>

      <!-- Name -->
      <Column header="Name">
        <template #body="{ data }">
          <Skeleton v-if="isLoading" width="8rem" />
          <span v-else class="font-semibold">{{ data.name }}</span>
        </template>
      </Column>

      <!-- Email -->
      <Column field="email" header="Email" />

      <!-- Organization -->
      <Column header="Organization">
        <template #body="{ data }">
          {{ data.organization_id ?? '—' }}
        </template>
      </Column>

      <!-- Role -->
      <Column header="Role">
        <template #body="{ data }">
          <span class="capitalize">{{ data.role_id }}</span>
        </template>
      </Column>

      <!-- Status -->
      <Column header="Status">
        <template #body="{ data }">
          <span
            class="status-badge"
            :class="data.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'"
          >
            {{ data.status }}
          </span>
        </template>
      </Column>

      <!-- Dates -->
      <Column header="Created">
        <template #body="{ data }">
          {{ formatDateTime(data.created_at) }}
        </template>
      </Column>

      <Column header="Updated">
        <template #body="{ data }">
          {{ formatDateTime(data.updated_at) }}
        </template>
      </Column>

      <!-- Actions -->
      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              rounded
              size="small"
              severity="warning"
              @click="onEdit(data)"
            />

            <ToggleSwitch
              :modelValue="data.status === 'active'"
              @update:modelValue="val => onToggleStatus(data.user_id, val)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    
    <Dialog
    v-model:visible="showCreateDialog" 
    header="Add New User"
    modal
    dismissableMask
    :draggable="false"
    :closable="true"
    :style="{ width: '400px' }"
    >
     <userCreateUpdateForm></userCreateUpdateForm>
  </Dialog>
    <ConfirmDialog />
    <Toast />
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch , reactive } from 'vue'
import { useUserListQuery } from '@/api/Query/useUserListQuery'
import { useDateFormat } from '@/composables/useDateFormat'
import StatsCards from '@/components/common/StatsCards.vue'
import userCreateUpdateForm from '@/components/form/userCreateUpdateForm.vue'

import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ToggleSwitch from 'primevue/toggleswitch'
import Skeleton from 'primevue/skeleton'
import IconField from 'primevue/iconfield'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

const { formatDateTime } = useDateFormat()
const { data, isLoading , error } = useUserListQuery()

const users = computed(() => data.value?.data ?? [])

const skeletonRows = computed(() =>
  Array.from({ length: 5 }, () => ({}))
)

const userStats = computed(() => [
  { label: 'Total Users', value: users.value.length },
  {
    label: 'Active',
    value: users.value.filter(u => u.status === 'active').length,
    valueClass: 'text-green-500'
  },
  {
    label: 'Inactive',
    value: users.value.filter(u => u.status === 'inactive').length,
    valueClass: 'text-red-500'
  }
])

const showCreateDialog = ref(false)


const onEdit = (user: any) => {
  console.log('Edit user:', user)
}

const onToggleStatus = (userId: string, isActive: boolean) => {
  console.log('Toggle status:', userId, isActive)
}
</script>
<style scoped>

/* ============================
   ACTION BUTTON
============================ */
.add-user-btn.p-button {
  background-color: #6366f1;
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  font-weight: 500;
}

.add-user-btn.p-button:hover {
  background-color: #4f46e5;
}

/* ============================
   DATATABLE CONTAINER
============================ */
:deep(.p-datatable) {
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  font-family: Inter, system-ui, sans-serif;
  font-size: 14px;
  color: #374151;
}

/* ============================
   TABLE HEADER
============================ */
:deep(.p-datatable-thead > tr > th) {
  background-color: #f9fafb;
  color: #667085;
  font-size: 13px;
  font-weight: 500;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
}

/* ============================
   TABLE BODY
============================ */
:deep(.p-datatable-tbody > tr > td) {
  padding: 16px;
  vertical-align: middle;
  color: #344054;
}

/* Row hover */
:deep(.p-datatable-tbody > tr:hover) {
  background-color: #f9fafb;
}

/* Bottom row divider */
:deep(.p-datatable-tbody > tr) {
  border-bottom: 1px solid #eaecf0;
}

/* ============================
   STATUS BADGE
============================ */
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}

/* ============================
   ACTION COLUMN
============================ */
:deep(.p-datatable-tbody td:last-child) {
  text-align: center;
}

/* Pencil button */
:deep(.p-button.p-button-warning) {
  width: 32px;
  height: 32px;
  padding: 0;
}

/* ============================
   SKELETON
============================ */
:deep(.p-skeleton) {
  border-radius: 6px;
  line-height: 1;
}

</style>
