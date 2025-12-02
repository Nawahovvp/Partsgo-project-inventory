import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Partsgo-project-inventory/'   // ต้องตรงกับชื่อ repo เป๊ะ ๆ
})
