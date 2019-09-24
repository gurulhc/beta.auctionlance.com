<template>
  <div>
    <section class="main-wrapper">
      <header id="header" class="page-header">
        <div class="brand">
          <h1><nuxt-link to="/">Auctionlance</nuxt-link></h1>
        </div>
      </header>
      <nav id="main-menu" class="menu">
        <button id="toggle-menu" class="menu-toggle">
          toggle menu
        </button>
        <section class="menu-pop-up">
          <ul class="nav-menu">
            <li>
              <nuxt-link to="/freelancers">Freelancers</nuxt-link>
            </li>
            <li><nuxt-link to="/jobs">Browse Jobs</nuxt-link></li>
            <li>
              <a href="https://medium.com/@aucttoken" target="_blank">Blog</a>
            </li>
            <li>
              <a
                href="https://forum.wavesplatform.com/t/auctionlance-platform-hire-and-pay-freelancers-with-crypto/10850"
                target="_blank"
                >About</a
              >
            </li>

            <li v-if="isClient">
              <nuxt-link to="/jobs/new" class="nav-button"
                >Create Auction</nuxt-link
              >
            </li>

            <li>
              <nuxt-link to="/auctoboard/overview" class="user"
                ><img
                  :src="`${user.avatar.secure_url}`"
                  :alt="user.name"
                  class="avatar"
              /></nuxt-link>
            </li>
          </ul>
        </section>
      </nav>
    </section>
    <nuxt />
    <div class="before-footer"></div>
    <footer class="footer container">
      <div class="footer-top">
        <ul>
          <li>
            <a
              href="https://t.me/auctionlance"
              target="_blank"
              class="social-link"
            >
              <svg
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                class="social-link"
              >
                <title>Telegram</title>
                <path
                  _ngcontent-frontend-c6=""
                  d="M19.1958.4006c.22736.19.3248.4275.29232.7125l-2.77706 16.2925c-.03248.19-.14616.34833-.34104.475-.12992.03166-.2436.0475-.34104.0475s-.19488-.01584-.29233-.0475l-4.92074-1.9475-2.6309 3.135c-.12992.15833-.30856.2375-.53592.2375-.09744 0-.17865-.01584-.2436-.0475-.12993-.03167-.2436-.11084-.34105-.2375-.09744-.12667-.12992-.25334-.09744-.38v-3.705l9.40302-11.2575-11.64415 9.8325-4.28739-1.71c-.25984-.095-.406-.30084-.43848-.6175 0-.25334.11368-.45917.34104-.6175L18.465.4006c.09744-.06334.21112-.095.34104-.095s.25984.03166.38977.095z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/auctionlance/"
              target="_blank"
              class="social-link"
            >
              <svg
                height="21"
                viewBox="0 0 10 21"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Facebook</title>
                <path
                  d="M9.88537 1.10478v3.09047H8.09268c-.64878 0-1.09268.13968-1.3317.41905-.23903.27936-.35854.69841-.35854 1.25714v2.2h3.38049l-.46098 3.45715H6.40244v8.85238H2.9195v-8.85238H0V8.07144h2.91951V5.50478c0-1.43175.39269-2.54921 1.17805-3.35239.78537-.80317 1.8439-1.20476 3.17561-1.20476 1.12683 0 1.99756.05238 2.6122.15715z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/aucttoken?lang=en"
              target="_blank"
              class="social-link"
            >
              <svg
                height="16"
                viewBox="0 0 18 16"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Twitter</title>
                <path
                  d="M18.02927 2.72859c-.5122.76825-1.1439 1.41428-1.89512 1.93809.03414.10476.05122.27937.05122.52381 0 1.0127-.15366 2.0254-.46098 3.0381-.30732 1.0127-.75122 1.97301-1.3317 2.88095-.5805.90793-1.2805 1.72857-2.1 2.4619-.81952.73334-1.79269 1.30953-2.91952 1.72857-1.12683.41905-2.3561.62858-3.6878.62858-2.08293 0-3.97805-.5762-5.68537-1.72858.27317.03492.56341.05238.87073.05238 1.70732 0 3.2439-.5238 4.60976-1.57142-.81951-.03492-1.53659-.29683-2.15122-.78572-.61464-.48889-1.05854-1.1-1.3317-1.83333.27316.03492.51219.05238.71706.05238.34147 0 .66586-.05238.97317-.15714-.85365-.1746-1.55365-.61111-2.1-1.30953-.54634-.69841-.83658-1.50158-.87073-2.40952.5122.27936 1.07561.4365 1.69025.47143-.5122-.3492-.92195-.80318-1.22927-1.3619C.87073 4.7889.73415 4.19524.76829 3.56667c0-.69841.15366-1.34444.46098-1.9381.92195 1.1873 2.04878 2.13016 3.38049 2.82858 1.3317.6984 2.74878 1.08254 4.25122 1.15238-.0683-.31429-.10244-.61111-.10244-.89048 0-1.04762.35853-1.9381 1.0756-2.67143.71708-.73333 1.58781-1.1 2.6122-1.1 1.09268 0 1.99756.40159 2.71464 1.20476.8195-.1746 1.60487-.47142 2.3561-.89047-.27318.87301-.81952 1.55397-1.63903 2.04286.71707-.06985 1.43414-.2619 2.15122-.5762z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@aucttoken"
              target="_blank"
              class="social-link"
            >
              <svg
                height="16"
                viewBox="0 0 19 16"
                width="19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  _ngcontent-frontend-c6=""
                  d="M6.1472 2.97786v12.3841c0 .15756-.04622.29936-.13866.42541-.09244.12605-.2157.18907-.36976.18907-.09244 0-.20028-.03151-.32354-.09454L.50842 13.424c-.15407-.06303-.27732-.17332-.36976-.33088C.04622 12.93556 0 12.778 0 12.62044V.56721C0 .44116.03081.31511.09244.18907.15406.06302.2619.01576.41598.04727c.09244 0 .2465.06302.4622.18907L6.1472 2.93059v.04727zM6.84049 4.065l5.50012 9.12264-5.50012-2.83605V4.065zm11.64731.18907v11.10788c0 .15756-.04621.29936-.13865.42541s-.2311.17331-.41598.1418c-.18488-.0315-.33894-.07878-.4622-.1418l-4.57573-2.31611 5.59256-9.21718zm-.04621-1.27622l-2.63452 4.39588c-1.75634 2.9306-2.78857 4.64798-3.0967 5.15217l-4.0211-6.66473L12.01707.2836C12.14032.09454 12.3252 0 12.57171 0c.09244 0 .18487.01576.27731.04727l5.54635 2.83605c.0308.03151.04622.06303.04622.09454z"
                  fill-rule="nonzero"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-bottom">
        <p>
          &copy; {{ getFullYear() }} Auctionlance Platform Limited. All rights
          reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CometChat } from '@cometchat-pro/chat'
export default {
  head() {
    return {
      titleTemplate: '%s | Auctionlance',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Find the best freelance developers and designers and pay them using Waves '
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: ''
        },
        {
          hid: 'author',
          name: 'author',
          content: 'Auctionlance Platform'
        },
        // Facebook
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Auctionlance Platform'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:
            'Find the best freelance developers, designers, content writers and lots more and pay them with Waves'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'http://auctionlance.com/aucttoken.svg'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'http://auctionlance.com'
        },
        // Twitter
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Auctionlance Platform'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Find the best freelance developers, designers, content writers and lots more and pay them with Waves'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'http://auctionlance.com/aucttoken.svg'
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'http://auctionlance.com/aucttoken.svg'
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    isClient() {
      return this.user.userType === 'client'
    }
  },
  mounted() {
    this.loginToCometChat()
  },
  methods: {
    getFullYear() {
      const currentDate = new Date()

      return currentDate.getFullYear() // 83945cf299dfa3
    },
    loginToCometChat() {
      CometChat.init('83945cf299dfa3')
        .then(() => {
          console.log('CometChat was initialized successfully!')
        })
        .catch(() => {
          console.log('An error occured while initializing CometChat')
        })
      const apiKey = 'cdb021b70eca80a1f59e790d735bd0053e2fc474'
      this.loggingIn = true
      CometChat.login('superhero1', apiKey)
        .then(() => {
          this.loggingIn = false
          console.log('success')
        })
        .catch((error) => {
          this.loggingIn = false
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
:root {
  box-sizing: border-box;
  font-size: calc(1vw + 0.6em);
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

@media (min-width: 35em) {
  .main-wrapper {
    display: flex;
  }
}

.brand a {
  text-decoration: none;
  color: #000;
}
.page-header {
  padding: 0.4em 1em;
  background-color: #fff;
}
.menu {
  position: relative;
}

@media (min-width: 34em) {
  .menu {
    width: 100%;
  }
}
.menu-toggle {
  position: absolute;
  top: -1.15em;
  right: 0.1em;
  border: 0;
  background-color: transparent;
  font-size: 3em;
  width: 1em;
  height: 0.4em;
  line-height: 0.4;
  text-indent: 5em;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}

.menu-toggle::after {
  position: absolute;
  top: 0;
  left: 0.2em;
  display: block;
  content: '\2261';
  text-indent: 0;
}

@media (min-width: 35em) {
  .menu-toggle {
    display: none;
  }
}

.menu-pop-up {
  display: none;
  position: absolute;
  right: 0;
  margin: 0;
}

@media (min-width: 34em) {
  .menu-pop-up {
    display: block;
    position: relative;
    top: 2em;
  }

  .nav-menu {
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    text-align: center;
  }

  .nav-menu li > a {
    text-decoration: none;
    text-transform: uppercase;
    color: #000;
    border-bottom: 2px solid #d73f2e;
  }
  .nav-menu li > a:hover {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 6'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift 0.3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23d73f2e' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
    background-repeat: repeat-x;
    background-position: 0 100%;
    background-size: auto 6px;
    border-bottom: 0;
    padding-bottom: 0.3em;
  }

  .nav-menu li > a.user {
    border-bottom: none;
    text-transform: capitalize;
  }
  .nav-menu li > a.user:hover {
    background-image: none;
  }
  .nav-menu li > a.user .avatar {
    width: 30px;
    height: 30px;
    margin-right: 14px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.menu.is-open .menu-pop-up {
  display: block;
}

.brand {
  text-transform: lowercase;
}

.container {
  padding: 0.5em 1em;
}

.squiggle-block {
  display: none;
}

@media (min-width: 34em) {
  .container {
    padding: 1em 2em;
  }
}

.before-footer {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 6'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift 0.3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23d73f2e' stroke-width='2' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-position: 0 100%;
  background-size: auto 6px;
  height: 5vh;
}

.footer-top ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

.footer-top ul a > svg {
  fill: #c4c4c4;
  transition: all 300ms;
}
.footer-top ul a > svg:hover {
  fill: #d73f2e;
  transform: scale(1.2);
}

.footer-bottom {
  text-align: center;
  font-size: 0.8em;
  margin-top: 2em;
  color: #c4c4c4;
}

.cards {
  margin: 2em 1em 4em 1em;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1em;
}

@media (min-width: 34em) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1em;
  }
}

@media (min-width: 34em) {
  .jobs-card {
    h3 {
      color: #d73f2e;
    }
    .summary {
      display: grid;
      grid-template-columns: 1fr 1fr;

      p {
        margin: 0;
        padding: 0;
        line-height: normal;
        font-size: 0.7em;
      }
      p.budget-label,
      p.duration-label {
        font-size: 0.6em;
        margin-top: 1em;
        color: #6e6c6b;
      }
    }
    .description {
      font-size: 0.7em;
      p {
        line-height: 1.3;
        color: #6e6c6b;
      }
    }
    .bid-btn {
      text-decoration: none;
      font-size: 0.6em;
      border-radius: 4px;
      border: 2px solid #d73f2e;
      transition: all 300ms;
      color: #000;
      padding: 0.5em 1em;

      &:hover {
        background-color: #d73f2e;
        color: #fff;
      }
    }
  }
}
.nav-button {
  color: #fff !important;
  background-color: #d73f2e;
  border-bottom: none;
  padding: 0.5em 1em;
  font-size: 0.6em;
  text-transform: lowercase;
  border-radius: 4px;
  transition: all 300ms;

  &:hover {
    background-image: none !important;
  }
}

.create-button {
  justify-self: flex-start;
  background-color: #d73f2e;
  color: #fff;
  padding: 0.5em 2em;
  border-radius: 4px;
  border: 1px solid darken(#d73f2e, 10%);
  font-size: 0.6em;
  cursor: pointer;
  transition: all 300ms;
  &:disabled {
    cursor: not-allowed;
    background: lighten(#d73f2e, 30%);
    border-color: lighten(#d73f2e, 20%);
    color: lighten(#000, 70%);
  }
}

input[type='text']:focus {
  border: 1px solid #d73f2e;
  outline: transparent;
}
</style>
