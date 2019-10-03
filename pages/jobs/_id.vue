<template>
  <main class="container">
    <section class="heading">
      <div class="textual">
        <h1 class="title">{{ job.info.title }}</h1>
        <p class="subtitle">Skills Required:</p>
        <ul class="tags">
          <li v-for="tag in job.info.tags" :key="tag">{{ tag }}</li>
        </ul>
      </div>
      <div class="status-container">
        <span
          v-if="
            isAuctionClient ||
              winningFreelancer.value === currentUserKey ||
              auctionStatus === 'Suggested' ||
              auctionStatus === 'Opened'
          "
          class="status"
          >{{ auctionStatus }}</span
        >
        <button
          v-if="
            currentUserKey === winningFreelancer.value &&
              auctionStatus === 'on going'
          "
          @click="deliverJob"
        >
          <spinner v-if="isDelivering" />
          <span v-else>🚚 Deliver</span>
        </button>
        <button
          v-else-if="auctionStatus === 'delivered' && isAuctionClient"
          class="accept"
          @click="acceptWork"
        >
          <spinner v-if="isAcceptingWork" />
          <span v-else>👍 Accept and Pay</span>
        </button>
      </div>
    </section>
    <section class="content">
      <ul class="nav">
        <li>
          <nuxt-link :to="`/jobs/${job.key.split('_')[0]}/details`"
            >Details</nuxt-link
          >
        </li>
        <li>
          <nuxt-link :to="`/jobs/${job.key.split('_')[0]}/bids`">
            Bids</nuxt-link
          >
        </li>
      </ul>
      <nuxt-child
        :job="job"
        :is-auction-client="isAuctionClient"
        :auction-status="auctionStatus"
        :auction-price="auctionStartingPrice"
        :auction-asset-name="auctionAssetName"
        :winning-freelancer="winningFreelancer"
        :update-job="updateJob"
      />
    </section>
  </main>
</template>

<script>
/* eslint-disable unicorn/prefer-starts-ends-with */
import { mapState } from 'vuex'
import Spinner from '@/components/Spinner.vue'
export default {
  scrollToTop: false,
  middleware: 'isAuthenticated',
  head() {
    return {
      title: this.job.info.title
    }
  },
  components: {
    Spinner
  },
  computed: {
    ...mapState(['currentUserKey', 'currentAuctionData', 'dAppAddress']),
    job() {
      console.log(this.currentAuctionData)
      const info = this.currentAuctionData.filter(
        (info) => info.key.endsWith('_Info') && info.value !== 'newAuctiondata'
      )
      const [auction] = info
      console.log(auction)
      return {
        key: auction.key,
        info: JSON.parse(auction.value)
      }
    },
    status() {
      const status = this.currentAuctionData.filter((status) =>
        status.key.endsWith('_State')
      )
      const [auctionStatus] = status
      return auctionStatus
    },
    auctionClient() {
      const client = this.currentAuctionData.filter(
        (client) =>
          client.key.endsWith('_AuctionClient') ||
          client.key.endsWith('_Client')
      )
      const [auctionClient] = client
      return auctionClient
    },
    auctionStartingPrice() {
      const auctionStartingPrice = this.currentAuctionData.filter((price) =>
        price.key.endsWith('_Price')
      )
      const [price] = auctionStartingPrice
      return price
    },
    auctionAssetName() {
      const assetName = this.currentAuctionData.filter((assetName) =>
        assetName.key.endsWith('_AssetName')
      )
      const [asset] = assetName
      return asset
    },
    winningFreelancer() {
      const freelancer = this.currentAuctionData.filter((freelancer) =>
        freelancer.key.endsWith('_HiredFreelancer')
      )
      const [winningFreelancer] = freelancer

      return winningFreelancer || {}
    },
    isAuctionClient() {
      return this.currentUserKey === this.auctionClient.value
    },
    auctionStatus() {
      let status = ''
      switch (this.status.value) {
        case 'Suggested':
        case 'Opened':
          status = 'open'
          break
        case 'InProgress':
          status = 'on going'
          break
        case 'Canceled':
          status = 'canceled'
          break
        case 'WaitForConfirmation':
          status = 'delivered'
          break
        case 'Completed':
          status = 'completed'
          break
        case 'Dispute':
          status = 'in dispute'
          break
        case 'DisputeResolved':
          status = 'dispute resolved'
          break
      }
      return status
    }
  },
  fetch({ store, $axios, params }) {
    return $axios
      .$get(
        `https://nodes-testnet.wavesnodes.com/addresses/data/3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2?matches=^${params.id}.*$`
      )
      .then((res) => {
        store.commit('UPDATE_CURRENT_AUCTION_DATA', res)
      })
  },
  data() {
    return {
      isDelivering: false,
      isAcceptingWork: false
    }
  },
  methods: {
    updateJob() {
      this.$axios
        .$get(
          `https://nodes-testnet.wavesnodes.com/addresses/data/3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2?matches=^${this.$route.params.id}.*$`
        )
        .then((res) => {
          this.$store.commit('UPDATE_CURRENT_AUCTION_DATA', res)
        })
    },
    deliverJob() {
      this.isDelivering = true
      const auctionId = this.job.key.split('_')[0]
      const tx = {
        type: 16,
        data: {
          dApp: this.dAppAddress,
          call: {
            function: 'workHandOver',
            args: [{ type: 'string', value: auctionId }]
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
          this.isDelivering = false
          this.$toast.success('🔥 Successfully delivered')
          this.updateJob()
        })
        .catch((error) => {
          this.isDelivering = false
          this.$toast.error(
            '🙁 Something went wrong in delivering this project. Try again'
          )
          console.log(error)
        })
    },
    acceptWork() {
      this.isAcceptingWork = true
      const auctionId = this.job.key.split('_')[0]
      const tx = {
        type: 16,
        data: {
          dApp: this.dAppAddress,
          call: {
            function: 'acceptWork',
            args: [{ type: 'string', value: auctionId }]
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
          this.isAcceptingWork = false
          this.$toast.success('🤑 Work Accepted Successfully')
          this.updateJob()
        })
        .catch((error) => {
          this.isAcceptingWork = false
          this.$toast.error(
            '🙁 Something went wrong in accepting this project. Try again'
          )
          console.log(error)
        })
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
}
.container {
  width: 60vw;
  margin: 1em auto;
  min-height: 100vh;

  .heading {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 1em;

    .profile-avatar {
      border-radius: 50%;
      width: 128px;
      height: 128px;
      justify-self: center;
    }

    .description {
      font-size: 0.7em;
    }

    .subtitle {
      margin-top: 1em;
      font-size: 0.8em;
      color: #000;
    }

    .tags {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 0.7em;
      color: rgba(0, 0, 0, 0.54);
      display: flex;
      margin-top: 1em;

      li {
        margin-right: 0.6em;
        background-color: transparent;
        padding: 0.3em 1em;
        border: 1px solid #d73f2e;
        border-radius: 4px;
        color: #d73f2e;
      }
    }
  }
  .content {
    margin-top: 3em;
    .nav {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      border-bottom: 1px solid rgba(173, 169, 169, 0.54);
      li {
        margin-right: 10px;
      }
      li a {
        color: rgba(0, 0, 0, 0.54);
        text-decoration: none;
        padding: 0.5em 1em 3px 1em;
      }
      a.nuxt-link-exact-active {
        color: #000;
        border-bottom: 1px solid rgba(0, 0, 0, 1);
      }
    }
  }
}

.status-container {
  justify-self: flex-end;
  display: flex;
  // justify-content: flex-start;
  // align-items: flex-start;
  flex-direction: column;
  button {
    padding: 0.5em 2em;
    margin-top: 3rem;
    border-radius: 3px;
    border: 1px solid #d73f2e;
    background-color: #d73f2e;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    transition: all 300ms;

    &:hover {
      background-color: transparent;
      color: #000;
    }
  }
  button.accept {
    background-color: green;
    border: 1px solid green;
  }
}
.status {
  border: 1px solid hsl(128, 45%, 56%);
  padding: 0.2em 0.6em;
  text-transform: uppercase;
  background-color: transparent;
  border-radius: 4px;
  font-size: 0.6em;
  text-align: center;
}
</style>
