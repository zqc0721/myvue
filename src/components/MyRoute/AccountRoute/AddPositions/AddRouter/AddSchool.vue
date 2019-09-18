<template>
  <div class="AddSchool">
    <Headers :AddSchool=true></Headers>
    <content>
      <p><input type="text" placeholder="请输入小区/写字楼/学校等" v-model="School"><input type="button" value="确认" @click="AddSchool()"></p>
      <div>
        <p>为了满足商家的送餐要求，建议您从列表中选择地址</p>
        <div v-if=DivFlag>
          <p>找不到地址？</p>
          <p>请尝试输入小区、写字楼或学校名</p>
          <p>详细地址（如门牌号）可稍后输入哦。</p>
        </div>
        <ul v-else>
          <li v-for="(item,index) in List" :key="index" @click="RouterPositions(item.name,item.geohash,item.address)">
            {{item.name}}
            <span>{{item.address}}</span>
          </li>
        </ul>
      </div>
    </content>
  </div>
</template>

<script>
import Headers from '../../../../Headers/Headers'
import axios from 'axios'
export default {
  name:'AddSchool',
  data(){
    return{
      School:'',
      List:[],
      DivFlag:true
    }
  },
  methods:{
    AddSchool(){
      axios.get(`http://elm.cangdu.org/v1/pois?type=nearby&keyword=${this.School}`).then((res)=>{
        this.List=res.data
        console.log(res)
        if(this.List.length>0){
          this.DivFlag=false
        }else{
          this.DivFlag=true
        }
      })
    },
    //跳转并传值
    RouterPositions(res,req,rez){
      console.log(res,req,rez)
      this.$router.push({
        name:'AddPositions',
        params:{Positions:res,Geohash:req}
      })
    }
  },
  mounted(){

  },
  components:{
    Headers
  }
}
</script>

<style lang='scss'>
.AddSchool{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  content{
    flex: 1;
    overflow: auto;
    background: #f2f2f2;
    font-size: calc(15rem / (618/320*20));
    >p{
      background: white;
      padding: calc(15rem / (618/320*20)) calc(25rem / (618/320*20));
      >input:nth-of-type(1){
        background: #f2f2f2;
        border: 1px solid #ddd;
        border-radius: 5px;
        width: 73%;
        padding-left: calc(15rem / (618/320*20));
        line-height: calc(55rem / (618/320*20));
      }
      >input:nth-of-type(2){
        margin-left: calc(15rem / (618/320*20));
        width: 20%;
        height:calc(60rem / (618/320*20));
        border: none;
        background: #3388ff;
        color: white;
        border-radius: 5px;
      }
    }
    >div{
      width: 100%;
      >ul{
        width: 100%;
        >li{
          padding: calc(10rem / (618/320*20)) calc(15rem / (618/320*20));
          span{
            display: block;
          }
          border-bottom: 1px solid #ccc;
          color: #969696;
          line-height: calc(43rem / (618/320*20));
        }
      }
      >p{
        color: #ff883f;
        background: #fff6e4;
        text-align: center;
        padding: calc(10rem / (618/320*20)) calc(15rem / (618/320*20));
      }
      >div:nth-of-type(1){
        width: 90%;
        height: 10%;
        text-align: center;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        >p{
          color: #969696;
          margin-bottom: calc(15rem / (618/320*20));
        }
      }
    }
  }
}
</style>
