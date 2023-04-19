// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vue-final-modal/style.css"],
  modules: ["@nuxt/devtools", "@nuxtjs/tailwindcss"],
  typescript: {
    shim: false,
    strict: true,
  },
});
