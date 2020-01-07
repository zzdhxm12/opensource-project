<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>
<script>
// import VueKakaoPf from 'vue-kakao-pf';

export default {
   created() {
     //테마 vuex
     this.$store.state.thema = 'info';
     this.$store.state.reversethema = 'outline-info';

    // Vue.use(VueKakaoPf)
    // VueKakaoPf.plusFriendId = '_StiXj'
    // var imported = document.createElement('script');
    // imported.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    // document.head.appendChild(imported);
    // Kakao.init(process.env.KAKAO_KEY);
   }
}
</script>
<style>
  body {
    text-align: center;
    background-color: #F6F6F8;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }
  .inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
</style>
