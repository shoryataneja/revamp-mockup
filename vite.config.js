import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), '')

  if (!env.VITE_CDN_BASE) {
    throw new Error('VITE_CDN_BASE is not set — copy .env.example to .env')
  }

  const siteUrl = (env.VITE_SITE_URL || 'https://populardigital.ai').replace(/\/+$/, '')

  const siteUrlPlugin = {
    name: 'site-url',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    },
  }

  return {
    plugins: [siteUrlPlugin, react(), tailwindcss()],
    assetsInclude: ['**/*.mpeg', '**/*.mp3', '**/*.wav', '**/*.ogg', '**/*.mp4'],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@layout': fileURLToPath(new URL('./src/components/layout', import.meta.url)),
        '@sections': fileURLToPath(new URL('./src/components/sections', import.meta.url)),
        '@ui': fileURLToPath(new URL('./src/components/ui', import.meta.url)),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
        '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
        '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
        '@fonts': fileURLToPath(new URL('./src/assets/fonts', import.meta.url)),
      },
    },
  }
})
