<template>
  <section class="container">
    <page-nav :navs="pageNav.navs" :parent="pageNav.parent" />
    <section class="cards">
      <auct-card
        title="Create a mobile app"
        subtitle="Ventures Platform | 50 Waves"
      />
      <auct-card
        title="Create a smart contract"
        subtitle="Ventuary | 2000 Waves"
      />
      <auct-card title="Create an iOS app" subtitle="MTN | 100 Waves" />
    </section>
  </section>
</template>
<script>
import PageNav from '@/components/PageNav.vue'
import AuctCard from '@/components/AuctCard.vue'
export default {
  middleware: 'isAuthenticated',
  head() {
    return {
      title: 'Jobs currently being auctioned'
    }
  },
  components: {
    PageNav,
    AuctCard
  },
  computed: {
    pageNav() {
      return this.$store.state.jobs.pageNav
    }
  }
}
</script>
