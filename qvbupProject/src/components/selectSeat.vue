<template>
    <div class="div_seat">
       <div class="div_state">
         <div class="state">空座</div>
         <div class="state r1">已售</div>
         <div class="state r2">已选</div>
         <!--@click="finish" -->
          <!--<router-link :to="{name:'PassengerInfo',params:{ids:parms.ids,price:parms.price,lineid:parms.lineid,carnumber:parms.carnum}}">-->
            <div class="finish" @click="finish">
            <img src="../assets/images/row.png">
            </div>
          <!--</router-link>-->
       </div>
       <div class="div_seatshow">
          <div class="seats">
            <template v-for="seatitem in seatArray">
              <!--<div class="seat" :class="[seatitem.value==''?'opac':'']" @click="seatClick">{{seatitem.value}}</div>-->
              <div  v-if="seatitem.value!=''&&seatitem.saled==''" class="seat" :class="[seatitem.selected,seatitem.saled]" @click="seatClick">{{seatitem.value}}</div>
              <div  v-if="seatitem.value==''" class="seat opac" >{{seatitem.value}}</div>
              <div  v-if="seatitem.saled!=''" class="seat" :class="[seatitem.selected,seatitem.saled]">{{seatitem.value}}</div>
            </template>
          </div>
        </div>
        <img src="../assets/images/icon_refresh_selected.png" class="rotate" @click="rotate">
    </div>
</template>
<script>
  import $ from 'webpack-zepto'
  import request from 'superagent'
  export default{
    data (){
      return{
        parms:{
          sumSeat:'',
          startdata:"",
          starttime:'',
          line:'',
          carnum:'',
          price:'',
          lineid:'',
          ids:[1,3]
        },
        seatArray:[],
        saledArr:[]
      }
    },
    created (){
      this.getPrams();
      this.getSeats();
      this.requestSaled()
    },
    methods:{
      getPrams(){
        this.sumSeat=this.$route.params.sumSeat;
        this.startdata= this.$route.params.startdata;
        this.starttime= this.$route.params.starttime;
        this.price= this.$route.params.price;
        this.lineid= this.$route.params.lineid;
      },
      getSeats(){
          var number = this.sumSeat;
          var arr = [];
          for (var i = 1; i <= number; i++) {
            var j = {
              'id': '',
              'value': '',
              'saled': '',
              'selected': '',
              'seatClick': 'seatClick',
            }
            j.value = i;
            j.id=i
            arr.push(j);
          }
          var first = (number - 5) % 4;
          //console.log(first)
          var newArrrow = Math.floor((number-5)/4+2);
          var centerrow =Math.floor((number - 5) / 4 );
          var newArrcol=5;
          var newnum=newArrrow*newArrcol;
          if(first>0){ //余数大于0时
            for (var i = first; i < 5; i++) {//第一排的从下标为i往后插入n个
              var ff = {
                'value': '',
                'saled': '',
                'selected': '',
                'seatClick': 'seatClick',
              }
              arr.splice(i, 0, ff)
            }
          }
          if (first == 3) {//如果第一排出现三个，就把第三个的value给第五个，第三个的value为空
            arr[4].value = arr[2].value;
            arr[4].id = arr[2].id;
            arr[2].value = "";
            arr[2].id = "";
          }
          var ff1 = {
            'value': '',
            'saled': '',
            'selected': '',
            'seatClick': 'seatClick',
          }

          if (first == 0) {//如果余数为0 就在第2个后面加上空白的
            arr.splice(2, 0, ff1);
            centerrow=centerrow-1;//因为整除了 所以中间的行数要减1
          }
          var ss=7;
          var centerArr=[];
          while (ss < newnum){
            ss=ss+5;
            centerArr.push(ss)
          }

          centerArr.splice(0,0,7);
          for (var i = 0; i < centerrow;i++){//从第二排开始过道位置插入，最后一行保留
            var s = centerArr[i]
            //console.log(s)
            arr.splice(s, 0, ff1)
          }
            this.seatArray=arr;
          console.log(this.seatArray)
        },
      seatClick(){
        var current=event.currentTarget;
        var id=$(current).text();
        if($(current).hasClass("selected")){
          $(current).removeClass("selected")
        }else{
          $(current).addClass("selected")
        }
        var array1=this.seatArray;
        for (var i=0;i<array1.length;i++){
          if (id == array1[i].id){
            if (array1[i].selected == ""){
              array1[i].selected = "selected"
            }else{
              array1[i].selected = "";
            }
          }
        }
        this.seatArray=array1
      },
      requestSaled(){//已售的不可以点击 背景变成红色的
        var arr=this.seatArray;
        console.log(this.lineid)
        request
          .get(global.url+"contacts/seatnumber?token="+global.token,{"id": this.lineid})
          .end((err,res)=>{
            if(!err){
              if(res.body.code=="200"){
                var saledarr = res.body.data;
                console.log(res.body)
                for(var i=0;i<arr.length;i++){
                  for (var j=0;j<saledarr.length;j++){
                    if(saledarr[j]==arr[i].value){
                      arr[i].saled = "saled";
                      arr[i].seatClick = "";
                    }
                  }
                }
                this.seatArray=arr;
                console.log(this.seatArray)
              }
            }else{
              console.log("111")
            }
          })
      },
      rotate(){//刷新操作
        var arr = this.seatArray;
        for (var i = 0; i < arr.length; i++) {//清空状态，重新渲染，避免只增不减
          arr[i].saled = "";
          arr[i].seatClick = "";
        }
        this.requestSaled()
      },
      finish(){//拿到所有selected的元素
        var t=[];
        for (var i = 0; i < this.seatArray.length; i++) {//拿到所有selected：“selected”
          if (this.seatArray[i].selected == "selected") {
            var s= this.seatArray[i].value
            t.push(s)
          }
        }
        this.ids=t+"";//数组转化成字符串 因为数组不能直接传参带到下个界面
        if(this.ids.length<=0){
          alert("请选择预约座位!")
        }else{//跳转到乘客信息页面
          this.$router.push({name:'PassengerInfo',params:{ids:this.ids,price:this.price,lineid:this.lineid}});
        }
      }
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .div_seat{
    width:100%;
    height:100vh;
    background:#f0f0f0;
    position:relative;
    .div_state{
      width:100%;
      height:4.5rem;
      display:flex;
      flex-wrap:nowrap;
      justify-content:center;
      background:#fff;
      position:relative;
      .state{
        width: 24%;
        line-height: 4.5rem;
        text-align: center;
        position: relative;
        &:after{
          position: absolute;
          content: "";
          border:1px solid #bbb;
          width: 0.7rem;
          height: 0.7rem;
          left:1rem;
          top:50%;
          margin-top: -0.5rem;
          border-radius: 50%;
        }
      }
      .r1{
        &:after{
          background: red;
        }
      }
      .r2{
        &:after{
          background: #ffd863;
        }
      }
      .finish{
        position:absolute;
        right:1.5rem;
        top:0.65rem;
        height:3rem;
        width:3rem;
        line-height:3rem;
        text-align:center;
        color:#fff;
        border-radius:50%;
        background:#f15a48;
        img{
          width:1.8rem;
          height:1.8rem;
          margin:0 auto;
          display:flex;
          margin-top:0.6rem;
        }
      }
    }
    .div_seatshow{
      width: 100%;
      height: 80%;
      overflow-y: auto;
      margin-top: 1.9rem;
      .seats{
        margin:0 auto;
        width:27rem;
        display:flex;
        flex-wrap:wrap;
        .seat{
          width:4.5rem;
          height:5.7rem;
          border-radius:1rem 1rem 0 0;
          border:1px solid #bbb;
          text-align:center;
          margin:0.25rem;
          line-height:6rem;
          background:#fff;
          color:#14293a;
          box-sizing: border-box;
        }
        .opac{
          opacity:0;
        }
        .saled{
          background: #f15a48;
          color: #fff;
        }
        .selected{
          background: #fff;
          border: 2px solid #ffd863;
        }
      }
    }
    .rotate{
      position:absolute;
      right:5rem;
      bottom:1.5rem;
      width: 3rem;
    }
  }
</style>
