<template>
  <div id="aDiv-My">
    <div v-show=FlagCover>
      <span><i class="el-icon-loading"></i>
        <p>正在加载数据...</p>
      </span>
    </div>
    <Headers :FlagMy=true></Headers>
    <content>
      <div class="My_aDiv-Content">
        <router-link tag='div' to='/account' v-if=FlagSignin>
          <span><img :src=UserImg ></span>
          <div>
            <p>{{UserNmaes}}</p>
            <p><i class="el-icon-mobile-phone"></i>暂无绑定手机号</p>
          </div>
          <span><i class="el-icon-arrow-right"></i></span>
        </router-link>
        <router-link tag='div' to='/signin' v-if=!FlagSignin>
          <span><img :src=UserImg ></span>
          <div>
            <p>
              登录|注册
            </p>
            <p><i class="el-icon-mobile-phone"></i>暂无绑定手机号</p>
          </div>
          <span><i class="el-icon-arrow-right"></i></span>
        </router-link>
      </div>
      <div class="My_bDiv-Content">
        <ul>
          <li>
            <b style="color: #f90">0.00</b>元
            <span>我的余额</span>
          </li>
          <li>
            <b style="color: #ff5f3e">3</b>个
            <span>我的优惠</span>
          </li>
          <li>
            <b style="color: #6ac20b">0</b>分
            <span>我的积分</span>
          </li>
        </ul>
      </div>
      <div class="My_cDiv-Content">
        <ul>
          <li v-for="(item,index) in List" :key="index">
            <i :class=item.iClass></i>{{item.names}}<span><i class="el-icon-arrow-right"></i></span>
          </li>
        </ul>
      </div>
      <div class="My_dDiv-Content">
        <ul>
          <li v-for='(i,index) in Arr' :key="index">
            <i :class=i.iClass style="color:rgb(74, 165, 240);"></i>{{i.names}}<span><i class="el-icon-arrow-right"></i></span>
          </li>
        </ul>
      </div>
    </content>
  </div>
</template>

<script>
import Headers from '../Headers/Headers'
import axios from 'axios'
axios.defaults.withCredentials=true; //让 axios 请求携带 cookie
export default {
  name:'My',
  data(){
    return{
      UserNmaes:'',
      UserCode:'',
      List:[
        {iClass:'el-icon-finished',names:'我的订单',path:'/myorder'},
        {iClass:'el-icon-shopping-bag-2',names:'积分商城',path:'/integral'},
        {iClass:'el-icon-potato-strips',names:'饿了吗会员卡',path:'/membership'},
      ],
      Arr:[
        {iClass:'el-icon-platform-eleme',names:'服务中心',path:'/service'},
        {iClass:'el-icon-s-goods',names:'下载饿了吗APP',path:'/download'},
      ],
      UserImg:'',
      FlagSignin:true,
      FlagCover:true,
      LoadMore:'点击加载更多',
      UserImg:''
    }
  },
  methods:{
    UserPhone(){
      axios.get(`http://elm.cangdu.org/v1/user?user_id=${this.UserCode}`).then((res=>{
        this.UserNmaes=res.data.username
        this.UserImg=res.data.avatar
        console.log(res)
      }))
    }
  },
  mounted(){

    this.UserPhone()
    if(localStorage.getItem('Code')){
      var Code=JSON.parse(localStorage.getItem('Code'))
      this.UserCode=Code
      this.FlagSignin=true
    }else{
      this.FlagSignin=false
    }
    //http://elm.cangdu.org/img/16cd6d9403a52102.jpg
    axios.get(`http://elm.cangdu.org/v1/user?user_id=${this.UserCode}`).then((res=>{
        this.UserNmaes=res.data.username
        this.UserImg=res.data.avatar
        axios.get(`http://elm.cangdu.org/img/${this.UserImg}`).then((res)=>{
          this.UserImg=res.config.url
          this.FlagCover=false
        })
    }))
  },
  components:{
    Headers
  }
}
</script>

<style lang='scss'>
#aDiv-My{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  >div:nth-of-type(1){
    width: 100%;
    height: 100%;
    position: fixed;
    background: #ffffff99;
    color: black;
    display: flex;
    top: 0rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    i{
      font-size: calc(70rem / (618/320*20));
      margin-bottom: calc(30rem / (618/320*20))
    }
  }
  content{
    flex: 1;
    overflow: auto;
    .My_aDiv-Content{
      background: #3190e8;
      color: #fff;
      padding: calc(26rem / (618/320*20)) calc(25rem / (618/320*20));
      >div{
        display: flex;
        >span:nth-of-type(1){
          width: calc(100rem / (618/320*20));
          height: calc(100rem / (618/320*20));
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        >div{
          flex: 1;
          padding: calc(15rem / (618/320*20)) calc(15rem / (618/320*20));
          >p:nth-of-type(1){
            font-weight: bold;
            font-size: calc(35rem / (618/320*20));
          }
          >p:nth-of-type(2){
            font-size: calc(15rem / (618/320*20))
          }
        }
        span:nth-of-type(2){
          padding: calc(30rem / (618/320*20)) 0rem;
        }
      }
    }
    .My_bDiv-Content{
      background: white;
      >ul{
        width: 100%;
        display: flex;
        >li{
          flex: 1;
          padding: calc(15rem / (618/320*20)) calc(15rem / (618/320*20));
          text-align: center;
          font-size: calc(15rem / (618/320*20));
          b{
            font-size: calc(55rem / (618/320*20));
          }
          span{
            display: block;
          }
        }
        >li:nth-of-type(2){
          border-left: 1px solid #f1f1f1;
          border-right: 1px solid #f1f1f1;
        }
      }
    }
    .My_cDiv-Content{
      background: #fff;
      >ul{
        width: 100%;
        margin-top: calc(20rem / (618/320*20));
        >li{
          padding: calc(20rem / (618/320*20)) calc(25rem / (618/320*20));
          font-size: calc(25rem / (618/320*20));
          >i{
            padding-right: calc(15rem / (618/320*20));
          }
          span{
            float: right;
          }
        }
        >li:nth-of-type(2){
          >i{
            color: rgb(252, 123, 83);
          }
          border-top: 1px solid #f1f1f1;
          border-bottom: 1px solid #f1f1f1;
        }
        >li:nth-of-type(3){
          >i{
            color: rgb(255, 198, 54);
          }
        }
      }
    }
    .My_dDiv-Content{
      background: #fff;
      >ul{
        width: 100%;
        margin-top: calc(20rem / (618/320*20));
        >li{
          padding: calc(20rem / (618/320*20)) calc(25rem / (618/320*20));
          font-size: calc(25rem / (618/320*20));
          >i{
            padding-right: calc(15rem / (618/320*20));
          }
          span{
            float: right;
          }
        }
        >li:nth-of-type(2){
          border-top: 1px solid #f1f1f1;
          border-bottom: 1px solid #f1f1f1;
        }
      }
    }
  }
}
</style>
