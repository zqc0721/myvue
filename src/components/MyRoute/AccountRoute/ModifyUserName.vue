<template>
  <div class="Modify_aDiv">
    <Headers :ModifyUserName=true></Headers>
    <content>
      <input type="text" :class=ChangeClass maxlength="24" v-on:input=InpChange() v-model="UserNmaes" placeholder="输入用户名">
      <p>{{Tips}}</p>
      <input type="button" :class=ChangeColor value="确认修改" :disabled=ButFlag @click="ClickRouteAccount()">
    </content>
  </div>
</template>

<script>
import Headers from '../../Headers/Headers'
export default {
  name:'Modify',
  data(){
    return{
      Tips:'用户名只能修改一次（5-24字符之间）',
      UserNmaes:'',
      Flag:false,
      ChangeClass:'Input_BorderDdd',
      ChangeColor:'Input_ColorGray',
      ButFlag:true
    }
  },
  methods:{
    InpChange(){
      console.log(this.UserNmaes.length)
      if(this.UserNmaes.length<5){
        this.ChangeClass='Input_BorderRed';
        this.Tips='用户名长度在5到24位之间';
        this.ChangeColor='Input_ColorGray';
        this.ButFlag=true
      }else{
        this.ChangeClass='Input_BorderDdd';
        this.Tips='用户名只能修改一次（5-24字符之间）';
        this.ChangeColor='Input_ColorWhite';
        this.ButFlag=false
      }
    },
    ClickRouteAccount(){
      this.$router.push({
        name:'Account',
        params:{
          UserNmaes:this.UserNmaes
        }
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
.Modify_aDiv{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  content{
    flex: 1;
    background: #f2f2f2;
    font-size: calc(25rem / (618/320*20));
    padding: calc(25rem / (618/320*20)) calc(20rem / (618/320*20));
    >input{
      width: 100%;
      height: calc(55rem / (618/320*20));
      border-radius: 5px;
      border: none;
      outline: none;
    }
    .Input_BorderDdd{
      border: 1px solid #ddd;
    }
    .Input_BorderRed{
      border: 1px solid red;
    }
    >input:nth-of-type(1){
      width: 99%;
      background: #f2f2f2;
    }
    >input:nth-of-type(2){
      background: #3399ff94;
      margin-top: calc(25rem / (618/320*20));
    }
    .Input_ColorGray{
      color: #ffffff96;
    }
    .Input_ColorWhite{
      color: white;
    }
    >p{
      color: #666;
      line-height: calc(55rem / (618/320*20));
    }
  }
}
</style>
