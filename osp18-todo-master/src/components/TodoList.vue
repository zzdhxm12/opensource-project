<template>
  <div>
    <section>
      <!--Todo-->
      <br>
      <hr class="curve">
      <h2 style="text-align:left; margin-left" v-if="(selectedconditions=='All' || selectedconditions=='Todo')">TODO
        <b-badge pill v-bind:variant="thema">{{todolength}}</b-badge>
      </h2>
      <br>
      <transition-group name="list" tag="ul">
        <li v-for="(todoItem, index) in items" :key="todoItem.id"
            v-if="todoItem.condition=='Todo' && (selectedcategorys=='All' || selectedcategorys==todoItem.category)
                  && (todoItem.contents.indexOf(searchKeyword) != -1 || todoItem.detail.indexOf(searchKeyword) != -1
                  || todoItem.date.indexOf(searchKeyword) != -1) && (selectedconditions=='All' || selectedconditions=='Todo')
                  && ( getUser == todoItem.user )" class="shadow">
          <span @click="doneTodo(todoItem,index)">
            <i class="checkBtn fas fa-check" aria-hidden="true"></i>
          </span>
          <span>
          <b-button v-b-popover.hover="todoItem.category" title="카테고리" size="sm" v-if="todoItem.category" v-bind:value="todoItem.category">
            {{todoItem.category}}
          </b-button>
          <b-button v-b-popover.hover="'None'" title="카테고리" size="sm" v-if="!todoItem.category">None</b-button>
          </span>
          <!--todo상세 내용-->
            &nbsp;&nbsp;
            <span class="displayContents" v-if="todoItem.contents" @click="showContentModal(todoItem, index)">
              <!--할일(주요)-->
              <i class="far fa-file" v-if="checkDay(todoItem.date) >= 3 && checkDay(todoItem.date) <= 5">
                <i class = "threeDayLeft"> {{todoItem.contents}}</i>
              </i>

              <i class="far fa-file" v-else-if="checkDay(todoItem.date) >= 1 && checkDay(todoItem.date) < 3">
                <i class = "oneDayLeft"> {{todoItem.contents}} </i>
              </i>
              <i class="far fa-file" v-else-if="checkDay(todoItem.date) < 1">
                <i class = "expiredDate"> {{todoItem.contents}} </i>
              </i>
              <i class="far fa-file" v-else>
                <i class="TodoItemContent"> {{todoItem.contents}} </i>
              </i>
            </span>

          <!--상세내용 수정&삭제 버튼-->
          <div class="Btns">
            <span v-b-popover.hover="'상세 정보 수정 및 추가'" title="상세 정보" class="updateBtn" @click="showUpdate(todoItem, index)">
              <i class="fas fa-edit" aria-hidden="true" style="color:#74f30c"></i>
            </span>
            <span class="removeBtn" @click="removeTodo(todoItem.id)">
              <i class="far fa-trash-alt" aria-hidden="true"></i>
            </span>
          </div>

        </li>
      </transition-group>


      <!--Doing Todo-->

      <br>
      <hr class="style18">
      <h2 style="text-align:left" v-if="(selectedconditions == 'All' || selectedconditions=='Doing')">DOING
        <b-badge pill v-bind:variant="thema">{{doinglength}}
        </b-badge>
      </h2>
      <br>
      <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in items" :key="todoItem.id" v-if="todoItem.condition=='Doing' && (selectedcategorys=='All'
      || selectedcategorys==todoItem.category) && (todoItem.contents.indexOf(searchKeyword) != -1 || todoItem.detail.indexOf(searchKeyword) != -1
      || todoItem.date.indexOf(searchKeyword) != -1) && (selectedconditions=='All' || selectedconditions=='Doing')
      && ( getUser == todoItem.user )" class="shadow">
        <span @click="doneTodo(todoItem, index)">
          <i class="checkBtn fas fa-check" aria-hidden="true"></i>
        </span>

        <span>
          <b-button size="sm" v-if="todoItem.category" v-bind:value="todoItem.category">{{todoItem.category}}</b-button>
          <b-button size="sm" v-if="!todoItem.category">None</b-button>
        </span>

        <!--todo상세 내용-->
          &nbsp;&nbsp;
            <span class="displayContents" v-if="todoItem.contents" @click="showContentModal(todoItem, index)">
              <i class="far fa-file" v-if="checkDay(todoItem.date) >= 3 && checkDay(todoItem.date) <= 5">
                <i class = "threeDayLeft"> {{todoItem.contents}} </i>
              </i>
              <i class="far fa-file" v-else-if="checkDay(todoItem.date) >= 1 && checkDay(todoItem.date) < 3">
                <i class = "oneDayLeft"> {{todoItem.contents}} </i>
              </i>
              <i class="far fa-file" v-else-if="checkDay(todoItem.date) < 1">
                <i class = "expiredDate"> {{todoItem.contents}} </i>
              </i>
              <i class="far fa-file" v-else>
                <i class="TodoItemContent"> {{todoItem.contents}} </i>
              </i>
            </span>

          <div class="Btns">
            <span v-b-popover.hover="'상세 정보 수정 및 추가'" title="상세 정보" class="updateBtn" @click="showUpdate(todoItem, index)">
              <i class="fas fa-edit" aria-hidden="true" style="color:#74f30c"></i>
            </span>
            <span class="removeBtn" @click="removeTodo(todoItem.id)">
              <i class="far fa-trash-alt" aria-hidden="true"></i>
            </span>
          </div>
      </li>
    </transition-group>

      <!--Done Todo-->

      <br>
      <hr class="style18">
      <h2 style="text-align:left" v-if="(selectedconditions=='All' || selectedconditions=='Done')">DONE
        <b-badge pill v-bind:variant="thema">{{donelength}}
        </b-badge>
      </h2>
      <br>
      <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in items" :key="todoItem.id" v-if="todoItem.condition=='Done' && (selectedcategorys=='All'
      || selectedcategorys==todoItem.category) && (todoItem.contents.indexOf(searchKeyword) != -1 || todoItem.detail.indexOf(searchKeyword) != -1
      || todoItem.date.indexOf(searchKeyword) != -1) && (selectedconditions=='All' || selectedconditions=='Done')
      && ( getUser == todoItem.user )" class="shadow" style="color:red">
        <span><i class="fas fa-check-circle" aria-hidden="true" style="color:#ff4600" @click="doneTodo(todoItem, index)"></i></span>&nbsp;&nbsp;

        <span>
          <b-button size="sm" v-if="todoItem.category" v-bind:value="todoItem.category">{{todoItem.category}}</b-button>
          <b-button size="sm" v-if="!todoItem.category">None</b-button>
        </span>
        <!--todo상세 내용-->
          &nbsp;&nbsp;
            <span class="displayContents" v-if="todoItem.contents" @click="showContentModal(todoItem, index)">
              <i class="far fa-file" v-if="checkDay(todoItem.date) >= 3 && checkDay(todoItem.date) <= 5">
                <i class = "threeDayLeft"> {{todoItem.contents}} </i>
              </i>
              <i class="far fa-file" v-else-if="checkDay(todoItem.date) >= 1 && checkDay(todoItem.date) < 3">
                <i class = "oneDayLeft"> {{todoItem.contents}} </i>
              </i>
              <i class="far fa-file" v-else-if="checkDay(todoItem.date) < 1">
                <i class = "expiredDate"> {{todoItem.contents}} </i>
              </i>
              <i class="far fa-file" v-else>
                <i class="TodoItemContent"> {{todoItem.contents}} </i>
              </i>
            </span>

        <span class="removeBtn" @click="removeTodo(todoItem.id)">
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>
    <br>
    <hr class="curve-re">
    </section>

    <modal v-show="showModal" @close="showModal = false">
      <h4 slot="header">Todo 추가 및 수정</h4>

      <span slot="footer">
        <br>- Contents -
        <b-form-input type="text" v-model="newUpdateTodoItem" placeholder="Type what you have to do" id="modifiedContent"/>
        <br>- Detail -
        <b-form-textarea :max-rows="3" rows="5" cols="25" v-model="newUpdateDetail" placeholder="Add detail content" id="modifiedDetail"/>

        <br>- Condition -
        <b-form-select v-model="newUpdateCondition" id="modifiedDetail">
          <option>Todo</option>
          <option>Doing</option>
          <option>Done</option>
        </b-form-select>

        <br>- Category -
        <b-form-select id="modifiedCategory" class="Category_dropdown_menu" v-model="Category_selected">

        <option v-for="Category_option in Category_options" v-bind:key="Category_option.value" v-if="Category_option.value!='All'">
            {{ Category_option.text }}
        </option>

        </b-form-select>&nbsp;&nbsp;
        <span class="addBtn"  @click="addCategory()">
          <i class="fas fa-plus" aria-hidden="true" style="color:#000000"></i>
        </span>
        <br>- Due date -
        <p>
        <input type="text" placeholder="YYYY/MM/DD" id="calendar"/>
        </p>
        <br>
        <i class="far fa-file-alt" aria-hidden="true" v-on:click="updateTodo(newUpdateTodoItem, newUpdateDetail, Category_selected, newUpdateCondition)">
        </i>
        <i class="closeModalBtn fas fa-times" aria-hidden="true" @click="closeModal"></i>
      </span>
    </modal>

    <modal v-if="showContent" @close="showContent = false">
      <h4 slot="header">Todo Info</h4>

      <span slot="footer">
        <div class="box">
        <p>- Contents -</p>
        {{ selectedItem[1].contents }}
        </div>
        <p></p>
        <div class="box">
        <p>- Detail -</p>
        {{ selectedItem[1].detail }}
        </div>
        <p></p>
        <div class="box">
        <p>- Due date -</p>
            <v-calendar :attributes='attrs'>
            </v-calendar>
        </div>
        <br>
        <i class="closeModalBtn fas fa-times" aria-hidden="true" @click="closeModal"></i>
      </span>
    </modal>

    <modal v-show="addModal" @close="addModal = false">
      <h3 slot="header">카테고리 추가</h3>
      <span slot="body">추가할 카테고리 입력</span>
      <span slot="footer" >
        <p>- Add Category -</p>
        <p>
        <input type="text" v-model="newUpdateCategory" placeholder="Name new label"/>
        <i class="far fa-file-alt" aria-hidden="true" @click="updateCategory(newUpdateCategory)"></i>
        </p>
        <p>- Delete Category -</p>
        <p>
        <input type="text" v-model="newDeleteCategory" placeholder="Name deleted label"/>
        <i class="far fa-trash-alt" aria-hidden="true" @click="DeleteCategory(newDeleteCategory)" style="color:red"></i>
        </p>
        <p>
          <i class="closeModalBtn fas fa-times" aria-hidden="true" @click="addcloseModal()"></i>
        </p>
      </span>
    </modal>
  </div>
</template>
<script>
import Modal from './common/Modal.vue'

export default {
  data() {
    return {
      attrs: [
        {
          key: 'today',
          highlight: {
            backgroundColor: '#ff8080',
          },
          dates: [
            {start : new Date(), end: new Date() },
            ]
        },
      ],
      showModal: false,
      selectedItem : [],
      addModal: false,
      flag:false,
      showDetail: false,
      newUpdateTodoItem : [],
      newUpdateDetail: [],
      newUpdateDate: '',
      newUpdateCategory: '',
      newDeleteCategory:'',
      newUpdateCondition:[],
      Category_selected: 'select the one',
      Category_options: [
        { text: 'All', value: 'All' },
        { text: 'Business', value: 'Business' },
        { text: 'Home', value: 'Home' },
        { text: 'School', value: 'School' }
      ],
    showContent:false,
    }
  },

  methods: {
    originalData(){
        //title값
        document.querySelector('#modifiedContent').value = this.selectedItem[1].contents;
        this.newUpdateTodoItem = this.selectedItem[1].contents;
        console.log("제목:"+this.newUpdateTodoItem);
        //detail값
        document.querySelector('#modifiedDetail').value = this.selectedItem[1].detail;
        this.newUpdateDetail = this.selectedItem[1].detail;
        console.log("상세내용:"+this.newUpdateDetail);
        //date 값
        document.querySelector('#calendar').value = this.selectedItem[1].date;
        this.newUpdateDate = this.selectedItem[1].date;
        console.log("날짜:"+this.newUpdateDate);
        //category 값
        document.querySelector('#modifiedCategory').value = this.selectedItem[1].category;
        this.Category_selected= this.selectedItem[1].category;
        console.log("카테고리:"+this.Category_selected);
        //condition 값
        document.querySelector('#modifiedCategory').value = this.selectedItem[1].condition;
        this.newUpdateCondition= this.selectedItem[1].condition;
        console.log("상태:"+this.newUpdateCondition);
    },
    removeTodo(id) {
      this.$store.dispatch('removeTodo',id);
    },
    showUpdate(selectedItem, index){
      this.showModal = !this.showModal;
      this.selectedItem.push(index,selectedItem);
      this.originalData();
    },
    showContentModal(selectedItem, index){
      this.showContent = !this.showContent;
      this.selectedItem.push(index,selectedItem);
      this.attrs[0].dates[0].start = new Date();
      this.attrs[0].dates[0].end = new Date();

      console.log(selectedItem.date);

      if(selectedItem.date.indexOf('/') != -1){
        var dateTemp = selectedItem.date.split('/');

        this.attrs[0].dates[0].end = new Date(dateTemp[0], dateTemp[1]-1, dateTemp[2]);
      }
    },
    addCategory(){
      this.addModal = !this.addModal;
    },
    updateCategory(newUpdateCategory){
      if(newUpdateCategory!=[]){
        for(var count=0; count<this.Category_options.length; count++){
          if(newUpdateCategory == this.Category_options[count].text){
            alert(newUpdateCategory+" 는 이미 있는 카테고리 입니다!");
            this.flag=false;
            this.newUpdateCategory=[];
            this.newDeleteCategory=[];
            break;
          }
          this.flag=true;
        }
        if(this.flag==true){
          alert(newUpdateCategory+" 카테고리가 추가되었습니다!");
          var todoCa=JSON.stringify(newUpdateCategory);
          var newKey = this.Category_options.length;

          var exdate = new Date();
          var days=3;
          exdate.setDate(exdate.getDate() + days);

          // 설정 일수만큼 현재시간에 만료값으로 지정
          var cookie_value = unescape(todoCa) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
          document.cookie = unescape(todoCa) + '=' + cookie_value;

          this.Category_options.push({text:newUpdateCategory, value:newUpdateCategory});
          this.addModal = false;
          this.newUpdateCategory=[];
          this.newDeleteCategory=[];
        }
      }else{
        alert("추가할 카테고리가 없습니다!");
      }
    },
    DeleteCategory(newUpdateCategory){
      if(newUpdateCategory!=[]){
        if(newUpdateCategory == "Business" || newUpdateCategory == "Home" ||newUpdateCategory == "School"){
          alert(newUpdateCategory + " 는 기본 카테고리 입니다!");
        }
        else{
          alert(newUpdateCategory + " 카테고리가 삭제되었습니다!");
          this.Category_options.splice({text:newUpdateCategory, value:newUpdateCategory});
          this.addModal = false;
          var todoCa=JSON.stringify(newUpdateCategory);
          var exdate = new Date();
          var days=0;
          exdate.setDate(exdate.getDate() + days);
          // 설정 일수만큼 현재시간에 만료값으로 지정
          var cookie_value = unescape(todoCa) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
          document.cookie = unescape(todoCa) + '=' + cookie_value;
        }
      }else{
        alert("삭제할 카테고리가 없습니다!");
      }
      this.addModal = false;
    },
    updateTodo(todoItem, detail, category, condition, index){
      this.$store.commit("updateTodo",{
        selectedItem : this.selectedItem,
        updateItem : todoItem,
        updateDetail : detail,
        updateCategory : category,
        updateCondition : condition,
        updateDate : this.newUpdateDate
        });

        this.$store.dispatch('updateTodo',{
          id: this.selectedItem[1].id,
          contents:this.newUpdateTodoItem,
          detail:this.newUpdateDetail,
          category: this.Category_selected,
          condition:this.newUpdateCondition,
          date:this.newUpdateDate
        });

      this.showModal = false;
      this.newUpdateTodoItem=[];
      this.newUpdateDetail=[];
      this.newUpdateDate=[];
      this.Category_selected=[];
      this.selectedItem = [];
      this.newUpdateCondition = [];
    },
    closeModal(){
      this.showModal = false;
      this.showContent = false;
      this.newUpdateTodoItem = [];
      this.selectedItem = [];
      this.newUpdateDetail = [];
      this.Category_selected=[];
      this.attrs[0].dates[0].start = new Date();
      this.attrs[0].dates[0].end = new Date();
    },
    addcloseModal(){
      this.addModal = false;
      this.newUpdateCategory=[];
      this.newDeleteCategory=[];
    },
    doneTodo(todoItem, index){
      this.$store.commit('doneTodo', index);
      this.$store.dispatch('doneTodo',todoItem);
    },
    checkDay(dueDate){
      var date = new Date();
      var myDate = new Date(dueDate);

      var leftDate = (myDate-date) / (24 * 3600 * 1000);
      return parseInt((leftDate+1));
    },
    showdetailUpdate(){
      this.showDetail = true;
   },

  },
  created() {
    this.$store.commit("categorytrans",this.Category_options);
    var x, y;
    var val = document.cookie.split(';');
    if(val.length>0){
      for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('"') + 1, (val[i].length-x.length-3));
        console.log(unescape(y));
        // unescape로 디코딩 후 값 리턴
        this.Category_options.push({text:unescape(y),value:unescape(y)});
      }
    }

    //firestore
    this.$store.dispatch('getTodos');
  },
  computed: {
    items(){
      return this.$store.getters.getTodos;
    },
    searchKeyword(){
      return this.$store.getters.getSearchKeyword;
    },
    todolength(){
      return this.$store.getters.getTodoLength;
    },
    donelength(){
      return this.$store.getters.getDoneLength;
    },
    doinglength(){
      return this.$store.getters.getDoingLength;
    },
    thema(){
      return this.$store.getters.getThema;
    },
    categorydata(){
      return this.$store.getters.getCategorydata;
    },
    selectedconditions(){
      return this.$store.getters.getSelectedconditions;
    },
    selectedcategorys(){
      return this.$store.getters.getSelectedcategorys;
    },
    getUser(){
      return this.$store.getters.getUser;
    }
  },
  mounted: function(){
      var self = this;
      $('#calendar').datepicker({
        dateFormat: "yy/mm/dd",
        onClose:function(){
          var finaldate = $('#calendar').val();
          self.newUpdateDate = finaldate;
        }
      });
  },
  components: {
    Modal: Modal
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: center;
  }
  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }

  .contents{
    float : left;
  }
  .detail{
    float :center;
  }
  .date{
    float :right;
  }

  .category_color{
    width:60pt;
    height:20pt;
    background-color: #000000;
    border: 1px solid #000000;
    color: #FFFFFF;
    border-radius: 7px;
  }
  .doneCategory_color{
    width:60pt;
    height:20pt;
    background-color: red;
    border: 1px solid red;
    color: #FFFFFF;
    border-radius: 7px;
  }
  .divider{
    height:1px;
    margin:6px 0;
    padding:0;
    background-color:rgba(0,0,0,0.1);
  }

  .Category_dropdown_menu{
    padding: 6px 33px 6px 33px;
    background-color: #fff;
    color: #2e2e2e;
    font-size: 14px;
    text-align: center;
    align-content: center;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    white-space: nowrap;
  }
  .addContainer{
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
  }
  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 10px;
  }
  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }
  .updateBtn {
    margin-left: auto;
    color: #00F;
  }
  .Btns{
    float:right;
    margin-left:auto;
    width:80px;
  }
  .displayDate{
    text-align: right;
    float:right;
    width:35%;
    font-size:calc(12px + 0.5vw);
  }
  .displayContents{
    text-align: left;
    float:left;
    width:80%;
  }
  .displayDetail{
    text-align: left;
    float:center;
    width:20%;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .threeDayLeft{
    text-shadow: 0 0 0.1px black;
    color:#24a1b5;
    font-size:calc(12px + 0.5vw);
  }
  .oneDayLeft{
    text-shadow: 0 0 0.1px black;
    color:red;
    font-size:calc(12px + 0.5vw);
  }
  .expiredDate{
    text-shadow: 0 0 0.1px black;
    color:red;
    text-decoration:line-through;
    text-decoration-style: solid;
    font-size:calc(12px + 0.5vw);
  }
  .box{
    border: 1px solid #6c757c;
    border-radius : 5px;
  }
  .TodoItemContent{
    font-size:calc(12px + 0.5vw);
  }
hr.style18 {
  height: 30px;
  border-style: solid;
  border-color: #8c8b8b;
  border-width: 1px 0 0 0;
  border-radius: 20px;
}
hr.style18:before {
  display: block;
  content: "";
  height: 30px;
  margin-top: -31px;
  border-style: solid;
  border-color: #8c8b8b;
  border-width: 0 0 1px 0;
  border-radius: 20px;
}
hr.curve {
  height: 30px;
  border-style: solid;
  border-color: #8c8b8b;
  border-width: 1px 0 0 0;
  border-radius: 20px;
}
hr.curve-re {
  height: 30px;
  margin-top: -31px;
  border-style: solid;
  border-color: #8c8b8b;
  border-width: 0 0 1px 0;
  border-radius: 20px;
}
</style>
