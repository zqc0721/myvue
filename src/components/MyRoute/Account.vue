<template>
  <div class="Accout_aDiv">
    <Headers :AccountHd=true></Headers>
    <content>
      <ul>
        <li>
          <input type="file" @change="ObtainRoute($event)" ref="InputFile">
          <span>头像</span>
          <span><img :src="UserImg"></span>
          <i class="el-icon-arrow-right"></i>
        </li>
        <li @click="RouteModify()"><span>用户名</span>{{UserNmaes}}<i class="el-icon-arrow-right"></i></li>
        <router-link tag='li' to='/goodsposition'><span>收货地址</span><i class="el-icon-arrow-right"></i></router-link>
      </ul>
      <p><span>账号绑定</span></p>
      <ul>
        <li><i style="padding-top: 0.5rem; color: #3399ff; padding-right: 0.1rem;" class="el-icon-mobile-phone" ></i><span>手机</span><i class="el-icon-arrow-right"></i></li>
      </ul>
      <p><span>安全设置</span></p>
      <ul>
        <li @click="ModifyPswd()"><span>密码登录</span>修改<i class="el-icon-arrow-right"></i></li>
      </ul>
      <p><input type="button" value="退出登录" @click="ClickSignOut()"></p>
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
  name:'Account',
  data(){
    return{
      UserImg:'',
      UserNmaes:''
    }
  },
  methods:{
    //修改头像
    ObtainRoute(res){
      // console.log(res)
      let Input=this.$refs.InputFile
      console.log(Input.files[0])
      //formData 数据类型来保存文件
      let Data=new FormData();
      Data.append('file',Input.files[0])
      // //修改请求头
      let headers={headers:{'Content-Type':'multipart/from-Data'}}
      axios.post(`http://elm.cangdu.org/eus/v1/users/${this.UserCode}/avatar`,Data,headers).then((req)=>{
        console.log(req)
        axios.get(`http://elm.cangdu.org/img/${req.data.image_path}`).then((res)=>{
          this.UserImg=res.config.url
        })
      })
    },
    //点击跳转修改用户名
    RouteModify(){
      this.$router.push('/modifyusername')
    },
    //点击跳转修改密码
    ModifyPswd(){
      this.$router.push('/modifypswd')
    },
    //点击退出登录
    ClickSignOut(){
      Dialog.confirm({
        message: '是否退出登录'
      }).then(() => {
        localStorage.removeItem('Code')
        this.$router.go(-1)
      }).catch(() => {
        return
      });
    }
  },
  mounted(){
    axios.get(`http://elm.cangdu.org/v1/user?user_id=${this.UserCode}`).then((res=>{
        this.UserNmaes=res.data.username
        // console.log(res.data.avatar)
        this.UserImg=res.data.avatar
        axios.get(`http://elm.cangdu.org/img/${this.UserImg}`).then((res)=>{
          this.UserImg=res.config.url
        })
    }))
    if(localStorage.getItem('Code')){
      var Code=JSON.parse(localStorage.getItem('Code'))
      this.UserCode=Code
      console.log(Code)
    }
  },
  components:{
    Headers
  }
}
</script>

<style lang='scss'>
.Accout_aDiv{
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  content{
    font-size: calc(25rem / (618/320*20));
    flex: 1;
    background: #f5f5f5;
    >p{
      line-height: calc(70rem / (618/320*20));
      display: flex;
      span{
        flex: 1;
      }
      i{
        padding-top: calc(23rem / (618/320*20));
      }
      >input{
        margin-top:calc(50rem / (618/320*20));
        width: 100%;
        border: none;
        border-radius: 5px;
        background: #d8584a;
        color: white;
        line-height: calc(60rem / (618/320*20));
      }
    }
    ul{
      background: white;
      >li{
        padding: calc(0rem / (618/320*20)) calc(25rem / (618/320*20));
        display: flex;
        border-top:1px solid #ddd;
        border-bottom:1px solid #ddd;
        line-height: calc(70rem / (618/320*20));
        >span:nth-of-type(1){
          flex: 1;
        }
        >i{
          padding-top: calc(23rem / (618/320*20));
        }
      }
    }
    >ul:nth-of-type(1){
      >li:nth-of-type(1){
        margin-top: calc(20rem / (618/320*20));
        display:flex;
        position: relative;
        >input{
          width: 92%;
          outline: none;
          height: 100%;
          position: absolute;
          opacity: 0;
        }
        >span:nth-of-type(1){
          line-height: calc(100rem / (618/320*20));
        }
        >span:nth-of-type(2){
          width: calc(50rem / (618/320*20));
          height: calc(50rem / (618/320*20));
          border-radius: 50%;
          overflow: hidden;
          margin-top: calc(25rem / (618/320*20));
          float: right;
          >img{
            width: 100%;
            height: 100%;
          }
        }
        >i{
          padding-top: calc(37rem / (618/320*20));
        }
      }
    }
    >p{
      padding: calc(0rem / (618/320*20)) calc(25rem / (618/320*20));
    }
  }
}
</style>
