<template>
  <div>
    <div class="auctoboard-card">
      <div class="header">
        <strong>{{ this.freelancerJobs.length }}</strong> Jobs Opening available
        for you
      </div>
      <div v-for="job in freelancerJobs" :key="job.id" class="body">
        <div class="jobs-card">
          <h3>{{ job.info.title }}</h3>
          <div class="summary">
            <div class="duration">
              <p>{{ job.info.auctionDuration }} Days</p>
              <p class="duration-label">Duration</p>
            </div>
            <div class="budget">
              <p>{{ job.info.amount }} Waves</p>
              <p class="budget-label">Starting At</p>
            </div>
          </div>
          <div class="description">
            <p>
              {{ job.info.description }}
            </p>
          </div>
          <nuxt-link :to="`/jobs/${job.key}/details`" class="bid-btn"
            >Bid now</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: ['isAuthenticated'],
  head() {
    return {
      title: 'Jobs Feed'
    }
  },
  fetch({ store }) {
    // eslint-disable-next-line no-undef
    store.dispatch('loadJobs')
  },
  computed: {
    ...mapState(['jobs']),
    ...mapState('auth', ['user']),
    freelancerJobs() {
      /**
       * Using the some higher order function of Array.prototype, I get all tags belonging to a user then use them as input for the includes function to test if at least some of the usesr tags are in the job tags thereby updating the jobs feed. Pretty smart eh, I know
       */
      const freelancerJobs = this.jobs.filter((job) => {
        return this.user.tags.some((tag) => job.info.tags.includes(tag))
      })

      return freelancerJobs
    }
  },
  mounted() {
    console.log(this.freelancerJobs)
    console.log(this.jobs)
    console.log(this.user)
  }
}
</script>

<style scoped lang="scss"></style>
