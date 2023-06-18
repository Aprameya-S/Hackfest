import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { TransactionsProvider } from './context/TransactionContext';
import { StateContextProvider } from './context';
import { Sepolia } from "@thirdweb-dev/chains";
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import App from './App';
import './index.scss'
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThirdwebProvider activeChain={Sepolia}>
    <AuthProvider>
      <TransactionsProvider>
        <BrowserRouter>
          <StateContextProvider>
            <App />
          </StateContextProvider>
        </BrowserRouter>
      </TransactionsProvider>
    </AuthProvider>
  </ThirdwebProvider>
);


