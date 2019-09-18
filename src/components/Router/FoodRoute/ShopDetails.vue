<template>
  <div class="ShopDetails">
    <header><i class="el-icon-arrow-left" @click="$router.go(-1)"></i></header>
    <div v-if="show">
      <div @click="ClickHide()"></div>
      <span>
        <p>{{SpecificationsB}}<span><i class="el-icon-close" @click="ChangeShowFlag()"></i></span></p>
        <p><span>{{SpecificationsC}}</span></p>
        <p>
          <input type="button" v-for="(a,index) in SpecificationsA" :key='index' :value="a" @click="BindingA(a)">
        </p>
        <footer>
          <span>¥ 20</span>
          <input type="button" value="加入购物车" @click="AddShopCar(SpecificationsB)">
        </footer>
      </span>
    </div>
    <content>
      <div class="Shop_aDiv-Content">
        <div class="Content_Header">
          <div :style="{backgroundImage:'url('+this.BackgroundImg+')'}"></div>
          <div @click="ClickLookInfo()">
            <ul>
              <li><span><img :src=this.BackgroundImg></span></li>
              <li>
                <h2>{{this.ShopNames}}</h2>
                <p>商家配送 / 分钟送达 / {{this.ShopIntroduce}}</p>
                <p>公告: {{this.ShopNotice}}</p>
              </li>
              <li><i class="el-icon-arrow-right"></i></li>
            </ul>
          </div>
        </div>
        <div class="Content_Content">
          <van-tabs>
            <van-tab title="商品">
              <div>
                <van-sidebar v-model="activeKey">
                  <van-sidebar-item v-for="(item,index) in List" :key="index" :title=item.name @click="ClickChangeScoll(item,index)"/>
                </van-sidebar>
                <div ref="FoodWrapper">
                  <div v-for="(rq,index) in List" :key="index" class='Food_List-Hook'>
                    <p :class="{'active':PLanderIndex==index}">{{rq.name}} <span>{{rq.description}}</span>
                    <el-tooltip class="item" effect="dark" :content=rq.name+rq.description placement="bottom-end">
                      <el-button>...</el-button>
                    </el-tooltip>
                    </p>
                    <ul>
                      <li v-for="(i,index) in rq.foods" :key="index">
                        <img :src='"https://elm.cangdu.org/img/"+i.image_path'>
                        <p>{{i.name}}</p>
                        <p>{{i.description}}</p>
                        <p>月售{{i.month_sales}}份 好评率{{i.satisfy_rate}}%</p>
                        <p>
                          <b>¥ 20</b>
                          <span v-show='i.specifications.length>=1'>
                            <input type="button" v-for="(p,index) in i.specifications" :value="i.specifications.length>=1?p.name:'+'" :key="index" @click="ChnageFlagShow(p.values,i.name,p.name)">
                          </span>
                          <span v-show='i.specifications.length<1'>
                            <span v-show="SpanFlag"><input type="button" value="-" @click="ClickChangeInputReduce($event)"/><input type="text" value="0"></span>
                            <input type="button" value="+" @click="ClickChangeSpanFlag($event,index,i)">
                          </span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <van-popup
                  v-model="Footershow"
                  closeable
                  z-index='15'
                  position="bottom"
                  :style="{ height: '30%' }"
                >
                <header>
                  <p>购物车<span @click="DelAllData($event)"><i class="el-icon-delete
"></i>清空</span></p>
</header>
                <content>
                  <ul>
                    <li v-for="(x,index) in NewList" :key="index">
                      <span>{{x.name}}</span>
                      <span>¥ 20</span>
                      <span>
                        <input type="button" value="-" @click="DwindleNumb(index)"/>
                        <input type="text" :value=x.NeNumber>
                        <input type="button" value="+" @click="IncreaseNumb(index)">
                      </span>
                    </li>
                  </ul>
                </content>
              </van-popup>
              <footer>
                <ul>
                  <li @click="ChangeFooterFlag()">
                    <span class="sc" :style="{background:this.AllNumber>=1?'#3190e8':'#3d3d3f'}"><van-icon name="shopping-cart" /><b v-if="this.AllNumber>=1">{{AllNumber}}</b></span>
                    <span>
                      ¥{{AllPrice}}.00  配送费¥5
                    </span>
                  </li>
                  <li :style="{background:this.AllNumber>=1?'#4cd964':'#535356'}" @click="ClickSettlement($event)">{{this.AllNumber>=1?'去结算':'还差¥20起送'}}</li>
                </ul>
              </footer>
            </van-tab>

            <van-tab title="评价">
              <div>
                <ul>
                  <li>
                    <b>{{ratings}}</b>
                    <p>综合评价</p>
                    <p>高于周边商家76.9%</p>
                  </li>
                  <li>
                    <p>服务态度 <span><van-rate v-model="value1" readonly />{{value1}}</span></p>
                    <p>菜品评价 <span><van-rate v-model="value2" readonly />{{value2}}</span></p>
                    <p>送达时间 <span>分钟</span></p>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>
                    <input type="button" v-for="(item,index) in EvaluateList" :key="index" :value="item.name+'('+item.count+')'">
                  </li>
                </ul>
                <ul>
                  <li v-for="(item,index) in SellerArr" :key="index">
                    <div><img :src='"https://fuss10.elemecdn.com/"+item.avatar'/></div>
                    <div>
                      <p>{{item.username}}</p>
                      <p>
                        <span>
                          <van-rate v-model="item.rating_star" readonly />
                          {{item.time_spent_desc}}
                        </span>
                        <ul>
                          <li v-for="(i,index) in item.item_ratings" :key="index">
                            <img :src="'https://fuss10.elemecdn.com/'+i.image_hash">
                            <span>{{i.food_name}}</span>
                          </li>
                        </ul>
                      </p>
                      <p></p>
                    </div>
                    <div>{{item.rated_at}}</div>
                  </li>
                </ul>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </content>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue';
import { Sidebar, SidebarItem } from 'vant';
import { Tab, Tabs } from 'vant';
import { IndexBar, IndexAnchor } from 'vant';
import { Overlay } from 'vant';
import jq from 'jquery'
import { Popup } from 'vant';
import '../../../../static/theball/theBall.css'
import tball from '../../../../static/theball/theBall.js'

Vue.use(Popup);
Vue.use(Overlay);
Vue.use(IndexBar).use(IndexAnchor);
Vue.use(Tab).use(Tabs);
Vue.use(Sidebar);
Vue.use(SidebarItem);
export default {
  name:'ShopDetails',
  data(){
    return{
      List:[],
      activeKey: 0,
      BackgroundImg:'',
      ShopNames:'',
      ShopIntroduce:'',
      ShopNotice:'',
      SpecificationsA:[],
      SpecificationsB:'',
      show:false,
      ListHeight:[],
      PLanderIndex:0,
      EvaluateList:[],
      SellerArr:[],
      value1:4.7,
      value2:4.8,
      ratings:'',
      SpanFlag:false,
      Footershow:false,
      Numbers:false,
      AllNumber:0,
      NewArr:[],
      NewList:[],
      AllPrice:0,
      Gauge:''
    }
  },
  methods:{
    onClick(name, title) {

    },
    ClickHide(){
      this.show=false
    },
    ChnageFlagShow(p,i,x){
      this.show=true;
      this.SpecificationsA=p;
      this.SpecificationsB=i;
      this.SpecificationsC=x

    },
    ClickLookInfo(){
      this.$router.push('/shop/shopinformation')
    },

    //点击实现滑动
    ClickChangeScoll(res,index){
      this.PLanderIndex=index
      // this.$refs.FoodWrapper.scrollTop=this.ListHeight[index]
      // console.log(res)
      jq(this.$refs.FoodWrapper).animate({scrollTop:this.ListHeight[index]},500)
    },
    _initScroll(){
      let scrollY = this.$refs.FoodWrapper.scrollTop;
      console.log(scrollY)
      for(let i=0;i<this.ListHeight.length;i++){
        let height1 =this.ListHeight[i];
        let height2=this.ListHeight[i+1];
        if(!height2 || (scrollY >= height1 && scrollY < height2)){
          this.activeKey=1
          return;

        }
        // console.log(height1,height2)
        this.activeKey=0
        // console.log(this.activeKey)
      }
    },
    _CalculateHeight(){
      //找到所有
      let FoodList = this.$refs.FoodWrapper.getElementsByClassName('Food_List-Hook');
      let height = 0;
      //把第一个高度 送入数组
      this.ListHeight.push(height)
      //通过循环FoodList下的dom结构,将每一个div的高度依次送入数组
      for(let i=0;i<FoodList.length;i++){
        let item = FoodList[i];
        height += item.clientHeight;
        this.ListHeight.push(height)
      }
      // console.log(this.ListHeight)
    },
    ClickChangeSpanFlag(res,index,req){
      tball(res)
      var NewNumber=0
      res.path[1].children[0].children[1].value++
      if(res.path[1].children[0].children[1].value>=1){
        res.path[1].children[0].style.display='inline'
      }else{
        res.path[1].children[0].style.display='none'
      }
      NewNumber=res.path[1].children[0].children[1].value
      this.AllNumber=NewNumber
      this.NewArr.push({name:req.name,NeNumber:res.path[1].children[0].children[1].value})
      for(var i=0;i<this.NewArr.length;i++){
        for(var j=i+1;j<this.NewArr.length;j++){
          if(this.NewArr[i].name==this.NewArr[j].name){
            this.NewArr.splice(i,1)
            i--
            // this.NewArr.push({name:req.name,NeNumber:res.path[1].children[0].children[1].value})
            localStorage.setItem('NewArr',JSON.stringify(this.NewArr))
          }
        }
      }
      this.ObtainData()
      this.Calculation()
    },
    ObtainData(){
      if(localStorage.getItem('NewArr')){
        this.NewList=JSON.parse(localStorage.getItem('NewArr'))
      }else{
        this.NewList=[]
      }
    },
    ChangeShowFlag(){
      this.show=false
    },
    ClickChangeInputReduce(res){
      var NewNumber=0
      res.path[1].children[1].value--
      if(res.path[1].children[1].value<1){
        res.path[1].style.display='none'
      }
      NewNumber=res.path[1].children[1].value
      this.AllNumber=NewNumber
      console.log(this.AllNumber)
      this.ObtainData()
      this.Calculation()
    },
    ChangeFooterFlag(){
      this.Footershow=true
    },

    Calculation(){
      let TotalQuantity=0;
      let AllPrice=0;
      if(this.NewList.length>0){
        for(var i=0;i<this.NewList.length;i++){
          TotalQuantity+=parseFloat(this.NewList[i].NeNumber)
          AllPrice+=20*parseFloat(this.NewList[i].NeNumber)
        }
        this.AllPrice=AllPrice
        this.AllNumber=TotalQuantity
      }
    },
    DwindleNumb(index){
      this.NewList[index].NeNumber--
      console.log(this.NewList[index].NeNumber)
      if(this.NewList[index].NeNumber==0){
        this.NewList.splice(index,1)
        console.log(this.NewList)
        if(this.NewList.length==0){
          this.AllPrice=0
          this.AllNumber=0
        }
      }
      localStorage.setItem('NewArr',JSON.stringify(this.NewList))
      this.Calculation()
    },
    AddShopCar(res){
      console.log(res,this.Gauge)
      this.NewArr.push({name:res,NeNumber:1,Gauge:this.Gauge})
      for(var i=0;i<this.NewArr.length;i++){
        for(var j=i+1;j<this.NewArr.length;j++){
          if(this.NewArr[i].name==this.NewArr[j].name){
            this.NewArr.splice(i,1)
            i--
            // this.NewArr.push({name:req.name,NeNumber:res.path[1].children[0].children[1].value})
            localStorage.setItem('NewArr',JSON.stringify(this.NewArr))
          }
        }
      }
      this.ObtainData()
      this.Calculation()
    },
    BindingA(res){
      console.log(res)
      this.Gauge=res
    },
    IncreaseNumb(index){
      this.NewList[index].NeNumber++
      localStorage.setItem('NewArr',JSON.stringify(this.NewList))
      this.Calculation()
    },
    ClickSettlement(res){
      if(res.path[0].innerHTML=='去结算'){
        console.log('结算')
        this.$router.push(`/settlement?position=${this.$route.query.position}&id=${this.$route.query.id}`)
      }
    },
    DelAllData(res){
      if(localStorage.getItem('NewArr')){
        localStorage.removeItem('NewArr')
        this.NewList=[]
        this.AllNumber=0
        this.Footershow=false
        this.AllPrice=0
      }
    }
  },
  mounted(){
    axios.get(`http://elm.cangdu.org/shopping/v2/menu?restaurant_id=${this.$route.query.id}`).then((res)=>{
      this.List=res.data
      // console.log(res)
      this.$nextTick(()=>{
        this._CalculateHeight()
      })
      this.ObtainData()
      this.Calculation()
    })
    // this.$refs.FoodWrapper.addEventListener('scroll',this._initScroll)
    axios.get(`http://elm.cangdu.org/shopping/restaurant/${this.$route.query.id}`).then((res)=>{
      // console.log(res)
      this.ratings=res.data.rating
      this.BackgroundImg='http://elm.cangdu.org/img/'+res.data.image_path;
      this.ShopNames=res.data.name;
      this.ShopIntroduce=res.data.piecewise_agent_fee.tips
      this.ShopNotice=res.data.promotion_info
    })
    //获取商品评价
    axios.get(`http://elm.cangdu.org/ugc/v2/restaurants/${this.$route.query.id}/ratings/tags`).then((res)=>{
      // console.log(res)
      this.EvaluateList=res.data
    })
    //获取评价
    axios.get(`http://elm.cangdu.org/ugc/v2/restaurants/${this.$route.query.id}/ratings?has_content=true&offset=0&limit=10&tag_name=`).then((res)=>{
      // console.log(res)
      this.SellerArr=res.data
    })
  }
}
</script>

<style lang='scss'>
.active{
  color:red;
}
.van-tabs__wrap{
  border-bottom: 1px solid #ebebeb;
}
.van-popup--bottom{
  >header{
    >p{
      background: #eceff1;
      padding: .3rem .6rem;
      line-height: 1rem;
      font-size: calc(15rem / (618/320*20));
      color: #666;
      span{
        float: right;
      }
    }
  }
  content{
    >ul{
      height: calc(191rem / (618/320*20));
      overflow: auto;
      li{
        display: flex;
        padding: .6rem .5rem;
        >span:nth-of-type(2){
          flex: 1;
          color: #f60;
          font-weight: bold;
          text-align: right;
          padding-right: calc(35rem / (618/320*20));
        }
        span{
          >input:nth-of-type(1){
            background:white;
            color:#3399ff;
            border: 1px solid #3399ff;
            border-radius: 50%;
          }
          >input:nth-of-type(2){
            width: calc(30rem / (618/320*20));
            border: none;
          }
          >input:nth-of-type(3){
            background: #3399ff;
            color: white;
            border: 1px solid #3399ff;
            border-radius: 50%;
          }
        }
      }
    }
  }
}

.ShopDetails{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  >header{
    position: fixed;
    left: calc(5rem / (618/320*20));
    background: #ffffff00;
    color: white;
    z-index: 40;
    font-weight: bold;
  }
  >div{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    background: #0000009e;
    z-index: 21;
    >div{
      width: 100%;
      height: 100%;
      z-index: 21;
    }
    >span{
      z-index: 22;
      background: white;
      text-align: left;
      position: absolute;
      font-size: calc(20rem / (618/320*20));
      top:0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
      display: block;
      width:  calc(432rem / (618/320*20));
      height:  calc(327rem / (618/320*20));
      overflow: hidden;
      border-radius: 5px;
      font-family: Microsoft Yahei;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
      >p:nth-of-type(1){
        text-align: center;
        padding: calc(20rem / (618/320*20)) calc(20rem / (618/320*20));
        color:#222;
        >span{
          float: right;
        }
      }
      >p:nth-of-type(2),p:nth-of-type(3){
            padding: 0rem .5rem;
            margin: .8rem 0rem;
      }
      >p:nth-of-type(3){
        >input{
          border: .025rem solid #ddd;
          border-radius: .2rem;
          background: white;
          padding: .3rem .5rem;
        }
        >input:nth-of-type(2){
          margin-left: .7rem;
        }
        input:hover{
          border:1px solid #3399ff;
          color: #3399ff;
        }
      }
      >footer{
        padding: .6rem .5rem;
        background: #f9f9f9;
        color: #ff6000;
        >input{
          float: right;
          background: #3199e8;
          color: white;
          border-radius: .15rem;
          border:none;
        }
      }
    }
  }
  content{
    z-index: 10;
    width: 100%;
    height: 100%;
    .Shop_aDiv-Content{
      width: 100%;
      height: 100%;
      font-size: calc(20rem / (618/320*20));
      display: flex;
      flex-direction: column;
      >.Content_Header{
        >div:nth-of-type(1){
          width: 100%;
          height: calc(145rem / (618/320*20));
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          background-repeat:no-repeat;
          background-size:cover;
          -webkit-filter:blur(15px);
          -moz-filter:blur(15px);
          -o-filter:blur(15px);
          -ms-filter:blur(15px);
          filter:blur(15px);
          float: left;
        }
        >div:nth-of-type(2){
          position:absolute;
          width: 93%;
          height: calc(100rem / (618/320*20));
          padding: calc(20rem / (618/320*20)) calc(20rem / (618/320*20));
          color: white;
          font-weight: bold;
          >ul{
              display: flex;
              li{
              }
              >li:nth-of-type(1){
                span{
                  display: block;
                  width: calc(96rem / (618/320*20));
                  height: calc(96rem / (618/320*20));
                  border-radius: 5px;
                  overflow: hidden;
                  img{
                    width: 100%;
                    height: 100%;
                  }
                }
              }
              li:nth-of-type(2){
                padding-left: calc(10rem / (618/320*20));
                flex: 1;
                width: 75%;
                h2{
                  width:100%;
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                }
                p:nth-of-type(1){
                  width: calc(425rem / (618/320*20));
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                  margin: calc(10rem / (618/320*20)) 0rem;
                }
                p:nth-of-type(2){
                  width: calc(425rem / (618/320*20));
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                }
              }
              li:nth-of-type(3){
                font-size: calc(30rem / (618/320*20));
                >i{
                  margin-top: calc(40rem / (618/320*20));
                }
              }
            }
        }
      }
      .Content_Content{
        width: 100%;
        height: 86%;
        flex: 1;
        overflow: auto;
        >div{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          >.van-tabs__content{
            width: 100%;
            flex: 1;
            overflow: auto;
            >div:nth-of-type(1){
              width: 100%;
              height: 100%;
              >div:nth-of-type(1){
                display: flex;
                height: 100%;
                >div:nth-of-type(1){
                  flex: 1;
                  overflow: auto;
                  >a{
                    >div{
                      overflow: hidden;
                      text-overflow:ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
                >div:nth-of-type(2){
                  overflow: auto;
                  flex: 3;
                  width: 100%;
                  >div{
                    width: 100%;
                    >p{
                      padding: calc(20rem / (618/320*20)) calc(20rem / (618/320*20));
                      background: #f5f5f5;
                      font-weight: bold;
                      >span{
                        color: #999;
                        font-weight: 300;
                      }
                      >button{
                        color: #333;
                        float: right;
                        padding: 0;
                        margin: 0;
                        border: none;
                        background: none;
                      }
                    }

                    >ul{
                      width: 100%;
                      >li{
                        padding: calc(20rem / (618/320*20)) calc(20rem / (618/320*20));
                        clear: both;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        border-bottom: 1px solid #f8f8f8;
                        >p:nth-of-type(2){
                          color: #999;
                        }
                        >p:nth-of-type(3){
                          color: #333;
                        }
                        >img{
                          width: calc(79rem / (618/320*20));
                          float: left;
                          padding-right: calc(20rem / (618/320*20));
                        }
                        >p:nth-of-type(4){
                          display: flex;
                          width: 75%;
                          float: right;
                          >b{
                            flex:1;
                            color: #f60;
                          }
                          >span:nth-of-type(1){
                            >input{
                              background: #3399ff;
                              color: white;
                              border: none;
                              border-radius: 5px;
                              padding: calc(10rem / (618/320*20)) calc(20rem / (618/320*20));
                            }
                          }
                          >span:nth-of-type(2){
                            text-align: right;
                            >span{
                              >input:nth-of-type(1){
                                background: white;
                                color: white;
                                border-radius: 50%;
                                border: 1px solid #3399ff;
                                color: #3399ff;
                              }
                              >input:nth-of-type(2){
                                width: 10%;
                                border: none;
                                text-align: right;
                              }
                            }
                            >input{
                              background: #3399ff;
                              color: white;
                              border: 1px solid #3399ff;
                              border-radius: 50%;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              >footer{
                  position: fixed;
                  bottom: 0rem;
                  background: black;
                  color: white;
                  width: 100%;
                  z-index: 20;
                  line-height: calc(79rem / (618/320*20));
                  .van-popup--bottom{
                    margin-bottom: calc(79rem / (618/320*20));
                  }
                  >ul{
                    width: 100%;
                    display: flex;
                    z-index: 30;
                    li{
                      text-align: center;
                    }
                    li:nth-of-type(1){
                      flex: 2;
                      background: #3d3d3f;
                      display: flex;
                      position: relative;
                      span:nth-of-type(1){
                        position: absolute;
                        top: -25px;
                        left: 10px;
                        display: block;
                        width: calc(89rem / (618/320*20));
                        height: calc(89rem / (618/320*20));
                        background: #3d3d3f;
                        border:.18rem solid #444;
                        border-radius: 50%;
                        font-size: calc(60rem / (618/320*20));
                        font-weight: bold;
                        >i{
                          padding-top: calc(15rem / (618/320*20));
                        }
                        >b{
                          width: calc(30rem / (618/320*20));
                          height: calc(30rem / (618/320*20));
                          background: red;
                          position: absolute;
                          font-size: calc(10rem / (618/320*20));
                          border-radius: 50%;
                          text-align: center;
                          line-height: calc(29rem / (618/320*20));
                        }
                      }
                      span:nth-of-type(2){
                        padding-left: calc(130rem / (618/320*20));
                        font-weight: bold;
                      }
                    }
                    li:nth-of-type(2){
                      background: #535356;
                      counter-reset: white;
                      font-weight: bold;
                      flex: 1;
                    }
                  }
                }
            }
            >div:nth-of-type(2){
              width: 100%;
              height: 100%;
              overflow: auto;
              background: #f5f5f5;
              >div:nth-of-type(1){
                padding: calc(32rem / (618/320*20)) calc(20rem / (618/320*20));
                margin-bottom: calc(20rem / (618/320*20));
                background: white;
                >ul{
                  width: 100%;
                  display: flex;
                  color: #666;
                  >li{
                    flex: 1.5;
                  }
                  >li:nth-of-type(1){
                    text-align: center;
                    >b{
                      font-size: calc(50rem / (618/320*20));
                      color:#f60;
                    }
                    >p:nth-of-type(1){
                      margin-bottom: .1rem;
                    }
                    >p:nth-of-type(2){
                      color: #999;
                    }
                  }
                  >li:nth-of-type(2){
                    flex: 2;
                    >p{
                      display: flex;
                      line-height: calc(40rem / (618/320*20));
                      >span{
                        padding-left: calc(10rem / (618/320*20));
                        color: #f60;
                        font-weight: bold;
                        >div{
                          display: inline;
                          i{
                            font-size: 10px;
                          }
                        }
                      }
                    }
                    >p:nth-of-type(3){
                      span{
                        color: #999;
                        font-weight: 100;
                      }
                    }
                  }
                }
              }
              >div:nth-of-type(2){
                background: white;
                >ul:nth-of-type(1){
                  padding: calc(20rem / (618/320*20));
                  >li{
                    >input{
                      background: #ebf5ff;
                      border: none;
                      color:#6d7885;
                      line-height: calc(50rem / (618/320*20));
                      padding: calc(4rem / (618/320*20));
                      margin: 0rem calc(16rem / (618/320*20)) calc(8rem / (618/320*20)) 0rem;
                      border-radius: 5px;
                    }
                    >input:nth-of-type(3){
                      background: #f5f5f5;
                      color: #aaa;
                    }
                  }
                }
                >ul:nth-of-type(2){
                  padding: 0rem calc(20rem / (618/320*20));
                  >li{
                    display: flex;
                    border-top: 1px solid #f1f1f1;
                    padding: calc(24rem / (618/320*20)) 0rem ;
                    >div:nth-of-type(1){
                      width: calc(60rem / (618/320*20));
                      height: calc(60rem / (618/320*20));
                      border-radius: 50%;
                      overflow: hidden;
                      >img{
                        width: 100%;
                        height: 100%;
                      }
                    }
                    >div:nth-of-type(2){
                      flex: 1;
                      >p{
                        span{
                          >div{
                            display: inline;
                            .van-rate__icon{
                              font-size: 10px;
                              display: inline;
                            }
                          }
                        }
                        >ul{
                          width: 100%;
                          display: flex;
                          li{
                            >img{
                              width: calc(120rem / (618/320*20));
                              height: calc(120rem / (618/320*20));
                              margin-right: calc(20rem / (618/320*20));
                            }
                            >span{
                              display: block;
                              overflow: hidden;
                              text-overflow:ellipsis;
                              white-space: nowrap;
                              width: calc(65rem / (618/320*20));
                              color:#999;
                              border: .025rem solid #ebebeb;
                              padding: .2rem;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
