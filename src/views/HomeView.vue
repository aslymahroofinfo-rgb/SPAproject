<template>
  <div>
    <HeroSection :total-products="products.length" :category-count="categories.length" />

    <section id="catalog" class="animate-fade-in-up">
      <div class="mb-8 text-center">
        <h2 class="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Our Products
        </h2>
        <p class="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Discover our curated collection of high-quality products across various categories
        </p>
      </div>

      <FilterBar
        :query="searchQuery"
        :category="selectedCategory"
        :sort-by="sortBy"
        :categories="categories"
        :category-counts="categoryCounts"
        :result-count="filteredProducts.length"
        @update:query="searchQuery = $event"
        @update:category="selectedCategory = $event"
        @update:sort-by="sortBy = $event"
      />

      <div
        v-if="errorMessage"
        class="mb-8 rounded-2xl border border-ember-500/40 bg-ember-500/10 p-6 text-center dark:text-amber-200"
      >
        <div class="mb-4">
          <svg class="mx-auto h-12 w-12 text-ember-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <p class="font-semibold text-lg mb-2">Unable to load products</p>
        <p class="text-sm mb-4">{{ errorMessage }}</p>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-ember-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-105"
          @click="loadProducts(true)"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Try Again
        </button>
      </div>

      <ProductGrid :loading="isLoading" :products="filteredProducts" @add-to-cart="addToCart" />

      <div
        v-if="!isLoading && !errorMessage && filteredProducts.length === 0"
        class="mt-12 rounded-2xl border border-slate-200 bg-white/80 p-8 text-center shadow-lg dark:border-slate-700 dark:bg-slate-900/60"
      >
        <div class="mb-4">
          <svg class="mx-auto h-16 w-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-5v2m0 0v2m0-2h2m-2 0h-2"/>
          </svg>
        </div>
        <p class="font-display text-2xl font-semibold mb-2">No products match your filters</p>
        <p class="text-slate-600 dark:text-slate-300 mb-6">
          Try adjusting your search terms or selecting a different category
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-105"
          @click="resetFilters"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Reset Filters
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import HeroSection from '@/components/home/HeroSection.vue';
import FilterBar from '@/components/products/FilterBar.vue';
import ProductGrid from '@/components/products/ProductGrid.vue';
import { useProducts } from '@/composables/useProducts';
import { useCartStore } from '@/stores/cart';
import type { SortOption } from '@/types/filter';
import type { Product } from '@/types/product';

const { products, categories, isLoading, errorMessage, loadProducts } = useProducts();
const cartStore = useCartStore();

const searchQuery = ref('');
const selectedCategory = ref('all');
const sortBy = ref<SortOption>('featured');

onMounted(() => {
  void loadProducts();
});

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const bySearch = products.value.filter((product) => {
    const text = `${product.title} ${product.description} ${product.brand ?? ''}`.toLowerCase();
    return text.includes(query);
  });

  const byCategory =
    selectedCategory.value === 'all'
      ? bySearch
      : bySearch.filter((product) => product.category === selectedCategory.value);

  const sorted = [...byCategory];
  if (sortBy.value === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }
  if (sortBy.value === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }
  if (sortBy.value === 'rating-desc') {
    sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }

  sorted.sort((a, b) => b.rating * b.stock - a.rating * a.stock);
  return sorted;
});

const categoryCounts = computed(() => {
  const counts: Record<string, number> = {};
  products.value.forEach((product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
  });
  return counts;
});

function addToCart(product: Product): void {
  cartStore.addItem(product);
}

function resetFilters(): void {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  sortBy.value = 'featured';
}
</script>

