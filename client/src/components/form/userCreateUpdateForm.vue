<template>
  <form class="p-fluid space-y-4" @submit.prevent="submitForm ">
    <!-- testing purpose only -->
    <div>
     <!-- user id for updation -->
      <p class="bg-red-200 text-red-500" >User Id: {{ userId }}</p>
      <p class="bg-blue-200 text-blue-900" >Is Edited: {{ isEdited }}</p>
    </div>
    <!-- Name -->
    <div>
      <label class="block mb-1 font-medium">Name</label>
      <InputText v-model="name" class="w-full" placeholder="Enter name" />
      <small v-if="errors.name" class="text-red-500">{{ errors.name }}</small>
    </div>

    <!-- Email -->
    <div>
      <label class="block mb-1 font-medium">Email</label>
      <InputText v-model="email" type="email" class="w-full" placeholder="Enter email" />
      <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
    </div>

    <!-- Password -->
    <div>
      <label class="block mb-1 font-medium">Password</label>
      <InputText v-model="password_hash" type="password" class="w-full" placeholder="Enter password" />
      <small v-if="errors.password_hash" class="text-red-500">{{ errors.password_hash }}</small>
    </div>

    <!-- Organization -->
    <div>
      <label class="block mb-1 font-medium">Organization</label>
      <Select
        v-model="organization_id"
        :options="organizations"
        optionLabel="name"
        optionValue="organization_id"
        placeholder="Select organization"
        class="w-full"
      />
      <small v-if="errors.organization_id" class="text-red-500">
        {{ errors.organization_id }}
      </small>
    </div>

    <!-- Role -->
    <div>
      <label class="block mb-1 font-medium">Role</label>
      <Select
        v-model="role_name"
        :options="roles"
        optionLabel="label"
        optionValue="value"
        placeholder="Select role"
        class="w-full"
      />
      <small v-if="errors.role_id" class="text-red-500">{{ errors.role_id }}</small>
    </div>

    <!-- Status -->
    <div>
      <label class="block mb-1 font-medium">Status</label>
      <Select
        v-model="status"
        :options="userStatus"
        optionLabel="label"
        optionValue="value"
        placeholder="Select status"
        class="w-full"
      />
      <small v-if="errors.status" class="text-red-500">{{ errors.status }}</small>
    </div>

    <!-- Buttons -->
    <div class="flex justify-end gap-2 pt-3">
      <Button label="Cancel" severity="secondary" type="button" />
      <Button
        label="Save"
        type="submit"
        :disabled="!meta.valid"
      />
    </div>

  </form>
</template>

<script setup>
import {ref , computed , watchEffect } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { useUserUpdate } from '@/api/Mutation/useUserUpdation'
import { useUserCreation } from '@/api/Mutation/useUserCreation'
import { useOrganizationsQuery } from '@/api/Query/useOrganizationsQuery'

/* ------------------ Validation Schema ------------------ */
const schema = yup.object({
  name: yup.string().required('Name is required'),

  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  password_hash: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),

  organization_id: yup
    .string()
    .nullable()
    .required('Organization is required'),

  role_name: yup
    .string()
    .required('Role is required'),

  status: yup
    .string()
    .required('Status is required')
})


/* ------------------ Form Setup ------------------ */
const { handleSubmit, errors, meta } = useForm({
  validationSchema: schema,
  validateOnMount: true // IMPORTANT for disabling Save initially
})

const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password_hash } = useField('password_hash')
const { value: organization_id } = useField('organization_id')
const { value: role_name } = useField('role_name')
const { value: status } = useField('status')

watchEffect(() => {
  console.log('Form valid:', meta.value.valid)
})

/* ------------------ Data ------------------ */
const { data: orgdatalist } = useOrganizationsQuery()

const organizations = computed(() => {
  return orgdatalist.value?.data?.data ?? []
})

const roles = [
  { label: 'Super-Admin', value: 'Super-Admin' },
  { label: 'Admin', value: 'Admin' },
  { label: 'User', value: 'role-user' }
]

const userStatus = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
]



/* ------------------ Submit ------------------ */

const userId= ref(null);
const isEdited = ref(false)

const {mutate:updateUserData , isPending:isUpdating , isError:updateError } = useUserUpdate();
const {mutate:createUserData , isPending:isCreating , isError:createError } = useUserCreation();


const submitForm = handleSubmit((values) => {
  alert('Form submitted')
  console.log('Validated Form Data:', values)

//    ---------------- update user  ------------

// if(userId.value && isEdited.value){
//    alert('user upadte functionality is working')
// updateUserData({id:userId.value , payload:values} , {
//     onSuccess:()=>{
//         alert('user are successfully upadted.....')
//     },
//     onError:(err)=>{
//       console.log('getting error while updating user', err);
//     }
// });
// }

// ---------------------  create user  -----------
// else{
//     alert('user creation functionality is working');
// createUserData({payload:values} , {
//     onSuccess:()=>{
//         alert('user are successfully created.....')
//     },
//     onError:(err)=>{
//       console.log('getting error while creating user', err);
//     }
// });    
// }

});

</script>