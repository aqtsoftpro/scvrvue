(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["settings"],{c2a8:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-row",[a("b-colxx",{attrs:{xxs:"12"}},[a("h1",[t._v(t._s(t.title))]),t._v(" "),a("div",{staticClass:"mb-2 mt-2"},[a("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.displayOptions",modifiers:{displayOptions:!0}}],staticClass:"pt-0 pl-0 d-inline-block d-md-none",attrs:{variant:"empty"}},[t._v("\n        "+t._s(t.$t("pages.display-options"))+"\n        "),a("i",{staticClass:"simple-icon-arrow-down align-middle"})]),t._v(" "),a("b-collapse",{staticClass:"d-md-block",attrs:{id:"displayOptions"}},[a("div",{staticClass:"d-block d-md-inline-block pt-1"},[a("div",{staticClass:"search-sm d-inline-block float-md-left mr-1 align-top"},[a("b-input",{attrs:{placeholder:t.$t("menu.search")},on:{input:function(e){return t.searchChange(e)}}}),t._v(" "),t.searchColumn?a("div",{staticClass:"mt-2 badge badge-light"},[t._v("Search by "+t._s(t.selectedSearchColumn))]):t._e()],1),t._v(" "),t.searchColumn?a("div",{staticClass:"d-inline-block  ml-2 align-top"},[a("b-dropdown",{staticClass:"d-inline-block",attrs:{id:"ddown2",right:"",text:"Search Column : "+t.searchColumn[0],variant:"outline-dark",size:"xs"}},t._l(t.searchColumn,(function(e,s){return a("b-dropdown-item",{key:s,on:{click:function(a){return t.switchSearchColumn(e)}}},[t._v(t._s(e))])})),1)],1):t._e()]),t._v(" "),a("div",{staticClass:"float-md-right pt-1"},[a("span",{staticClass:"text-muted text-small mr-1 mb-2"},[t._v(t._s(t.from)+"-"+t._s(t.to)+" of "+t._s(t.total))]),t._v(" "),a("b-dropdown",{staticClass:"d-inline-block",attrs:{id:"ddown2",right:"",text:""+t.perPage,variant:"outline-dark",size:"xs"}},t._l(t.pageSizes,(function(e,s){return a("b-dropdown-item",{key:s,on:{click:function(a){return t.changePageSize(e)}}},[t._v(t._s(e))])})),1)],1)])],1),t._v(" "),a("div",{staticClass:"separator mb-5"})])],1)},r=[],o={props:["title","selectAll","isSelectedAll","isAnyItemSelected","keymap","changePageSize","searchChange","from","to","total","perPage","searchColumn","changeSearchColumn"],data:function(){return{categories:[{label:"Cakes",value:"Cakes"},{label:"Cupcakes",value:"Cupcakes"},{label:"Desserts",value:"Desserts"}],statuses:[{text:"ON HOLD",value:"ON HOLD"},{text:"PROCESSED",value:"PROCESSED"}],sortOptions:[{column:"title",label:"Product Name"},{column:"category",label:"Category"},{column:"status",label:"Status"}],pageSizes:[5,10],selectedSearchColumn:null}},methods:{switchSearchColumn:function(t){this.selectedSearchColumn=t,this.changeSearchColumn(t)}},mounted:function(){}},i=o,n=a("2877"),l=Object(n["a"])(i,s,r,!1,null,null,null);e["a"]=l.exports},f6da:function(t,e,a){"use strict";a.r(e);var s,r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-row",[a("b-colxx",{attrs:{xxs:"12"}},[a("h5",{staticClass:"mb-4 card-title"},[t._v(t._s(t.$t("menu.settings")))]),t._v(" "),a("b-row",[a("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"12",lg:"12"}},[a("b-card",{staticClass:"mb-4",attrs:{"no-body":""}},[a("b-tabs",{attrs:{card:"","no-fade":""}},[a("b-tab",{attrs:{title:"User Magagement","v-if":"user_management"==t.$route.query.tab?"active":"","title-item-class":"w-30 text-center"}},[a("user"),t._v(" "),a("b-table",{attrs:{items:t.user_records}})],1),t._v(" "),a("b-tab",{attrs:{title:"Role Management","v-if":"role_management"==this.$route.query.tab?"active":"","title-item-class":"w-30 text-center"}},[a("role"),t._v(" "),a("b-table",{attrs:{items:t.role_records}})],1),t._v(" "),a("b-tab",{attrs:{title:"System Settings","v-if":"system_settings"==t.$route.query.tab?"active":"","title-item-class":"w-30 text-center"}},[a("system_settings"),t._v(" "),a("b-table",{attrs:{items:t.system_settings}})],1)],1)],1)],1)],1)],1)],1)],1)},o=[],i=a("cee4"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-form",[a("b-row",[a("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"4",lg:"4"}},[a("label",{staticClass:"form-group has-top-label"},[a("b-form-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),t._v(" "),a("span",[t._v(t._s(t.$t("forms.role.name")))])],1)])],1),t._v(" "),t.editing_mode?a("div",[a("b-button",{staticClass:"mt-4 mb-4",attrs:{variant:"secondary"},on:{click:function(e){return e.stopPropagation(),t.update_role(t.form.id)}}},[t._v(t._s(" Update"))]),t._v(" "),a("b-button",{staticClass:"mt-4 mb-4",attrs:{variant:"info"},on:{click:function(e){return e.stopPropagation(),t.cancel_update_role()}}},[a("i",{staticClass:"simple-icon-close"})])],1):a("b-button",{staticClass:"mt-4 mb-4",attrs:{variant:"primary"},on:{click:function(e){return e.stopPropagation(),t.save_role(e)}}},[t._v(t._s("Save"))])],1),t._v(" "),a("datatable",{attrs:{title:"Roles",fields:t.fields,data:t.roles,edit:t.edit_role,del:t.delete_role}})],1)},l=[],c=(a("b0c0"),a("5530")),u=a("4a7a"),d=a.n(u),m=(a("6dfc"),a("fa33")),f=a("2b47"),h=a("2f62"),g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-modal",{ref:"deleteModal",attrs:{id:"deleteModal",size:"md",title:"Warning"},scopedSlots:t._u([{key:"modal-footer",fn:function(e){var s=e.cancel;return[a("b-button",{attrs:{size:"sm",variant:"success"},on:{click:function(e){t.del(t.record),t.hideModal()}}},[t._v("\n            Yes\n          ")]),t._v(" "),a("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(t){return s()}}},[t._v("\n            Cancel\n          ")])]}}])},[a("p",[t._v("Are you sure you want to delete the record ?")])]),t._v(" "),a("datatable-heading",{attrs:{searchColumn:t.searchColumn,changePageSize:t.changePageSize,searchChange:t.searchChange,from:t.from,to:t.to,total:t.total,perPage:t.perPage,title:t.title}}),t._v(" "),a("b-row",[a("b-colxx",{attrs:{xxs:"12"}},[a("vuetable",{ref:"vuetable",staticClass:"table-divided order-with-arrow",attrs:{"api-mode":!1,items:t.data,"data-manager":t.dataManager,"query-params":t.makeQueryParams,"per-page":t.perPage,fields:t.fields,"pagination-path":"pagination"},on:{"vuetable:pagination-data":t.onPaginationData},scopedSlots:t._u([{key:"actions",fn:function(e){return[a("b-button",{attrs:{size:"sm",variant:"grey"},on:{click:function(a){return t.edit(e.rowData)}}},[a("i",{staticClass:"simple-icon-pencil"})]),t._v(" "),a("b-button",{attrs:{size:"sm",variant:"grey"},on:{click:function(a){return t.notify(e.rowData)}}},[a("i",{staticClass:"simple-icon-trash"})])]}}])}),t._v(" "),a("vuetable-pagination-bootstrap",{ref:"pagination",staticClass:"mt-4",on:{"vuetable-pagination:change-page":t.onChangePage}})],1)],1)],1)},p=[],b=(a("fb6a"),a("ac1f"),a("841c"),a("c3d0")),v=a("9484"),x=a("c2a8"),C={props:["title","fields","data","edit","del","searchColumn"],components:{vuetable:b["a"],"vuetable-pagination-bootstrap":v["a"],"datatable-heading":x["a"]},data:function(){return{record:{},isLoad:!1,sort:"",page:1,perPage:12,search:"",from:0,to:0,total:0,lastPage:0,items:[],selectedItems:[]}},methods:{notify:function(t){this.$refs.deleteModal.show(),this.record=t},hideModal:function(){this.$refs.deleteModal.hide()},dataManager:function(t,e){if(!(this.data.length<1)){var a=this.data;t.length>0&&(console.log("orderBy:",t[0].sortField,t[0].direction),a=_.orderBy(a,t[0].sortField,t[0].direction)),e=this.$refs.vuetable.makePagination(a.length,this.perPage),console.log("pagination:",e);var s=e.from-1,r=s+this.perPage;return{pagination:e,data:_.slice(a,s,r)}}},makeQueryParams:function(t,e,a){return this.selectedItems=[],t[0]?{sort:t[0]?t[0].field+"|"+t[0].direction:"",page:e,per_page:this.perPage,search:this.search}:{page:e,per_page:this.perPage,search:this.search}},onPaginationData:function(t){this.from=t.from,this.to=t.to,this.total=t.total,this.lastPage=t.last_page,this.items=t.data,this.$refs.pagination.setPaginationData(t)},onChangePage:function(t){this.$refs.vuetable.changePage(t)},changePageSize:function(t){this.perPage=t,this.$refs.vuetable.refresh()},searchChange:function(t){this.search=t,this.$refs.vuetable.refresh()}},computed:{},mounted:function(){},watch:{data:function(t,e){this.$refs.vuetable.refresh()}}},w=C,k=a("2877"),S=Object(k["a"])(w,g,p,!1,null,null,null),y=S.exports,$={components:{"v-select":d.a,Datepicker:m["a"],datatable:y},data:function(){return{searchColumn:["id"],currentPage:1,perPage:10,user:null,editing_mode:!1,roles:[],tax_type_options:[],form:{name:null},fields:[{name:"name",title:"Name",sortField:"name",titleClass:"center aligned",dataClass:"center aligned",width:"5%"},{name:"__slot:actions",title:"Actions",titleClass:"center aligned text-right",dataClass:"center aligned text-right",width:"15%"}]}},computed:Object(c["a"])(Object(c["a"])({},Object(h["c"])(["currentUser"])),{},{rows:function(){return this.roles.length}}),methods:{get_roles:function(){var t=this;i["a"].get(f["a"]+"/role",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.roles=e.data}))},save_role:function(){var t=this;null==this.form.name?this.$notify("error filled","Please fill the form!","Role name is required!",{duration:3e3,permanent:!1}):i["a"].post(f["a"]+"/role",this.form,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.get_roles(),t.reset_form(),t.$store.dispatch("get_role_options"),t.$notify("success filled","Success!","Role Created",{duration:3e3,permanent:!1})}))},edit_role:function(t){var e=this;this.editing_mode=!0,i["a"].get(f["a"]+"/role/"+t.id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){e.form=t.data}))},update_role:function(t){var e=this;i["a"].put(f["a"]+"/role/"+t,this.form,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){e.get_roles(),e.editing_mode=!1,e.reset_form(),e.$store.dispatch("get_role_options"),e.$notify("success filled","Success!","Role Updated",{duration:3e3,permanent:!1})}))},delete_role:function(t){var e=this;i["a"].delete(f["a"]+"/role/"+t.id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){e.get_roles(),e.$store.dispatch("get_role_options"),e.$notify("success filled","Success!","Role Deleted",{duration:3e3,permanent:!1})}))},cancel_update_role:function(){this.editing_mode=!1,this.reset_form()},reset_form:function(){this.form={name:""}}},mounted:function(){null!==localStorage.getItem("token")?this.$store.commit("setUser",JSON.parse(localStorage.getItem("user"))):this.$router.push("/user/login"),this.get_roles()},watch:{currentUser:function(t){this.user=this.currentUser}}},P=$,I=Object(k["a"])(P,n,l,!1,null,null,null),O=I.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-form",[a("b-row",{attrs:{center:""}},[a("b-colxx",{staticClass:"mt-3",attrs:{"lg-offset":"2",xxs:"12",xs:"3",lg:"3"}},[a("label",{staticClass:"form-group has-top-label"},[a("b-form-input",{staticClass:"form-control",attrs:{disabled:""},model:{value:t.form.currency,callback:function(e){t.$set(t.form,"currency",e)},expression:"form.currency"}}),t._v(" "),a("span",[t._v(t._s(t.$t("forms.system_settings.currency")))])],1)]),t._v(" "),a("b-colxx",{staticClass:"mt-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[a("label",{staticClass:"form-group has-top-label"},[a("b-form-input",{staticClass:"form-control",attrs:{disabled:""},model:{value:t.form.timezone,callback:function(e){t.$set(t.form,"timezone",e)},expression:"form.timezone"}}),t._v(" "),a("span",[t._v(t._s(t.$t("forms.system_settings.timezone")))])],1)]),t._v(" "),a("b-colxx",{staticClass:"mt-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[a("label",{staticClass:"form-group has-top-label"},[a("b-form-input",{staticClass:"form-control",attrs:{disabled:""},model:{value:t.form.language,callback:function(e){t.$set(t.form,"language",e)},expression:"form.language"}}),t._v(" "),a("span",[t._v(t._s(t.$t("forms.system_settings.language")))])],1)])],1),t._v(" "),a("b-row",{attrs:{center:""}},[a("b-colxx",{staticClass:"mt-3",attrs:{offset:"2",xxs:"12",xs:"3",lg:"3"}},[a("h4",[t._v("Twilio Settings")])])],1),t._v(" "),a("b-row",{attrs:{center:""}},[a("b-colxx",{staticClass:"mt-3",attrs:{"lg-offset":"2",xxs:"12",xs:"12",lg:"12"}},[a("div",{staticClass:"alert alert-info"},[t._v("\n      Following are "),a("b",[t._v("Tiwilio API")]),t._v(" settings that you need in order to send "),a("b",[t._v("Whatsapp")]),t._v(" invitations in customer section,\n      You can obtain these credentials from your Twilio "),a("b",[t._v('"API Keys"')]),t._v(" section.\n  ")]),t._v(" "),a("label",{staticClass:"form-group has-top-label"},[a("b-form-input",{staticClass:"form-control",model:{value:t.form.twilio_account_sid,callback:function(e){t.$set(t.form,"twilio_account_sid",e)},expression:"form.twilio_account_sid"}}),t._v(" "),a("span",[t._v(t._s(t.$t("forms.system_settings.twilio_account_sid")))])],1)])],1),t._v(" "),a("b-row",{attrs:{center:""}},[a("b-colxx",{staticClass:"mt-3",attrs:{"lg-offset":"2",xxs:"12",xs:"9",lg:"9"}},[a("label",{staticClass:"form-group has-top-label"},[a("b-form-input",{staticClass:"form-control",model:{value:t.form.twilio_auth_token,callback:function(e){t.$set(t.form,"twilio_auth_token",e)},expression:"form.twilio_auth_token"}}),t._v(" "),a("span",[t._v(t._s(t.$t("forms.system_settings.twilio_auth_token")))])],1)])],1),t._v(" "),a("b-row",{attrs:{center:""}},[a("b-colxx",{staticClass:"mt-3",attrs:{"lg-offset":"2",xxs:"12",xs:"9",lg:"9"}},[a("label",{staticClass:"form-group has-top-label"},[a("b-form-input",{staticClass:"form-control",model:{value:t.form.twilio_whatsapp_from,callback:function(e){t.$set(t.form,"twilio_whatsapp_from",e)},expression:"form.twilio_whatsapp_from"}}),t._v(" "),a("span",[t._v(t._s(t.$t("forms.system_settings.twilio_from_number")))])],1)])],1),t._v(" "),a("b-row",{attrs:{center:""}},[a("b-colxx",{staticClass:"mt-3",attrs:{"lg-offset":"2",xxs:"12",xs:"3",lg:"3"}},[a("b-button",{staticClass:"mt-4 mb-4",attrs:{variant:"primary"},on:{click:function(e){return e.stopPropagation(),t.update_settings(e)}}},[t._v(t._s("Save Settings"))])],1)],1)],1)],1)},A=[],U=a("ade3"),B=(a("e1b3"),s={components:{"v-select":d.a,Datepicker:m["a"]},data:function(){return{user:null,editing_mode:!1,mechanic_records:[],form:{currency:"AUD",timezone:"GMT +5",language:"English",twilio_account_sid:"",twilio_auth_token:"",twilio_from_number:""},tax_fields:["name","workshop_contact","workshop_address","expertise","actions"]}},computed:Object(c["a"])({},Object(h["c"])(["currentUser"])),methods:{get_mechanic_records:function(){var t=this;i["a"].get(f["a"]+"/mechanic",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.mechanic_records=e.data}))},save_mechanic_record:function(){var t=this;i["a"].post(f["a"]+"/mechanic",this.form,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.get_mechanic_records(),t.reset_form()}))},edit_mechanic_record:function(t){var e=this;this.editing_mode=!0,i["a"].get(f["a"]+"/mechanic/"+t.id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){e.form=t.data}))},update_mechanic_record:function(t){var e=this;i["a"].put(f["a"]+"/mechanic/"+t,this.form,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){e.get_mechanic_records(),e.editing_mode=!1,e.reset_form()}))},delete_mechanic_record:function(t){var e=this;i["a"].delete(f["a"]+"/mechanic/"+t.id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){e.get_tax_records()}))},cancel_update_mechanic_record:function(){this.editing_mode=!1,this.reset_form()},reset_form:function(){this.form={name:"",workshop_contact:"",workshop_address:"",expertise:""}}},mounted:function(){null!==localStorage.getItem("token")?this.$store.commit("setUser",JSON.parse(localStorage.getItem("user"))):this.$router.push("/user/login"),console.log("hello"),this.get_settings()}},Object(U["a"])(s,"methods",{get_settings:function(){var t=this;i["a"].get(f["a"]+"/settings",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.form.twilio_account_sid=e.data.TWILIO_ACCOUNT_SID,t.form.twilio_auth_token=e.data.TWILIO_AUTH_TOKEN,t.form.twilio_whatsapp_from=e.data.TWILIO_WHATSAPP_FROM}))},update_settings:function(){var t=this;i["a"].put(f["a"]+"/settings/1",{TWILIO_ACCOUNT_SID:this.form.twilio_account_sid,TWILIO_AUTH_TOKEN:this.form.twilio_auth_token,TWILIO_WHATSAPP_FROM:this.form.twilio_whatsapp_from}).then((function(e){t.$notify("success","Success!","Settings Updated",3e3,!1)}))}}),Object(U["a"])(s,"watch",{currentUser:function(){this.user=this.currentUser}}),s),D=B,T=Object(k["a"])(D,z,A,!1,null,null,null),j=T.exports,N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-form",[a("b-row",[a("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[a("label",{staticClass:"form-group has-top-label"},[a("b-form-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),t._v(" "),a("span",[t._v(t._s(t.$t("forms.user.name")))])],1)]),t._v(" "),a("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[a("label",{staticClass:"form-group has-top-label"},[a("b-form-input",{model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),t._v(" "),a("span",[t._v(t._s(t.$t("forms.user.email")))])],1)]),t._v(" "),a("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[a("label",{staticClass:"form-group has-top-label"},[a("v-select",{attrs:{reduce:function(t){return t.id},label:"name",options:t.role_options},model:{value:t.form.role_id,callback:function(e){t.$set(t.form,"role_id",e)},expression:"form.role_id"}}),t._v(" "),a("span",[t._v(t._s(t.$t("forms.user.role")))])],1)]),t._v(" "),a("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[a("label",{staticClass:"form-group has-top-label"},[t.user&&1==t.user.role_id?a("b-form-input",{ref:"passwordField",attrs:{type:t.passwordVisibility},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}):t._e(),t._v(" "),a("span",[t._v(t._s(t.$t("forms.user.password")))])],1),t._v(" "),a("b-button",{staticClass:"mt-4 mb-4",attrs:{variant:"light"},on:{click:function(e){return e.stopPropagation(),t.show_hide_password()}}},[t._v(t._s(" Show/Hide Password"))])],1)],1),t._v(" "),t.editing_mode?a("div",[a("b-button",{staticClass:"mt-4 mb-4",attrs:{variant:"info"},on:{click:function(e){return e.stopPropagation(),t.update_user_record(t.user_id)}}},[t._v(t._s(" Update"))]),t._v(" "),a("b-button",{staticClass:"mt-4 mb-4",attrs:{variant:"danger"},on:{click:function(e){return e.stopPropagation(),t.cancel_update_user_record()}}},[a("i",{staticClass:"simple-icon-close"})])],1):a("b-button",{staticClass:"mt-4 mb-4",attrs:{variant:"primary"},on:{click:function(e){return e.stopPropagation(),t.save_user_record(e)}}},[t._v(t._s("Save"))])],1),t._v(" "),a("datatable",{attrs:{title:"User Records",fields:t.fields,data:t.user_records,edit:t.edit_user_record,del:t.delete_user_record}})],1)},E=[],R={components:{"v-select":d.a,Datepicker:m["a"],datatable:y},data:function(){return{passwordVisibility:"password",user:null,perPage:10,currentPage:1,editing_mode:!1,user_records:[],role_options:[],role_id:null,user_id:null,form:{name:null,email:null,role_id:"",password:null},fields:[{name:"name",title:"Name",sortField:"name",titleClass:"center aligned",dataClass:"center aligned",width:"5%"},{name:"email",title:"E-Mail",sortField:"email",titleClass:"center aligned",dataClass:"center aligned",width:"5%"},{name:"role_name",title:"Role Name",sortField:"role_name",titleClass:"center aligned",dataClass:"center aligned",width:"5%"},{name:"__slot:actions",title:"Actions",titleClass:"center aligned text-right",dataClass:"center aligned text-right",width:"15%"}]}},computed:Object(c["a"])(Object(c["a"])({},Object(h["c"])(["currentUser","roleOptions"])),{},{rows:function(){return this.user_records.length}}),methods:{show_hide_password:function(){"password"==this.passwordVisibility?this.passwordVisibility="text":this.passwordVisibility="password"},get_user_records:function(){var t=this;i["a"].get(f["a"]+"/users",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.user_records=e.data}))},save_user_record:function(){var t=this;null==this.form.name?this.$notify("error filled","Please fill the form!","Name is required!",{duration:3e3,permanent:!1}):null==this.form.email?this.$notify("error filled","Please fill the form!","Email is required!",{duration:3e3,permanent:!1}):"Select Role"==this.form.role_id?this.$notify("error filled","Please fill the form!","Role is required!",{duration:3e3,permanent:!1}):null==this.form.password?this.$notify("error filled","Please fill the form!","Password is required!",{duration:3e3,permanent:!1}):i["a"].post(f["a"]+"/users",this.form,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.get_user_records(),t.reset_form(),t.$notify("success filled","Suceess!","User has been created!",{duration:3e3,permanent:!1})}))},edit_user_record:function(t){var e=this;this.editing_mode=!0,i["a"].get(f["a"]+"/users/"+t.id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){e.form.name=t.data.name,e.form.email=t.data.email,e.form.role_id=t.data.role_id,e.user_id=t.data.id}))},update_user_record:function(t){var e=this;i["a"].put(f["a"]+"/users/"+t,this.form,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){e.get_user_records(),e.editing_mode=!1,e.reset_form(),e.$notify("success filled","Suceess!","User has been updated!",{duration:3e3,permanent:!1})}))},delete_user_record:function(t){var e=this;i["a"].delete(f["a"]+"/users/"+t.id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){e.get_user_records(),e.$notify("success filled","Suceess!","User has been deleted!",{duration:3e3,permanent:!1})}))},cancel_update_user_record:function(){this.editing_mode=!1,this.reset_form()},reset_form:function(){this.form={name:null,email:null,role_id:"Select Role"}}},mounted:function(){this.$store.dispatch("get_role_options"),null!==localStorage.getItem("token")?this.$store.commit("setUser",JSON.parse(localStorage.getItem("user"))):this.$router.push("/user/login"),this.get_user_records()},watch:{currentUser:function(){this.user=this.currentUser},roleOptions:function(t){this.role_options=t,console.log("val",this.roleOptions)}}},M=R,F=Object(k["a"])(M,N,E,!1,null,null,null),W=F.exports,q={components:{role:O,user:W,system_settings:j},data:function(){return{user_records:[],role_records:[],system_settings:[]}},methods:{get_role_records:function(){var t=this;i["a"].get(f["a"]+"/role",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.role_records=e.data}))},get_customer_records:function(){var t=this;i["a"].get(f["a"]+"/customer",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.customer_records=e.data}))},get_mechanic_workshop_records:function(){var t=this;i["a"].get(f["a"]+"/mechanic",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.mechanic_workshop_records=e.data}))},get_user_records:function(){i["a"].get(f["a"]+"/users",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(t){}))}},mounted:function(){null!==localStorage.getItem("token")?this.$store.commit("setUser",JSON.parse(localStorage.getItem("user"))):this.$router.push("/user/login")}},L=q,H=Object(k["a"])(L,r,o,!1,null,null,null);e["default"]=H.exports}}]);