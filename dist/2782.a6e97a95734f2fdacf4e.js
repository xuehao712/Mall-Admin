(self.webpackChunkmall_admin=self.webpackChunkmall_admin||[]).push([[2782],{30076:function(e,t,n){"use strict";n.d(t,{Z:function(){return w}});var r=n(28481),a=n(96156),o=n(81253),l=n(67294),c=(t=n(94184),n.n(t)),i=n(28991),u=n(90484),s=n(26401),d=n(80334),m=n(38186);function p(e){return"object"===(0,u.Z)(e)&&"string"==typeof e.name&&"string"==typeof e.theme&&("object"===(0,u.Z)(e.icon)||"function"==typeof e.icon)}function f(e){var t=0<arguments.length&&void 0!==e?e:{};return Object.keys(t).reduce((function(e,n){var r=t[n];return"class"===n?(e.className=r,delete e.class):e[n]=r,e}),{})}function g(e){return(0,s.generate)(e)[0]}function h(e){return e?Array.isArray(e)?e:[e]:[]}var y=!1,v={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};(n=function(e){var t=e.icon,n=e.className,r=e.onClick,a=e.style,c=e.primaryColor,u=e.secondaryColor,s=(0,o.Z)(e,["icon","className","onClick","style","primaryColor","secondaryColor"]);return e=v,c&&(e={primaryColor:c,secondaryColor:u||g(c)}),function(e){var t=0<arguments.length&&void 0!==e?e:"\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";(0,l.useEffect)((function(){y||((0,m.insertCss)(t,{prepend:!0}),y=!0)}),[])}(),u=p(t),c="icon should be icon definiton, but got ".concat(t),(0,d.ZP)(u,"[@ant-design/icons] ".concat(c)),p(t)?(t&&"function"==typeof t.icon&&(t=(0,i.Z)((0,i.Z)({},t),{},{icon:t.icon(e.primaryColor,e.secondaryColor)})),function e(t,n,r){return r?l.createElement(t.tag,(0,i.Z)((0,i.Z)({key:n},f(t.attrs)),r),(t.children||[]).map((function(r,a){return e(r,"".concat(n,"-").concat(t.tag,"-").concat(a))}))):l.createElement(t.tag,(0,i.Z)({key:n},f(t.attrs)),(t.children||[]).map((function(r,a){return e(r,"".concat(n,"-").concat(t.tag,"-").concat(a))})))}(t.icon,"svg-".concat(t.name),(0,i.Z)({className:n,onClick:r,style:a,"data-icon":t.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},s))):null}).displayName="IconReact",n.getTwoToneColors=function(){return(0,i.Z)({},v)},n.setTwoToneColors=function(e){var t=e.primaryColor;e=e.secondaryColor,v.primaryColor=t,v.secondaryColor=e||g(t),v.calculated=!!e};var b=n;function S(e){var t=h(e);return t=(e=(0,r.Z)(t,2))[0],e=e[1],b.setTwoToneColors({primaryColor:t,secondaryColor:e})}S("#1890ff"),(n=l.forwardRef((function(e,t){var n=e.className,i=e.icon,u=e.spin,s=e.rotate,d=e.tabIndex,m=e.onClick,p=e.twoToneColor;return e=(0,o.Z)(e,["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"]),u=c()("anticon",(0,a.Z)({},"anticon-".concat(i.name),Boolean(i.name)),{"anticon-spin":!!u||"loading"===i.name},n),void 0===(n=d)&&m&&(n=-1),d=s?{msTransform:"rotate(".concat(s,"deg)"),transform:"rotate(".concat(s,"deg)")}:void 0,s=h(p),s=(p=(0,r.Z)(s,2))[0],p=p[1],l.createElement("span",Object.assign({role:"img","aria-label":i.name},e,{ref:t,tabIndex:n,onClick:m,className:u}),l.createElement(b,{icon:i,primaryColor:s,secondaryColor:p,style:d}))}))).displayName="AntdIcon",n.getTwoToneColor=function(){var e=b.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor},n.setTwoToneColor=S;var w=n},26271:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(67294),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"profile",theme:"outlined"},o=n(30076);(n=function(e,t){return r.createElement(o.Z,Object.assign({},e,{ref:t,icon:a}))}).displayName="ProfileOutlined";var l=r.forwardRef(n)},76570:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(67294),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"}}]},name:"search",theme:"outlined"},o=n(30076);(n=function(e,t){return r.createElement(o.Z,Object.assign({},e,{ref:t,icon:a}))}).displayName="SearchOutlined";var l=r.forwardRef(n)},83494:function(e,t,n){"use strict";n.d(t,{Z:function(){return v}}),t=n(67154);var r=n.n(t),a=(t=n(59713),n.n(t)),o=n(67294),l=n(96156),c=n(28481),i=n(81253),u=(t=n(94184),n.n(t)),s=n(21770),d=n(15105);(t=o.forwardRef((function(e,t){var n=void 0===(h=e.prefixCls)?"rc-switch":h,r=e.className,a=e.checked,m=e.defaultChecked,p=e.disabled,f=e.loadingIcon,g=e.checkedChildren,h=e.unCheckedChildren,y=e.onClick,v=e.onChange,b=e.onKeyDown,S=(e=(0,i.Z)(e,["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"]),m=(0,s.Z)(!1,{value:a,defaultValue:m}),(m=(0,c.Z)(m,2))[0]),w=m[1];function C(e,t){var n=S;return p||(w(n=e),null!=v&&v(n,t)),n}return r=u()(n,r,(r={},(0,l.Z)(r,"".concat(n,"-checked"),S),(0,l.Z)(r,"".concat(n,"-disabled"),p),r)),o.createElement("button",Object.assign({},e,{type:"button",role:"switch","aria-checked":S,disabled:p,className:r,ref:t,onKeyDown:function(e){e.which===d.Z.LEFT?C(!1,e):e.which===d.Z.RIGHT&&C(!0,e),null!=b&&b(e)},onClick:function(e){var t=C(!S,e);null!=y&&y(t,e)}}),f,o.createElement("span",{className:"".concat(n,"-inner")},S?g:h))}))).displayName="Switch";var m=t,p=(t=n(628),n.n(t)),f=n(28310),g=n(65632),h=n(97647),y=n(21687);(n=o.forwardRef((function(e,t){var n=e.prefixCls,l=e.size,c=e.loading,i=void 0===(b=e.className)?"":b,s=e.disabled,d=function(e,t){var n={};for(a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]]);return n}(e,["prefixCls","size","loading","className","disabled"]);(0,y.Z)("checked"in d||!("value"in d),"Switch","`value` is not a valid prop, do you mean `checked`?");var v=(S=o.useContext(g.E_)).getPrefixCls,b=S.direction,S=(e=o.useContext(h.Z),v("switch",n));return v=o.createElement("div",{className:"".concat(S,"-handle")},c&&o.createElement(p(),{className:"".concat(S,"-loading-icon")})),i=u()((n={},a()(n,"".concat(S,"-small"),"small"===(l||e)),a()(n,"".concat(S,"-loading"),c),a()(n,"".concat(S,"-rtl"),"rtl"===b),n),i),o.createElement(f.Z,{insertExtraNode:!0},o.createElement(m,r()({},d,{prefixCls:S,className:i,disabled:s||c,ref:t,loadingIcon:v})))}))).__ANT_SWITCH=!0,n.displayName="Switch";var v=n},46758:function(e,t,n){"use strict";n.d(t,{i:function(){return a}});var r=n(32095);e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var a={fetchList:o,updateRecommendStatus:l,deleteNewProduct:c,createNewProduct:i,updateNewProductSort:u};function o(e){return(0,r.Z)({url:"/home/newProduct/list",method:"get",params:e})}function l(e){return(0,r.Z)({url:"/home/newProduct/update/recommendStatus",method:"post",data:e})}function c(e){return(0,r.Z)({url:"/home/newProduct/delete",method:"post",data:e})}function i(e){return(0,r.Z)({url:"/home/newProduct/create",method:"post",data:e})}function u(e){return(0,r.Z)({url:"/home/newProduct/update/sort/"+e.id,method:"post",params:e})}(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(n.register(a,"newProductServices","c:\\Project\\mall-admin\\src\\services\\newProduct.js"),n.register(o,"fetchList","c:\\Project\\mall-admin\\src\\services\\newProduct.js"),n.register(l,"updateRecommendStatus","c:\\Project\\mall-admin\\src\\services\\newProduct.js"),n.register(c,"deleteNewProduct","c:\\Project\\mall-admin\\src\\services\\newProduct.js"),n.register(i,"createNewProduct","c:\\Project\\mall-admin\\src\\services\\newProduct.js"),n.register(u,"updateNewProductSort","c:\\Project\\mall-admin\\src\\services\\newProduct.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)},32488:function(e,t,n){"use strict";n.d(t,{D:function(){return a}});var r=n(32095);e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var a={fetchList:o,fetchSimpleList:l,updateDeleteStatus:c,updateNewStatus:i,updateRecommendStatus:u,updatePublishStatus:s,createProduct:d,updateProduct:m,getProduct:p};function o(e){return(0,r.Z)({url:"/product/list",method:"get",params:e})}function l(e){return(0,r.Z)({url:"/product/simpleList",method:"get",params:e})}function c(e){return(0,r.Z)({url:"/product/update/deleteStatus",method:"post",params:e})}function i(e){return(0,r.Z)({url:"/product/update/newStatus",method:"post",params:e})}function u(e){return(0,r.Z)({url:"/product/update/recommendStatus",method:"post",params:e})}function s(e){return(0,r.Z)({url:"/product/update/publishStatus",method:"post",params:e})}function d(e){return(0,r.Z)({url:"/product/create",method:"post",data:e})}function m(e,t){return(0,r.Z)({url:"/product/update/"+e,method:"post",data:t})}function p(e){return(0,r.Z)({url:"/product/updateInfo/"+e,method:"get"})}(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(n.register(a,"productServices","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(o,"fetchList","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(l,"fetchSimpleList","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(c,"updateDeleteStatus","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(i,"updateNewStatus","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(u,"updateRecommendStatus","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(s,"updatePublishStatus","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(d,"createProduct","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(m,"updateProduct","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(p,"getProduct","c:\\Project\\mall-admin\\src\\services\\product.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)},21671:function(e,t,n){"use strict";function r(e,t){/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));var n,r,o={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds()};for(n in o)new RegExp("(".concat(n,")")).test(t)&&(r=o[n]+"",t=t.replace(RegExp.$1,1===RegExp.$1.length?r:a(r)));return t}function a(e){return("00"+e).substr(e.length)}function o(e,t){t=t||"-";var n=e.split(t);return e=parseInt(n[0]),t=0==n[1].indexOf("0")?parseInt(n[1].substring(1)):parseInt(n[1]),n=parseInt(n[2]),new Date(e,t-1,n)}n.d(t,{p:function(){return r},v:function(){return o}}),e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature,(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(n.register(r,"formatDate","c:\\Project\\mall-admin\\src\\utils\\date.js"),n.register(a,"padLeftZero","c:\\Project\\mall-admin\\src\\utils\\date.js"),n.register(o,"str2Date","c:\\Project\\mall-admin\\src\\utils\\date.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)},32782:function(e,t,n){"use strict";n.r(t);var r=n(76570),a=n(26271),o=n(8834),l=n(14617),c=n(48086),i=n(39144),u=n(71577),s=n(35845),d=n(36929),m=n(83494),p=n(94217),f=n(67294),g=(n(21671),n(46758)),h=n(32488),y=(n(29041),n(83663)),v=n(28368);function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,r=arguments[t];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function S(e,t){var n,r=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)),r}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){var r,a;r=e,t=n[a=t],a in r?Object.defineProperty(r,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[a]=t})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return Z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Z(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function P(){var e=o.Z.Option,t=l.Z.Search;(0,f.useEffect)((function(){$()}),[]);var n={pageNum:1,pageSize:5,productName:null,recommendStatus:null},S=(F=C((0,f.useState)(n),2))[0],Z=F[1],P=(z=C((0,f.useState)([{label:"Unrecommend",value:0},{label:"Recommending",value:1}]),2))[0],E=(z[1],A=C((0,f.useState)(null),2))[0],j=A[1],k=(J=C((0,f.useState)(null),2))[0],N=J[1],O=(D=C((0,f.useState)(!1),2))[0],L=D[1],x=(B=C((0,f.useState)([]),2))[0],H=B[1],z=(F=C((0,f.useState)([{label:"Recommend",value:0},{label:"Unrecommend",value:1},{label:"Delete",value:2}]),2))[0],T=(F[1],A=C((0,f.useState)(null),2))[0],G=A[1],D=(J=C((0,f.useState)(!1),2))[0],R=J[1],I=(B=C((0,f.useState)({list:null,total:null,multipleSelection:[],listQuery:{keyword:null,pageNum:1,pageSize:5}}),2))[0],M=B[1],A=(F=C((0,f.useState)(!1),2))[0],Q=F[1],U=(J=C((0,f.useState)({sort:0,id:null}),2))[0],V=J[1],$=function(){L(!0),g.i.fetchList(S).then((function(e){L(!1),j(e.data.list),N(e.data.total)}))},_=function(e,t){(0,v.default)({title:"Are you sure to modify recommend status?",okText:"Yes",okType:"primary",onOk:function(){var n=new URLSearchParams;n.append("ids",e),n.append("recommendStatus",t),g.i.updateRecommendStatus(n).then((function(e){$(),c.ZP.success("Modify Success",10)}))},onCancel:function(){c.ZP.success("Success Cancel Operate!",10),$()}})},K=function(e){(0,v.default)({title:"Are you sure to delete this recommend?",okText:"Yes",okType:"primary",onOk:function(){var t=new URLSearchParams;t.append("ids",e),t.append("recommendStatus",status),g.i.deleteNewProduct(t).then((function(e){$(),c.ZP.success("Delete Success",10)}))},onCancel:function(){}})},Y=function(){h.D.fetchList(I.listQuery).then((function(e){M(w(w({},I),{},{list:e.data.list,total:e.data.total}))}))},B={pagination:{position:"bottomRight",pageSize:S.pageSize,showQuickJumper:!0,showSizeChanger:!0,showTotal:function(e){return"Total ".concat(e," items")},pageSizeOptions:[5,10,15],total:k,current:S.pageNum,onShowSizeChange:function(e,t){return n=t,(t=S).pageNum=1,t.pageSize=n,Z(t),void $();var n},onChange:function(e){return t=e,(e=S).pageNum=t,Z(e),void $();var t}},bordered:!0,size:"default"},F={onChange:function(e,t){H(t)}},J={pagination:{position:"bottomRight",pageSize:I.listQuery.pageSize,showQuickJumper:!0,showSizeChanger:!0,showTotal:function(e){return"Total ".concat(e," items")},pageSizeOptions:[5,10,15],total:I.total,current:I.listQuery.pageNum,onShowSizeChange:function(e,t){return n=t,(t=I).listQuery.pageNum=1,t.listQuery.pageSize=n,M(t),void Y();var n},onChange:function(e){return t=e,(e=I).listQuery.pageNum=t,M(e),void Y();var t}},bordered:!0,size:"default"};return k={onChange:function(e,t){t=t,M(w(w({},I),{},{multipleSelection:t}))}},f.createElement("div",{className:"app-container"},f.createElement(i.Z,{className:"filter-container"},f.createElement("div",null,f.createElement(r.Z,null),f.createElement("span",null,"Filter Search"),f.createElement(u.Z,{style:{float:"right"},type:"primary",onClick:function(){Z(w(w({},S),{},{pageNum:1})),$()},size:"small"},"Search"),f.createElement(u.Z,{style:{float:"right",marginRight:"15px"},onClick:function(){Z(n)},size:"small"},"Reset")),f.createElement("div",{style:{marginTop:"15px"}},f.createElement(s.Z,{layout:"inline",size:"small",labelCol:{span:10}},f.createElement(s.Z.Item,{label:"Name: "},f.createElement(l.Z,{style:{width:"200px"},value:S.productName,name:"productName",onChange:function(e){return Z(w(w({},S),{},{productName:e.target.value}))},className:"input-width",placeholder:"Product Name"})),f.createElement(s.Z.Item,{label:"Status: "},f.createElement(o.Z,{style:{width:"200px"},value:S.recommendStatus,placeholder:"All",allowClear:!0,name:"recommendStatus",className:"input-width",onChange:function(e){return Z(w(w({},S),{},{recommendStatus:e}))}},P.map((function(t){return f.createElement(e,{key:t.value,value:t.value},t.label)}))))))),f.createElement(i.Z,{className:"operate-container"},f.createElement(a.Z,null),f.createElement("span",null,"Data List"),f.createElement(u.Z,{size:"small",className:"btn-add",onClick:function(){R(!0),Y()}},"SelectProduct")),f.createElement("div",{className:"table-container"},f.createElement(d.Z,b({rowSelection:w({},F)},B,{rowKey:"id",dataSource:E,style:{width:"100%"},loading:O}),f.createElement(p.Z,{width:"120px",align:"center",title:"Id",render:function(e,t){return f.createElement("div",null,t.id)}}),f.createElement(p.Z,{align:"center",title:"Name",render:function(e,t){return f.createElement("div",null,t.productName)}}),f.createElement(p.Z,{align:"center",width:"200px",title:"Recommend",render:function(e,t){return f.createElement("div",null,f.createElement(m.Z,{onChange:function(e){return e=e,void _(t.id,e?1:0)},checked:t.recommendStatus}))}}),f.createElement(p.Z,{width:"160px",align:"center",title:"Sort",render:function(e,t){return f.createElement("div",null,t.sort)}}),f.createElement(p.Z,{width:"160px",align:"center",title:"Status",render:function(e,t){return f.createElement("div",null,1===t.recommendStatus?"Recommending":"Unrecommend")}}),f.createElement(p.Z,{width:"180px",align:"center",title:"Operation",render:function(e,t){return f.createElement("div",null,f.createElement(u.Z,{size:"small",type:"text",onClick:function(){return e=t,Q(!0),void V(w(w({},U),{},{sort:e.sort,id:e.id}));var e}},"SetSort"),f.createElement(u.Z,{size:"small",type:"text",onClick:function(){K(t.id)}},"Delete"))}}))),f.createElement("div",{className:"batch-operate-container"},f.createElement(o.Z,{style:{width:"200px"},size:"small",value:T,placeholder:"Multiple",onChange:function(e){return G(e)}},z.map((function(t){return f.createElement(e,{key:t.value,value:t.value},t.label)}))),f.createElement(u.Z,{style:{marginLeft:"20px"},className:"search-button",onClick:function(){if(x.length<1)c.ZP.warning("Please select the operation",10);else{for(var e=[],t=0;t<x.length;t++)e.push(x[t].id);0===T?_(e,1):1===T?_(e,0):2===T?K(e):c.ZP.warning("Please select the operation type",10)}},type:"primary",size:"small"},"Confirm")),f.createElement(y.default,{title:"Select Product",visible:D,width:"50%",onCancel:function(){return R(!1)},onOk:function(){if(I.multipleSelection<1)c.ZP.warning("Please select a record",10);else{for(var e=[],t=0;t<I.multipleSelection.length;t++)e.push({productId:I.multipleSelection[t].id,productName:I.multipleSelection[t].name});(0,v.default)({title:"Are you sure to add this data?",okText:"Yes",okType:"primary",onOk:function(){g.i.createNewProduct(e).then((function(e){R(!1),M(w(w({},I),{},{multipleSelection:[]})),$(),c.ZP.success("Add Success!",10)}))},onCancel:function(){}})}}},f.createElement(t,{value:I.listQuery.keyword,name:"keyword",onChange:function(e){return M(w(w({},I),{},{listQuery:w(w({},I.listQuery),{},{keyword:e.target.value})}))},style:{width:"250px",marginBottom:"20px"},size:"small",placeholder:"Product Search",onSearch:function(){Y()}}),f.createElement(d.Z,b({rowKey:"productSn",rowSelection:w({},k),dataSource:I.list},J),f.createElement(p.Z,{title:"Name",align:"center",render:function(e,t){return f.createElement("div",null,t.name)}}),f.createElement(p.Z,{title:"Sn",width:"160px",align:"center",render:function(e,t){return f.createElement("div",null,"NO.",t.productSn)}}),f.createElement(p.Z,{title:"Price",width:"120px",align:"center",render:function(e,t){return f.createElement("div",null,"$",t.price)}}))),f.createElement(y.default,{title:"SetSort",visible:A,width:"40%",onOk:function(){(0,v.default)({title:"Are you sure to modify sort?",okText:"Yes",okType:"primary",onOk:function(){g.i.updateNewProductSort(U).then((function(e){Q(!1),$(),c.ZP.success("Update Success!",10)}))},onCancel:function(){}})},onCancel:function(){return Q(!1)}},f.createElement(s.Z,{labelCol:{span:5}},f.createElement(s.Z.Item,{label:"Sort: "},f.createElement(l.Z,{value:U.sort,style:{width:"200px"},name:"sort",onChange:function(e){return V(w(w({},U),{},{sort:e.target.value}))}})))))}e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(P,'useEffect{}\nuseState{[listQuery, setListQuery](defaultListQuery)}\nuseState{[recommendOptions, setRecommendOptions](defaultRecommendOptions)}\nuseState{[list, setList](null)}\nuseState{[total, setTotal](null)}\nuseState{[listLoading, setListLoading](false)}\nuseState{[multipleSelection, setMultipleSelection]([])}\nuseState{[operates, setOperates]([\r\n        {\r\n            label: "Recommend",\r\n            value: 0\r\n        },\r\n        {\r\n            label: "Unrecommend",\r\n            value: 1\r\n        },\r\n        {\r\n            label: "Delete",\r\n            value: 2\r\n        }\r\n    ])}\nuseState{[operateType, setOperateType](null)}\nuseState{[selectDialogVisible, setSelectDialogVisible](false)}\nuseState{[dialogData, setDialogData]({\r\n        list: null,\r\n        total: null,\r\n        multipleSelection:[],\r\n        listQuery:{\r\n          keyword: null,\r\n          pageNum: 1,\r\n          pageSize: 5\r\n        }\r\n    })}\nuseState{[sortDialogVisible, setSortDialogVisible](false)}\nuseState{[sortDialogData, setSortDialogData]({\r\n        sort:0,\r\n        id:null\r\n    })}'),n=P,t.default=n,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(P,"HomeNew","c:\\Project\\mall-admin\\src\\views\\sms\\new\\index.js"),t.register(n,"default","c:\\Project\\mall-admin\\src\\views\\sms\\new\\index.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)}}]);