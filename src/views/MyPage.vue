<template>
  <div class="mypage">
    <p class="username">{{ username }}</p>
    <p class="myalbum">my album</p>
    <div class="flex wrap">
      <div v-for="(file, index) in files" :key="index" class="myimage">
        <div class="photo-container">
          <img :src="file.data.file" alt="image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      files: [],
    };
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
    userid() {
      return this.$store.getters.userid;
    },
  },
  created() {
    this.getMyPhoto();
    console.log(this.$store.state.user);
  },
  methods: {
    async getMyPhoto() {
      let data = [];
      const files = await axios.get(
        "https://calm-spire-40988.herokuapp.com/api/home"
      );
      for (let i = 0; i < files.data.data.length; i++) {
        await axios
          .get(
            "https://calm-spire-40988.herokuapp.com/api/home/" +
              files.data.data[i].id
          )
          .then((response) => {
            if (this.$route.name == "Mypage") {
              if (response.data.data.user_id == this.$store.state.user.id) {
                data.push(response.data);
              }
            } else if (this.$route.name == "PhotoDetail") {
              if (response.data.item.id == this.id) {
                data.push(response.data);
              }
            } else {
              data.push(response.data);
            }
          });
        this.files = data;
        console.log(this.files);
      }
    },
  },
};
</script>

<style scoped>
.mypage {
  margin: 30px auto;
  width: 85%;
}
.wrap {
  flex-wrap: wrap;
}
.myalbum {
  font-size: 20px;
  margin-bottom: 10px;
}
.username {
  font-size: 25px;
  margin: 20px 0;
}
.photo-container {
  margin: 5px;
  height: 280px;
  width: 420px;
}
.photo-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
