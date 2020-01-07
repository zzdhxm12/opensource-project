<template>
  <div>
    <br><br>
      <i class="searchBox shadow">

        <input type="text" placeholder="Todo Search.." v-model="searchKeyword" @keyup="searchTodo">
      </i>
      <i class="searchBox shadow" style="margin-left:5%">

        <input type="text" placeholder="Web Search.." v-model="webSearchKeyword" @keyup.enter="webSearchTodo">
      </i>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchKeyword:[],
      webSearchKeyword:[],
    }
  },
  methods: {
    searchTodo(){
      this.$emit('searchTodo',this.searchKeyword);
    },
    webSearchTodo(){
      var url = 'https://www.google.com/search?q='+this.webSearchKeyword;
      window.open(
        url,
        '_blank'
      );
    }
  },
}
</script>

<style>
  .searchBox{
    margin: auto;
    padding: 1px;
    background: white;
    height: 55px;
    width:300px;
    line-height: 40px;
    border-radius: 5px;
  }

  .searchBox input{
    border-style: none;
    font-size: 0.9rem;
  }
</style>
