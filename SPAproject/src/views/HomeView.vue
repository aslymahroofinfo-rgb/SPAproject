<template>
  <div>
    <HeroSection :total-products="products.length" :category-count="categories.length" />

    <section id="catalog">
      <FilterBar
        :query="searchQuery"
        :category="selectedCategory"
        :sort-by="sortBy"
        :categories="categories"
        :result-count="filteredProducts.length"
        @update:query="searchQuery = $event"
        @update:category="selectedCategory = $event"
        @update:sort-by="sortBy = $event"
      />

      <div
        v-if="errorMessage"
        class="mb-5 rounded-2xl border border-ember-500/40 bg-ember-500/10 p-4 text-sm text-ember-700 dark:text-amber-200"
      >
        <p class="font-semibold">Unable to load products</p>
        <p class="mt-1">{{ errorMessage }}</p>
        <button
          type="button"
          class="mt-3 rounded-lg bg-ember-500 px-3 py-1.5 text-xs font-semibold text-white"
          @click="loadProducts(true)"
        >
          Retry
        </button>
      </div>

      <ProductGrid :loading="isLoading" :products="filteredProducts" @add-to-cart="addToCart" />

      <div
        v-if="!isLoading && !errorMessage && filteredProducts.length === 0"
        class="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-6 text-center dark:border-slate-700 dark:bg-slate-900/60"
      >
        <p class="font-display text-xl font-semibold">No products match your filters.</p>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Try a different search or reset your category and sort options.
        </p>
        <button
          type="button"
          class="mt-4 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          @click="resetFilters"
        >
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

function addToCart(product: Product): void {
  cartStore.addItem(product);
}

function resetFilters(): void {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  sortBy.value = 'featured';
}
</script>

