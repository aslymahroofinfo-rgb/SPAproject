<template>
  <section class="mx-auto max-w-xl rounded-[1.5rem] frost-card p-8 text-center shadow-lift">
    <p
      class="inline-flex rounded-full border border-ember-500/35 bg-ember-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-ember-700 dark:text-amber-300"
    >
      404
    </p>
    <h1 class="mt-3 font-display text-3xl font-bold text-slate-900 dark:text-slate-100">Page not found</h1>
    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
      The route you requested does not exist.
    </p>
    <RouterLink
      to="/"
      class="mt-5 inline-flex rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
    >
      Return Home
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

