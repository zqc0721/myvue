webpackJsonp([10],{AmUQ:function(t,o){},vDdv:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e("OC4A"),s=e("mtWM"),i=e.n(s),a={name:"AddSchool",data:function(){return{School:"",List:[],DivFlag:!0}},methods:{AddSchool:function(){var t=this;i.a.get("http://elm.cangdu.org/v1/pois?type=nearby&keyword="+this.School).then(function(o){t.List=o.data,console.log(o),t.List.length>0?t.DivFlag=!1:t.DivFlag=!0})},RouterPositions:function(t,o,e){console.log(t,o,e),this.$router.push({name:"AddPositions",params:{Positions:t,Geohash:o}})}},mounted:function(){},components:{Headers:n.a}},l={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"AddSchool"},[e("Headers",{attrs:{AddSchool:!0}}),t._v(" "),e("content",[e("p",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.School,expression:"School"}],attrs:{type:"text",placeholder:"请输入小区/写字楼/学校等"},domProps:{value:t.School},on:{input:function(o){o.target.composing||(t.School=o.target.value)}}}),e("input",{attrs:{type:"button",value:"确认"},on:{click:function(o){return t.AddSchool()}}})]),t._v(" "),e("div",[e("p",[t._v("为了满足商家的送餐要求，建议您从列表中选择地址")]),t._v(" "),t.DivFlag?e("div",[e("p",[t._v("找不到地址？")]),t._v(" "),e("p",[t._v("请尝试输入小区、写字楼或学校名")]),t._v(" "),e("p",[t._v("详细地址（如门牌号）可稍后输入哦。")])]):e("ul",t._l(t.List,function(o,n){return e("li",{key:n,on:{click:function(e){return t.RouterPositions(o.name,o.geohash,o.address)}}},[t._v("\n          "+t._s(o.name)+"\n          "),e("span",[t._v(t._s(o.address))])])}),0)])])],1)},staticRenderFns:[]};var r=e("VU/8")(a,l,!1,function(t){e("AmUQ")},null,null);o.default=r.exports}});