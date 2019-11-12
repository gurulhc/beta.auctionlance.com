<template>
  <main class="container">
    <section class="heading">
      <div class="textual">
        <h1 class="title">{{ freelancer.name }}</h1>
        <p class="description">{{ freelancer.description }}</p>
        <p class="location">📍{{ freelancer.location }}</p>
        <ul class="tags">
          <li v-for="tag in freelancer.tags" :key="tag">{{ tag }}</li>
        </ul>
      </div>
      <img
        :src="freelancer.avatar.secure_url"
        :alt="freelancer.name"
        class="profile-avatar"
      />
    </section>
    <section class="content">
      <ul class="nav">
        <li>
          <nuxt-link :to="`/freelancers/${freelancer.publicKey}/profile`"
            >Profile</nuxt-link
          >
        </li>
        <li>
          <nuxt-link :to="`/freelancers/${freelancer.publicKey}/review`">
            Review</nuxt-link
          >
        </li>
      </ul>
      <nuxt-child />
    </section>
  </main>
</template>

<script>
export default {
  scrollToTop: true,
  head() {
    return {
      title: this.freelancer.name
    }
  },
  data() {},
  asyncData({ $axios, params, store }) {
    return $axios
      .$get(
        `${store.state.wavesBaseURL}${store.state.dAppAddress}/${params.id}_Freelancer`
      )
      .then((res) => {
        return { freelancer: JSON.parse(res.value) }
      })
  }
}
</script>

<style scoped lang="scss">
h1,
h2,
h3,
p {
  margin: 0;
}
.container {
  width: 60vw;
  margin: 1em auto;
  min-height: 100vh;

  .heading {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 1em;

    .profile-avatar {
      border-radius: 50%;
      width: 128px;
      height: 128px;
      justify-self: center;
      object-fit: cover;
    }

    .description {
      font-size: 0.7em;
    }

    .location {
      font-size: 0.6em;
      color: rgba(0, 0, 0, 0.54);
    }

    .tags {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 0.7em;
      color: rgba(0, 0, 0, 0.54);
      display: flex;
      margin-top: 1em;

      li {
        margin-right: 0.6em;
        background-color: rgba(173, 169, 169, 0.54);
        padding: 0.3em 1em;
        border-radius: 4px;
        color: rgb(83, 80, 80);
      }
    }
  }
  .content {
    margin-top: 3em;
    .nav {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      border-bottom: 1px solid rgba(173, 169, 169, 0.54);
      li {
        margin-right: 10px;
      }
      li a {
        color: rgba(0, 0, 0, 0.54);
        text-decoration: none;
        padding: 0.5em 1em 3px 1em;
      }
      a.nuxt-link-exact-active {
        color: #000;
        border-bottom: 1px solid rgba(0, 0, 0, 1);
      }
    }
  }
}
</style>
