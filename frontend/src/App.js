import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CanBoList from './pages/CanBoList';
import CanBoForm from './pages/CanBoForm';
import CanBoDetail from './pages/CanBoDetail';
import DanhMuc from './pages/DanhMuc';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/can-bo" element={<CanBoList />} />
            <Route path="/can-bo/add" element={<CanBoForm />} />
            <Route path="/can-bo/edit/:soHoSo" element={<CanBoForm />} />
            <Route path="/can-bo/:soHoSo" element={<CanBoDetail />} />
            <Route path="/danh-muc" element={<DanhMuc />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;