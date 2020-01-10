<template>
  <div>
    <section class="auctoboard-card">
      <div class="header">Waves Address: {{ user.address }}</div>
      <div class="body">
        <section class="wallet-balances">
          <div class="waves">
            <h4 class="caption">Waves Balance</h4>
            <div class="balance">
              <p>{{ accountDetails.balance.available }}</p>
              <a href="" class="waves">Top up</a>
            </div>
          </div>
          <div class="earnings">
            <h4 class="caption">Total Earnings</h4>
            <div class="balance">
              <p>0</p>
              <a href="" class="earning">Earn more</a>
            </div>
          </div>
          <div class="aucttoken">
            <h4 class="caption">Auct Token Balance</h4>
            <div class="balance">
              <p>0</p>
              <a href="" class="auct">Top up</a>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="auctoboard-card">
      <div class="header">Transaction History</div>
      <div class="body"></div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  head() {
    return {
      title: `Current Waves Balance: ${this.accountDetails.balance.available}`
    }
  },
  data() {
    return {
      accountDetails: {
        balance: {
          available: 0.0
        }
      }
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  created() {
    this.getWavesBalance()
  },
  methods: {
    getWavesBalance() {
      // eslint-disable-next-line no-undef
      WavesKeeper.publicState()
        .then((state) => {
          // displaying the result in the console
          this.accountDetails = state.account
          this.accountDetails.balance.available =
            this.accountDetails.balance.available / 100000000
        })
        .catch((error) => {
          this.$toast.error(`Could not get Wallet Balances - ${error.message}`) // displaying the result in the console
          /* ...processing errors */
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 34em) {
  .wallet-balances {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 0.5em;

    div {
      border-right: 1px solid rgb(247, 241, 241);
      padding: 0 0.4em;
      .caption {
        color: #d73f2e;
      }
    }

    div:last-child {
      border-right: none;
    }
  }

  .balance {
    display: flex;
    p {
      display: inline;
      margin: 0;
      padding: 0;
      align-self: flex-end;
      justify-self: flex-end;
      margin-right: 0.5em;
    }
    a {
      align-self: flex-end;
      justify-self: flex-end;
      text-decoration: none;
      font-size: 0.6em;
      color: #fff;
      border-radius: 4px;
      padding: 0.5em 1em;
      text-align: center;
      margin: 0;
      transition: all 300ms;
    }
    a.waves {
      background-color: #0454fb;

      &:hover {
        background-color: darken(#0454fb, 10%);
      }
    }
    a.auct {
      background-color: #d73f2e;
      &:hover {
        background-color: darken(#d73f2e, 10%);
      }
    }
    a.earning {
      background-color: #54b884;
      &:hover {
        background-color: darken(#54b884, 10%);
      }
    }
  }
}
</style>
