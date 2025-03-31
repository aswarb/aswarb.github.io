import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr({exportAsDefault:true, svgo:true})],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/components'),
            "!pages": path.resolve(__dirname, 'src/pages'),
            "!assets": path.resolve(__dirname, 'src/assets'),
            "!hooks": path.resolve(__dirname, 'src/hooks'),
        },
    },
})
