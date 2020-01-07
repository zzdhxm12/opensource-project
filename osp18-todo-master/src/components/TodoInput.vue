<template>
  <div>

    <br><br>

    <p class="inputBox shadow">
      <input type="text" v-model="newTodoItem" placeholder="Type your work" v-on:keyup.enter="addTodo">
      <span class="addContainer" v-on:click="addTodo">
        <i class="addBtn fas fa-plus" aria-hidden="true"></i>
      </span>
    </p>

    <warning-modal v-if="showWarnModal" @close="showWarnModal=false">
      <h2 slot="header">경고</h2>
      <span slot="footer" @click="showWarnModal=false">
          <h4><br>할 일을 입력하세요.<br><br><br></h4>
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </warning-modal>
  </div>
</template>

<script>
import WarningModal from './common/WarningModal.vue'

export default {
  data() {
    return {
      newTodoItem: '',
      showWarnModal: false
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        var value = this.newTodoItem && this.newTodoItem.trim();
        var user = this.getUser();
        var pack = [value, user];
        this.$store.dispatch('addTodo',pack);
        this.clearInput();
      } else {
        this.showWarnModal = !this.showWarnModal;
      }
    },
    clearInput() {
      this.newTodoItem = '';
    },
    getUser(){
      return this.$store.getters.getUser;
    }
  },
  components: {
    WarningModal: WarningModal
  }
}
</script>

<style scoped>
  .narbar{
    width:100%;
  }
  input:focus{
    outline: none;
  }
  .inputBox{
    background: white;
    height: 50px;
    margin-left:5%;
    margin-right:5%;
    width: 90%;
    line-height: 50px;
    border-radius: 5px;
  }
  .inputBox input{
    border-style: none;
    font-size: 0.9rem;
  }

  .inputBox2 input{
    border-style: none;
    font-size: 0.9rem;
  }
  .addContainer{
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
  }
  .addBtn{
    color:white;
    vertical-align: middle;
  }
  *{
    margin:0;
    padding:0;
  }
  body{
    font:15px/1.3 'Open Sans', sans-serif;
    color: #5e5b64;
    text-align:center;
  }
  a, a:visited {
    outline:none;
    color:#389dc1;
  }
  a:hover{
    text-decoration:none;
  }
  section, footer, header, aside, nav{
    display: block;
  }
  span{
    text-align:center;
  }
  h4{
    text-align:center;
    margin:auto;
  }
</style>
