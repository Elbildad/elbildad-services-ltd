<template>
  <AdminLayout>
    <Head title="User Management" />
    <div class="space-y-6">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">User Management</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Manage your system users and their roles.</p>
        </div>
        <div>
          <button @click="openCreateModal" class="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4.16666V15.8333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.16669 10H15.8334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add New User
          </button>
        </div>
      </div>

      <div v-if="$page.props.flash && $page.props.flash.error" class="bg-error-50 text-error-700 px-4 py-3 rounded-lg text-sm border border-error-200 dark:bg-error-500/15 dark:border-error-500/20 dark:text-error-500">
        {{ $page.props.flash.error }}
      </div>

      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="max-w-full overflow-x-auto custom-scrollbar">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 uppercase tracking-wider">User</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 uppercase tracking-wider">Role</p>
                </th>
                <th class="px-5 py-3 text-left sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 uppercase tracking-wider">Status</p>
                </th>
                <th class="px-5 py-3 text-right sm:px-6">
                  <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 uppercase tracking-wider">Actions</p>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <td class="px-5 py-4 sm:px-6">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-400">
                      <span class="text-sm font-semibold">{{ user.name.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">{{ user.name }}</p>
                      <p class="text-gray-500 text-theme-xs dark:text-gray-400">{{ user.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <p class="text-gray-500 text-theme-sm dark:text-gray-400 capitalize">{{ user.role.replace('_', ' ') }}</p>
                  <p v-if="user.role === 'agent'" class="text-[10px] text-brand-500 font-medium truncate max-w-[150px]" :title="user.category_names">
                    {{ user.category_names || 'No Categories' }}
                  </p>
                </td>
                <td class="px-5 py-4 sm:px-6">
                  <span class="inline-flex items-center rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                    Active
                  </span>
                </td>
                <td class="px-5 py-4 text-right sm:px-6">
                  <div class="flex items-center justify-end gap-3">
                    <button @click="editUser(user)" class="inline-flex items-center gap-1.5 rounded bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 10.116L15.0911 2.78206Z" fill="currentColor"/>
                      </svg>
                      Edit
                    </button>
                    <button @click="confirmDelete(user)" class="inline-flex items-center gap-1.5 rounded bg-error-50 px-3 py-1.5 text-xs font-medium text-error-600 hover:bg-error-100 dark:bg-error-500/10 dark:text-error-500 dark:hover:bg-error-500/20 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 4.5L4.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="users.length === 0">
                <td colspan="4" class="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                  No users found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit/Create Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div class="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-11 max-h-[90vh] shadow-xl">
        <button @click="isModalOpen = false" class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <h3 class="mb-5 text-xl font-semibold text-gray-800 dark:text-white/90">{{ isEditing ? 'Edit User' : 'Create New User' }}</h3>

        <form @submit.prevent="submitForm" class="space-y-5">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Full Name</label>
            <input v-model="form.name" type="text" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white" required />
            <div v-if="form.errors.name" class="text-error-500 text-xs mt-1">{{ form.errors.name }}</div>
          </div>
          
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Email Address</label>
            <input v-model="form.email" type="email" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white" required />
            <div v-if="form.errors.email" class="text-error-500 text-xs mt-1">{{ form.errors.email }}</div>
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Role</label>
            <select v-model="form.role" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white" required>
              <option value="" disabled>Select a role</option>
              <option v-for="role in availableRoles" :key="role" :value="role" class="capitalize">{{ role.replace('_', ' ') }}</option>
            </select>
            <div v-if="form.errors.role" class="text-error-500 text-xs mt-1">{{ form.errors.role }}</div>
          </div>

          <!-- Category Selection for Agents -->
          <div v-if="form.role === 'agent'" class="space-y-3">
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Assigned Categories</label>
            <div class="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto p-3 rounded-lg border border-gray-200 dark:border-gray-700 custom-scrollbar">
              <div v-for="category in availableCategories" :key="category.id" class="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  :id="`cat-${category.id}`" 
                  v-model="form.category_ids" 
                  :value="category.id"
                  class="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
                >
                <label :for="`cat-${category.id}`" class="text-xs text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                  {{ category.name }}
                </label>
              </div>
            </div>
            <p class="text-[10px] text-gray-500 italic">This agent will handle RFQs submitted for these categories.</p>
            <div v-if="form.errors.category_ids" class="text-error-500 text-xs mt-1">{{ form.errors.category_ids }}</div>
          </div>

          <div v-if="!isEditing">
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Password</label>
            <input v-model="form.password" type="password" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white" :required="!isEditing" />
            <div v-if="form.errors.password" class="text-error-500 text-xs mt-1">{{ form.errors.password }}</div>
          </div>
          
          <div class="flex items-center gap-3 mt-8">
            <button @click="isModalOpen = false" type="button" class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:w-auto">Cancel</button>
            <button type="submit" class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto" :disabled="form.processing">
              <span v-if="form.processing">Saving...</span>
              <span v-else>{{ isEditing ? 'Update User' : 'Create User' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div class="relative w-full max-w-md rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-8 shadow-xl text-center">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/10 mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-error-500">
            <path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16.0195V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <h3 class="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">Delete User</h3>
        <p class="mb-8 text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete <span class="font-semibold text-gray-800 dark:text-white">{{ userToDelete?.name }}</span>? This action cannot be undone.
        </p>

        <div class="flex items-center justify-center gap-3">
          <button @click="isDeleteModalOpen = false" type="button" class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:w-auto transition-colors">
            Cancel
          </button>
          <button @click="executeDelete" type="button" class="w-full rounded-lg bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto transition-colors" :disabled="deleteForm.processing">
            <span v-if="deleteForm.processing">Deleting...</span>
            <span v-else>Yes, Delete</span>
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { Head, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

const props = defineProps({
  users: Array,
  availableRoles: Array,
  availableCategories: Array
})

// Edit/Create Modal State
const isModalOpen = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const form = useForm({
  name: '',
  email: '',
  role: '',
  password: '',
  category_ids: []
})

// Delete Modal State
const isDeleteModalOpen = ref(false)
const userToDelete = ref(null)
const deleteForm = useForm({})

const openCreateModal = () => {
  isEditing.value = false
  editingId.value = null
  form.reset()
  form.category_ids = []
  form.clearErrors()
  isModalOpen.value = true
}

const editUser = (user) => {
  isEditing.value = true
  editingId.value = user.id
  form.name = user.name
  form.email = user.email
  form.role = user.role === 'No Role' ? '' : user.role
  form.category_ids = user.category_ids || []
  form.password = '' // Don't pre-fill password, not required for edit
  form.clearErrors()
  isModalOpen.value = true
}

const submitForm = () => {
  if (isEditing.value) {
    form.put(route('admin.users.update', editingId.value), {
      onSuccess: () => isModalOpen.value = false,
      preserveScroll: true
    })
  } else {
    form.post(route('admin.users.store'), {
      onSuccess: () => isModalOpen.value = false,
      preserveScroll: true
    })
  }
}

const confirmDelete = (user) => {
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

const executeDelete = () => {
  if (userToDelete.value) {
    deleteForm.delete(route('admin.users.destroy', userToDelete.value.id), {
      onSuccess: () => {
        isDeleteModalOpen.value = false
        userToDelete.value = null
      },
      preserveScroll: true
    })
  }
}
</script>
