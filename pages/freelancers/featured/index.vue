<template>
  <section class="container">
    <page-nav :navs="pageNav.navs" :parent="pageNav.parent" />
    <section class="cards">
      <auct-card title="Dominus Kelvin" />
      <auct-card title="Auctionlance Platform" />
      <auct-card title="Aleksei Pupyshev" />
    </section>
  </section>
</template>

<script>
import PageNav from '@/components/PageNav.vue'
import AuctCard from '@/components/AuctCard.vue'
export default {
  head() {
    return {
      title: 'Top Notch Freelancers'
    }
  },
  components: {
    PageNav,
    AuctCard
  },
  computed: {
    pageNav() {
      return this.$store.state.freelancers.pageNav
    }
  }
}
</script>

<style scoped>
.exact-active-link {
  color: #000;
}
</style>
