<template lang="html">
  <transition name="warn-modal">
    <div class="warn-modal-mask" @keyup.esc="$emit('close')">
      <div class="warn-modal-wrapper">
        <div class="warn-modal-container">
          <div class="warn-modal-header">
            <slot name="header">
              <!--  -->
            </slot>
          </div>

          <div class="warn-modal-footer">
            <slot name="footer">
              <!--  -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="css">
.closeModalBtn {
  color: #62acde;
}
.warn-modal-mask {
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

.warn-modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  float:center;
  overflow: hidden;
}

.warn-modal-container {
  height : 300px;
  width: 350px;
  text-align:center;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow-y: scroll;
}

.warn-modal-container::-webkit-scrollbar{
  width:0 !important;
}

.warn-modal-header h2 {
  margin-top: 0;
  color: #62acde;
}

.warn-modal-body {
  margin: 20px 0;
}

.warn-modal-default-button {
  float: center;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.warn-modal-enter {
  opacity: 0;
}

.warn-modal-leave-active {
  opacity: 0;
}

.warn-modal-enter .modal-container,
.warn-modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.warn-modal-footer{
  display:table;
  width:100%;
  float:center;
  text-align:center;
}
</style>
