import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        // splitVendorChunkPlugin()
    ],
    server: {
        host: true,
        port: 3000,
        watch: {
            usePolling: true
        }
    },
    build: {
        rollupOptions: {
            external: ['@/*'],
            // output: {
            //     manualChunks(id) {
            //         if (id.includes('@open-ish') || id.includes('tslib')) {
            //             return '@open-ish';
            //         }
            //
            //         if (
            //             id.includes('react-router-dom') ||
            //             id.includes('@remix-run') ||
            //             id.includes('react-router')
            //         ) {
            //             return '@react-router';
            //         }
            //
            //         if (id.includes("src/components/pages")) {
            //             return "@pages"
            //         }
            //
            //         if (id.includes("src/components/providers")) {
            //             return "@providers"
            //         }
            //
            //         if (id.includes("src/components/ui")) {
            //             return "@ui"
            //         }
            //
            //         if (id.includes("src/components/layout")) {
            //             return "@layouts"
            //         }
            //
            //         if (id.includes("src/components/ui/forms")) {
            //             return "@forms"
            //         }
            //
            //         if (id.includes("src/components/ui/icons")) {
            //             return "@icons"
            //         }
            //
            //         if (id.includes("src/components/ui/loader")) {
            //             return "@loaders"
            //         }
            //
            //         if (id.includes("src/components/ui/popup")) {
            //             return "@popups"
            //         }
            //
            //         if (id.includes("src/components/ui/project")) {
            //             return "@project"
            //         }
            //
            //         if (id.includes("src/components/ui/status")) {
            //             return "@status"
            //         }
            //
            //         if (id.includes("src/components/ui/task")) {
            //             return "@task"
            //         }
            //
            //         if (id.includes("src/components/ui/user")) {
            //             return "@user"
            //         }
            //
            //         if (id.includes("src/hooks")) {
            //             return "@hooks"
            //         }
            //
            //         if (id.includes("src/services")) {
            //             return "@services"
            //         }
            //
            //         if (id.includes("src/models")) {
            //             return "@models"
            //         }
            //
            //         if (id.includes("src/styles")) {
            //             return "@styles"
            //         }
            //
            //         if (id.includes("src/utils")) {
            //             return "@utils"
            //         }
            //
            //         return 'common';
            //     },
            //
            // },
        },
    },
    preview: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    }
})
