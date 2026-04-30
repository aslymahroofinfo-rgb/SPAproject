import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { CART_STORAGE_KEY } from '@/lib/constants';
import { loadJson, saveJson } from '@/lib/storage';
import type { CartLine } from '@/types/cart';
import type { Product } from '@/types/product';

function normalizeStock(stock: number): number {
  return stock > 0 ? stock : 1;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartLine[]>(loadJson<CartLine[]>(CART_STORAGE_KEY) ?? []);

  function persist(): void {
    saveJson(CART_STORAGE_KEY, items.value);
  }

  function addItem(product: Product): void {
    const existing = items.value.find((line) => line.productId === product.id);
    const maxStock = normalizeStock(product.stock);

    if (existing) {
      existing.quantity = Math.min(existing.quantity + 1, existing.maxStock);
      persist();
      return;
    }

    items.value.push({
      productId: product.id,
      title: product.title,
      category: product.category,
      thumbnail: product.thumbnail,
      price: product.price,
      quantity: 1,
      maxStock
    });
    persist();
  }

  function removeItem(productId: number): void {
    items.value = items.value.filter((line) => line.productId !== productId);
    persist();
  }

  function increase(productId: number): void {
    const line = items.value.find((entry) => entry.productId === productId);
    if (!line) {
      return;
    }

    line.quantity = Math.min(line.quantity + 1, line.maxStock);
    persist();
  }

  function decrease(productId: number): void {
    const line = items.value.find((entry) => entry.productId === productId);
    if (!line) {
      return;
    }

    if (line.quantity <= 1) {
      removeItem(productId);
      return;
    }

    line.quantity -= 1;
    persist();
  }

  function clear(): void {
    items.value = [];
    persist();
  }

  const itemCount = computed(() => items.value.reduce((total, line) => total + line.quantity, 0));
  const subtotal = computed(() => items.value.reduce((total, line) => total + line.price * line.quantity, 0));

  return {
    items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    increase,
    decrease,
    clear
  };
});

