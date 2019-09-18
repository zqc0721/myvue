<template>
  <div id="aDiv-Home" class="TakeOutFood_Iscroll">
      <div v-show=FlagCover>
        <span><i class="el-icon-loading"></i>
          <p>正在加载数据...</p>
        </span>
      </div>
      <Headers :FlagFood=true :HeadersName=HeadersName :FlagLiHide=FlagLiHide></Headers>
      <div>
        <div class="block">
          <el-carousel height="150px">
            <el-carousel-item v-for="(item,index) in List" :key="index">
              <ul>
                <li v-for="(i,index) in item" :key='index' @click="RouteDetailsA(i.title,i.id)">
                  <img :src="`https://fuss10.elemecdn.com/${i.image_url}`"  alt />
                  <span>{{i.title}}</span>
                </li>
              </ul>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div id="aDiv-Home-Second">
          <p>
            <i class="el-icon-box"></i>附近商家
          </p>

          <ul>
            <li v-for="(item,index) in Arr" :key="index" @click="RouteDetailsB(item.id)">
              <img :src="`https://elm.cangdu.org/img/${item.image_path}`" alt />
              <p>
                <span>品牌</span>
                <b>{{item.name}}</b>
                <span>保准票</span>
              </p>
              <div>
                <el-rate
                  v-model="item.rating"
                  disabled
                  text-color="#ff9900">
                </el-rate>
                <span>{{item.rating}}</span>
                <span>月售{{item.recent_order_num}}单</span>
                <span>蜂鸟专送</span>
                <span>准时达</span>
              </div>
              <p>
                <span>¥20元起送<b> / </b>{{item.piecewise_agent_fee.tips}}</span>
                <span></span>
              </p>
            </li>
          </ul>
          <p @click="ClickLoadMore()">{{LoadMore}}</p>
      </div>
  </div>
</div>
</template>

<script>
import Headers from '../Headers/Headers'
import axios from 'axios'
export default {

  name:'TakeOutFood',
  data(){
    return{
      List:[],
      Arr:[],
      FlagCover:true,
      LoadMore:'点击加载更多',
      Numbers:10,
      HeadersName:'',
      FlagLiHide:true,
    }
  },
  methods:{
    //数组分割
    Division(arr){
      //把这个数据按照8个一组 分成若干个 二个数组 [[8],[8]]
      var ArrList=[];
      for(var i=0,j=0;i<arr.length;i+=8,j++){
          ArrList[j]=arr.slice(i,i+8)
      }
      return ArrList
    },
    //点击跳转详情页
    RouteDetailsA(e,b){
      console.log(e,b)
      console.log(this.$route.query.position)
      this.$router.push(`/foods?position=${this.$route.query.position}&title=${e}&restaurant_category_id=${b}`)
    },
    RouteDetailsB(Iid){
      this.$router.push(`/shop?position=${this.$route.query.position}&id=${Iid}`)
    },
    CoverShow(){
      axios.get('http://elm.cangdu.org/v2/index_entry?geohash=39.78493,116.49476&group_type=1&flags[]=F').then((res)=>{
        this.List=this.Division(res.data)
        // console.log(_this.List)
        axios.get(`http://elm.cangdu.org/shopping/restaurants?latitude=39.78493&longitude=116.49476&offset=0&limit=${this.Numbers}&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`).then((req)=>{
          this.Arr=req.data;
          console.log(req)
          this.FlagCover=false
        })
      })
    },
    //点击加载更多
    ClickLoadMore(){
      var Num=10;
        this.Numbers=this.Numbers+Num
        console.log(this.Numbers)
        this.LoadMore='正在加载中...';
        axios.get(`http://elm.cangdu.org/shopping/restaurants?latitude=39.78493&longitude=116.49476&offset=0&limit=${this.Numbers}&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`).then((req)=>{
          this.Arr=req.data;
          console.log(req)
          this.LoadMore='点击加载更多'
        })
    }
  },
  mounted(){
    this.CoverShow()
    if(localStorage.getItem('Code')){
        this.FlagLiHide=false
    }
    if(localStorage.getItem('Address')){
      this.HeadersName=JSON.parse(localStorage.getItem('Address'))
    }
  },
  components:{
    Headers
  }

}
</script>


<style lang="scss">
.el-carousel__item h3 {
    color: white;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}
.el-rate__icon,.el-rate__item{
  font-size: 14px;
  margin-right: 0px;
}
.el-carousel__button{
  background-color: #3399ff;
}
.el-carousel__button{
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

#aDiv-Home{
  width: 100%;
  height:100%;
  background: white;
  display: flex;
  flex-direction: column;
  >div:nth-of-type(1){
    width: 100%;
    height: 100%;
    position: fixed;
    background: #ffffff99;
    color: black;
    display: flex;
    top: 0rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    i{
      font-size: calc(70rem / (618/320*20));
      margin-bottom: calc(30rem / (618/320*20))
    }
  }
  >div:nth-of-type(2){
    flex: 1;
    overflow: auto;
  }
  .block{
    width: 100%;
    >div{
      width: 100%;
      >div{
        width:100%;
        ul{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          li{
            flex: 25%;
            text-align: center;
            img{
              width: calc(90rem / (618/320*20))
            }
            span{
              display: block;
              font-size: calc(15rem / (618/320*20))
            }
          }
        }
      }
    }
  }
  #aDiv-Home-Second{
    width: 100%;
    background: white;
    padding-top: calc(20rem / (618/320*20));
    margin-top: calc(20rem / (618/320*20));
    >p:nth-of-type(1){
      color: #969696;
      padding: 0px 15px;
      padding-bottom: calc(20rem / (618/320*20));
      line-height: calc(22rem / (618/320*20));
      font-size: calc(15rem / (618/320*20));
      i{
        font-size: calc(20rem / (618/320*20));
        padding-right: calc(20rem / (618/320*20));
      }
    }
    >p:nth-of-type(2){
      width: 100%;
      text-align: center;
      background: #57A9FF;
      color: white;
      line-height: calc(60rem / (618/320*20));
      font-size: calc(20rem / (618/320*20));
    }
    >ul{
      width: 100%;
      >li{
        padding: calc(15rem / (618/320*20)) 10px;
        clear: both;
        font-size: calc(15rem / (618/320*20));
        border-bottom:1px solid #f5f5f5;
        img{
          width: calc(108rem / (618/320*20));
          float: left;
          padding-right: calc(10rem / (618/320*20));;
        }
        p:nth-of-type(1){
          display: flex;
          span:nth-of-type(1){
            background: #ffda51;
            color: black;
            font-weight: bold;
            padding: 0px calc(3rem / (618/320*20));
          }
          b{
            flex: 1;
            padding-left: calc(10rem / (618/320*20));
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          span:nth-of-type(2){
            color: gray;
          }
        }
        >div{
          display: flex;
          margin-top: calc(16rem / (618/320*20));
          margin-bottom: calc(4rem / (618/320*20));
          span:nth-of-type(1){
            color: #d7945d;
            font-weight: bold;
            padding-left: calc(5rem / (618/320*20));
          }
          span:nth-of-type(2){
            text-align: center;
            flex: 1;
          }
          >span:nth-of-type(3){
            background: #57A9FF;
            color: white;
            padding: calc(3rem / (618/320*20)) calc(5rem / (618/320*20));
            margin-right: calc(5rem / (618/320*20));
          }
          >span:nth-of-type(4){
            border: 1px solid #3399ff;
            color: #3399ff;
            padding: calc(3rem / (618/320*20)) calc(5rem / (618/320*20));;
          }
        }
        p:nth-of-type(3){
          >span{
            color: #696969;
            b{
              color: black;
            }
          }
        }
      }
    }
  }
}
</style>
