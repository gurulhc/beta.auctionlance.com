export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#e4432d' },
  env: {
    Comet_Chat_App_ID: '53684',
    Comet_Chat_Auth_Key: 'c5e3036bbdfbbf99e2a67c2a5d2c4665',
    Comet_Chat_API_Key: '53684x29556d78acd3953ee8f214e5fd444832'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vueTyper.client.js' },
    { src: '~/plugins/vueTagsInput.client.js' },
    { src: '~/plugins/cloudinary.client.js' },
    { src: '~/plugins/vue-scrollmagic.client.js' },
    { src: '~/plugins/cometChat.client.js' },
    { src: '~/plugins/vuelidate.client.js' },
    { src: '~plugins/vue-js-modal' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast'
  ],

  toast: {
    position: 'top-center',
    duration: 5000
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
