(self.webpackChunkmall_admin=self.webpackChunkmall_admin||[]).push([[6774],{92517:function(e,t,r){"use strict";var n=r(35247),a=r(67294),o=r(16550),l=r(46821);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}return r}}(e,t)||u(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||u(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){if(e){if("string"==typeof e)return d(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(e,t):void 0}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function s(e){(0,a.useEffect)((function(){u()}),[]);var t=(0,o.TH)();function r(e){return"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1)}(0,a.useEffect)((function(){u()}),[t]);var u=function(){var e=t.pathname.split("/"),r=m(e,[]);(e=r[0])?e&&"home"!==e.name&&(r=[{path:"/home",meta:{title:"home"}}].concat(r)):r=[{path:"/home",meta:{title:"home"}}],f(i(r))},d=c((0,a.useState)([]),2),s=d[0],f=d[1],m=function(e,t){for(var r=0;r<l.j.length;r++)if(-1!==e.indexOf(l.j[r].name)&&(t=t.concat(l.j[r])),l.j[r].children)for(var n=0;n<l.j[r].children.length;n++)-1!==e.indexOf(l.j[r].children[n].name)&&(t=t.concat(l.j[r].children[n]));return t};return a.createElement(n.Z,{className:"app-breadcrumb",separator:"/"},s.map((function(e,t){return e.meta.title&&a.createElement(n.Z.Item,{key:e.path},"noredirect"===e.redirect||t==s.length-1?a.createElement("span",{className:"no-redirect"},r(e.meta.title)):a.createElement("a",{href:e.redirect||e.path},r(e.meta.title)))})))}e=r.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(s,"useEffect{}\nuseLocation{route}\nuseEffect{}\nuseState{[levelList, setLevelList]([])}",(function(){return[o.TH]})),r=s,t.Z=r,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(s,"CBreadcrumb","c:\\Project\\mall-admin\\src\\components\\Breadcrumb\\index.js"),t.register(r,"default","c:\\Project\\mall-admin\\src\\components\\Breadcrumb\\index.js")),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&r(e)},60335:function(e,t,r){"use strict";var n=r(67294),a=r(83449),o=r.n(a);function l(e){var t=e.iconClass,r=e.className,a=(0,n.useMemo)((function(){return"".concat(o(),"#").concat(t)}),[t]);return e=(0,n.useMemo)((function(){return r?"svg-icon anticon "+r:"svg-icon anticon "}),[r]),n.createElement("svg",{className:e,"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},n.createElement("use",{xlinkHref:a,fill:"currentColor"}))}e=r.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(l,"useMemo{iconName}\nuseMemo{svgClass}"),r=l,t.Z=r,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(l,"CSvgIcon","c:\\Project\\mall-admin\\src\\components\\CSvgIcon\\index.js"),t.register(r,"default","c:\\Project\\mall-admin\\src\\components\\CSvgIcon\\index.js")),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&r(e)},4088:function(e,t,r){"use strict";var n=r(67294);function a(e){var t=e.toggleClick;return e=e.isActive,n.createElement("div",null,n.createElement("svg",{t:"1492500959545",onClick:t,className:"hamburger ".concat(e?"is-active":""),viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1691",xlinkHref:"http://www.w3.org/1999/xlink",width:"64",height:"64"},n.createElement("path",{d:"M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z","p-id":"1692"}),n.createElement("path",{d:"M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z","p-id":"1693"}),n.createElement("path",{d:"M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z","p-id":"1694"})))}e=r.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature,r=a,t.Z=r,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(a,"CHamburger","c:\\Project\\mall-admin\\src\\components\\Hamburger\\index.js"),t.register(r,"default","c:\\Project\\mall-admin\\src\\components\\Hamburger\\index.js")),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&r(e)},45843:function(e,t,r){"use strict";r.r(t);var n=r(67294),a=r(10697),o=r(44042),l=r(97183),c=r(78945),i=r(96521),u=r(33259),d=r(99640);function s(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)),n}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){var n,a;n=e,t=r[a=t],a in n?Object.defineProperty(n,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[a]=t})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?b(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}e=r.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};var p=l.Z.Header,y=l.Z.Footer,h=l.Z.Sider,v=l.Z.Content;function g(e){var t=(0,a.I0)(),r=(g=m((0,n.useState)(null),2))[0],s=g[1],b=m((0,n.useState)(null),2),g=b[0],j=b[1];function w(){t(o.x.ToggleSidebar())}return d.h.subscribe((function(){j(f({},d.h.getState().appReducer.sidebar))})),(0,n.useLayoutEffect)((function(){function e(){s(window.innerWidth)}window.addEventListener("resize",e),e()}),[]),(0,n.useLayoutEffect)((function(){var e=d.h.getState().appReducer.sidebar.opened;r&&r<768&&!e&&w()}),[r]),n.createElement(l.Z,{style:{minHeight:"100vh"}},n.createElement(h,{collapsible:!0,collapsed:!!g&&g.opened,onCollapse:w},n.createElement(c.Z,null)),n.createElement(l.Z,null,n.createElement(p,null,n.createElement(i.Z,null)),n.createElement(v,null,n.createElement(u.D,null)),n.createElement(y,{style:{textAlign:"center",padding:"10px 50px",position:"sticky",bottom:"0"},color:"#8f959c"},"©Copyright. All right reserved.")))}r(g,"useDispatch{dispatch}\nuseState{[width, setWidth](null)}\nuseState{[sideBarState, setSideBarState](null)}\nuseLayoutEffect{}\nuseLayoutEffect{}",(function(){return[a.I0]})),r=g,t.default=r,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(p,"Header","c:\\Project\\mall-admin\\src\\views\\layout\\MainLayout.js"),t.register(y,"Footer","c:\\Project\\mall-admin\\src\\views\\layout\\MainLayout.js"),t.register(h,"Sider","c:\\Project\\mall-admin\\src\\views\\layout\\MainLayout.js"),t.register(v,"Content","c:\\Project\\mall-admin\\src\\views\\layout\\MainLayout.js"),t.register(g,"MainLayout","c:\\Project\\mall-admin\\src\\views\\layout\\MainLayout.js"),t.register(r,"default","c:\\Project\\mall-admin\\src\\views\\layout\\MainLayout.js")),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&r(e)},96521:function(e,t,r){"use strict";var n=r(67294),a=r(10697),o=r(73727),l=r(16550),c=r(92517),i=r(4088),u=r(25425),d=r(44042),s=r(99210),f=r(19675),m=r(78966),b=r(99640);function p(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)),n}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){var n,a;n=e,t=r[a=t],a in n?Object.defineProperty(n,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[a]=t})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}return r}}(e,t)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?v(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function g(e){var t=(0,a.I0)(),r=(0,a.v9)((function(e){return e.userReducer.avatar})),l=h((0,n.useState)(null),2),p=l[0],v=l[1];return b.h.subscribe((function(){v(y({},b.h.getState().appReducer.sidebar))})),n.createElement("div",null,n.createElement(s.Z,{className:"navbar",mode:"horizontal",selectable:!1},n.createElement(s.Z.Item,{key:"hamburger"},n.createElement(i.Z,{className:"hamburger-container ",toggleClick:function(){t(d.x.ToggleSidebar())},isActive:!!p&&p.opened})),n.createElement(s.Z.Item,{key:"breadcrumb",style:{cursor:"default"},className:"breadcrumb-container",disabled:!0},n.createElement(c.Z,null)),n.createElement(m.Z,{key:"icon",className:"avatar-container",icon:n.createElement("div",{className:"avatar-wrapper"},n.createElement("img",{className:"user-avatar",src:r}),n.createElement(f.Z,null)),popupClassName:"user-dropdown"},n.createElement(s.Z.Item,{key:"home"},n.createElement(o.rU,{className:"inlineBlock",to:"/"},"Home")),n.createElement(s.Z.Item,{key:"logout"},n.createElement("span",{onClick:function(){t(u.h.LogOut()).then((function(){location.reload()}))},style:{display:"block"}},"Logout")))))}e=r.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(g,"useDispatch{dispatch}\nuseSelector{avatar}\nuseState{[sideBarState, setSideBarState](null)}",(function(){return[a.I0,a.v9]})),l=(0,l.EN)(g),t.Z=l,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(g,"CNavbar","c:\\Project\\mall-admin\\src\\views\\layout\\components\\Navbar.js"),t.register(l,"default","c:\\Project\\mall-admin\\src\\views\\layout\\components\\Navbar.js")),(l="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&l(e)},78945:function(e,t,r){"use strict";var n=r(67294),a=(r(10697),r(73727)),o=r(16550),l=r(29041),c=r(46821),i=r(60335),u=r(99210);function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}e=r.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};var s=u.Z.SubMenu;function f(e){var t=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done)&&(r.push(l.value),2!==r.length);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}return r}}(e)||function(e,t){if(e){if("string"==typeof e)return d(e,2);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(e,2):void 0}}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}((0,n.useState)([l.history.location.pathname])),r=t[0],o=t[1];return(0,n.useEffect)((function(){o([l.history.location.pathname])}),[l.history.location.pathname]),n.createElement(u.Z,{selectedKeys:r,mode:"inline",theme:"dark",style:{backgroundColor:"#304156",color:"#bfcbd9"}},c.j.map((function(e,t){if(!e.hidden&&e.children)return 1!==e.children.filter((function(e){return!e.hidden})).length||e.children[0].children?n.createElement(s,{key:e.path,icon:e.meta&&e.meta.icon&&n.createElement(i.Z,{iconClass:e.meta.icon}),title:e.meta&&e.meta.icon&&n.createElement("span",null,e.meta.title)},e.children.map((function(e){return e.hidden?null:n.createElement(u.Z.Item,{key:e.path},n.createElement(a.rU,{to:e.path},e.meta&&e.meta.icon&&n.createElement(i.Z,{iconClass:e.meta.icon}),e.meta&&e.meta.title&&n.createElement("span",null,e.meta.title)))}))):n.createElement(u.Z.Item,{key:e.children[0].path},n.createElement(a.rU,{to:e.children[0].path},e.children[0].meta&&e.children[0].meta.icon&&n.createElement(i.Z,{iconClass:e.children[0].meta.icon}),e.children[0].meta&&e.children[0].meta.title&&n.createElement("span",null,e.children[0].meta.title)))})))}r(f,"useState{[selectedKeys, setSelectedKeys]([history.location.pathname])}\nuseEffect{}"),o=(0,o.EN)(f),t.Z=o,(t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(t.register(s,"SubMenu","c:\\Project\\mall-admin\\src\\views\\layout\\components\\sidebar\\index.js"),t.register(f,"CSidebar","c:\\Project\\mall-admin\\src\\views\\layout\\components\\sidebar\\index.js"),t.register(o,"default","c:\\Project\\mall-admin\\src\\views\\layout\\components\\sidebar\\index.js")),(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&o(e)}}]);