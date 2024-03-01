import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      port: 8000,
    },
    test: {
      include: ['tests/unit/**/*.spec.ts'],
      exclude: ["**/e2e/**", "**/node_modules/**"],
    },
  };
});