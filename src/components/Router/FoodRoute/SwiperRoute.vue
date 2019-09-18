<template>
  <div class="SwiperFood_aDiv">
    <Headers :PositionAFood=true></Headers>
    <content>
      <!-- <ul>
        <li v-for="(i,index) in Arr" :key="index">
          {{i.address}}
        </li>
      </ul> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        />
      </van-list>
    </content>
  </div>
</template>

<script>
import Headers from '../../Headers/Headers'
import axios from 'axios'
import Vue from 'vue';
import { List } from 'vant';
Vue.use(List);
export default {
  name:'SwiperFood',
  data(){
    return{
      Arr:[],
      list: [],
      loading: false,
      finished: false
    }
  },
  methods:{
    ObtainData(){
      axios.get(`http://elm.cangdu.org/shopping/restaurants?latitude=39.78493&longitude=116.49476&offset=0&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`).then((req)=>{
        this.Arr=req.data;
        console.log(req)
      })
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 100) {  
          this.finished = true;
        }
      }, 500);
    }
  },
  mounted(){
    this.ObtainData();
    console.log(this.list)
  },
  components:{
    Headers,
  }
}
</script>

<style lang='scss'>
.SwiperFood_aDiv{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  content{
    flex: 1;
    overflow: auto;
  }
}
</style>
