<template>
  <div class="Settlement_aDiv">
    <Headers :Settlement=true></Headers>
    <content>
      <div class="Content_aDiv">
        <p @click="RouterAddress()" v-if="aDivPFlag"><i class="el-icon-location-outline"></i><span>请添加一个收货地址</span><i class="el-icon-arrow-right"></i></p>
        <p @click="RouterAddress()" v-if="!aDivPFlag">
          <i class="el-icon-location-outline"></i>
          <span>
            <p><span>{{UserName}}</span> 先生/女士 {{UserPhone}}</p>
            <p><span>{{UserTag}}</span> {{UseraddressDetail}}</p>
          </span>
          <i class="el-icon-arrow-right"></i></p>
      </div>
      <div class="Content_bDiv">
        <ul>
          <li>送达时间</li>
          <li>
            尽快送达 | 预计 17:12
            <span>蜂鸟专送</span>
          </li>
        </ul>
      </div>
      <div class="Content_cDiv">
        <ul>
          <li>支付方式<span>在线支付 <i class="el-icon-arrow-right"></i></span></li>
          <li>红包<span>暂时只在饿了么APP中支持</span></li>
        </ul>
      </div>
      <div class="Content_dDiv">
        <p>{{Names}}</p>
        <ul>
          <li v-for="(item,index) in List" :key="index">
            <p>{{item.name}}</p>
            <p><i class="el-icon-close"></i>{{item.NeNumber}}</p>
            <p>¥20</p>
          </li>
          <li>餐盒<span>¥ 802</span></li>
          <li>派送费<span>¥ 4</span></li>
        </ul>
        <p>订单 ¥845 <span>待支付 ¥{{AllPrices}}</span></p>
      </div>
      <div class="Content_eDiv">
        <ul>
          <li>订单备注<span>口味﹑偏好等 <i class="el-icon-arrow-right"></i></span></li>
          <li>发票 抬头<span>不需要开发票 <i class="el-icon-arrow-right"></i></span></li>
        </ul>
      </div>
    </content>
    <footer>
      <ul>
        <li>待支付¥{{AllPrices}}</li>
        <li>确认下单</li>
      </ul>
    </footer>
  </div>
</template>

<script>
import Headers from '../../../Headers/Headers'
import axios from 'axios'
export default {
  name:'Settlement',
  data(){
    return{
      Names:'',
      List:[],
      Arr:[],
      aDivPFlag:true,
      UserName:'',
      UserPhone:'',
      UserTag:'',
      UseraddressDetail:'',
      AllPrices:0
    }
  },
  methods:{
    ObtainData(){
      var AllPrice=0;
      if(localStorage.getItem('NewArr')){
        this.List=JSON.parse(localStorage.getItem('NewArr'))
        this.List.forEach((res)=>{
          AllPrice+=res.NeNumber*20+4+802
          console.log(parseFloat(AllPrice))
          this.AllPrices=AllPrice
        })
      }
    },
    RouterAddress(){
      this.$router.push(`/goodsposition?position=${this.$route.query.position}&id=${this.$route.query.id}`)
    }
  },
  mounted(){
    axios.get(`http://elm.cangdu.org/shopping/restaurant/${this.$route.query.id}`).then((res)=>{
        // console.log(res.data.name)
        this.Names=res.data.name
        this.ObtainData()
    })
    if(localStorage.getItem('PositionData')){
      this.Arr=JSON.parse(localStorage.getItem('PositionData'))
      this.UserName=this.Arr.name;
      this.UserPhone=this.Arr.phone;
      this.UserTag=this.Arr.tag;
      this.UseraddressDetail=this.Arr.address_detail
    }else{
      this.Arr=[]
    }
    if(this.Arr.length<1){
      this.aDivPFlag=true
    }else{
      this.aDivPFlag=false
    }
  },
  components:{
    Headers
  }
}
</script>

<style lang='scss'>
.Settlement_aDiv{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  content{
    background: #f5f5f5;
    flex: 1;
    overflow: auto;
    font-size: calc(15rem / (618/320*20));
    .Content_aDiv{
      width: 100%;
      >p{
        padding: .8rem .4rem;
        background: white;
        display: flex;
        border-bottom: 3px dashed #0043ff61;
        >i:nth-of-type(1){
          color: #3399ff;
        }
        >span{
          flex: 1;
          padding-left: .3rem;
          >p:nth-of-type(1){
            >span{
              font-weight: bold;
              color: black;
              font-size: .8rem;
            }
          }
          >p:nth-of-type(2){
            margin-top: .3rem;
            color: #999;
            >span{
              padding: .2rem;
              color: white;
              background: #3399ff;
              border-radius: 5px;
            }
          }
        }
      }
    }
    .Content_bDiv{
      width: 100%;
      background: white;
      margin-top: .3rem;
      >ul{
        padding: .7rem .5rem;
        border-left: 3px solid #3399ff;
        display: flex;
        >li{
          flex: 1;
        }
        >li:nth-of-type(1){
          line-height: 2.3rem;
          font-weight: bold;
          padding-left: .5rem;
          font-size: .8rem;
        }
        >li:nth-of-type(2){
          text-align: right;
          color: #3399ff;
          font-weight: bold;
          >span{
            float: right;
            color: white;
            margin-top: .5rem;
            background: #3399ff;
            padding: .2rem;
            border-radius: 5px;
          }
        }
      }
    }
    .Content_cDiv{
      widows: 100%;
      margin-top: .3rem;
      background: white;
      >ul{
        padding: 0rem .5rem;
        color: gray;
        >li{
          padding: .6rem 0rem;
          display: flex;
          >span{
            flex: 1;
            color: #999;
            text-align: right;
            font-weight: 100;
          }
        }
        >li:nth-of-type(1){
          border-bottom: 1px solid #d3d3d3;
          font-weight: bold;
        }
      }
    }
    .Content_dDiv{
      width: 100%;
      margin-top: .3rem;
      background: white;
      >p:nth-of-type(1){
        padding: .5rem 1rem;
        font-size: .7rem;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
      }
      >p:nth-of-type(2){
        padding: .5rem .5rem;
        border-top: 1px solid #ddd;
        color: #999;
        display: flex;
        >span{
          flex: 1;
          text-align: right;
          color: #f60;
        }
      }
      >ul{
        padding: 0rem .5rem;
        >li{
          display: flex;
          padding: .4rem 0rem;
          color: #999;
          >p:nth-of-type(1){
            flex: 4;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          >p:nth-of-type(2){
            flex: 1;
            text-align: right;
            color: #f60;
          }
          >p:nth-of-type(3){
            flex: 1;
            text-align: right;
            color: black;
          }
          >span{
            flex: 1;
            text-align: right;
            color: black;
          }
        }
      }
    }
    .Content_eDiv{
      widows: 100%;
      margin-top: .3rem;
      background: white;
      >ul{
        padding: 0rem .5rem;
        color: gray;
        >li{
          padding: .6rem 0rem;
          display: flex;
          >span{
            flex: 1;
            color: #999;
            text-align: right;
            font-weight: 100;
          }
        }
        >li:nth-of-type(1){
          border-bottom: 1px solid #d3d3d3;
          font-weight: bold;

        }
      }
    }
  }
  footer{
    width: 100%;
    ul{
      display: flex;
      font-size: .5rem;
      li{
        padding: .5rem .3rem;
      }
      >li:nth-of-type(1){
        flex: 3;
        background: #333;
        color: #fff;
      }
      >li:nth-of-type(2){
        flex: 1;
        text-align: center;
        background: #4cd964;
        color: white;
      }
    }
  }
}
</style>
