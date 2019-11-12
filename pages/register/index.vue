<template>
  <div class="container">
    <section class="register">
      <section class="form-wrapper">
        <span>
          <nuxt-link to="/">
            <img src="~/assets/short-logo.png" class="logo" />
          </nuxt-link>
        </span>
        <form action="" @submit.prevent="register">
          <div class="input" :class="{ 'form-group--error': $v.name.$error }">
            <input
              id="name"
              v-model="$v.name.$model"
              placeholder="John Doe"
              type="text"
              name="name"
            />
            <p v-if="!$v.name.required" class="error">
              Name is required
            </p>
            <p v-if="!$v.name.minLength" class="error">
              Name must not be lesser than
              {{ $v.name.$params.minLength.min }} letters.
            </p>
          </div>
          <div
            class="input"
            :class="{ 'form-group--error': $v.description.$error }"
          >
            <input
              id="description"
              v-model="$v.description.$model"
              placeholder="A short description about you"
              type="text"
              name="description"
            />
            <p v-if="!$v.description.required" class="error">
              Description is required
            </p>
            <p v-if="!$v.description.minLength" class="error">
              Description must not be lesser than
              {{ $v.description.$params.minLength.min }} letters.
            </p>
          </div>
          <div class="input">
            <vue-tags-input
              id="vue-tags"
              v-model="tag"
              :tags="tags"
              :avoid-adding-duplicates="true"
              :delete-on-backspace="true"
              :max-tags="5"
              placeholder="Add a maximum of 5 tags(hit ENTER after each tag)"
              @tags-changed="(newTags) => (tags = newTags)"
            />
          </div>
          <div
            class="input"
            :class="{ 'form-group--error': $v.userType.$error }"
          >
            <select v-model="$v.userType.$model">
              <option disabled value="" selected
                >Purpose for using Auctionlance</option
              >
              <option value="client">Looking for freelancers</option>
              <option value="freelancer">I am a freelancer</option>
            </select>
            <p v-if="!$v.userType.required" class="error">
              Select a user type
            </p>
          </div>
          <div
            class="input"
            :class="{ 'form-group--error': $v.location.$error }"
          >
            <input
              id="country"
              v-model="$v.location.$model"
              placeholder="Location"
              type="text"
              name="location"
            />
            <p v-if="!$v.location.required" class="error">
              Enter a location please
            </p>
          </div>
          <div class="input">
            <button
              id="upload_widget"
              ref="upload"
              type="button"
              class="form-button form-button--secondary"
              :disabled="hasUploaded || isOpeningCloudinary"
              :class="{ uploaded: hasUploaded }"
              @click="openCloudinaryWidget"
            >
              <spinner v-if="isOpeningCloudinary" />
              <span v-else-if="hasUploaded">Avatar Uploaded Successfully</span>
              <span v-else>Upload Avatar</span>
            </button>
          </div>
          <div class="input">
            <button
              type="submit"
              class="form-button form-button--primary"
              :disabled="isRegistering"
            >
              <spinner v-if="isRegistering" />
              <span v-else>Join Auctionlance</span>
            </button>
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
import { required, minLength } from 'vuelidate/lib/validators'
import Spinner from '@/components/Spinner.vue'
export default {
  layout: 'register',
  head() {
    return {
      title: 'Join Auctionlance',
      script: [{ src: 'https://widget.cloudinary.com/v2.0/global/all.js' }]
    }
  },
  middleware: 'canRegister',
  components: {
    Spinner
  },

  data() {
    return {
      isOpeningCloudinary: false,
      isRegistering: false,
      hasUploaded: false,
      tag: '',
      name: null,
      description: null,
      location: null,
      tags: [],
      address: '',
      public_key: '',
      userType: '',
      avatar: ''
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    description: {
      required,
      minLength: minLength(10)
    },
    userType: {
      required
    },
    location: {
      required,
      minLength: minLength(4)
    }
  },
  computed: {
    ...mapState(['dAppAddress', 'wavesBaseURL']),
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
          this.isOpeningCloudinary = false
          if (!error && result && result.event === 'success') {
            this.hasUploaded = true
            const { secure_url, url, public_id, thumbnail_url } = result.info
            this.avatar = {}
            this.avatar.secure_url = secure_url
            this.avatar.url = url
            this.avatar.public_id = public_id
            this.avatar.thumbnail_url = thumbnail_url
          }
        }
      )
      return newWidget
    },
    openCloudinaryWidget() {
      this.isOpeningCloudinary = true
      const widget = this.createCloudinaryWidget()

      widget.open()
    },
    register() {
      this.$v.$touch()
      if (this.avatar === '') {
        this.$toast.error('Upload an avatar')
        return
      }
      if (this.tags.length === 0) {
        this.$toast.error('Enter at least one tag')
        return
      }
      if (!this.$v.$invalid) {
        this.isRegistering = true

        this.address = this.wavesKeeperData.address

        this.publicKey = this.wavesKeeperData.publicKey

        const tags = this.tags.map((tag) => tag.text)

        this.tags = [...tags]
        const info = {
          name: this.name,
          description: this.description,
          location: this.location,
          tags: this.tags,
          address: this.address,
          public_key: this.public_key,
          userType: this.userType,
          avatar: this.avatar
        }
        const payload = JSON.stringify(info)

        console.log(this.info)
        const tx = {
          type: 16,
          data: {
            dApp: this.dAppAddress,
            call: {
              function:
                this.userType === 'freelancer'
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
            const formData = new FormData()

            formData.append('UID', `AUCTIONLANCER${this.publicKey}`)
            formData.append('name', this.name)
            formData.append('avatarURL', this.avatar.secure_url)
            formData.append('role', this.userType)

            const config = {
              headers: {
                'api-key': process.env.Comet_Chat_API_Key
              }
            }

            this.$axios
              .$post(
                'https://api.cometondemand.net/api/v2/createUser',
                formData,
                config
              )
              .then((data) => {
                console.log(data)
              })
              .catch((error) => {
                console.log(error)
              })

            console.log(tx)
            this.isRegistering = false
            this.$router.push({
              path: '/auctoboard/overview'
            })
          })
          .catch((error) => {
            console.log(error)
            this.isRegistering = false
          })
      } else {
        this.$toast.error(
          'Oops, you must have enter an invalid value. Check fields'
        )
      }
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
.ti-input {
  width: 100%;
}

.input input[type='text'],
ti-input,
.input select {
  line-height: 20px;
  padding: 0.5em 1em;
  font-size: 0.9em;
  border: 1px solid rgba(36, 28, 21, 0.3);
  border-radius: 4px;
  transition: all 300ms;
}
.input select {
  height: 2.5em;
}
.input input[type='text']:focus,
ti-input:focus,
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

  &:disabled {
    color: lighten(#000, 50%);
    background-color: lighten(#d73f2e, 50%);
    cursor: not-allowed;
  }
}
.form-button.form-button--secondary {
  border: 1px solid #d73f2e;
  color: #000;

  &:disabled {
    cursor: not-allowed;
  }
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
  .ti-input {
    font-size: 0.6em !important;
  }

  .input input[type='submit'] {
    font-size: 0.6em;
  }
}
.uploaded {
  border-color: hsl(149, 41%, 53%) !important;
  background-color: hsl(149, 41%, 53%) !important;
  color: #fff !important;
}
</style>
