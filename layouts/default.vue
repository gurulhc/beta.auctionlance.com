<template>
  <div>
    <section class="main-wrapper">
      <header id="header" class="page-header">
        <div class="brand">
          <h1>Auctionlance</h1>
        </div>
      </header>
      <nav id="main-menu" class="menu">
        <button id="toggle-menu" class="menu-toggle">
          toggle menu
        </button>
        <section class="menu-pop-up">
          <ul class="nav-menu">
            <li><a href="#">Freelancers</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </section>
      </nav>
    </section>

    <nuxt />
  </div>
</template>

<style>
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

@media (min-width: 35em) {
  .menu-pop-up {
    display: block;
    position: relative;
    top: 2em;
  }

  .nav-menu {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    list-style: none;
    margin: 0;
    text-align: center;
  }

  .nav-menu li {
    flex: 1;
  }

  .nav-menu li > a {
    text-decoration: none;
    text-transform: uppercase;
    color: #000;
    transition: all 300ms ease-in-out;
    display: block;
  }
  .nav-menu li > a:hover {
    background-color: #d73f2e;
    color: #fff;
  }
}

.menu.is-open .menu-pop-up {
  display: block;
}

.brand {
  text-transform: lowercase;
}
</style>

<script>
export default {
  head() {
    return {
      title: '%s | Auctionlance',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Find the best freelance developers and designers and pay them using Waves '
        }
      ]
    }
  }
}
</script>
