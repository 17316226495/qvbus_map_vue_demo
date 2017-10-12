<template>
  <div class="home_view">
    <!--<HeaderNav itemTitle="预约车辆"></HeaderNav>-->
    <HeaderNav></HeaderNav>
    <router-view></router-view>
  </div>
</template>
<script>
  import HeaderNav from  '../common/headerNav.vue'
  export default{
    components: {HeaderNav},
    data () {
      return {}
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .div_title{
    width: 100%;
    height:4rem;
    position: fixed;
    top: 0;
  img{
    width: 4.5rem;
    position: absolute;
    top:1rem;
  }
  .img_left{
    left: 30%;
    margin-left: -2.25rem;
  }
  .img_right{
    right: 30%;
    margin-right: -2.25rem;
  }
  }
</style>

