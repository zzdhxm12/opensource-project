<template>
  <div class="sign up">
    <img alt="Vue logo" src="../assets/logo.png">
    <h3> SIGN UP </h3>
    <p>Let's create a new account !</p>
    <input type="text" id="email" v-model="email" placeholder="Email"><br>
    <input type="password" id="pass" v-model="password" placeholder="Password"><br>
    <button @click="signup" id="sign">Sign Up</button><br>
    <span>or go back to <router-link to="/"> login </router-link>.</span>
  </div>
</template>

<script>
export default {
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signup(){
      // var input = document.getElementById("email").value;
      // var input2= document.getElementById("pass").value;
      this.$store.dispatch('signup',{
        email: this.email,
        password: this.password
      });
    }
  }
}
</script>
<style scoped>
.signUp {
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
</style>
