<template>
  <section>
    <button
      type="button"
      class="mb-5 rounded-xl border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-200"
      @click="goBack"
    >
      Back
    </button>

    <div
      v-if="loading"
      class="grid gap-5 rounded-[1.5rem] frost-card p-6 md:grid-cols-2"
      aria-busy="true"
      aria-live="polite"
    >
      <div class="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div class="space-y-3">
        <div class="h-8 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div class="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div class="h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>

    <div
      v-else-if="errorMessage"
      class="rounded-2xl border border-ember-500/40 bg-ember-500/10 p-5 text-sm text-ember-700 dark:text-amber-200"
    >
      <p class="font-semibold">Could not load product details.</p>
      <p class="mt-1">{{ errorMessage }}</p>
    </div>

    <article v-else-if="product" class="rounded-[1.5rem] frost-card p-5 md:p-7">
      <div class="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <img :src="activeImage" :alt="product.title" class="h-[340px] w-full rounded-2xl object-cover md:h-[420px]" />
          <div class="mt-3 grid grid-cols-4 gap-2">
            <button
              v-for="image in imageChoices"
              :key="image"
              type="button"
              :class="[
                'overflow-hidden rounded-xl border transition',
                image === activeImage
                  ? 'border-brand-500 ring-2 ring-brand-200 dark:ring-brand-800'
                  : 'border-slate-200 dark:border-slate-700'
              ]"
              @click="activeImage = image"
            >
              <img :src="image" :alt="product.title" class="h-16 w-full object-cover md:h-20" />
            </button>
          </div>
        </div>

        <div>
          <p
            class="inline-flex rounded-full border border-brand-300 bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-800 dark:border-brand-700 dark:bg-brand-900/25 dark:text-brand-100"
          >
            {{ formattedCategory }}
          </p>
          <h1 class="mt-3 font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
            {{ product.title }}
          </h1>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ product.description }}</p>

          <div class="mt-5 grid gap-3 rounded-2xl bg-white/75 p-4 dark:bg-slate-900/70">
            <div class="flex items-end gap-3">
              <p class="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
                {{ formatCurrency(finalPrice) }}
              </p>
              <p v-if="product.discountPercentage > 0" class="pb-1 text-sm text-slate-500 line-through dark:text-slate-400">
                {{ formatCurrency(product.price) }}
              </p>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Rated <span class="font-semibold">{{ product.rating.toFixed(1) }}</span> / 5
            </p>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Stock available: <span class="font-semibold">{{ product.stock }}</span>
            </p>
            <button
              type="button"
              class="mt-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              @click="addToCart"
            >
              Add to Cart
            </button>
          </div>

          <dl class="mt-6 grid gap-3 text-sm">
            <div class="rounded-xl bg-white/75 px-3 py-2 dark:bg-slate-900/65">
              <dt class="font-semibold">Brand</dt>
              <dd class="text-slate-600 dark:text-slate-300">{{ product.brand ?? 'N/A' }}</dd>
            </div>
            <div class="rounded-xl bg-white/75 px-3 py-2 dark:bg-slate-900/65">
              <dt class="font-semibold">Warranty</dt>
              <dd class="text-slate-600 dark:text-slate-300">
                {{ product.warrantyInformation ?? 'Not specified' }}
              </dd>
            </div>
            <div class="rounded-xl bg-white/75 px-3 py-2 dark:bg-slate-900/65">
              <dt class="font-semibold">Shipping</dt>
              <dd class="text-slate-600 dark:text-slate-300">
                {{ product.shippingInformation ?? 'Standard shipping terms apply' }}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section v-if="product.reviews && product.reviews.length > 0" class="mt-8">
        <h2 class="font-display text-2xl font-bold">Customer Reviews</h2>
        <div class="mt-3 grid gap-3 md:grid-cols-2">
          <article
            v-for="review in product.reviews"
            :key="`${review.reviewerEmail}-${review.date}`"
            class="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/65"
          >
            <p class="font-semibold">{{ review.reviewerName }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ review.rating.toFixed(1) }} / 5</p>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ review.comment }}</p>
          </article>
        </div>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProductById } from '@/lib/dummyJsonApi';
import { discountedPrice, formatCategoryLabel, formatCurrency } from '@/lib/format';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types/product';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const loading = ref(true);
const errorMessage = ref<string | null>(null);
const activeImage = ref('');

const imageChoices = computed(() => {
  if (!product.value) {
    return [];
  }
  return product.value.images.length > 0 ? product.value.images : [product.value.thumbnail];
});

const finalPrice = computed(() => {
  if (!product.value) {
    return 0;
  }
  return discountedPrice(product.value.price, product.value.discountPercentage);
});

const formattedCategory = computed(() => {
  if (!product.value) {
    return '';
  }
  return formatCategoryLabel(product.value.category);
});

async function loadDetail(productId: number): Promise<void> {
  loading.value = true;
  errorMessage.value = null;

  try {
    const response = await fetchProductById(productId);
    product.value = response;
    activeImage.value = response.images[0] ?? response.thumbnail;
  } catch (error: unknown) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Could not retrieve product details right now.';
  } finally {
    loading.value = false;
  }
}

function addToCart(): void {
  if (!product.value) {
    return;
  }
  cartStore.addItem(product.value);
}

function goBack(): void {
  if (window.history.length > 1) {
    router.back();
    return;
  }

  void router.push('/');
}

watch(
  () => route.params.id,
  (param) => {
    const id = Number(param);
    if (Number.isNaN(id)) {
      errorMessage.value = 'Invalid product id.';
      loading.value = false;
      return;
    }
    void loadDetail(id);
  },
  { immediate: true }
);
</script>

