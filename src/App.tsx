import { useMemo, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import reactLogo from './assets/react.svg';

import './styles/app.styl';
import customRouter from './router';

function App() {
    
  return (
    <div className="App">
      <RouterProvider router={customRouter} />
    </div>
  )
}

export default App
