import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr({exportAsDefault:true, svgo:true})],
    resolve: {
        alias: {
            '!components': path.resolve(__dirname, 'src/components'),
            "!pages": path.resolve(__dirname, 'src/pages'),
            "!assets": path.resolve(__dirname, 'src/assets'),
            "!hooks": path.resolve(__dirname, 'src/hooks'),
            "!utils": path.resolve(__dirname, 'src/utils'),
            "!src": path.resolve(__dirname, 'src'),
        },
    },
    server: {
        historyApiFallback: true
    }
})
