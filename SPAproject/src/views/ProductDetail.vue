<template>
  <div style="padding: 20px">
    <h1>📦 Product Details</h1>

    <div v-if="product">
      <img :src="product.thumbnail" style="width: 200px" />
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
      <h3>${{ product.price }}</h3>
    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref<any>(null);

onMounted(async () => {
  const res = await axios.get(
    `https://dummyjson.com/products/${route.params.id}`
  );
  product.value = res.data;
});
</script>