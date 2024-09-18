import commonjs from '@rollup/plugin-commonjs';
import rollupReplace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: process.env.USE_SOURCE
    ? {
        alias: {
          '@': path.resolve(__dirname, './src/'),
          'react-router': path.resolve(__dirname, '../../packages/react-router/index.ts'),
          'react-router-dom': path.resolve(__dirname, '../../packages/react-router-dom/index.tsx'),
        },
      }
    : {
        alias: {
          '@bettermode/pages/': path.resolve(__dirname, './src/pages'),
          '@bettermode/utilities': path.resolve(__dirname, './src/utilities/index.ts'),
          '@bettermode/components': path.resolve(__dirname, './src/components/index.ts'),
          '@bettermode/models': path.resolve(__dirname, './src/models/index.ts'),
          '@bettermode/stores': path.resolve(__dirname, './src/stores/index.ts'),
        },
      },
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
    }),
    commonjs(),
    react(),
  ],
  optimizeDeps: {
    include: ['@apollo/client'],
  },
  ssr: {
    noExternal: ['@apollo/client'],
  },
});
