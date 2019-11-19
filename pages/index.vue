<template>
  <section>
    <main class="hero">
      <h1 class="big">
        Hire
        <span class="mobile">easily</span>
        <vue-typer
          class="typed"
          :text="typerList"
          initial-action="erasing"
          :repeat="Infinity"
          :shuffle="true"
          :erase-delay="250"
          erase-style="select-all"
          caret-animation="smooth"
        />
      </h1>
      <p class="subtitle">
        Our platform makes it easy to hire top notch
        <span class="highlight">freelancers</span> and pay in Crypto
      </p>
      <nuxt-link to="/freelancers" class="btn btn--primary">Hire now</nuxt-link>
      <div class="squiggle-block"></div>
    </main>
    <section class="container about-wrapper">
      <p class="about-auctionlance">
        Auctionlance is a P2P freelance marketplace built on the Waves
        blockchain. Easily find web designers, graphic designers, programmers,
        developers, writers, editors and lots more.
      </p>
    </section>
    <section class="container why">
      <h2 class="section-heading">
        Why Hire on <span class="highlight">Auctionlance</span>
      </h2>
      <div class="why-cards">
        <div class="why-card">
          <div class="body">
            <h3 class="caption">Built on Waves</h3>
            <p class="content">
              Platform built on the fastest and most secured blockchain in the
              world.
            </p>
          </div>
          <img src="~/assets/building.svg" class="why-image" />
        </div>
        <div class="why-card">
          <img src="~/assets/investment.svg" class="why-image" />
          <div class="body">
            <h3 class="caption">AuctoNode Profit Passive Income</h3>
            <p class="content">
              By helping sustain the Auctionlance platform, AuctoNode owners
              share 50% profit generated on Auctionlance platform.
            </p>
          </div>
        </div>
        <div class="why-card">
          <div class="body">
            <h3 class="caption">Secured Escrow</h3>
            <p class="content">
              Decisions are implemented based on earlier agreed terms between
              freelancer &amp; client without interference from platform.
            </p>
          </div>
          <img src="~/assets/secured-escrow.svg" class="why-image" />
        </div>
        <div class="why-card">
          <img src="~/assets/smart-payment.svg" class="why-image" />
          <div class="body">
            <h3 class="caption">Smart Crypto Payment</h3>
            <p class="content">
              Payments including commissions and bonus are paid and received in
              cryptocurrency
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="freelancer">
      <div class="description">
        <h2>Bid on projects on Auctionlance</h2>
        <nuxt-link to="/jobs" class="btn btn--primary">Bid Now</nuxt-link>
      </div>
      <div class="img">
        <freelancer />
      </div>
    </section>
    <section class="container why how">
      <h2 class="section-heading">
        How it <span class="highlight">Works</span>
      </h2>
      <div class="how-cards">
        <div class="how-card">
          <div class="body">
            <div class="image">
              <img src="~/assets/post-job.svg" class="how-image" />
            </div>
            <h3 class="caption">Post A Job</h3>
            <p class="content">
              Post a job, describe your job. Client gets matched smartly with
              qualified freelancers.
            </p>
          </div>
        </div>
        <div class="how-card">
          <div class="body">
            <div class="image">
              <img src="~/assets/find-and-pick.svg" class="how-image" />
            </div>
            <h3 class="caption">Find &amp; Pick</h3>
            <p class="content">
              Browse profiles, gigs freelancers, compare reviews &amp; pick
              freelancer suit for you.
            </p>
          </div>
        </div>
        <div class="how-card">
          <div class="body">
            <div class="image">
              <img src="~/assets/award.svg" class="how-image" />
            </div>
            <h3 class="caption">Award &amp; Deposit</h3>
            <p class="content">
              Pick any freelancer of choice &amp; enjoy 100% secured escrow
              system
            </p>
          </div>
        </div>
        <div class="how-card">
          <div class="body">
            <div class="image">
              <img src="~/assets/approved.svg" class="how-image" />
            </div>
            <h3 class="caption">Work &amp; Approve</h3>
            <p class="content">
              Chat with freelancer, share files &amp; collaborate with
              freelancer. Approve payment once satisfied.
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
/* eslint-disable camelcase */
import { TweenMax } from 'gsap'
import { mapState } from 'vuex'
import Freelancer from '~/components/Freelancer'
export default {
  head() {
    return {
      title: '👋 Hire and pay freelancers with WAVES'
    }
  },
  components: {
    Freelancer
  },
  data() {
    return {
      typerList: [
        'Blockchain Developers',
        'Web Developers',
        'Programmers',
        'Graphics Designers',
        'UI/UX Designers',
        'iOS Developers',
        'Android Developers',
        'Web Designers',
        'Content Writers',
        'Content Editors'
      ]
    }
  },
  computed: {
    ...mapState('auth', ['wavesKeeperData, user']),
    ...mapState(['dAppAddress', 'wavesBaseURL'])
  },
  fetch({ store }) {
    // eslint-disable-next-line no-undef
    store.dispatch('auth/getUsers')
  },
  mounted() {
    this.wavy()
  },
  methods: {
    wavy() {
      TweenMax.from('.squiggle-block', 2, { x: 300, delay: 2 })
    }
  }
}
</script>

<style lang="scss">
$primary-color: #e4432d;
.hero,
.container {
  padding: 0.5em 1em;
}

.squiggle-block {
  display: none;
}

@media (min-width: 34em) {
  .hero,
  .container {
    padding: 1em 2em;
  }

  .hero {
    padding: 4.5em 6em;
  }

  .squiggle-block {
    display: block;
    position: absolute;
    height: 200px;
    width: 2vw;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 6'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift 0.3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23e4432d' stroke-width='2' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
    background-position: 0 100%;
    background-size: auto 6px;
    width: 20vw;
    height: 30vh;
    right: 0;
    top: 20em;
  }
}

.container {
  margin-top: 1em;
}
h1.big {
  font-size: 3.5em;
  margin: 0;
}

p {
  line-height: 1.5;
}

.subtitle {
  font-size: 1.8em;
  margin-bottom: 2em;
}

.about-auctionlance {
  font-size: 1.3em;
}

@media (min-width: 34em) {
  .about-wrapper {
    width: 50vw;
    margin: 0 auto;
  }

  .about-auctionlance {
    font-size: 1em;
  }
}

.highlight {
  background: $primary-color;
  color: #fff;
  padding: 0 0.2em;
}

a.btn {
  text-decoration: none;
  font-size: 1.5em;
  padding: 0.5em 1.5em;
  border-radius: 4px;
  transition: all 300ms ease-out;
}

a.btn.btn--primary {
  color: #fff;
  background-color: $primary-color;
}
a.btn.btn--secondary {
  color: $primary-color;
  background-color: #fff;
}

@media (min-width: 34em) {
  a.btn {
    font-size: 1em;
  }

  a.btn.btn--primary:hover {
    background-color: darken($primary-color, 10%);
    box-shadow: 20px 10px 4px 0px rgba(0, 0, 0, 0.3);
  }
  a.btn.btn--secondary:hover {
    background-color: darken(#fff, 10%);
    box-shadow: 20px 10px 4px 0px rgba(0, 0, 0, 0.3);
  }
}
.section-heading {
  font-size: 2em;
}

h3.caption {
  font-weight: bolder;
  font-size: 1.5em;
  margin-bottom: 0;
}

@media (min-width: 34em) {
  h3.caption {
    font-size: 1.2em;
  }
}

.content {
  margin-top: 1em;
  line-height: 1.5;
  font-size: 1em;
}

@media (min-width: 34em) {
  .content {
    font-size: 0.8em;
  }
}

@media (min-width: 34em) {
  .why {
    padding: 2em 6em;
  }
  .why-cards {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 2em;

    .why-card {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 5em;
    }
  }
  .how-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 2em;
    grid-column-gap: 4em;
    margin-bottom: 2em;

    .how-card {
      .image {
        text-align: center;
        .how-image {
          width: 30%;
        }
      }
    }
  }
}

.vue-typer {
  display: none;
}

@media (min-width: 34em) {
  .mobile {
    display: none;
  }
  .vue-typer {
    display: inline;
  }
  /* Vue typer related styles starts here */
  .vue-typer .custom.char.typed {
    color: $primary-color;
  }

  .vue-typer .custom.char.selected {
    background-color: $primary-color;
    color: #fff;
  }

  /* Vue typer related styles ends here */
}

.freelancer {
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: $primary-color;
  margin-bottom: 3em;
  background: url(../assets/chat-background.svg) no-repeat top;
  background-size: cover;
  padding: 0 5em;

  .description {
    width: 60%;
  }
  .img {
    width: 40%;
    margin-left: 2em;
  }
}

.how h2,
.how h3 {
  text-align: center;
}

.why-image {
  width: 60%;
  text-align: right;
}
</style>
