import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/react-poke/',  // importante para que Vite genere rutas correctas en producción
  plugins: [react()],
})
