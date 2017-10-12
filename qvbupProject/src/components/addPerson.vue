<template>
    <div class="div_addPerson">
      <div class="div_baseinfo">
        <div class="div_text">基本信息</div>
        <div class="finish" @click="finish">
          <img src="../assets/images/row.png">
        </div>
      </div>
      <div class="div_person">
          <div class="name">
              <div class="editicon">
                  <img src="../assets/images/icon_compile.png" :class="[appearnameedit]">
              </div>
            <div class="editicon">
              <img src="../assets/images/right.png" :class="[appearnameok]">
            </div>
              <div class="name_first">
                姓名
              </div>
              <input type="text" v-model="name" v-on:input="inputname" class="name_second">
          </div>
        <div class="idCard">
          <div class="editicon">
            <img src="../assets/images/icon_compile.png"   :class="[appearcardedit]">
          </div>
          <div class="editicon">
            <img src="../assets/images/right.png" :class="[appearcardok]">
          </div>
          <div class="idCard_first">
            身份证号
          </div>
          <input type="text" :value="idCard" v-on:input="inputcard" class="idCard_second">
        </div>
        <div class="phone">
          <div class="editicon">
            <img src="../assets/images/icon_compile.png"   :class="[appearphoneedit]">
          </div>
          <div class="editicon">
            <img src="../assets/images/right.png" :class="[appearphoneok]">
          </div>
          <div class="phone_first">
            手机号
          </div>
          <input type="text" :value="phone" v-on:input="inputphone" class="phone_second">
        </div>
      </div>
    </div>
</template>
<script>
  import $ from 'webpack-zepto'
  import request from 'superagent'
  import { Toast } from 'mint-ui';
  export default{
    data (){
      return{
        name:'',
        idCard:'',
        phone:'',
        id:'',
        appearphoneedit:'',
        appearcardedit:'',
        appearnameedit:'',
        appearphoneok:'',
        appearcardok:'',
        appearnameok:''
      }
    },
    created(){
    this.getParams();
    },
    methods:{
      getParams(){
        if(this.$route.params.id=='null'){
          this.name='';
          this.idCard='';
          this.phone="";
          this.id="";
          this.appearphoneedit='';
          this.appearcardedit='';
          this.appearnameedit='';
          this.appearphoneok='appearphoneok';//ok完成状态消失
          this.appearcardok='appearcardok';
          this.appearnameok='appearnameok'

        }else{
          this.name=this.$route.params.username;
          this.idCard=this.$route.params.idCard;
          this.phone=this.$route.params.phone;
          this.id=this.$route.params.id;
          this.appearphoneedit='appearphoneedit';//edit编辑状态消失
          this.appearcardedit='appearcardedit';
          this.appearnameedit='appearnameedit';
          this.appearphoneok='';
          this.appearcardok='';
          this.appearnameok=''
        }
      },
      inputname(){
        var currentval=event.target;
        if ((/^[\u4E00-\u9FA5]{2,10}$/).test($(currentval).val())){
            this.appearnameok= "";
            this.appearnameedit= "appearnameedit";
            this.name=$(currentval).val();
        }else{
          this.appearnameok= "appearnameok";
          this.appearnameedit= "";
        }
      },
      inputcard(){
        var currentval=event.target;
        if ((/[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)/).test($(currentval).val())) {
          this.appearcardok= "";
          this.appearcardedit= "appearcardedit";
          this.idCard=$(currentval).val();
        }else{
          this.appearcardok= "appearcardok";
          this.appearcardedit="";
        }
      },
      inputphone(){
        var currentval=event.target;
        if ((/^1[34578]\d{9}$/).test($(currentval).val())) {
          this.appearphoneok= "";
          this.appearphoneedit= "appearphoneedit";
          this.phone=$(currentval).val();
        }else{
          this.appearphoneok= "appearphoneok";
          this.appearphoneedit= "";
        }
      },
      finish(){
        //会调取后台保存的一个接口
        if(this.id){//编辑进来的
          request
            .post(global.url+ 'contacts/editcontacts?token='+global.token,{username:this.name,carid:this.idCard,phone:this.phone,type:"1",id:this.id})
            //          .query({token:global.token,username:this.name,carid:this.idCard,phone:this.phone,type:"1",id:this.id})//query是 &token=&username&...但是不安全 url可见 上面的写法post不可见参数
            .end((err,res)=>{
            if(!err){
            console.log(res.body)
            if(res.body.code=="200"){
              console.log(this.name+"--"+this.idCard+"--"+this.phone);
              this.$router.go(-1);
            }else{
              Toast({
                message: res.body.message,
                position:'bottom',
                duration: 1500
              });
            }
          }else {
            console.log("保存联系人接口报错")
          }
        })
        }else {//添加乘客进来的
          request
            .post(global.url+ 'contacts/addcontacts')
            .query({token:global.token,username:this.name,carno:this.idCard,phone:this.phone,type:"1"})//query是 &token=&username&...但是不安全 url可见 上面的写法post不可见参数
            .end((err,res)=>{
            if(!err){
            console.log(res.body)
            if(res.body.code=="200"){
              console.log(this.name+"--"+this.idCard+"--"+this.phone);
              this.$router.go(-1);
            }else{
              Toast({
                message: res.body.message,
                position:'bottom',
                duration: 1500
              });
            }
          }else {
            console.log("保存联系人接口报错")
          }
        })
        }

      },
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .div_addPerson{
    font-size: 1.6rem;
    width: 100%;
    height: 100vh;
    background:#f0f0f0;
  }
  .div_baseinfo{
    width:100%;
    background:#f0f0f0;
    height:4.5rem;
    line-height:4.5rem;
    .div_text{
      margin-left: 5%;
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
  .div_person{
    width:100%;
    height:12.7rem;
    background-color:#fff;
  }
  .name, .idCard, .phone {
    width: 80%;
    height:4.2rem;
    line-height:4.2rem;
    margin:0 3.75rem;
    border-bottom:1px solid #eee;
    display:flex;
    flex-wrap:nowrap;
    position:relative;
    .editicon {
      width:2rem;
      height:2rem;
      position:absolute;
      left:-2.75rem;
      top:0.85rem;
      text-align:center;
      line-height:2rem;
      .appearphoneedit,.appearcardedit,.appearnameedit ,.appearphoneok, .appearcardok, .appearnameok{
        display: none;
      }
      img{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
      }
    }
    .phone_first, .name_first, .idCard_first {
     width:30%;
    }
    .name_second, .idCard_second, .phone_second {
      height:4.2rem;
      line-height:4.2rem;
      width:70%;
      border:none;
      font-size: 1.6rem;
    }
  }

</style>
