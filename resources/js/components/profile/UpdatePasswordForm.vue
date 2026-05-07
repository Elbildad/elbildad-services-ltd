<template>
  <div>
    <div class="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 mt-6">
      <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
        Update Password
      </h4>

      <form @submit.prevent="showConfirmModal" class="space-y-5">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">New Password</label>
            <input v-model="form.password" type="password" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90" required />
            <div v-if="form.errors.password" class="text-error-500 text-xs mt-1">{{ form.errors.password }}</div>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Confirm New Password</label>
            <input v-model="form.password_confirmation" type="password" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90" required />
            <div v-if="form.errors.password_confirmation" class="text-error-500 text-xs mt-1">{{ form.errors.password_confirmation }}</div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="submit" class="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors" :disabled="form.processing">
            Update Password
          </button>
        </div>
      </form>
    </div>

    <!-- Confirmation Modal with Current Password -->
    <div v-if="isConfirmModalOpen" class="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div class="relative w-full max-w-md rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-8 shadow-xl">
        <div class="text-center mb-6">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/10 mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-brand-500">
              <path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 16.0195V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">Verify Security</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Please enter your current password to confirm these changes.
          </p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Current Password</label>
            <input v-model="form.current_password" type="password" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90" required autofocus />
            <div v-if="form.errors.current_password" class="text-error-500 text-xs mt-1">{{ form.errors.current_password }}</div>
          </div>

          <div class="flex items-center justify-center gap-3 mt-6">
            <button @click="isConfirmModalOpen = false" type="button" class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:w-auto transition-colors">
              Cancel
            </button>
            <button @click="updatePassword" type="button" class="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto transition-colors" :disabled="form.processing">
              {{ form.processing ? 'Updating...' : 'Confirm Update' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'

const isConfirmModalOpen = ref(false)

const form = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const showConfirmModal = () => {
  isConfirmModalOpen.value = true
}

const updatePassword = () => {
  form.put(route('password.update'), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset()
      isConfirmModalOpen.value = false
    },
    onError: () => {
      // Keep modal open if there are current_password errors
      if (!form.errors.current_password) {
        isConfirmModalOpen.value = false
      }
      
      if (form.errors.password) {
        form.reset('password', 'password_confirmation')
      }
    }
  })
}
</script>
