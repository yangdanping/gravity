import { createRoot } from 'react-dom/client';
import App from '@/App';

import 'normalize.css';
import './assets/css/index.scss';

createRoot(document.getElementById('root')!).render(<App />);
