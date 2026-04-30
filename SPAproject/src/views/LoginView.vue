<template>
  <section class="mx-auto max-w-lg">
    <article class="rounded-[1.5rem] frost-card p-6 shadow-lift sm:p-8">
      <h1 class="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">Log In</h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Sign in with DummyJSON credentials to enable checkout simulation.
      </p>

      <form class="mt-6 space-y-4" @submit.prevent="submitLogin">
        <label class="flex flex-col gap-1 text-sm">
          <span class="font-semibold text-slate-700 dark:text-slate-200">Username</span>
          <input
            v-model="form.username"
            type="text"
            required
            class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-800"
          />
        </label>

        <label class="flex flex-col gap-1 text-sm">
          <span class="font-semibold text-slate-700 dark:text-slate-200">Password</span>
          <input
            v-model="form.password"
            type="password"
            required
            class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-800"
          />
        </label>

        <div class="rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
          Demo:
          <span class="font-semibold">{{ demoUser.username }}</span>
          /
          <span class="font-semibold">{{ demoUser.password }}</span>
        </div>

        <p
          v-if="errorMessage"
          class="rounded-xl border border-ember-500/40 bg-ember-500/10 px-3 py-2 text-sm text-ember-700 dark:text-amber-200"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ loading ? 'Logging in...' : 'Log In' }}
        </button>
      </form>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DEMO_USER } from '@/lib/constants';
import { useAuthStore } from '@/stores/auth';
import type { LoginRequest } from '@/types/auth';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = reactive<LoginRequest>({
  username: DEMO_USER.username,
  password: DEMO_USER.password,
  expiresInMins: 60
});

const loading = ref(false);
const errorMessage = ref<string | null>(null);

const redirectPath = computed(() => {
  const candidate = route.query.redirect;
  return typeof candidate === 'string' && candidate.startsWith('/') ? candidate : '/';
});

const demoUser = DEMO_USER;

async function submitLogin(): Promise<void> {
  loading.value = true;
  errorMessage.value = null;

  try {
    await authStore.login(form);
    await router.push(redirectPath.value);
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Login failed. Try again.';
  } finally {
    loading.value = false;
  }
}
</script>

