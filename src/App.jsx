import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoginModal from './components/LoginModal';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import PartsTab from './components/PartsTab';
import ImagesTab from './components/ImagesTab';
import TodayTab from './components/TodayTab';
import AllTab from './components/AllTab';
import PendingCallsTab from './components/PendingCallsTab';
import SettingsModal from './components/SettingsModal';
import { loadEmployeeData, loadData as loadPartsData } from './utils/api'; // จาก utils

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState('parts');
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(logged);
    if (logged) {
      loadEmployeeData().then(setEmployeeData);
      loadPartsData(); // โหลดข้อมูลเริ่มต้น
    }
  }, []);

  const showTab = (tab) => {
    setCurrentTab(tab);
    navigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    Swal.fire('ออกจากระบบสำเร็จ!', '', 'success');
  };

  if (!isLoggedIn) return <LoginModal onLogin={handleLogin} employeeData={employeeData} />;

  return (
    <>
      <Header />
      <div className="container min-h-screen pb-20">
        <Routes>
          <Route path="/parts" element={<PartsTab />} />
          <Route path="/images" element={<ImagesTab />} />
          <Route path="/today" element={<TodayTab />} />
          <Route path="/all" element={<AllTab />} />
          <Route path="/pending-calls" element={<PendingCallsTab />} />
          <Route path="/" element={<PartsTab />} />
        </Routes>
      </div>
      <BottomNav currentTab={currentTab} showTab={showTab} />
      <SettingsModal onLogout={handleLogout} employeeData={employeeData} />
    </>
  );
}

import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router basename="/Partsgo-project-inventory">  {/* เพิ่ม basename นี้ */}
      <div className="light-mode">
        <AppContent />
      </div>
    </Router>
  );
}
export default App;
