<template>
    <div class="div_appointment">
      <div class="div_bottom">
        <div class="div_city">
          <router-link :to="{name:'Selectcity',params:{cityname:startc}}">
          <span class="startcity">{{startc}}</span>
          </router-link>
          <img src="../assets/images/icon_exchange_unselect.png">
          <router-link :to="{name:'Selectcity',params:{cityname:endc}}">
          <span class="endcity">{{endc}}</span>
          </router-link>
        </div>
        <div class="div_picker">
          <!--也可以加上一个标志位来控制点击事件是否触发 flag&&getPrevDate()-->
          <div class="div_prev prevunable"  v-if="currentValueDate>=currentTapData">
            <img src="../assets/images/row.png">
          </div>
          <div class="div_prev" v-if="currentTapData>currentValueDate" @click="getPrevDate()">
            <img src="../assets/images/row.png">
          </div>
          <div class="div_next" @click="getNextDate()">
            <img src="../assets/images/row.png">
          </div>
          <div class="openTimePicker"  @click="openPicker">
          <img src="../assets/images/icon_calendar.png" class="calender">
          <div class="year_day">{{currentTapData}}</div>
          </div>
        </div>
        <p class="p_desc" @click="dddd">添加您的航班时间</p>
        <mt-datetime-picker
          ref="picker"
          type="date"
          v-model="pickerValue"
          year-format="{value}年"
          month-format="{value} 月"
          date-format="{value} 日"
          :startDate="startDate"
          :endDate="endDate"
          @confirm="handleConfirm(pickerValue)"
        >
        </mt-datetime-picker>
          <div class="div_content">
            <template v-for="item in playitems">
              <div class="parent">
            <div class="div_play" :class="item.state=='0'?'cannotSelectSeat':''"  v-on:click="seatShow($event,item.sumnub,item.state,item.id)" :data-id="item.id" >
              <div class="time">
                <div class="startTime">{{item.starttime}}</div>
                <div class="time_line">{{item.taketime}}</div>
              </div>
              <div class="center">
                <div class="dolt"></div>
                <div class="start">{{item.startname}}</div>
                <p class="time_line">{{item.startdates}}</p>
                <div class="end">{{item.endname}}</div>
                <p class="time_line">{{item.arraytime}}</p>
              </div>
              <div class="right">
                <p class="price">￥{{item.price}}</p>
                <div class="div_prev clickable">
                  <img src="../assets/images/row.png">
                </div>
              </div>
            </div>
            <div class="car_openShow" >
                    <div class="div_title">
                        <div class="blockSeat radius">空座</div>
                        <div class="saledSeat radius">已售</div>
                    </div>
              <!--<router-link :to="{name:'Selectseat',params:{sumSeat:item.sumnub,startdata:item.startdate,starttime:item.starttime,price:item.price,lineid:item.id}}">-->
                   <div class="car_detail" :style="{width:detailwidth}" @click="selectSeat(item.sumnub,item.startdate,item.starttime,item.price,item.id)">
                     <img src="../assets/images/icon_steering_wheel.png" class="view_direction"></img>
                     <div class="seats" :style="{width:seatswidth}">
                       <template v-for="seatitem in seatArray">
                         <div class="clum" >
                           <template v-for="seat in seatitem">
                             <div v-if="seat.value==''" class="clum_item opac">
                             </div>
                             <!---->
                             <div v-else class="clum_item" :class="seat.saled">
                             </div>
                           </template>
                         </div>
                       </template>
                     </div>
                   </div>
             <!--</router-link>-->
            </div>
              </div>
            </template>
          </div>
      </div>
    </div>
</template>
<script>
  import request from 'superagent'
  import jsonp from 'superagent-jsonp'
  import $ from 'webpack-zepto'
  import { Toast } from 'mint-ui';
  export default{
    data () {
      return{
        startc:'哈尔滨',
        endc:'饶河',
        flag:true,
        currentValueDate:'',
        currentTapData:'',
        detailwidth:"",
        seatswidth:'',
        seatArray:[],
        startDate:'',//日历的开始时间
        endDate:'',//日历的结束时间
        playitems: [],
        lineid:'',//线路id
      }
    },
    created () {
      var date=new Date();
      var currentYear=date.getFullYear();
      var currentMonth=date.getMonth()+1;
      var currentDay=date.getDate();
      currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;//用作与变化的时间做对比
      currentDay = currentDay < 10 ? "0" + currentDay : currentDay;
      this.currentValueDate=currentYear+"-"+currentMonth+"-"+currentDay;//一进来获取当前时间
      this.currentTapData=currentYear+"-"+currentMonth+"-"+currentDay;//点击日历 next prev的操作 记录时间变化
      this.startDate=new Date();
      this.endDate=new Date(parseInt(currentYear),parseInt(currentMonth),parseInt(currentDay));
      this.getData();
    },
    methods:{
      dddd(){
        Toast({
          message: '操作成功',
          position:'bottom',
          duration: 1500
        });
      },
      openPicker() {//打开日历
        this.$refs.picker.open();
      },
      handleConfirm(value){      //点击日历的确定按钮
        var currentTapData=parseInt(value.getFullYear()) + '-' + (parseInt(value.getMonth()) + 1) + '-' + parseInt(value.getDate())
        this.currentTapData=currentTapData;
        this.getData();
      },
      getData () {
          request
            .get(global.url+"contacts/getlines",{"starname": this.startc, "arrayname": this.endc, "startdata": this.currentTapData})
            .end((err,res)=>{
              if(!err){
//                console.log(res.body)
                this.playitems=res.body.data
              }else{
                console.log("111")
              }
            })
      },
      getSeatNum(){
        var arr = this.seatArray;
        request
          .get(global.url+"contacts/seatnumber?token="+global.token,{"id": this.lineid})
          .end((err,res)=>{
            if(!err){
              if(res.body.code=="200"){
                var saledArr = res.body.data;
                for (var i = 0; i < arr.length; i++) {
                  for (var k = 0; k < arr[i].length; k++) {
                    for (var j = 0; j < saledArr.length; j++) {
                      if (saledArr[j] == arr[i][k].value) {
                        arr[i][k].saled = "saled";
                      }
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
      seatShow(event,seatnum,state,lineid){
        this.lineid=lineid;
        if(state=='0'){
          return;
        }
        var seatsnum = seatnum;
        var lastrow = seatsnum > 5 ? 1 : 0;//座位数大于5 就有最后一条
        var firstnum = (seatsnum - 5) % 4;
        var arr = [];
        var arrlast = [];
        var arrfirst = [];
        var newArr = [];
        for (var i = 1; i <= seatsnum; i++) {
          var j = {
            'id': '',
            'value': '',
            'saled': '',
          }
          j.value = i;
          j.id = i
          arr.push(j);
        };
        if (lastrow > 0) {//保证最后一行有值
          arrlast = arr.splice(-5);//splice 会删掉在原来数组中存在的位置
          arrlast.reverse()
          //console.log("最后五个的数组"+arrlast);
          arrfirst = arr.splice(0, firstnum);
          if (arrfirst.length == 1) {
            for (var i = 4; i >= 1; i--) {
              arrfirst.splice(i, 0, {
                'id': '',
                'value': '',
                'saled': '',
              });
            }
          } else if (arrfirst.length == 2) {
            for (var i = 4; i >= 2; i--) {
              arrfirst.splice(i, 0, {
                'id': '',
                'value': '',
                'saled': '',
              });
            }
          } else if (arrfirst.length == 3) {
            arrfirst.splice(2, 0, {
              'id': '',
              'value': '',
              'saled': '',
            });
            arrfirst.splice(3, 0, {
              'id': '',
              'value': '',
              'saled': '',
            });
          }
          arrfirst.reverse()
          //console.log("第一排的数组"+arrfirst);
          newArr = arr;
          //console.log("中间的总数组"+newArr)
          var center = [];//全部的二维数组   //中间的数组每4位一组 分开+第一列+最后一列
          if (firstnum > 0) {
            center.push(arrfirst);
          }
          for (var i = 1; i <= newArr.length / 4; i++) {
            var arri = newArr.slice((i - 1) * 4, i * 4);//slice截取 newArr原数组没有改变 这是跟splice的区别
            arri.splice(2, 0, {
              'id': '',
              'value': '',
              'saled': '',
            });//索引位置 要删除个数 插入的元素
            arri.reverse();//5,6,7,8 渲染到界面的时候要颠倒过来
            //console.log("中间每组的数组"+arri)
            center.push(arri);
          }
          center.push(arrlast);
        }
        var detailwidth = (center.length * 22 + (center.length  * 8)+15+100)*0.05+"rem";
        var seatswidth = (center.length * 22 + (center.length * 8))*0.05+"rem"
        this.seatArray=center;
        this.detailwidth=detailwidth;
        this.seatswidth=seatswidth;
//        console.log(this.seatArray);
        //获取当前元素
        var current=event.currentTarget;
        $(current).parents(".parent").siblings().find(".car_openShow").removeClass("active");//所有的都收起来
        $(current).parents(".parent").siblings().find(".div_prev").removeClass("rotate");
        if($(current).siblings(".car_openShow").hasClass("active")){
          $(current).siblings(".car_openShow").removeClass("active");
          $(current).find(".div_prev").removeClass("rotate");
        }else {
          $(current).siblings(".car_openShow").addClass("active");
          $(current).find(".div_prev").addClass("rotate");
        }
        this.getSeatNum()
      },
      selectSeat(sumSeat,startdata,starttime,price,lineid){
        console.log(global.username)
        if(global.username==""){
          this.$router.push({name:'Login',params:{appointment:'appointment'}});
        }else{
          this.$router.push({name:'Selectseat',params:{sumSeat:sumSeat,startdata:startdata,starttime:starttime,price:price,lineid:lineid}});
        }
      },
      getPrevDay(s){//      获取某一天的前一天
        var y = parseInt(s.split("-")[0]);
        var m = parseInt(s.split("-")[1])-1;
        var d = parseInt(s.split("-")[2])-1;
        var dt = new Date(y, m, d);
        y = dt.getFullYear();
        m = dt.getMonth() + 1;
        d = dt.getDate();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
      },
      getNextDay(s){//      获取某一天的后一天
        var y = parseInt(s.split("-")[0]);
        var m = parseInt(s.split("-")[1])-1;
        var d = parseInt(s.split("-")[2])+1;
        var dt = new Date(y, m, d );
        console.log(dt)
        y = dt.getFullYear();
        m = dt.getMonth() + 1;
        d = dt.getDate();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
      },
      getNextDate(){ //点击next获取下一天
        var s=this.currentTapData;
        this.currentTapData=this.getNextDay(s);
        this.getData();
        console.log( this.currentTapData+"----"+this.currentValueDate)
      },
      getPrevDate(){ //点击prev获取前一天
        var s=this.currentTapData;
        this.currentTapData=this.getPrevDay(s);
        this.getData();
      },
    },
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .cannotSelectSeat{
    background: #e4e5e7;
  }
  .saled{
    background: #dd4c39!important;
  }
  .prevunable{
    background: #949aa6 !important;
  }
  .div_prev,.div_next{
    width:3rem;
    height:3rem;
    position:absolute;
    border-radius:50%;
    color:#fff;
    background:#14293a;
    top:0.55rem;
    text-align: center;
    img{
      width: 1.8rem;
      margin-top: 0.6rem;
    }
  }
  .clickable{
    background: #f05b48;
  }
  .rotate{
    transform: rotate(90deg);
  }
  .div_appointment{
    width: 100%;
    height: 100%;
    *{
      font-size: 1.3rem;
    }
    .div_title{
      width: 100%;
      height:4rem;
      position: relative;
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
    .div_bottom{
      width: 100%;
      .div_city{
        width: 100%;
        height: 5.3rem;
        position: relative;
        text-align: center;
        span{
          display: inline-block;
          line-height:5.3rem;
          width: 40%;
          font-size: 1.6rem;
        }
        img{
          width: 3rem;
          transform: rotate(90deg);
          display: inline-block;
          vertical-align: middle;
        }
      }
      .div_picker{
        width: 85%;
        margin: 0 auto;
        height: 4rem;
        border-radius:5rem;
        border:1px solid #14293a;
        position:relative;
        text-align: center;
        .openTimePicker{
          width: 60%;
          height: 100%;
          margin-left: 8rem;
        }
        .div_prev{
          left: 1.5rem;
          transform: rotate(180deg);
        }
        .div_next{
          right: 1.5rem;
        }
        .calender{
          width: 2rem;
          position: absolute;
          left: 8.5rem;
          top:1rem;
        }
        .year_day{
          position: absolute;
          line-height: 4rem;
          right: 8.5rem;
        }
      }
      .p_desc{
        color: #f05b48;
        text-align: center;
        font-size: 1rem;
        padding: 1rem 0;
      }
      .div_content{
        width: 100%;
        height: 40rem;
        overflow-y: auto;
        .div_play{
          width: 100%;
          height: 8rem;
          border-top:1px solid #d0d1d3;
          position: relative;
          cursor: pointer;
          .time,.center,.right{
            position: absolute;
            height: 100%;
          }
          .time{
            width: 30%;
            left: 0;
            text-align: center;
            .startTime{
              font-size:2.4rem;
              margin:2.1rem 0 0.5rem 0;
              color:#14293a;
            }
          }
          .center{
            width: 50%;
            left: 30%;
            padding-left: 2rem;
            .dolt{
              position:absolute;
              left:0.05rem;
              top:1.4rem;
              border:1px dotted #a4a4a4;
              height:3rem;
            }
              .start,.end{
                margin:0.5rem 0 0 0;
                position:relative;
                color:#14293a;
              }
            .start:after,.end:after{
              content:"";
              width:0.75rem;
              height:0.75rem;
              position:absolute;
              border-radius:50%;
              left:-2.2rem;
              top:0.5rem;
              background:#a4a4a4;
            }
          }
          .right{
            width: 20%;
            right: 0;
            .price{
              color:#14293a;
              font-size: 1.6rem;
              margin-top: 0.8rem;
            }
            .div_prev{
              top:4.5rem;
              left: 2rem;
            }
          }
        }
        .car_openShow{
          width: 100%;
          height: 13.7rem;
          display: none;
          .div_title{
            height: 3.5rem;
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            line-height: 3.5rem;
              .radius{
                position: relative;
                width:7rem;
                text-align:center;
                font-size:1.2rem;
                color:#949aa6;
                &:after{
                  position:absolute;
                  top:1.3rem;
                  left:0.4rem;
                  content:"";
                  width:0.75rem;
                  height:0.75rem;
                  border-radius:50%;
                  border:1px solid #e0e0e0;
                }
              }
              .saledSeat{
                &:after{background: #f05b48}
              }
          }
          .car_detail{
            margin: 0 auto;
            height: 9rem;
            background:#cbd0d4;
            border-radius:2rem;
            position:relative;
            .view_direction{
              width:2.5rem;
              height:2.5rem;
              position:absolute;
              left:1rem;
              bottom:1.1rem;
              transform:rotate(90deg);
            }
            .seats{
              height:7.5rem;
              display:flex;
              flex-wrap:wrap;
              margin-left:5rem;
              padding-top:0.75rem;
              .clum{
                width:1.1rem;
                height:7.5rem;
                margin:0 0.4rem 0 0;
                .clum_item{
                  width:1.1rem;
                  height:1.2rem;
                  border-radius:0.5rem 0 0 0.5rem;
                  border:1px solid #bbb;
                  text-align:center;
                  background:#fff;
                  margin:0.1rem 0 0 0;
                }
                .opac{
                  opacity:0;
                }
              }
            }
          }
        }
        .active{
          display: block;
        }
      }
    }
  }
  .cannotSelectSeat {
    background:#e4e5e7;
  }
  .time_line{
    font-size:1.2rem;
    color:#949aa6;
  }

</style>
