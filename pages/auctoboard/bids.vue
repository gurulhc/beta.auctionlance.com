<template>
  <div>
    <div v-if="user.userType === 'freelancer'" class="bids">
      <div v-for="bid in freelancerBids" :key="bid.auctionKey" class="bid">
        <div class="auction-info">
          <h2 class="title">
            <nuxt-link :to="`/jobs/${bid.auctionKey.split('_')[0]}/bids`">{{
              bid.auctionInfo.title
            }}</nuxt-link>
          </h2>
          <p class="subtitle">
            Started At - {{ bid.auctionInfo.amount }} WAVES
          </p>
        </div>
        <div class="freelancer-info">
          <p class="subtitle bid-amount">
            Your bid - {{ bid.bidAmount | amount }} WAVES
          </p>
        </div>
      </div>
    </div>
    <div v-else class="bids">
      <div v-for="bid in clientBids" :key="bid.auctionKey" class="bid">
        <div class="auction-info">
          <h2 class="title">
            <nuxt-link :to="`/jobs/${bid.auctionKey.split('_')[0]}/bids`">{{
              bid.auctionInfo.title
            }}</nuxt-link>
          </h2>
          <p class="subtitle">
            Started At - {{ bid.auctionInfo.amount }} WAVES
          </p>
        </div>
        <div class="freelancer-info">
          <p class="subtitle bid-amount">{{ bid.bids }} Bids</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  filters: {
    amount(val) {
      return val / 1e8
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  asyncData({ $axios, store }) {
    if (store.state.auth.user.userType === 'freelancer') {
      return $axios
        .$get(
          `${store.state.wavesBaseURL}${store.state.dAppAddress}?matches=.*?_Bid_${store.state.currentUserKey}$`
        )
        .then((data) => {
          const bidsByFreelancer = []
          data.map((datum) => {
            $axios
              .$get(
                `${store.state.wavesBaseURL}${store.state.dAppAddress}/${
                  datum.key.split('_')[0]
                }_Info`
              )
              .then((auction) => {
                const bid = {
                  bidAmount: datum.value,
                  auctionKey: auction.key,
                  auctionInfo: JSON.parse(auction.value)
                }
                bidsByFreelancer.push(bid)
              })
          })

          return { freelancerBids: bidsByFreelancer }
        })
    } else {
      // First api call is to get jobs created
      return $axios
        .$get(
          `${store.state.wavesBaseURL}${store.state.dAppAddress}?matches=.*?_AuctionClient$`
        )
        .then((data) => {
          const clientAuctionBids = []
          // using filters, removed auctions not belonging to the particular logged in user
          data
            .filter((datum) => datum.value === store.state.currentUserKey)
            .map((auctionDatum) => {
              // then for every aution belonging to a user, get the auction information (title, amount, etch)
              $axios
                .$get(
                  `${store.state.wavesBaseURL}${store.state.dAppAddress}2/${
                    auctionDatum.key.split('_')[0]
                  }_Info`
                )
                .then((infoData) => {
                  // then get the bids belonging to a particular auction with an API request
                  // TODO: Use a better algorithm that uses fewer network calls to achieve this
                  $axios
                    .$get(
                      `${store.state.wavesBaseURL}${
                        store.state.dAppAddress
                      }?matches=.*?^${infoData.key.split('_')[0]}_Bid_.*$`
                    )
                    .then((data) => {
                      const auction = {
                        auctionInfo: JSON.parse(infoData.value),
                        auctionKey: auctionDatum.key,
                        bids: data.length
                      }
                      clientAuctionBids.push(auction)
                    })
                })
            })
          return { clientBids: clientAuctionBids }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.bid {
  background: #fff;
  margin-bottom: 10px;
  display: flex;
  padding: 20px;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #b3b3b3;

  h2,
  p {
    margin: 0;
  }
  .title {
    a {
      text-decoration: none;
      color: #e4432d;
      transition: all 300ms;

      &:hover {
        text-decoration: underline;
      }
    }
    font-size: 0.8em;
  }
  .subtitle {
    font-size: 0.7em;
  }

  .auction-info {
    width: 50%;
  }
  .freelancer-info {
    width: 100%;
    justify-self: flex-end;
    align-self: flex-end;
    text-align: right;
  }
}
</style>
