<template>
  <div v-if="user.userType === 'freelancer'" class="overview">
    <div class="statistics">
      <h2>Earnings</h2>
      <div class="overview-cards">
        <div class="overview-card">
          <h3>{{ earnings.pending }}</h3>
          <p>Pending Earnings</p>
        </div>
        <div class="overview-card">
          <h3>{{ earnings.paid }}</h3>
          <p>Paid Earnings</p>
        </div>
        <div class="overview-card">
          <h3>{{ earnings.total }}</h3>
          <p>Total Earnings</p>
        </div>
      </div>
    </div>
    <div class="statistics jobs">
      <h2>Jobs</h2>
      <div class="overview-cards">
        <div class="overview-card">
          <h3>{{ jobs.pending }}</h3>
          <p>Jobs Pending</p>
        </div>
        <div class="overview-card">
          <h3>{{ jobs.completed }}</h3>
          <p>Jobs Completed</p>
        </div>
        <div class="overview-card">
          <h3>{{ jobs.total }}</h3>
          <p>Total Jobs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      jobs: {
        pending: 0,
        completed: 0,
        total: 0
      },
      earnings: {
        pending: 0,
        paid: 0,
        total: 0
      }
    }
  },
  computed: {
    ...mapState('auth', ['user'])
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
