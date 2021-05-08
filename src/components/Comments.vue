<template>
  <div id="comments">
    <h2>Comment</h2>
    <div v-for="(comment, index) in comments" :key="index" class="comment">
      <p class="commentName">{{ comment.comment_user.name }}</p>
      <p class="commenttext">{{ comment.comment.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      comments: "",
    };
  },
  methods: {
    getcomment() {
      axios
        .get("https://calm-spire-40988.herokuapp.com/api/home/" + this.id)
        .then((response) => {
          this.comments = response.data.comment;
        });
    },
  },
  created() {
    this.getcomment();
  },
};
</script>

<style scoped>
.comment {
  border-bottom: 1px solid #ccc;
  width: 90%;
  line-height: 1.5;
}
.commentName {
  font-weight: bold;
}
@media screen and (max-width: 768px) {
  .comment {
    width: 100%;
  }
}
</style>
