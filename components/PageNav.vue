<template>
  <section class="page-nav">
    <ul>
      <li v-for="nav in navs" :key="nav">
        <nuxt-link :to="`/${parent}/${nav}`">{{ nav }}</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    navs: {
      type: Array,
      default: () => []
    },
    parent: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.page-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}
.page-nav ul > li {
  margin-right: 2em;
}

.page-nav li a {
  text-decoration: none;
  color: #c4c4c4;
}
</style>
