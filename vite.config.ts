import react from '@vitejs/plugin-react-swc'
import tsConfigPath from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsConfigPath(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      injectRegister: 'auto'
    })
  ],
})
