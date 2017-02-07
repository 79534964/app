import login from 'components/login/login';

import product from 'components/product/product';

import order from 'components/order/order';
import orderQuery from 'components/order/orderQuery/orderQuery';

import user from 'components/user/user';

import service from 'components/service/service';

import machine from 'components/machine/machine';

import data from 'components/data/data';
import dataMachine from 'components/data/dataMachine/dataMachine';

import activity from 'components/activity/activity';

import system from 'components/system/system';
import systemMenu from 'components/system/systemMenu/systemMenu';
import systemCompany from 'components/system/systemCompany/systemCompany';

export default [
  {
    path: '/login',
    component: login
  },
  {
    path: '/product',
    component: product
  },
  {
    path: '/order',
    component: order,
    children: [
      {
        path: 'orderQuery',
        component: orderQuery
      }
    ]
  },
  {
    path: '/user',
    component: user
  },
  {
    path: '/service',
    component: service
  },
  {
    path: '/machine',
    component: machine
  },
  {
    path: '/data',
    component: data,
    children: [
      {
        path: 'dataMachine',
        component: dataMachine
      }
    ]
  },
  {
    path: '/activity',
    component: activity
  },
  {
    path: '/system',
    component: system,
    children: [
      {
        path: 'systemMenu',
        component: systemMenu
      }, {
        path: 'systemCompany',
        component: systemCompany
      }
    ]
  }
];
