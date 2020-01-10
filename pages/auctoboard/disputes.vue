<template>
  <div>
    <div class="auctoboard-card">
      <div class="header">
        <strong>Jobs In Disputes: {{ jobsInDisputeCount }}</strong>
      </div>
      <div v-for="job in preparedDisputes" :key="job.key" class="body">
        <div v-if="job.votes !== 5" class="jobs-card">
          <h3>
            <nuxt-link :to="`/jobs/${job.key}/details`" class="auct-link">{{
              job.info.title
            }}</nuxt-link>
          </h3>
          <div class="summary">
            <div class="duration">
              <p>
                {{ job.votes }} vote<span
                  v-if="job.votes.length !== 0 && job.votes.length > 1"
                  >s</span
                >
              </p>
              <div v-if="!job.currentAmbassadorVote" class="vote">
                <button
                  class="bid-btn"
                  :disabled="voting"
                  @click="vote(job.key, 'CL')"
                >
                  Client
                </button>
                <button
                  class="bid-btn"
                  :disabled="voting"
                  @click="vote(job.key, 'FL')"
                >
                  Freelancer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  middleware: 'isArbiter',
  data() {
    return {
      voting: false
    }
  },
  computed: {
    ...mapState(['dAppAddress']),
    ...mapState('disputes', ['preparedDisputes']),
    ...mapGetters('disputes', ['jobsInDisputeCount'])
  },
  asyncData({ store }) {
    if (!store.getters['disputes/isArbiter']) return
    store.dispatch('disputes/getJobsState').then(() => {
      store.dispatch('disputes/getJobsInDisputeInfo').then(() => {
        store.dispatch('disputes/setUpJobs').then(() => {
          store
            .dispatch('disputes/updateDisputedJobsWithAmbassadorVote')
            .then(() => {})
        })
      })
    })
  },
  methods: {
    vote(auctionId, vote) {
      this.voting = true
      const tx = {
        type: 16,
        data: {
          dApp: this.dAppAddress,
          call: {
            function: 'voteDispute',
            args: [
              { type: 'string', value: auctionId },
              { type: 'string', value: vote }
            ]
          },
          payment: [],
          fee: {
            assetId: 'WAVES',
            amount: '500000'
          }
        }
      }
      // eslint-disable-next-line no-undef
      WavesKeeper.signAndPublishTransaction(tx)
        .then((data) => {
          this.voting = false
          this.$toast.success('👍 Voting successful')
        })
        .catch((error) => {
          this.$toast.error(
            `😰 Oops this is embarrasing something went wrong - ${error.message}. Try again`
          )
          this.voting = false
        })
    }
  }
}
</script>

<style>
h3 > a {
  color: #d73f2e;
}
.vote {
  margin-top: 1em;
}
.manage-section {
  align-self: flex-end;
}
</style>
