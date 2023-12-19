import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Login from './components/Login';
import Register from './components/Register';
import UserDetail from './components/UserDetail';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-detail" element={<UserDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
