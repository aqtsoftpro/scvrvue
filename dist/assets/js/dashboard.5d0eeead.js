(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{7156:function(t,a,e){var s=e("861d"),r=e("d2bb");t.exports=function(t,a,e){var i,l;return r&&"function"==typeof(i=a.constructor)&&i!==e&&s(l=i.prototype)&&l!==e.prototype&&r(t,l),t}},7205:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("b-row",[e("b-colxx",{attrs:{"offset-md":"4",xs:"12",md:"4"}},[e("b-card",{staticClass:"van-stats mb-4"},[e("i",{staticClass:" iconsminds-arrow-up-2"}),t._v(" "),e("span",[t._v("VEHICLES OUT")]),t._v(" "),e("b-badge",{staticClass:"ml-2 mr-2"},[t._v(t._s(t.vanout_count))]),t._v(" "),e("i",{staticClass:" iconsminds-arrow-down-2"}),t._v(" "),e("span",[t._v("VEHICLES IN")]),t._v(" "),e("b-badge",{staticClass:"ml-2 mr-2"},[t._v(t._s(t.vanreturn_count))])],1)],1)],1),t._v(" "),e("b-row",[e("b-colxx",{attrs:{xs:"12",md:"4"}},[e("icon-card",{attrs:{title:"Vans (Available / Total)",icon:"iconsminds-bus-2",value:t.available_vans+" / "+t.vans}}),t._v(" "),e("icon-card",{attrs:{title:"Cars (Available / Total)",icon:"iconsminds-car",value:t.available_cars+" / "+t.cars}})],1),t._v(" "),t.vanouts?e("b-colxx",{attrs:{xs:"12",md:"4"}},[t.vanouts.length>0?e("b-card",{attrs:{title:t.$t("dashboards.due")}},[e("vue-perfect-scrollbar",{staticClass:"scroll dashboard-list-with-thumbs",attrs:{settings:{suppressScrollX:!0,wheelPropagation:!1}}},t._l(t.vanouts.slice(0,6),(function(t){return e("recent-order-item",{key:t.id,attrs:{order:t,"detail-path":"/app/van-rental-detail/"+t.id}})})),1)],1):e("b-card",{staticClass:"mb-4",attrs:{title:t.$t("dashboards.due")}},[t._v("\n          No Vehicle returning in next 7 days\n        ")])],1):t._e(),t._v(" "),e("b-colxx",{attrs:{xs:"12",md:"4"}},[e("b-card",{attrs:{title:t.$t("dashboards.recent")}},[e("vue-perfect-scrollbar",{staticClass:"scroll dashboard-list-with-thumbs",attrs:{settings:{suppressScrollX:!0,wheelPropagation:!1}}},t._l(t.available_vehicles,(function(a){return e("div",{key:a.id,staticClass:"d-flex flex-row mb-3"},[e("router-link",{staticClass:"d-block position-relative",attrs:{tag:"a",to:{path:"van_management/vehicle_detail/"+a.vehicle_id}}},[e("img",{staticClass:"list-thumbnail border-0",staticStyle:{width:"100px!important"},attrs:{src:a.img,alt:a.img}}),t._v(" "),e("b-badge",{staticClass:"position-absolute badge-top-right",attrs:{variant:"info",pill:""}},[t._v(t._s(a.vehicle_type))])],1),t._v(" "),e("div",{staticClass:"pl-3 pt-2 pr-2 pb-2"},[e("router-link",{attrs:{tag:"a",to:{path:"/app/van_management/vehicle_detail/"+a.vehicle_id}}},[e("p",{staticClass:"list-item-heading"},[t._v(t._s(a.vehicle_make_model))]),t._v(" "),e("div",{staticClass:"pr-4"},[e("p",{staticClass:"text-muted mb-1 text-small"},[t._v(t._s(a.vehicle_reg_number))])]),t._v(" "),e("div",{staticClass:"text-primary text-small font-weight-medium d-none d-sm-block"},[t._v(t._s(a.condition))])])],1)],1)})),0)],1)],1)],1)],1)},r=[],i=(e("a9e3"),e("5530")),l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"d-flex flex-row mb-3"},[e("router-link",{staticClass:"d-block position-relative",attrs:{tag:"a",to:t.detailPath}},[e("img",{staticClass:"list-thumbnail border-0",staticStyle:{width:"100px!important"},attrs:{src:t.order.img,alt:t.order.title}}),t._v(" "),e("b-badge",{staticClass:"position-absolute badge-top-right",attrs:{variant:"info",pill:""}},[t._v(t._s(t.order.category))])],1),t._v(" "),e("div",{staticClass:"pl-3 pt-2 pr-2 pb-2"},[e("router-link",{attrs:{tag:"a",to:t.detailPath}},[e("p",{staticClass:"list-item-heading"},[t._v(t._s(t.order.category))]),t._v(" "),e("div",{staticClass:"pr-4"},[e("p",{staticClass:"text-muted mb-1 text-small"},[t._v(t._s(t.order.title))])]),t._v(" "),e("div",{staticClass:"text-primary text-small font-weight-medium d-none d-sm-block"},[t._v(t._s(t.order.due_return))])])],1)],1)},n=[],o={props:["order","detailPath","key"]},c=o,d=e("2877"),u=Object(d["a"])(c,l,n,!1,null,null,null),v=u.exports,_=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"icon-row-item"},[e("b-card",{staticClass:"mb-4 text-center"},[e("i",{class:t.icon,staticStyle:{"font-size":"50px"}}),t._v(" "),e("p",{staticClass:"card-text font-weight-semibold mb-0"},[t._v(t._s(t.title))]),t._v(" "),e("p",{staticClass:"lead text-center"},[t._v(t._s(t.value))])])],1)},b=[],m={props:{title:{type:String,default:"icon-card-title"},icon:{type:String,default:"iconsminds-clock"},value:{default:0}}},p=m,h=(e("a067"),Object(d["a"])(p,_,b,!1,null,null,null)),f=h.exports,g=e("cee4"),C=e("2f62"),x=(e("9d63"),e("2b47")),N={components:{"recent-order-item":v,"icon-card":f},data:function(){return{available_cars:null,cars:null,available_vans:null,vans:null,vanout_count:null,vanreturn_count:null,vanouts:[],available_vehicles:[]}},computed:Object(i["a"])({},Object(C["c"])(["currentUser","isLoggedIn","processing"])),methods:{refreshButtonClick:function(){console.log("refreshButtonClick")},get_dashboard_data:function(){var t=this;this.$store.commit("setProcessing",!0),g["a"].get(x["a"]+"/dashboard_data",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(a){t.available_cars=Number(a.data.available_cars),t.cars=Number(a.data.cars),t.available_vans=Number(a.data.available_vans),t.vans=Number(a.data.vans),t.vanout_count=Number(a.data.vanout_count),t.vanreturn_count=Number(a.data.vanreturn_count),t.vanouts=a.data.vanouts,t.available_vehicles=a.data.vanins,t.$store.commit("setProcessing",!1)}))}},mounted:function(){null!==localStorage.getItem("token")?this.$store.commit("setUser",JSON.parse(localStorage.getItem("user"))):this.$router.push("/user/login"),this.get_dashboard_data()}},I=N,w=Object(d["a"])(I,s,r,!1,null,null,null);a["default"]=w.exports},9870:function(t,a,e){},a067:function(t,a,e){"use strict";var s=e("9870"),r=e.n(s);r.a},a9e3:function(t,a,e){"use strict";var s=e("83ab"),r=e("da84"),i=e("94ca"),l=e("6eeb"),n=e("5135"),o=e("c6b6"),c=e("7156"),d=e("c04e"),u=e("d039"),v=e("7c73"),_=e("241c").f,b=e("06cf").f,m=e("9bf2").f,p=e("58a8").trim,h="Number",f=r[h],g=f.prototype,C=o(v(g))==h,x=function(t){var a,e,s,r,i,l,n,o,c=d(t,!1);if("string"==typeof c&&c.length>2)if(c=p(c),a=c.charCodeAt(0),43===a||45===a){if(e=c.charCodeAt(2),88===e||120===e)return NaN}else if(48===a){switch(c.charCodeAt(1)){case 66:case 98:s=2,r=49;break;case 79:case 111:s=8,r=55;break;default:return+c}for(i=c.slice(2),l=i.length,n=0;n<l;n++)if(o=i.charCodeAt(n),o<48||o>r)return NaN;return parseInt(i,s)}return+c};if(i(h,!f(" 0o1")||!f("0b1")||f("+0x1"))){for(var N,I=function(t){var a=arguments.length<1?0:t,e=this;return e instanceof I&&(C?u((function(){g.valueOf.call(e)})):o(e)!=h)?c(new f(x(a)),e,I):x(a)},w=s?_(f):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;w.length>k;k++)n(f,N=w[k])&&!n(I,N)&&m(I,N,b(f,N));I.prototype=g,g.constructor=I,l(r,h,I)}}}]);