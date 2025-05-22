import { BrowserRouter, Routes } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Home from './routes/Home.tsx';
import './index.css';
import { Route } from 'react-router';
import Login from './routes/Login.tsx';
import Cadastro from './routes/Cadastro.tsx';
import { PrivateRoute } from './routes/PrivateRoute.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path="/" element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
