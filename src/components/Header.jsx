import React from 'react';

const Header = () => {
  return (
    <div className="header bg-white shadow-md p-4 flex justify-between items-center">
      <div className="header-title flex items-center">
        <img src="/icon-192.png" alt="PartsGo" className="header-logo w-8 h-8 mr-2" />
        <span className="font-bold text-lg">สั่งอะไหล่คลังนวนคร</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="header-notification-btn p-2 rounded-full bg-blue-100 text-blue-600" title="ข้อความแจ้งเตือน">
          <i className="fas fa-bell"></i>
          <span className="notification-badge bg-red-500 text-white rounded-full px-1 text-xs absolute -top-1 -right-1">!</span>
        </button>
        <span id="userNameSmall" className="user-name-small text-sm">ชื่อผู้ใช้</span>
        <button className="header-setting-btn p-2 rounded-full bg-gray-100" title="ตั้งค่า" onClick={() => document.getElementById('settingsModal').classList.add('active')}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </div>
  );
};

export default Header;
