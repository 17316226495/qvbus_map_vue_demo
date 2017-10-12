/images/icon_compile.png<template>
    <div class="div_passenger">
      <div class="person">
      <div class="div_top">第一次乘车请添加乘车人信息</div>
        <div class="finish" @click="finish">
          <img src="../assets/images/row.png">
        </div>
      </div>
      <div class="div_group">
        <template v-for="personItem in personInfo">
        <div class="group" v-longTap :data-id="personItem.id">
        <div class="div_personGroup">
          <div @click="selectPerson()">
            <img src="../assets/images/icon_unselected.png" class="radio" :data-id="personItem.id">
          </div>
          <div>{{personItem.username}}</div>
          <div>{{personItem.carid}}</div>
          <router-link :to="{name:'AddPerson',params:{id:personItem.id,idCard:personItem.carid,phone:personItem.phone,username:personItem.username}}">
          <div>
            <img src="../assets/images/icon_compile.png" class="write">
          </div>
          </router-link>
        </div>
        </div>
        </template>
      </div>
      <!--params:{id:''} 不能传‘’空 至少要传个值-->
      <router-link :to="{name:'AddPerson',params:{id:'null',idCard:'null',phone:'null',username:'null'}}">
      <div class="add_icon">
        <img src="../assets/images/add.png">
      </div>
      </router-link>
     </div>

</template>
<script>
  import $ from 'webpack-zepto'
  import request from 'superagent'
  import { Toast } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default{
    data(){
      return{
        ids:'',
        price:"",
        lineid:"",
        selectedPersonid:[],
        personInfo:[],
      }
    },
    created(){
    this.getParams();
    this.getPersonInfo()
    },
    directives:{//自定义指令
      longTap(el,binging){//长按指令
        var oDiv = el,
          z = 0,
          timer = null;
        oDiv.addEventListener("touchstart", function(e) {
          if (e.touches.length > 1) {
            return false;
          }
          z = 0;
          timer = setTimeout(function() {//大于0.5秒就代表长按
            z = 1;
          }, 500);
//          e.preventDefault();//阻止冒泡之后，小笔的编辑状态就点无法点击
        });
        document.addEventListener("touchmove", function(e) {
            clearTimeout(timer);
        });
        document.addEventListener("touchend", function(ev) {
          if (z != 1) {
            clearTimeout(timer);
            return false;
          } else {//z=1的时候就代表长按了
            z = 0;
            MessageBox.confirm('是否删除该用户').then(() => {
              //调取后台接口 传要删除的id 重新赋值
             var id=el.getAttribute("data-id")
              console.log(binging)
              request
                .post(global.url+"contacts/deletecontacts?token="+global.token)
                .send({
                  id:id
                })
                .end((err,res)=>{
                  if(!err){
                    if(res.body.code=="200"){
                      Toast({
                        message: res.body.data,
                        position:'bottom',
                        duration: 1500
                      });
//                      this.getPersonInfo()//没法使用this 无上下文
                    }
                  }
                })
            });
          }
        });
      }
    },
    methods:{
      getParams(){
        this.ids=this.$route.params.ids.split(",");//用，转化成数组
        this.price=this.$route.params.price;
        this.lineid=this.$route.params.lineid;
      },
      getPersonInfo(){//获取乘客信息
        request
          .get(global.url + 'contacts/getcontacts',{"username":"","token":global.token})
          .end((err,res)=>{
            if(!err){
              if(res.body.code=="200"){
                this.personInfo=res.body.data
              }
            }else{
              console.log("获取联系人接口报错")
            }
          })
      },
      selectPerson(){
        console.log(event)
        var childnode=$(event.currentTarget).find("img");
        if(childnode.attr("src")==require("../assets/images/icon_unselected.png")){
          childnode.attr('src',require("../assets/images/icon_selected.png"));//使用require vue里面使用的是base64位的格式
        }else{
          childnode.attr('src',require("../assets/images/icon_unselected.png"));//使用require vue里面使用的是base64位的格式
        }
      },
      selectedPersonId(){//查找所有被选中的id 放到一个数组里面
        var selectedArr=$(".radio");
        var selectPersonarr=[];
        for (var i=0;i<selectedArr.length;i++){
          if(selectedArr.eq(i).attr("src")==require("../assets/images/icon_selected.png")){
            selectPersonarr.push(selectedArr.eq(i).attr("data-id")+":"+this.ids[i])
          }
        }
        this.selectedPersonid=selectPersonarr;
      },
      finish(){
        this.selectedPersonId();
        var ids=this.ids;
        var select=this.selectedPersonid;
        if(ids.length!=select.length){
          Toast({
            message: ("请选择"+ids.length+"个乘客！"),
            position:'bottom',
            duration: 1500
          });
        }else if(ids.length==0){
          Toast({
            message: "请选择乘客人！",
            position:'bottom',
            duration: 1500
          });
        }else{
          var amount=ids.length*this.price;
          this.$router.push({name:'ScanResult',params:{amount:amount,producelineid:this.lineid,contratid:this.selectedPersonid+""}});
        }

      },
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .div_passenger{
    width: 100%;
    height: 100vh;
    background: #f2f2f2;
    font-size: 1.6rem;
    .finish,.add_icon{
      height:3rem;
      width:3rem;
      line-height:3rem;
      text-align:center;
      color:#fff;
      border-radius:50%;
      background:#f15a48;
    }
    .finish{
      position:absolute;
      right:1.5rem;
      top:0.65rem;
      img{
        width:1.8rem;
        height:1.8rem;
        margin:0 auto;
        display:flex;
        margin-top:0.6rem;
      }
    }
    .add_icon{
    margin-left:5%;
    margin-top:1.3rem;
      img{
        width:1.8rem;
        height:1.8rem;
       margin-top: 0.6rem;
      }
     }
    .person{
      z-index:100;
      position:fixed;
      width:100%;
      background:#f0f0f0;
      height:4.5rem;
      line-height:4.5rem;
      .div_top{
        width: 80%;
        margin:0.5rem 0 0.5rem 5%;
        border:1px solid #d0d1d3;
        height:3.2rem;
        line-height:3.2rem;
        font-size:1.5rem;
        text-indent:1.5rem;
        color:#14293a;
      }
    }
    .div_group{
      padding-top: 5.5rem;
    }
    .group{
      width: 100%;
      height: auto;
      border-bottom:1px solid #d0d1d3;
      background: #fff;
    }
    .div_personGroup{
      width: 90%;
      height:4rem;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      margin: 0 auto;
      div{
        line-height: 4rem;
        min-width: 3.2rem;
        text-align: center;
      }
      .radio{
        width: 1.5rem;
      }
      .write{
        width: 2.1rem;
      }
    }
  }
</style>
