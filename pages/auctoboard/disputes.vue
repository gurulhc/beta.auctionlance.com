<template>
  <div>
    <div class="auctoboard-card">
      <div class="header">
        <strong>Jobs In Disputes: {{ jobsInDisputeCount }}</strong>
      </div>
      <div v-for="job in currentDisputes" :key="job.key" class="body">
        <div class="jobs-card">
          <h3>{{ job.info.title }}</h3>
          <div class="summary">
            <div class="duration">
              <p>Delivery in {{ job.info.auctionDuration }} Days</p>
            </div>
            <div class="budget manage-section">
              <nuxt-link
                :to="`/jobs/${getKey(job.key)}/details`"
                class="bid-btn"
                >Manage</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'isArbiter',
  computed: {
    ...mapState('disputes', ['currentDisputes', 'jobsInDisputeCount'])
  },
  asyncData({ store }) {
    if (!store.state.disputes.isArbiter) return
    store.dispatch('disputes/getJobsState').then(() => {
      store.dispatch('disputes/getJobsInDisputeInfo').then(() => {
        store.dispatch('disputes/setUpJobs')
      })
    })
  }
}
</script>

<style></style>
