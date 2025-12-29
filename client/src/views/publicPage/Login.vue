<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
    <div
      class="w-full max-w-5xl overflow-hidden rounded-3xl
             shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)]
             bg-white grid grid-cols-1 md:grid-cols-2
             transition-all duration-300"
    >

      <!-- LEFT : BRANDING -->
      <div
        class="hidden md:flex flex-col justify-center px-12
               bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500
               text-white relative overflow-hidden"
      >
        <!-- Decorative blur -->
        <div class="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div class="relative z-10 max-w-sm">
          <h1 class="flex items-center gap-4 text-2xl font-bold leading-tight">
            <span
              class="w-20 h-14 rounded-xl bg-white/20
                     flex items-center justify-center
                     backdrop-blur-md shadow-inner"
            >
              <i class="pi pi-briefcase text-2xl"></i>
            </span>
            Enterprise Workforce & Task Management System
          </h1>

          <p class="mt-4 text-sm opacity-90 leading-relaxed">
            Manage organizations, projects, and tasks in one unified platform.
          </p>

          <ul class="mt-8 space-y-4 text-sm opacity-90">
            <li class="flex items-center gap-3">
              <i class="pi pi-check-circle text-white"></i>
              Role-based access control
            </li>
            <li class="flex items-center gap-3">
              <i class="pi pi-check-circle text-white"></i>
              Secure & scalable system
            </li>
            <li class="flex items-center gap-3">
              <i class="pi pi-check-circle text-white"></i>
              Enterprise-ready architecture
            </li>
          </ul>
        </div>
      </div>

      <!-- RIGHT : Login Form -->
      <div class="flex flex-col justify-center px-8 py-12 md:px-12">
        <Card class="border-none shadow-none">
          <template #title>
            <div class="text-center mb-8">
              <h2 class="text-2xl font-semibold text-gray-900 tracking-tight">
                Welcome Back 👋
              </h2>
              <p class="text-sm text-gray-500 mt-2">
                Sign in to access your dashboard
              </p>
            </div>
          </template>

          <template #content>
            <Form
              :validation-schema="loginSchema"
              @submit="handleLogin"
              class="space-y-6"
            >
              <!-- Email -->
              <div>
                <label class="text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <Field name="email" v-slot="{ field, meta }">
                  <InputText
                    v-bind="field"
                    type="email"
                    placeholder="you@company.com"
                    class="w-full h-11 mt-2 transition-all duration-200
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    :class="{ 'p-invalid': meta.touched && meta.invalid }"
                  />
                </Field>

                <ErrorMessage
                  name="email"
                  class="text-red-500 text-xs mt-1"
                />
              </div>

              <!-- Password -->
              <div>
                <label class="text-sm font-medium text-gray-700">
                  Password
                </label>

                <Field name="password" v-slot="{ field, meta }">
                  <Password
                    v-bind="field"
                    :feedback="false"
                    toggleMask
                    placeholder="Enter your password"
                    class="w-full mt-2"
                    inputClass="w-full h-11 pr-10 transition-all duration-200
                                focus:ring-2 focus:ring-indigo-500"
                    :class="{ 'p-invalid': meta.touched && meta.invalid }"
                  />
                </Field>

                <ErrorMessage
                  name="password"
                  class="text-red-500 text-xs mt-1"
                />
              </div>

              <!-- Login Button -->
              <Button
                label="Login"
                type="submit"
                class="w-full h-11 mt-4 font-semibold tracking-wide
                       bg-indigo-600 border-none
                       hover:bg-indigo-700 hover:shadow-lg
                       active:scale-[0.98]
                       transition-all duration-200"
                :loading="isPending"
              />

              <!-- Footer -->
              <div class="pt-6 text-center text-xs text-gray-400">
                © 2025 Enterprise Workforce System
              </div>
            </Form>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useLoginMutation } from '@/api/Mutation/useLoginMutation'
import { useAuthStore } from '@/stores/authStore'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import router from '@/router'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

const loginSchema = yup.object({
    email:yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6,'Password must be at least 6 characters')
})


const store = useAuthStore();

const { mutate, isPending, isError } = useLoginMutation()


const handleLogin = (values: {email:string,password:string}) => {
    console.log('Login Data:', values);

    mutate(values, {
        onSuccess: (data) => {
            console.log('Login success:', data);
            store.setUserToken(data.data.token);
            store.setIsUserLogin(true);
            store.setUserRole(data.data.user.roleName)
            store.setUserId(data.data.user.userId)
            store.setUserName(data.data.user.userName)
            store.setUserEmail(data.data.user.email)

            if (data.data.user.roleName === 'Super-Admin') {
                router.push({ name: 'superAdminDashboard' })
            }
            else if (data.data.user.roleName === 'Admin') {
                router.push({ name: 'admin-dashboard' })
            }
            else {
                router.push({ name: 'user-dashboard' })
            }

        },
        onError: (err) => {
            console.log('Login error:', err);
        }
    })

}
</script>
