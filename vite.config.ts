import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      pages: '/src/pages',
      data: '/src/data',
      modules: '/src/modules',
      utils: '/src/utils',
      hooks: '/src/hooks',
      routes: '/src/routes',
      constants: '/src/constants',
      assets: '/src/assets',
      styles: '/src/styles',
      'ui-kit': '/src/ui-kit',
      services: '/src/services',
    },
  },
});
