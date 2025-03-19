import './index.css';

import CheckboxList from './CheckboxList.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CheckboxList />
  </StrictMode>
);
