import React, { useState, useEffect } from 'react';

const pendingCalls = [
  { team: "ทีม A", count: 12, color: "bg-red-500" },
  { team: "ทีม B", count: 8, color: "bg-yellow-500" },
  { team: "ทีม C", count: 5, color: "bg-green-500" },
  { team: "ทีม D", count: 15, color: "bg-red-600" },
];

const PendingCallsTab = () => {
  const total = pendingCalls.reduce((sum, t) => sum + t.count, 0);

  return (
    <div id="pending-calls" className="tab-content p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Call ที่รออยู่</h2>
      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-red-600">{total}</div>
        <p className="text-lg text-gray-600">รายการทั้งหมด</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {pendingCalls.map((team, idx) => (
          <div key={idx} className="text-center">
            <div className={`w-32 h-32 mx-auto rounded-full ${team.color} text-white flex items-center justify-center text-4xl font-bold shadow-lg`}>
              {team.count}
            </div>
            <p className="mt-4 text-lg font-medium">{team.team}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition">
          <i className="fas fa-phone mr-2"></i>
          เริ่มโทรเลย!
        </button>
      </div>
    </div>
  );
};

export default PendingCallsTab;
