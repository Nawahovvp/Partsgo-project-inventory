import React from 'react';

const BottomNav = ({ currentTab, showTab }) => {
  const tabs = [
    { id: 'parts', icon: 'fa-search', label: 'ค้นหาอะไหล่' },
    { id: 'images', icon: 'fa-images', label: 'รูปภาพ' },
    { id: 'today', icon: 'fa-calendar-day', label: 'เบิกวันนี้' },
    { id: 'pending-calls', icon: 'fa-phone', label: 'Call' }
  ];

  return (
    <div className="bottom-nav bg-white border-t">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-btn ${currentTab === tab.id ? 'active' : ''}`}
          onClick={() => showTab(tab.id)}
          title={tab.label}
        >
          <i className={`fas ${tab.icon}`}></i>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
