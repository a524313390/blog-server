(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["userdata"],{"3bf8":function(e,r,t){},6355:function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("el-row",{attrs:{gutter:20}},[t("el-col",{attrs:{span:12,offset:6}},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),t("el-form-item",{attrs:{label:"用户身份",prop:"type"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.type,callback:function(r){e.$set(e.ruleForm,"type",r)},expression:"ruleForm.type"}},e._l(e.options,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),t("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm.checkPass,callback:function(r){e.$set(e.ruleForm,"checkPass",r)},expression:"ruleForm.checkPass"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("添加")]),t("el-button",{on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)],1)],1)},a=[],l=t("d4ec"),o=t("bee2"),u=t("99de"),n=t("7e84"),c=t("262e"),i=t("9ab4"),m=t("60a3"),p=t("79f6"),f=function(e){function r(){var e;return Object(l["a"])(this,r),e=Object(u["a"])(this,Object(n["a"])(r).apply(this,arguments)),e.ruleForm={username:"",password:"",checkPass:"",type:""},e.options=[{value:"admin",label:"管理员"},{value:"user",label:"普通用户"}],e.validatePass=function(r,t,s){""===t?s(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),s())},e.validatePass2=function(r,t,s){""===t?s(new Error("请再次输入密码")):t!==e.ruleForm.password?s(new Error("两次输入密码不一致!")):s()},e.rules={pass:[{validator:e.validatePass,trigger:"blur"}],checkPass:[{validator:e.validatePass2,trigger:"blur"}]},e}return Object(c["a"])(r,e),Object(o["a"])(r,[{key:"submitForm",value:function(e){var r=this;this.$refs[e].validate((function(t){if(!t)return console.log("error submit!!"),!1;r.$axios.post(p["a"].userAdd,r.ruleForm).then((function(t){console.log(t),0==t.data.code&&(r.$message.success("添加成功"),r.$refs[e].resetFields())}))}))}},{key:"resetForm",value:function(e){this.$refs[e].resetFields()}}]),r}(m["d"]);f=i["a"]([m["a"]],f);var d=f,b=d,F=(t("6b87"),t("2877")),v=Object(F["a"])(b,s,a,!1,null,"6a5a0b43",null);r["default"]=v.exports},"6b87":function(e,r,t){"use strict";var s=t("3bf8"),a=t.n(s);a.a}}]);
//# sourceMappingURL=userdata.cd3e4d9d.js.map