import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Store from "./store";

const root = createRoot(document.getElementById('root'));
root.render(
    <Store.Container>
        <App />
    </Store.Container>
);
