(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["articleEdit"],{"1b3b":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("mavon-editor",{ref:"md",attrs:{ishljs:!0},on:{imgAdd:e.imgAdd,change:e.changVal},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)},l=[],o=r("d4ec"),n=r("bee2"),c=r("99de"),u=r("7e84"),i=r("262e"),s=r("9ab4"),m={serverPath:"http://localhost:5000"},d=r("60a3"),p=r("79f6");console.log(m.serverPath);var h=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.value="",e}return Object(i["a"])(t,e),Object(n["a"])(t,[{key:"created",value:function(){""!==this.markData&&(this.value=this.markData)}},{key:"changValue",value:function(e){return e}},{key:"changMark",value:function(e){return e}},{key:"imgAdd",value:function(e,t){var r=this,a=new FormData;a.append("file",t);var l={headers:{"Content-Type":"multipart/form-data"}};this.$axios.post("".concat(p["a"].uploadImg),a,l).then((function(t){if(console.log(t),0==t.data.code){console.log(m.serverPath);var a=m.serverPath+t.data.message;console.log(a),r.$refs.md.$img2Url(e,a)}else r.$message.error("服务器出错，请稍后再试")}))}},{key:"changVal",value:function(e,t){this.changValue(t),this.changMark(e)}}]),t}(d["d"]);s["a"]([Object(d["c"])({type:String,default:""})],h.prototype,"markData",void 0),s["a"]([Object(d["b"])("changValue")],h.prototype,"changValue",null),s["a"]([Object(d["b"])("changMark")],h.prototype,"changMark",null),h=s["a"]([Object(d["a"])({name:"markdown"})],h);var f=h,g=f,v=r("2877"),b=Object(v["a"])(g,a,l,!1,null,null,null);t["a"]=b.exports},"25f0":function(e,t,r){"use strict";var a=r("6eeb"),l=r("825a"),o=r("d039"),n=r("ad6d"),c="toString",u=RegExp.prototype,i=u[c],s=o((function(){return"/a/b"!=i.call({source:"a",flags:"b"})})),m=i.name!=c;(s||m)&&a(RegExp.prototype,c,(function(){var e=l(this),t=String(e.source),r=e.flags,a=String(void 0===r&&e instanceof RegExp&&!("flags"in u)?n.call(e):r);return"/"+t+"/"+a}),{unsafe:!0})},5319:function(e,t,r){"use strict";var a=r("d784"),l=r("825a"),o=r("7b0b"),n=r("50c4"),c=r("a691"),u=r("1d80"),i=r("8aa5"),s=r("14c3"),m=Math.max,d=Math.min,p=Math.floor,h=/\$([$&'`]|\d\d?|<[^>]*>)/g,f=/\$([$&'`]|\d\d?)/g,g=function(e){return void 0===e?e:String(e)};a("replace",2,(function(e,t,r){return[function(r,a){var l=u(this),o=void 0==r?void 0:r[e];return void 0!==o?o.call(r,l,a):t.call(String(l),r,a)},function(e,o){var u=r(t,e,this,o);if(u.done)return u.value;var p=l(e),h=String(this),f="function"===typeof o;f||(o=String(o));var v=p.global;if(v){var b=p.unicode;p.lastIndex=0}var k=[];while(1){var y=s(p,h);if(null===y)break;if(k.push(y),!v)break;var F=String(y[0]);""===F&&(p.lastIndex=i(h,n(p.lastIndex),b))}for(var x="",_=0,$=0;$<k.length;$++){y=k[$];for(var w=String(y[0]),j=m(d(c(y.index),h.length),0),O=[],M=1;M<y.length;M++)O.push(g(y[M]));var A=y.groups;if(f){var S=[w].concat(O,j,h);void 0!==A&&S.push(A);var D=String(o.apply(void 0,S))}else D=a(w,h,j,O,A,o);j>=_&&(x+=h.slice(_,j)+D,_=j+w.length)}return x+h.slice(_)}];function a(e,r,a,l,n,c){var u=a+e.length,i=l.length,s=f;return void 0!==n&&(n=o(n),s=h),t.call(c,s,(function(t,o){var c;switch(o.charAt(0)){case"$":return"$";case"&":return e;case"`":return r.slice(0,a);case"'":return r.slice(u);case"<":c=n[o.slice(1,-1)];break;default:var s=+o;if(0===s)return t;if(s>i){var m=p(s/10);return 0===m?t:m<=i?void 0===l[m-1]?o.charAt(1):l[m-1]+o.charAt(1):t}c=l[s-1]}return void 0===c?"":c}))}}))},"80da":function(e,t,r){},"960c":function(e,t,r){"use strict";var a=r("80da"),l=r.n(a);l.a},ead0:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"artcleAdd"},[r("el-row",[r("el-col",{attrs:{span:18,offset:3}},[r("el-form",{ref:"ruleForm",attrs:{rules:e.rules,model:e.ruleForm,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"文章标题",prop:"title"}},[r("el-input",{model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),r("el-form-item",{attrs:{label:"属性"}},[r("el-checkbox-group",{model:{value:e.ruleForm.top,callback:function(t){e.$set(e.ruleForm,"top",t)},expression:"ruleForm.top"}},[r("el-checkbox",{attrs:{label:"是否置顶",name:"top"}})],1)],1),r("el-form-item",{attrs:{label:"选择栏目",prop:"category_id"}},[r("el-select",{attrs:{placeholder:"请选择栏目"},model:{value:e.ruleForm.category_id,callback:function(t){e.$set(e.ruleForm,"category_id",t)},expression:"ruleForm.category_id"}},e._l(e.categoryList,(function(e){return r("el-option",{key:e.tag_name,attrs:{label:e.tag_name,value:e.id}})})),1)],1),r("el-form-item",{attrs:{label:"发表时间",prop:"createdAt"}},[r("el-col",{attrs:{span:11}},[r("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:e.ruleForm.createdAt,callback:function(t){e.$set(e.ruleForm,"createdAt",t)},expression:"ruleForm.createdAt"}})],1),r("el-col",{staticClass:"line",attrs:{span:2}},[e._v("-")])],1),r("el-row",[r("el-col",{attrs:{span:6}},[r("el-form-item",{attrs:{label:"点击量",prop:"count"}},[r("el-input",{model:{value:e.ruleForm.count,callback:function(t){e.$set(e.ruleForm,"count",t)},expression:"ruleForm.count"}})],1)],1),r("el-col",{attrs:{span:6}},[r("el-form-item",{attrs:{label:"作者昵称",prop:"article_author"}},[r("el-input",{model:{value:e.ruleForm.article_author,callback:function(t){e.$set(e.ruleForm,"article_author",t)},expression:"ruleForm.article_author"}})],1)],1)],1),r("el-form-item",{attrs:{label:"缩略图",prop:"thumb_url"}},[r("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover"}},[r("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.ruleForm.thumb_url,fit:"cover"}}),r("el-input",{attrs:{slot:"reference"},slot:"reference",model:{value:e.ruleForm.thumb_url,callback:function(t){e.$set(e.ruleForm,"thumb_url",t)},expression:"ruleForm.thumb_url"}})],1),r("Uploads",{on:{recaiveUrl:e.changeUrl,removeUrl:e.removeUrl}})],1),r("el-form-item",{attrs:{label:"关键词",prop:"keyword"}},[r("el-input",{model:{value:e.ruleForm.keyword,callback:function(t){e.$set(e.ruleForm,"keyword",t)},expression:"ruleForm.keyword"}})],1),r("el-form-item",{attrs:{label:"内容摘要",prop:"desc"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1),r("el-form-item",{attrs:{label:"内容",prop:"content"}},[r("MarkDown",{attrs:{markData:e.ruleForm.content_mark},on:{changValue:e.changValue,changMark:e.changMark}}),r("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.content,callback:function(t){e.$set(e.ruleForm,"content",t)},expression:"ruleForm.content"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("保存")]),r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1)],1)],1)},l=[],o=(r("d3b7"),r("25f0"),r("5319"),r("d4ec")),n=r("bee2"),c=r("99de"),u=r("7e84"),i=r("262e"),s=r("9ab4"),m=r("60a3"),d=r("1b3b"),p=r("79f6"),h=r("0b32"),f=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.categoryList=[],e.ruleForm={title:"",top:"",category_id:"",keyword:"",thumb_url:"",type:[],content:"",desc:"",article_author:"",createdAt:"",count:0,content_mark:""},e.rules={title:[{required:!0,message:"请输入标题",trigger:"blur"},{min:3,max:50,message:"长度在 3 到 50 个字符",trigger:"blur"}],count:[{type:"number",required:!0,message:"请输入数字",trigger:"blur"}],category_id:[{required:!0,message:"请选择一个栏目",trigger:"change"}],content:[{required:!0,message:"请输入内容",trigger:"change"}]},e}return Object(i["a"])(t,e),Object(n["a"])(t,[{key:"created",value:function(){var e=this,t=this.$route.params.articleData;t?this.ruleForm=t:this.$router.push("/article/list"),this.$axios.get("".concat(p["a"].tagList)).then((function(t){0===t.data.code&&(e.categoryList=t.data.message,console.log(t))}))}},{key:"changDesc",value:function(e){console.log(e),this.ruleForm.desc=e.toString().replace(/<.*?>/gi,"").replace(/[\r\n]/g,"").substring(0,200)}},{key:"changValue",value:function(e){this.ruleForm.content=e}},{key:"changMark",value:function(e){this.ruleForm.content_mark=e}},{key:"submitForm",value:function(e){var t=this,r=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;console.log(t.ruleForm),t.$axios.post("".concat(p["a"].articleUpdate),t.ruleForm).then((function(e){0==e.data.code&&(t.$message.success("更新成功"),r.$router.push("/article/list")(t).resetForm())}))}))}},{key:"resetForm",value:function(e){this.$refs[e].resetFields()}},{key:"changeUrl",value:function(e){this.ruleForm.thumb_url=e}},{key:"removeUrl",value:function(){this.ruleForm.thumb_url=""}}]),t}(m["d"]);s["a"]([Object(m["e"])("ruleForm.content")],f.prototype,"changDesc",null),f=s["a"]([Object(m["a"])({name:"articleAdd",components:{MarkDown:d["a"],Uploads:h["a"]}})],f);var g=f,v=g,b=(r("960c"),r("2877")),k=Object(b["a"])(v,a,l,!1,null,"37ed0cb8",null);t["default"]=k.exports}}]);
//# sourceMappingURL=articleEdit.5650028f.js.map