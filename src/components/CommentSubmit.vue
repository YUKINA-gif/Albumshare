<template>
  <div class="comment">
        <h2>Comments</h2>
        <textarea name="comment" id="" cols="30" rows="10" v-model="comment"></textarea><br>
        <button type="button" @click="submitcomment">Submit comment</button>
      </div>
</template>

<script>
import axios from 'axios';
export default {
  props:["id"],
  data() {
    return {
      comment:""
    }
  },
  methods:{
    submitcomment(){
      if (this.comment === "") {
        alert("コメントする内容を入力してください");
        console.log(this.id)
      } else {
      axios
      .post("https://calm-spire-40988.herokuapp.com/api/comment",
      {
        photo_id:this.id,
        user_id: this.$store.state.user.id,
        content: this.comment,
      })
      .then((response) => {
        console.log(response);
        alert("コメントしました");
        this.$router.go({
        path: this.$router.currentRoute.path,
        force: true,
      })
      })
      .catch(error => {
        alert("コメントできませんでした");
        console.log(error);
        this.$router.go({
        path: this.$router.currentRoute.path,
        force: true,
      })
      });
      }
    }
  }
}
</script>
<style scoped>
  button{
  background-color: #000;
  color: #fff;
  padding: 3px 8px;
  outline: none;
  margin: 2% 0;
}
textarea{
  width: 70%;
  height: 40px;
}
</style>