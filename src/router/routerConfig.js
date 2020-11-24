import React, { lazy } from "react";
const history = lazy(() => import('../redux/shared/history-redux'));
const Login = lazy(() => import('views/login/index'));
const NotFound = lazy(() => import('views/404'));
const Home = lazy(() => import('views/home/index'));
const Product = lazy(() => import('views/pms/product/index'));
const AddProduct = lazy(() => import('views/pms/product/add'));
const UpdateProduct = lazy(() => import('views/pms/product/update'));
const ProductCate = lazy(() => import('views/pms/productCate/index'));
const AddProductCate = lazy(() => import('views/pms/productCate/add'));
const UpdateProductCate = lazy(() => import('views/pms/productCate/update'));
const ProductAttr = lazy(() => import('views/pms/productAttr/index'));
const ProductAttrList = lazy(() => import('views/pms/productAttr/productAttrList'));
const AddProductAttr = lazy(() => import('views/pms/productAttr/addProductAttr'));
const UpdateProductAttr = lazy(() => import('views/pms/productAttr/updateProductAttr'));
const Brand = lazy(() => import('views/pms/brand/index'));
const AddBrand = lazy(() => import('views/pms/brand/add'));
const UpdateBrand = lazy(() => import('views/pms/brand/update'));
const Order = lazy(() => import('views/oms/order/index'));
const OrderDetail = lazy(() => import('views/oms/order/orderDetail'));
const DeliverOrderList = lazy(() => import('views/oms/order/deliverOrderList'));
const OrderSetting = lazy(() => import('views/oms/order/setting'));
const ReturnApply = lazy(() => import('views/oms/apply/index'));
const ReturnReason = lazy(() => import('views/oms/apply/reason'));
const ReturnApplyDetail = lazy(() => import('views/oms/apply/applyDetail'));
const Flash = lazy(() => import('views/sms/flash/index'));
const FlashSession = lazy(() => import('views/sms/flash/sessionList'));
const SelectSession = lazy(() => import('views/sms/flash/selectSessionList'));
const FlashProductRelation = lazy(() => import('views/sms/flash/productRelationList'));
const Coupon = lazy(() => import('views/sms/coupon/index'));
const AddCoupon = lazy(() => import('views/sms/coupon/add'));
const UpdateCoupon = lazy(() => import('views/sms/coupon/update'));
const CouponHistory = lazy(() => import('views/sms/coupon/history'));
const HomeBrand = lazy(() => import('views/sms/brand/index'));
const HomeNew = lazy(() => import('views/sms/new/index'));
const HomeHot = lazy(() => import('views/sms/hot/index'));
const HomeSubject = lazy(() => import('views/sms/subject/index'));
const HomeAdvertise = lazy(() => import('views/sms/advertise/index'));
const AddHomeAdvertise = lazy(() => import('views/sms/advertise/add'));
const UpdateHomeAdvertise = lazy(() => import('views/sms/advertise/update'));
const Admin = lazy(() => import('views/ums/admin/index'));
const Role = lazy(() => import('views/ums/role/index'));
const AllocMenu = lazy(() => import('views/ums/role/allocMenu'));
const AllocResource = lazy(() => import('views/ums/role/allocResource'));
const Menu = lazy(() => import('views/ums/menu/index'));
const AddMenu = lazy(() => import('views/ums/menu/add'));
const UpdateMenu = lazy(() => import('views/ums/menu/update'));
const Resource = lazy(() => import('views/ums/resource/index'));
const ResourceCategory = lazy(() => import('views/ums/resource/categoryList'));
const Layout = lazy(() => import('views/layout/MainLayout'));

// const routes = [
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/home',
//     children: [{
//       path: '/home',
//       name: 'home',
//       component: Home,
//       meta: {title: 'Home', icon: 'home'}
//     }]
//   },
//   {
//     path: '/pms',
//     redirect: '/pms/product',
//     component: Layout,
//     name: 'pms',
//     meta: {title: 'Product', icon: 'product'},
//     children: [{
//       path: '/pms/product',
//       name: 'product',
//       component:Product,
//       meta: {title: 'Product List', icon: 'product-list'}
//     },
//       {
//         path: '/pms/addProduct',
//         name: 'addProduct',
//         component:AddProduct,
//         meta: {title: 'Add Product', icon: 'product-add'}
//       },
//       {
//         path: '/pms/updateProduct',
//         name: 'updateProduct',
//         component:UpdateProduct,
//         meta: {title: 'Modify Product', icon: 'product-add'},
//         hidden: true
//       },
//       {
//         path: '/pms/productCate',
//         name: 'productCate',
//         component:ProductCate,
//         meta: {title: 'Product Cate', icon: 'product-cate'}
//       },
//       {
//         path: '/pms/addProductCate',
//         name: 'addProductCate',
//         component:AddProductCate,
//         meta: {title: 'Add Product Cate'},
//         hidden: true
//       },
//       {
//         path: '/pms/updateProductCate',
//         name: 'updateProductCate',
//         component:UpdateProductCate,
//         meta: {title: 'Modify Product Cate'},
//         hidden: true
//       },
//       {
//         path: '/pms/productAttr',
//         name: 'productAttr',
//         component:ProductAttr,
//         meta: {title: 'Product Attr', icon: 'product-attr'}
//       },
//       {
//         path: '/pms/productAttrList',
//         name: 'productAttrList',
//         component:ProductAttrList,
//         meta: {title: 'Product Attr List'},
//         hidden: true
//       },
//       {
//         path: '/pms/addProductAttr',
//         name: 'addProductAttr',
//         component:AddProductAttr,
//         meta: {title: 'Add Product Attr'},
//         hidden: true
//       },
//       {
//         path: '/pms/updateProductAttr',
//         name: 'updateProductAttr',
//         component:UpdateProductAttr,
//         meta: {title: 'Modify Product Attr'},
//         hidden: true
//       },
//       {
//         path: '/pms/brand',
//         name: 'brand',
//         component:Brand,
//         meta: {title: 'Brand', icon: 'product-brand'}
//       },
//       {
//         path: '/pms/addBrand',
//         name: 'addBrand',
//         component:AddBrand,
//         meta: {title: 'Add Brand'},
//         hidden: true
//       },
//       {
//         path: '/pms/updateBrand',
//         name: 'updateBrand',
//         component:UpdateBrand,
//         meta: {title: 'Modify Brand'},
//         hidden: true
//       }
//     ]
//   },
//   {
//     path: '/oms',
//     component: Layout,
//     redirect: '/oms/order',
//     name: 'oms',
//     meta: {title: 'Order', icon: 'order'},
//     children: [
//       {
//         path: '/oms/order',
//         name: 'order',
//         component:Order,
//         meta: {title: 'Order List', icon: 'product-list'}
//       },
//       {
//         path: '/oms/orderDetail',
//         name: 'orderDetail',
//         component:OrderDetail,
//         meta: {title: 'Order Detail'},
//         hidden:true
//       },
//       {
//         path: '/oms/deliverOrderList',
//         name: 'deliverOrderList',
//         component:DeliverOrderList,
//         meta: {title: 'Delivery Order List'},
//         hidden:true
//       },
//       {
//         path: '/oms/orderSetting',
//         name: 'orderSetting',
//         component:OrderSetting,
//         meta: {title: 'Order Setting', icon: 'order-setting'}
//       },
//       {
//         path: '/oms/returnApply',
//         name: 'returnApply',
//         component:ReturnApply,
//         meta: {title: 'Return Apply', icon: 'order-return'}
//       },
//       {
//         path: '/oms/returnReason',
//         name: 'returnReason',
//         component:ReturnReason,
//         meta: {title: 'Return Reason', icon: 'order-return-reason'}
//       },
//       {
//         path: '/oms/returnApplyDetail',
//         name: 'returnApplyDetail',
//         component:ReturnApplyDetail,
//         meta: {title: 'Return Detail'},
//         hidden:true
//       }
//     ]
//   },
//   {
//     path:'/sms',
//     component: Layout,
//     redirect: '/sms/coupon',
//     name: 'sms',
//     meta: {title: 'Promotion', icon: 'sms'},
//     children: [
//       {
//         path: '/sms/flash',
//         name: 'flash',
//         component:Flash,
//         meta: {title: 'Flash List', icon: 'sms-flash'}
//       },
//       {
//         path: '/sms/flashSession',
//         name: 'flashSession',
//         component:FlashSession,
//         meta: {title: 'Flash Session'},
//         hidden:true
//       },
//       {
//         path: '/sms/selectSession',
//         name: 'selectSession',
//         component:SelectSession,
//         meta: {title: 'Flash Select Session'},
//         hidden:true
//       },
//       {
//         path: '/sms/flashProductRelation',
//         name: 'flashProductRelation',
//         component:FlashProductRelation,
//         meta: {title: 'Flash Product'},
//         hidden:true
//       },
//       {
//         path: '/sms/coupon',
//         name: 'coupon',
//         component:Coupon,
//         meta: {title: 'Coupon', icon: 'sms-coupon'}
//       },
//       {
//         path: '/sms/addCoupon',
//         name: 'addCoupon',
//         component:AddCoupon,
//         meta: {title: 'Add Coupon'},
//         hidden:true
//       },
//       {
//         path: '/sms/updateCoupon',
//         name: 'updateCoupon',
//         component:UpdateCoupon,
//         meta: {title: 'Modify Coupon'},
//         hidden:true
//       },
//       {
//         path: '/sms/couponHistory',
//         name: 'couponHistory',
//         component:CouponHistory,
//         meta: {title: 'Coupon History'},
//         hidden:true
//       },
//       {
//         path: '/sms/brand',
//         name: 'homeBrand',
//         component:HomeBrand,
//         meta: {title: 'Home Brand', icon: 'product-brand'}
//       },
//       {
//         path: '/sms/new',
//         name: 'homeNew',
//         component:HomeNew,
//         meta: {title: 'Home New', icon: 'sms-new'}
//       },
//       {
//         path: '/sms/hot',
//         name: 'homeHot',
//         component:HomeHot,
//         meta: {title: 'Home Hot', icon: 'sms-hot'}
//       },
//       {
//         path: '/sms/subject',
//         name: 'homeSubject',
//         component:HomeSubject,
//         meta: {title: 'Home Subject', icon: 'sms-subject'}
//       },
//       {
//         path: '/sms/advertise',
//         name: 'homeAdvertise',
//         component:HomeAdvertise,
//         meta: {title: 'Home Advertise', icon: 'sms-ad'}
//       },
//       {
//         path: '/sms/addAdvertise',
//         name: 'addHomeAdvertise',
//         component:AddHomeAdvertise,
//         meta: {title: 'Add Advertise'},
//         hidden:true
//       },
//       {
//         path: '/sms/updateAdvertise',
//         name: 'updateHomeAdvertise',
//         component:UpdateHomeAdvertise,
//         meta: {title: 'Modify Advertise'},
//         hidden:true
//       }
//     ]
//   },
//   {
//     path:'/ums',
//     component: Layout,
//     redirect: '/ums/admin',
//     name: 'ums',
//     meta: {title: 'Permission', icon: 'ums'},
//     children: [
//       {
//         path: '/ums/admin',
//         name: 'admin',
//         component:Admin,
//         meta: {title: 'Admin', icon: 'ums-admin'}
//       },
//       {
//         path: '/ums/role',
//         name: 'role',
//         component:Role,
//         meta: {title: 'Role', icon: 'ums-role'}
//       },
//       {
//         path: '/ums/allocMenu',
//         name: 'allocMenu',
//         component:AllocMenu,
//         meta: {title: 'Alloc Menu'},
//         hidden: true
//       },
//       {
//         path: '/ums/allocResource',
//         name: 'allocResource',
//         component:AllocResource,
//         meta: {title: 'Alloc Resource'},
//         hidden: true
//       },
//       {
//         path: '/ums/menu',
//         name: 'menu',
//         component:Menu,
//         meta: {title: 'Menu', icon: 'ums-menu'}
//       },
//       {
//         path: '/ums/addMenu',
//         name: 'addMenu',
//         component:AddMenu,
//         meta: {title: 'Add Menu'},
//         hidden: true
//       },
//       {
//         path: '/ums/updateMenu',
//         name: 'updateMenu',
//         component:UpdateMenu,
//         meta: {title: 'Modify Menu'},
//         hidden: true
//       },
//       {
//         path: '/ums/resource',
//         name: 'resource',
//         component:Resource,
//         meta: {title: 'Resource', icon: 'ums-resource'}
//       },
//       {
//         path: '/ums/resourceCategory',
//         name: 'resourceCategory',
//         component:ResourceCategory,
//         meta: {title: 'Resource Cate'},
//         hidden: true
//       }
//     ]
//   },
// ]
const constantRouterMap=[
  {path: '/login', component:Login,hidden: true},
  {path: '/404', component: NotFound,hidden: true},
]


const asyncRouterMap = [
  {
    path: '/',
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: Home,
      meta: {title: 'Home', icon: 'home'}
    }]
  },
  {
    path: '/pms',
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: 'Product', icon: 'product'},
    children: [{
      path: '/pms/product',
      name: 'product',
      component:Product,
      meta: {title: 'Product List', icon: 'product-list'}
    },
      {
        path: '/pms/addProduct',
        name: 'addProduct',
        component:AddProduct,
        meta: {title: 'Add Product', icon: 'product-add'}
      },
      {
        path: '/pms/updateProduct',
        name: 'updateProduct',
        component:UpdateProduct,
        meta: {title: 'Modify Product', icon: 'product-add'},
        hidden: true
      },
      {
        path: '/pms/productCate',
        name: 'productCate',
        component:ProductCate,
        meta: {title: 'Product Cate', icon: 'product-cate'}
      },
      {
        path: '/pms/addProductCate',
        name: 'addProductCate',
        component:AddProductCate,
        meta: {title: 'Add Product Cate'},
        hidden: true
      },
      {
        path: '/pms/updateProductCate',
        name: 'updateProductCate',
        component:UpdateProductCate,
        meta: {title: 'Modify Product Cate'},
        hidden: true
      },
      {
        path: '/pms/productAttr',
        name: 'productAttr',
        component:ProductAttr,
        meta: {title: 'Product Attr', icon: 'product-attr'}
      },
      {
        path: '/pms/productAttrList',
        name: 'productAttrList',
        component:ProductAttrList,
        meta: {title: 'Product Attr List'},
        hidden: true
      },
      {
        path: '/pms/addProductAttr',
        name: 'addProductAttr',
        component:AddProductAttr,
        meta: {title: 'Add Product Attr'},
        hidden: true
      },
      {
        path: '/pms/updateProductAttr',
        name: 'updateProductAttr',
        component:UpdateProductAttr,
        meta: {title: 'Modify Product Attr'},
        hidden: true
      },
      {
        path: '/pms/brand',
        name: 'brand',
        component:Brand,
        meta: {title: 'Brand', icon: 'product-brand'}
      },
      {
        path: '/pms/addBrand',
        name: 'addBrand',
        component:AddBrand,
        meta: {title: 'Add Brand'},
        hidden: true
      },
      {
        path: '/pms/updateBrand',
        name: 'updateBrand',
        component:UpdateBrand,
        meta: {title: 'Modify Brand'},
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: 'Order', icon: 'order'},
    children: [
      {
        path: '/oms/order',
        name: 'order',
        component:Order,
        meta: {title: 'Order List', icon: 'product-list'}
      },
      {
        path: '/oms/orderDetail',
        name: 'orderDetail',
        component:OrderDetail,
        meta: {title: 'Order Detail'},
        hidden:true
      },
      {
        path: '/oms/deliverOrderList',
        name: 'deliverOrderList',
        component:DeliverOrderList,
        meta: {title: 'Delivery Order List'},
        hidden:true
      },
      {
        path: '/oms/orderSetting',
        name: 'orderSetting',
        component:OrderSetting,
        meta: {title: 'Order Setting', icon: 'order-setting'}
      },
      {
        path: '/oms/returnApply',
        name: 'returnApply',
        component:ReturnApply,
        meta: {title: 'Return Apply', icon: 'order-return'}
      },
      {
        path: '/oms/returnReason',
        name: 'returnReason',
        component:ReturnReason,
        meta: {title: 'Return Reason', icon: 'order-return-reason'}
      },
      {
        path: '/oms/returnApplyDetail',
        name: 'returnApplyDetail',
        component:ReturnApplyDetail,
        meta: {title: 'Return Detail'},
        hidden:true
      }
    ]
  },
  {
    path:'/sms',
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {title: 'Promotion', icon: 'sms'},
    children: [
      {
        path: '/sms/flash',
        name: 'flash',
        component:Flash,
        meta: {title: 'Flash List', icon: 'sms-flash'}
      },
      {
        path: '/sms/flashSession',
        name: 'flashSession',
        component:FlashSession,
        meta: {title: 'Flash Session'},
        hidden:true
      },
      {
        path: '/sms/selectSession',
        name: 'selectSession',
        component:SelectSession,
        meta: {title: 'Flash Select Session'},
        hidden:true
      },
      {
        path: '/sms/flashProductRelation',
        name: 'flashProductRelation',
        component:FlashProductRelation,
        meta: {title: 'Flash Product'},
        hidden:true
      },
      {
        path: '/sms/coupon',
        name: 'coupon',
        component:Coupon,
        meta: {title: 'Coupon', icon: 'sms-coupon'}
      },
      {
        path: '/sms/addCoupon',
        name: 'addCoupon',
        component:AddCoupon,
        meta: {title: 'Add Coupon'},
        hidden:true
      },
      {
        path: '/sms/updateCoupon',
        name: 'updateCoupon',
        component:UpdateCoupon,
        meta: {title: 'Modify Coupon'},
        hidden:true
      },
      {
        path: '/sms/couponHistory',
        name: 'couponHistory',
        component:CouponHistory,
        meta: {title: 'Coupon History'},
        hidden:true
      },
      {
        path: '/sms/brand',
        name: 'homeBrand',
        component:HomeBrand,
        meta: {title: 'Home Brand', icon: 'product-brand'}
      },
      {
        path: '/sms/new',
        name: 'homeNew',
        component:HomeNew,
        meta: {title: 'Home New', icon: 'sms-new'}
      },
      {
        path: '/sms/hot',
        name: 'homeHot',
        component:HomeHot,
        meta: {title: 'Home Hot', icon: 'sms-hot'}
      },
      {
        path: '/sms/subject',
        name: 'homeSubject',
        component:HomeSubject,
        meta: {title: 'Home Subject', icon: 'sms-subject'}
      },
      {
        path: '/sms/advertise',
        name: 'homeAdvertise',
        component:HomeAdvertise,
        meta: {title: 'Home Advertise', icon: 'sms-ad'}
      },
      {
        path: '/sms/addAdvertise',
        name: 'addHomeAdvertise',
        component:AddHomeAdvertise,
        meta: {title: 'Add Advertise'},
        hidden:true
      },
      {
        path: '/sms/updateAdvertise',
        name: 'updateHomeAdvertise',
        component:UpdateHomeAdvertise,
        meta: {title: 'Modify Advertise'},
        hidden:true
      }
    ]
  },
  {
    path:'/ums',
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: 'Permission', icon: 'ums'},
    children: [
      {
        path: '/ums/admin',
        name: 'admin',
        component:Admin,
        meta: {title: 'Admin', icon: 'ums-admin'}
      },
      {
        path: '/ums/role',
        name: 'role',
        component:Role,
        meta: {title: 'Role', icon: 'ums-role'}
      },
      {
        path: '/ums/allocMenu',
        name: 'allocMenu',
        component:AllocMenu,
        meta: {title: 'Alloc Menu'},
        hidden: true
      },
      {
        path: '/ums/allocResource',
        name: 'allocResource',
        component:AllocResource,
        meta: {title: 'Alloc Resource'},
        hidden: true
      },
      {
        path: '/ums/menu',
        name: 'menu',
        component:Menu,
        meta: {title: 'Menu', icon: 'ums-menu'}
      },
      {
        path: '/ums/addMenu',
        name: 'addMenu',
        component:AddMenu,
        meta: {title: 'Add Menu'},
        hidden: true
      },
      {
        path: '/ums/updateMenu',
        name: 'updateMenu',
        component:UpdateMenu,
        meta: {title: 'Modify Menu'},
        hidden: true
      },
      {
        path: '/ums/resource',
        name: 'resource',
        component:Resource,
        meta: {title: 'Resource', icon: 'ums-resource'}
      },
      {
        path: '/ums/resourceCategory',
        name: 'resourceCategory',
        component:ResourceCategory,
        meta: {title: 'Resource Cate'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export {constantRouterMap,asyncRouterMap};



