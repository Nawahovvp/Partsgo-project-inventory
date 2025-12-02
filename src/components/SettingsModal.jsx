import React from 'react';

const SettingsModal = ({ onLogout, employeeData }) => {
  const handleLogout = () => {
    onLogout();
    document.getElementById('settingsModal').classList.remove('active');
  };

  return (
    <div id="settingsModal" className="settings-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
      <div className="settings-modal-content bg-white p-6 rounded-lg max-w-md w-full mx-4 max-h-96 overflow-y-auto">
        <span className="close text-2xl cursor-pointer float-right" onClick={() => document.getElementById('settingsModal').classList.remove('active')}>&times;</span>
        <h2 className="text-xl font-bold mb-4">การตั้งค่า</h2>
        <div className="mb-4">
          <label className="block mb-2">โหมดธีม</label>
          <select className="w-full p-2 border rounded">
            <option value="light">สว่าง</option>
            <option value="dark">มืด</option>
          </select>
        </div>
        <button onClick={handleLogout} className="w-full bg-red-500 text-white p-2 rounded mb-4">
          ออกจากระบบ
        </button>
        <div className="text-center text-sm text-gray-500">
          <p>PartsGo v1.0</p>
          <p>© 2025 คลังสินค้านวนคร</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
