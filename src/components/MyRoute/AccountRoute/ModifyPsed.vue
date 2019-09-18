<template>
  <div class="ModiftPsed_aDiv">
    <Headers :ModifyPswd=true></Headers>
    <content>
      <ul>
        <li><input type='text' v-model='UserName' placeholder='账号'/></li>
        <li><input type='text' v-model='OldPswd' placeholder='旧密码'/></li>
        <li><input type='text' v-model='NewPswd' placeholder='请输入新密码'/></li>
        <li><input type='text' v-model='ConfirmPswd' placeholder='请确认密码'/></li>
        <li>
          <input type='text' v-model='Code_NewCode' placeholder='验证码'/>
          <span>
            <span><img :src=CodeImg></span>
            <span @click="ChangeImg()">
              <p>看不清</p>
              <p>换一张</p>
            </span>
          </span>
        </li>
      </ul>
      <p><input type="button" value="确认修改" @click="Submission()"/></p>
    </content>
  </div>
</template>

<script>
import Headers from '../../Headers/Headers'
import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
axios.defaults.withCredentials=true; //让 axios 请求携带 cookie
export default {
  name:'ModifyPswd',
  data(){
    return{
      CodeImg:'',
      UserName:'',
      OldPswd:'',
      NewPswd:'',
      ConfirmPswd:'',
      Code_NewCode:'',
      AlertTipe:''
    }
  },
  methods:{
    ChangeImg(){
      axios.post(`http://elm.cangdu.org/v1/captchas`).then((res)=>{
        this.CodeImg=res.data.code
      })
    },
    //提交
    Submission(){
      console.log(this.UserName,this.OldPswd,this.NewPswd,this.ConfirmPswd)
      axios.post(`http://elm.cangdu.org/v2/changepassword`,{
          captcha_code:this.Code_NewCode,
          confirmpassword:this.ConfirmPswd,
          newpassword:this.NewPswd,
          oldpassWord:this.OldPswd,
          username:this.UserName,
        }).then((res)=>{
          console.log(res)
          if(!res.data.success){
            Toast.fail(res.data.message);
          }else{
            Toast.success(res.data.success);
            this.$router.push('/account')
          }
        })
    }
    //http://elm.cangdu.org/v2/changepassword
  },
  mounted(){
    this.ChangeImg()
  },
  components:{
    Headers
  }
}
</script>

<style lang='scss'>
.ModiftPsed_aDiv{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  content{
    flex: 1;
    background: #f5f5f5;
    font-size: calc(25rem / (618/320*20));
    >p{
      padding: calc(15rem / (618/320*20)) calc(25rem / (618/320*20));
      margin-top: calc(25rem / (618/320*20));
      input{
        width: 100%;
        border: none;
        height: calc(55rem / (618/320*20));
        background: #4cd964;
        color: white;
        border-radius: 5px;
        outline: none;
      }
    }
    >ul{
      background: white;
      margin-top: calc(20rem / (618/320*20));
      li{
        padding: calc(15rem / (618/320*20)) calc(25rem / (618/320*20));
        display: flex;
        input{
          width: 100%;
          height: calc(45rem / (618/320*20));
          border: none;
          outline: none;
        }
        >span{
          width: 50%;
          font-size: calc(25rem / (618/320*20));
          text-align: center;
          display: flex;
          span:nth-of-type(2){
            float: right;
            text-align: center;
            p:nth-of-type(2){
              color: #3399ff;
            }
          }
        }
      }
      li:nth-of-type(5){
        input{
          width: 50%;
        }
      }
    }
  }
}
</style>
