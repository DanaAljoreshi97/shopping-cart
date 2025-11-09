import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CartProvider } from './context/CartContext';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductListPage } from './pages/ProductListPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';

const queryClient = new QueryClient();

const App = () => (
  <MantineProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  </MantineProvider>
);

export default App;
