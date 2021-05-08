<template>
  <div id="photolist">
    <div class="photocontainer">
      <div
        class="flex-item"
        v-for="(file, index) in getItems"
        :key="index"
        @click="
          $router.push({
            path: '/photo/' + file.id,
            params: { id: file.id },
          })
        "
        @mouseover="mouseOverAction(index)"
        @mouseleave="mouseLeaveAction(index)"
      >
        <div class="photo">
          <div
            class="photo-mouseAction"
            v-if="mouseHover && index === hoverIndex"
          >
            <a class="box" :href="file.file" download @click.stop>
              <div class="downarrow">
                <img src="../assets/down arrow.png" alt="download" />
              </div>
            </a>
          </div>
          <img :src="file.file" alt="" />
        </div>
      </div>
    </div>
    <vuejs-paginate
      class="pagination"
      :page-count="getPaginateCount"
      :prev-text="'<'"
      :next-text="'>'"
      :click-handler="paginateClickCallback"
      :container-class="'page-ui'"
      :page-class="'page-li'"
      :page-link-class="'page-a'"
      :prev-class="'preview'"
      :next-class="'next'"
    >
    </vuejs-paginate>
  </div>
</template>

<script>
import axios from "axios";
import Paginate from "vuejs-paginate";
export default {
  data() {
    return {
      files: [],
      path: true,
      currentPage: 1,
      parPage: 6,
      mouseHover: false,
      hoverIndex: null,
      like: [],
    };
  },
  components: {
    "vuejs-paginate": Paginate,
  },
  created() {
    this.getFilePath();
  },
  methods: {
    async getFilePath() {
      await axios
        .get("https://calm-spire-40988.herokuapp.com/api/home")
        .then((response) => {
          console.log(response);
          (this.files = response.data.data), (this.id = response.data.data.id);
        });
    },
    paginateClickCallback: function(pageNum) {
      this.currentPage = Number(pageNum);
    },
    mouseOverAction(index) {
      this.mouseHover = true;
      this.hoverIndex = index;
    },
    mouseLeaveAction() {
      this.mouseHover = false;
    },
  },
  computed: {
    getItems: function() {
      let start = (this.currentPage - 1) * this.parPage;
      let end = this.currentPage * this.parPage;
      return this.files.slice(start, end);
    },
    getPaginateCount: function() {
      return Math.ceil(this.files.length / this.parPage);
    },
  },
};
</script>

<style scoped>
.photocontainer {
  display: flex;
  flex-wrap: wrap;
  margin: 10px auto;
  width: 80%;
}
.photo {
  position: relative;
  overflow: hidden;
  padding-top: 60%;
  margin: 10px;
  width: 380px;
}
.photo img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.flex-item {
  cursor: pointer;
}
.pagination {
  width: 150px;
  list-style: none;
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: space-around;
}
.page-ui {
  font-size: 23px;
}
.photo-mouseAction {
  position: absolute;
  top: 0;
  left: 0;
  width: 380px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.box {
  width: 60px;
  height: 40px;
  background-color: rgb(248, 248, 248, 0.5);
  border-radius: 5px;
  position: absolute;
  top: 5px;
  right: 6px;
}
.downarrow {
  transform: translate(95%, 40%);
  width: 20px;
  height: 23px;
}
.box:hover {
  background: #fff;
}
</style>
