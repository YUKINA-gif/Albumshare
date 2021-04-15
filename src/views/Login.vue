<template>
  <div id="login">
    
    <div class="tabs">
      <input type="radio" id="tab1" value="1" v-model="isActive" class="radio"/>
        <label class="tabmenu" for="tab1">Login</label>
        <input type="radio" id="tab2" value="2" v-model="isActive" class="radio"/>
        <label class="tabmenu" for="tab2">Register</label>
    </div>

        <div class="panel" v-if="isActive === '1'">
          <form class="form" @submit.prevent="login">
            <label for="login-email">Email</label>
            <input type="text" class="form_item" id="login-email" v-model="loginForm.email">
            <label for="login-password">Password</label>
            <input type="password" class="form_item" id="login-password" v-model="loginForm.password">
            <div class="form_button">
              <button type="button" class="button" @click="login">login</button>
            </div>
          </form>
        </div>
  
        <div class="panel" v-else-if="isActive === '2'">
          <form class="form">
            <label for="username">Name</label>
            <input type="text" class="form__item" id="username" v-model="registerForm.name">
            <span v-if="!$v.registerForm.name.required">required Name</span><br>
            <label for="email">Email</label>
            <input type="text" class="form__item" id="email" v-model="registerForm.email">
            <span v-if="!$v.registerForm.email.email">not Email</span>
            <span v-else-if="!$v.registerForm.email.required">required Email</span><br>
            <label for="password">Password</label>
            <input type="password" class="form__item" id="password" v-model="registerForm.password">
            <span v-if="!$v.registerForm.password.minLength">8 characters or more</span>
            
            
            <div class="form__button">
              <button type="button" class="button button--inverse" @click="register">register</button>
            </div>
          </form>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import { required,email,minLength } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      isActive: "1",
       registerForm: {
        name: '',
        email: '',
        password: '',
      },
      loginForm: {
        email:"",
        password:""
      },
    }
  },
  validations:{
    registerForm:{
      name:{
        required
      },
      email:{
        required,
        email
      },
      password:{
        required,
        minLength:minLength(8)
      }
    }
  },
  methods:{
    register(){
      if (this.$v.$invalid) {
        alert("Not enough information")
      } else {
        axios.post("https://calm-spire-40988.herokuapp.com/api/register",{
        name: this.registerForm.name,
        email: this.registerForm.email,
        password: this.registerForm.password,
      })
      .then(response => {
        console.log(response);
        alert("Create your account! Plese login");
      })
      .catch(error => {
        alert(error);
      });
      }
      
    },
    login(){
      this.$store.dispatch("login",{
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    remembertoken(){
      if (this.$store.state.auth === true) {
        this.$router.replace("/home");
      }
    },
  },
  created(){
    this.remembertoken();
  }
};
  
</script>

<style scoped>
.radio{
  display: none;
}
.tabmenu{
  margin-right: 10px;
  cursor: pointer;
}
.tabs {
  display: flex;
  list-style: none;
}
.tabs :checked + label{
  padding-bottom: 5px;
  border-bottom: 2px solid gray;
}
ul{
  display: flex;
}
#login{
  width: 60%;
  margin: 15% auto;
}
.panel{
  height: auto;
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 5px;
}

input{
  width: 90%;
  margin: 1% 5%;
  border: 1px solid #ccc;
  padding: 5px;
}
button{
  background-color: #000;
  color: #fff;
  padding: 3px 8px;
  outline: none;
}
span{
  color: red;
  margin-left:5%;
}
</style>