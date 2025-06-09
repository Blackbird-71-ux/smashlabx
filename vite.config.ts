import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        error: resolve(__dirname, '404.html')
      },
      output: {
        manualChunks: {
          vendor: ['normalize.css'],
          styles: ['style.css']
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name === 'style.css') return 'assets/css/[name]-[hash][extname]';
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(name)) return 'assets/images/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    cssMinify: true,
    sourcemap: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.js'],
  },
  plugins: [
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(
          /<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/normalize\.css\/8\.0\.1\/normalize\.min\.css">/,
          '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize.css/8.0.1/normalize.min.css" crossorigin="anonymous">'
        );
      }
    }
  ]
}); 