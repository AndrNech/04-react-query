import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import 'modern-normalize/modern-normalize.css';
import App from './components/App/App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

if (document.getElementById('root') !== null) {
  const queryClient = new QueryClient();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </StrictMode>
  );
}
