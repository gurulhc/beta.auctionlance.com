<template>
  <div>
    <h3>👋 Howdy, {{ user.name }}</h3>
    <div v-if="user.userType === 'freelancer'" class="overview">
      <div class="statistics">
        <h2>Earnings</h2>
        <div class="overview-cards">
          <div class="overview-card">
            <h3>{{ pendingEarnings }}</h3>
            <p>Pending Earnings</p>
          </div>
          <div class="overview-card">
            <h3>{{ paidEarnings }}</h3>
            <p>Paid Earnings</p>
          </div>
          <div class="overview-card">
            <h3>{{ totalEarnings }}</h3>
            <p>Total Earnings</p>
          </div>
        </div>
      </div>
      <div class="statistics jobs">
        <h2>Jobs</h2>
        <div class="overview-cards">
          <div class="overview-card">
            <h3>{{ jobsPending }}</h3>
            <p>Jobs Pending</p>
          </div>
          <div class="overview-card">
            <h3>{{ jobsCompleted }}</h3>
            <p>Jobs Completed</p>
          </div>
          <div class="overview-card">
            <h3>{{ jobsTotal }}</h3>
            <p>Total Jobs</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="overview">
      <div class="statistics">
        <h2>Jobs</h2>
        <div class="overview-cards">
          <div class="overview-card">
            <h3>{{ jobsOnGoing }}</h3>
            <p>Jobs On-going</p>
          </div>
          <div class="overview-card">
            <h3>{{ jobsCreated }}</h3>
            <p>Jobs Created</p>
          </div>
          <div class="overview-card">
            <h3>{{ jobsInDispute }}</h3>
            <p>Jobs in Dispute</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['user']),
    ...mapState(['currentUserKey']),
    ...mapState('freelancers', [
      'pendingEarnings',
      'paidEarnings',
      'totalEarnings',
      'jobsPending',
      'jobsCompleted',
      'jobsTotal'
    ]),
    ...mapState('client', ['jobsCreated', 'jobsOnGoing', 'jobsInDispute'])
  },
  mounted() {
    if (this.user.userType === 'freelancer') {
      this.getFreelancerJobStat(this.currentUserKey)
      this.getAllEarningsStat(this.currentUserKey)
    } else {
      this.getClientJobsStat(this.currentUserKey)
    }
  },
  methods: {
    ...mapActions('freelancers', [
      'getPendingEarnings',
      'getPaidEarnings',
      'getTotalEarnings',
      'getPendingJobs',
      'getCompletedJobs',
      'getTotalJobs'
    ]),
    ...mapActions('client', [
      'getCreatedJobs',
      'getOngoingJobs',
      'getJobsInDispute'
    ]),
    getAllEarningsStat(publicKey) {
      this.getPendingEarnings(publicKey)
      this.getPaidEarnings(publicKey)
      this.getTotalEarnings(publicKey)
    },
    getFreelancerJobStat(publicKey) {
      this.getPendingJobs(publicKey)
      this.getCompletedJobs(publicKey)
      this.getTotalJobs(publicKey)
    },
    getClientJobsStat(publicKey) {
      this.getCreatedJobs(publicKey)
      this.getOngoingJobs(publicKey)
      this.getJobsInDispute(publicKey)
    }
  }
}
</script>

<style scoped lang="scss">
$primary-color: #e4432d;
h2 {
  font-size: 0.6em;
}
.statistics {
  margin-bottom: 2em;
}
.overview-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2em;

  .overview-card {
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 0.3em 0.9em;
    border-radius: 3px;

    h3 {
      font-size: 2.5em;
      color: $primary-color;
      margin: 0;
    }
    p {
      font-size: 0.7em;
      color: rgba(0, 0, 0, 0.4);
      margin-top: 0;
    }
  }
}
</style>
