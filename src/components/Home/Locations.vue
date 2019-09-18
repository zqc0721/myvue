<template>
  <div id="aDiv-Locations">
    <Headers :FlagStatea=false :FlagStateb=false :FlagStatec=true></Headers>
    <content>
      <div class="Locations_aDiv-Content">
        <input type="text" v-model='InputValue' placeholder="请输入学校﹑商务楼﹑地址">
        <input type="button" value="提交" @click="ClickAddData()">
      </div>
      <p v-if="!FlagHide">搜索历史</p>
      <div class="Locations_bDiv-Content" v-if='FlagHide'>
        <ul>
          <li v-for="(item,index) in List" :key="index" @click="AddLogStr(item)">
            <h3>{{item.name}}</h3>
            <p>{{item.address}}</p>
          </li>
        </ul>
      </div>
      <div class="Locations_bDiv-Content" v-if='FLagShow'>
        <ul>
          <li v-for="(item,index) in Arr" :key="index" @click="AddRoute(item)">
            <h3>{{item.name}}</h3>
            <p>{{item.address}}</p>
          </li>
        </ul>
        <input type="button" value="清空所有" @click="DelLogStr()">
      </div>
    </content>
  </div>
</template>

<script>
import axios from 'axios'
import Headers from '../Headers/Headers'
var option={
  //向Storage中存储数据
  saveData(key,val){
    localStorage.setItem(key,JSON.stringify(val));
  },
  //读取Storage中的数据
  getData(key){
    return JSON.parse(localStorage.getItem(key))
  }
}
function unique (arr){
    return Array.from(new Set(arr))
}
export default {
  name:'Locations',
  data(){
    return{
      InputValue:'',
      List:[],
      FlagHide:false,
      newList:[],
      Arr:[],
      FLagShow:false
    }
  },
  methods:{
      ClickAddData(){
        //判断当INput中不为空时进行搜索
        if(!this.InputValue==''){
          this.List.push(this.InputValue);
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          axios.get(`http://elm.cangdu.org/v1/pois?type=search&city_id=${this.$route.query.id}&keyword=${this.InputValue}`).then((req)=>{
            console.log(req.data);
            if(req.data.message){
              this.$message.error(req.data.message)
            }else{
              this.List=req.data
            }
          })
          this.InputValue='';
        }else{
          this.$message.error('您还没有输入内容');
        }
        if(this.List.length>0){
          this.FlagHide=true
          this.FLagShow=false
        }else{
          this.FlagHide=false
        }
      },
      //点击数据添加到本地存储
      AddLogStr(res){
        this.Arr.push(res)
        //去除重复
        for(var i=0;i<this.Arr.length;i++){
          for(var j=i+1;j<this.Arr.length;j++){
            if(this.Arr[i].name==this.Arr[j].name){
              this.Arr.splice(j,1);
              j--;
            }
          }
        }
        option.saveData('mes',this.Arr)
        option.saveData('Address',res.address)
        this.$router.push(`/home/?position=${res.geohash}`)
      },
      AddRoute(res){
        option.saveData('Address',res.address)
        this.$router.push(`/home/?position=${res.geohash}`)
      },
      //点击删除历史记录
      DelLogStr(){
        localStorage.removeItem('mes')
        localStorage.removeItem('Address')
        //刷新页面
        // location.reload(true)
        this.Arr=[]
        if(this.Arr=[]){
          this.FLagShow=false
        }
      }
  },
  mounted(){
    this.ClickAddData();
    if(option.getData('mes')){
      var newArr=option.getData('mes')
      this.Arr=newArr;
      this.FLagShow=true
    }else{
      return
    }

    //获取本地存储的数据
    // if(JSON.parse(localStorage.getItem('mes'))){
    //   var newList=JSON.parse(localStorage.getItem('mes'));
    //   this.Arr=newList
    // }else{
    //   return
    // }
  },

  components:{
    Headers
  }
}
</script>

<style lang='scss'>
#aDiv-Locations{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: calc(20rem / (618/320*20));
  background: #f5f5f5;
  >header{
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
      li:nth-of-type(1){
        text-align: left;
        padding-left: calc(20rem / (618/320*20));
      }
      li:nth-of-type(2){
        flex: 2;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      li:nth-of-type(3){
        font-size: calc(15rem / (618/320*20));
      }
    }
  }
  content{
    width: 100%;
    overflow: auto;
    .Locations_aDiv-Content{
      padding: calc(20rem / (618/320*20)) calc(30rem / (618/320*20));
      background: white;
      margin-top: calc(20rem / (618/320*20));
      border-top:1px solid #e3e3e3;
      border-bottom:1px solid #e3e3e3;
      input{
        width: 97%;
        height: calc(55rem / (618/320*20));
        border: 1px solid #e4e4e4;
        outline:none;
        padding-left: calc(10rem / (618/320*20));
        border-radius: calc(5rem / (618/320*20));
      }
      input:nth-of-type(2){
        width: 100%;
        background: #3792e5;
        color: white;
        margin-top: calc(20rem / (618/320*20));
      }
    }
    >p{
      font-size: calc(15rem / (618/320*20));
      padding: calc(10rem / (618/320*20)) calc(30rem / (618/320*20));
      font-weight: bold;
      border-top:1px solid #e3e3e3;
      border-bottom:1px solid #e3e3e3;
    }
    >.Locations_bDiv-Content{
      background: white;
      border-top:1px solid #e3e3e3;
      >ul{
        width: 100%;
        li{
          padding: calc(20rem / (618/320*20)) calc(30rem / (618/320*20));
          line-height: calc(48rem / (618/320*20));
          border-bottom:1px solid #e3e3e3;
          border-top:1px solid #e3e3e3;
          font-size: calc(24rem / (618/320*20));
        }
      }
      >input{
        width: 100%;
        background: white;
        line-height: calc(80rem / (618/320*20));
        border: none;
        outline:none;
        color: gray;
      }
    }
  }
}
</style>
