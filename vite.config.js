import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Partsgo-project-inventory/',  // ชื่อ repo ของคุณ – สำคัญมาก!
  build: {
    outDir: 'dist'  // ไฟล์ build จะไปที่ dist
  }
})
