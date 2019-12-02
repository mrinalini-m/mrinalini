<template>
  <Layout>
    <section class="posts">
      <CategoryList
        v-for="edge in $page.allCategory.edges"
        :key="edge.node.id"
        :category="edge.node"
      />
      <PostList
        v-for="edge in $page.allPost.edges"
        :key="edge.node.id"
        :post="edge.node"
      />
    </section>
  </Layout>
</template>

<script>
  import PostList from '@/components/PostList'
  import CategoryList from '@/components/CategoryList'

  export default {
    components: {
      PostList,
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
    allPost {
      totalCount
      edges {
        node {
          id
          title
          timeToRead
          date (format: "D MMMM YYYY")
          path
          tags{name}
        }
      }
    }
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
