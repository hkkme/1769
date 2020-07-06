
require('dotenv').config();

export default {
  env: {
    PRISMIC_BASE_URL: process.env.PRISMIC_BASE_URL,
    PRISMIC_ACCESS_TOKEN: process.env.PRISMIC_ACCESS_TOKEN,
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Courier+Prime&family=Overpass+Mono:wght@300&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Josefin+Sans:500&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Alata&display=swap',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  generate: {
    fallback: true,
    routes: async () => {
      const routes = [
        '/navmap',
        '/navmob',
        '/',
        '/home',
        '/lab',
        '/us',
        '/host',
        '/tech',
        '/offers',
        '/signup',
        '/touch',
        '/imprint',
        '/showerloop',
        '/dronecoria',
        '/masdeflandi-draft-5c116q'
      ];
      return routes;
    },
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/plugins/vue-carousel.js',
      ssr: false,
    },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-164136062-1'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // '@/modules/static',
    // '@/modules/crawler',
    '@nuxtjs/prismic',
    '@nuxtjs/recaptcha',
    '@nuxtjs/sitemap',
  ],
  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: '6LdWJa4ZAAAAAJbLIcMzHJqyHRLZSoSTtgpMEAoQ', // Site key for requests
    version: 2, // Version
    size: 'normal' // Size: 'compact', 'normal', 'invisible' (v2)
  },
  router: {
    trailingSlash: false,
  },
  sitemap: {
    hostname: 'https://www.1769.eu',
    gzip: true,
    exclude: [
      '/mail',
      '/preview',
      '/404'
    ],
    trailingSlash: false
  },
  prismic: {
    endpoint: 'https://1769.cdn.prismic.io/api/v2',
    // linkResolver: '@/plugins/link-resolver',
    // htmlSerializer: '@/plugins/html-serializer',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
