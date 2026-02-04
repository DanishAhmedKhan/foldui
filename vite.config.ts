import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'WebBlocks',
            fileName: 'web-blocks',
        },
    },
})
