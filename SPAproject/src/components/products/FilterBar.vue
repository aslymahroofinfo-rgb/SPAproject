<template>
  <section class="mb-6 rounded-[1.25rem] frost-card p-4 shadow-lift">
    <div class="grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.8fr_auto] md:items-end">
      <label class="flex flex-col gap-1 text-sm">
        <span class="font-semibold text-slate-700 dark:text-slate-200">Search</span>
        <input
          :value="query"
          type="text"
          placeholder="Search title, description, or brand..."
          class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-brand-800"
          @input="onQueryInput"
        />
      </label>

      <label class="flex flex-col gap-1 text-sm">
        <span class="font-semibold text-slate-700 dark:text-slate-200">Category</span>
        <select
          :value="category"
          class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-800"
          @change="onCategoryChange"
        >
          <option value="all">All Categories</option>
          <option v-for="item in categories" :key="item" :value="item">
            {{ formatCategoryLabel(item) }}
          </option>
        </select>
      </label>

      <label class="flex flex-col gap-1 text-sm">
        <span class="font-semibold text-slate-700 dark:text-slate-200">Sort</span>
        <select
          :value="sortBy"
          class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-brand-800"
          @change="onSortChange"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating</option>
        </select>
      </label>

      <div class="rounded-xl bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800 dark:bg-brand-900/35 dark:text-brand-100">
        {{ resultCount }} items
      </div>
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
</script>

