<template>
  <div id="app">
    <LayoutComponent></LayoutComponent>
  </div>
</template>

<script>
/*eslint-disable*/
import LayoutComponent from "./components/layout.vue";

export default {
  name: "app",
  created: function() {
    this.$router.push("/person");
  },
  components: {
    LayoutComponent
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>

