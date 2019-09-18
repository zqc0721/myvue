<template>
  <div id="aDiv-HomePage">
      <content>
        <transition name='fade'>
          <!-- <keep-alive> -->
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
          <!-- </keep-alive> -->
        </transition>
        <transition name='fade'>
          <!-- <keep-alive> -->
            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
          <!-- </keep-alive> -->
        </transition>
      </content>
      <footer>
        <ul>
          <router-link tag='li' v-for='(item,index) in Route' :key='index' :to='item.path'>
            <div>
              <i :class='item.Class'></i>
              <span>{{item.names}}</span>
            </div>
          </router-link>
        </ul>
      </footer>
  </div>
</template>

<script>
import Headers from '../Headers/Headers'
import axios from 'axios'
axios.defaults.withCredentials=true; //让 axios 请求携带 cookie
  export default {
    name:'HomePage',
    data(){
      return{
        Route:[
          {Class:'el-icon-eleme',names:'外卖',path:`/home/?position=${this.$route.query.position}`},
          {Class:'el-icon-discover',names:'搜索',path:'/home/search'},
          {Class:'el-icon-tickets',names:'订单',path:'/home/order'},
          {Class:'el-icon-user',names:'我的',path:'/home/my'},
        ],
        Positions:'',
      }
    },
    methods:{

    },
    mounted(){
      this.Positions=this.$route.query.position
      axios.get(`http://elm.cangdu.org/v2/pois/${this.Positions}`).then((res)=>{
      })
    },
    components:{
      Headers
    }
  }
</script>

<style lang="scss" scoped>
.fade-enter-active , .fade-leave-active{
  transition: all .5s;
}
.fade-enter , .fade-leave-to{
  opacity: 0;
}
#aDiv-HomePage{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  header{
    width: 100%;
    background: #3792e5;
    line-height: calc(74rem / (618/320*20));
    ul{
      display: flex;
      li{
        flex: 1;
        text-align: center;
        color: white;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      li:nth-of-type(2){
        flex: 2;
      }
    }
  }
  content{
    flex: 1;
    background: #f5f5f5;
    overflow: auto;
  }
  footer{
    width: 100%;
    background: white;
    font-size: calc(15rem / (618/320*20));
    ul{
      display: flex;
      li{
        flex: 1;
        text-align: center;
        i{
          font-size: calc(40rem / (618/320*20))
        }
        span{
          display: block;
        }
      }
      li:hover{
          color: #3399ff;
      }
    }
  }
}
</style>
