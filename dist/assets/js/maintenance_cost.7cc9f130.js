(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["maintenance_cost"],{"8f33":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("b-row",[a("b-colxx",{attrs:{xxs:"12"}},[a("b-card",{staticClass:"mb-4",attrs:{title:t.$t("menu.reports.view-maintenance_cost")}},[a("b-row",[a("b-colxx",[a("b-form",{staticClass:"float-end",staticStyle:{"justify-content":"flex-end !important"},attrs:{inline:""}},[a("div",{staticStyle:{"margin-right":"1em !important"}},[a("b-form-input",{staticStyle:{display:"none"},attrs:{type:"text"},model:{value:t.form.start_date,callback:function(e){t.$set(t.form,"start_date","string"===typeof e?e.trim():e)},expression:"form.start_date"}}),t._v(" "),a("datepicker",{attrs:{"default-value":t.today,type:"date",placeholder:"start date","value-type":"format",format:"DD-MM-YYYY"},model:{value:t.form.start_date,callback:function(e){t.$set(t.form,"start_date",e)},expression:"form.start_date"}})],1),t._v(" "),a("div",{staticStyle:{"margin-right":"1em !important"}},[a("b-form-input",{staticStyle:{display:"none"},attrs:{type:"text"},model:{value:t.form.end_date,callback:function(e){t.$set(t.form,"end_date","string"===typeof e?e.trim():e)},expression:"form.end_date"}}),t._v(" "),a("datepicker",{attrs:{"default-value":t.today,type:"date",placeholder:"start date","value-type":"format",format:"DD-MM-YYYY"},model:{value:t.form.end_date,callback:function(e){t.$set(t.form,"end_date",e)},expression:"form.end_date"}})],1),t._v(" "),a("b-button",{staticClass:"ms-1",attrs:{variant:"primary"},on:{click:t.filterByDate}},[t._v("Filter")])],1)],1)],1),t._v(" "),a("datatable",{attrs:{sum:t.sum,searchColumn:t.searchColumns,data:t.maintenance_cost,fields:t.fields}})],1),t._v(" "),a("button",{staticClass:"btn btn-primary",on:{click:function(){t.$router.push("/app/reports")}}},[t._v("Back to reports menu")]),t._v(" "),a("button",{staticClass:"btn btn-outline-success",on:{click:function(e){return e.preventDefault(),t.exportToExcel(e)}}},[t._v("Export to Excel")])],1)],1)],1)},s=[],o=a("cee4"),r=a("2b47"),i=a("268a"),c=a("ec45"),l=(a("411c"),a("25ca")),d={components:{datatable:i["a"],datepicker:c["a"]},data:function(){return{maintenance_cost:[],today:new Date,searchColumns:["date","vehicle","service","cost","sum"],fields:[{name:"date",sortField:"date",title:"Date",titleClass:"",dataClass:"muted-text",width:"20%"},{name:"vehicle",sortField:"vehicle",title:"Vehicle",titleClass:"",dataClass:"muted-text",width:"20%"},{name:"service",sortField:"service",title:"Service",titleClass:"",dataClass:"muted-text",width:"20%"},{name:"__slot:cost",sortField:"cost",title:"Cost",titleClass:"",dataClass:"muted-text",width:"20%"}],form:{start_date:"",end_date:""},sum:0}},methods:{filterByDate:function(){var t=this;o["a"].get(r["a"]+"/reports/maintenance_cost",{headers:{Authorization:"Bearer "+localStorage.getItem("token")},params:{start_date:this.form.start_date,end_date:this.form.end_date}}).then((function(e){e.data.total>0?t.maintenance_cost=e.data.maintenance:t.maintenance_cost=[],t.sum=e.data.total}))},exportToExcel:function(){var t=l["a"].json_to_sheet(this.maintenance_cost),e=l["a"].book_new();l["a"].book_append_sheet(e,t,"Data"),Object(l["b"])(e,"scvr_maintenance_cost.xlsx")},get_maintenance_entries:function(){var t=this;o["a"].get(r["a"]+"/reports/maintenance_cost",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(e){t.maintenance_cost=e.data.maintenance,t.sum=e.data.total}))}},mounted:function(){this.get_maintenance_entries(),null!==localStorage.getItem("token")?this.$store.commit("setUser",JSON.parse(localStorage.getItem("user"))):this.$router.push("/user/login")}},m=d,u=a("2877"),f=Object(u["a"])(m,n,s,!1,null,null,null);e["default"]=f.exports}}]);