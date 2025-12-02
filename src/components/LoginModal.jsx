import React, { useState, useEffect } from 'react';
import { loadEmployeeData } from '../utils/api';

const LoginModal = ({ onLogin, employeeData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('rememberMe') === 'true') {
      setUsername(localStorage.getItem('savedUsername') || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    try {
      let data = employeeData;
      if (data.length === 0) data = await loadEmployeeData();
      const expectedPassword = username.slice(-4);
      const user = data.find(e => e.IDRec?.toString().trim() === username && expectedPassword === password);
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userName', user.Name);
        if (document.getElementById('rememberMe').checked) {
          localStorage.setItem('savedUsername', username);
          localStorage.setItem('rememberMe', 'true');
        }
        onLogin();
      } else {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!');
        setPassword('');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    }
  };

  return (
    <div className="login-modal active fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="login-content bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="รหัสพนักงาน"
            className="w-full p-3 border rounded mb-4"
          />
          <div className="password-container relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่าน (ให้นึกก่อน)"
              className="w-full p-3 border rounded pr-10"
            />
            <i
              className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-3 cursor-pointer`}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <label className="flex items-center mb-4">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <span>Remember me</span>
          </label>
          {error && <div className="error text-red-500 mb-4">{error}</div>}
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded font-bold">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
