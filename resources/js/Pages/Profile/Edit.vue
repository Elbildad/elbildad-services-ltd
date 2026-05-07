<template>
  <AdminLayout>
    <Head title="Profile" />
    
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">User Profile</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Manage your account information and preferences.</p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Profile</h3>
        <ProfileCard :user="auth.user" />
        <div class="flex flex-col gap-6 mt-6">
          <PersonalInfoCard :user="auth.user" />
          <AddressCard :user="auth.user" />
        </div>
        <UpdatePasswordForm />
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ProfileCard from '@/components/profile/ProfileCard.vue'
import PersonalInfoCard from '@/components/profile/PersonalInfoCard.vue'
import AddressCard from '@/components/profile/AddressCard.vue'
import UpdatePasswordForm from '@/components/profile/UpdatePasswordForm.vue'
import { Head } from '@inertiajs/vue3'

defineProps({
  auth: Object,
  mustVerifyEmail: Boolean,
  status: String,
})
</script>
