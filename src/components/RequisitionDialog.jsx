import React from 'react';
import Swal from 'sweetalert2';

const RequisitionDialog = {
  open: (row) => {
    Swal.fire({
      title: '📋 เบิกอะไหล่นวนคร',
      html: `
        <div class="swal2-label">📦 Material: ${row.Material || ''}</div>
        <div class="swal2-label">📝 Description: ${row.Description || ''}</div>
        <label class="swal2-label">🔢 จำนวน</label>
        <input id="swal-quantity" class="swal2-input" type="number" value="1" min="1">
        <label class="swal2-label">🆔 รหัสพนักงาน</label>
        <input id="swal-employee-code" class="swal2-input" placeholder="7xxxxxx">
        <!-- เพิ่มช่องอื่น ๆ ตาม HTML เดิม -->
      `,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      preConfirm: () => {
        const quantity = document.getElementById('swal-quantity').value;
        if (!quantity || quantity < 1) {
          Swal.showValidationMessage('กรุณากรอกจำนวนที่ถูกต้อง');
          return false;
        }
        return { quantity, material: row.Material };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // ส่งข้อมูลไป GAS ตาม HTML เดิม
        Swal.fire('เบิกสำเร็จ!', 'ข้อมูลถูกบันทึกแล้ว', 'success');
      }
    });
  }
};

export default RequisitionDialog;
