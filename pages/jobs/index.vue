<template>
  <div>
    <section class="search-wrapper">
      <input
        id="search"
        type="text"
        name="search"
        placeholder="Search for jobs"
        class="search"
      />
      <div class="wrapper">
        <p>150 jobs found</p>
        <div class="filter-section">
          <select id="filter" name="filter">
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </section>
    <section class="container jobs">
      <div class="job">
        <div class="jobs-card">
          <h3>Wordpress developer needed</h3>
          <div class="summary">
            <div class="duration">
              <p>3 Days</p>
              <p class="duration-label">Duration</p>
            </div>
            <div class="budget">
              <p>$1000</p>
              <p class="budget-label">Budget</p>
            </div>
          </div>
          <div class="description">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
              atque incidunt impedit perspiciatis totam, tempora quibusdam
              cumque, eaque pariatur dignissimos quam doloremque nisi, voluptate
              ea et culpa corrupti ipsam voluptates.
            </p>
          </div>
          <nuxt-link to="/" class="bid-btn">Bid now</nuxt-link>
        </div>
      </div>
      <div class="job">
        <div class="jobs-card">
          <h3>Wordpress developer needed</h3>
          <div class="summary">
            <div class="duration">
              <p>3 Days</p>
              <p class="duration-label">Duration</p>
            </div>
            <div class="budget">
              <p>$1000</p>
              <p class="budget-label">Budget</p>
            </div>
          </div>
          <div class="description">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
              atque incidunt impedit perspiciatis totam, tempora quibusdam
              cumque, eaque pariatur dignissimos quam doloremque nisi, voluptate
              ea et culpa corrupti ipsam voluptates.
            </p>
          </div>
          <nuxt-link to="/" class="bid-btn">Bid now</nuxt-link>
        </div>
      </div>
      <div class="job">
        <div class="jobs-card">
          <h3>Wordpress developer needed</h3>
          <div class="summary">
            <div class="duration">
              <p>3 Days</p>
              <p class="duration-label">Duration</p>
            </div>
            <div class="budget">
              <p>$1000</p>
              <p class="budget-label">Budget</p>
            </div>
          </div>
          <div class="description">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
              atque incidunt impedit perspiciatis totam, tempora quibusdam
              cumque, eaque pariatur dignissimos quam doloremque nisi, voluptate
              ea et culpa corrupti ipsam voluptates.
            </p>
          </div>
          <nuxt-link to="/" class="bid-btn">Bid now</nuxt-link>
        </div>
      </div>
      <div class="job">
        <div class="jobs-card">
          <h3>Wordpress developer needed</h3>
          <div class="summary">
            <div class="duration">
              <p>3 Days</p>
              <p class="duration-label">Duration</p>
            </div>
            <div class="budget">
              <p>$1000</p>
              <p class="budget-label">Budget</p>
            </div>
          </div>
          <div class="description">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
              atque incidunt impedit perspiciatis totam, tempora quibusdam
              cumque, eaque pariatur dignissimos quam doloremque nisi, voluptate
              ea et culpa corrupti ipsam voluptates.
            </p>
          </div>
          <nuxt-link to="/" class="bid-btn">Bid now</nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  middleware: 'isAuthenticated',
  head() {
    return {
      title: 'Auctions'
    }
  },
  computed: {}
}
</script>
<style lang="scss" scoped>
.search-wrapper {
  background-color: #d73f2e;
  padding: 1em 4em;
  p {
    margin: 0;
    padding: 0;
  }
  select {
    margin: 0;
    padding: 0;
  }
  input.search {
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 1em 2em;
    width: 45%;
  }

  .wrapper {
    display: flex;
    color: #fff;
    justify-content: space-between;
    .filter-section {
      display: flex;
      align-self: baseline;
      justify-self: flex-end;

      select {
        width: 200px;
        height: 20px;
      }

      p {
        line-height: normal;
        font-size: 0.8em;
      }
    }
  }
}

.jobs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 2em;
  padding: 1em 5em;

  .job {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    padding: 1em 2em;
  }
}
</style>
