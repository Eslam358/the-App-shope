<template>
  <teasting :loading="loading">
    <router-view />
  </teasting>
</template>

<script>
import teasting from "../src/components/glopal/layoutMain.vue";
export default {
  data: () => {
    return {
      loading: false,
    };
  },
  components: {
    teasting,
  },

  watch: {
    $route() {
      this.loading = true;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  scroll-behavior: smooth;
  transition: all 0.5s ease 0s;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
