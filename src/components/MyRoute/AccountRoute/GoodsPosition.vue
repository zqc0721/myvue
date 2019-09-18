<template>
  <div class="GoodsPosition">
    <Headers :GoodsPosition=true @ClickChangFlag='ClickChangeMassage($event)'></Headers>
    <content>
      <ul>
        <li v-for="(item,index) in List" :key="index" @click="ObtainCurrentData(item)">
          {{item.address}}
          <span>{{item.phone}}</span>
          <van-icon name="cross" v-if="CrossFlag" @click="DelData(index,item)"/>
        </li>
      </ul>
        <p @click="AddPositions()"><span>添加地址</span><i class="el-icon-arrow-right"></i></p>
    </content>
  </div>
</template>

<script>
import Headers from '../../Headers/Headers'
import axios from 'axios';
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon);
export default {
  name:'GoodsPosition',
  data(){
    return{
      List:[],
      CrossFlag:''
    }
  },
  methods:{
    AddPositions(){
      this.$router.push('/addPositions')
    },
    ClickChangeMassage(res){
      this.CrossFlag=res
    },
    //删除数据
    DelData(index,item){
      axios.delete(`http://elm.cangdu.org/v1/users/38000/addresses/${item.id}`).then((res)=>{
        this.ObtainDatas()


      })
    },
    ObtainDatas(){
      axios.get('http://elm.cangdu.org/v1/users/38000/addresses').then((res)=>{
        this.List=res.data
      })
    },
    ObtainCurrentData(res){
      console.log(res)
      this.$router.push(`/settlement?position=${this.$route.query.position}&id=${this.$route.query.id}`)
      localStorage.setItem('PositionData',JSON.stringify(res))
    }
  },
  mounted(){
    this.ObtainDatas()
  },
  components:{
    Headers
  }
}
</script>

<style lang='scss'>
.GoodsPosition{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  content{
    font-size: calc(25rem / (618/320*20));
    flex: 1;
    background: #f2f2f2;
    >ul{
      width: 100%;
      margin-top: calc(20rem / (618/320*20));
      >li{
        padding: calc(10rem / (618/320*20)) calc(25rem / (618/320*20));
        border: 1px solid #d9d9d9;
        line-height: calc(45rem / (618/320*20));
        background: white;
        position: relative;
        >span{
          display: block;
        }
        >i{
          position: absolute;
          right: 3%;
          top: 35%;
        }
      }
    }
    >p:nth-of-type(1){
      padding: 0rem calc(25rem / (618/320*20));
      background: white;
      line-height: calc(60rem / (618/320*20));
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
      margin-top: calc(25rem / (618/320*20));
      display: flex;
      >span{
        flex: 1;
      }
      >i{
        padding-top:calc(17rem / (618/320*20));
      }
    }
  }
}
</style>
