<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-emerald-100/15 shadow-lg shadow-white/10 ring-1 ring-slate-200/70 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-2 dark:bg-slate-800 dark:ring-slate-700/50 dark:shadow-slate-900/50"
  >
    <!-- Image Container -->
    <div class="relative overflow-hidden">
      <RouterLink :to="`/product/${product.id}`" class="block aspect-square overflow-hidden">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </RouterLink>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span
          class="inline-flex items-center gap-1 rounded-full border border-white/50 bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm"
        >
          {{ formatCategoryLabel(product.category) }}
        </span>
        <span
          v-if="product.discountPercentage > 0"
          class="inline-flex h-7 w-12 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white"
        >
          -{{ Math.round(product.discountPercentage) }}%
        </span>
      </div>

      <!-- Rating Badge -->
      <div class="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm dark:bg-slate-800/90 dark:text-slate-200">
        <svg class="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        {{ product.rating.toFixed(1) }}
      </div>

      <!-- Quick Actions -->
      <div class="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
        <div class="flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-slate-800/90 dark:text-slate-200"
            @click="addToCart"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </button>
          <RouterLink
            :to="`/product/${product.id}`"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 dark:bg-slate-800/90 dark:text-slate-200"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col p-4 min-h-0 flex-1">
      <div class="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span class="font-medium truncate">{{ product.brand ?? 'Generic Brand' }}</span>
        <span class="flex items-center gap-1 flex-shrink-0">
          <svg class="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          {{ product.rating.toFixed(1) }}
        </span>
      </div>

      <RouterLink :to="`/product/${product.id}`" class="mb-3 line-clamp-2 font-display text-lg font-semibold text-slate-900 transition-colors hover:text-brand-600 dark:text-slate-100 dark:hover:text-brand-400">
        {{ product.title }}
      </RouterLink>

      <p class="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
        {{ simpleDescription }}
      </p>

      <!-- Price and CTA -->
      <div class="mt-auto">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <div class="text-xl font-display font-bold text-slate-900 dark:text-slate-100 truncate">
                {{ formatCurrency(finalPrice) }}
              </div>
              <div v-if="product.discountPercentage > 0" class="mt-1 text-xs text-slate-500 dark:text-slate-400 line-through">
                {{ formatCurrency(product.price) }}
              </div>
            </div>

            <button
              type="button"
              class="flex h-10 min-w-[90px] items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02] focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-800"
              @click="addToCart"
            >
              Add
            </button>
          </div>

          <div v-if="product.discountPercentage > 0" class="text-xs font-medium text-green-600 dark:text-green-400">
            Save {{ formatCurrency(product.price - finalPrice) }}
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { discountedPrice, formatCategoryLabel, formatCurrency } from '@/lib/format';
import type { Product } from '@/types/product';

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (event: 'add-to-cart', value: Product): void;
}>();

const finalPrice = computed(() => discountedPrice(props.product.price, props.product.discountPercentage));

function addToCart(): void {
  emit('add-to-cart', props.product);
}

const simpleDescription = computed(() => {
  const desc = props.product.description;
  // Get the first sentence and limit to 60 characters
  const firstSentence = desc.split('.')[0];
  if (firstSentence.length > 60) {
    return firstSentence.substring(0, 60) + '...';
  }
  return firstSentence + '.';
});
</script>

