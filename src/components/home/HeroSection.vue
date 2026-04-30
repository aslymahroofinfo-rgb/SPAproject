<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-brand-50/30 py-16 dark:from-slate-900 dark:via-slate-800 dark:to-brand-900/10">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #18c778 2px, transparent 2px), radial-gradient(circle at 75% 75%, #ff7a46 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
        <!-- Content -->
        <div class="text-center lg:text-left">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-900/50 dark:text-brand-300">
            <span class="h-2 w-2 rounded-full bg-brand-500"></span>
            Live Product Catalog
          </div>

          <h1 class="mb-6 font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Discover Amazing Products in Our
            <span class="bg-gradient-to-r from-brand-600 to-ember-500 bg-clip-text text-transparent">
              Dynamic Online Store
            </span>
          </h1>

          <p class="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 lg:mx-0">
            Browse thousands of products, filter instantly, and enjoy seamless shopping with our modern e-commerce platform.
          </p>

          <div class="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#catalog"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-brand-200 dark:focus:ring-brand-800"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Start Shopping
            </a>

            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 shadow-sm transition-all hover:border-brand-300 hover:bg-brand-50 hover:shadow-md dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:bg-brand-900/50"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H15m2 0h1.586a1 1 0 01.707.293l.707.707A1 1 0 0021 12.414V15m0 2a2 2 0 01-2 2h-1.586a1 1 0 01-.707-.293l-.707-.707A1 1 0 0016.586 16H14"/>
              </svg>
              Learn More
            </button>
          </div>

          <!-- Stats -->
          <div class="mt-12 grid grid-cols-3 gap-8 lg:gap-12">
            <div class="text-center">
              <div class="font-display text-3xl font-bold text-slate-900 dark:text-white">{{ totalProducts }}</div>
              <div class="text-sm font-medium text-slate-500 dark:text-slate-400">Products</div>
            </div>
            <div class="text-center">
              <div class="font-display text-3xl font-bold text-slate-900 dark:text-white">{{ categoryCount }}</div>
              <div class="text-sm font-medium text-slate-500 dark:text-slate-400">Categories</div>
            </div>
            <div class="text-center">
              <div class="font-display text-3xl font-bold text-slate-900 dark:text-white">4.8</div>
              <div class="text-sm font-medium text-slate-500 dark:text-slate-400">Rating</div>
            </div>
          </div>
        </div>

        <!-- Visual Element -->
        <div class="relative">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <!-- Floating Cards -->
            <div class="relative">
              <div class="absolute -top-4 -left-4 h-32 w-32 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 p-4 shadow-2xl animate-pulse">
                <div class="h-full w-full rounded-lg bg-white/20 backdrop-blur-sm"></div>
              </div>
              <div class="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-ember-400 to-ember-600 p-3 shadow-2xl">
                <div class="h-full w-full rounded-lg bg-white/20 backdrop-blur-sm"></div>
              </div>
              <div class="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-3 shadow-2xl">
                <div class="h-full w-full rounded-full bg-white/20 backdrop-blur-sm"></div>
              </div>
            </div>

            <!-- Main Card -->
            <div class="relative rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-800/80">
              <div class="flex items-center gap-4 mb-6">
                <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                  <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-semibold text-slate-900 dark:text-white">Premium Store</div>
                  <div class="text-sm text-slate-500 dark:text-slate-400">Quality Products</div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="rounded-xl bg-gradient-to-br from-green-100 to-green-200 p-4 dark:from-green-900/50 dark:to-green-800/50">
                  <div class="text-2xl font-bold text-green-800 dark:text-green-200">Free</div>
                  <div class="text-sm text-green-600 dark:text-green-300">Shipping</div>
                </div>
                <div class="rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 p-4 dark:from-blue-900/50 dark:to-blue-800/50">
                  <div class="text-2xl font-bold text-blue-800 dark:text-blue-200">24/7</div>
                  <div class="text-sm text-blue-600 dark:text-blue-300">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

