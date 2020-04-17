<template>
  <div class="index">
    <h2>Index</h2>
    <AppNavigtion />
  </div>
</template>

<script>
  import AppNavigtion from '~/components/AppNavigation.vue';

  export default {
      name: 'Index',
      components: { AppNavigtion },
  }
</script>

<style scoped>
  ul li {
    display: inline-block;
  }
</style>