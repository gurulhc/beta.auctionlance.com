<template>
  <section>
    <main class="hero">
      <h1 class="big">Hire easily</h1>
      <p class="subtitle">
        Our platform makes it easy to hire top notch
        <span class="highlight">freelancers</span> and pay in Crypto
      </p>
      <a href="#" class="btn btn-primary">Hire now</a>
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
          <h3 class="caption">Built on Waves</h3>
          <p class="content">
            Platform built on the fastest and most secured blockchain in the
            world.
          </p>
        </div>
        <div class="why-card">
          <h3 class="caption">AuctoNode Profit Passive Income</h3>
          <p class="content">
            By helping sustain the Auctionlance platform, AuctoNode owners share
            50% profit generated on Auctionlance platform. Simply own an
            AuctoNode and you will receive a share of platform profits in
            proportion to the amount you hold
          </p>
        </div>
        <div class="why-card">
          <h3 class="caption">Secured Escrow</h3>
          <p class="content">
            Decisions are implemented based on earlier agreed terms between
            freelancer &amp; client without interference from platform.
          </p>
        </div>
        <div class="why-card">
          <h3 class="caption">Smart Crypto Payment</h3>
          <p class="content">
            Payments including commissions and bonus are paid and received in
            cryptocurrency
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: 'Hire and pay freelancers with WAVES'
    }
  }
}
</script>

<style>
.hero,
.container {
  padding: 0.5em 1em;
}

@media (min-width: 34em) {
  .hero,
  .container {
    padding: 1em 2em;
  }

  .hero {
    padding: 1em 6em;
  }
}

.container {
  margin-top: 1em;
}
h1.big {
  font-size: 4em;
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
  background: #d73f2e;
  color: #fff;
  padding: 0 0.2em;
}

a.btn {
  text-decoration: none;
  font-size: 1.5em;
  padding: 0.5em 1.5em;
}

a.btn.btn-primary {
  color: #fff;
  background-color: #d73f2e;
}

@media (min-width: 34em) {
  a.btn {
    font-size: 1.2em;
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
    padding: 2em 8em;
  }
  .why-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1.5em;
  }
}
</style>
