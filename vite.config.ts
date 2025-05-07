import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { version } from './package.json';

export default defineConfig({
  base: '/',
  build: {
    sourcemap: false
  },
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(version)
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 10000000
      },
      manifest: {
        name: 'cardcopy',
        short_name: 'Card Copy',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});