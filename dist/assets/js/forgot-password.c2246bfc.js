(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["forgot-password"],{"37cb":function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("b-row",{staticClass:"h-100"},[a("b-colxx",{staticClass:"mx-auto my-auto",attrs:{xxs:"12",md:"10"}},[a("b-card",{staticClass:"auth-card",attrs:{"no-body":""}},[a("div",{staticClass:"position-relative image-side"},[a("p",{staticClass:"text-white h2"},[s._v(s._s(s.$t("dashboards.magic-is-in-the-details")))]),s._v(" "),a("p",{staticClass:"white mb-0"},[s._v("\r\n                    Please use your e-mail to reset your password.\r\n                    "),a("br"),s._v("If you are not a member, please\r\n                    "),a("router-link",{staticClass:"white",attrs:{tag:"a",to:"/user/register"}},[s._v("register")]),s._v(".\r\n                ")],1)]),s._v(" "),a("div",{staticClass:"form-side"},[a("router-link",{attrs:{tag:"a",to:"/"}},[a("span",{staticClass:"logo-single"})]),s._v(" "),a("h6",{staticClass:"mb-4"},[s._v(s._s(s.$t("user.forgot-password")))]),s._v(" "),a("b-form",{staticClass:"av-tooltip tooltip-label-bottom",on:{submit:function(t){return t.preventDefault(),s.formSubmit(t)}}},[a("b-form-group",{staticClass:"has-float-label mb-4",attrs:{label:s.$t("user.email")}},[a("b-form-input",{attrs:{type:"text",state:!s.$v.form.email.$error},model:{value:s.$v.form.email.$model,callback:function(t){s.$set(s.$v.form.email,"$model",t)},expression:"$v.form.email.$model"}}),s._v(" "),s.$v.form.email.required?s.$v.form.email.email?s.$v.form.email.minLength?s._e():a("b-form-invalid-feedback",[s._v("Your email must be minimum 4 characters")]):a("b-form-invalid-feedback",[s._v("Please enter a valid email address")]):a("b-form-invalid-feedback",[s._v("Please enter your email address")])],1),s._v(" "),a("div",{staticClass:"d-flex justify-content-between align-items-center"},[a("router-link",{attrs:{tag:"a",to:"/user/forgot-password"}},[s._v(s._s(s.$t("user.forgot-password-question")))]),s._v(" "),a("b-button",{class:{"btn-multiple-state btn-shadow":!0,"show-spinner":s.processing,"show-success":!s.processing&&!1===s.loginError,"show-fail":!s.processing&&s.loginError},attrs:{type:"submit",variant:"primary",size:"lg",disabled:s.processing}},[a("span",{staticClass:"spinner d-inline-block"},[a("span",{staticClass:"bounce1"}),s._v(" "),a("span",{staticClass:"bounce2"}),s._v(" "),a("span",{staticClass:"bounce3"})]),s._v(" "),a("span",{staticClass:"icon success"},[a("i",{staticClass:"simple-icon-check"})]),s._v(" "),a("span",{staticClass:"icon fail"},[a("i",{staticClass:"simple-icon-exclamation"})]),s._v(" "),a("span",{staticClass:"label"},[s._v(s._s(s.$t("user.reset-password-button")))])]),s._v(" "),a("router-link",{attrs:{to:{path:"/user/login"},variant:"secondary",size:"sm"}},[s._v("Signin")])],1)],1)],1)])],1)],1)},i=[],r=a("5530"),o=a("2f62"),n=a("1dce"),l=a("b5ae"),c=l.required,m=(l.maxLength,l.minLength),u=l.email,d={data:function(){return{form:{email:""}}},mixins:[n["validationMixin"]],validations:{form:{email:{required:c,email:u,minLength:m(4)}}},computed:Object(r["a"])({},Object(o["c"])(["processing","loginError","forgotMailSuccess"])),methods:Object(r["a"])(Object(r["a"])({},Object(o["b"])(["forgotPassword"])),{},{formSubmit:function(){this.$v.form.$touch(),this.$v.form.$anyError||this.forgotPassword({email:this.form.email})}}),watch:{loginError:function(s){null!=s&&this.$notify("error","Forgot Password Error",s,{duration:3e3,permanent:!1})},forgotMailSuccess:function(s){s&&this.$notify("success","Forgot Password Success","Please check your email.",{duration:3e3,permanent:!1})}}},b=d,f=a("2877"),v=Object(f["a"])(b,e,i,!1,null,null,null);t["default"]=v.exports}}]);