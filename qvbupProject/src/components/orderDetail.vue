<template>
    <div class="div_order">
      <!--<HeaderNav :headerTitle="订单详情"></HeaderNav>-->
      <div class="div_line">
        班次信息
      </div>
      <div class="detail_info">
      <div class="div_name">
        <div class="div_first">出发地</div>
        <div class="div_second">{{startCity}}</div>
      </div>
        <div class="div_name">
          <div class="div_first">目的地</div>
          <div class="div_second">{{endCity}}</div>
        </div>
        <div class="div_name">
          <div class="div_first">出发日期</div>
          <div class="div_second">{{data}}</div>
        </div>
        <div class="div_name">
          <div class="div_first">班次号</div>
          <div class="div_second">{{linePlay}}</div>
        </div>
        <div class="div_name">
          <div class="div_first">座位号</div>
          <div class="div_second">{{seat}}</div>
        </div>
        <div class="div_name">
          <div class="div_first">交付金额</div>
          <div class="div_second">{{payMoney}}</div>
        </div>
      </div>
      <div class="div_line">
        乘客信息
      </div>
      <template v-for="item in contacts">
      <div class="detail_info">
        <div class="div_name">
          <div class="div_first"> {{item.username}}</div>
          <div class="div_second idcard">
            <img src="../assets/images/icon_idcard.png">{{item.carid}}</div>
        </div>
        <div class="div_name">
          <div class="div_first"></div>
          <div class="div_second phone">
            <img src="../assets/images/icon_phone.png">
            {{item.phone}}
          </div>
        </div>
      </div>
      </template>
      <div class="div_tips">
        <p>温馨提示</p>
        客户您好，该平台暂不支持退票，请您提前规划好您的发车时间。
      </div>
    </div>
</template>
<script>
  import request from 'superagent'
  export default{
    data(){
      return{
        startCity:"",
        endCity:"",
        data:"",
        linePlay:"",
        seat:"",
        payMoney:"",
        contacts:[]
      }
    },
    created(){
      this.getParams();
    },
    methods:{
      getParams(){
        var parentid=this.$route.params.parentid;
        //传递参数parentid调取后台接口获取信息
        request
          .get(global.url+"contacts/getorderinfor?token="+global.token,{parentid:parentid})
          .end((err,res)=>{
            if(!err){
              console.log(res.body.data)
              if(res.body.code=="200"){
                  this.startCity=res.body.data.starname;
                  this.endCity=res.body.data.arrayname;
                  this.data=res.body.data.startdate+" "+res.body.data.strattime;
                  this.linePlay=res.body.data.lineno;
                  this.seat=res.body.data.seat;
                  this.payMoney=res.body.data.amount;
                  this.contacts=res.body.data.contrans;
              }
            }else{

            }
          })
      },
    },

  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .div_order{
    width: 100%;
    height:100vh;
    background:#f0f0f0;
    position:relative;
    color:#14293a;
    font-size: 1.6rem;
  }
  .div_line{
    width: 100%;
    background: #f0f0f0;
    height: 4.5rem;
    line-height: 4.5rem;
    padding-left: 5%;
  }
  .detail_info{
    width: 100%;
    height: auto;
    background: #fff;
    .div_name{
      width:80%;
      height:4.2rem;
      line-height:4.2rem;
      margin:0 3.75rem;
      border-bottom:1px solid #eee;
      display:flex;
      flex-wrap:nowrap;
      .div_first{
        width: 8rem;
      }
      .div_second{
        position: relative;
        img{
          width: 2rem;
          height:2rem;
          position: relative;
          top: 0.5rem;
        }
      }

    }
  }
  .div_tips{
    font-size:1.2rem;
    color:#f05b48;
    padding:1.5rem 0 1.5rem 1.5rem;
    background:#fff;
    p{
      font-size:1.8rem;
      padding-bottom:1rem;
    }
  }
</style>
