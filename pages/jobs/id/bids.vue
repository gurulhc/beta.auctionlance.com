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
      </div>
    </div>
  </div>
  <div v-else class="no-bids">
    <p class="subtitle">😴 Bids will show here</p>
  </div>
</template>

<script>
export default {
  filters: {
    amount(value) {
      return value / 100000000
    }
  },
  props: {
    job: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      bids: []
    }
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
                  freelancerKey: freelancer.key.split('_')[0]
                }
                this.bids.push(bids)
              })
          })
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
</style>
