import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// Copy manifest and meta into the build output
function copyExtras() {
  return {
    name: 'copy-extras',
    writeBundle() {
      const outDir = resolve(__dirname, 'dist')
      for (const file of ['readme_Chloe.md', 'planitaria.meta.json']) {
        const src = resolve(__dirname, file)
        const dest = resolve(outDir, file)
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest)
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), copyExtras()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
