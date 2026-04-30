<template>
  <section>
    <h1 class="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">Your Cart</h1>
    <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
      Manage quantities and complete a simulated checkout.
    </p>

    <div v-if="cartStore.items.length === 0" class="mt-6 rounded-[1.5rem] frost-card p-8 text-center">
      <p class="font-display text-2xl font-semibold">Your cart is empty.</p>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Add products from the catalog to continue.
      </p>
      <RouterLink
        to="/"
        class="mt-5 inline-flex rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        Back to Store
      </RouterLink>
    </div>

    <div v-else class="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div class="space-y-3">
        <article
          v-for="line in cartStore.items"
          :key="line.productId"
          class="grid gap-3 rounded-2xl border border-slate-200 bg-white/85 p-4 md:grid-cols-[90px_1fr_auto] md:items-center dark:border-slate-700 dark:bg-slate-900/75"
        >
          <img :src="line.thumbnail" :alt="line.title" class="h-20 w-20 rounded-xl object-cover" />

          <div>
            <RouterLink
              :to="`/product/${line.productId}`"
              class="font-semibold text-slate-900 hover:text-brand-700 dark:text-slate-100 dark:hover:text-brand-300"
            >
              {{ line.title }}
            </RouterLink>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {{ formatCategoryLabel(line.category) }}
            </p>
            <p class="mt-1 font-semibold text-slate-700 dark:text-slate-200">{{ formatCurrency(line.price) }} each</p>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm font-semibold dark:border-slate-600"
              @click="cartStore.decrease(line.productId)"
            >
              -
            </button>
            <span class="w-8 text-center text-sm font-semibold">{{ line.quantity }}</span>
            <button
              type="button"
              class="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm font-semibold dark:border-slate-600"
              @click="cartStore.increase(line.productId)"
            >
              +
            </button>
            <button
              type="button"
              class="ml-2 rounded-lg bg-ember-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-ember-600"
              @click="cartStore.removeItem(line.productId)"
            >
              Remove
            </button>
          </div>
        </article>
      </div>

      <aside class="h-fit rounded-2xl frost-card p-5 shadow-lift">
        <h2 class="font-display text-xl font-bold">Summary</h2>
        <dl class="mt-4 space-y-2 text-sm">
          <div class="flex items-center justify-between">
            <dt class="text-slate-600 dark:text-slate-300">Items</dt>
            <dd class="font-semibold">{{ cartStore.itemCount }}</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-slate-600 dark:text-slate-300">Subtotal</dt>
            <dd class="font-semibold">{{ formatCurrency(cartStore.subtotal) }}</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-slate-600 dark:text-slate-300">Shipping</dt>
            <dd class="font-semibold">{{ formatCurrency(shipping) }}</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-slate-600 dark:text-slate-300">Tax (8%)</dt>
            <dd class="font-semibold">{{ formatCurrency(tax) }}</dd>
          </div>
          <div class="my-2 border-t border-slate-200 dark:border-slate-700" />
          <div class="flex items-center justify-between text-base">
            <dt class="font-semibold">Total</dt>
            <dd class="font-display text-xl font-bold">{{ formatCurrency(total) }}</dd>
          </div>
        </dl>

        <p
          v-if="checkoutMessage"
          class="mt-4 rounded-xl bg-brand-100 px-3 py-2 text-sm text-brand-800 dark:bg-brand-900/35 dark:text-brand-100"
        >
          {{ checkoutMessage }}
        </p>

        <button
          type="button"
          class="mt-4 w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          @click="handleCheckout"
        >
          {{ authStore.isAuthenticated ? 'Simulate Checkout' : 'Log In to Checkout' }}
        </button>

        <button
          type="button"
          class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-ember-500 hover:text-ember-600 dark:border-slate-600 dark:text-slate-200"
          @click="cartStore.clear"
        >
          Clear Cart
        </button>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { formatCategoryLabel, formatCurrency } from '@/lib/format';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

const checkoutMessage = ref<string | null>(null);

const shipping = computed(() => {
  if (cartStore.itemCount === 0) {
    return 0;
  }
  return cartStore.subtotal >= 120 ? 0 : 8.99;
});

const tax = computed(() => cartStore.subtotal * 0.08);
const total = computed(() => cartStore.subtotal + shipping.value + tax.value);

function handleCheckout(): void {
  checkoutMessage.value = null;

  if (!authStore.isAuthenticated) {
    void router.push({ name: 'login', query: { redirect: '/cart' } });
    return;
  }

  if (cartStore.itemCount === 0) {
    return;
  }

  checkoutMessage.value = 'Order confirmed. This is a simulation, so no real payment happened.';
  cartStore.clear();
}
</script>

