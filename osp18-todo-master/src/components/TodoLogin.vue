<template>
  <div class="login">
    <div>
    <img alt="Vue logo" src="../assets/logo2.png"><br><br>
    </div>

    <div>
    <h3> LOGIN </h3>
    </div>
    <P>
      <i class="fab fa-google fa-2x" ></i>
      <button id="gLogin" @click="gLogin">Google Login</button>
    </p>
    <p>
      <i class="fab fa-facebook fa-2x"></i>
      <button id="fLogin" @click="fLogin">Facebook Login</button>
    </p>
    <p>
      <i class="fab fa-github fa-2x"></i>
      <button id="giLogin" @click="giLogin">Github Login</button>
    </p>
    <div id="kakao_login_div">
      <KakaoLogin
        api-key="2c1db9f8cbfc079b6efac299c7439f55"
        image="kakao_login_btn_large"
        :on-success="onSuccess"
        :on-failure="onFailure"
      />
    </div>
    <h3> SIGN IN </h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button id="sign" @click="eLogin">Sign In</button>
    <p> Create <router-link to="signup"> a new account ! </router-link></p><br><br>
  </div>
</template>
<script>
import { authRef } from '../store/db.js';
import KakaoLogin from 'vue-kakao-login';

export default {
    data(){
      return {
        email: '',
        password:''
      }
    },
    methods:{
        gLogin(){
            this.$store.dispatch('userAuth');
        },
        fLogin(){
            this.$store.dispatch('userAuthf');
        },
        giLogin(){
            this.$store.dispatch('userAuthgi');
        },
        onSuccess(data){
          this.access_token = data.access_token;
            console.log(data)
            console.log("success")
            this.$store.dispatch('');
            // 이 부분에 로그인 시 route 넘기는거 구현해줭
          },
        onFailure(data){
            console.log(data)
            alert("로그인 실패");
          },
        eLogin(){
          this.$store.dispatch('eLogin',{
            email: this.email,
            password: this.password
          });
        }
    },
    beforeCreate(){
        authRef.onAuthStateChanged(user=>{
            if(user) this.$router.push('todo');
        });
    },
    components:{
      KakaoLogin : KakaoLogin,
    }
}

</script>
<style>
  div{
    text-align:center;
    float: center;
  }
  p{
    float: center;
  }
  body {
    text-align: center;
    background-color: #F6F6F8;
  }
  .login {
    margin-top: 50px;
  }
  input {
    margin: 10px 0;
    width: 200pt;
    padding: 5px;
    border-radius : 7px;
  }
  #sign {
    width:150pt;
    height:30pt;
    background-color: #000000;
    border: 1px solid #000000;
    color: #FFFFFF;
    border-radius: 7px;
  }
  #gLogin {
      /* border-style: groove; */
      width:200pt;
      height:30pt;
      background-color: #000000;
      border: 1px solid #000000;
      color: #FFFFFF;
      border-radius: 7px;
  }
  #fLogin {
      /* border-style: groove; */
      width:200pt;
      height:30pt;
      background-color: #0000FF;
      border: 1px solid #0000FF;
      color: #FFFFFF;
      border-radius: 7px;
  }
  #giLogin {
      /* border-style: groove; */
      width:200pt;
      height:30pt;
      background-color: #FF8000;
      border: 1px solid #FF8000;
      color: #FFFFFF;
      border-radius: 7px;
  }
  #kakao_login_div{
    visibility:hidden;
  }
</style>
