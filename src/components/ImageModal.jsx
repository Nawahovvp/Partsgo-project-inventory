import React, { useState } from 'react';

const ImageModal = {
  open: (row) => {
    // สร้าง Modal แบบ Portal หรือใช้ Swal สำหรับรูปภาพ
    Swal.fire({
      title: 'รายละเอียดอะไหล่',
      html: `
        <div class="image-swiper-container">
          <img src="https://drive.google.com/thumbnail?id=${row.UrlWeb}&sz=w1000" alt="อะไหล่" style="max-width:100%; height:auto;">
        </div>
        <div class="detail-info">
          <h3>Material: ${row.Material}</h3>
          <p>Description: ${row.Description}</p>
          <p>วิภาวดี: ${row["วิภาวดี"] || 0} ชิ้น</p>
          <p>นวนคร: ${row.Unrestricted || 0} ชิ้น</p>
        </div>
      `,
      width: '600px',
      showCloseButton: true
    });
  }
};

export default ImageModal;
