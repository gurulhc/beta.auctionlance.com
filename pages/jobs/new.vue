<template>
  <main class="create-new">
    <section class="subhead">
      <h2 class="subhead--heading">Create a new auction</h2>

      <p class="subhead--description">
        An auction is how you get freelancers to bid your project. You can also
        <nuxt-link to="/freelancers">hire</nuxt-link> featured freelancers
        directly
      </p>
    </section>

    <form @submit.prevent="createAuction">
      <section class="form-group">
        <label class="required">Auction title</label>

        <input
          v-model="auction.title"
          type="text"
          placeholder="Auction title"
        />

        <p class="form-suggestion">
          Great auction name are short and memorable. Need inspiration? How
          about
          <span class="auction-title-suggestion"
            >I need a Smart Contract Developer</span
          >?
        </p>
      </section>

      <section class="form-group">
        <label class="required">Description</label>

        <input
          v-model="auction.description"
          type="text"
          placeholder="description"
        />
      </section>

      <section class="form-group">
        <label class="required">Skills</label>

        <vue-tags-input
          id="vue-tags"
          v-model="tag"
          :tags="tags"
          :avoid-adding-duplicates="true"
          :delete-on-backspace="true"
          placeholder="list skills needed"
          @tags-changed="(newTags) => (tags = newTags)"
        />
      </section>
      <section class="form-group">
        <label>₿ Select Token </label>

        <select v-model="selectedAssetId">
          <option disabled>Choose payment token</option>
          <option
            v-for="asset in assets"
            :key="asset.id"
            :value="asset.id"
            selected
            >{{ asset.name }}
          </option>
        </select>
      </section>
      <section class="form-group has-three-controls">
        <div class="div">
          <label>💰 Amount </label>

          <input v-model="auction.amount" type="text" />

          <p v-if="total > 0" class="total">{{ total }}</p>
        </div>

        <div class="div">
          <label>⏳ Auction duration<span class="tagline">(days)</span></label>

          <input v-model="auction.auctionDuration" type="text" />

          <p class="form-suggestion">
            This is how long you want the auction to be open
          </p>
        </div>

        <div class="div">
          <label for="amount"
            >⌛ Job Execution<span class="tagline">(days)</span></label
          >

          <input
            id="amount"
            v-model="auction.jobExecution"
            type="text"
            name="amount"
          />

          <p class="total">
            This is the deadline for the job when it's awarded
          </p>
        </div>
      </section>
      <section class="terms">
        <input v-model="hasAgreed" type="checkbox" />
        <label for="agree" class="agree">
          I agree to Auctionlance <nuxt-link to="/terms">terms</nuxt-link>
        </label>
      </section>
      <button type="submit" class="create-button" :disabled="!hasAgreed">
        <spinner v-if="creatingAuction"></spinner>
        <span v-else>👍 Create Auction</span>
      </button>
    </form>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import Spinner from '@/components/Spinner.vue'
export default {
  middleware: ['isAuthenticated', 'isClient'],
  head() {
    return {
      title: '📌 Create a New Auction'
    }
  },
  components: {
    Spinner
  },
  data() {
    return {
      tag: '',
      selectedAssetId: '',
      tags: [],
      hasAgreed: false,
      creatingAuction: false,
      auction: {
        title: 'Full Stack Developer wanted',
        description: 'Urgently in Need of a full stack developer',
        amount: '1',
        auctionDuration: '1',
        jobExecution: '1',
        tags: ['Adonis']
      }
    }
  },
  computed: {
    ...mapState({
      assets: 'acceptedAssets',
      dAppAddress: 'dAppAddress'
    }),
    total() {
      let amount = Number(this.auction.amount)
      return (amount += amount * 0.3)
    }
  },
  methods: {
    createAuction() {
      this.creatingAuction = true

      const tags = this.tags.map((tag) => tag.text)

      this.auction.tags = [...tags]

      const payload = JSON.stringify(this.auction)
      const jobExecution = Number(this.auction.jobExecution)
      const auctionDuration = Number(this.auction.auctionDuration)
      console.log(typeof this.selectedAssetId)
      const auctionAmount = Number(this.auction.amount) * 100000000
      const tx = {
        type: 16,
        data: {
          dApp: this.dAppAddress,
          call: {
            function: 'createAuction',
            args: [
              { type: 'integer', value: jobExecution },
              { type: 'integer', value: auctionDuration },
              { type: 'string', value: payload }
            ]
          },
          payment: [
            {
              assetId: this.selectedAssetId,
              amount: auctionAmount
            }
          ],
          fee: {
            assetId: 'WAVES',
            amount: '500000'
          }
        }
      }

      // eslint-disable-next-line no-undef
      WavesKeeper.signAndPublishTransaction(tx)
        .then((data) => {
          console.log(data)
          const result = JSON.parse(data)
          this.creatingAuction = false
          this.$toast.success('👍 Auction created successfully')
          this.$router.push({
            path: `/jobs/${result.id}`
          })
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(
            '😰 Oops this is embarrasing something went wrong. Try again'
          )
          this.creatingAuction = false
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
  margin-top: 0;
  margin-bottom: 0;
}
@media (min-width: 34em) {
  .create-new {
    width: 45vw;
    margin: 1em auto;

    a {
      color: #d73f2e;
    }
    .subhead {
      display: flex;
      padding-bottom: 8px;
      margin-bottom: 16px;
      border-bottom: 1px solid #e1e4e8;
      flex-flow: row wrap;
      margin-bottom: 1.5em;

      .subhead--heading {
        font-size: 24px;
        font-weight: 400;
        flex: 1 1 auto;
      }

      .subhead--description {
        font-size: 14px;
        color: #586069;
        flex: 1 100%;
      }
    }

    form {
      display: grid;
      grid-template-rows: 1fr;
      grid-row-gap: 1.5em;
      .form-group label,
      .form-suggestion,
      .total {
        font-size: 0.7em;
        color: #000;
        flex: 1 100%;
        display: block;
      }
      .form-suggestion,
      .total {
        font-size: 0.49em;
        color: #586069;
      }
      .form-group {
        .vue-tags-input {
          max-width: 100% !important;
        }
        .vue-tags-input .ti-tag {
          background: #d73f2e !important;
        }
        select {
          height: 2.5em;
        }
        input[type='text'],
        select,
        ti-input {
          width: 100% !important;
          min-height: 34px;
          padding: 6px 8px;
          font-size: 16px;
          line-height: 20px;
          color: #24292e;
          vertical-align: middle;
          background-color: #fff;
          background-repeat: no-repeat;
          background-position: right 8px center;
          border: 1px solid #d1d5da;
          border-radius: 3px;
          outline: none;
          box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
          margin-top: 0.5em;
        }
      }
      .form-group.has-three-controls {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 0.5em;
      }
      .form-suggestion,
      .total {
        margin-top: 8px;
        margin-bottom: 8px;
      }
      .agree {
        font-size: 14px !important;
        color: #586069;
        flex: 1 100%;
      }
    }
  }
}
</style>
