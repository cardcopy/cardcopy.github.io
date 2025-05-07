import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  build: {
    sourcemap: false
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico,woff,woff2,ttf,eot}'],
        globIgnores: ['manifest.webmanifest', 'service-worker.js'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
                request.destination === 'document' ||
                request.destination === 'script' ||
                request.destination === 'style' ||
                request.destination === 'image' ||
                request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'app-resources',
              expiration: {
                maxEntries: Infinity,
                maxAgeSeconds: Infinity,
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname === '/manifest.webmanifest',
            handler: 'NetworkOnly'
          },
        ],
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