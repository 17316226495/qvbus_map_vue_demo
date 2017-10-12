<template>
  <div id="container" style="width:100%; height:100vh"></div>
</template>
<script>
  /*  eslint-disabled no-undef */
//  import AMap from 'AMap'
//  import AMapUI from 'AMapUI'
  //如果AMap报错undefined AMap是全局变量 可以不用import
  //当前页面返回上一个页面 点击其他页面都会报错  所以原生的跟vue-amap不能同时使用  如果把当前页面换成vue-amap的风格的话 来回切换页面没有问题,但是在真机上操作没有影响
  export default {
    data(){
      return{
        markerspoit:[
          [116.44, 39.91],
          [116.49, 39.91],
        ],
        markersPath:[//车道轨迹图
          [
            [116.44, 39.91],
            [116.49, 39.91],
            [116.45, 39.96],
            [116.49, 39.99],
            [116.49, 40.02],
          ],
          [
            [116.49, 39.91],
            [116.40, 39.96],
            [116.40, 39.99],
            [116.41, 40.02],
          ]
        ]
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init () {
       let map = new AMap.Map('container', {
          center: [116.397428, 39.90923],
          resizeEnable: true,
          zoom: 17
        })
        console.log(AMap);
 //地图中心点
        var marker = new AMap.Marker({
          icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [116.397428, 39.90923]
        });
        marker.setMap(map)
//地图的缩放工具
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar())
          map.addControl(new AMap.Scale())
        })
//根据起、终点名称查询公交换乘路线
        var transOptions = {
          map: map,
          city: '北京市',
          policy: AMap.TransferPolicy.LEAST_TIME //乘车策略
        };
        var transfer = new AMap.Transfer(transOptions);
        transfer.search([
          {keyword: '地震局',city:'北京'},
          {keyword: '望京西园4区',city:'北京'}
        ]);
//创建车道轨迹
        var marker;
        for(var i=0;i<this.markerspoit.length;i++){
          marker = new AMap.Marker({
            map: map,
            position: this.markerspoit[i],
            icon: "http://webapi.amap.com/images/car.png",
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true
          });
          var polyline= new AMap.Polyline({
            map: map,
            path: this.markersPath[i],
            strokeColor: "#00A",  //线颜色
            //strokeOpacity: 0,     //线透明度
            strokeWeight: 3,      //线宽
          });
          map.setFitView()
          marker.moveAlong(this.markersPath[i], 1000);
        }
      }
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
</style>
