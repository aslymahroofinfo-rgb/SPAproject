<template>
  <footer class="border-t border-slate-200/70 py-6 dark:border-slate-700/60">
    <div
      class="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 text-sm text-slate-600 sm:flex-row sm:px-6 lg:px-8 dark:text-slate-300"
    >
      <p class="font-medium">NovaNest Market SPA</p>
      <p>Vue 3 + TypeScript + Tailwind + DummyJSON</p>
      <p>&copy; {{ year }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

