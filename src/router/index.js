import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Location',
      component: resolve=>(require(["../components/Home/Location.vue"],resolve)),
    },
    {
      path: '/loactions',
      name: 'Locations',
      component: resolve=>(require(["../components/Home/Locations.vue"],resolve)),
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: resolve=>(require(["../components/SignIn/SignIn.vue"],resolve)),
    },
    {
      path: '/home',
      name: 'HomePage',
      component: resolve=>(require(["../components/Home/HomePage.vue"],resolve)),
      default:'/home/',
      children:[
        {
          path: '/home/',
          name: 'TakeOutFood',
          component: resolve=>(require(["../components/Router/TakeOutFood.vue"],resolve)),
          // default:'/food',
        },
        {
          path: '/home/search',
          name: 'Search',
          component: resolve=>(require(["../components/Router/Search.vue"],resolve)),
        },
        {
          path: '/home/order',
          name: 'Order',
          component: resolve=>(require(["../components/Router/Order.vue"],resolve)),
        },
        {
          path: '/home/my',
          name: 'My',
          component: resolve=>(require(["../components/Router/My.vue"],resolve)),
        },
      ]
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: resolve=>(require(["../components/MyRoute/MyOrder.vue"],resolve)),
    },
    {
      path: '/account',
      name: 'Account',
      component: resolve=>(require(["../components/MyRoute/Account.vue"],resolve)),
    },
    {
      path: '/modifyusername',
      name: 'Modify',
      component: resolve=>(require(["../components/MyRoute/AccountRoute/ModifyUserName.vue"],resolve)),
    },
    {
      path: '/modifypswd',
      name: 'Modify',
      component: resolve=>(require(["../components/MyRoute/AccountRoute/ModifyPsed.vue"],resolve)),
    },
    {
      path: '/foods',
      name: 'SwiperFood',
      component: resolve=>(require(["../components/Router/FoodRoute/SwiperRoute.vue"],resolve)),
    },
    {
      path: '/goodsposition',
      name: 'GoodsPosition',
      component: resolve=>(require(["../components/MyRoute/AccountRoute/GoodsPosition.vue"],resolve)),
    },
    {
      path: '/shop',
      name: 'ShopDetails',
      component: resolve=>(require(["../components/Router/FoodRoute/ShopDetails.vue"],resolve)),
    },
    {
      path: '/shop/shopinformation',
      name: 'ShopInformation',
      component: resolve=>(require(["../components/Router/FoodRoute/ShopRouter/ShopInformation.vue"],resolve)),
    },
    {
      path: '/addpositions',
      name: 'AddPositions',
      component: resolve=>(require(["../components/MyRoute/AccountRoute/AddPositions/AddPositions.vue"],resolve)),
    },
    {
      path: '/addschool',
      name: 'AddSchool',
      component: resolve=>(require(["../components/MyRoute/AccountRoute/AddPositions/AddRouter/AddSchool.vue"],resolve)),
    },
    {
      path: '/settlement',
      name: 'Settlement',
      component: resolve=>(require(["../components/Router/FoodRoute/ShopRouter/ShopSettlement.vue"],resolve)),
    },

  ]
})
