import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Add if you have a global CSS file

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
