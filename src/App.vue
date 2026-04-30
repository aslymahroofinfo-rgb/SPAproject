<template>
  <div class="relative flex min-h-screen flex-col overflow-x-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10 opacity-50 grain" aria-hidden="true" />
    <AppHeader />
    <main class="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
</script>

