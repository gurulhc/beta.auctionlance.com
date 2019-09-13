<template>
  <div class="container">
    <section class="register">
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
            id="email"
            v-model="info.email"
            placeholder="example@email.com"
            type="email"
            name="email"
            required
          />
        </div>
        <div class="input">
          <input
            id="profession"
            v-model="info.profession"
            placeholder="Profession"
            type="text"
            name="profession"
            required
          />
        </div>
        <div class="input">
          <input
            id="country"
            v-model="info.country"
            placeholder="Country"
            type="text"
            name="country"
            required
          />
        </div>
        <div class="input">
          <input
            id="country"
            placeholder="Country"
            type="file"
            name="avatar"
            required
          />
        </div>
        <div class="input">
          <input type="submit" value="Register" />
        </div>
      </form>
    </section>
  </div>
</template>
<script>
// import { invokeScript } from '@waves/waves-transactions'
import { mapState } from 'vuex'
export default {
  middleware: 'canRegister',
  data() {
    return {
      info: {
        name: null,
        email: null,
        country: null
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
    register() {
      const payload = JSON.stringify(this.info)

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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  min-height: 80vh;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 6'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift 1s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23d73f2e' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-position: 0 100%;
  background-size: auto 6px;
  margin-bottom: 2em;
}
.register {
  width: 90vw;
  background: #fff;
  border: 1px solid #f1f6f2;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  border-radius: 3px;
  padding: 6em 2em;

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
.input input {
  width: 100%;
  border-radius: 0.2em;
}

.input input[type='text'],
.input input[type='email'] {
  padding: 1em 2em;
  font-size: 0.9em;
  border: 1px solid #5f615f;
}

.input input[type='text']:focus,
.input input[type='email']:focus {
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
  .input input[type='email'] {
    font-size: 0.6em;
  }

  .input input[type='submit'] {
    font-size: 0.6em;
  }
}
</style>
