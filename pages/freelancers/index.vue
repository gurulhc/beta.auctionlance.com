<template>
  <div>
    <section class="banner">
      <h1 class="big">See the best freelancers the industry has to offer...</h1>
      <female-developer />
    </section>
    <section class="container">
      <section class="freelancer-cards">
        <div
          v-for="freelancer in freelancers"
          :key="freelancer.address"
          class="freelancer-card"
        >
          <div class="card-top">
            <div class="avatar">
              <img :src="freelancer.avatar.secure_url" :alt="freelancer.name" />
            </div>
            <div class="bio">
              <h4>{{ freelancer.name }}</h4>
              <p class="description">{{ freelancer.description }}</p>
              <p class="location">📍{{ freelancer.location }}</p>
              <div class="rating"></div>
            </div>
          </div>
          <div class="tags">
            <ul>
              <li v-for="(tag, index) in freelancer.tags" :key="index">
                {{ tag }}
              </li>
            </ul>
          </div>
          <nuxt-link
            :to="`/freelancers/${freelancer.public_key}/profile`"
            class="freelancer-btn"
            >See profile</nuxt-link
          >
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FemaleDeveloper from '~/components/FemaleDeveloper'
export default {
  components: {
    FemaleDeveloper
  },
  computed: {
    ...mapState('freelancers', ['freelancers']),
    ...mapState('auth', ['users'])
  },
  fetch({ store }) {
    if (store.state.auth.users.length) {
      store.commit('freelancers/LOAD_FREELANCERS', store.state.auth.users)
    } else {
      store.dispatch('auth/getUsers')
    }
  },
  head() {
    return {
      title: '😎 Top Notch Freelancers'
    }
  }
}
</script>
<style lang="scss" scoped>
.freelancer-card {
  box-shadow: 0 1px 6px rgba(57, 73, 76, 0.35);
  padding: 1em 1em;
  border-radius: 4px;
  p,
  h4 {
    padding: 0;
    margin: 0;
  }
  .card-top {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    .avatar {
      margin-right: 1em;
      img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        object-fit: cover;
      }
    }
    .bio {
      h4 {
        color: #d73f2e;
        font-size: 0.7em;
      }
      .description,
      .location {
        font-size: 0.6em;
      }
    }
  }
  .tags {
    margin-bottom: 1em;
    ul {
      padding: 0;
      margin: 0;
      font-size: 0.6em;
      list-style: none;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      li {
        background-color: rgb(247, 241, 241);
        margin-right: 0.5em;
        border-radius: 4px;
        padding: 0.5em 1em;
        margin-bottom: 1em;
      }
    }
  }
  .freelancer-btn {
    text-decoration: none;
    font-size: 0.7em;
    border: 2px solid #d73f2e;
    transition: all 300ms;
    padding: 0.5em 1em;
    border-radius: 4px;
    color: #000;

    &:hover {
      background-color: #d73f2e;
      color: #fff;
    }
  }
}

.freelancer-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;
}

.banner {
  margin-top: 2em;
  background-color: #fff;
  color: #d73f2e;
  display: flex;
  align-items: center;
  padding: 1em 4em;
  height: 300px;
}

.big {
  font-size: 2.5em;
}

.container {
  margin-top: 2em;
  margin-bottom: 4em;
}
</style>
