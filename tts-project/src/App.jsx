import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import Home from './components/home';
import { Login } from './components/login';
import Register from './components/register';


const router = createBrowserRouter([
  {
    loader: () => {
      if (localStorage.getItem('access_token')) {
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
      if (!localStorage.getItem('access_token')) {
        return redirect('/login');
      }
      return null;
    },
    path: '/',
    element: <Home />
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
