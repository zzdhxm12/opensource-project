<template>
  <input type="text" placeholder="yyyy/mm/dd" v-model="newUpdateDate" id="calendar">
</template>

<script>
export default{
  data(){
    return{
      newUpdateDate: ''
    }
  },
  mounted(){
    $('#calendar').datepicker({
      dateFormat: "yy/mm/dd"
    });
  }
}
</script>
