<template>
  <nuxt-link :to="url">
    <div class="card">
      <section
        class="card-img"
        :style="{ 'background-image': 'url(' + imgUrl + ')' }"
      >
        <!-- <img :src="`${imgUrl}`" :alt="title" /> -->
      </section>
      <div class="card-body">
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Auctionlancer',
      required: true
    },
    imgUrl: {
      type: String,
      default: 'http://auctionlance.com/aucttoken.svg',
      required: true
    },
    subtitle: {
      type: String,
      default: 'Full blockchain developer',
      required: true
    },
    url: {
      type: String,
      default: '/',
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  min-width: 12em;
  border: 1px solid #c4c4c4;
  border-radius: 0.2em;
  padding: 1em 2em;
  background: #fff;
  border: 1px solid #f1f6f2;
  box-shadow: 0 0 30px rgba(12, 112, 23, 0.1);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  min-height: 150px;
}

.card-img {
  height: 4em;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.card-body h3 {
  margin: 0.8em 0 0 0;
  font-size: 1.4em;
}

.card-body p {
  margin: 0;
  font-size: 1em;
}
a {
  text-decoration: none;
  color: #abb3ac;
}

@media (min-width: 34em) {
  .card-body h3 {
    font-size: 1em;
  }

  .card-body p {
    font-size: 0.6em;
  }
}
</style>
