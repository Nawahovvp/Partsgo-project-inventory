import React, { useState, useEffect } from 'react';

const announcements = [
  { text: "คลังปิดทำการ 5-7 ธ.ค. 2568 (วันพ่อ)", color: "bg-red-500" },
  { text: "อัปเดตสต็อกใหม่แล้วเมื่อวานนี้ 22:00 น.", color: "bg-green-500" },
  { text: "เบิกเกิน 10 ชิ้น กรุณาติดต่อผู้จัดการคลัง", color: "bg-yellow-600" },
];

const AnnouncementDeck = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="announcement-deck bg-gray-900 text-white py-2 overflow-hidden">
      <div className="ticker flex items-center justify-center">
        {announcements.map((ann, idx) => (
          <div
            key={idx}
            className={`px-6 py-1 text-sm font-medium transition-all duration-500 ${
              idx === current ? 'opacity-100' : 'opacity-0 absolute'
            } ${ann.color} rounded-full`}
            style={{ minWidth: '300px', textAlign: 'center' }}
          >
            {ann.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementDeck;
