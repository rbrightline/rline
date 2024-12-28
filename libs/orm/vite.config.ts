import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/orm',
  plugins: [],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  resolve: {
    alias: {
      '@rline/property': path.resolve(__dirname, '../property/dist'),
      '@rline/query': path.resolve(__dirname, '../query/dist'),
      '@rline/type': path.resolve(__dirname, '../type/dist'),
      '@rline/validation': path.resolve(__dirname, '../validation/dist'),
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8',
    },
  },
});
