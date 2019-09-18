<template>
  <div class="AddPositions">
    <Headers :AddPositions=true></Headers>
    <content>
      <ul>
        <li><input type="text" :class="this.AlertFlag?'ChangeColor':''" placeholder="请填写你的姓名" v-model="UserNames" @input='InputValue()'/>
        <p v-if=AlertFlag>{{this.Alert}}</p>
        </li>
        <li @click="RouterAddPositions()"><input type="text" placeholder="小区/写字楼/学校等" v-model='School'></li>
        <li><input type="text" placeholder='请填写详细送餐地址' :class="this.DetailedFlag?'ChangeColor':''" v-model="DetailedAddress" @input="DetailedValue()"/>
        <p v-if=DetailedFlag>{{this.DetailedAlert}}</p>
        </li>
        <li><input type="number" placeholder="请填写能够联系到您的手机号" :class="this.PhoneFlag?'ChangeColor':''" v-model="UserPhone" @input="PhoneValue()"/>
        <p v-if=PhoneFlag>{{this.PhoneValues}}</p>
        </li>
        <li><input type="text" placeholder="备用联系方式(选填)" v-model="SparePhome"/></li>
      </ul>
      <p><input type="button" value='新增地址' @click="AddPositions()"/></p>
    </content>
  </div>
</template>

<script>
import Headers from '../../../Headers/Headers'
import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  name:'AddPositions',
  data(){
    return{
      UserNames:'',
      School:'',
      DetailedAddress:'',
      UserPhone:'',
      SparePhome:'',
      AlertFlag:false,
      Alert:'请填写您的姓名',
      DetailedAlert:'请详细填写送餐地址',
      DetailedFlag:false,
      PhoneValues:'请输入正确手机号',
      PhoneFlag:false
    }
  },
  methods:{
      AddPositions(){
        axios.post(`http://elm.cangdu.org/v1/users/38000/addresses`,{
          address:this.DetailedAddress,
          address_detail:this.School,
          name:this.UserNames,
          phone:this.UserPhone,
          geohash:this.$route.params.Geohash,
          phone_bk:'',
          poi_type:0,
          sex:1,
          tag:'公司',
          tag_type:4
        }).then((res)=>{
          console.log(res)
          if(!res.data.success){
            Toast.fail(res.data.message);
          }else{
            this.$router.push('/goodsposition')
          }
        })
      },
      RouterAddPositions(){
        this.$router.push('/addschool')
      },
      InputValue(){
        console.log(this.UserNames.length)
        if(this.UserNames.length<=0){
          this.AlertFlag=true;
        }else{
          this.AlertFlag=false
        }
      },
      DetailedValue(){
        if(this.DetailedAddress.length<=3){
          this.DetailedAlert='送餐地址太短了，不能辨识'
          this.DetailedFlag=true
        }else{
          this.DetailedFlag=false
        }
      },
      //手机号验证
      PhoneValue(){
        var PhoneZe=/^[1][3,4,5,7,8][0-9]{9}$/;
        console.log(this.UserPhone)
        if(PhoneZe.test(this.UserPhone)){
          this.PhoneFlag=false
        }else{
          this.PhoneFlag=true
        }

      }
  },
  mounted(){
    this.School=this.$route.params.Positions
    console.log(this.School)
  },
  components:{
    Headers
  }
}
</script>

<style lang='scss'>
.AddPositions{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  content{
    flex: 1;
    background: #f2f2f2;
    font-size: calc(25rem / (618/320*20));
    >ul{
      margin-top: calc(20rem / (618/320*20));
      width: 100%;
      background: white;
      li{
        padding: calc(10rem / (618/320*20)) calc(25rem / (618/320*20));
        input{
          background: #f2f2f2;
          border: 1px solid #ddd;
          width: 97%;
          border-radius: 5px;
          line-height: calc(55rem / (618/320*20));
          padding-left: calc(15rem / (618/320*20));
        }
        >p{
          margin-top: calc(15rem / (618/320*20));
          color: red;
        }
      }
      .ChangeColor{
        border: 1px solid red;
      }
    }
    >p{
      padding: calc(10rem / (618/320*20)) calc(25rem / (618/320*20));
      margin-top: calc(15rem / (618/320*20));
      input{
        width: 100%;
        color: #fff;
        background: #4cd964;
        border: none;
        line-height: calc(55rem / (618/320*20));
        border-radius: 5px;
      }
    }
  }
}
</style>
