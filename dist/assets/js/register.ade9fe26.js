(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register"],{1348:function(e,r,s){"use strict";s.r(r);var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("b-row",{staticClass:"h-100"},[s("b-colxx",{staticClass:"mx-auto my-auto",attrs:{xxs:"12",md:"10"}},[s("router-link",{attrs:{tag:"a",to:"/"}},[s("span",{staticClass:"logo-single"})]),e._v(" "),1!=e.registration?s("h6",{staticClass:"mb-4"},[e._v(e._s(e.$t("user.register")))]):e._e(),e._v(" "),s("b-card",{staticClass:"auth-card"},[1==e.registration?s("div",[s("h1",{staticClass:"text-success"},[e._v("Congratulations!")]),e._v(" "),s("h3",[s("br"),e._v('You have been registered as a customer in "Super Cheap Van Rentals" Database.')])]):s("div",[s("b-row",[s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.first_name")))]),e._v(" "),s("b-form-input",{model:{value:e.form.first_name,callback:function(r){e.$set(e.form,"first_name",r)},expression:"form.first_name"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.last_name")))]),e._v(" "),s("b-form-input",{model:{value:e.form.last_name,callback:function(r){e.$set(e.form,"last_name",r)},expression:"form.last_name"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.email")))]),e._v(" "),s("b-form-input",{model:{value:e.form.email,callback:function(r){e.$set(e.form,"email",r)},expression:"form.email"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.phone_number")))]),e._v(" "),s("b-form-input",{model:{value:e.form.phone_number,callback:function(r){e.$set(e.form,"phone_number",r)},expression:"form.phone_number"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.address")))]),e._v(" "),s("b-form-input",{model:{value:e.form.address,callback:function(r){e.$set(e.form,"address",r)},expression:"form.address"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.dob")))]),e._v(" "),s("datepicker",{attrs:{"bootstrap-styling":!0},model:{value:e.form.dob,callback:function(r){e.$set(e.form,"dob",r)},expression:"form.dob"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.gender")))]),e._v(" "),s("v-select",{attrs:{reduce:function(e){return e.id},label:"name","aria-placeholder":"Select Gender",options:[{id:1,name:"Male"},{id:2,name:"Female"}]},model:{value:e.form.gender,callback:function(r){e.$set(e.form,"gender",r)},expression:"form.gender"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.occupation")))]),e._v(" "),s("b-form-input",{model:{value:e.form.occupation,callback:function(r){e.$set(e.form,"occupation",r)},expression:"form.occupation"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.driver_licence_number")))]),e._v(" "),s("b-form-input",{model:{value:e.form.driver_licence_number,callback:function(r){e.$set(e.form,"driver_licence_number",r)},expression:"form.driver_licence_number"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.driver_licence_front_picture")))]),e._v(" "),s("b-file",{model:{value:e.form.driver_licence_front_picture,callback:function(r){e.$set(e.form,"driver_licence_front_picture",r)},expression:"form.driver_licence_front_picture"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.driver_licence_back_picture")))]),e._v(" "),s("b-file",{model:{value:e.form.driver_licence_back_picture,callback:function(r){e.$set(e.form,"driver_licence_back_picture",r)},expression:"form.driver_licence_back_picture"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.driver_licence_expiry")))]),e._v(" "),s("datepicker",{attrs:{"bootstrap-styling":!0},model:{value:e.form.driver_licence_expiry,callback:function(r){e.$set(e.form,"driver_licence_expiry",r)},expression:"form.driver_licence_expiry"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.secondary_id_number")))]),e._v(" "),s("b-form-input",{model:{value:e.form.secondary_id_number,callback:function(r){e.$set(e.form,"secondary_id_number",r)},expression:"form.secondary_id_number"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.secondary_id_front_picture")))]),e._v(" "),s("b-file",{attrs:{file:""},model:{value:e.form.secondary_id_front_picture,callback:function(r){e.$set(e.form,"secondary_id_front_picture",r)},expression:"form.secondary_id_front_picture"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.secondary_id_back_picture")))]),e._v(" "),s("b-file",{attrs:{file:""},model:{value:e.form.secondary_id_back_picture,callback:function(r){e.$set(e.form,"secondary_id_back_picture",r)},expression:"form.secondary_id_back_picture"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.secondary_id_expiry")))]),e._v(" "),s("datepicker",{attrs:{"bootstrap-styling":!0},model:{value:e.form.secondary_id_expiry,callback:function(r){e.$set(e.form,"secondary_id_expiry",r)},expression:"form.secondary_id_expiry"}})],1),e._v(" "),s("b-colxx",{staticClass:"mb-3",attrs:{xxs:"12",xs:"3",lg:"3"}},[s("label",[e._v(e._s(e.$t("forms.customer.nationality")))]),e._v(" "),s("b-form-input",{model:{value:e.form.nationality,callback:function(r){e.$set(e.form,"nationality",r)},expression:"form.nationality"}})],1)],1),e._v(" "),s("b-button",{staticClass:"mt-4 mb-4",attrs:{variant:"primary"},on:{click:function(r){return r.stopPropagation(),e.save_customer_record(r)}}},[e._v(e._s("Save Customer Information"))])],1)])],1)],1)},a=[],o=s("cee4"),l=s("4a7a"),c=s.n(l),n=(s("6dfc"),s("fa33")),i=s("2b47"),_={components:{"v-select":c.a,Datepicker:n["a"]},data:function(){return{registration:0,form:{first_name:null,last_name:null,email:null,phone_number:null,address:null,dob:null,gender:null,occupation:null,driver_licence_number:null,driver_licence_front_picture:null,driver_licence_back_picture:null,driver_licence_expiry:null,nationality:null,secondary_id_number:null,secondary_id_front_picture:null,secondary_id_back_picture:null,secondary_id_expiry:null}}},methods:{save_customer_record:function(){var e=this;o["a"].post(i["a"]+"/register-customer",this.form,{headers:{"content-type":"multipart/form-data"}}).then((function(r){e.registration=1,e.$notify("success filled","Success!","You have successfully completed your registration",{duration:3e3,permanent:!1})})).catch((function(r){e.$notify("error filled","Error!",r.response.data.message,{duration:3e3,permanent:!1})}))}}},m=_,u=s("2877"),f=Object(u["a"])(m,t,a,!1,null,null,null);r["default"]=f.exports}}]);