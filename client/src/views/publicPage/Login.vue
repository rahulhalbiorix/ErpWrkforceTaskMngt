<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div class="w-full max-w-5xl overflow-hidden rounded-3xl
             shadow-2xl bg-white grid grid-cols-1 md:grid-cols-2">
             
             <!-- LEFT : BRANDING -->
            <div class="hidden md:flex flex-col justify-center px-10
               bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500
               text-white">
                <div class="max-w-sm">
                    <h1 class="flex items-center gap-4 text-2xl font-bold leading-tight">
                        <span class="w-20 h-14 rounded-xl bg-white/20
           flex items-center justify-center">
                            <i class="pi pi-briefcase"></i>
                        </span>
                        Enterprise Workforce & Task Management System
                    </h1>

                    <p class="mt-3 text-sm opacity-90">
                        Manage organizations, projects, and tasks in one unified platform.
                    </p>

                    <ul class="mt-6 space-y-3 text-sm opacity-90">
                        <li class="flex items-center gap-2">
                            <i class="pi pi-check-circle"></i>
                            Role-based access control
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="pi pi-check-circle"></i>
                            Secure & scalable system
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="pi pi-check-circle"></i>
                            Enterprise-ready architecture
                        </li>
                    </ul>
                </div>
            </div>

            <!-- RIGHT : Login Form -->
            <div class="flex flex-col justify-center px-8 py-12">
                <Card class="border-none shadow-none">
                    <template #title>
                        <div class="text-center mb-6">
                            <h2 class="text-2xl font-semibold text-gray-900">
                                Welcome Back
                            </h2>
                            <p class="text-sm text-gray-500 mt-1">
                                Sign in to continue
                            </p>
                        </div>
                    </template>

                    <template #content>
                        <form @submit.prevent="handleLogin" class="space-y-5">
                            <!-- Email -->
                            <div>
                                <label class="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <InputText v-model="form.email" type="email" placeholder="you@company.com"
                                    class="w-full h-11 mt-1" required />
                            </div>

                            <!-- Password -->
                            <div  class="flex  flex-col">
                                <label class="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Password v-model="form.password" placeholder="••••••••" :feedback="false" toggleMask required />
                            </div>

                            <!-- Login Button -->
                            <Button label="Login" type="submit" class="w-full h-11 mt-2 font-semibold
                       bg-indigo-600 border-none
                       hover:bg-indigo-700 transition" :loading="isPending" @click="handleLogin" />

                            <!-- Footer -->
                            <div class="pt-4 text-center text-xs text-gray-400">
                                © 2025 Enterprise Workforce System
                            </div>
                        </form>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useLoginMutation } from '@/api/Mutation/useLoginMutation'
import { useAuthStore } from '@/stores/authStore'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'


const form = reactive({
    email: '',
    password: ''
})


const store = useAuthStore();

const { mutate, isPending, isError, error } = useLoginMutation()


const handleLogin = () => {
    console.log('Login Data:', form);

    mutate(form, {
    onSuccess: (data) => {
      console.log('Login success:', data);
       store.setUserToken(data.data.token);
       store.setIsUserLogin(true);
       store.setUserRole(data.data.user.roleName)
       store.setUserId(data.data.user.userId)
       store.setUserName(data.data.user.userName)
       store.setUserEmail(data.data.user.email)
    },
    onError: (err) => {
       console.log('Login error:', err);
    }
  })

}
</script>
