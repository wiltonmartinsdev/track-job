import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/server.ts',
    'src/controllers/job-controller.ts',
    'src/middlewares/error-handling.ts',
    'src/routes/index.ts',
    'src/routes/job-routes.ts',
    'src/utils/AppError.ts',
  ],
  format: ['cjs', 'esm'],
  target: 'es2022',
  loader: {
    '.db': 'file'
  },
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: true,
  dts: true,
});