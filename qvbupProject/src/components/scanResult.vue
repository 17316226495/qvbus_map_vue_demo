<template>
    <div class="div_pay">
      <div class="div_top">
        <p class="p_line"></p>
        <p class="p_text">本次行程消费</p>
        <p class="p_line"></p>
      </div>
      <div class="div_money">
        {{money}}<span>元</span>
      </div>
      <div class="div_attention">
        确认支付前请认真核对<span>乘车号</span>
      </div>
      <div class="div_confirmPay" @click="confirmPay">确认支付</div>
    </div>
</template>
<script>
  import request from 'superagent'
  import { Toast } from 'mint-ui';
export default{
  data (){
    return{
      money:'',
      producelineid:'',
      contratid:''
    }
  },
  created (){
  this.getParams()
  },
  methods:{//方法的集合
    getParams(){
      console.log(this.$route.params)
      this.money=this.$route.params.amount
      this.producelineid=this.$route.params.producelineid;
      this.contratid=this.$route.params.contratid;
    },
    confirmPay () {//调取后台接口 成功才跳转到下一个页面
      request
        .post(global.url+"contacts/savecontacts?token="+global.token,{producelineid:this.producelineid,contratid:this.contratid})
        .end((err,res)=>{
        if(!err){
        if(res.body.code=="200"){
          this.$router.push({name:'OrderDetail',params:{parentid:res.body.parentid}});
        }else{
          Toast({
            message: res.body.message,
            position:'bottom',
            duration: 1500
          });
        }
      }else{
        console.log("支付确认按钮调取的接口错误")
      }
    })
    }
  }
}
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .div_top{
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    .p_line{
      width: 10rem;
      margin-top:4.5rem;
      border-bottom:1px solid #eee;
    }
    .p_text{
      margin-top:5.4rem;
      color:#a3a3a3;
      font-size:1.5rem;
      margin-left:1.25rem;
      margin-right:1.25rem;
      position:relative;
      top:0.75rem;
    }
  }
  .div_money{
    margin-top:10.4rem;
    text-align:center;
    font-size:7rem;
    color:#14293a;
    span{
      font-size: 1.8rem;
    }
  }
  .div_attention{
    text-align:center;
    font-size:1.2rem;
    color:#a3a3a3;
    margin-top:5rem;
    span{
      color: #f05b48;
    }
  }
  .div_confirmPay{
    width:95%;
    background-color:#f05b48;
    height:4.5rem;
    text-align:center;
    line-height:4.5rem;
    margin:0 1rem;
    margin-top:1.5rem;
    color:#14293a;
    font-size: 1.8rem;
  }
</style>
