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
class="org-table"
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
          : 'bg-red-100 text-red-800'
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
        <!-- Toggle switch skeleton -->
      <Skeleton
        v-if="isLoading"
        width="3rem"
        height="2rem"      
        borderRadius="999px"
      />
          
      <template v-else>
        <!-- Update -->
         <Button icon="pi pi-pencil" variant="outlined" rounded severity="warning"  size="small" @click="onUpdate(data)" />
        <!-- Active / Inactive -->
          <ToggleSwitch  :disabled="isToggling" :modelValue="isActive(data.status)"@update:modelValue="val => confirmToggleStatus(data.organization_id
, val)" />
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
  dismissableMask
  :draggable="false"
   @hide="onDialogClose"
  :header="isEditMode ? 'Edit Organization' : 'Create Organization'"
  :style="{ width: '500px' }"
  :closable="!isCreating"
>

  <div class="flex flex-col gap-4">

    <!-- Name -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium">Organization Name</label>
      <InputText
        v-model="name"
        placeholder="Enter organization name"
      />
      <small v-if="errors.name" class="text-red-500 text-xs">
  {{ errors.name }}
</small>
    </div>

    <!-- Domain -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium">Domain</label>
      <InputText
        v-model="domain"
        placeholder="example.com"
      />
      <small v-if="errors.domain" class="text-red-500 text-xs">
  {{ errors.domain }}
</small>
    </div>
    
    <!-- Logo URL -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium">Logo URL</label>
      <InputText
        v-model="logo_url"
        placeholder="Enter logo URL"
      />
      <small v-if="errors.logo_url" class="text-red-500 text-xs">
  {{ errors.logo_url }}
</small>
    </div>


    <!-- Status -->
    <div class="flex flex-col gap-1">
      <label class="text-sm font-medium">Status</label>
   <Dropdown
  v-model="status"
  :options="statusOptions"
  optionLabel="label"
  optionValue="value"
  placeholder="Select status"
/>
<small v-if="errors.status" class="text-red-500 text-xs">
  {{ errors.status }}
</small>
    </div>

  </div>

  <!-- Footer -->
  <template #footer>
    <div class="flex justify-end gap-2">
      <Button
        class="text-red-300"
        label="Cancel"
        text
        @click="showCreateDialog = false"
        :disabled="isCreating"
      />
      <Button
         class="create-org-btn"
        :label="isEditMode ? 'Update Organization' : 'Create Organization'"
        icon="pi pi-check"
        :loading="isSubmitting || isCreating || isUpdating"
        @click="handleCreateOrganization"
      />
    </div>
  </template>
</Dialog>

<ConfirmDialog />
<Toast />
</template>

<script lang="ts" setup>
import { computed, watch , ref } from "vue";
import { useOrganizationsQuery } from "@/api/Query/useOrganizationsQuery";
import { useOrgCreation } from "@/api/Mutation/useOrgCreation";
import { useOrgUpdate } from "@/api/Mutation/useOrgUpdate";
import { useOrgToggleStatus } from "@/api/Mutation/useOrgToggleStatus";
import { useDateFormat } from "@/composables/useDateFormat";
import { useAppToast } from "@/composables/useAppToast";
import StatsCards from "@/components/common/StatsCards.vue";
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import IconField from 'primevue/iconfield'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import ConfirmDialog from 'primevue/confirmdialog';
import ToggleSwitch from 'primevue/toggleswitch';
import Toast from 'primevue/toast';
import { useConfirm } from "primevue/useconfirm";
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';


const confirm = useConfirm();

const { formatDateTime } = useDateFormat();

const { successToast , errorToast , infoToast , warnToast  } = useAppToast();

const { data, isLoading, error } = useOrganizationsQuery();
const { mutate:createOrganization , isPending:isCreating  , isError:createError  } = useOrgCreation();
const { mutate:toggleStatus , isPending:isToggling , isError:toggleError } = useOrgToggleStatus();
const { mutate:updateOrganization , isPending:isUpdating , isError:updateError } = useOrgUpdate();


const isActive = (status: string) => status === 'active'


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
    label: 'Inactive',
    value: organizations.value.filter(o => o.status === 'inactive').length,
    valueClass: 'text-red-500'
  }
])

//  organization creation  feature


const DialogSchema = yup.object({
  name: yup.string().required('Organization name is required'),
  domain: yup.string().required().matches(
    /^[a-z0-9.-]+\.[a-z]{2,}$/,
    'Enter a valid domain'
  ),
  logo_url: yup.string().required('Logo URL is required').url('Must be a valid URL'),
  status: yup.string().required('Status is required')
});

const showCreateDialog = ref(false)

const {
  handleSubmit,
  errors,
  resetForm,
  isSubmitting
} = useForm({
  validationSchema: DialogSchema,
  initialValues: {
    name: '',
    domain: '',
    logo_url: '',
    status: 'active'
  }
});

const { value: name } = useField<string>('name')
const { value: domain } = useField<string>('domain')
const { value: logo_url } = useField<string>('logo_url')
const { value: status } = useField<string>('status')


const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'InActive', value: 'inactive' }
]


const handleCreateOrganization = handleSubmit((values)=>{
  
  if(isEditMode.value && selectedOrgId.value){
      
    // UPDATE ORGANIZATION
    updateOrganization({orgId: selectedOrgId.value ,payload: values}, {
      onSuccess:(res)=>{
       successToast('Organization updated', res.message)
     onDialogClose();
      },
      onError:(err)=>{
        errorToast('Update failed' , err.message );
        console.error('Error updating organization:', err);
      }
    })
  }
  else{

    // CREATE ORGANIZATION
    createOrganization(values , {
      onSuccess:(res)=>{
        showCreateDialog.value = false;
        onDialogClose();
        successToast('Organization created', res.message)    
      },
      onError:(err)=>{
         errorToast('creation failed' , err.message );
        console.error('Error creating organization:', err);
      }
    })
  }
})

// Dialog box data for organization modification 

const isEditMode = ref(false)
const selectedOrgId = ref<string | null>(null)
  
  const onUpdate = (data: any) => {
    console.log('Update clicked:', data)
    
    isEditMode.value = true;
    selectedOrgId.value = data.organization_id;
    showCreateDialog.value = true

  resetForm({
    values: {
      name: data.name,
      domain: data.domain,
      logo_url: data.logo_url,
      status: data.status
    }
  });

}


// Reset and close dialog
const onDialogClose = () => {
  showCreateDialog.value = false
  resetForm({
    values: {
      name: '',
      domain: '',
      logo_url: '',
      status: 'active'
    }
  })
  isEditMode.value = false
  selectedOrgId.value = null
}


//organization status toggle handler


const confirmToggleStatus = (orgId:string , isActive:boolean) =>{

  const newStatus = isActive ? 'active' : 'inactive';

  confirm.require({
    message: `Are you sure you want to ${newStatus} this organization?`,
    header: 'Confirm Status Change',
    icon: 'pi pi-exclamation-triangle',
    accept:() => {
   
  toggleStatus({orgId, status:newStatus} , {
    onSuccess:()=>{
      console.log(`Organization ${orgId} status changed to ${newStatus}`);
      successToast('Status Updated',
  `Organization status changed to ${newStatus}`);
    },
    onError:(err)=>{
      console.error('Error toggling organization status:', err);
      warnToast('status change failed' , 'Failed to change organization status');
    }
  })
    
},
    reject: () => { 
   errorToast('Action cancelled' , 'Organization status remains unchanged');
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
  padding: 14px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #667085;
  background: #f9fafb;
}

/* Body cells */
:deep(.p-datatable-tbody > tr > td) {
    padding: 18px 16px;   /* vertical | horizontal */
  font-size: 14px;
  color: #344054;      /* soft dark */
  vertical-align: middle;
}

p-datatable-tbody > tr {
  border-bottom: 1px solid #eaecf0;
}

.p-datatable-tbody > tr:hover {
  background: #f9fafb;
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

.create-org-btn.p-button{
  background-color: #2a9d90;
}

.create-org-btn.p-button:hover{
  background-color: #138d75;
}


</style>