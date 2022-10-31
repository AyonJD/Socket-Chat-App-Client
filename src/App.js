import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import {  AuthProvider } from './Context/AuthContext';
import Login from './Pages/Auth/Login';
import Chat from './Pages/Chat/Chat';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
