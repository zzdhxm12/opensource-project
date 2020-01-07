<template>
    <b-navbar toggleable="md" type="dark" v-bind:variant="thema">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item-dropdown text="Category" left>
            <b-dropdown-item v-for="(Category_option) in categorydata" v-bind:key="Category_option.value" @click="selectCategory(Category_option)">
              {{Category_option.value}}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Progress" left>
            <b-dropdown-item class="board" @click="selectCondition('All')">All</b-dropdown-item>
            <b-dropdown-item class="board" @click="selectCondition('Todo')">Todo</b-dropdown-item>
            <b-dropdown-item class="board" @click="selectCondition('Doing')">Doing</b-dropdown-item>
            <b-dropdown-item class="board" @click="selectCondition('Done')">Done</b-dropdown-item>
          </b-nav-item-dropdown>


        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-input-group prepend="할 일 검색">
              <b-form-input class="mr-sm-2" type="text" placeholder="TodoList Search.." v-model="searchKeyword" @input="searchTodo" >
              </b-form-input>
            </b-input-group>
          </b-nav-form>
          <b-nav-form>
            <b-input-group prepend="웹 검색">
              <b-form-input class="mr-sm-2" type="text" placeholder="Web Search.." v-model="webSearchKeyword" @keydown.native="webSearchTodo">
              </b-form-input>
            </b-input-group>
          </b-nav-form>
        </b-navbar-nav>

        <b-dropdown id="ddown1" text="Thema" class="m-md-2" right>
          <b-dropdown-item @click="changeThema('info')">BASIC</b-dropdown-item>
          <b-dropdown-item @click="changeThema('primary')">BLUE</b-dropdown-item>
          <b-dropdown-item @click="changeThema('success')">GREEN</b-dropdown-item>
          <b-dropdown-item @click="changeThema('danger')">RED</b-dropdown-item>
          <b-dropdown-item @click="changeThema('warning')">YELLOW</b-dropdown-item>
        </b-dropdown>
      </b-collapse>
    </b-navbar>
    <!-- navbar-1.vue -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  //props:['thema','categorydata'],
  data() {
    return {
      categorylist:[],
      searchKeyword:[],
      updatethema:'',
      webSearchKeyword:[],
      access_token:'',
    }
  },
  ready:function(){
    window.addEventListener('resize', this.handleResize);
  },
  created:function(){

  },
  methods: {
    handleResize(){
      console.log("resize");
    },
    searchTodo(){
      this.$store.commit('searchTodo',this.searchKeyword);
    },
    changeThema(color){
      this.$store.commit('changeThema',color);
    },
    selectCondition(selectedcondition){
      this.$store.commit('selectCondition',selectedcondition);
    },
    selectCategory(selectedcategory){
      this.$store.commit('selectCategory',selectedcategory);
    },
    webSearchTodo(event){
      if(event.which === 13){
        var url = 'https://www.google.com/search?q='+this.webSearchKeyword;
        window.open(
          url,
          '_blank'
        );
      }
    },
  },
  computed: {
    thema(){
      return this.$store.getters.getThema;
    },
    categorydata(){
      return this.$store.getters.getCategorydata;
    }
  }
}

</script>

<style>
b-navbar{
  width:110%;
}
</style>
