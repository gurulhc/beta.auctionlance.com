<template>
  <div>
    <div v-if="user.userType === 'freelancer'" class="auctoboard-card">
      <div class="header">
        <strong>Projects you are working on</strong>
      </div>
      <div v-for="job in freelancerJobs" :key="job.key" class="body">
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
    <div v-if="user.userType === 'freelancer'" class="auctoboard-card">
      <div class="header">
        <strong>{{ this.freelancerAuctionSuggestions.length }}</strong> Jobs
        Opening available for you
      </div>
      <div
        v-for="job in freelancerAuctionSuggestions"
        :key="job.key"
        class="body"
      >
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
          <nuxt-link :to="`/jobs/${getKey(job.key)}/details`" class="bid-btn"
            >Bid now</nuxt-link
          >
        </div>
      </div>
    </div>
    <!-- Client -->
    <div v-else class="auctoboard-card">
      <div class="header">
        You have created
        <strong>{{ this.clientJobs.length }}</strong> auctions
      </div>
      <div v-for="job in clientJobs" :key="job.key" class="body">
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
          <nuxt-link :to="`/jobs/${getKey(job.key)}/details`" class="bid-btn"
            >View</nuxt-link
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
  data() {
    return {
      freelancerJobs: [],
      clientJobs: []
    }
  },
  fetch({ store }) {
    // eslint-disable-next-line no-undef
    store.dispatch('loadJobs')
  },
  computed: {
    ...mapState(['jobs', 'currentUserKey', 'dAppAddress', 'wavesBaseURL']),
    ...mapState('auth', ['user']),
    freelancerAuctionSuggestions() {
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
    this.userJobs()
  },
  methods: {
    getKey(val) {
      const key = val.split('_')[0]
      return key
    },
    isJson(str) {
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true
    },
    userJobs() {
      if (this.user.userType === 'freelancer') {
        this.$axios
          .$get(
            `${this.wavesBaseURL}${this.dAppAddress}?matches=.*?_HiredFreelancer$`
          )
          .then((data) => {
            data
              .filter((datum) => datum.value === this.currentUserKey)
              .map((datum) => {
                this.$axios
                  .$get(
                    `${this.wavesBaseURL}${this.dAppAddress}/${
                      datum.key.split('_')[0]
                    }_Info`
                  )
                  .then((data) => {
                    if (!this.isJson(data.value)) return
                    const job = {
                      info: JSON.parse(data.value),
                      key: data.key
                    }
                    this.freelancerJobs.push(job)
                  })
              })
          })
      } else {
        this.$axios
          .$get(
            `${this.wavesBaseURL}${this.dAppAddress}?matches=.*?_AuctionClient$`
          )
          .then((data) => {
            data
              .filter((datum) => datum.value === this.currentUserKey)
              .map((datum) => {
                this.$axios
                  .$get(
                    `${this.wavesBaseURL}${this.dAppAddress}/${
                      datum.key.split('_')[0]
                    }_Info`
                  )
                  .then((data) => {
                    if (!this.isJson(data.value)) return
                    const job = {
                      info: JSON.parse(data.value),
                      key: data.key
                    }
                    this.clientJobs.push(job)
                  })
              })
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.manage-section {
  justify-self: flex-end;
}
</style>
