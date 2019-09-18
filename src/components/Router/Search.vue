<template>
  <div id="aDiv-Search">
    <Headers :FlagSearch=true></Headers>
    <div>
      <p>
        <el-input
          placeholder="请输入商家或美食名称"
          v-model="FoodValue"
          clearable>
        </el-input>

        <input type="button" value="提交" @click="AddSearchFood()">
      </p>
    </div>
    <p v-if="FlagaDiv">搜索历史</p>
    <div v-if="FlagaDiv">
      <ul>
        <li v-for='(item,index) in List' :key="index">
          {{item}}
          <span @click="DelCurrentData(index)"><i class="el-icon-close"></i></span>
        </li>
      </ul>
      <input type="button" value="清空搜索历史" @click="DelLostrg()">
    </div>
  </div>
</template>

<script>
import Headers from '../Headers/Headers'
export default {
  name:'Search',
  data(){
    return{
      List:[],
      FlagaDiv:false,
      FoodValue:''
    }
  },
  methods:{
    AddSearchFood(){
      this.FlagaDiv=true;
      if(!this.FoodValue==''){
        this.List.push(this.FoodValue)
      }
      for(var i=0; i<this.List.length;i++){
        for(var j=i+1;j<this.List.length;j++){
          if(this.List[i]==this.List[j]){
            this.List.splice(j,1)
            j--;
          }
        }
      }
      localStorage.setItem('SearchValue',JSON.stringify(this.List))
      this.FoodValue=''
    },
    //清空搜索历史
    DelLostrg(){
      this.List=[];
      localStorage.removeItem('SearchValue');
      this.FlagaDiv=false
    },
    //删除当前这条数据
    DelCurrentData(index){
      console.log(index)
      this.List.splice(index,1)
      localStorage.setItem('SearchValue',JSON.stringify(this.List))
      if(this.List.length<=0){
        this.FlagaDiv=false
      }
    }
  },
  mounted(){
    if(localStorage.getItem('SearchValue')){
      this.List=JSON.parse(localStorage.getItem('SearchValue'))
      console.log(this.List)
      if(this.List.length>0){
        this.FlagaDiv=true
      }else{
        this.FlagaDiv=false
      }
    }
  },
  components:{
    Headers
  }
}
</script>

<style lang='scss' scoped>
  #aDiv-Search{
    width: 100%;
    >p{
        padding: calc(20rem / (618/320*20));
        font-size: calc(20rem / (618/320*20));
        font-weight: bold;
    }
    >div:nth-of-type(1){
      background: white;
      >p{
        padding: calc(20rem / (618/320*20));
        display: flex;
          position: relative;
          >div{
            >input:nth-of-type(1){
              background: #f2f2f2;
              border: 1px solid #e4e4e4;
              border-radius: 5px;
              width: 74%;
              height: calc(50rem / (618/320*20));
              padding-left: calc(20rem / (618/320*20));
              outline: none;
            }
          }
        >input:nth-of-type(1){
          background: #3190e8;
          color: white;
          outline: none;
          width: 20%;
          border-radius: 5px;
          height: calc(65rem / (618/320*20));
          border: none;
          margin-left: calc(10rem / (618/320*20));
        }
      }
    }
    >div:nth-of-type(2){
      width: 100%;
      background: white;
      ul{
        width: 100%;
        li{
          padding: calc(20rem / (618/320*20));
          border-bottom: 1px solid #e4e4e4;
          font-size: calc(20rem / (618/320*20));
          font-weight: bold;
          span{
            float: right;
          }
        }
      }
      >input{
        width: 100%;
        background: white;
        border: none;
        line-height: calc(60rem / (618/320*20));
        outline: none;
        color: #3190e8;
        font-weight: bold;
      }
    }
  }
</style>
