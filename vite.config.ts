import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  // O 'base' deve ser o nome do seu repositório no GitHub
  base: '/elementais/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Elementais RPG - Rastreador de Coleção',
        short_name: 'Elementais',
        description: 'Rastreador de Coleção de Elementais RPG',
        theme_color: '#060a0f',
        background_color: '#060a0f',
        display: 'standalone',
        scope: '/elementais/',
        start_url: '/elementais/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})   
