import { createBrowserRouter, redirect } from 'react-router-dom';

import Home from '../components/home';
import { Login } from '../components/login';
import Register from '../components/register';
import Navbar from '../components/navbar';
export const router = createBrowserRouter([
  {
    loader: () => {
      const isLogin = localStorage.getItem('access_token');
      if (isLogin) {
        return redirect('/');
      }
      return null;
    },
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    loader: () => {
      const isNotLogin = localStorage.getItem('access_token');
      if (!isNotLogin) {
        return redirect('/login');
      }
      return null;
    },
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
