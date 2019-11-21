<template>
  <Layout>
    <h1>{{ $page.tag.title }}</h1>
    <ul>
      <li v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id">
        <g-link :to="edge.node.path">
          {{ edge.node.title }}
        </g-link>
      </li>
    </ul>
  </Layout>
</template>
<page-query>
query ($id: ID!) {
  tag(id: $id) {
    name
    belongsTo {
      edges {
        node {
          ... on Post {
            id
            title
            path
          }
        }
      }
    }
  }
}
</page-query>
<style>
  .title {
    text-align: center;
    font-size: 30px;
    line-height: 10px;
    padding: 2em 0;
    font-family: 'Stylish';
  }

  .date {
    font-size: 16px;
    font-weight: 400;
  }

  .content {
    font-size: 20px;
  }
</style>
