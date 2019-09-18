<template>
  <div id="aDiv-Location">
    <Headers :FlagStatea=false :FlagStateb=true :FlagStatec=false :FlagLiHide=FlagLiHide></Headers>
    <content>
      <div class="Conten_aDiv-Location">
        <p>当前定位城市:<span>定位不准时,请在城市列表中选择</span></p>
        <!-- <router-link tag='p' to='/loactions'> -->
          <p>北京<i class="el-icon-arrow-right"></i></p>
        <!-- </router-link> -->
      </div>
      <div class="Conten_bDiv-Location">
        <p>热门城市</p>
        <ul>
          <li v-for="(item,index) in List" :key="index" @click="ClickRouterBiography(item)">
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="Conten_cDiv-Location">
        <div v-for="(i,index) in Letter" :key="index">
          <p>{{i}}<span>(按字母排序)</span></p>
          <ul>
            <li v-for='(s,index) in Arr[i]' :key="index" @click="MoveShowTitle(s)">
              {{s.name}}
            </li>
          </ul>
        </div>
      </div>
    </content>
  </div>
</template>

<script>
import Headers from '../Headers/Headers'
export default {
  name:'Location',
  data(){
    return{
      List:[],
      Letter:[],
      Arr:[],
      FlagLiHide:true
    }
  },
  methods:{
    ClickRouterBiography(req){
      console.log(req.id,req.name)
      this.$router.push(`/loactions?id=${req.id}&name=${req.name}`)
    },
    MoveShowTitle(res){
      // console.log(res)
      this.$router.push(`/loactions?id=${res.id}&name=${res.name}`)
    }
  },
  mounted(){
    var _this=this;
    _this.axios.get('http://elm.cangdu.org/v1/cities?type=hot').then((res) => {
      _this.List=res.data
    })
    _this.axios.get('http://elm.cangdu.org/v1/cities?type=group').then((req)=>{
      var newList=[];
      _this.Arr=req.data;
      _this.Letter=Object.keys(req.data).sort()
      // console.log(_this.Letter)
    })
    if(localStorage.getItem('Code')){
      this.FlagLiHide=false
      console.log(this.FlagLiHide)
    }
  },
  components:{
    Headers
  }
}
</script>

<style lang='scss'>
#aDiv-Location{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
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
      }
      li:nth-of-type(2){
        flex: 2;
      }
    }
  }
  content{
    flex: 1;
    overflow: auto;
    .Conten_aDiv-Location{
        font-size: calc(15rem / (618/320*20));
        background: white;
        p:nth-of-type(1){
          font-size: calc(15rem / (618/320*20));
          line-height: calc(70rem / (618/320*20));
          background: white;
          border-bottom: 1px solid #e4e4e4;
          padding: 0px calc(10rem / (618/320*20));
          >span{
            color: gray;
            float: right;
          }
        }
        p:nth-of-type(2){
          cursor: pointer;
          color: #4190dd;
          padding: calc(20rem / (618/320*20));
          font-weight: bold;
          border-bottom:1px solid #e4e4e4;
          i{
            color: gray;
            float: right;
          }
        }
    }
    .Conten_bDiv-Location{
      font-size: calc(15rem / (618/320*20));
      background: white;
      margin-top: calc(20rem / (618/320*20));
      >p:nth-of-type(1){
        padding: calc(20rem / (618/320*20));
        border-top: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          flex: 18%;
          color: #4190dd;
          font-weight: bold;
          text-align: center;
          border: calc(1rem / (618/320*20)) solid #e4e4e4;
          padding: calc(20rem / (618/320*20)) calc(20rem / (618/320*20));
        }
      }
    }
    .Conten_cDiv-Location{
      margin-top: calc(20rem / (618/320*20));
      font-size: calc(15rem / (618/320*20));
      >div{
        margin-top: calc(20rem / (618/320*20));
        background: white;
        border-bottom: 1px solid #e4e4e4;
        border-top: 1px solid #e4e4e4;
        >p{
          padding: calc(20rem / (618/320*20));
          span{
            color: gray;
          }
        }
        >ul{
          display: flex;
          flex-wrap: wrap;
          >li{
            flex: 18%;
            font-weight: bold;
            text-align: center;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            color: #626262;
            border: calc(1rem / (618/320*20)) solid #e4e4e4;
            padding: calc(20rem / (618/320*20));
          }
        }
      }
    }
  }
}
</style>
