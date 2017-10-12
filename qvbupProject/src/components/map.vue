
<template>
    <div  class="amap-page-container">
      <el-amap vid="amapDemo"  :center="center"  :zoom="zoom" :events="events" class="amap-demo">
        <!--关键字搜索-->
        <div style="position: fixed; top: 40px;width: 100%">
        <input type="text" ref="searchText" id="searchText" @keyup="keyUpSearch" placeholder="vue-amap调用高德地图"/>
        <div class="address_items" id="address_result" v-if="searchData.length > 0">
        <div class="address_item" v-for="item in searchData">
        <div class="title">{{ item.name }}</div>
        <div class="description">{{ item.pname }}{{ item.cityname }}{{ item.address }}</div>
        </div>
        </div>
        <div id="temp" style="display:none"></div>
          <!--<div id="panel"></div>-->
        </div>
       <!--移动的marker-->
        <el-amap-marker v-for="marker in markers" :position="marker.position">
        </el-amap-marker>
        <!--切换到原生的api页面-->
        <router-link :to="{name:'MapMain'}">
        <button class="go">前往高德原生api</button>
        </router-link>
      </el-amap>
    </div>
</template>
<script>
  import VueAMap from 'vue-amap'
  let amapManager = new VueAMap.AMapManager();
  export default {
    data() {
      return {
        zoom: 12,
        center: [116.40, 39.91],
        amapManager,
        events: {
          init(map) {
            AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {//中心点位置 必须在index.html里面引入 AMapUI才可以使用 其余的操作不依赖引入高德原生js 使用vue-amap就可以
              const marker = new SimpleMarker({
                iconLabel: 'A',
                iconStyle: 'red',
                map: map,
                position: map.getCenter()
              });
            });
            AMap.service(["AMap.Transfer"], function() {//调取高德的服务 不必在index.html里面引用
            var transOptions = {
              map: map,
              city: '北京市',
//            panel: 'panel',//不需要pannel
              policy: AMap.TransferPolicy.LEAST_TIME //乘车策略
            };
            //构造公交换乘类
            var transfer = new AMap.Transfer(transOptions);
              console.log(transfer)
            transfer.search([
              {keyword: '地震局',city:'北京'},
              {keyword: '望京西园4区',city:'北京'}
            ]);
            })
          }
        },
        searchData:"",
        markers: [],
        markersPath:[//车道轨迹图
          [
            [116.440001, 39.910001],
            [116.440002, 39.910002],
            [116.440003, 39.910003],
            [116.440004, 39.910004],
            [116.440005, 39.910005],
          ],
          [
            [116.480001, 39.910001],
            [116.480002, 39.910002],
            [116.480003, 39.910003],
            [116.480004, 39.910004],
            [116.480005, 39.910005],
            [116.480006, 39.910006],
          ]
        ]
      };
    },
    mounted() {
      // 这样地图上就添加了2个人
      this.markers = [
        {
          position:  [116.44, 39.91],
        },
        {
          position: [116.49, 39.91],
        },

      ];
// 模拟实时更新位置
      // 开启一个1s的轮训，每个人的经纬度都自增0.00001
      const step = 0.0001;
      setInterval(() => {
        for (var i=0;i<this.markers.length;i++){
          for(var j=0;j<this.markersPath.length;j++){
            for (var k=0;k<this.markersPath[j].length;k++){
              this.markers[i].position = [this.markers[i].position[0] + step, this.markers[i].position[1] + step];
              //this.markers[i].position = this.markersPath[j][k];
              //console.log(this.markers[i].position)
            }
          }
        }
      }, 10000);
    },
    created(){
    },
    methods: {
      entersearch(){
        var _this = this
        var txt = this.$refs.searchText.value;
        AMap.service(["AMap.PlaceSearch"], function() {//直接使用AMap 是高德的api
         // console.log(AMap)
          var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 12,
            pageIndex: 1,
            city: "北京",
            cityLimit: 'true',
            panel: 'temp'
            //搜索结果的展示面板对元素id，不知道为什么一定要有该参数，最终获取的结果才更完整，参数更多跟完整，
            //所以我在页面随便写了一个<div id="temp" style="display:none"></div>
          });
          //关键字查询
          placeSearch.search(txt, function(status, result) {
            if (status == 'complete' && result.info == 'OK') {
              console.log(result)
              if (txt==""){
                _this.searchData=""
              }else{
                _this.searchData = result.poiList.pois
              }
            }
          })
        })

      },
      keyUpSearch(){//
//        var ev= window.event||arguments.callee.caller.arguments[0];
//        if (ev.keyCode == 13) {//手机版没有enter回车操作
          this.entersearch()
//        }
      },

    }
  };
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .amap-page-container{
    width: 100%;
    height:90vh;
  }
  .amap-demo {
    height: 300px;
  }
  #searchText{
    height: 25px;
    width: 100%;
    text-indent: 20px;
  }
  .address_items{
    height:190px;
    overflow: auto;
  }
  .address_item{
    min-height: 45px;
    background: #fff;
    font-size: 1.3rem;
    padding-left: 20px;
    border: 1px solid #eee;
    .title,.description{
      line-height: 23px;
    }
    .description{
      font-size: 1.2rem;
      color: #666;
    }
  }
  .go{
    background: lightgreen;
    line-height: 40px;
    position: fixed;
    top:75px;
    right:0;
    border: none;
    border-radius: 10px;
    padding: 0 5px;
  }
</style>
