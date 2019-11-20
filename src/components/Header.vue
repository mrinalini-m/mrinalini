<template>
  <header class="custom-header" v-bind:class="{ scroll: scrolled }">
    <nav class="nav">
      <div class="brand">
        <g-link class="nav__link" to="/">
          <span class="text">{{ $static.metadata.siteName }}</span></g-link
        >
        <!-- <g-link class="nav__link" to="/about/">About</g-link> -->
      </div>
      <div class="links">
        <div class="links">
          <button>
            <img
              class="theme-icon"
              alt="Theme"
              src="../assets/images/moon.svg"
            />
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
  export default {
    name: 'custom-header',
    data() {
      return { scrolled: false }
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
      onScroll() {
        this.scrolled = window.scrollY > 20 ? true : false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .favicon {
    height: 1.5rem;
    width: 1.5rem;
    margin-bottom: 0;
  }

  .custom-header {
    background-color: white;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    max-width: 100vw;
    width: 100%;
    margin: 0;
    padding: 0 1.5rem;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    z-index: 3;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
    &.scroll {
      box-shadow: $box-shadow;
      .nav {
        height: 3rem;
        .brand {
          a {
            color: black;
            text-decoration: none;
            &:hover {
              color: black;
            }
            &:active {
              color: black;
            }
          }
        }
      }
    }
    .nav {
      display: flex;
      flex-wrap: no-wrap;
      align-items: center;
      justify-content: space-between;
      max-width: $max-width;
      height: 4rem;
      margin: auto;
      padding: 0 1.5rem;
      transition: all 0.3s ease;
      .brand {
        display: flex;
        align-items: center;
        font-family: 'Medieval', 'Arial';
        a {
          display: flex;
          align-items: center;
          color: black;
          font-size: 1.5rem;
          &:hover {
            color: black;
          }
          &:active {
            color: black;
          }
        }
        span.text {
          white-space: nowrap;
        }
      }

      .links {
        display: flex;
        align-items: center;
        margin-left: auto; //flex item will align to the right since you can't use justify-items or justify-self with flexbox
        a {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 0;
          padding: 1rem 0.75rem;
        }
      }
    }
  }

  button.dark-switcher {
    margin: 0;
    border: 0;
    padding: 1rem;
    background: transparent;
    &:focus {
      outline: none;
    }
  }

  .theme-icon {
    height: 1.5rem;
    width: 1.5rem;
    margin-bottom: 0;
  }
</style>
