import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react-refresh'
// import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(),
//	  reactRefresh() conflicted
  ],
  server: {
    host: true,
  },
  // will transform require to import
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // below work on dev mode
//  optimizeDeps: {
//    esbuildOptions: {
//      plugins: [esbuildCommonjs(['react-quilljs'])],
//    },
//  },
})
