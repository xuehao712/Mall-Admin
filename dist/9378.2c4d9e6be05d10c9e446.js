(self.webpackChunkmall_admin=self.webpackChunkmall_admin||[]).push([[9378],{30076:function(e,t,n){"use strict";n.d(t,{Z:function(){return w}});var r=n(28481),a=n(96156),o=n(81253),l=n(67294),i=(t=n(94184),n.n(t)),c=n(28991),s=n(90484),u=n(26401),d=n(80334),m=n(38186);function f(e){return"object"===(0,s.Z)(e)&&"string"==typeof e.name&&"string"==typeof e.theme&&("object"===(0,s.Z)(e.icon)||"function"==typeof e.icon)}function p(e){var t=0<arguments.length&&void 0!==e?e:{};return Object.keys(t).reduce((function(e,n){var r=t[n];return"class"===n?(e.className=r,delete e.class):e[n]=r,e}),{})}function g(e){return(0,u.generate)(e)[0]}function y(e){return e?Array.isArray(e)?e:[e]:[]}var h=!1,v={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};(n=function(e){var t=e.icon,n=e.className,r=e.onClick,a=e.style,i=e.primaryColor,s=e.secondaryColor,u=(0,o.Z)(e,["icon","className","onClick","style","primaryColor","secondaryColor"]);return e=v,i&&(e={primaryColor:i,secondaryColor:s||g(i)}),function(e){var t=0<arguments.length&&void 0!==e?e:"\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";(0,l.useEffect)((function(){h||((0,m.insertCss)(t,{prepend:!0}),h=!0)}),[])}(),s=f(t),i="icon should be icon definiton, but got ".concat(t),(0,d.ZP)(s,"[@ant-design/icons] ".concat(i)),f(t)?(t&&"function"==typeof t.icon&&(t=(0,c.Z)((0,c.Z)({},t),{},{icon:t.icon(e.primaryColor,e.secondaryColor)})),function e(t,n,r){return r?l.createElement(t.tag,(0,c.Z)((0,c.Z)({key:n},p(t.attrs)),r),(t.children||[]).map((function(r,a){return e(r,"".concat(n,"-").concat(t.tag,"-").concat(a))}))):l.createElement(t.tag,(0,c.Z)({key:n},p(t.attrs)),(t.children||[]).map((function(r,a){return e(r,"".concat(n,"-").concat(t.tag,"-").concat(a))})))}(t.icon,"svg-".concat(t.name),(0,c.Z)({className:n,onClick:r,style:a,"data-icon":t.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},u))):null}).displayName="IconReact",n.getTwoToneColors=function(){return(0,c.Z)({},v)},n.setTwoToneColors=function(e){var t=e.primaryColor;e=e.secondaryColor,v.primaryColor=t,v.secondaryColor=e||g(t),v.calculated=!!e};var b=n;function C(e){var t=y(e);return t=(e=(0,r.Z)(t,2))[0],e=e[1],b.setTwoToneColors({primaryColor:t,secondaryColor:e})}C("#1890ff"),(n=l.forwardRef((function(e,t){var n=e.className,c=e.icon,s=e.spin,u=e.rotate,d=e.tabIndex,m=e.onClick,f=e.twoToneColor;return e=(0,o.Z)(e,["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"]),s=i()("anticon",(0,a.Z)({},"anticon-".concat(c.name),Boolean(c.name)),{"anticon-spin":!!s||"loading"===c.name},n),void 0===(n=d)&&m&&(n=-1),d=u?{msTransform:"rotate(".concat(u,"deg)"),transform:"rotate(".concat(u,"deg)")}:void 0,u=y(f),u=(f=(0,r.Z)(u,2))[0],f=f[1],l.createElement("span",Object.assign({role:"img","aria-label":c.name},e,{ref:t,tabIndex:n,onClick:m,className:s}),l.createElement(b,{icon:c,primaryColor:u,secondaryColor:f,style:d}))}))).displayName="AntdIcon",n.getTwoToneColor=function(){var e=b.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor},n.setTwoToneColor=C;var w=n},26271:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(67294),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"profile",theme:"outlined"},o=n(30076);(n=function(e,t){return r.createElement(o.Z,Object.assign({},e,{ref:t,icon:a}))}).displayName="ProfileOutlined";var l=r.forwardRef(n)},19650:function(e,t,n){"use strict";n.d(t,{u:function(){return d},Z:function(){return f}}),t=n(67154);var r=n.n(t),a=(t=n(59713),n.n(t)),o=(t=n(63038),n.n(t)),l=n(67294),i=(t=n(94184),n.n(t)),c=n(50344),s=n(65632);function u(e){var t=e.className,n=e.direction,o=e.index,i=e.marginDirection,c=e.children,s=e.split,u=e.wrap,m=(p=l.useContext(d)).horizontalSize,f=p.verticalSize,p=(e=p.latestIndex,{});return"vertical"===n?o<e&&(p={marginBottom:m/(s?2:1)}):p=r()(r()({},o<e&&a()({},i,m/(s?2:1))),u&&{paddingBottom:f}),null==c?null:l.createElement(l.Fragment,null,l.createElement("div",{className:t,style:p},c),o<e&&s&&l.createElement("span",{className:"".concat(t,"-split"),style:p},s))}var d=l.createContext({latestIndex:0,horizontalSize:0,verticalSize:0}),m={small:8,middle:16,large:24},f=function(e){var t=(b=l.useContext(s.E_)).getPrefixCls,n=b.space,f=b.direction,p=void 0===(S=e.size)?(null==n?void 0:n.size)||"small":S,g=e.align,y=e.className,h=e.children,v=void 0===(E=e.direction)?"horizontal":E,b=e.prefixCls,C=e.split,w=(n=e.style,void 0!==(S=e.wrap)&&S),E=function(e,t){var n={};for(a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]]);return n}(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),S=l.useMemo((function(){return(Array.isArray(p)?p:[p,p]).map((function(e){return"string"==typeof(e=e)?m[e]:e||0}))}),[p]);if(S=(e=o()(S,2))[0],e=e[1],0===(h=(0,c.Z)(h,{keepEmpty:!0})).length)return null;g=void 0===g&&"horizontal"===v?"center":g,t=t("space",b),y=i()(t,"".concat(t,"-").concat(v),(b={},a()(b,"".concat(t,"-rtl"),"rtl"===f),a()(b,"".concat(t,"-align-").concat(g),g),b),y);var Z="".concat(t,"-item"),O="rtl"===f?"marginLeft":"marginRight",j=0;return h=h.map((function(e,t){return null!=e&&(j=t),l.createElement(u,{className:Z,key:"".concat(Z,"-").concat(t),direction:v,index:t,marginDirection:O,split:C,wrap:w},e)})),l.createElement("div",r()({className:y,style:r()(r()({},w&&{flexWrap:"wrap",marginBottom:-e}),n)},E),l.createElement(d.Provider,{value:{horizontalSize:S,verticalSize:e,latestIndex:j}},h))}},83494:function(e,t,n){"use strict";n.d(t,{Z:function(){return v}}),t=n(67154);var r=n.n(t),a=(t=n(59713),n.n(t)),o=n(67294),l=n(96156),i=n(28481),c=n(81253),s=(t=n(94184),n.n(t)),u=n(21770),d=n(15105);(t=o.forwardRef((function(e,t){var n=void 0===(y=e.prefixCls)?"rc-switch":y,r=e.className,a=e.checked,m=e.defaultChecked,f=e.disabled,p=e.loadingIcon,g=e.checkedChildren,y=e.unCheckedChildren,h=e.onClick,v=e.onChange,b=e.onKeyDown,C=(e=(0,c.Z)(e,["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"]),m=(0,u.Z)(!1,{value:a,defaultValue:m}),(m=(0,i.Z)(m,2))[0]),w=m[1];function E(e,t){var n=C;return f||(w(n=e),null!=v&&v(n,t)),n}return r=s()(n,r,(r={},(0,l.Z)(r,"".concat(n,"-checked"),C),(0,l.Z)(r,"".concat(n,"-disabled"),f),r)),o.createElement("button",Object.assign({},e,{type:"button",role:"switch","aria-checked":C,disabled:f,className:r,ref:t,onKeyDown:function(e){e.which===d.Z.LEFT?E(!1,e):e.which===d.Z.RIGHT&&E(!0,e),null!=b&&b(e)},onClick:function(e){var t=E(!C,e);null!=h&&h(t,e)}}),p,o.createElement("span",{className:"".concat(n,"-inner")},C?g:y))}))).displayName="Switch";var m=t,f=(t=n(628),n.n(t)),p=n(28310),g=n(65632),y=n(97647),h=n(21687);(n=o.forwardRef((function(e,t){var n=e.prefixCls,l=e.size,i=e.loading,c=void 0===(b=e.className)?"":b,u=e.disabled,d=function(e,t){var n={};for(a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]]);return n}(e,["prefixCls","size","loading","className","disabled"]);(0,h.Z)("checked"in d||!("value"in d),"Switch","`value` is not a valid prop, do you mean `checked`?");var v=(C=o.useContext(g.E_)).getPrefixCls,b=C.direction,C=(e=o.useContext(y.Z),v("switch",n));return v=o.createElement("div",{className:"".concat(C,"-handle")},i&&o.createElement(f(),{className:"".concat(C,"-loading-icon")})),c=s()((n={},a()(n,"".concat(C,"-small"),"small"===(l||e)),a()(n,"".concat(C,"-loading"),i),a()(n,"".concat(C,"-rtl"),"rtl"===b),n),c),o.createElement(p.Z,{insertExtraNode:!0},o.createElement(m,r()({},d,{prefixCls:C,className:c,disabled:u||i,ref:t,loadingIcon:v})))}))).__ANT_SWITCH=!0,n.displayName="Switch";var v=n},75979:function(e,t,n){"use strict";n.d(t,{T:function(){return a}});var r=n(16911);e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var a={fetchList:o,deleteReason:l,updateStatus:i,addReason:c,getReasonDetail:s,updateReason:u};function o(e){return(0,r.Z)({url:"/returnReason/list",method:"get",params:e})}function l(e){return(0,r.Z)({url:"/returnReason/delete",method:"post",params:e})}function i(e){return(0,r.Z)({url:"/returnReason/update/status",method:"post",params:e})}function c(e){return(0,r.Z)({url:"/returnReason/create",method:"post",data:e})}function s(e){return(0,r.Z)({url:"/returnReason/"+e,method:"get"})}function u(e,t){return(0,r.Z)({url:"/returnReason/update/"+e,method:"post",data:t})}(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(n.register(a,"returnReasonServices","c:\\Project\\mall-admin\\src\\services\\returnReason.js"),n.register(o,"fetchList","c:\\Project\\mall-admin\\src\\services\\returnReason.js"),n.register(l,"deleteReason","c:\\Project\\mall-admin\\src\\services\\returnReason.js"),n.register(i,"updateStatus","c:\\Project\\mall-admin\\src\\services\\returnReason.js"),n.register(c,"addReason","c:\\Project\\mall-admin\\src\\services\\returnReason.js"),n.register(s,"getReasonDetail","c:\\Project\\mall-admin\\src\\services\\returnReason.js"),n.register(u,"updateReason","c:\\Project\\mall-admin\\src\\services\\returnReason.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)},21671:function(e,t,n){"use strict";function r(e,t){/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));var n,r,o={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds()};for(n in o)new RegExp("(".concat(n,")")).test(t)&&(r=o[n]+"",t=t.replace(RegExp.$1,1===RegExp.$1.length?r:a(r)));return t}function a(e){return("00"+e).substr(e.length)}function o(e,t){t=t||"-";var n=e.split(t);return e=parseInt(n[0]),t=0==n[1].indexOf("0")?parseInt(n[1].substring(1)):parseInt(n[1]),n=parseInt(n[2]),new Date(e,t-1,n)}n.d(t,{p:function(){return r},v:function(){return o}}),e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature,(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(n.register(r,"formatDate","c:\\Project\\mall-admin\\src\\utils\\date.js"),n.register(a,"padLeftZero","c:\\Project\\mall-admin\\src\\utils\\date.js"),n.register(o,"str2Date","c:\\Project\\mall-admin\\src\\utils\\date.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)},5251:function(e,t,n){"use strict";n.r(t);var r=n(26271),a=n(8834),o=n(35845),l=n(48086),i=n(39144),c=n(71577),s=n(36929),u=n(83494),d=n(19650),m=n(14617),f=n(83663),p=n(94217),g=n(67294),y=n(21671),h=n(75979),v=n(28368);function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,r=arguments[t];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function C(e,t){var n,r=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)),r}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){E(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return Z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Z(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};var O=a.Z.Option;function j(){var e=S(o.Z.useForm(),1)[0],t={name:null,sort:0,status:1,createTime:null},n=($=S((0,g.useState)(null),2))[0],C=$[1],Z=(I=S((0,g.useState)(null),2))[0],j=I[1],R=(B=S((0,g.useState)([]),2))[0],k=B[1],x=(H=S((0,g.useState)(!0),2))[0],N=H[1],P=($=S((0,g.useState)({pageNum:1,pageSize:5}),2))[0],L=$[1],z=(I=S((0,g.useState)(null),2))[0],T=I[1],H=(B=S((0,g.useState)([{label:"Delete",value:1}]),2))[0],I=(B[1],$=S((0,g.useState)(!1),2))[0],G=$[1],D=(B=S((0,g.useState)(t),2))[0],M=B[1],A=($=S((0,g.useState)(null),2))[0],F=$[1];(0,g.useEffect)((function(){_()}),[]),(0,g.useEffect)((function(){e.setFieldsValue(D)}),[D]);var _=function(){N(!0),h.T.fetchList(P).then((function(e){N(!1),C(e.data.list),j(e.data.total)}))},V=function(e){(0,v.default)({title:"Are you sure to delete?",okText:"Yes",okType:"primary",onOk:function(){var t=new URLSearchParams;t.append("ids",e),h.T.deleteReason(t).then((function(e){l.ZP.success("Delete Success",5),L(w(w({},P),{},{pageNum:1})),_()}))},onCancel:function(){}})},B=function(e){e=(t=e.target).value;var t=t.name;M(w(w({},D),{},E({},t,e)))},$={pagination:{position:"bottomRight",pageSize:P.pageSize,showQuickJumper:!0,showSizeChanger:!0,pageSizeOptions:[5,10,15],total:Z,current:P.pageNum,onShowSizeChange:function(e,t){return n=t,(t=P).pageNum=1,t.pageSize=n,L(t),void _();var n},onChange:function(e){return t=e,(e=P).pageNum=t,L(e),void _();var t}},bordered:!0,size:"default"};return Z={onChange:function(e){k(e)}},g.createElement("div",{className:"app-container"},g.createElement(i.Z,{className:"operate-container"},g.createElement(r.Z,null),g.createElement("span",null,"Data List"),g.createElement(c.Z,{size:"small",onClick:function(){G(!0),F(null),M(t)},className:"btn-add"},"Add")),g.createElement("div",{className:"table-container"},g.createElement(s.Z,b({rowSelection:w({},Z),rowKey:"id"},$,{dataSource:n,style:{width:"100%"},loading:x}),g.createElement(p.Z,{title:"Id",width:"80px",align:"center",render:function(e,t){return g.createElement("div",null,t.id)}}),g.createElement(p.Z,{title:"ReasonType",align:"center",render:function(e,t){return g.createElement("div",null,t.name)}}),g.createElement(p.Z,{title:"Sort",width:"100px",align:"center",render:function(e,t){return g.createElement("div",null,t.sort)}}),g.createElement(p.Z,{title:"Status",align:"center",render:function(e,t){return g.createElement("div",null,g.createElement(u.Z,{checked:t.status,onChange:function(e){return function(e,t){var n=[];n.push(t.id),e=e?1:0,(t=new URLSearchParams).append("status",e),t.append("ids",n),h.T.updateStatus(t).then((function(e){l.ZP.success("Status Modify Success",5),_()}))}(e,t)}}))}}),g.createElement(p.Z,{title:"CreateTime",width:"180px",align:"center",render:function(e,t){return g.createElement("div",null,function(e){return e=new Date(e),(0,y.p)(e,"yyyy-MM-dd hh:mm:ss")}(t.createTime))}}),g.createElement(p.Z,{title:"Operation",width:"160px",align:"center",render:function(e,t){return g.createElement(d.Z,null,g.createElement(c.Z,{size:"small",onClick:function(){return e=t,G(!0),F(e.id),void h.T.getReasonDetail(e.id).then((function(e){M(w({},e.data))}));var e}},"Edit"),g.createElement(c.Z,{size:"small",danger:!0,onClick:function(){return(e=[]).push(t.id),void V(e);var e}},"Delete"))}}))),g.createElement("div",{className:"batch-operate-container"},g.createElement(a.Z,{size:"small",value:z,onChange:function(e){return T(e)},placeholder:"Multiple Operation"},H.map((function(e){return g.createElement(O,{key:e.value,value:e.value},e.label)}))),g.createElement(c.Z,{style:{marginLeft:"20px"},className:"search-button",onClick:function(){if(null==R||R.length<1)l.ZP.warning("Please select the operation",5);else if(1===z){for(var e=[],t=0;t<R.length;t++)e.push(R[t].id);V(e)}},type:"primary",size:"small"},"Confirm")),g.createElement(f.default,{forceRender:!0,title:"Add Return Reason",visible:I,style:{minWidth:"350px"},width:"30%",onOk:function(){null==A?h.T.addReason(D).then((function(e){G(!1),F(null),l.ZP.success("Add Success",5),_()})):h.T.updateReason(A,D).then((function(e){G(!1),F(null),l.ZP.success("Update Success",5),_()}))},onCancel:function(){return G(!1)}},g.createElement(o.Z,{form:e,labelCol:{span:8}},g.createElement(o.Z.Item,{label:"ReasonType: ",name:"name"},g.createElement(m.Z,{value:D.name,name:"name",onChange:B,className:"input-width"})),g.createElement(o.Z.Item,{label:"Sort: ",name:"sort"},g.createElement(m.Z,{value:D.sort,name:"sort",onChange:B,className:"input-width"})),g.createElement(o.Z.Item,{label:"Status: ",name:"status"},g.createElement(u.Z,{checked:D.status,name:"status",onChange:function(e){return M(w(w({},D),{},{status:e?1:0}))}})))))}n(j,"useForm{[reasonForm]}\nuseState{[list, setList](null)}\nuseState{[total, setTotal](null)}\nuseState{[multipleSelection, setMultipleSelection]([])}\nuseState{[listLoading, setListLoading](true)}\nuseState{[listQuery, setListQuery](defaultListQuery)}\nuseState{[operateType, setOperateType](null)}\nuseState{[operateOptions, setOperateOptions]([{\r\n        label:'Delete',\r\n        value:1\r\n    }])}\nuseState{[dialogVisible, setDialogVisible](false)}\nuseState{[returnReason, setReturnReason](defaultReturnReason)}\nuseState{[operateReasonId, setOperateReasonId](null)}\nuseEffect{}\nuseEffect{}"),n=j,t.default=n,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(O,"Option","c:\\Project\\mall-admin\\src\\views\\oms\\apply\\reason.js"),t.register(j,"ReturnReason","c:\\Project\\mall-admin\\src\\views\\oms\\apply\\reason.js"),t.register(n,"default","c:\\Project\\mall-admin\\src\\views\\oms\\apply\\reason.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)}}]);