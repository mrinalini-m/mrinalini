<template>
  <div class="categorys-list">
    <hr class="line" />
    <p>{{ category.name }}</p>
    <g-link :to="category.path" class="read">Read More</g-link>
  </div>
</template>

<script>
  export default {
    props: ['category']
  }
</script>

<style>
  .line {
    border: 0.5px solid black;
    margin: 30px 0;
  }

  .date {
    padding: 1rem;
    font-weight: 300;
  }

  .read {
    color: black;
    text-decoration: none;
    border: 2px dashed red;
  }
</style>
