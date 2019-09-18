<template>
  <header>
    <ul v-if=FlagStateb>
      <li>ele.em</li>
      <li></li>
      <router-link v-show=this.$store.state.name tag='li' to='/home/my'>
        <i class="el-icon-user"></i>
      </router-link>
      <router-link tag='li' to='/signin' v-show=!this.$store.state.name>
        登录|注册
      </router-link>
    </ul>
    <ul v-if=FlagStatec>
        <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
        <li>{{this.$route.query.name}}</li>
        <li @click="$router.go(-1)">切换城市</li>
    </ul>
    <ul v-if=FlagFood>
        <li><i class="el-icon-search"></i></li>
        <li @click="ClickReturnPosition()">{{HeadersName}}</li>
        <router-link v-show=this.$store.state.name tag='li' to='/home/my'>
          <i class="el-icon-user"></i>
        </router-link>
        <router-link tag='li' to='/signin' v-show=!this.$store.state.name>
          登录|注册
        </router-link>
    </ul>
    <ul v-if=PositionAFood>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li>{{this.$route.query.title}}</li>
      <li></li>
    </ul>
    <ul v-if=FlagSearch>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li @click="ClickReturnPosition()">搜索</li>
      <li></li>
    </ul>
    <ul v-if=FlagOrder>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li @click="ClickReturnPosition()">订单</li>
      <li></li>
    </ul>
    <ul v-if=FlagMy>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li @click="ClickReturnPosition()">我的</li>
      <li></li>
    </ul>


    <ul v-if=FlagStated>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li>密码登录</li>
      <li></li>
    </ul>
    <ul v-if=AccountHd>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li>账户信息</li>
      <li></li>
    </ul>
    <ul v-if=ModifyUserName>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li>修改用户名</li>
      <li></li>
    </ul>
    <ul v-if=ModifyPswd>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li>重置密码</li>
      <li></li>
    </ul>
    <ul v-if=GoodsPosition>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li>新增地址</li>
      <li @click="ClickSwitch()">{{GoodsPositionsValue}}</li>
    </ul>
    <ul v-if=AddPositions>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li>新增地址</li>
      <li></li>
    </ul>
    <ul v-if=AddSchool>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li>搜索地址</li>
      <li></li>
    </ul>
    <ul v-if=ShopInfo>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li>商家详情</li>
      <li></li>
    </ul>
    <ul v-if=Settlement>
      <li><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></li>
      <li>确认订单</li>
      <li>
        <router-link v-show=this.$store.state.name tag='li' to='/home/my'>
          <i class="el-icon-user"></i>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name:'Headers',
  props:['FlagStatea','AccountHd','FlagStateb','FlagStatec','HeadersName','FlagLiHide','FlagStated','FlagLiShow','ModifyUserName','ModifyPswd','FlagMy','FlagOrder','FlagSearch','PositionAFood','FlagFood','GoodsPosition','AddPositions','AddSchool','ShopInfo','Settlement'],
  data(){
    return{
      GoodsPositionsValue:'编辑',
      GoodsPositionsFlag:false
    }
  },
  methods:{
    ClickReturnPosition(){
      this.$router.push('/')
    },
    ClickSwitch(){
      if(this.GoodsPositionsValue=='完成'){
        this.GoodsPositionsValue='编辑'
        this.GoodsPositionsFlag=false
      }else{
        this.GoodsPositionsValue='完成'
        this.GoodsPositionsFlag=true
      }
      this.$emit('ClickChangFlag',this.GoodsPositionsFlag)
    }
  },
  mounted(){
    // this.$store.state.name=JSON.parse(localStorage.getItem(''))
    if(localStorage.getItem('Code')){
      this.$store.state.name=true
    }else{
      this.$store.state.name=false
    }
  }
}
</script>

<style lang='scss'>
  header{
    width: 100%;
    background: #3792e5;
    line-height: calc(74rem / (618/320*20));
    font-size: calc(35rem / (618/320*20));
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
        flex: 3;
      }
      li:nth-of-type(4){
        font-size: calc(15rem / (618/320*20));
      }
    }
    ul{
      width: 100%;
      >div{
        width: 100%;
        display: flex;
      }
    }
  }
</style>
