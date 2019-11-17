<template>
  <div>
    <section class="search-wrapper">
      <input
        id="search"
        type="text"
        name="search"
        placeholder="Search for jobs"
        class="search"
      />
      <div class="wrapper">
        <p>{{ jobs.length }} auctions found</p>
      </div>
    </section>
    <section v-if="jobs.length" class="container jobs">
      <div v-for="job in jobs" :key="job.key" class="job">
        <div class="jobs-card">
          <h3>{{ job.info.title }}</h3>
          <div class="summary">
            <div class="duration">
              <p>
                {{ job.info.auctionDuration }} Day<span
                  v-if="job.info.auctionDuration > 1"
                  >s</span
                >
              </p>
              <p class="duration-label">Duration</p>
            </div>
            <div class="budget">
              <p>{{ job.info.amount }} Waves</p>
              <p class="budget-label">Starting Amount</p>
            </div>
          </div>
          <div class="description">
            <p>
              {{ job.info.description }}
            </p>
          </div>
          <nuxt-link
            :to="`/jobs/${job.key.split('_')[0]}/details`"
            class="bid-btn"
            ><span v-if="user.userType === 'freelancer'">Bid now</span>
            <span v-else>View</span></nuxt-link
          >
        </div>
      </div>
    </section>
    <section v-else class="container">
      <p>Loading auctions...</p>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  scrollToTop: false,
  head() {
    return {
      title: '💼 Auctions'
    }
  },
  computed: {
    ...mapState(['dAppAddress', 'wavesBaseURL', 'jobs']),
    ...mapState('auth', ['user'])
  },
  fetch({ store }) {
    // eslint-disable-next-line no-undef
    store.dispatch('loadJobs')
  }
}
</script>
<style lang="scss" scoped>
.search-wrapper {
  background-color: #d73f2e;
  padding: 1em 4em;
  p {
    margin: 0;
    padding: 0;
    margin-top: 0.5rem;
  }
  input.search {
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 1em 2em;
    width: 45%;
  }

  .wrapper {
    display: flex;
    color: #fff;
    justify-content: space-between;
    .filter-section {
      display: flex;
      align-self: baseline;
      justify-self: flex-end;

      p {
        line-height: normal;
        font-size: 0.8em;
      }
    }
  }
}

.jobs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 2em;
  padding: 1em 5em;

  .job {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    padding: 1em 2em;
  }
}
</style>
