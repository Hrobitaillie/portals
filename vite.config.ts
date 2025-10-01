import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import path from 'path'
import manifest from './manifest.json' with { type: 'json' }
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
     crx({ manifest }),
     tailwindcss(),
    ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})

