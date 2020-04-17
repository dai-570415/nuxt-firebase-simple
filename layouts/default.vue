<template>
  <div class="container">
    <header>
      <nuxt-link to="/">Nuxt.js & Firebase</nuxt-link>
    </header>
    <main>
      <nuxt />
    </main>
    <footer class="footer">
        ©︎2020 Nuxt
    </footer>
  </div>
</template>

<script>
  export default {

  }
</script>
  
<style>
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
  ul li {
    display: inline-block;
    list-style: none;
  }
</style>
