<template>
  <div class="ShopInformation_aDiv">
    <Headers :ShopInfo=true></Headers>
    <content>
      adfsfs
    </content>
  </div>
</template>

<script>
import Headers from '../../../Headers/Headers'
import axios from 'axios'
export default {
  name:'ShopInformation_aDiv',
  data(){
    return{
      UserCode:''
    }
  },
  methods:{

  },
  mounted(){
    if(localStorage.getItem('Code')){
      var Code=JSON.parse(localStorage.getItem('Code'))
      this.UserCode=Code
    }
    axios.get(`http://elm.cangdu.org/v1/user?user_id=${this.UserCode}`).then((res)=>{
      console.log(res)
    })
  },
  components:{
    Headers
  }
}
</script>

<style>

</style>
