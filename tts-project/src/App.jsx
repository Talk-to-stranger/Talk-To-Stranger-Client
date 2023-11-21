import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
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
