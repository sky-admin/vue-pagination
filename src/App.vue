<template>
  <div id="app">
    <v-page :current-page="currentPage" :total-page="totalPage" @change-page="changePage"></v-page>
  </div>
</template>

<script>
  import vPage from './components/Pagination.vue'

  export default {
    name: 'app',
    data () {
      return {
        currentPage: 0,
        totalPage: 10
      }
    },
    methods: {
      changePage (newPage) {
        this.currentPage = newPage
      }
    },
    components: {
      vPage
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
