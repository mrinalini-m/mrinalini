<template>
  <Layout>
    <br />
    <g-link to="/" class="link"> &larr; Go Back</g-link>
    <div class="title">
      <h1>{{ $page.post.title }}</h1>
      <p class="date">
        {{ $page.post.date }}
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

<style lang="scss">
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

  code[class*='language-'],
  pre[class*='language-'],
  pre {
    ::selection {
      background: rgba(150, 150, 150, 0.3) !important; 
    }
    code {
      font-family: $code-font-family;
      font-size: 13px;
      direction: ltr;
      text-align: left;
      white-space: pre-wrap;
      word-spacing: normal;
      word-break: normal;
      line-height: 1.7;
      font-weight: 400;
      margin: 2rem 0;
      tab-size: 2;
      hyphens: none;
      -webkit-font-smoothing: antialiased;
      display: block;
      padding: 1.5rem;
      overflow: auto;
      border: 0;
      box-shadow: 2px 4px 25px rgba(0, 0, 0, 0.15);
    }
  }
</style>
