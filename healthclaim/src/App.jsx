import React, { useState } from 'react';
import StartPage from './components/StartPage';
import AnimatedLoader from './components/AnimatedLoader';
import DashboardPage from './components/DashboardPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('start');

  const handleGetStarted = () => {
    setCurrentPage('loading');
    
    // Simulate loading time
    setTimeout(() => {
      setCurrentPage('dashboard');
    }, 18000);
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'start' && <StartPage onGetStarted={handleGetStarted} />}
      {currentPage === 'loading' && <AnimatedLoader />}
      {currentPage === 'dashboard' && <DashboardPage />}
    </div>
  );
};

export default App;