import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import { Login } from './components/login';
import Register from './components/register';


const router = createBrowserRouter([
  {
    loader: () => {
        const isLogin = localStorage.getItem("token");
        if (isLogin) {
            throw redirect('/') 
        }
        return null;
    },
    path: "/login",
    element: <Login />
},
{
  loader: () => {
      const isNotLogin = localStorage.getItem("token");
      if (!isNotLogin) {
          throw redirect('/login')
      }
      return null;
  },
  children: [
    
  {
      path: "/",
      element: (
        <>
      <Navbar />
      <Home />
      </>
      )
  }
  ]
}
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
