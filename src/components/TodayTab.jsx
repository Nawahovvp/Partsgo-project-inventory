import React, { useState, useEffect } from 'react';
import { loadTodayData } from '../utils/api';

const TodayTab = () => {
  const [todayData, setTodayData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodayData().then(data => {
      // เรียงตามเวลาล่าสุดก่อน
      const sorted = data.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
      setTodayData(sorted);
      setLoading(false);
    });
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('th-TH', { 
      weekday: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) return <div className="loading p-10 text-center">กำลังโหลดรายการเบิกวันนี้...</div>;

  return (
    <div id="today" className="tab-content p-4">
      <h2 className="text-xl font-bold mb-4">เบิกวันนี้ ({todayData.length} รายการ)</h2>
      {todayData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
          <p className="text-lg">วันนี้ยังไม่มีรายการเบิก</p>
          <p className="text-2xl mt-4">ทำเบิกหมดแล้ว!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todayData.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{item.Material}</p>
                  <p className="text-sm text-gray-600">{item.Description}</p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">จำนวน:</span> {item.Quantity} ชิ้น | 
                    <span className="ml-2 font-medium">โดย:</span> {item.Name} ({item.EmployeeID})
                  </p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {formatTime(item.Timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayTab;
