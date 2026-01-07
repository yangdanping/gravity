import { createRoot } from 'react-dom/client';
// import App from '@/App';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';

import 'normalize.css';
import './assets/css/index.scss';

import routes from './router';
const router = createBrowserRouter(routes);

// createRoot(document.getElementById('root')!).render(<App />);
createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
