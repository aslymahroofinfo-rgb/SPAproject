<template>
  <section>
    <div
      v-if="loading"
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        v-for="index in 8"
        :key="index"
        class="h-[360px] animate-pulse rounded-2xl border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-900/40"
      />
    </div>

    <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="emit('add-to-cart', $event)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '@/components/products/ProductCard.vue';
import type { Product } from '@/types/product';

defineProps<{
  products: Product[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (event: 'add-to-cart', value: Product): void;
}>();
</script>

