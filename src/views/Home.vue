<template>
  <div style="padding: 20px">
    <h1>🛍️ My E-Commerce Shop</h1>

    <input
      v-model="search"
      placeholder="Search products..."
      style="padding: 8px; width: 100%; margin: 10px 0;"
    />

    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
      <div v-for="p in filteredProducts" :key="p.id" style="border: 1px solid #ccc; padding: 10px;">
        <img :src="p.thumbnail" style="width: 100%" />
        <h3>{{ p.title }}</h3>
        <p>${{ p.price }}</p>

        <router-link :to="`/product/${p.id}`">
          View Product
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const products = ref<any[]>([]);
const search = ref("");

const filteredProducts = computed(() =>
  products.value.filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase())
  )
);

onMounted(async () => {
  const res = await axios.get("https://dummyjson.com/products");
  products.value = res.data.products;
});
</script>