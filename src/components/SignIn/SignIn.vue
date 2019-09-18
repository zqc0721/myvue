<template>
  <div class="SignIn_aDiv">
    <Headers :FlagStatea=false :FlagStateb=false :FlagStatec=false :FlagStated=true></Headers>
    <content>
      <div class="Signin_aDiv-Content">
        <p><input type="text" placeholder="账号" v-model="Phone"></p>
        <p><input :type="value?'text':'password'" placeholder="密码" v-model="Pswd">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </p>
        <p>
          <input type="text" placeholder="验证码" v-model="Random">
          <span>
            <b><img :src=Code alt=""></b>
            <ul>
              <li @click="ReplaceRandom()">看不清</li>
              <li @click="ReplaceRandom()">换一张</li>
            </ul>
          </span>
          </p>
      </div>
      <p>温馨提示：未注册过的账号，登录时将自动注册</p>
      <p>注册过的用户可凭账号密码登录</p>
      <p><input type="button" value="登录" @click="SigninRouter()"/></p>
      <p><span>重置密码?</span></p>
    </content>
  </div>
</template>

<script>
import Headers from '../Headers/Headers'
import axios from 'axios'
import Vue from 'vue';
import { Dialog } from 'vant';
Vue.use(Dialog);
axios.defaults.withCredentials=true; //让 axios 请求携带 cookie
export default {
  name:'SignIn',
  data(){
    return{
      value: false,
      Code:'',
      captcha_code:'',
      Phone:'',
      Pswd:'',
      Random:''
    }
  },
  methods:{
    //点击登录
    SigninRouter(){
      axios.post(`http://elm.cangdu.org/v2/login`,{captcha_code:this.Random,password:this.Pswd,username:this.Phone}).then((res)=>{
        console.log(res)
        if(res.data.id){
          localStorage.setItem('Code',res.data.id)
          this.$router.go(-1)
        }else{
          this.GenerateRandom()
          Dialog.alert({
            message: res.data.message
          }).then(() => {
            // on close
          });
        }
      })
    },
    //重置验证码
    ReplaceRandom(){
      this.GenerateRandom()
    },
    //生成验证码
    GenerateRandom(){
      axios.post(`http://elm.cangdu.org/v1/captchas`).then((res)=>{
        console.log(res)
        this.Code=res.data.code
      })
    }
  },
  mounted(){
    this.GenerateRandom()
  },
  components:{
    Headers
  }
}
</script>

<style lang='scss'>
.SignIn_aDiv{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  content{
    width: 100%;
    background: #f5f5f5;
    font-size:calc(20rem / (618/320*20));
    flex:1;
    >p{
      font-size: calc(15rem / (618/320*20));
      color: red;
      line-height: calc(40rem / (618/320*20));
      padding: calc(10rem / (618/320*20)) calc(20rem / (618/320*20));
      >input{
        width: 100%;
        height: calc(60rem / (618/320*20));
        background: #4cd964;
        color: white;
        border: none;
        outline:none;
        border-radius: 5px;
      }
      >span{
        float: right;
        color: #3b95e9;
      }
    }
    .Signin_aDiv-Content{
      background: white;
      padding: calc(10rem / (618/320*20)) calc(20rem / (618/320*20));
      margin-top: calc(20rem / (618/320*20));
      >p{
        width: 100%;
        >input{
          width: 100%;
          line-height: calc(50rem / (618/320*20));
          border: none;
          outline:none;
        }
        >span{
          width: 40%;
          font-size: calc(20rem / (618/320*20));
          float: right;
          display: flex;
          >ul{
            li:nth-of-type(1){
              color: #666;
            }
            li:nth-of-type(2){
              color: #3b95e9;
            }
          }
        }
      }
      p:nth-of-type(2){
        input{
          width: 80%;
        }
      }
      p:nth-of-type(3){
        input{
          width: 50%;
        }
      }
    }
  }
}
</style>
