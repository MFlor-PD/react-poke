import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-poke/',  // <-- esta línea es clave para GitHub Pages
  plugins: [react()],
})

