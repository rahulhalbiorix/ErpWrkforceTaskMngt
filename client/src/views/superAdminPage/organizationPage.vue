<template>
<div class="main-org-container">
<div class="mb-8">

  <!-- Header row -->
  <div class="flex items-center gap-3">
    <div
      class="flex h-10 w-10 items-center justify-center
             rounded-xl bg-[#2a9d901a] border  border-[#2a9d9033]"
    >
      <i class="pi pi-building text-base text-[#2a9d90]" ></i>
    </div>

    <h1 class="text-3xl font-bold">
      Organizations
    </h1>
  </div>

  <!-- Subtitle -->
  <p class="mt-2 ml-13 text-gray-500">
    Manage your organizations and their settings
  </p>

</div>
<div class="flex items-center justify-between mb-6">

  <!-- Search -->
  <IconField class="w-full max-w-md">
    <InputIcon class="pi pi-search text-gray-400" />
    <InputText
      placeholder="Search organizations..."
      class="w-full"
    />
  </IconField>

  <!-- Add Button -->
  <Button
    label="Add Organization"
    icon="pi pi-plus"
    class="add-org-btn border-none text-white ml-4 px-5 py-2 rounded-xl"
     @click="showCreateDialog = true"
  />

</div>

<div>
 <StatsCards :items="organizationStats" />
</div>
<!-- {{ organizations }} -->

<DataTable
  :value="isLoading ? skeletonRows : organizations"
  rowHover
  responsiveLayout="scroll"
  size="small"
>

    <!-- static column for index -->
  <Column header="No.">
    <template #body="{index}">
            <Skeleton v-if="isLoading" width="1.5rem" height="1rem" />
    <span v-else>{{ index + 1 }}</span>
    </template>
  </Column>
  
  <!-- static column for name with logo -->
  <Column header="Name">
  <template #body="{ data }">
       <div class="flex items-center gap-3">
      
      <Skeleton
        v-if="isLoading"
        shape="circle"
        size="2.25rem"
      />

      <div
        v-else
        class="h-9 w-9 flex items-center justify-center
               rounded-lg bg-gray-100 overflow-hidden"
      >
        <img
          v-if="data.logo_url"
          :src="data.logo_url"
          class="h-full w-full object-contain"
        />
        <i v-else class="pi pi-building text-gray-400"></i>
      </div>

      <Skeleton
        v-if="isLoading"
        width="8rem"
        height="1rem"
      />

      <span
        v-else
        class="font-semibold text-gray-900"
      >
        {{ data.name }}
      </span>
    </div>
  </template>
</Column>


  <!-- dynmic columns -->
<Column
  v-for="col in columns"
  :key="col.field"
  :field="col.field"
  :header="col.header"
>
  <template #body="{ data }">

    <!-- Skeleton -->
    <Skeleton
      v-if="isLoading"
      width="6rem"
      height="1rem"
    />

    <!-- Date -->
    <span
      v-else-if="dateFields.includes(col.field)"
    >
      {{ formatDateTime(data[col.field]) }}
    </span>

    <!-- Domain -->
    <span
      v-else-if="col.field === 'domain'"
      class="flex items-center gap-2"
    >
      <i class="pi pi-globe text-sm"></i>
      {{ data[col.field] }}
    </span>

    <!-- Status -->
    <span
      v-else-if="col.field === 'status'"
      :class="[
        'status-badge',
        data[col.field] === 'active'
          ? 'bg-green-100 text-green-800'
          : data[col.field] === 'pending'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-gray-100 text-gray-800'
      ]"
    >
      {{ data[col.field] }}
    </span>

    <!-- Default -->
    <span v-else>
      {{ data[col.field] }}
    </span>

  </template>
</Column>


    <!-- actions column -->
  <Column header="Actions">
     <template #body="{data}">
       <div class="flex align-center gap-2">
     
              <Skeleton v-if="isLoading" shape="circle" size="2rem" />
      <Skeleton v-if="isLoading" shape="circle" size="2rem" />
          
      <template v-else>
        <!-- Update -->
         <Button icon="pi pi-pencil" variant="outlined" rounded severity="warning"  size="small" @click="onUpdate(data)" />
        <!-- Delete -->
          <Button icon="pi pi-trash" variant="outlined" rounded severity="danger"  size="small" @click="onDelete(data)" />
      </template>

       </div>
     </template>
  </Column>
  
  </DataTable>
  
</div>


<!-- create organization dialog -->

<Dialog
  v-model:visible="showCreateDialog"
  modal
  header="Create Organization"
  :style="{ width: '420px' }"
  :closable="!isPending"
>

  <div class="flex flex-col gap-4">

    <!-- Name -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium">Organization Name</label>
      <InputText
        v-model="createForm.name"
        placeholder="Enter organization name"
      />
    </div>

    <!-- Domain -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium">Domain</label>
      <InputText
        v-model="createForm.domain"
        placeholder="example.com"
      />
    </div>
    
    <!-- Logo URL -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium">Logo URL</label>
      <InputText
        v-model="createForm.logo_url"
        placeholder="Enter logo URL"
      />
    </div>


    <!-- Status -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium">Status</label>
   <Dropdown
  v-model="createForm.status"
  :options="statusOptions"
  optionLabel="label"
  optionValue="value"
  placeholder="Select status"
/>

    </div>

  </div>

  <!-- Footer -->
  <template #footer>
    <div class="flex justify-end gap-2">
      <Button
        label="Cancel"
        text
        @click="showCreateDialog = false"
        :disabled="isPending"
      />
      <Button
        label="Create"
        icon="pi pi-check"
        :loading="isPending"
        @click="handleCreateOrganization"
      />
    </div>
  </template>
</Dialog>


</template>

<script lang="ts" setup>
import { computed, watch , ref } from "vue";
import { useOrganizationsQuery } from "@/api/Query/useOrganizationsQuery";
import { useDateFormat } from "@/composables/useDateFormat";
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import IconField from 'primevue/iconfield'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import Card from 'primevue/card'
import StatsCards from "@/components/common/StatsCards.vue";
import Skeleton from 'primevue/skeleton'
import { useOrgCreation } from "@/api/Mutation/useOrgCreation";
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import AutoComplete from 'primevue/autocomplete';


const { formatDateTime } = useDateFormat();

const { data, isLoading, error } = useOrganizationsQuery();
const { mutate , isPending  , isError  } = useOrgCreation();


const columns = [
  {field: "domain" , header: "Domain"},
  {field: "status" , header: "Status"},
  {field: "created_at" , header: "Created"},
  {field: "updated_at" , header: "Updated"},
]

const dateFields = ['created_at', 'updated_at']


const skeletonRows = computed(() =>
  Array.from({ length: 5 }, () => ({}))
)


const organizations = computed(() => {
  return data.value?.data?.data ?? [];
});


// organizations stats

const organizationStats = computed(() => [
  {
    label: 'Total Organizations',
    value: organizations.value.length
  },
  {
    label: 'Active',
    value: organizations.value.filter(o => o.status === 'active').length,
    valueClass: 'text-green-500'
  },
  {
    label: 'Pending',
    value: organizations.value.filter(o => o.status === 'Pending').length,
    valueClass: 'text-orange-500'
  }
])


/* ---------------- ACTION HANDLERS ---------------- */

const onUpdate = (row: any) => {
  console.log('Update clicked:', row)
  // call update API
}

const onDelete = (row: any) => {
  console.log('Delete clicked:', row)
  // open confirm dialog
}

//  organization creation  feature

const showCreateDialog = ref(false)

const createForm = ref({
  name: '',
  domain: '',
  logo_url: '',
  status:'active'
})


const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' }
]


const handleCreateOrganization = () => {
  console.log('Creating organization with data:', createForm.value)

  mutate(createForm.value, {
    onSuccess: (data) => {
      console.log('Organization created successfully:', data)
      showCreateDialog.value = false
      // reset form
      createForm.value = {
        name: '',
        domain: '',
        logo_url: '',
        status:'active'
      }
    },
    onError: (error) => {
      console.error('Error creating organization:', error)
    }
  })
}

</script>

<style scoped>

.add-org-btn.p-button{
  background-color: #2a9d90;
}

.add-org-btn.p-button:hover{
  background-color: #138d75;
}

/* Table wrapper */
:deep(.p-datatable-table-container) {
  border-radius: 16px;
  overflow: hidden;
}

/* Table base */
:deep(.p-datatable) {
  font-family: Inter, system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: #374151;
}

/* Header cells */
:deep(.p-datatable-thead > tr > th) {
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  background-color: #f9fafb;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
}

/* Body cells */
:deep(.p-datatable-tbody > tr > td) {
  padding: 12px 14px;
  font-size: 14px;
  line-height: 1.5;
  vertical-align: middle;
  white-space: nowrap;
}

:deep(.p-datatable i) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

:deep(.p-skeleton) {
  line-height: 1;
  margin: 0;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}


</style>