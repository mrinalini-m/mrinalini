<template>
  <Layout>
    <section class="tags">
      <TagList
        v-for="edge in $page.allTag.edges"
        :key="edge.node.id"
        :tag="edge.node"
      />
    </section>
  </Layout>
</template>

<script>
  import TagList from '@/components/TagList'
  export default {
    components: {
      TagList
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
  allTag {
    totalCount
    edges {
      node {
        id
        path
        name
      }
    }
  }
}
</page-query>
