<template>
  <section class="container">
    <page-nav :navs="pageNav.navs" :parent="pageNav.parent" />
    <section class="cards">
      <auct-card
        title="Create a mobile app"
        subtitle="Ventures Platform | Starting at 50 Waves"
      />
      <auct-card
        title="Create a smart contract"
        subtitle="Ventuary | Starting at 2000 Waves"
      />
      <auct-card
        title="Create an iOS app"
        subtitle="MTN | Starting at 100 Waves"
      />
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
      title: 'Auctions'
    }
  },
  components: {
    PageNav,
    AuctCard
  },
  computed: {
    pageNav() {
      return this.$store.state.auctions.pageNav
    }
  }
}
</script>
