<template>
  <div id="footer">
    <span v-if="this.$store.state.auth" @click="logout">Logout</span>
    <span to="/login" v-else>Login / Register</span>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      this.$store.dispatch("logout");
    }
  }
}
</script>

<style scoped>
#footer{
  height: 100px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 -5px 5px #ccc;
}
span{
  display: inline-block;
  margin: 10px;
  
  cursor: pointer;
}
</style>