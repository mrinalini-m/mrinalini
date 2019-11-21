<template>
  <Layout>
    <br />
    <g-link to="/" class="link"> &larr; Go Back</g-link>
    <div class="title">
      <h1>{{ $page.post.title }}</h1>
      <p class="date">
        {{ $page.post.date }} | {{ $page.post.timeToRead }} min read
      </p>
    </div>
    <div class="content">
      <div v-for="tag in $page.post.tags" :key="tag.id">
        <p>{{ tag.name }}</p>
      </div>
      <p v-html="$page.post.content" />
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
   post: post (path: $path) {
    id
    title
    content
    date (format: "D MMMM YYYY")
    timeToRead
    tags{name}
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
