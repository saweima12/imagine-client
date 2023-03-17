import { RouterProvider } from 'react-router-dom';

import './styles/app.styl';
import customRouter from './router';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {


  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={customRouter} />
      </QueryClientProvider>
    </div>
  )
}

export default App
