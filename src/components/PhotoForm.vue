<template>
  <div id="submit" v-show="value" class="panel">
    <form v-show="!loading">
      <h2>Submit a photo</h2>
      <input type="file" @change="onFileChange" accept="image/*" />
      <div class="photo" v-if="preview">
        <img :src="preview" />
      </div>

      <div>
        <button type="button" @click="PhotoSubmit">Submit</button>
      </div>
    </form>
    <Loader v-show="loading" />
  </div>
</template>

<script>
import axios from "axios";
import Loader from "./Loader";
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      preview: "",
      file: "",
    };
  },
  components: {
    Loader,
  },
  methods: {
    // ファイルが選択されたらプレビュー実行
    onFileChange(event) {
      this.file = event.target.files[0];
      // 何も選択されていなかったら処理中断
      if (event.target.files.length === 0) {
        this.reset();
        return false;
      }
      const reader = new FileReader();
      (reader.onload = (e) => {
        this.preview = e.target.result;
      }),
        reader.readAsDataURL(event.target.files[0]);
    },
    reset() {
      (this.preview = null),
        (this.file = null),
        (this.$el.querySelector('input[type="file"]').value = null);
    },
    PhotoSubmit() {
      this.loading = true;
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("user_id", this.$store.state.user.id);

      axios
        .post("https://calm-spire-40988.herokuapp.com/api/home", formData)

        .then((response) => {
          this.loading = false;
          console.log(response);
          alert("写真を投稿しました");
          this.reset();
          this.$emit("input", false);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        })
        .catch((error) => {
          this.loading = false;
          alert(error);
          console.log(formData);
          this.reset();
          // this.$router.go({
          // path:this.$router.currentRoute.path,
          // force:true,
          // });
        });
    },
  },
};
</script>

<style scoped>
.panel {
  width: 60%;
  height: auto;
  line-height: 1.3;
  position: absolute;
  top: 50px;
  right: 0;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: -3px 5px 5px #ccc;
  background-color: #fff;
  z-index: 999;
}

input {
  width: 90%;
  margin: 1% 5%;
  border: 1px solid #ccc;
  background-color: #fff;
}
button {
  background-color: #000;
  color: #fff;
  padding: 3px 8px;
  outline: none;
}
img {
  width: 90%;
  height: auto;
  margin: 1% 5%;
}
</style>
