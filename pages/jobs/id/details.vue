<template>
  <div>
    <section class="description-card">
      <section class="heading">
        <section class="title">
          <h3>Auction Details</h3>
        </section>
        <section class="other-info">
          <p class="info-major">
            💰 {{ auctionPrice.value | amount }} {{ auctionAssetName.value }}
          </p>
          <p class="info-minor">
            Auction closes in {{ job.info.auctionDuration | day }}
          </p>
          <p class="info-minor">
            Job when awarded would last for {{ job.info.jobExecution | day }}
          </p>
        </section>
      </section>
      <section class="body">
        <p class="description">{{ job.info.description }}</p>
      </section>
    </section>
    <section
      v-if="
        user.userType === 'freelancer' &&
          winningFreelancer.value !== currentUserKey
      "
      class="description-card"
    >
      <section class="heading">
        <section class="title">
          <h3>Place a bid on this Auction</h3>
        </section>
      </section>
      <section class="body">
        <form v-if="auctionStatus == 'open'" @submit.prevent="makeBid">
          <div class="form-group">
            <label for="bidAmount"
              >Bid Amount({{ auctionAssetName.value }})</label
            >
            <input
              v-model="amount"
              type="text"
              placeholder="Enter bid amount"
            />
          </div>
          <button type="submit" class="create-button" :disabled="!amount">
            <spinner v-if="makingBid"></spinner>
            <span v-else>🤓 Make Bid</span>
          </button>
        </form>
        <p
          v-else-if="!isAuctionClient && auctionStatus !== 'open'"
          class="auction-won"
        >
          🤭 This auction has been won already. Try
          <nuxt-link to="/jobs">another</nuxt-link> one
        </p>
      </section>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from '@/components/Spinner.vue'
export default {
  middleware: 'isAuthenticated',
  filters: {
    day(value) {
      return value > 1 ? `${value} days` : `${value} day`
    },
    amount(value) {
      return value / 100000000
    }
  },
  components: {
    Spinner
  },
  props: {
    winningFreelancer: {
      type: Object,
      default() {
        return {}
      }
    },
    job: {
      type: Object,
      required: true
    },
    auctionStatus: {
      type: String,
      default: ''
    },
    isAuctionClient: {
      type: Boolean
    },
    auctionPrice: {
      type: Object,
      default() {
        return {}
      }
    },
    auctionAssetName: {
      type: Object,
      default() {
        return {}
      }
    },
    updateJob: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      amount: '',
      makingBid: false
    }
  },
  computed: {
    ...mapState(['dAppAddress', 'currentAuctionData', 'currentUserKey']),
    ...mapState('auth', ['user'])
  },
  methods: {
    makeBid() {
      if (this.user.userType === 'freelancer') {
        this.makingBid = true
        if (typeof Number(this.amount) !== 'number' || this.amount === '') {
          this.$toast.error('😬 hey, enter an amount. It should be a number')
          this.makingBid = false
        } else {
          const auctionId = this.job.key.split('_')[0]
          const tx = {
            type: 16,
            data: {
              dApp: this.dAppAddress,
              call: {
                function: 'makeBid',
                args: [
                  { type: 'string', value: auctionId },
                  { type: 'integer', value: Number(this.amount * 100000000) }
                ]
              },
              payment: [],
              fee: {
                assetId: 'WAVES',
                amount: 500000
              }
            }
          }
          // eslint-disable-next-line no-undef
          WavesKeeper.signAndPublishTransaction(tx)
            .then((data) => {
              this.makingBid = false
              this.$toast.success('😍 Bid made successfully')
              this.updateJob()
            })
            .catch((error) => {
              this.makingBid = false
              this.$toast.error(
                `🙁 Something went wrong in making your bid - ${error.message}. Try again`
              )
            })
        }
      } else {
        this.$toast('Only freelancers can bid on an auction')
      }
    }
  }
}
</script>

<style scoped lang="scss">
h1,
h2,
h3,
p {
  margin: 0;
  padding: 0;
}
.description-card {
  margin-top: 1em;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding-bottom: 2em;

  .heading {
    border-bottom: 1px solid #dedede;
    padding: 0.8em 2.5em;
    margin-bottom: 1em;
    display: flex;
    align-items: center;

    h3 {
      font-size: 20px;
      line-height: 1.4;
    }

    .other-info {
      justify-self: flex-end;
      align-self: flex-end;
      flex-grow: 1;
      text-align: right;

      .info-minor {
        font-size: 0.7em;
        color: rgb(61, 59, 59);
        line-height: 1.3;
      }
    }
  }

  .body {
    padding: 0.4em 1em;

    .description {
      font-size: 0.8em;
      line-height: 1.43;
    }
  }

  .form-group {
    label {
      display: block;
      font-size: 0.6em;
    }
    input {
      border: 1px solid #dedede;
      padding: 0.6em 0.6em;
      border-radius: 3px;
      margin-bottom: 2em;
      margin-top: 2em;
      width: 60%;
    }
  }
}
.winner {
  text-align: center;
  color: green;
}
</style>
