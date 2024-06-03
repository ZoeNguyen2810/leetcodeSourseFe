import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { QueryClientProvider , QueryClient } from 'react-query';
import { GlobalProvider } from './Context';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
      <App />

      </GlobalProvider>
    </QueryClientProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
