<template>
    <div class="login_container">
      <div class="div_input div_input_user">
        <span class="span_text">手机号</span>
        <input type="number" placeholder="请输入手机号" maxlength="11"  class="input_userinfo username" v-on:input="inputname">
      </div>
      <div class="div_input div_input_pwd">
        <span class="span_text">验证码</span>
        <input type="number" placeholder="请输入验证码" maxlength="4" class="input_userinfo password" v-on:input="inputpwd">
        <button class="getCode" :class="btnback" :disabled=getCodeClick @click="bindgetCode">{{getcodetext}}</button>
      </div>
      <div class="div_confirm">
        <button class="confirm_login" :class="btnconfirmback"  :disabled=getConfirmClick @click="bindConfirm">确认</button>
        <p>点击确定，即表示已阅读并同意<a href="###">《用户协议》</a></p>
      </div>
    </div>
</template>
<script>
  import $ from 'webpack-zepto'
  import request from 'superagent'
  export default{
    data(){
      return{
        btnback:'',//获取验证码的背景红色
        btnconfirmback: '',//确认按钮的背景红色
        getcodetext:"获取验证码",
        getCodeClick: true,//获取验证码是否可以点击
        getConfirmClick: true,//确认按钮是否可以点击
        username: null,
        password: null,
      }
    },
    created(){
    },
    methods:{
      inputname(){
        if ((/^1[3|4|5|8|7][0-9]\d{8}$/).test($(".username").val())){
          this.getCodeClick=false;
          this.btnback="btnback";
          this.username=$(".username").val()
        }else{
          this.getCodeClick=true;
          this.btnback="";
        }
      },
      inputpwd(){
        if ($(".password").val().length==4){
          this.getConfirmClick=false;
          this.btnconfirmback="btnconfirmback"
          this.password=$(".password").val()
        }else{
          this.getConfirmClick=true;
          this.btnconfirmback="";
        }
      },
      bindgetCode(){
        request
          .post(global.url+"user/getmessage",{"phone": this.username})
          .end((err,res)=>{
            if(!err){
              console.log(res.body)
              var v=res.body.data;
              var t = v.split(",")[0]
              if (t == "03") {
                alert("验证按已发送，请注意查收")
              }
            }else{
              console.log("111")
            }
          })
        var time=60;
          this.getcodetext= time + "s",
          this.getCodeClick= true
          var times=setInterval(()=>{
            this.getcodetext=(time-1) + "s";//es6不区分this
            time--;
          if(time==0){
            clearInterval(times)
              this.getcodetext="重新获取",
              this.getCodeClick= false
          }
        },1000)
      },
      bindConfirm(){
        request
          .post(global.url+"user/register",{"yzm": this.password,"phone":this.username,"carid":"1"})
          .end((err,res)=>{
            if(!err){//调取接口成功
              console.log(res.body)
              var registertoken = res.body.token;//token
              if (res.body.code != '500'){
               alert(res.body.message)
              }else{
                 this.registerToken= registertoken
              }
              if(registertoken != null){
                request
                  .post(global.url+"user/login",{"yzm": this.password,"phone":this.username,"carid":"1"})
                  .end((err,res)=>{
                    if(!err){//接口调取成功
                      console.log(res.body)
                      var token = res.body.token;//token
                      this.token=token;
                      if(token!=null){
                        global.token=token;
                        global.username=this.username;
                        localStorage.setItem("token",token)//放到本地存储
                        localStorage.setItem("username",username)
                        if(this.$route.params.appointment=="appointment"){
                          this.$router.push({name:'Appointment'});
                        }else{
                          this.$router.push({name:'Appointment'});//跳转到地图页
                        }
                      }
                    }else {//接口调取失败
                    }
                  })
              }
        }else{//调取接口失败
              console.log("调取接口失败")
            }
          })
      }

    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .login_container{
  .btnback,.btnconfirmback{
    background: #dd4c39;
  }
    .div_input{
      width: 95%;
      margin: 0 auto;
      margin-top:2rem;
      margin-bottom: 1rem;
      display:flex;
      justify-content:center;
      .span_text{
        display: inline-block;
        height:4.5rem;
        line-height:4.5rem;
        width:20%;
        background-color:#f2f2f2;
        text-align:center;
        font-size:15px;
        z-index:100;
      }
      .input_userinfo{
        width: 80%;
        height: 4.5rem;
        background-color:#f2f2f2;
        border: none;
        display: inline-block;
        text-indent: 20px;
        font-size: 15px;
      }
      .password{
        width: 45%;
        margin-right: 5%;
      }
      .getCode{
        width:30%;
        border: none;
        -webkit-appearance:none ;
        height: 4.5rem;
        line-height:4.5rem;
        border-radius: 5px;
        color: #fff;
        font-size: 15px;
      }
    }
    .div_confirm{
      margin-top:6rem;
      display:flex;
      justify-content:center;
      flex-wrap:wrap;
        .confirm_login{
          width:95%;
          height:4.5rem;
          color:#fff;
          font-size:16px;
          line-height:4.5rem;
          border: none;
          border-radius: 5px;
        }
      p{
        margin-top: 10px;
        a{
          color: #dd4c39;
        }
      }
    }
  }
</style>
