<template>
  <header class="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-950/65">
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 font-display text-sm font-bold text-white shadow-halo">
          NN
        </span>
        <div class="leading-tight">
          <p class="font-display text-lg font-bold text-slate-900 dark:text-slate-100">NovaNest</p>
          <p class="text-[11px] font-semibold uppercase tracking-[0.17em] text-slate-500 dark:text-slate-400">
            MARKET
          </p>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-2 rounded-2xl frost-card px-2 py-1 md:flex">
        <RouterLink
          to="/"
          class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand-100 hover:text-brand-800 dark:text-slate-200 dark:hover:bg-brand-900/30 dark:hover:text-brand-100"
        >
          Storefront
        </RouterLink>
        <RouterLink
          to="/cart"
          class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand-100 hover:text-brand-800 dark:text-slate-200 dark:hover:bg-brand-900/30 dark:hover:text-brand-100"
        >
          Cart {{ cartCount }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-200"
          @click="toggleTheme"
        >
          {{ isDark ? 'Day' : 'Night' }}
        </button>

        <RouterLink
          v-if="!isAuthenticated"
          to="/login"
          class="hidden rounded-xl bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 sm:inline-flex"
        >
          Log In
        </RouterLink>

        <div
          v-else
          class="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:flex"
        >
          <span class="font-semibold">{{ firstName }}</span>
          <button
            type="button"
            class="rounded-md bg-ember-500 px-2 py-1 font-semibold text-white transition hover:bg-ember-600"
            @click="logout"
          >
            Log Out
          </button>
        </div>

        <button
          type="button"
          class="inline-flex rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 md:hidden dark:border-slate-600 dark:text-slate-200"
          @click="mobileOpen = !mobileOpen"
        >
          Menu
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="border-t border-slate-200/70 px-4 py-3 md:hidden dark:border-slate-700/65">
      <div class="flex flex-col gap-2">
        <RouterLink
          to="/"
          class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-100 dark:text-slate-200 dark:hover:bg-brand-900/30"
        >
          Storefront
        </RouterLink>
        <RouterLink
          to="/cart"
          class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-100 dark:text-slate-200 dark:hover:bg-brand-900/30"
        >
          Cart {{ cartCount }}
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          to="/login"
          class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-brand-100 dark:text-slate-200 dark:hover:bg-brand-900/30"
        >
          Log In
        </RouterLink>
        <button v-else type="button" class="rounded-xl bg-ember-500 px-3 py-2 text-sm font-semibold text-white" @click="logout">
          Log Out
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useTheme } from '@/composables/useTheme';

const authStore = useAuthStore();
const cartStore = useCartStore();
const route = useRoute();

const mobileOpen = ref(false);
const { isDark, toggleTheme } = useTheme();

const cartCount = computed(() => cartStore.itemCount);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const firstName = computed(() => authStore.user?.firstName ?? 'Member');

function logout(): void {
  authStore.logout();
  mobileOpen.value = false;
}

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false;
  }
);
</script>

