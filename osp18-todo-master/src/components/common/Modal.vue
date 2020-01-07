<template lang="html">
  <transition name="modal">
    <div class="modal-mask" @keyup.esc="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <!--  -->
            </slot>
          </div>

          <div class="modal-footer">
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  text-align:center;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  float:center;
  overflow: hidden;
  text-align:center;
}

.modal-container {
  width: 350px;
  height : 70%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow-y: scroll;
  text-align:center;
}

.modal-container::-webkit-scrollbar{
  width:0 !important;
}

.modal-header h4 {
  margin-top: 0;
  color: #62acde;
  text-align:center;
}

.modal-body {
  margin: 20px 0;
  text-align:center;
}

.modal-default-button {
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

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-footer{
  float:center;
  text-align:center;
}
</style>
