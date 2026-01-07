import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import AppLayout from '@/App';
import Home from '@/views/home/Home';
// import HomeRecommend from '@/views/home/HomeRecommend';
// import HomeRanking from '@/views/home/HomeRanking';
// import HomeSongMenu from '@/views/home/HomeSongMenu';
// import Category from '@/views/category/Category';
// import Order from '@/views/order/Order';
// import NotFound from '@/views/notFound/NotFound';
// import Detail from '@/views/detail/Detail';
// import User from '@/views/user/User';

/* 路由传递方式:动态路由 */
const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      /* 一旦有子组件,其父组件(如 Home)内部就要有占位组件<Outlet/>,同时这里也要写个重定向 */
      {
        path: '/home',
        element: <Home />,
        // children: [
        //   {
        //     path: '/home',
        //     element: <Navigate to="/home/recommend" />
        //   },
        //   {
        //     path: '/home/recommend',
        //     element: <HomeRecommend />
        //   },
        //   {
        //     path: '/home/ranking',
        //     element: <HomeRanking />
        //   },
        //   {
        //     path: '/home/songmenu',
        //     element: <HomeSongMenu />
        //   }
        // ]
      },
      // {
      //   path: '/about',
      //   // 新写法: 直接配置 lazy 属性 (React Router v6.4+)
      //   // 注意: 如果组件是 export default 导出的, 需要转换成 { Component: module.default }
      //   lazy: () => import('../pages/About').then((module) => ({ Component: module.default }))
      // },
      // {
      //   path: '/login',
      //   lazy: () => import('../pages/Login').then((module) => ({ Component: module.default }))
      // },
      // {
      //   path: '/category',
      //   element: <Category />
      // },
      // {
      //   path: '/order',
      //   element: <Order />
      // },
      // {
      //   path: '/detail/:id',
      //   element: <Detail />
      // },
      // {
      //   path: '/user',
      //   element: <User />
      // },
      // /* 配置NOT FOUND页面 */
      // {
      //   path: '*',
      //   element: <NotFound />
      // }
    ],
  },
];

export default routes;
