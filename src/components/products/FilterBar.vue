<template>
  <section class="mb-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <!-- Search -->
      <div class="flex-1 max-w-md">
        <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Search Products
        </label>
        <div class="relative">
          <input
            :value="query"
            type="text"
            placeholder="Search by name, brand, or description..."
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-12 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-brand-800"
            @input="onQueryInput"
          />
          <svg class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
        <!-- Category -->
        <div class="min-w-0 flex-1 sm:flex-initial">
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Category
          </label>
          <select
            :value="category"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-800"
            @change="onCategoryChange"
          >
            <option value="all">All Categories</option>
            <option v-for="item in categories" :key="item" :value="item">
              {{ formatCategoryLabel(item) }}
              <span class="opacity-50">({{ categoryCounts[item] || 0 }})</span>
            </option>
          </select>
        </div>

        <!-- Sort -->
        <div class="min-w-0 flex-1 sm:flex-initial">
          <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Sort By
          </label>
          <select
            :value="sortBy"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-800"
            @change="onSortChange"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
          </select>
        </div>

        <!-- Results Count -->
        <div class="flex items-end">
          <div class="rounded-xl bg-gradient-to-r from-brand-50 to-brand-100 px-3 py-2 text-xs font-medium text-brand-800 dark:from-brand-900/50 dark:to-brand-800/50 dark:text-brand-200">
            {{ resultCount }} products found
          </div>
        </div>
      </div>
    </div>

    <!-- Active Filters -->
    <div v-if="query || category !== 'all' || sortBy !== 'featured'" class="mt-4 flex flex-wrap items-center gap-2">
      <span class="text-sm font-medium text-slate-600 dark:text-slate-400">Active filters:</span>

      <button
        v-if="query"
        type="button"
        class="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800 transition hover:bg-brand-200 dark:bg-brand-900/50 dark:text-brand-200 dark:hover:bg-brand-800/50"
        @click="clearSearch"
      >
        Search: "{{ query }}"
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <button
        v-if="category !== 'all'"
        type="button"
        class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        @click="clearCategory"
      >
        Category: {{ formatCategoryLabel(category) }}
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <button
        v-if="sortBy !== 'featured'"
        type="button"
        class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        @click="clearSort"
      >
        Sort: {{ getSortLabel(sortBy) }}
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <button
        type="button"
        class="text-xs font-medium text-slate-500 underline hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        @click="clearAllFilters"
      >
        Clear all
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatCategoryLabel } from '@/lib/format';
import type { SortOption } from '@/types/filter';

interface FilterBarProps {
  query: string;
  category: string;
  sortBy: SortOption;
  categories: string[];
  categoryCounts: Record<string, number>;
  resultCount: number;
}

defineProps<FilterBarProps>();

const emit = defineEmits<{
  (event: 'update:query', value: string): void;
  (event: 'update:category', value: string): void;
  (event: 'update:sortBy', value: SortOption): void;
}>();

function onQueryInput(event: Event): void {
  const target = event.target as HTMLInputElement | null;
  emit('update:query', target?.value ?? '');
}

function onCategoryChange(event: Event): void {
  const target = event.target as HTMLSelectElement | null;
  emit('update:category', target?.value ?? 'all');
}

function onSortChange(event: Event): void {
  const target = event.target as HTMLSelectElement | null;
  const value = (target?.value ?? 'featured') as SortOption;
  emit('update:sortBy', value);
}

function clearSearch(): void {
  emit('update:query', '');
}

function clearCategory(): void {
  emit('update:category', 'all');
}

function clearSort(): void {
  emit('update:sortBy', 'featured');
}

function clearAllFilters(): void {
  emit('update:query', '');
  emit('update:category', 'all');
  emit('update:sortBy', 'featured');
}

function getSortLabel(sortBy: SortOption): string {
  const labels: Record<SortOption, string> = {
    featured: 'Featured',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low',
    'rating-desc': 'Highest Rated'
  };
  return labels[sortBy];
}
</script>

