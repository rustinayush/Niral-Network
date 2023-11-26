import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import LoginPage from './components/Login';
import PortfolioPage from './components/Portfolio';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    // Simulate authentication (hardcoded for simplicity)
    if (username === 'saba' && password === '123456') {
      setAuthenticated(true);
    }
  };

  const handleLogout = () => {
    console.log("logout");
    setAuthenticated(false);
  };

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            <div>
              {authenticated ? <Navigate to="/portfolio" /> : <LoginPage onLogin={handleLogin} />}
            </div>
          }
        />
        <Route
          path="/portfolio"
          element={
            <div>
              {authenticated ? <PortfolioPage onLogout={handleLogout} /> : <Navigate to="/" />}
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
