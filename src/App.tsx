import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router } from './Router/Router';
import { AuthProvider } from './Context/User';

function App() {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
    
  );
}

export default App;
