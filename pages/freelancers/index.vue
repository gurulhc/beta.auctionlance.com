<template>
  <section class="container">
    <section class="freelancer-cards">
      <div class="freelancer-card">
        <div class="card-top">
          <div class="avatar">
            <img src="http://auctionlance.com/aucttoken.svg" alt="freelancer" />
          </div>
          <div class="bio">
            <h4>Kelvin Omereshone</h4>
            <p class="description">fullstack web developer</p>
            <p class="location">Delta, Nigeria</p>
            <div class="rating"></div>
          </div>
        </div>
        <div class="tags">
          <ul>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
          </ul>
        </div>
        <nuxt-link to="/freelancer/7899" class="freelancer-btn"
          >Hire freelancer</nuxt-link
        >
      </div>
      <div class="freelancer-card">
        <div class="card-top">
          <div class="avatar">
            <img src="http://auctionlance.com/aucttoken.svg" alt="freelancer" />
          </div>
          <div class="bio">
            <h4>Kelvin Omereshone</h4>
            <p class="description">fullstack web developer</p>
            <p class="location">Delta, Nigeria</p>
            <div class="rating"></div>
          </div>
        </div>
        <div class="tags">
          <ul>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
          </ul>
        </div>
        <nuxt-link to="/freelancer/7899" class="freelancer-btn"
          >Hire freelancer</nuxt-link
        >
      </div>
      <div class="freelancer-card">
        <div class="card-top">
          <div class="avatar">
            <img src="http://auctionlance.com/aucttoken.svg" alt="freelancer" />
          </div>
          <div class="bio">
            <h4>Kelvin Omereshone</h4>
            <p class="description">fullstack web developer</p>
            <p class="location">Delta, Nigeria</p>
            <div class="rating"></div>
          </div>
        </div>
        <div class="tags">
          <ul>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
          </ul>
        </div>
        <nuxt-link to="/freelancer/7899" class="freelancer-btn"
          >Hire freelancer</nuxt-link
        >
      </div>
      <div class="freelancer-card">
        <div class="card-top">
          <div class="avatar">
            <img src="http://auctionlance.com/aucttoken.svg" alt="freelancer" />
          </div>
          <div class="bio">
            <h4>Kelvin Omereshone</h4>
            <p class="description">fullstack web developer</p>
            <p class="location">Delta, Nigeria</p>
            <div class="rating"></div>
          </div>
        </div>
        <div class="tags">
          <ul>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
          </ul>
        </div>
        <nuxt-link to="/freelancer/7899" class="freelancer-btn"
          >Hire freelancer</nuxt-link
        >
      </div>
      <div class="freelancer-card">
        <div class="card-top">
          <div class="avatar">
            <img src="http://auctionlance.com/aucttoken.svg" alt="freelancer" />
          </div>
          <div class="bio">
            <h4>Kelvin Omereshone</h4>
            <p class="description">fullstack web developer</p>
            <p class="location">Delta, Nigeria</p>
            <div class="rating"></div>
          </div>
        </div>
        <div class="tags">
          <ul>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
          </ul>
        </div>
        <nuxt-link to="/freelancer/7899" class="freelancer-btn"
          >Hire freelancer</nuxt-link
        >
      </div>
      <div class="freelancer-card">
        <div class="card-top">
          <div class="avatar">
            <img src="http://auctionlance.com/aucttoken.svg" alt="freelancer" />
          </div>
          <div class="bio">
            <h4>Kelvin Omereshone</h4>
            <p class="description">fullstack web developer</p>
            <p class="location">Delta, Nigeria</p>
            <div class="rating"></div>
          </div>
        </div>
        <div class="tags">
          <ul>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
          </ul>
        </div>
        <nuxt-link to="/freelancer/7899" class="freelancer-btn"
          >Hire freelancer</nuxt-link
        >
      </div>
      <div class="freelancer-card">
        <div class="card-top">
          <div class="avatar">
            <img src="http://auctionlance.com/aucttoken.svg" alt="freelancer" />
          </div>
          <div class="bio">
            <h4>Kelvin Omereshone</h4>
            <p class="description">fullstack web developer</p>
            <p class="location">Delta, Nigeria</p>
            <div class="rating"></div>
          </div>
        </div>
        <div class="tags">
          <ul>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
            <li>Ride</li>
            <li>Vue/Nuxt</li>
          </ul>
        </div>
        <nuxt-link to="/freelancer/7899" class="freelancer-btn"
          >Hire freelancer</nuxt-link
        >
      </div>
    </section>
  </section>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
  head() {
    return {
      title: 'Top Notch Freelancers'
    }
  }
}
</script>
<style lang="scss" scoped>
.freelancer-card {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  padding: 1em 2em;
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
      }
    }
    .bio {
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
      flex-wrap: wrap;
      justify-content: center;

      li {
        background-color: rgb(247, 241, 241);
        margin-right: 1em;
        border-radius: 4px;
        padding: 0.5em 1.5em;
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
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1em;
}
</style>
