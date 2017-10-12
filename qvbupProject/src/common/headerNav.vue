<template>
    <div class="div_header_nav">
      <!--<div class="div_img" v-if="itemTitle=='预约车辆'" @click="goback" >-->
        <!--<img src="../assets/images/row.png">-->
      <!--</div>-->
      <!--{{itemTitle}}-->
      <div class="div_title">
        <router-link :to="{name:'Map'}">
        <img src="../assets/images/coach_selected.png" class="img_left">
         </router-link>
        <router-link :to="{name:'Appointment'}">
        <img src="../assets/images/icon_booking_select.png" class="img_right">
        </router-link>
      </div>
    </div>
</template>
<script>
  export default{
//    props: {
//      itemTitle:{
//        type: String
//      }
//    },
    data(){
      return {

      }
    },
    created(){
    },
    methods:{
      goback(){
        this.$router.go(-1)
      }

    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
.div_header_nav{
  width: 100%;
  height: 4rem;
  background: #14293a;
  text-align: center;
  color: #fff;
  line-height: 4rem;
  .div_img{
    width: 4rem;
    height: 4rem;
    position: absolute;
    display: inline-block;
    left:0;
    img{
      width: 2.5rem;
      transform: rotate(180deg);
      position: absolute;
      top:50%;
      left: 50%;
      margin-top: -1.25rem;
      margin-left: -1.25rem;
    }
  }
}
</style>
