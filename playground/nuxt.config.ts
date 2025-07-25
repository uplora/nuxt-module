export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '../src/module',
  ],
  // uplora: {
  //   // local instance
  //   fluxorUrl: 'http://localhost:3100',
  // },
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-05-19',
  devtools: { enabled: false },
  vite: {
    optimizeDeps: {
      include: ['debug'],
    },
  },
})
