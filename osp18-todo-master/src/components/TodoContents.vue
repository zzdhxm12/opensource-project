<template>
  <div id = "frame">
    <TodoHeader></TodoHeader>
    <TodoNavbar></TodoNavbar>
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoFooter></TodoFooter>
  </div>
</template>
<script>
import TodoHeader from './TodoHeader.vue'
import TodoNavbar from './TodoNavbar.vue'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
import TodoFooter from './TodoFooter.vue'
import TodoSearch from './TodoSearch.vue'
import Board from './lower/board.vue'
import TodoTabs from './TodoTabs.vue'

import { authRef } from '../store/db.js'
export default {
    beforeCreate(){ //route로 추가
      authRef.onAuthStateChanged(user=>{
        if(!user) this.$router.push('/');
        else{
          console.log("user.email : "+user.email);
          this.$store.commit('userAuth',user.email);
        }
      })
    },
    components: {
      'TodoHeader': TodoHeader,
      'TodoInput': TodoInput,
      'TodoList': TodoList,
      'TodoFooter': TodoFooter,
      'TodoSearch': TodoSearch,
      'TodoNavbar':TodoNavbar,
      'Board':Board,
      'TodoTabs': TodoTabs
    }
}
</script>
<style>
  body {
    text-align: center;
    background-color: #F6F6F8;
  }
  input {
    border-style: groove;
    width: 200px;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }

</style>
