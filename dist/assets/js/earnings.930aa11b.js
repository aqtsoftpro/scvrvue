(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["earnings"],{"34d7":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-row",[a("b-colxx",{attrs:{xxs:"12"}},[a("b-card",{staticClass:"mb-4",attrs:{title:t.$t("menu.reports.view-earnings")}},[a("b-row",[a("b-colxx",[a("b-form",{staticClass:"float-end",attrs:{inline:""}},[a("b-form-input",{staticStyle:{display:"none"},attrs:{type:"text"},model:{value:t.form.start_date,callback:function(e){t.$set(t.form,"start_date","string"===typeof e?e.trim():e)},expression:"form.start_date"}}),t._v(" "),a("datepicker",{attrs:{"default-value":t.today,type:"datetime",placeholder:"start date","value-type":"format",format:"DD-MM-YYYY"},model:{value:t.form.start_date,callback:function(e){t.$set(t.form,"start_date",e)},expression:"form.start_date"}}),t._v(" "),a("b-form-input",{staticStyle:{display:"none"},attrs:{type:"text"},model:{value:t.form.end_date,callback:function(e){t.$set(t.form,"end_date","string"===typeof e?e.trim():e)},expression:"form.end_date"}}),t._v(" "),a("datepicker",{attrs:{"default-value":t.today,type:"datetime",placeholder:"start date","value-type":"format",format:"DD-MM-YYYY"},model:{value:t.form.end_date,callback:function(e){t.$set(t.form,"end_date",e)},expression:"form.end_date"}}),t._v(" "),a("b-button",{staticClass:"ms-1",attrs:{variant:"primary"},on:{click:t.filterByDate}},[t._v("Filter")])],1)],1)],1),t._v(" "),a("datatable",{attrs:{sum:t.sum,searchColumn:t.searchColumns,data:t.earnings,fields:t.fields}})],1),t._v(" "),a("button",{staticClass:"btn btn-primary",on:{click:function(){t.$router.push("/app/reports")}}},[t._v("Back to reports menu")]),t._v(" "),a("button",{staticClass:"btn btn-outline-success",on:{click:function(e){return e.preventDefault(),t.exportToExcel(e)}}},[t._v("Export to Excel")])],1)],1)],1)},r=[],n=a("cee4"),o=a("2b47"),i=a("268a"),l=a("ec45"),d=(a("411c"),a("25ca")),c={components:{datatable:i["a"],datepicker:l["a"]},data:function(){return{today:new Date,earnings:[],sum:0,searchColumns:["vehicle","date","amount"],fields:[{name:"vehicle",sortField:"vehicle",title:"Vehicle",titleClass:"",dataClass:"muted-text",width:"20%"},{name:"date",sortField:"date",title:"Date",titleClass:"",dataClass:"muted-text",width:"20%"},{name:"__slot:amount",sortField:"amount",title:"Amount",titleClass:"",dataClass:"muted-text",width:"20%"}],form:{start_date:"",end_date:""}}},methods:{filterByDate:function(){var t=this;n["a"].get(o["a"]+"/reports/earnings",{headers:{Authorization:"Bearer "+localStorage.getItem("token")},params:{start_date:this.form.start_date,end_date:this.form.end_date}}).then((function(e){t.earnings=e.data.earnings,t.sum=e.data.total}))},exportToExcel:function(){var t=d["a"].json_to_sheet(this.earnings),e=d["a"].book_new();d["a"].book_append_sheet(e,t,"Data"),Object(d["b"])(e,"scvr_earnings.xlsx")},get_earnings:function(){var t=this;n["a"].get(o["a"]+"/reports/earnings",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.earnings=e.data.earnings,t.sum=e.data.total}))}},mounted:function(){this.get_earnings(),null!==localStorage.getItem("token")?this.$store.commit("setUser",JSON.parse(localStorage.getItem("user"))):this.$router.push("/user/login")}},u=c,m=a("2877"),f=Object(m["a"])(u,s,r,!1,null,null,null);e["default"]=f.exports}}]);