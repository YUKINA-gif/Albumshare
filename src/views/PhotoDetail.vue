<template>
  <div id="photodetail">
    <div class="flex photo">
      <div class="left">
        <img :src="file" alt="" class="img" />
      </div>
      <div class="right">
        <p class="photoname">Photo by {{ name }}</p>
        <div class="heart flex" @click="likeSubmit">
          <img src="../assets/heart.png" alt="heart" />
          <p class="heartlength">{{ like.length }}</p>
        </div>
        <div class="comments">
          <CommentSubmit :id="id" />
          <Comments :id="id" />
        </div>
      </div>
    </div>
    <div class="backbutton">
      <button @click="$router.push('/home')">back</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CommentSubmit from "../components/CommentSubmit";
import Comments from "../components/Comments";
export default {
  props: ["id"],
  data() {
    return {
      like: [],
      name: "",
      file: "",
    };
  },
  components: {
    Comments,
    CommentSubmit,
  },
  methods: {
    async getPhoto() {
      await axios
        .get("https://calm-spire-40988.herokuapp.com/api/home/" + this.id)
        .then((response) => {
          console.log(response);
          (this.file = response.data.data.file),
            (this.name = response.data.user.name),
            (this.like = response.data.like);
        });
    },
    likeSubmit() {
      const result = this.like.some((value) => {
        return value.user_id == this.$store.state.user.id;
      });
      if (result) {
        this.like.forEach((element) => {
          if (element.user_id == this.$store.state.user.id) {
            axios({
              method: "delete",
              url: "https://calm-spire-40988.herokuapp.com/api/like",
              data: {
                photo_id: this.id,
                user_id: this.$store.state.user.id,
              },
            }).then((response) => {
              console.log(response);
              this.$router.go({
                path: this.$router.currentRoute.path,
                force: true,
              });
            });
          }
        });
      } else {
        axios
          .post("https://calm-spire-40988.herokuapp.com/api/like", {
            photo_id: this.id,
            user_id: this.$store.state.user.id,
          })
          .then((response) => {
            console.log(response);
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          });
      }
    },
  },
  created() {
    this.getPhoto();
  },
};
</script>

<style scoped>
.photoname {
  font-size: 20px;
  text-align: left;
}
.left {
  margin: 2%;
  height: 420px;
  position: relative;
  overflow: hidden;
  width: 50%;
  text-align: center;
}
.param {
  justify-content: space-between;
}
.flex {
  display: flex;
  flex: wrap;
}
.img {
  margin-bottom: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.right {
  width: 50%;
  margin-top: 2%;
}
.heartlength {
  font-size: 20px;
}
button {
  background-color: #000;
  color: #fff;
  padding: 3px 8px;
  outline: none;
}
.backbutton {
  width: 100%;
  margin: 2% 0;
  text-align: center;
}
.heart {
  border: 1px solid #ccc;
  width: 70px;
  height: 20px;
  justify-content: space-around;
  padding: 5px 0;
  cursor: pointer;
  border-radius: 3px;
  margin: 15px 0;
}

@media screen and (max-width: 768px) {
  .left {
    width: 100%;
  }
  .right {
    width: 100%;
    margin-left: 2%;
    display: flex;
  }
  .photo {
    flex-wrap: wrap;
  }
  .comments {
    width: 70%;
    margin-left: 5%;
  }
  .photoname {
    width: 20%;
    padding-top: 12px;
  }
}
</style>
