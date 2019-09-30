<template>
  <div class="auctoboard">
    <div class="auctoboard__sidebar">
      <section class="avatar-container">
        <img :src="user.avatar.secure_url" alt="" class="avatar" />
      </section>
      <section class="textual-content">
        <h3 class="name">{{ user.name }}</h3>
        <p class="description">
          {{ user.description }}
        </p>
        <p class="location">📍{{ user.location }}</p>
        <p v-if="false" class="rating">Implement later</p>
        <section class="tags">
          <ul>
            <li v-for="tag in user.tags" :key="tag">{{ tag }}</li>
          </ul>
        </section>
      </section>
      <footer>
        <router-link to="/edit-profile">Edit profile</router-link>
      </footer>
    </div>
    <div class="auctoboard__content">
      <nav>
        <ul>
          <li>
            <nuxt-link to="/auctoboard/overview">Overview</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/auctoboard/jobs">Jobs</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/auctoboard/bids">Bids</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/auctoboard/wallet">Wallet</nuxt-link>
          </li>
        </ul>
      </nav>
      <main>
        <nuxt-child />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'isAuthenticated',
  head() {
    return {
      title: `${this.user.name}'s Auctoboard`
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>

<style lang="scss">
@media (min-width: 34em) {
  .auctoboard {
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 1em 2em;
    grid-column-gap: 2em;

    .auctoboard__sidebar {
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      padding: 2em 2em;
      .avatar-container {
        text-align: center;
      }
      .avatar {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        object-fit: cover;
      }
      .textual-content {
        text-align: center;
        h3.name {
          margin-bottom: 0;
          font-size: 0.9em;
        }
        .description {
          font-size: 0.7em;
          line-height: normal;
        }
        .location {
          font-size: 0.6em;
          color: rgb(114, 111, 111);
        }
        .tags {
          ul {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            font-size: 0.6em;
            justify-content: space-between;
            flex-wrap: wrap;

            li {
              background-color: rgb(247, 241, 241);
              border-radius: 10px;
              padding: 0.5em 0.6em;
              margin-bottom: 0.4em;
            }
          }
        }
      }
      footer {
        margin-top: 4em;
        font-size: 0.6em;
        text-align: center;
        a {
          text-decoration: none;
          color: #d73f2e;
        }
      }
    }

    .auctoboard__content {
      min-height: 30em;
      nav {
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          padding-right: 1em;

          li {
            margin-right: 1em;
            a {
              text-decoration: none;
              color: #000;
              background-color: rgb(247, 241, 241);
              padding: 0.5em 2em;
              border-radius: 4px;
              transition: all 300ms;
              font-family: Helvetica, sans-serif;
              font-size: 0.7em;
            }

            a:hover,
            a:active,
            a.nuxt-link-active {
              background-color: #d73f2e;
              color: #fff;
              box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
            }
          }
        }
      }
    }
  }

  .auctoboard-card {
    border-radius: 4px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    margin-bottom: 2em;
    .header {
      background-color: #d73f2e;
      color: #fff;
      padding: 0.5em 2em;
      border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      font-size: 0.7em;
    }
    .body {
      padding: 0.5em 1em 1em 1em;
      border-bottom: 1px solid rgb(247, 241, 241);
      &:empty {
        min-height: 400px;
      }
    }
  }
  main {
    padding: 2em 0 2em 0em;
  }
}
</style>
