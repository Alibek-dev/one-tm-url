<template>
  <div id="app">
    <v-app>
      <Header />

      <div class="content">
        <router-view/>
      </div>
    </v-app>
  </div>
</template>

<script>
import Header from '@/components/shared/Header'

export default {
  name: 'App',

  components: {
    Header,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
  #app {
    background-color: #F1F1F1;
  }

  .content {
    padding: 40px 25% 60px 25%;
    background-color: white;
    margin: 0 0 10px 0;
  }


</style>
