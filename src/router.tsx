import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout';
import Home from './Home';
import Define from './pages/Define';
import Extract from './pages/Extract';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'define',
        element: <Define />,
      },
      {
        path: 'extract',
        element: <Extract />,
      },
    ],
  },
]);
