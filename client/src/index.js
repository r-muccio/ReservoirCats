import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {ProductsProvider} from './components/ProductContext';
import {CartProvider} from './components/CartContext';

ReactDOM.render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
