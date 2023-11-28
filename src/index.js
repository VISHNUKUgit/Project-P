import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './Context/ContextShare';
import TokenAuthContext from './Context/TokenAuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextShare>
      <TokenAuthContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TokenAuthContext>
    </ContextShare>
  </React.StrictMode>
);


