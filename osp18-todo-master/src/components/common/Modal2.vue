<template>
<transition name="tmodal">
  <div class="tmodal-mask">
    <div class="tmodal-wrapper">
      <div class="tmodal-container">

        <div class="tmodal-header">
          <slot name="header">
            default header
          </slot>
        </div>

        <div class="tmodal-body">
          <slot name="body">
            ! 모두 삭제할 목록을 선택해주세요 !
          </slot>
        </div>

        <div class="tmodal-footer">
          <slot name="footer">
          </slot>
          <b-button variant="danger" value="All" @click="$emit('clearTodo');$emit('close');">All</b-button>&nbsp;&nbsp;
          <b-button variant="success" value="Todo"  @click="$emit('todoClear');$emit('close');">Todo</b-button>&nbsp;&nbsp;
          <b-button variant="primary" value="Doing"  @click="$emit('doingClear');$emit('close');">Doing</b-button>&nbsp;&nbsp;
          <b-button variant="warning" value="Done" @click="$emit('doneClear');$emit('close');">Done</b-button>&nbsp;&nbsp;
          <i class="closeModalBtn fas fa-times" aria-hidden="true" @click="$emit('close')" style="color:black"></i>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<style>
.All{
  width:50pt;
  height:20pt;
  background-color: #000000;
  border: 1px solid #000000;
  color: #FFFFFF;
  border-radius: 7px;
}
.Todo{
  width:50pt;
  height:20pt;
  background-color: #288C28;
  border: 1px solid #288C28;
  color: #FFFFFF;
  border-radius: 7px;
}
.Done{
  width:50pt;
  height:20pt;
  background-color: #EB0000;
  border: 1px solid #EB0000;
  color: #FFFFFF;
  border-radius: 7px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 10px;
}
.tmodal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.tmodal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.tmodal-container {
  width: 400px;
  height: 300px;
  margin: 0px auto;
  padding: 30px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.tmodal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.tmodal-body {
  margin: 20px 0;
}

.tmodal-default-button {
  float: right;
}

.tmodal-enter {
  opacity: 0;
}

.tmodal-leave-active {
  opacity: 0;
}

.tmodal-enter .tmodal-container,
.tmodal-leave-active .tmodal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
