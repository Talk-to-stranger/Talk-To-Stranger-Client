import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
// import Navbar from './components/navbar';
import Home from './components/home';
import { Login } from './components/login';
import Register from './components/register';
import Navbar from './components/navbar';

const router = createBrowserRouter([
  {
    loader: () => {
      const isLogin = localStorage.getItem('access_token');
      if (isLogin) {
        return redirect('/');
      }
      return null;
    },
    // path: '',
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

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
