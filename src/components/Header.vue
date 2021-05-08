<template>
  <div id="header">
    <h1 @click="$router.push('/home')">AlbumShare</h1>

    <nav>
      <button @click="showForm = !showForm" v-if="this.$store.state.auth">
        <i></i>+ Submit a photo
      </button>

      <span
        v-if="this.$store.state.auth"
        @click="$router.push('/mypage')"
        class="username"
        >{{ username }}</span
      >
      <span class="login" @click="$router.push('/')" v-else
        >Login / Register</span
      >
      <PhotoForm v-model="showForm" />
    </nav>
  </div>
</template>

<script>
import PhotoForm from "./PhotoForm";
export default {
  components: {
    PhotoForm,
  },
  data() {
    return {
      showForm: false,
    };
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
  },
};
</script>

<style scoped>
#header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 5px 5px #ccc;
  padding: 0 10px;
  line-height: 50px;
}
span {
  padding-left: 5px;
}
h1 {
  font-size: 20px;
  cursor: pointer;
}
.login {
  cursor: pointer;
}
button {
  background-color: #fff;
  border: 1px solid #ccc;
  outline: none;
}
.username {
  cursor: pointer;
}
</style>
