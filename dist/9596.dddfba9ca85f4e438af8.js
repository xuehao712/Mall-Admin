(self.webpackChunkmall_admin=self.webpackChunkmall_admin||[]).push([[9596],{30076:function(e,t,n){"use strict";n.d(t,{Z:function(){return S}});var r=n(28481),o=n(96156),a=n(81253),l=n(67294),i=(t=n(94184),n.n(t)),c=n(28991),u=n(90484),s=n(26401),d=n(80334),m=n(38186);function f(e){return"object"===(0,u.Z)(e)&&"string"==typeof e.name&&"string"==typeof e.theme&&("object"===(0,u.Z)(e.icon)||"function"==typeof e.icon)}function p(e){var t=0<arguments.length&&void 0!==e?e:{};return Object.keys(t).reduce((function(e,n){var r=t[n];return"class"===n?(e.className=r,delete e.class):e[n]=r,e}),{})}function h(e){return(0,s.generate)(e)[0]}function g(e){return e?Array.isArray(e)?e:[e]:[]}var y=!1,v={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};(n=function(e){var t=e.icon,n=e.className,r=e.onClick,o=e.style,i=e.primaryColor,u=e.secondaryColor,s=(0,a.Z)(e,["icon","className","onClick","style","primaryColor","secondaryColor"]);return e=v,i&&(e={primaryColor:i,secondaryColor:u||h(i)}),function(e){var t=0<arguments.length&&void 0!==e?e:"\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";(0,l.useEffect)((function(){y||((0,m.insertCss)(t,{prepend:!0}),y=!0)}),[])}(),u=f(t),i="icon should be icon definiton, but got ".concat(t),(0,d.ZP)(u,"[@ant-design/icons] ".concat(i)),f(t)?(t&&"function"==typeof t.icon&&(t=(0,c.Z)((0,c.Z)({},t),{},{icon:t.icon(e.primaryColor,e.secondaryColor)})),function e(t,n,r){return r?l.createElement(t.tag,(0,c.Z)((0,c.Z)({key:n},p(t.attrs)),r),(t.children||[]).map((function(r,o){return e(r,"".concat(n,"-").concat(t.tag,"-").concat(o))}))):l.createElement(t.tag,(0,c.Z)({key:n},p(t.attrs)),(t.children||[]).map((function(r,o){return e(r,"".concat(n,"-").concat(t.tag,"-").concat(o))})))}(t.icon,"svg-".concat(t.name),(0,c.Z)({className:n,onClick:r,style:o,"data-icon":t.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},s))):null}).displayName="IconReact",n.getTwoToneColors=function(){return(0,c.Z)({},v)},n.setTwoToneColors=function(e){var t=e.primaryColor;e=e.secondaryColor,v.primaryColor=t,v.secondaryColor=e||h(t),v.calculated=!!e};var b=n;function P(e){var t=g(e);return t=(e=(0,r.Z)(t,2))[0],e=e[1],b.setTwoToneColors({primaryColor:t,secondaryColor:e})}P("#1890ff"),(n=l.forwardRef((function(e,t){var n=e.className,c=e.icon,u=e.spin,s=e.rotate,d=e.tabIndex,m=e.onClick,f=e.twoToneColor;return e=(0,a.Z)(e,["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"]),u=i()("anticon",(0,o.Z)({},"anticon-".concat(c.name),Boolean(c.name)),{"anticon-spin":!!u||"loading"===c.name},n),void 0===(n=d)&&m&&(n=-1),d=s?{msTransform:"rotate(".concat(s,"deg)"),transform:"rotate(".concat(s,"deg)")}:void 0,s=g(f),s=(f=(0,r.Z)(s,2))[0],f=f[1],l.createElement("span",Object.assign({role:"img","aria-label":c.name},e,{ref:t,tabIndex:n,onClick:m,className:u}),l.createElement(b,{icon:c,primaryColor:s,secondaryColor:f,style:d}))}))).displayName="AntdIcon",n.getTwoToneColor=function(){var e=b.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor},n.setTwoToneColor=P;var S=n},26271:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(67294),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"profile",theme:"outlined"},a=n(30076);(n=function(e,t){return r.createElement(a.Z,Object.assign({},e,{ref:t,icon:o}))}).displayName="ProfileOutlined";var l=r.forwardRef(n)},60509:function(e,t,n){"use strict";n.d(t,{j:function(){return o}});var r=n(79028);e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var o={fetchList:a,createFlashProductRelation:l,deleteFlashProductRelation:i,updateFlashProductRelation:c};function a(e){return(0,r.Z)({url:"/flashProductRelation/list",method:"get",params:e})}function l(e){return(0,r.Z)({url:"/flashProductRelation/create",method:"post",data:e})}function i(e){return(0,r.Z)({url:"/flashProductRelation/delete/"+e,method:"post"})}function c(e,t){return(0,r.Z)({url:"/flashProductRelation/update/"+e,method:"post",data:t})}(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(n.register(o,"flashProductRelationServices","c:\\Project\\mall-admin\\src\\services\\flashProductRelation.js"),n.register(a,"fetchList","c:\\Project\\mall-admin\\src\\services\\flashProductRelation.js"),n.register(l,"createFlashProductRelation","c:\\Project\\mall-admin\\src\\services\\flashProductRelation.js"),n.register(i,"deleteFlashProductRelation","c:\\Project\\mall-admin\\src\\services\\flashProductRelation.js"),n.register(c,"updateFlashProductRelation","c:\\Project\\mall-admin\\src\\services\\flashProductRelation.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)},32488:function(e,t,n){"use strict";n.d(t,{D:function(){return o}});var r=n(79028);e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var o={fetchList:a,fetchSimpleList:l,updateDeleteStatus:i,updateNewStatus:c,updateRecommendStatus:u,updatePublishStatus:s,createProduct:d,updateProduct:m,getProduct:f};function a(e){return(0,r.Z)({url:"/product/list",method:"get",params:e})}function l(e){return(0,r.Z)({url:"/product/simpleList",method:"get",params:e})}function i(e){return(0,r.Z)({url:"/product/update/deleteStatus",method:"post",params:e})}function c(e){return(0,r.Z)({url:"/product/update/newStatus",method:"post",params:e})}function u(e){return(0,r.Z)({url:"/product/update/recommendStatus",method:"post",params:e})}function s(e){return(0,r.Z)({url:"/product/update/publishStatus",method:"post",params:e})}function d(e){return(0,r.Z)({url:"/product/create",method:"post",data:e})}function m(e,t){return(0,r.Z)({url:"/product/update/"+e,method:"post",data:t})}function f(e){return(0,r.Z)({url:"/product/updateInfo/"+e,method:"get"})}(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(n.register(o,"productServices","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(a,"fetchList","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(l,"fetchSimpleList","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(i,"updateDeleteStatus","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(c,"updateNewStatus","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(u,"updateRecommendStatus","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(s,"updatePublishStatus","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(d,"createProduct","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(m,"updateProduct","c:\\Project\\mall-admin\\src\\services\\product.js"),n.register(f,"getProduct","c:\\Project\\mall-admin\\src\\services\\product.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)},19596:function(e,t,n){"use strict";n.r(t);var r=n(67294),o=n(14617),a=n(48086),l=n(39144),i=n(71577),c=n(36929),u=n(35845),s=n(26271),d=n(94217),m=n(83663),f=n(60509),p=n(32488),h=n(16550),g=n(28368);function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,r=arguments[t];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function v(e,t){var n,r=Object.keys(e);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(e),t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)),r}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){P(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?E(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function w(){var e=o.Z.Search,t=(0,h.TH)();(0,r.useEffect)((function(){x()}),[]);var n={pageNum:1,pageSize:5,flashPromotionId:t.state.flashPromotionId,flashPromotionSessionId:t.state.flashPromotionSessionId},v=(F=S((0,r.useState)(n),2))[0],E=F[1],w=(k=S((0,r.useState)(null),2))[0],C=k[1],Z=(G=S((0,r.useState)(null),2))[0],j=G[1],L=(t=(D=S((0,r.useState)(!1),2))[0],D[1]),k=((n=S((0,r.useState)(!1),2))[0],n[1],F=S((0,r.useState)(!1),2))[0],O=F[1],N=(G=S((0,r.useState)({list:null,total:null,multipleSelection:[],listQuery:{keyword:null,pageNum:1,pageSize:5}}),2))[0],R=G[1],z=(n=(D=S((0,r.useState)(!1),2))[0],D[1]),H=(F=S((0,r.useState)({product:{}}),2))[0],T=F[1],x=function(){L(!0),f.j.fetchList(v).then((function(e){L(!1),C(e.data.list),j(e.data.total)}))},I=function(){p.D.fetchList(N.listQuery).then((function(e){R(b(b({},N),{},{list:e.data.list,total:e.data.total}))}))},G={pagination:{position:"bottomRight",pageSize:v.pageSize,showQuickJumper:!0,showSizeChanger:!0,showTotal:function(e){return"Total ".concat(e," items")},pageSizeOptions:[5,10,15],total:Z,current:v.pageNum,onShowSizeChange:function(e,t){return n=t,(t=v).pageNum=1,t.pageSize=n,E(t),void x();var n},onChange:function(e){return t=e,(e=v).pageNum=t,E(e),void x();var t}},bordered:!0,size:"default"},D={pagination:{position:"bottomRight",pageSize:N.listQuery.pageSize,showQuickJumper:!0,showSizeChanger:!0,showTotal:function(e){return"Total ".concat(e," items")},pageSizeOptions:[5,10,15],total:N.total,current:N.listQuery.pageNum,onShowSizeChange:function(e,t){return n=t,(t=N).listQuery.pageNum=1,t.listQuery.pageSize=n,R(t),void I();var n},onChange:function(e){return t=e,(e=N).listQuery.pageNum=t,R(e),void I();var t}},bordered:!0,size:"default"},F={onChange:function(e,t){t=t,R(b(b({},N),{},{multipleSelection:t}))}};return Z=function(e){e=(t=e.target).value;var t=t.name;T(b(b({},H),{},P({},t,e)))},r.createElement("div",{className:"app-container"},r.createElement(l.Z,{className:"operate-container"},r.createElement(s.Z,null),r.createElement("span",null,"Data List"),r.createElement(i.Z,{size:"small",className:"btn-add",onClick:function(){O(!0),I()},style:{marginLeft:"20px"}},"Add")),r.createElement("div",{className:"table-container"},r.createElement(c.Z,y({rowKey:"id"},G,{dataSource:w,style:{width:"100%"},loading:t}),r.createElement(d.Z,{width:"100px",align:"center",title:"Id",render:function(e,t){return r.createElement("div",null,t.id)}}),r.createElement(d.Z,{align:"center",title:"Name",render:function(e,t){return r.createElement("div",null,t.product.name)}}),r.createElement(d.Z,{align:"center",width:"140px",title:"Sn",render:function(e,t){return r.createElement("div",null,"NO.",t.product.productSn)}}),r.createElement(d.Z,{width:"100px",align:"center",title:"Price",render:function(e,t){return r.createElement("div",null,"$",t.product.price)}}),r.createElement(d.Z,{width:"100px",align:"center",title:"Stock",render:function(e,t){return r.createElement("div",null,t.product.stock)}}),r.createElement(d.Z,{width:"100px",align:"center",title:"FlashPrice",render:function(e,t){return r.createElement("div",null,null!==t.flashPromotionPrice&&r.createElement("div",null,"$",t.flashPromotionPrice))}}),r.createElement(d.Z,{width:"100px",align:"center",title:"FlashCount",render:function(e,t){return r.createElement("div",null,t.flashPromotionCount)}}),r.createElement(d.Z,{width:"100px",align:"center",title:"FlashLimit",render:function(e,t){return r.createElement("div",null,t.flashPromotionLimit)}}),r.createElement(d.Z,{width:"100px",align:"center",title:"Sort",render:function(e,t){return r.createElement("div",null,t.sort)}}),r.createElement(d.Z,{width:"100px",align:"center",title:"Operation",render:function(e,t){return r.createElement("div",null,r.createElement(i.Z,{size:"small",type:"text",onClick:function(){return e=t,z(!0),void T(e);var e}},"Modify"),r.createElement(i.Z,{size:"small",type:"text",onClick:function(){return e=t,void(0,g.default)({title:"Are you sure to delete this product?",okText:"Yes",okType:"primary",onOk:function(){f.j.deleteFlashProductRelation(e.id).then((function(e){a.ZP.success("Delete Success"),x()}))},onCancel:function(){}});var e}},"Delete"))}}))),r.createElement(m.default,{title:"Select Product",visible:k,width:"50%",onCancel:function(){return O(!1)},onOk:function(){if(N.multipleSelection<1)a.ZP.warning("Please select a record",10);else{for(var e=[],t=0;t<N.multipleSelection.length;t++)e.push({productId:N.multipleSelection[t].id,flashPromotionId:v.flashPromotionId,flashPromotionSessionId:v.flashPromotionSessionId});(0,g.default)({title:"Are you sure to add?",okText:"Yes",okType:"primary",onOk:function(){f.j.createFlashProductRelation(e).then((function(e){O(!1);var t=N;t.multipleSelection=[],R(t),x(),a.ZP.success("Add Success")}))},onCancel:function(){}})}}},r.createElement(e,{value:N.listQuery.keyword,name:"keyword",size:"small",onChange:function(e){return R(b(b({},N),{},{listQuery:b(b({},N.listQuery),{},{keyword:e.target.value})}))},onSearch:function(){I()},placeholder:"Product Name Search"}),r.createElement(c.Z,y({rowKey:"productSn",rowSelection:b({},F)},D,{dataSource:N.list}),r.createElement(d.Z,{title:"Name",align:"center",render:function(e,t){return r.createElement("div",null,t.name)}}),r.createElement(d.Z,{title:"Sn",width:"160px",align:"center",render:function(e,t){return r.createElement("div",null,"NO.",t.productSn)}}),r.createElement(d.Z,{title:"Price",width:"120px",align:"center",render:function(e,t){return r.createElement("div",null,"$",t.price)}}))),r.createElement(m.default,{title:"Modify Flash Product",visible:n,width:"40%",onCancel:function(){return z(!1)},onOk:function(){(0,g.default)({title:"Are you sure to confirm?",okText:"Yes",okType:"primary",onOk:function(){f.j.updateFlashProductRelation(H.id,H).then((function(e){a.ZP.success("Modify Success"),z(!1),x()}))},onCancel:function(){}})}},r.createElement(u.Z,{labelCol:{span:5},size:"small"},r.createElement(u.Z.Item,{label:"Name: "},r.createElement("span",null,H.product.name)),r.createElement(u.Z.Item,{label:"Sn: "},r.createElement("span",null,H.product.productSn)),r.createElement(u.Z.Item,{label:"Price: "},r.createElement("span",null,"$",H.product.price)),r.createElement(u.Z.Item,{label:"FlashPrice: "},r.createElement(o.Z,{value:H.flashPromotionPrice,name:"flashPromotionPrice",onChange:Z,className:"ProductRelation_input-width",prefix:"$"})),r.createElement(u.Z.Item,{label:"Stock: "},r.createElement("span",null,H.product.stock)),r.createElement(u.Z.Item,{label:"FlashCount: "},r.createElement(o.Z,{value:H.flashPromotionCount,name:"flashPromotionCount",onChange:Z,className:"ProductRelation_input-width"})),r.createElement(u.Z.Item,{label:"FlashLimit: "},r.createElement(o.Z,{value:H.flashPromotionLimit,name:"flashPromotionLimit",onChange:Z,className:"ProductRelation_input-width"})),r.createElement(u.Z.Item,{label:"Sort: "},r.createElement(o.Z,{value:H.sort,name:"sort",onChange:Z,className:"ProductRelation_input-width"})))))}e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(w,"useLocation{route}\nuseEffect{}\nuseState{[listQuery, setListQuery](defaultListQuery)}\nuseState{[list, setList](null)}\nuseState{[total, setTotal](null)}\nuseState{[listLoading, setListLoading](false)}\nuseState{[dialogVisible, setDialogVisible](false)}\nuseState{[selectDialogVisible, setSelectDialogVisible](false)}\nuseState{[dialogData, setDialogData]({\r\n        list: null,\r\n        total: null,\r\n        multipleSelection:[],\r\n        listQuery:{\r\n          keyword: null,\r\n          pageNum: 1,\r\n          pageSize: 5\r\n        }\r\n    })}\nuseState{[editDialogVisible, setEditDialogVisible](false)}\nuseState{[flashProductRelation, setFlashProductRelation]({\r\n        product:{}\r\n    })}",(function(){return[h.TH]})),n=w,t.default=n,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(w,"ProductRelationList","c:\\Project\\mall-admin\\src\\views\\sms\\flash\\productRelationList.js"),t.register(n,"default","c:\\Project\\mall-admin\\src\\views\\sms\\flash\\productRelationList.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)}}]);