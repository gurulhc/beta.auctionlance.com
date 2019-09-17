<template>
  <div class="container">
    <section class="register">
      <img src="http://auctionlance.com/aucttoken.svg" class="logo" />
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
          <input
            id="country"
            v-model="info.country"
            placeholder="Location"
            type="text"
            name="location"
            required
          />
        </div>
        <div class="input">
          <button
            id="upload_widget"
            class="cloudinary-button"
            @click="openCloudinaryWidget"
          >
            Upload Avatar
          </button>
        </div>
        <div class="input">
          <input type="submit" value="Join Auctionlance" />
        </div>
      </form>
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
        avatar: {}
      }
    }
  },
  computed: {
    ...mapState(['dAppAddress'])
  },
  mounted() {
    console.log(this.dAppAddress)
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
      const payload = JSON.stringify(this.info)

      const tags = this.tags.map((tag) => tag.text)

      this.info.tags = [...tags]

      console.log(this.info)
      // const tx = invokeScript(
      //   {
      //     dAppAddress: this.dAppAddress,
      //     call: {
      //       function: 'signUp',
      //       args: [{ type: 'string', value: payload }]
      //     },
      //     payment: []
      //   },
      //   JSON.parse(localStorage.getItem('userPublicKey'))
      // )

      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        WavesKeeper.signAndPublishTransaction({
          type: 16,
          data: {
            fee: {},
            dApp: this.dAppAdress,
            call: {
              function: 'signUp',
              args: [
                {
                  type: 'string',
                  value: payload
                }
              ]
            },
            payment: []
          }
        })
          .then((tx) => {
            console.log(tx)
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  min-height: 80vh;
  /* background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 6'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift 1s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23d73f2e' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-position: 0 100%;
  background-size: auto 6px; */
  margin-bottom: 2em;
}
.register {
  width: 90vw;
  background: #fff;
  border: 1px solid #f1f6f2;
  /* box-shadow: 0 0 30px rgba(0, 0, 0, 0.8); */
  border-radius: 3px;
  padding: 6em 2em;
  text-align: center;

  .logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 1em;
  }
  /* height: 5vh; */
}

.register form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 2em;
  grid-row-gap: 0.3em;
}

.input {
  margin-bottom: 1em;
}
.input input,
.vue-tags-input {
  width: 100%;
  border-radius: 0.2em;
}

.input input[type='text'],
.vue-tags-input {
  padding: 1em 2em;
  font-size: 0.9em;
  border: 1px solid #5f615f;
}

.input input[type='text']:focus,
.vue-tags-input:focus {
  outline: transparent;
  border: 1px solid #d73f2e;
}
.input input[type='submit'] {
  padding: 1em 2em;
  color: #fff;
  background-color: #d73f2e;
  box-shadow: 0 0 30px rgba(12, 112, 23, 0.1);
  font-size: 0.9em;
}
@media (min-width: 34em) {
  .register {
    width: 40vw;
    padding: 3em 4em;
  }

  .input {
    margin-bottom: 1em;
  }

  .input input[type='text'],
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
