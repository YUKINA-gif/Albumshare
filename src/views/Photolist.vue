<template>
  <div id="photolist">
    
    <div class="photocontainer">
      <div class="flex-item" v-for="(file, index) in getItems" :key="index" @click="$router.push({
        path: '/photo/' + file.id,
        params:{ id: file.id },
        })">
        <div class="photo">
          <img :src="file.file" alt="" />
        </div>
      </div>
     
      </div>
      <vuejs-paginate class="pagination"
      :page-count = "getPaginateCount"
      :prev-text = "'<'"
      :next-text = "'>'"
      :click-handler="paginateClickCallback"
      :container-class = "'page-ui'"
      :page-class = "'page-li'"
      :page-link-class = "'page-a'"
      :prev-class = "'preview'"
      :next-class = "'next'"
      >
      </vuejs-paginate>
    </div>
  
</template>

<script>
import axios from 'axios';
import Paginate from 'vuejs-paginate';
export default {
  data() {
    return {
      files:[],
      path: true,
      currentPage:1,
      parPage:6
    }
  },
  components:{
    'vuejs-paginate':Paginate,
  },
   created(){
    this.getFilePath();
  },
  methods:{
    async getFilePath(){
      await axios
      .get("https://calm-spire-40988.herokuapp.com/api/home")
      .then(response => {
        console.log(response)
        this.files = response.data.data
        });
    },
    paginateClickCallback: function (pageNum) {
      this.currentPage = Number(pageNum);
    },    
  },
   computed: {
    getItems: function () {
      let start = (this.currentPage - 1) * this.parPage;
      let end = this.currentPage * this.parPage;
      return this.files.slice(start, end);
    },
    getPaginateCount:function(){
      return Math.ceil(this.files.length / this.parPage);
    }
  }
}
</script>

<style scoped>
.photocontainer{
  display: flex;
  flex-wrap: wrap;
  margin: 10px auto;
  width: 80%;
}
.photo{
  position: relative;
  overflow: hidden;
  padding-top: 60%;
  margin: 10px;
  width: 380px;
}
.photo img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.flex-item{
  cursor: pointer;
}
.pagination{
  width: 150px;
  list-style: none;
  margin: 0 auto 20px auto;
  display: flex;
  justify-content: space-around;
  
}
.page-ui{
  font-size: 23px;
}
</style>