<template>
  <section>
    <div
      v-if="loading"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        v-for="index in 8"
        :key="index"
        class="h-96 animate-pulse rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600"
      />
    </div>

    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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

