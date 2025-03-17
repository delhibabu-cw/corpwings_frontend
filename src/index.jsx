import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


/* Add these imports to your CSS file */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AppRouters from './Routers/AppRouters';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AppRouters />
    <Toaster
            position="top-right"
            toastOptions={{ className: 'react-hot-toast' }}
          />
          </QueryClientProvider>
  </React.StrictMode>
);
