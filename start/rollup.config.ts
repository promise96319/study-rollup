import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    manualChunks(id) {
      if (id.includes('a.js')) {
        return 'vendor';
      }
    },
    format: 'cjs'
  },
  plugins: [json()],
  watch: {
    include: ['./src/*']
  }
};