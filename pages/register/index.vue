<template>
  <div class="container">
    <section class="register">
      <section class="form-wrapper">
        <span>
          <nuxt-link to="/">
            <img src="http://auctionlance.com/aucttoken.svg" class="logo" />
          </nuxt-link>
        </span>
        <form action="" @submit.prevent="register">
          <div class="input">
            <input
              id="name"
              v-model="info.name"
              placeholder="John Doe"
              type="text"
              name="name"
              required
            />
          </div>
          <div class="input">
            <input
              id="description"
              v-model="info.description"
              placeholder="A short description about you"
              type="text"
              name="description"
              required
            />
          </div>
          <div class="input">
            <vue-tags-input
              id="vue-tags"
              v-model="tag"
              :tags="tags"
              :avoid-adding-duplicates="true"
              :delete-on-backspace="true"
              :max-tags="5"
              placeholder="Add a maximum of 5 tags"
              @tags-changed="(newTags) => (tags = newTags)"
            />
          </div>
          <div class="input">
            <select v-model="info.userType">
              <option disabled value="" selected
                >Purpose for using Auctionlance</option
              >
              <option value="client">Looking for freelancers</option>
              <option value="freelancer">I am a freelancer</option>
            </select>
          </div>
          <div class="input">
            <input
              id="country"
              v-model="info.location"
              placeholder="Location"
              type="text"
              name="location"
              required
            />
          </div>
          <div class="input">
            <button
              id="upload_widget"
              type="button"
              class="form-button form-button--secondary"
              @click="openCloudinaryWidget"
            >
              Upload Avatar
            </button>
          </div>
          <div class="input">
            <input
              type="submit"
              value="Join Auctionlance"
              class="form-button form-button--primary"
            />
          </div>
        </form>
      </section>
      <img
        src="~/assets/login-illustration.svg"
        alt=""
        class="login-illustraton"
      />
    </section>
  </div>
</template>
<script>
/* eslint-disable camelcase */
import { mapState } from 'vuex'
export default {
  layout: 'register',
  head() {
    return {
      title: 'Join Auctionlance',
      script: [{ src: 'https://widget.cloudinary.com/v2.0/global/all.js' }]
    }
  },
  middleware: 'canRegister',
  data() {
    return {
      tag: '',
      tags: [],
      info: {
        name: null,
        description: null,
        location: null,
        tags: [],
        address: '',
        public_key: '',
        userType: '',
        avatar: {}
      }
    }
  },
  computed: {
    ...mapState(['dAppAddress']),
    ...mapState('auth', ['wavesKeeperData'])
  },
  mounted() {
    console.log(this.dAppAddress)
    console.log(this.wavesKeeperData)
  },
  methods: {
    createCloudinaryWidget() {
      // eslint-disable-next-line no-undef
      const newWidget = cloudinary.createUploadWidget(
        {
          cloudName: 'dominuskelvin',
          uploadPreset: 'auctionlance_web_client',
          multiple: false,
          maxFiles: 1,
          cropping: true,
          croppingAspectRatio: 1,
          croppingCoordinateMode: 'face',
          clientAllowedFormats: ['png', 'gif', 'jpeg']
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            const { secure_url, url, public_id, thumbnail_url } = result.info
            this.info.avatar.secure_url = secure_url
            this.info.avatar.url = url
            this.info.avatar.public_id = public_id
            this.info.avatar.thumbnail_url = thumbnail_url
          }
        }
      )
      return newWidget
    },
    openCloudinaryWidget() {
      const widget = this.createCloudinaryWidget()

      widget.open()
    },
    register() {
      this.info.address = this.wavesKeeperData.address

      this.info.publicKey = this.wavesKeeperData.publicKey

      const payload = JSON.stringify(this.info)

      const tags = this.tags.map((tag) => tag.text)

      this.info.tags = [...tags]

      console.log(this.info)
      const tx = {
        type: 16,
        data: {
          dApp: this.dAppAddress,
          call: {
            function:
              this.info.userType === 'freelancer'
                ? 'freelancerSignUp'
                : 'clientSignUp',
            args: [{ type: 'string', value: payload }]
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
          this.$router.push({
            path: '/auctoboard/overiew'
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  margin-bottom: 2em;
  margin-top: 0;
}
.register {
  width: 90vw;
  background: #fff;
  border: 1px solid #f1f6f2;
  border-radius: 6px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3);
  padding: 6em 2em;
  text-align: center;
  display: flex;
  flex-direction: row-reverse;

  .logo {
    width: 80px;
    height: 80px;
    margin-bottom: 1em;
  }
  /* height: 5vh; */
}

.register form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content;
  grid-column-gap: 2em;
  grid-row-gap: 1em;
}

.input input,
.input select,
.vue-tags-input {
  width: 100%;
  border: none;
}

.input input[type='text'],
.vue-tags-input,
.input select {
  min-height: 52px;
  line-height: 20px;
  padding: 0 15px;
  font-size: 0.9em;
  border: 1px solid rgba(36, 28, 21, 0.3);
  border-radius: 4px;
  transition: all 300ms;
}
.input select {
  height: 52px;
}
.input input[type='text']:focus,
.vue-tags-input:focus,
.input select:focus {
  outline: transparent;
  border: 1px solid #d73f2e !important;
}
.form-button {
  width: 100%;
  margin: auto;
  cursor: pointer;
  padding: 10px 0;
  border-radius: 4px;
  -webkit-box-shadow: 0 4px 8px 0 #cfdfff, 0 6px 20px 0 #cfdfff;
  box-shadow: 0 4px 8px 0 #cfdfff, 0 6px 20px 0 #cfdfff;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 30px rgba(12, 112, 23, 0.1);
  font-size: 0.6em !important;
  transition: background-color 300ms;
}

.form-button.form-button--primary {
  color: #fff !important;
  background-color: #d73f2e !important;
}
.form-button.form-button--secondary {
  border: 1px solid #d73f2e;
  color: #000;
}

.form-button--primary:hover {
  background-color: darken(#d73f2e, 10%);
}
.form-button--secondary:hover {
  background-color: darken(#d73f2e, 10%);
  color: #fff;
}

@media (min-width: 34em) {
  .register {
    width: 60vw;
    padding: 3em 3em;
  }
  .form-wrapper {
    flex-grow: 2;
    margin-left: 2em;
  }

  .input input[type='text'],
  .input select,
  .vue-tags-input {
    font-size: 0.6em !important;
  }

  .input input[type='submit'] {
    font-size: 0.6em;
  }
}

.vue-tags-input {
  .ti-input {
    border: transparent !important;
  }
}
</style>
