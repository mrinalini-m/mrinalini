<template>
  <Layout>
    <section class="tags">
      <CategoryList
        v-for="edge in $page.allCategory.edges"
        :key="edge.node.id"
        :category="edge.node"
      />
    </section>
  </Layout>
</template>

<script>
  import CategoryList from '@/components/CategoryList'
  export default {
    components: {
      CategoryList
    },
    metaInfo: {
      title: 'Mrinalini'
    }
  }
</script>

<style>
  .home-links a {
    margin-right: 1rem;
  }
</style>

<page-query>
query {
  allCategory {
    totalCount
    edges {
      node {
        id
        path
        name
        description
      }
    }
  }
}
</page-query>
