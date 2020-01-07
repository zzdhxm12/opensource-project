import Vue from 'vue';
import Vuex from 'vuex';
import {authRef, dbRef, gProvider, fProvider, giProvider} from './db.js';

Vue.use(Vuex); // vuex 사용

export const store = new Vuex.Store({ // store export
    state:{
      categorydata: [],
      todoItems: [],
      showUpdateModal :false,
      searchKeyword : '',
      todolength : 0,
      donelength : 0,
      doinglength : 0,
      alllength : 0,
      thema:'',
      reversethema:'',
      selectedconditions:'All',
      selectedcategorys:'All',
      userAuth: {
        status: false,
        name: "",
      }
    },
    getters:{
        getTodos: state => {
          return state.todoItems;
        },
        getAuth: state => {
          return state.userAuth;
        },
        getSearchKeyword: state => {
          return state.searchKeyword;
        },
        getTodoLength: state => {
          return state.todolength;
        },
        getDoneLength: state => {
          return state.donelength;
        },
        getDoingLength: state => {
          return state.doinglength;
        },
        getThema: state => {
          return state.thema;
        },
        getreverseThema: state =>{
          return state.reversethema;
        },
        getCategorydata: state => {
          return state.categorydata;
        },
        getSelectedconditions: state => {
          return state.selectedconditions;
        },
        getSelectedcategorys: state=> {
          return state.selectedcategorys;
        },
        getUser: state=> {
          return state.userAuth.name;
        }
    },
    mutations:{
        addTodo: (state, todoItem) => {
              state.todoItems.push(
                {user:todoItem.user, contents:todoItem.contents, id:todoItem.id, detail:todoItem.detail, date:todoItem.date,
                  category:todoItem.category, condition:todoItem.condition,showdetail:todoItem.showdetail}
              );
        },
        countTodo: state => {
          state.alllength = Number(state.todoItems.length);
          for(var i=0; i<state.alllength; i++){
            if((state.todoItems[i].condition=='Todo') && (state.todoItems[i].user == state.userAuth.name) ){state.todolength = Number(state.todolength) + 1;}
            else if((state.todoItems[i].condition=='Doing') && (state.todoItems[i].user == state.userAuth.name)){state.doinglength = Number(state.doinglength) + 1;}
            else if((state.todoItems[i].condition=='Done') && (state.todoItems[i].user == state.userAuth.name)){state.donelength = Number(state.donelength) + 1;}
          }
          console.log(state.todolength);
          console.log(state.doinglength);
          console.log(state.donelength);
          console.log(state.alllength);
        },
        clearAll: state =>{
          state.todoItems = [];
          //badge 초기화
          state.todolength=0;
          state.donelength=0;
          state.doinglength=0;
        },
        userAuth: (state, value) => {
          state.userAuth.status=true;
          state.userAuth.name=value;
        },
        userAuthf: (state, value) => {
          state.userAuth.status=true;
          state.userAuth.name=value;
        },
        userAuthgi: (state, value) => {
          state.userAuth.status=true;
          state.userAuth.name=value;
        },
        removeTodo: (state,value) => {
          if(value.todoItem.condition=='Todo'){
            state.todolength = Number(state.todolength) - 1;
          }
          else if(value.todoItem.condition=='Doing') {
            state.doinglength = Number(state.doinglength) - 1;
          }
          else {
            state.donelength = Number(state.donelength) - 1;
          }
         state.todoItems.splice(value.index, 1);
        //  state.reNameKeys(index);
        },
        clearTodo: state =>{
          var newKey = state.todoItems.length;
          var check;
          var count = 0;
          for(var i=0; i<newKey;){
            check = state.todoItems[i].condition;
            if(check=='Todo' && getUser == state.todoItems[i].user){
              state.todolength = Number(state.todolength) - 1;
              state.todoItems.splice(i, 1);
              newKey = state.todoItems.length;
             }
             else {
               i++;
             }
          }
        },
        clearDoing: state =>{
          var newKey = state.todoItems.length;
          var check;
          var count = 0;
          for(var i=0; i<newKey;){
            check = state.todoItems[i].condition;
            if(check=='Doing' && getUser == state.todoItems[i].user){
              state.doinglength = Number(state.doinglength) - 1;
              state.todoItems.splice(i, 1);
              newKey = state.todoItems.length;
             }
             else {
               i++;
             }
          }
        },
        clearDone: state => {
          var newKey = state.todoItems.length;
          var check;
          var count = 0;
          for(var i=0; i<newKey;){
            check = state.todoItems[i].condition;
            if(check=='Done' && getUser == state.todoItems[i].user){
              state.donelength = Number(state.donelength) - 1;
              state.todoItems.splice(i, 1);
              //state.removeTodo(state.todoItems[i], i);
              newKey = state.todoItems.length;
             }
             else {
               i++;
             }
          }
        },
        doneTodo: (state, index) => {
          var check='';
          if(state.todoItems[index].condition=='Todo'){
            check='Doing';
            state.todolength = Number(state.todolength) - 1;
            state.doinglength = Number(state.doinglength) + 1;
          }
          else if(state.todoItems[index].condition=='Doing') {
            check='Done';
            state.doinglength = Number(state.doinglength) - 1;
            state.donelength = Number(state.donelength) + 1;
          }
          else {
            check='Todo';
            state.donelength = Number(state.donelength) - 1;
            state.todolength = Number(state.todolength) + 1;
          }
          state.todoItems[index].condition = check;
        },
        searchTodo: (state, value) => {
          state.searchKeyword = value;
        },
        changeThema: (state, color) => {
          state.thema = color;
          state.reversethema = 'outline-'+color;
        },
        categorytrans: (state, categorydata) => {
          state.categorydata = categorydata
        },
        updateTodo: (state, value) => {
          var updateObj = {user:state.userAuth.name, contents:value.updateItem, detail:value.updateDetail,
            category:value.updateCategory, date:value.updateDate,
            condition:value.updateCondition, showdetail:false};

          //뱃지
          if(state.todoItems[value.selectedItem[0]].condition=='Todo') {
            state.todolength = Number(state.todolength) - 1;
            if(value.updateCondition=='Doing') state.doinglength = Number(state.doinglength) + 1;
            else if(value.updateCondition=='Done') state.donelength = Number(state.donelength) + 1;
            else if(value.updateCondition=='Todo') state.todolength = Number(state.todolength) + 1;
          }
          else if(state.todoItems[value.selectedItem[0]].condition=='Doing') {
            state.doinglength = Number(state.doinglength) - 1;
            if(value.updateCondition=='Done') state.doinglength = Number(state.donelength) + 1;
            else if(value.updateCondition=='Todo') state.todolength = Number(state.todolength) + 1;
            else if(value.updateCondition=='Doing') state.doinglength = Number(state.doinglength) + 1;
          }
          else {
            state.donelength = Number(state.donelength) - 1;
            if(value.updateCondition=='Doing') state.doinglength = Number(state.doinglength) + 1;
            else if(value.updateCondition=='Todo') state.todolength = Number(state.todolength) + 1;
            else if(value.updateCondition=='Done') state.doinglength = Number(state.donelength) + 1;
          }

          state.todoItems[value.selectedItem[0]].user = state.userAuth.name
          state.todoItems[value.selectedItem[0]].contents = value.updateItem;
          state.todoItems[value.selectedItem[0]].detail = value.updateDetail;
          state.todoItems[value.selectedItem[0]].category = value.updateCategory;
          state.todoItems[value.selectedItem[0]].date = value.updateDate;
          state.todoItems[value.selectedItem[0]].condition = value.updateCondition;
        },
      selectCondition: (state, selectedcondition) => {
        state.selectedconditions= selectedcondition;
      },
      selectCategory: (state, selectedcategory) => {
        state.selectedcategorys= selectedcategory.value;
      }
    },
    actions:{
        logout: (context) =>{
          authRef.signOut()
          .then(function(){
            alert("정상적으로 로그아웃!");
          }).catch(function(error){
            alert("로그아웃 실패");
          })
        },
        clearAll: (context, time) => { // 비동기 작업 수행 후 mutation commit
          dbRef.where('user', '==', authRef.currentUser.email)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  dbRef.doc(doc.id).delete();
              });
          });
          setTimeout(()=>context.commit('clearAll'),time)
        },
        clearTodo: (context, time) => {
          dbRef.where('condition', '==', 'Todo').where('user', '==', authRef.currentUser.email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    dbRef.doc(doc.id).delete();
                });
            });
            setTimeout(()=>context.commit('clearTodo'),time)
        },
        clearDoing: (context, time) => {
          dbRef.where('condition', '==', 'Doing').where('user', '==', authRef.currentUser.email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    dbRef.doc(doc.id).delete();
                });
            });
            setTimeout(()=>context.commit('clearDoing'),time)
        },
        clearDone: (context, time) => {
          dbRef.where('condition', '==', 'Done').where('user', '==', authRef.currentUser.email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    dbRef.doc(doc.id).delete();
                });
            });
            setTimeout(()=>context.commit('clearDone'),time)
        },
        getTodos: (context) => {
            dbRef.onSnapshot(query => {
                context.commit('clearAll');
                query.forEach(doc => {
                context.commit('addTodo', {
                        'id': doc.id,
                        'user':doc.data().user,
                        'contents': doc.data().contents,
                        'detail': doc.data().detail,
                        'date': doc.data().date,
                        'category': doc.data().category,
                        'condition': doc.data().condition,
                        'showdetail': doc.data().showdetail
                    });
                });
                context.commit('countTodo');
            });
        },
        removeTodo: (context, payload) => {
            dbRef.doc(payload).delete();
        },
        addTodo: (context, value) => {
            let id = Date.now().toString();
            dbRef.doc(id).set({'user':value[1],'contents':value[0],
                  'detail':'', 'date':'', 'category':'', 'condition':'Todo','showdetail':false});
        },
        doneTodo: (context, todoItem) => {
          console.log(todoItem);
            if(todoItem.condition=='Todo') dbRef.doc(todoItem.id).update({'condition':'Todo'});
            else if(todoItem.condition=='Doing') dbRef.doc(todoItem.id).update({'condition':'Doing'});
            else if(todoItem.condition=='Done')dbRef.doc(todoItem.id).update({'condition':'Done'});
        },
        updateTodo: (context, value) => {
          dbRef.doc(value.id).update({'contents':value.contents, 'detail':value.detail,
          'category':value.category, 'condition':value.condition,'date':value.date });
        },
        signup: (context, value) =>{
          alert(value.email);
          authRef.createUserWithEmailAndPassword(value.email, value.password).then(
            function(user){
              alert("계정 만들기 성공");
            },
            function(error){
              var errorCode = error.code;
              var errorMessage = error.message;
              var email = error.email;
              var credential = error.credential;
              alert(errorMessage);
            }
          )
        },
        eLogin: (context, value) =>{
          alert(value.email);
          authRef.signInWithEmailAndPassword(value.email, value.password).then(
            function(user){
              alert("connnected!");
            },
            function(error){
              var errorCode = error.code;
              var errorMessage = error.message;
              var email = error.email;
              var credential = error.credential;
              alert(errorMessage);
            }
          )
        },
        userAuth: (context) =>{
          authRef.signInWithPopup(gProvider)
          .then(result=>{
            alert("google계정으로 로그인 성공!");
            context.commit('userAuth',result.user.displayName)
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
        },
        userAuthf: (context) =>{
          authRef.signInWithPopup(fProvider)
          .then(result=>{
            alert("facebook계정으로 로그인 성공!");
            context.commit('userAuthf',result.user.displayName)
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            });
          },
          userAuthgi: (context) =>{
            authRef.signInWithPopup(giProvider)
            .then(result=>{
              alert("github계정으로 로그인 성공!");
              context.commit('userAuthgi',result.user.displayName)
            }).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              var email = error.email;
              var credential = error.credential;
              });
            }
      }
});
