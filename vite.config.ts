import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
    define: {
        'import.meta.env.INSIGHT_SENTRY_KEY': JSON.stringify(process.env.INSIGHT_SENTRY_KEY)
    },
    plugins: [solidPlugin()],
    server: {
        port: 3000,
        hmr: false,
        watch: undefined
    },
    build: {
        target: 'esnext'
    }
})
