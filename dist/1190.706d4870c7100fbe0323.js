(self.webpackChunkmall_admin=self.webpackChunkmall_admin||[]).push([[1190],{6594:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"}}]},name:"left",theme:"outlined"}},77307:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"}}]},name:"right",theme:"outlined"}},68229:function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=(n=r(7500))&&n.__esModule?n:{default:n};t.default=a,e.exports=a},67638:function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=(n=r(86994))&&n.__esModule?n:{default:n};t.default=a,e.exports=a},7500:function(e,t,r){"use strict";var n=r(95318),a=r(20862);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(r(67294)),o=n(r(6594)),l=n(r(92074));(r=function(e,t){return s.createElement(l.default,Object.assign({},e,{ref:t,icon:o.default}))}).displayName="LeftOutlined",r=s.forwardRef(r),t.default=r},86994:function(e,t,r){"use strict";var n=r(95318),a=r(20862);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(r(67294)),o=n(r(77307)),l=n(r(92074));(r=function(e,t){return s.createElement(l.default,Object.assign({},e,{ref:t,icon:o.default}))}).displayName="RightOutlined",r=s.forwardRef(r),t.default=r},33603:function(e,t){"use strict";function r(){return{height:0,opacity:0}}function n(e){return{height:e.scrollHeight,opacity:1}}var a={motionName:"ant-motion-collapse",onAppearStart:r,onEnterStart:r,onAppearActive:n,onEnterActive:n,onLeaveStart:function(e){return{height:e.offsetHeight}},onLeaveActive:r,onAppearEnd:a=function(e,t){return"height"===t.propertyName},onEnterEnd:a,onLeaveEnd:a,motionDeadline:500};t.Z=a},71155:function(e,t,r){"use strict";var n=r(31780),a=r(41061),s=r(71577),o=r(74261),l=r(51908),i=r(67294);function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,s=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){a=!0,s=e}finally{try{n||null==l.return||l.return()}finally{if(a)throw s}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function d(e){function t(e){d(e,c)}var r=e.value,c=e.name,d=e.onChange,m=(0,i.useMemo)((function(){return r}),[r]),f=(0,i.useMemo)((function(){return null!=r&&""!==r?r.substr(r.lastIndexOf("/")+1):null}),[r]),j=(0,i.useMemo)((function(){return[{uid:null,name:f,url:m}]}),[f,m]),p=(0,i.useMemo)((function(){return null!==r&&""!==r&&void 0!==r}),[r]),v=(w=u((0,i.useState)({policy:"",signature:"",key:"",ossaccessKeyId:"",dir:"",host:""}),2))[0],h=w[1],b=(H=u((0,i.useState)(!1),2))[0],y=H[1],g=(e=u((0,i.useState)(!0),2))[0],H=(e[1],w=u((0,i.useState)("http://macro-oss.oss-cn-shenzhen.aliyuncs.com"),2))[0],w=(w[1],e=u((0,i.useState)("http://localhost:8080/minio/upload"),2))[0];return e[1],i.createElement("div",null,i.createElement(a.Z,{action:g?H:w,data:g?v:null,listType:"picture",multiple:!1,showUploadList:p,fileList:j,beforeUpload:function(){var e=v;return!g||new Promise((function(t,r){n.x.policy().then((function(r){e.policy=r.data.policy,e.signature=r.data.signature,e.ossaccessKeyId=r.data.accessKeyId,e.key=r.data.dir+"/${filename}",e.dir=r.data.dir,e.host=r.data.host,h(e),t(!0)})).catch((function(e){console.log(e),r(!1)}))}))},onRemove:function(){t("")},onPreview:function(){y(!0)},onChange:function(e){return function(e,r){p=!0,j.pop();var n=v.host+"/"+v.dir+"/"+r.name;g||(n=null.data.url),j.push({uid:r.uid,name:r.name,url:n}),t(j[0].url)}(0,e.file)}},i.createElement(s.Z,{size:"small",type:"primary"},"Upload"),i.createElement("div",{className:""},"JPG/PNG file only, not exceed 10MB.")),i.createElement(o.Z,{visible:b},i.createElement(l.Z,{width:"100%",src:j[0].url,alt:""})))}e=r.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(d,"useMemo{imageUrl}\nuseMemo{imageName}\nuseMemo{fileList}\nuseMemo{showFileList}\nuseState{[dataObj, setDataObj]({\r\n        policy: '',\r\n        signature: '',\r\n        key: '',\r\n        ossaccessKeyId: '',\r\n        dir: '',\r\n        host: '',\r\n    })}\nuseState{[dialogVisible, setDialogVisible](false)}\nuseState{[useOss, setUseOss](true)}\nuseState{[ossUploadUrl, setossUploadUrl]('http://macro-oss.oss-cn-shenzhen.aliyuncs.com')}\nuseState{[minioUploadUrl, setMinioUploadUrl]('http://localhost:8080/minio/upload')}"),r=d,t.Z=r,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(d,"SingleUpload","c:\\Project\\mall-admin\\src\\components\\Upload\\singleUpload.js"),t.register(r,"default","c:\\Project\\mall-admin\\src\\components\\Upload\\singleUpload.js")),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&r(e)},71004:function(e,t,r){"use strict";r.d(t,{j:function(){return a}});var n=r(32095);e=r.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var a={fetchList:s,updateStatus:o,deleteHomeAdvertise:l,createHomeAdvertise:i,getHomeAdvertise:u,updateHomeAdvertise:c};function s(e){return(0,n.Z)({url:"/home/advertise/list",method:"get",params:e})}function o(e,t){return(0,n.Z)({url:"/home/advertise/update/status/"+e,method:"post",params:t})}function l(e){return(0,n.Z)({url:"/home/advertise/delete",method:"post",data:e})}function i(e){return(0,n.Z)({url:"/home/advertise/create",method:"post",data:e})}function u(e){return(0,n.Z)({url:"/home/advertise/"+e,method:"get"})}function c(e,t){return(0,n.Z)({url:"/home/advertise/update/"+e,method:"post",data:t})}(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(r.register(a,"homeAdvertiseServices","c:\\Project\\mall-admin\\src\\services\\homeAdvertise.js"),r.register(s,"fetchList","c:\\Project\\mall-admin\\src\\services\\homeAdvertise.js"),r.register(o,"updateStatus","c:\\Project\\mall-admin\\src\\services\\homeAdvertise.js"),r.register(l,"deleteHomeAdvertise","c:\\Project\\mall-admin\\src\\services\\homeAdvertise.js"),r.register(i,"createHomeAdvertise","c:\\Project\\mall-admin\\src\\services\\homeAdvertise.js"),r.register(u,"getHomeAdvertise","c:\\Project\\mall-admin\\src\\services\\homeAdvertise.js"),r.register(c,"updateHomeAdvertise","c:\\Project\\mall-admin\\src\\services\\homeAdvertise.js")),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&r(e)},31780:function(e,t,r){"use strict";r.d(t,{x:function(){return a}});var n=r(32095);e=r.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var a={policy:s};function s(){return(0,n.Z)({url:"/aliyun/oss/policy",method:"get"})}(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(r.register(a,"ossServices","c:\\Project\\mall-admin\\src\\services\\oss.js"),r.register(s,"policy","c:\\Project\\mall-admin\\src\\services\\oss.js")),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&r(e)},26669:function(e,t,r){"use strict";var n=r(35845),a=r(8834),s=r(14617),o=r(48086),l=r(39144),i=r(78334),u=r(47933),c=r(71577),d=r(28368),m=r(67294),f=r(71004),j=r(29041),p=r(71155),v=r(30381),h=r.n(v),b=r(16550);function y(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)),n}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){var n,a;n=e,t=r[a=t],a in n?Object.defineProperty(n,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[a]=t})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,s=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){a=!0,s=e}finally{try{n||null==l.return||l.return()}finally{if(a)throw s}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?w(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function E(e){var t=(0,b.TH)(),r=e.isEdit,v=H(n.Z.useForm(),1)[0],y=a.Z.Option,w=s.Z.TextArea,E=[{label:"PC",value:0},{label:"APP",value:1}],L={name:null,type:1,pic:null,startTime:null,endTime:null,status:0,url:null,note:null,sort:0};(e=H((0,m.useState)(E),2))[0],e[1],(0,m.useEffect)((function(){r?f.j.getHomeAdvertise(t.state.id).then((function(e){v.setFieldsValue(g(g({},e.data),{},{startTime:h()(e.data.startTime),endTime:h()(e.data.endTime)}))})):v.setFieldsValue(L)}),[]);var O=function(){v.setFieldsValue(L)};return m.createElement(l.Z,{className:"form-container"},m.createElement(n.Z,{form:v,labelCol:{span:6},size:"small",onFinish:function(){(0,d.default)({title:"Are you sure to submit data?",okText:"Yes",okType:"primary",onOk:function(){r?f.j.updateHomeAdvertise(t.state.id,v.getFieldValue()).then((function(e){v.resetFields(),o.ZP.success("Modify Success",10),j.history.goBack()})):f.j.createHomeAdvertise(v.getFieldValue()).then((function(e){O(),o.ZP.success("Submit Success",10)}))},onCancel:function(){}})},onFinishFailed:function(){return o.ZP.error("Validation Fail",10),!1}},m.createElement(n.Z.Item,{label:"Name: ",name:"name",rules:[{required:!0,message:"Please enter advertise name"},{min:2,max:140,message:"Length must be between 2 and 140"}]},m.createElement(s.Z,{className:"input-width"})),m.createElement(n.Z.Item,{label:"Type: ",name:"type"},m.createElement(a.Z,{name:"type"},E.map((function(e){return m.createElement(y,{key:e.value,value:e.value},e.label)})))),m.createElement(n.Z.Item,{label:"StartTime: ",name:"startTime",rules:[{required:!0,message:"Please enter start time"}]},m.createElement(i.Z,{format:"YYYY-MM-DD HH:mm:ss",showTime:!0,showTimeplaceholder:"Select Date"})),m.createElement(n.Z.Item,{label:"EndTime: ",name:"endTime",rules:[{required:!0,message:"Please enter end time"}]},m.createElement(i.Z,{format:"YYYY-MM-DD HH:mm:ss",showTime:!0,showTimeplaceholder:"Select Date"})),m.createElement(n.Z.Item,{label:"Status: ",name:"status"},m.createElement(u.ZP.Group,{name:"status"},m.createElement(u.ZP,{value:0},"Unpublish"),m.createElement(u.ZP,{value:1},"Publish"))),m.createElement(n.Z.Item,{label:"Picture: ",name:"pic",rules:[{required:!0,message:"Please select advertise picture"}]},m.createElement(p.Z,{form:v})),m.createElement(n.Z.Item,{label:"Sort: ",name:"sort"},m.createElement(s.Z,{className:"input-width"})),m.createElement(n.Z.Item,{label:"Url: ",name:"url",rules:[{required:!0,message:"Please enter advertise url"}]},m.createElement(s.Z,{className:"input-width"})),m.createElement(n.Z.Item,{label:"Note: ",name:"note"},m.createElement(w,{rows:5,className:"input-width",placeholder:"Please enter content"})),m.createElement(n.Z.Item,null,m.createElement(c.Z,{type:"primary",htmlType:"submit"},"Confirm"),!r&&m.createElement(c.Z,{onClick:O},"Reset"))))}e=r.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(E,"useLocation{route}\nuseForm{[homeAdvertiseForm]}\nuseState{[typeOptions, setTypeOptions](defaultTypeOptions)}\nuseEffect{}",(function(){return[b.TH]})),r=E,t.Z=r,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(E,"HomeAdvertiseDetail","c:\\Project\\mall-admin\\src\\views\\sms\\advertise\\components\\homeAdvertiseDetail.js"),t.register(r,"default","c:\\Project\\mall-admin\\src\\views\\sms\\advertise\\components\\homeAdvertiseDetail.js")),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&r(e)},46700:function(e,t,r){var n={"./af":42786,"./af.js":42786,"./ar":30867,"./ar-dz":14130,"./ar-dz.js":14130,"./ar-kw":96135,"./ar-kw.js":96135,"./ar-ly":56440,"./ar-ly.js":56440,"./ar-ma":47702,"./ar-ma.js":47702,"./ar-sa":82705,"./ar-sa.js":82705,"./ar-tn":37100,"./ar-tn.js":37100,"./ar.js":30867,"./az":31083,"./az.js":31083,"./be":9808,"./be.js":9808,"./bg":68338,"./bg.js":68338,"./bm":67438,"./bm.js":67438,"./bn":8905,"./bn-bd":76225,"./bn-bd.js":76225,"./bn.js":8905,"./bo":11560,"./bo.js":11560,"./br":1278,"./br.js":1278,"./bs":80622,"./bs.js":80622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":50877,"./cv.js":50877,"./cy":47373,"./cy.js":47373,"./da":24780,"./da.js":24780,"./de":59740,"./de-at":60217,"./de-at.js":60217,"./de-ch":60894,"./de-ch.js":60894,"./de.js":59740,"./dv":5300,"./dv.js":5300,"./el":50837,"./el.js":50837,"./en-au":51894,"./en-au.js":51894,"./en-ca":77925,"./en-ca.js":77925,"./en-gb":22243,"./en-gb.js":22243,"./en-ie":46436,"./en-ie.js":46436,"./en-il":47207,"./en-il.js":47207,"./en-in":44175,"./en-in.js":44175,"./en-nz":76319,"./en-nz.js":76319,"./en-sg":31662,"./en-sg.js":31662,"./eo":92915,"./eo.js":92915,"./es":55655,"./es-do":55251,"./es-do.js":55251,"./es-mx":96112,"./es-mx.js":96112,"./es-us":71146,"./es-us.js":71146,"./es.js":55655,"./et":5603,"./et.js":5603,"./eu":77763,"./eu.js":77763,"./fa":76959,"./fa.js":76959,"./fi":11897,"./fi.js":11897,"./fil":42549,"./fil.js":42549,"./fo":94694,"./fo.js":94694,"./fr":94470,"./fr-ca":63049,"./fr-ca.js":63049,"./fr-ch":52330,"./fr-ch.js":52330,"./fr.js":94470,"./fy":5044,"./fy.js":5044,"./ga":29295,"./ga.js":29295,"./gd":2101,"./gd.js":2101,"./gl":38794,"./gl.js":38794,"./gom-deva":27884,"./gom-deva.js":27884,"./gom-latn":23168,"./gom-latn.js":23168,"./gu":95349,"./gu.js":95349,"./he":24206,"./he.js":24206,"./hi":30094,"./hi.js":30094,"./hr":30316,"./hr.js":30316,"./hu":22138,"./hu.js":22138,"./hy-am":11423,"./hy-am.js":11423,"./id":29218,"./id.js":29218,"./is":90135,"./is.js":90135,"./it":90626,"./it-ch":10150,"./it-ch.js":10150,"./it.js":90626,"./ja":39183,"./ja.js":39183,"./jv":24286,"./jv.js":24286,"./ka":12105,"./ka.js":12105,"./kk":47772,"./kk.js":47772,"./km":18758,"./km.js":18758,"./kn":79282,"./kn.js":79282,"./ko":33730,"./ko.js":33730,"./ku":1408,"./ku.js":1408,"./ky":33291,"./ky.js":33291,"./lb":36841,"./lb.js":36841,"./lo":55466,"./lo.js":55466,"./lt":57010,"./lt.js":57010,"./lv":37595,"./lv.js":37595,"./me":39861,"./me.js":39861,"./mi":35493,"./mi.js":35493,"./mk":95966,"./mk.js":95966,"./ml":87341,"./ml.js":87341,"./mn":5115,"./mn.js":5115,"./mr":10370,"./mr.js":10370,"./ms":9847,"./ms-my":41237,"./ms-my.js":41237,"./ms.js":9847,"./mt":72126,"./mt.js":72126,"./my":56165,"./my.js":56165,"./nb":64924,"./nb.js":64924,"./ne":16744,"./ne.js":16744,"./nl":93901,"./nl-be":59814,"./nl-be.js":59814,"./nl.js":93901,"./nn":83877,"./nn.js":83877,"./oc-lnc":92135,"./oc-lnc.js":92135,"./pa-in":15858,"./pa-in.js":15858,"./pl":64495,"./pl.js":64495,"./pt":89520,"./pt-br":57971,"./pt-br.js":57971,"./pt.js":89520,"./ro":96459,"./ro.js":96459,"./ru":21793,"./ru.js":21793,"./sd":40950,"./sd.js":40950,"./se":10490,"./se.js":10490,"./si":90124,"./si.js":90124,"./sk":64249,"./sk.js":64249,"./sl":14985,"./sl.js":14985,"./sq":51104,"./sq.js":51104,"./sr":8227,"./sr-cyrl":79915,"./sr-cyrl.js":79915,"./sr.js":8227,"./ss":85893,"./ss.js":85893,"./sv":98760,"./sv.js":98760,"./sw":91172,"./sw.js":91172,"./ta":27333,"./ta.js":27333,"./te":23110,"./te.js":23110,"./tet":52095,"./tet.js":52095,"./tg":27321,"./tg.js":27321,"./th":9041,"./th.js":9041,"./tk":19005,"./tk.js":19005,"./tl-ph":75768,"./tl-ph.js":75768,"./tlh":89444,"./tlh.js":89444,"./tr":72397,"./tr.js":72397,"./tzl":28254,"./tzl.js":28254,"./tzm":51106,"./tzm-latn":30699,"./tzm-latn.js":30699,"./tzm.js":51106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":67691,"./uk.js":67691,"./ur":13795,"./ur.js":13795,"./uz":6791,"./uz-latn":60588,"./uz-latn.js":60588,"./uz.js":6791,"./vi":65666,"./vi.js":65666,"./x-pseudo":14378,"./x-pseudo.js":14378,"./yo":75805,"./yo.js":75805,"./zh-cn":83839,"./zh-cn.js":83839,"./zh-hk":55726,"./zh-hk.js":55726,"./zh-mo":99807,"./zh-mo.js":99807,"./zh-tw":74152,"./zh-tw.js":74152};function a(e){return e=s(e),r(e)}function s(e){if(r.o(n,e))return n[e];throw(e=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",e}a.keys=function(){return Object.keys(n)},a.resolve=s,(e.exports=a).id=46700},27678:function(e,t,r){"use strict";function n(){return{width:document.documentElement.clientWidth,height:window.innerHeight||document.documentElement.clientHeight}}function a(e){var t=e.getBoundingClientRect();return e=document.documentElement,{left:t.left+(window.pageXOffset||e.scrollLeft)-(e.clientLeft||document.body.clientLeft||0),top:t.top+(window.pageYOffset||e.scrollTop)-(e.clientTop||document.body.clientTop||0)}}r.d(t,{g1:function(){return n},os:function(){return a}})}}]);