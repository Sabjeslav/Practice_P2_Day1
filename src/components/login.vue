<template>
  <div>
    <input v-model="login">
    <button @click="auth()">Ok</button>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  // import VueAxios from 'vue-axios'
  //
  // Vue.use(VueAxios, axios)

  export default {
    data: function (){
      return{
        login: ''
      };
    },
    methods: {
      auth () {
        axios.get("http://46.101.212.195:3000/students/name" + this.login).then((responce) => {
          if (responce.data === null) {
            return
          }
          this.$store.commit('setUser', responce.data)
          this.$router.push('/')
        })
      }
    }
  }
</script>