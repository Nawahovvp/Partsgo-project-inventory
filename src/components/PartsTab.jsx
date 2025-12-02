import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { loadData as loadPartsData } from '../utils/api'; // จาก utils

const PartsTab = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPartsData().then((fetchedData) => {
      setData(fetchedData);
      setFilteredData(fetchedData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = data.filter(row => 
      Object.values(row).some(val => 
        String(val).toLowerCase().includes(search1.toLowerCase()) &&
        String(val).toLowerCase().includes(search2.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [search1, search2, data]);

  const handleRequisition = (row) => {
    // เรียก SweetAlert Dialog จาก utils หรือ component แยก
    Swal.fire({
      title: 'เบิกอะไหล่',
      text: `Material: ${row.Material}`,
      confirmButtonText: 'ยืนยัน'
    });
  };

  if (loading) return <div className="loading">กำลังโหลด...</div>;

  return (
    <div id="parts" className="tab-content active">
      <div className="search-container flex gap-2 mb-4 p-4">
        <input
          type="text"
          value={search1}
          onChange={(e) => setSearch1(e.target.value)}
          placeholder="ค้นหา ตัวกรองหลัก"
          className="flex-1 p-2 border rounded"
        />
        <input
          type="text"
          value={search2}
          onChange={(e) => setSearch2(e.target.value)}
          placeholder="ค้นหา ตัวกรองย่อย"
          className="flex-1 p-2 border rounded"
        />
        <button onClick={() => { setSearch1(''); setSearch2(''); }} className="px-4 py-2 bg-gray-300 rounded">
          Clear
        </button>
      </div>
      <div className="table-container overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>เบิก</th>
              <th>รูป</th>
              <th>Material</th>
              <th>Description</th>
              <th>วิภาวดี</th>
              <th>นวนคร</th>
              <th>Rebuilt</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className="border-b">
                <td><button onClick={() => handleRequisition(row)} className="bg-blue-500 text-white px-4 py-1 rounded">เบิก</button></td>
                <td><i className="fas fa-image text-blue-500 cursor-pointer"></i></td>
                <td className={row["วิภาวดี"] > 0 ? 'text-green-600 font-bold' : ''}>{row.Material}</td>
                <td>{row.Description}</td>
                <td>{row["วิภาวดี"]}</td>
                <td>{row.Unrestricted}</td>
                <td className="text-red-500 font-bold">{row.Rebuilt}</td>
                <td className="text-red-500 font-bold">{row["หมายเหตุ"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartsTab;
