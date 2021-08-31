import React from 'react';
import { Redirect } from 'react-router-dom';
import HomePage from '../../pages/home/HomeView';
import Newpage from '../../pages/new/NewView';

export const routes = [
  {
    path: '/home',
    component: HomePage,
  },
  {
    path: '/new',
    component: Newpage,
  },
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />,
  },
];
