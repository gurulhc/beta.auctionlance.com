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
      <section
        class="form-group"
        :class="{ 'form-group--error': $v.title.$error }"
      >
        <label class="secret">Auction title</label>

        <input
          v-model="$v.title.$model"
          type="text"
          placeholder="Auction title"
        />
        <p v-if="!$v.title.required" class="error">
          Provide a title for the auction
        </p>
        <p v-if="!$v.title.minLength" class="error">
          Auction title must have at least
          {{ $v.title.$params.minLength.min }} letters.
        </p>
        <p class="form-suggestion">
          Great auction name are short and memorable. Need inspiration? How
          about
          <span class="auction-title-suggestion"
            >I need a Smart Contract Developer</span
          >?
        </p>
      </section>

      <section
        class="form-group"
        :class="{ 'form-group--error': $v.description.$error }"
      >
        <label class="required">Description</label>
        <textarea
          v-model="$v.description.$model"
          rows="5"
          placeholder="Details about the project"
        ></textarea>
        <p v-if="!$v.description.required" class="error">
          😳 Provide a description for the auction
        </p>
        <p v-if="!$v.description.minLength" class="error">
          😳 Description of an auction should not be less than
          {{ $v.description.$params.minLength.min }} letters.
        </p>
      </section>
      <section
        class="form-group"
        :class="{ 'form-group--error': $v.category.$error }"
      >
        <label class="required">Category</label>
        <select v-model="$v.category.$model">
          <option value="">Choose a category</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
            >{{ category }}</option
          >
        </select>
        <p v-if="!$v.category.required" class="error">
          Select a category for this auction
        </p>
      </section>
      <section class="form-group">
        <label class="required">Skills</label>

        <vue-tags-input
          id="vue-tags"
          v-model="tag"
          :tags="tags"
          :avoid-adding-duplicates="true"
          :delete-on-backspace="true"
          placeholder="List skills needed"
          @tags-changed="(newTags) => (tags = newTags)"
        />
      </section>
      <section
        class="form-group"
        :class="{ 'form-group--error': $v.selectedAssetId.$error }"
      >
        <label>₿ Select Token </label>

        <select v-model="$v.selectedAssetId.$model">
          <option value="">Choose payment token</option>
          <option
            v-for="asset in assets"
            :key="asset.id"
            :value="asset.id"
            selected
            >{{ asset.name }}
          </option>
        </select>
        <p v-if="!$v.selectedAssetId.required" class="error">
          Please select a category
        </p>
      </section>
      <section class="form-group has-three-controls">
        <div class="div" :class="{ 'form-group--error': $v.amount.$error }">
          <label>💰 Amount </label>

          <input v-model.trim="$v.amount.$model" type="text" />
          <p v-if="!$v.amount.required" class="error">
            Amount is required
          </p>
          <p v-if="!$v.amount.decimal" class="error">
            Only numbers can be entered as amount
          </p>
          <p v-if="total > 0" class="total">{{ total }}</p>
        </div>

        <div
          class="div"
          :class="{ 'form-group--error': $v.auctionDuration.$error }"
        >
          <label>⏳ Auction duration<span class="tagline">(days)</span></label>

          <input v-model="$v.auctionDuration.$model" type="text" />

          <p v-if="!$v.auctionDuration.required" class="error">
            The auction duration is required is required
          </p>
          <p v-if="!$v.auctionDuration.integer" class="error">
            Only positive numbers can be entered as auction duration
          </p>
          <p v-if="!$v.auctionDuration.minValue" class="error">
            Auction duration should not be less than
            {{ $v.auctionDuration.$params.minValue.min }} day
          </p>
          <p class="form-suggestion">
            This is how long you want the auction to be open
          </p>
        </div>

        <div
          class="div"
          :class="{ 'form-group--error': $v.jobExecution.$error }"
        >
          <label for="amount"
            >⌛ Job Execution<span class="tagline">(days)</span></label
          >

          <input
            id="amount"
            v-model="$v.jobExecution.$model"
            type="text"
            name="amount"
          />

          <p v-if="!$v.jobExecution.required" class="error">
            The auction duration is required is required
          </p>
          <p v-if="!$v.jobExecution.integer" class="error">
            😳 Only positive numbers can be entered as job execution duration
          </p>
          <p v-if="!$v.jobExecution.minValue" class="error">
            😳 Job execution should not be less than
            {{ $v.jobExecution.$params.minValue.min }} day
          </p>
          <p class="total">
            This is the deadline for the job when it's awarded
          </p>
        </div>
      </section>
      <section class="terms">
        <input v-model="$v.hasAgreed.$model" type="checkbox" />
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
import { mapState, mapActions } from 'vuex'
import {
  required,
  minLength,
  decimal,
  integer,
  minValue
} from 'vuelidate/lib/validators'
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
      hasAgreed: false,
      creatingAuction: false,
      title: '',
      description: '',
      category: '',
      amount: '',
      auctionDuration: '',
      jobExecution: '',
      tags: []
    }
  },
  validations: {
    title: {
      required,
      minLength: minLength(10)
    },
    description: {
      required,
      minLength: minLength(50)
    },
    category: {
      required
    },
    amount: {
      required,
      decimal
    },
    auctionDuration: {
      required,
      integer,
      minValue: minValue(1)
    },
    jobExecution: {
      required,
      integer,
      minValue: minValue(1)
    },
    hasAgreed: {
      required
    },
    selectedAssetId: {
      required
    }
  },
  computed: {
    ...mapState({
      assets: 'acceptedAssets',
      dAppAddress: 'dAppAddress',
      categories: 'categories'
    }),
    total() {
      let amount = Number(this.amount)
      return (amount += amount * 0.3)
    }
  },
  methods: {
    ...mapActions(['loadJobs']),
    createAuction() {
      this.$v.$touch()
      if (this.tags.length === 0) {
        this.$toast.error('😳 Provide at least one skill this auction requires')
        return
      }
      if (!this.$v.$invalid) {
        this.creatingAuction = true

        const tags = this.tags.map((tag) => tag.text)

        const auction = {
          title: this.title,
          description: this.description,
          category: this.category,
          amount: this.amount,
          auctionDuration: this.auctionDuration,
          jobExecution: this.jobExecution
        }

        auction.tags = [...tags]
        print(auction)
        const payload = JSON.stringify(auction)
        const jobExecution = Number(auction.jobExecution)
        const auctionDuration = Number(auction.auctionDuration)
        const category = this.category
        console.log(typeof this.selectedAssetId)
        const auctionAmount = Number(auction.amount) * 100000000
        const tx = {
          type: 16,
          data: {
            dApp: this.dAppAddress,
            call: {
              function: 'createAuction',
              args: [
                { type: 'integer', value: jobExecution },
                { type: 'integer', value: auctionDuration },
                { type: 'string', value: payload },
                { type: 'string', value: category }
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
            this.creatingAuction = false
            this.$toast.success('👍 Auction created successfully')
            this.loadJobs()
            this.$router.push({
              path: '/jobs'
            })
          })
          .catch((error) => {
            console.log(error)
            this.$toast.error(
              '😰 Oops this is embarrasing something went wrong. Try again'
            )
            this.creatingAuction = false
          })
      } else {
        this.$toast.error(
          '😰 There seem to be issues with some of your entries'
        )
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
        textarea,
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
