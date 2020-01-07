<template>
  <div>
    <br>
    <b-button size="lg" @click="showModal=true" variant="danger">Clear All</b-button>
    <modal2 v-if="showModal" @close="showModal=false" @clearTodo="clearTodo()" @todoClear="todoClear()" @doneClear="doneClear()" @doingClear="doingClear()">
      <h3 slot="header">경고</h3>
    </modal2>
    <br><br>
  </div>
</template>
<script>
import Modal2 from './common/Modal2.vue'

export default{
  data(){
    return{
      showModal: false
    }
  },
  //메소드정의
  methods: {
    clearTodo() {
      //this.$store.commit('clearAll');
      this.$store.dispatch('clearAll',5000);
    },
    todoClear(){
      this.$store.dispatch('clearTodo',5000);
    },
    doingClear(){
      this.$store.dispatch('clearDoing',5000);
    },
    doneClear(){
      this.$store.dispatch('clearDone',5000);
    }
  },
  components: {
    Modal2: Modal2
  }
}
</script>
<style scoped>
  div{
    text-align:center;
    float:center;
  }
  .clearAllContainer{
    width: 8.5rem;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;

  }
  .clearAllBtn{
    color: #e20303;
    display: black;
  }
</style>
