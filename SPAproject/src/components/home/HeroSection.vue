<template>
  <section class="mb-8 overflow-hidden rounded-[1.75rem] frost-card shadow-lift">
    <div class="grid gap-8 p-6 md:grid-cols-[1.45fr_1fr] md:items-end md:p-8">
      <div>
        <p
          class="mb-3 inline-flex rounded-full border border-brand-300 bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-800 dark:border-brand-700 dark:bg-brand-900/30 dark:text-brand-100"
        >
          Live Product Catalog
        </p>
        <h1 class="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          A bold storefront that turns API data into a modern shopping experience.
        </h1>
        <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Browse products, filter instantly, open dynamic detail pages, and keep your cart synced across reloads.
        </p>
        <a
          href="#catalog"
          class="mt-5 inline-flex rounded-2xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Enter Catalog
        </a>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <article class="cut-corners rounded-2xl border border-slate-200 bg-white/85 p-4 dark:border-slate-700 dark:bg-slate-900/70">
          <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Products</p>
          <p class="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-slate-100">{{ totalProducts }}</p>
        </article>
        <article class="cut-corners rounded-2xl border border-slate-200 bg-white/85 p-4 dark:border-slate-700 dark:bg-slate-900/70">
          <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Categories</p>
          <p class="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-slate-100">{{ categoryCount }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  totalProducts: number;
  categoryCount: number;
}>();
</script>

