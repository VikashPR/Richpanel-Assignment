<template>
  <v-app class="main-container">
    <RegisterComponent/>
  </v-app>
</template>

<script>
import RegisterComponent from './components/Auth/Register.vue';


export default {
  name: 'App',

  components: {
    RegisterComponent
  },

  data: () => ({
    //
  }),
};
</script>

<style>
a{
  text-decoration:none ;
}
/* #26528C */
</style>