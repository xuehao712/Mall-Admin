import React from 'react';

import { history } from '../redux/shared/history-redux';
import { Login } from 'views/login/index';
import { NotFound } from 'views/404';
import { Home } from 'views/home/index';
import { Product } from 'views/pms/product/index';
import { AddProduct } from 'views/pms/product/add';
import { UpdateProduct } from 'views/pms/product/update';
import { ProductCate } from 'views/pms/productCate/index';
import { AddProductCate } from 'views/pms/productCate/add';
import { UpdateProductCate } from 'views/pms/productCate/update';
import { ProductAttr } from 'views/pms/productAttr/index';
import { ProductAttrList } from 'views/pms/productAttr/productAttrList';
import { AddProductAttr } from 'views/pms/productAttr/addProductAttr';
import { UpdateProductAttr } from 'views/pms/productAttr/updateProductAttr';
import { Brand } from 'views/pms/brand/index';
import { AddBrand } from 'views/pms/brand/add';
import { UpdateBrand } from 'views/pms/brand/update';
import { Order } from 'views/oms/order/index';
import { OrderDetail } from 'views/oms/order/orderDetail';
import { DeliverOrderList } from 'views/oms/order/deliverOrderList';
import { OrderSetting } from 'views/oms/order/setting';
import { ReturnApply } from 'views/oms/apply/index';
import { ReturnReason } from 'views/oms/apply/reason';
import { ReturnApplyDetail } from 'views/oms/apply/applyDetail';
import { Flash } from 'views/sms/flash/index';
import { FlashSession } from 'views/sms/flash/sessionList';
import { SelectSession } from 'views/sms/flash/selectSessionList';
import { FlashProductRelation } from 'views/sms/flash/productRelationList';
import { Coupon } from 'views/sms/coupon/index';
import { AddCoupon } from 'views/sms/coupon/add';
import { UpdateCoupon } from 'views/sms/coupon/update';
import { CouponHistory } from 'views/sms/coupon/history';
import { HomeBrand } from 'views/sms/brand/index';
import { HomeNew } from 'views/sms/new/index';
import { HomeHot } from 'views/sms/hot/index';
import { HomeSubject } from 'views/sms/subject/index';
import { HomeAdvertise } from 'views/sms/advertise/index';
import { AddHomeAdvertise } from 'views/sms/advertise/add';
import { UpdateHomeAdvertise } from 'views/sms/advertise/update';
import { Admin } from 'views/ums/admin/index';
import { Role } from 'views/ums/role/index';
import { AllocMenu } from 'views/ums/role/allocMenu';
import { AllocResource } from 'views/ums/role/allocResource';
import { Menu } from 'views/ums/menu/index';
import { AddMenu } from 'views/ums/menu/add';
import { UpdateMenu } from 'views/ums/menu/add';
import { Resource } from 'views/ums/resource/index';
import { ResourceCategory } from 'views/ums/resource/categoryList';

const routes = [
  {
      path: '/',
      component:'views/home/index',
      redirect:'/home',
      children:[{
          path:'/home',
          name:'home',
          exact:true,
          component:'views/home/index',
          meta: {title: 'Home', icon: 'home'}
      }]
  },
  {
    path: '/pms',
    redirect: '/pms/product',
    component:'views/pms/product/index',
    name: 'pms',
    exact:true,
    meta: {title: 'Product', icon: 'product'},
    children: [{
      path: '/pms/product',
      name: 'product',
      component:'views/pms/product/index',
      meta: {title: 'Product List', icon: 'product-list'}
    },
      {
        path: '/pms/addProduct',
        name: 'addProduct',
        component:'views/pms/product/add',
        meta: {title: 'Add Product', icon: 'product-add'}
      },
      {
        path: '/pms/updateProduct',
        name: 'updateProduct',
        component:'views/pms/product/update',
        meta: {title: 'Modify Product', icon: 'product-add'},
        hidden: true
      },
      {
        path: '/pms/productCate',
        name: 'productCate',
        component:'views/pms/productCate/index',
        meta: {title: 'Product Cate', icon: 'product-cate'}
      },
      {
        path: '/pms/addProductCate',
        name: 'addProductCate',
        component:'views/pms/productCate/add',
        meta: {title: 'Add Product Cate'},
        hidden: true
      },
      {
        path: '/pms/updateProductCate',
        name: 'updateProductCate',
        component:'views/pms/productCate/update',
        meta: {title: 'Modify Product Cate'},
        hidden: true
      },
      {
        path: '/pms/productAttr',
        name: 'productAttr',
        component:'views/pms/productAttr/index',
        meta: {title: 'Product Attr', icon: 'product-attr'}
      },
      {
        path: '/pms/productAttrList',
        name: 'productAttrList',
        component:'views/pms/productAttr/productAttrList',
        meta: {title: 'Product Attr List'},
        hidden: true
      },
      {
        path: '/pms/addProductAttr',
        name: 'addProductAttr',
        component:'views/pms/productAttr/addProductAttr',
        meta: {title: 'Add Product Attr'},
        hidden: true
      },
      {
        path: '/pms/updateProductAttr',
        name: 'updateProductAttr',
        component:'views/pms/productAttr/updateProductAttr',
        meta: {title: 'Modify Product Attr'},
        hidden: true
      },
      {
        path: '/pms/brand',
        name: 'brand',
        component:'views/pms/brand/index',
        meta: {title: 'Brand', icon: 'product-brand'}
      },
      {
        path: '/pms/addBrand',
        name: 'addBrand',
        component:'views/pms/brand/add',
        meta: {title: 'Add Brand'},
        hidden: true
      },
      {
        path: '/pms/updateBrand',
        name: 'updateBrand',
        component:'views/pms/brand/update',
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
        component:'views/oms/order/index',
        meta: {title: 'Order List', icon: 'product-list'}
      },
      {
        path: '/oms/orderDetail',
        name: 'orderDetail',
        component:'views/oms/order/orderDetail',
        meta: {title: 'Order Detail'},
        hidden:true
      },
      {
        path: '/oms/deliverOrderList',
        name: 'deliverOrderList',
        component:'views/oms/order/deliverOrderList',
        meta: {title: 'Delivery Order List'},
        hidden:true
      },
      {
        path: '/oms/orderSetting',
        name: 'orderSetting',
        component:'views/oms/order/setting',
        meta: {title: 'Order Setting', icon: 'order-setting'}
      },
      {
        path: '/oms/returnApply',
        name: 'returnApply',
        component:'views/oms/apply/index',
        meta: {title: 'Return Apply', icon: 'order-return'}
      },
      {
        path: '/oms/returnReason',
        name: 'returnReason',
        component:'views/oms/apply/reason',
        meta: {title: 'Return Reason', icon: 'order-return-reason'}
      },
      {
        path: '/oms/returnApplyDetail',
        name: 'returnApplyDetail',
        component:'views/oms/apply/applyDetail',
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
        component:'views/sms/flash/index',
        meta: {title: 'Flash List', icon: 'sms-flash'}
      },
      {
        path: '/sms/flashSession',
        name: 'flashSession',
        component:'views/sms/flash/sessionList',
        meta: {title: 'Flash Session'},
        hidden:true
      },
      {
        path: '/sms/selectSession',
        name: 'selectSession',
        component:'views/sms/flash/selectSessionList',
        meta: {title: 'Flash Select Session'},
        hidden:true
      },
      {
        path: '/sms/flashProductRelation',
        name: 'flashProductRelation',
        component:'views/sms/flash/productRelationList',
        meta: {title: 'Flash Product'},
        hidden:true
      },
      {
        path: '/sms/coupon',
        name: 'coupon',
        component:'views/sms/coupon/index',
        meta: {title: 'Coupon', icon: 'sms-coupon'}
      },
      {
        path: '/sms/addCoupon',
        name: 'addCoupon',
        component:'views/sms/coupon/add',
        meta: {title: 'Add Coupon'},
        hidden:true
      },
      {
        path: '/sms/updateCoupon',
        name: 'updateCoupon',
        component:'views/sms/coupon/update',
        meta: {title: 'Modify Coupon'},
        hidden:true
      },
      {
        path: '/sms/couponHistory',
        name: 'couponHistory',
        component:'views/sms/coupon/history',
        meta: {title: 'Coupon History'},
        hidden:true
      },
      {
        path: '/sms/brand',
        name: 'homeBrand',
        component:'views/sms/brand/index',
        meta: {title: 'Home Brand', icon: 'product-brand'}
      },
      {
        path: '/sms/new',
        name: 'homeNew',
        component:'views/sms/new/index',
        meta: {title: 'Home New', icon: 'sms-new'}
      },
      {
        path: '/sms/hot',
        name: 'homeHot',
        component:'views/sms/hot/index',
        meta: {title: 'Home Hot', icon: 'sms-hot'}
      },
      {
        path: '/sms/subject',
        name: 'homeSubject',
        component:'views/sms/subject/index',
        meta: {title: 'Home Subject', icon: 'sms-subject'}
      },
      {
        path: '/sms/advertise',
        name: 'homeAdvertise',
        component:'views/sms/advertise/index',
        meta: {title: 'Home Advertise', icon: 'sms-ad'}
      },
      {
        path: '/sms/addAdvertise',
        name: 'addHomeAdvertise',
        component:'views/sms/advertise/add',
        meta: {title: 'Add Advertise'},
        hidden:true
      },
      {
        path: '/sms/updateAdvertise',
        name: 'updateHomeAdvertise',
        component:'views/sms/advertise/update',
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
        component:'views/ums/admin/index',
        meta: {title: 'Admin', icon: 'ums-admin'}
      },
      {
        path: '/ums/role',
        name: 'role',
        component:'views/ums/role/index',
        meta: {title: 'Role', icon: 'ums-role'}
      },
      {
        path: '/ums/allocMenu',
        name: 'allocMenu',
        component:'views/ums/role/allocMenu',
        meta: {title: 'Alloc Menu'},
        hidden: true
      },
      {
        path: '/ums/allocResource',
        name: 'allocResource',
        component:'views/ums/role/allocResource',
        meta: {title: 'Alloc Resource'},
        hidden: true
      },
      {
        path: '/ums/menu',
        name: 'menu',
        component:'views/ums/menu/index',
        meta: {title: 'Menu', icon: 'ums-menu'}
      },
      {
        path: '/ums/addMenu',
        name: 'addMenu',
        component:'views/ums/menu/add',
        meta: {title: 'Add Menu'},
        hidden: true
      },
      {
        path: '/ums/updateMenu',
        name: 'updateMenu',
        component:'views/ums/menu/update',
        meta: {title: 'Modify Menu'},
        hidden: true
      },
      {
        path: '/ums/resource',
        name: 'resource',
        component:'views/ums/resource/index',
        meta: {title: 'Resource', icon: 'ums-resource'}
      },
      {
        path: '/ums/resourceCategory',
        name: 'resourceCategory',
        component:'views/ums/resource/categoryList',
        meta: {title: 'Resource Cate'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

const asyncRouterMap = [
    {
      path: '/pms',
      component:'views/pms/product/index',
      redirect: '/pms/product',
      name: 'pms',
      exact:true,
      meta: {title: 'Product', icon: 'product'},
      children: [{
        path: '/pms/product',
        name: 'product',
        component:'views/pms/product/index',
        meta: {title: 'Product List', icon: 'product-list'}
      },
        {
          path: '/pms/addProduct',
          name: 'addProduct',
          component:'views/pms/product/add',
          meta: {title: 'Add Product', icon: 'product-add'}
        },
        {
          path: '/pms/updateProduct',
          name: 'updateProduct',
          component:'views/pms/product/update',
          meta: {title: 'Modify Product', icon: 'product-add'},
          hidden: true
        },
        {
          path: '/pms/productCate',
          name: 'productCate',
          component:'views/pms/productCate/index',
          meta: {title: 'Product Cate', icon: 'product-cate'}
        },
        {
          path: '/pms/addProductCate',
          name: 'addProductCate',
          component:'views/pms/productCate/add',
          meta: {title: 'Add Product Cate'},
          hidden: true
        },
        {
          path: '/pms/updateProductCate',
          name: 'updateProductCate',
          component:'views/pms/productCate/update',
          meta: {title: 'Modify Product Cate'},
          hidden: true
        },
        {
          path: '/pms/productAttr',
          name: 'productAttr',
          component:'views/pms/productAttr/index',
          meta: {title: 'Product Attr', icon: 'product-attr'}
        },
        {
          path: '/pms/productAttrList',
          name: 'productAttrList',
          component:'views/pms/productAttr/productAttrList',
          meta: {title: 'Product Attr List'},
          hidden: true
        },
        {
          path: '/pms/addProductAttr',
          name: 'addProductAttr',
          component:'views/pms/productAttr/addProductAttr',
          meta: {title: 'Add Product Attr'},
          hidden: true
        },
        {
          path: '/pms/updateProductAttr',
          name: 'updateProductAttr',
          component:'views/pms/productAttr/updateProductAttr',
          meta: {title: 'Modify Product Attr'},
          hidden: true
        },
        {
          path: '/pms/brand',
          name: 'brand',
          component:'views/pms/brand/index',
          meta: {title: 'Brand', icon: 'product-brand'}
        },
        {
          path: '/pms/addBrand',
          name: 'addBrand',
          component:'views/pms/brand/add',
          meta: {title: 'Add Brand'},
          hidden: true
        },
        {
          path: '/pms/updateBrand',
          name: 'updateBrand',
          component:'views/pms/brand/update',
          meta: {title: 'Modify Brand'},
          hidden: true
        }
      ]
    },
    {
      path: '/oms',
      component:'views/oms/order/index',
      redirect: '/oms/order',
      name: 'oms',
      meta: {title: 'Order', icon: 'order'},
      children: [
        {
          path: '/oms/order',
          name: 'order',
          component:'views/oms/order/index',
          meta: {title: 'Order List', icon: 'product-list'}
        },
        {
          path: '/oms/orderDetail',
          name: 'orderDetail',
          component:'views/oms/order/orderDetail',
          meta: {title: 'Order Detail'},
          hidden:true
        },
        {
          path: '/oms/deliverOrderList',
          name: 'deliverOrderList',
          component:'views/oms/order/deliverOrderList',
          meta: {title: 'Delivery Order List'},
          hidden:true
        },
        {
          path: '/oms/orderSetting',
          name: 'orderSetting',
          component:'views/oms/order/setting',
          meta: {title: 'Order Setting', icon: 'order-setting'}
        },
        {
          path: '/oms/returnApply',
          name: 'returnApply',
          component:'views/oms/apply/index',
          meta: {title: 'Return Apply', icon: 'order-return'}
        },
        {
          path: '/oms/returnReason',
          name: 'returnReason',
          component:'views/oms/apply/reason',
          meta: {title: 'Return Reason', icon: 'order-return-reason'}
        },
        {
          path: '/oms/returnApplyDetail',
          name: 'returnApplyDetail',
          component:'views/oms/apply/applyDetail',
          meta: {title: 'Return Detail'},
          hidden:true
        }
      ]
    },
    {
      path:'/sms',
      component:'views/sms/flash/index',
      redirect: '/sms/coupon',
      name: 'sms',
      meta: {title: 'Promotion', icon: 'sms'},
      children: [
        {
          path: '/sms/flash',
          name: 'flash',
          component:'views/sms/flash/index',
          meta: {title: 'Flash List', icon: 'sms-flash'}
        },
        {
          path: '/sms/flashSession',
          name: 'flashSession',
          component:'views/sms/flash/sessionList',
          meta: {title: 'Flash Session'},
          hidden:true
        },
        {
          path: '/sms/selectSession',
          name: 'selectSession',
          component:'views/sms/flash/selectSessionList',
          meta: {title: 'Flash Select Session'},
          hidden:true
        },
        {
          path: '/sms/flashProductRelation',
          name: 'flashProductRelation',
          component:'views/sms/flash/productRelationList',
          meta: {title: 'Flash Product'},
          hidden:true
        },
        {
          path: '/sms/coupon',
          name: 'coupon',
          component:'views/sms/coupon/index',
          meta: {title: 'Coupon', icon: 'sms-coupon'}
        },
        {
          path: '/sms/addCoupon',
          name: 'addCoupon',
          component:'views/sms/coupon/add',
          meta: {title: 'Add Coupon'},
          hidden:true
        },
        {
          path: '/sms/updateCoupon',
          name: 'updateCoupon',
          component:'views/sms/coupon/update',
          meta: {title: 'Modify Coupon'},
          hidden:true
        },
        {
          path: '/sms/couponHistory',
          name: 'couponHistory',
          component:'views/sms/coupon/history',
          meta: {title: 'Coupon History'},
          hidden:true
        },
        {
          path: '/sms/brand',
          name: 'homeBrand',
          component:'views/sms/brand/index',
          meta: {title: 'Home Brand', icon: 'product-brand'}
        },
        {
          path: '/sms/new',
          name: 'homeNew',
          component:'views/sms/new/index',
          meta: {title: 'Home New', icon: 'sms-new'}
        },
        {
          path: '/sms/hot',
          name: 'homeHot',
          component:'views/sms/hot/index',
          meta: {title: 'Home Hot', icon: 'sms-hot'}
        },
        {
          path: '/sms/subject',
          name: 'homeSubject',
          component:'views/sms/subject/index',
          meta: {title: 'Home Subject', icon: 'sms-subject'}
        },
        {
          path: '/sms/advertise',
          name: 'homeAdvertise',
          component:'views/sms/advertise/index',
          meta: {title: 'Home Advertise', icon: 'sms-ad'}
        },
        {
          path: '/sms/addAdvertise',
          name: 'addHomeAdvertise',
          component:'views/sms/advertise/add',
          meta: {title: 'Add Advertise'},
          hidden:true
        },
        {
          path: '/sms/updateAdvertise',
          name: 'updateHomeAdvertise',
          component:'views/sms/advertise/update',
          meta: {title: 'Modify Advertise'},
          hidden:true
        }
      ]
    },
    {
      path:'/ums',
      component:'views/ums/admin/index',
      redirect: '/ums/admin',
      name: 'ums',
      meta: {title: 'Permission', icon: 'ums'},
      children: [
        {
          path: '/ums/admin',
          name: 'admin',
          component:'views/ums/admin/index',
          meta: {title: 'Admin', icon: 'ums-admin'}
        },
        {
          path: '/ums/role',
          name: 'role',
          component:'views/ums/role/index',
          meta: {title: 'Role', icon: 'ums-role'}
        },
        {
          path: '/ums/allocMenu',
          name: 'allocMenu',
          component:'views/ums/role/allocMenu',
          meta: {title: 'Alloc Menu'},
          hidden: true
        },
        {
          path: '/ums/allocResource',
          name: 'allocResource',
          component:'views/ums/role/allocResource',
          meta: {title: 'Alloc Resource'},
          hidden: true
        },
        {
          path: '/ums/menu',
          name: 'menu',
          component:'views/ums/menu/index',
          meta: {title: 'Menu', icon: 'ums-menu'}
        },
        {
          path: '/ums/addMenu',
          name: 'addMenu',
          component:'views/ums/menu/add',
          meta: {title: 'Add Menu'},
          hidden: true
        },
        {
          path: '/ums/updateMenu',
          name: 'updateMenu',
          component:'views/ums/menu/update',
          meta: {title: 'Modify Menu'},
          hidden: true
        },
        {
          path: '/ums/resource',
          name: 'resource',
          component:'views/ums/resource/index',
          meta: {title: 'Resource', icon: 'ums-resource'}
        },
        {
          path: '/ums/resourceCategory',
          name: 'resourceCategory',
          component:'views/ums/resource/categoryList',
          meta: {title: 'Resource Cate'},
          hidden: true
        }
      ]
    },
  ]

export {asyncRouterMap};
export default routes;



