<template>
  <div class="categorys-list">
    <hr class="line" />
    <g-link :to="category.path" class="read">{{ category.name }}</g-link>
    <p class="description">{{ category.description }}</p>
  </div>
</template>

<script>
  export default {
    props: ['category']
  }
</script>

<style></style>
