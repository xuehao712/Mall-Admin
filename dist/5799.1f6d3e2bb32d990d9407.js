(self.webpackChunkmall_admin=self.webpackChunkmall_admin||[]).push([[5799],{19650:function(e,t,n){"use strict";n.d(t,{u:function(){return d},Z:function(){return f}}),t=n(67154);var r=n.n(t),a=(t=n(59713),n.n(t)),l=(t=n(63038),n.n(t)),o=n(67294),i=(t=n(94184),n.n(t)),c=n(50344),u=n(65632);function s(e){var t=e.className,n=e.direction,l=e.index,i=e.marginDirection,c=e.children,u=e.split,s=e.wrap,m=(p=o.useContext(d)).horizontalSize,f=p.verticalSize,p=(e=p.latestIndex,{});return"vertical"===n?l<e&&(p={marginBottom:m/(u?2:1)}):p=r()(r()({},l<e&&a()({},i,m/(u?2:1))),s&&{paddingBottom:f}),null==c?null:o.createElement(o.Fragment,null,o.createElement("div",{className:t,style:p},c),l<e&&u&&o.createElement("span",{className:"".concat(t,"-split"),style:p},u))}var d=o.createContext({latestIndex:0,horizontalSize:0,verticalSize:0}),m={small:8,middle:16,large:24},f=function(e){var t=(h=o.useContext(u.E_)).getPrefixCls,n=h.space,f=h.direction,p=void 0===(j=e.size)?(null==n?void 0:n.size)||"small":j,v=e.align,b=e.className,y=e.children,g=void 0===(Z=e.direction)?"horizontal":Z,h=e.prefixCls,E=e.split,L=(n=e.style,void 0!==(j=e.wrap)&&j),Z=function(e,t){var n={};for(a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]]);return n}(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),j=o.useMemo((function(){return(Array.isArray(p)?p:[p,p]).map((function(e){return"string"==typeof(e=e)?m[e]:e||0}))}),[p]);if(j=(e=l()(j,2))[0],e=e[1],0===(y=(0,c.Z)(y,{keepEmpty:!0})).length)return null;v=void 0===v&&"horizontal"===g?"center":v,t=t("space",h),b=i()(t,"".concat(t,"-").concat(g),(h={},a()(h,"".concat(t,"-rtl"),"rtl"===f),a()(h,"".concat(t,"-align-").concat(v),v),h),b);var H="".concat(t,"-item"),P="rtl"===f?"marginLeft":"marginRight",M=0;return y=y.map((function(e,t){return null!=e&&(M=t),o.createElement(s,{className:H,key:"".concat(H,"-").concat(t),direction:g,index:t,marginDirection:P,split:E,wrap:L},e)})),o.createElement("div",r()({className:b,style:r()(r()({},L&&{flexWrap:"wrap",marginBottom:-e}),n)},Z),o.createElement(d.Provider,{value:{horizontalSize:j,verticalSize:e,latestIndex:M}},y))}},91774:function(e,t,n){"use strict";n.d(t,{X:function(){return a}});var r=n(16911);e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var a={fetchList:l,deleteMenu:o,createMenu:i,updateMenu:c,getMenu:u,updateHidden:s,fetchTreeList:d};function l(e,t){return(0,r.Z)({url:"/menu/list/"+e,method:"get",params:t})}function o(e){return(0,r.Z)({url:"/menu/delete/"+e,method:"post"})}function i(e){return(0,r.Z)({url:"/menu/create",method:"post",data:e})}function c(e,t){return(0,r.Z)({url:"/menu/update/"+e,method:"post",data:t})}function u(e){return(0,r.Z)({url:"/menu/"+e,method:"get"})}function s(e,t){return(0,r.Z)({url:"/menu/updateHidden/"+e,method:"post",params:t})}function d(){return(0,r.Z)({url:"/menu/treeList",method:"get"})}(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(n.register(a,"menuServices","c:\\Project\\mall-admin\\src\\services\\menu.js"),n.register(l,"fetchList","c:\\Project\\mall-admin\\src\\services\\menu.js"),n.register(o,"deleteMenu","c:\\Project\\mall-admin\\src\\services\\menu.js"),n.register(i,"createMenu","c:\\Project\\mall-admin\\src\\services\\menu.js"),n.register(c,"updateMenu","c:\\Project\\mall-admin\\src\\services\\menu.js"),n.register(u,"getMenu","c:\\Project\\mall-admin\\src\\services\\menu.js"),n.register(s,"updateHidden","c:\\Project\\mall-admin\\src\\services\\menu.js"),n.register(d,"fetchTreeList","c:\\Project\\mall-admin\\src\\services\\menu.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)},41079:function(e,t,n){"use strict";var r=n(35845),a=n(8834),l=n(48086),o=n(39144),i=n(14617),c=n(47933),u=n(19650),s=n(71577),d=n(28368),m=n(67294),f=n(16550),p=n(91774);function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,l=void 0;try{for(var o,i=e[Symbol.iterator]();!(r=(o=i.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,l=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw l}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function y(e){var t=(0,f.TH)(),n=v(r.Z.useForm(),1)[0],b=a.Z.Option,y=e.isEdit;(0,m.useEffect)((function(){y?p.X.getMenu(t.state.id).then((function(e){n.setFieldsValue(e.data)})):n.setFieldsValue(g),L()}),[]);var g={title:"",parentId:0,name:"",icon:"",hidden:0,sort:0},h=v((0,m.useState)([]),2),E=(e=h[0],h[1]),L=function(){p.X.fetchList(0,{pageSize:100,pageNum:1}).then((function(e){(e=e.data.list).unshift({id:0,title:"No Parent"}),E(e)}))};return m.createElement("div",{className:"form-wrapper"},m.createElement(o.Z,{className:"form-container"},m.createElement(r.Z,{form:n,labelCol:{span:5},size:"small",onFinish:onsubmit,onFinishFailed:function(){return l.ZP.error("Validation Fail",10),!1}},m.createElement(r.Z.Item,{label:"MenuTitle: ",name:"title",rules:[{required:!0,message:"Please enter menu title"},{min:2,max:140,message:"Length must be between 2 and 140"}]},m.createElement(i.Z,null)),m.createElement(r.Z.Item,{label:"ParentMenu: ",name:"parentId"},m.createElement(a.Z,{placeholder:"Please select menu"},e.map((function(e){return m.createElement(b,{key:e.id,value:e.id},e.title)})))),m.createElement(r.Z.Item,{label:"Name: ",name:"name",rules:[{required:!0,message:"Please enter frontend name"},{min:2,max:140,message:"Length must be between 2 and 140"}]},m.createElement(i.Z,null)),m.createElement(r.Z.Item,{label:"Icon: ",name:"icon",rules:[{required:!0,message:"Please enter frontend icon"},{min:2,max:140,message:"Length must be between 2 and 140"}]},m.createElement(i.Z,null)),m.createElement(r.Z.Item,{label:"Hidden: ",name:"hidden"},m.createElement(c.ZP.Group,null,m.createElement(c.ZP,{value:0},"Yes"),m.createElement(c.ZP,{value:1},"No"))),m.createElement(r.Z.Item,{label:"Sort: ",name:"sort"},m.createElement(i.Z,{type:"number"})),m.createElement(r.Z.Item,null,m.createElement(u.Z,null,m.createElement(s.Z,{type:"primary",onClick:function(){(0,d.default)({title:"Are you sure to submit data?",okText:"Yes",okType:"primary",onOk:function(){y?p.X.updateMenu(t.state.id,n.getFieldValue()).then((function(e){l.ZP.success("Modify Success",10),history.back()})):p.X.createMenu(n.getFieldValue()).then((function(e){l.ZP.success("Modify Success",10),history.back()}))},onCancel:function(){}})}},"Submit"),!y&&m.createElement(s.Z,{onClick:function(){n.setFieldsValue(g),L()}},"Reset"))))))}e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(y,"useLocation{route}\nuseForm{[menuForm]}\nuseEffect{}\nuseState{[selectMenuList, setSelectMenuList]([])}",(function(){return[f.TH]})),n=y,t.Z=n,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(y,"MenuDetail","c:\\Project\\mall-admin\\src\\views\\ums\\menu\\components\\menuDetail.js"),t.register(n,"default","c:\\Project\\mall-admin\\src\\views\\ums\\menu\\components\\menuDetail.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)},5799:function(e,t,n){"use strict";n.r(t);var r=n(67294),a=n(41079);function l(){return r.createElement(a.Z,{isEdit:!0})}e=n.hmd(e),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature,n=l,t.default=n,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(l,"UpdateMenu","c:\\Project\\mall-admin\\src\\views\\ums\\menu\\update.js"),t.register(n,"default","c:\\Project\\mall-admin\\src\\views\\ums\\menu\\update.js")),(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&n(e)}}]);