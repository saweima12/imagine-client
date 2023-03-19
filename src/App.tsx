import { RouterProvider } from 'react-router-dom';

import './styles/app.styl';
import customRouter from './router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Suspense } from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='App dark'>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <RouterProvider router={customRouter} />
        </Suspense>
      </QueryClientProvider>
    </div>
  );
}

export default App;
