<template>
    <div class="div_selectcity" >
      <HeaderNav :headerTitle="选择城市"></HeaderNav>
      <!--弹出首字母-->
      <div class="showSlectedLetter" v-if="isShowLetter">
        {{showLetter}}
      </div>
      <!--侧边栏展示-->
      <div class="searchLetter touchClass">
          <div class="thishotText" style="margin-top:0;">
              <div style="margin-top:0;color:#2ab4ff;font-size:1rem;" @click="hotcity">热门</div>
          </div>
            <template v-for="Aitem in searchLetter">
              <div style="color:#2ab4ff;font-size:1rem;" :data-letter="Aitem.name" @click="clickLetter(Aitem.name)">{{Aitem.name}}</div>
            </template>
      </div>
      <div class="div_inputHeader">
        <img src="../assets/images/icon_search.png">
        <input type="text" placeholder="齐齐哈尔/qiqihaer/qqhe">
      </div>
      <div class="div_hotCity">
          <div class="hot_city">热门城市</div>
          <div class="hotcity_list">
            <div>北京</div>
            <div>厦门</div>
            <div>上海</div>
            <div>无锡</div>
          </div>
      </div>
      <div class="div_countryCity">
          <template v-for="cityC in cityList">
            <div class="selection">
            <div class="item_letter" :class="[cityC.initial]" :id="cityC.initial" >
              {{cityC.initial}}
            </div>
            <template v-for="cityitem in cityC.cityInfo">
              <div class="item_city" :data-cityCode="cityitem.code" :data-city="cityitem.city" >
              {{cityitem.city}}
              </div>
            </template>
            </div>
          </template>
      </div>
    </div>
</template>
<script>
  import HeaderNav from  '../common/headerNav.vue'
  import city from '../assets/utils/city'
  import $ from 'webpack-zepto'
  export default{
    components: {HeaderNav},
    data (){
      return{
        winHeight:'',
        searchLetter:[],//首字母大写集合
        cityList:[],//每个代写字母对应的城市名集合
        showLetter:'',
        isShowLetter: false,
      }
    },
    created(){
      this.allCityShow()
    },
    methods:{
      allCityShow () {//获取所有的城市
        var searchLetter = city.searchLetter;
        var cityList = city.cityList();
        var winHeight = window.screen.height;
        var itemH = winHeight / searchLetter.length;
        var tempObj = [];
        for (var i = 0; i < searchLetter.length; i++) {
          var temp = {};
          temp.name = searchLetter[i];
          tempObj.push(temp)
        }
          this.winHeight=winHeight;
          this.searchLetter=tempObj;
          this.cityList=cityList;
      },
      hotcity(){//点击“热门”返回顶部
          window.scrollTo(0,0);
      },
      clickLetter(showLetter){
          this.showLetter=showLetter;
          this.isShowLetter=true;
          var that = this;
          window.scrollTo(0,$("."+showLetter).offset().top);
        setTimeout(function () {
          that.isShowLetter=false;
        }, 500)
      }
    },

  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .showSlectedLetter {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -5rem;
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;
    font-size: 2.6rem;
    z-index: 1;
  }
  .searchLetter{
    position:fixed;
    right:0;
    width:2.5rem;
    text-align:center;
    justify-content:center;
    display:flex;
    flex-direction:column;
    color:#666;
    z-index:1;
    div{
      margin-top: 1rem;
    }
  }
  .touchClass{
    background-color:#fff;
    color:#fff;
    margin-top:9.2rem;
  }
  .div_selectcity{
    background: #f2f2f2;
    width: 100%;
    height: 100vh;
  }
  .div_inputHeader{
    width: 95%;
    height: 3rem;
    margin: 0 auto;
    position: relative;
    padding-top: 0.8rem;
    img{
      position:absolute;
      width:2rem;
      height:2rem;
      top:1.4rem;
      left:1rem;
      z-index:10;
    }
    input{
      width: 100%;
      height: 3rem;
      text-indent: 4rem;
      border:1px solid #ccc;
    }
  }
  .div_hotCity{
    .hot_city{
      margin-top:2rem;
      margin-left:1.6rem;
      font-size: 1.6rem;
    }
    .hotcity_list{
      background: #fff;
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      margin-top: 1.3rem;
      padding-bottom: 1.3rem;
      div{
        width:25%;
        background-color:#fff;
        height:2.6rem;
        line-height:2.6rem;
        margin:1.8rem 0 0 4%;
        align-items:center;
        border:1px solid #ededed;
        font-size:1.2rem;
        color:#14293a;
        text-align:center;
      }
    }
}
  .div_countryCity{
    .selection{
      display:flex;
      width:100%;
      flex-direction:column;
      margin-top:0.5rem;
      .item_letter{
        display:flex;
        background-color:#f5f5f5;
        height:2rem;
        padding-left:1.7rem;
        align-items:center;
        font-size:1.2rem;
        color:#14293a;
      }
      .item_city{
        display:flex;
        background-color:#fff;
        height:5rem;
        padding-left:1.7rem;
        align-items:center;
        border-bottom:1px solid #ededed;
        font-size:1.2rem;
        color:#14293a;

      }
    }
  }
</style>
