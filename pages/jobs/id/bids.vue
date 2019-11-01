<template>
  <div v-if="bids.length > 0" class="bids">
    <div v-for="bid in bids" :key="bid.bidDetails.key" class="bid">
      <div class="freelancer-section">
        <img
          :src="bid.freelancer.avatar.secure_url"
          :alt="bid.freelancer.name"
        />
        <h3>
          <nuxt-link :to="`/freelancers/${bid.freelancerKey}/profile`">{{
            bid.freelancer.name
          }}</nuxt-link>
        </h3>
      </div>
      <div class="bid-section">
        💰 {{ bid.bidDetails.value | amount }} Waves
        <button
          v-if="isAuctionClient && auctionStatus === 'open'"
          class="hire-button"
          :disabled="!isAuctionClient"
          @click="chooseFreelancer(bid.bidKey, bid.freelancerKey)"
        >
          <spinner
            v-if="choosingFreelancer && bid.freelancerKey === chosenFreelancer"
            color="#000"
          />
          <span v-else>Hire</span>
        </button>
        <span
          v-if="
            isAuctionClient && bid.freelancerKey === winningFreelancer.value
          "
          class="winner"
          >🥇Winner</span
        >
      </div>
    </div>
  </div>
  <div v-else class="no-bids">
    <p class="subtitle">😴 Bids will show here</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from '@/components/Spinner.vue'
export default {
  middleware: 'isAuthenticated',
  filters: {
    amount(value) {
      return value / 100000000
    }
  },
  components: {
    Spinner
  },
  props: {
    job: {
      type: Object,
      default() {
        return {}
      }
    },
    isAuctionClient: {
      type: Boolean
    },
    auctionStatus: {
      type: String
    },
    winningFreelancer: {
      type: Object
    },
    updateJob: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      bids: [],
      choosingFreelancer: false,
      chosenFreelancer: ''
    }
  },
  computed: {
    ...mapState(['dAppAddress', 'currentAuctionData', 'currentUserKey'])
  },
  mounted() {
    this.getBids()
  },
  methods: {
    getBids() {
      const auctionId = this.job.key.split('_')[0]
      this.$axios
        .$get(
          `https://nodes-testnet.wavesnodes.com/addresses/data/3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2?matches=^${auctionId}_Bid_.*$`
        )
        .then((res) => {
          const bids = res
          bids.map((bid) => {
            const bidKeyArray = bid.key.split('_')
            const freelancerKey = bidKeyArray[bidKeyArray.length - 1]
            this.$axios
              .$get(
                `https://nodes-testnet.wavesnodes.com/addresses/data/3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2/${freelancerKey}_Freelancer`
              )
              .then((freelancer) => {
                const bids = {
                  bidDetails: bid,
                  freelancer: JSON.parse(freelancer.value),
                  freelancerKey: freelancer.key.split('_')[0],
                  bidKey: bidKeyArray[0]
                }
                this.bids.push(bids)
              })
          })
        })
    },
    chooseFreelancer(bidKey, freelancerKey) {
      if (!this.isAuctionClient) {
        this.$toast.info(
          'Oops only the Auction client can hire a freelancer for this project'
        )
        return
      }
      this.choosingFreelancer = true
      this.chosenFreelancer = freelancerKey
      const tx = {
        type: 16,
        data: {
          dApp: this.dAppAddress,
          call: {
            function: 'chooseFreelancer',
            args: [
              { type: 'string', value: bidKey },
              { type: 'string', value: freelancerKey }
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
          console.log(tx)
          this.choosingFreelancer = false
          this.$toast.success('😍 Freelancer choosen successfully')
          this.updateJob()
          // Creating chat connection
          try {
            const formData = new FormData()
            formData.append('UID', `AUCTIONLANCER${this.currentUserKey}`)
            formData.append('friendsUID', `AUCTIONLANCER${this.freelancerKey}`)

            const config = {
              headers: {
                'api-key': process.env.Comet_Chat_API_Key
              }
            }

            this.$axios
              .$post(
                'https://api.cometondemand.net/api/v2/addFriends',
                formData,
                config
              )
              .then((data) => {
                console.log(data)
                this.$toast.success('😍 Client can now chat with you')
              })
              .catch((error) => {
                console.log(error)
              })
          } catch (error) {
            console.log(error)
            this.$toast.info("You can't chat with freelancer at the moment")
          }
        })
        .catch((error) => {
          this.choosingFreelancer = false
          this.$toast.error(
            '🙁 Something went wrong in choosing this freelancer. Try again'
          )
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.bids {
  margin-top: 2em;
}
.bid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1em;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  margin-bottom: 0.7em;

  h3 {
    font-size: 0.8em;
    a {
      text-decoration: none;
      color: #000;
      transition: all 300ms;
      &:hover {
        color: #d73f2e;
      }
    }
  }
  .freelancer-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  img {
    width: 64px;
    height: 64px;
    object-fit: cover;
    margin-right: 0.6em;
    border-radius: 3px;
  }
}
.no-bids {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6em;
  height: 30vh;
}

.bid-section {
  display: flex;
  flex-direction: column;

  .hire-button {
    border: 1px solid #d73f2e;
    padding: 0.5em 0.7em;
    border-radius: 3px;
    justify-self: baseline;
    cursor: pointer;
    transition: all 300ms;
    font-size: 0.7em;
    margin-top: 0.4em;

    &:hover {
      color: #fff;
      background-color: #d73f2e;
    }
  }
}
</style>
