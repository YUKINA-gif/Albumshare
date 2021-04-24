<template>
  <div class="loading">
    <p>Sending your photo</p>
    <vue-loading type="bubbles" color="red" :size="{ width:'60px',height:'60px'}"></vue-loading>
  </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
export default {
  components:{
    VueLoading
  }
}
</script>
<style scoped>

p{
  text-align: center;
  margin: 30px auto 10px auto;
}
</style>