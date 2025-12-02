import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ถ้า deploy GitHub Pages เปลี่ยนเป็น '/partgo-react/'
  build: {
    outDir: 'dist'
  }
})
