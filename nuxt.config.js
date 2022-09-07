import axios from "axios"
export default {
  hooks:{
    'render:route':(url,result)=>{
      result.html = result.html.replace(/data-n-head=\"ssr\"/gi,'')
    }
  },
  sitemap:{
    path: '/sitemap.xml', // 生成的文件路径
    hostname: 'https://xiapaopao.com/', // 网址
    cacheTime: 1000 * 60 * 60 * 24, // 1天 更新频率，只在 generate: false有用
    gzip: true, // 生成 .xml.gz 压缩的 sitemap
    generate: false, // 允许使用 nuxt generate 生成
    // 排除不要页面
    exclude: [
        '/404', //  这里的路径相对 hostname
        '/member/article/create',
        '/member/article/list',
        '/member/article/edit',
        '/member/audio/create',
        '/member/audio/list',
        '/member/audio/edit',
        '/member/video/create',
        '/member/video/list',
        '/member/video/edit',
        '/member/edu/create',
        '/member/edu/list',
        '/member/edu/edit',
        '/member/comment/create',
        '/member/comment/list',
        '/member/comment/edit',
        '/member/comment/dashboard',
        '/member/feed/create',
        '/member/feed/list',
        '/member/feed/edit',
        '/member/feed/dashboard',
        '/member/group/create',
        '/member/group/list',
        '/member/group/edit',
        '/member/group/dashboard',
        '/member/resource/create',
        '/member/resource/list',
        '/member/resource/edit',
        '/member/resource/dashboard',

        '/member/allowance',
        '/member/dashboard',
        '/member',
        
        '/notice/answer',
        '/notice/chat',
        '/notice/comment',
        '/notice/follow',
        '/notice/like',
        '/notice/system',
        '/notice',

        '/account/base',
        '/account/bind',
        '/account/course',
        '/account/favorite',
        '/account/resource',
        '/account/verify',
        '/account/vip',
        '/account/wallet',
        '/account',
    ],
    // xml默认的配置
    defaults: {
        changefreq: 'always',
        lastmod: new Date()
    },
    // 需要生成的xml数据, return 返回需要给出的xml数据
    routes: async () => {
        const _url = 'https://api.xiapaopao.com/v1/index/system/sitemap'
        const res = await axios.get(_url);
        const routes = res.data.data.map((item)=>{
            const tmp ={
                "url": item.url,
                "changefreq": "yearly",
                "lastmod": item.lastmod
            }
            return tmp
        })
        // const routes = []
        return routes
    }
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  // telemetry: false,
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'baidu-site-verification', content: 'code-STSylVh5vF' },
      { name: 'description', content: process.env.npm_package_description || '' },
      { name: 'keywords', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/public/uploads/2022-08-16/cm7j5hg1upzjoh1apt.ico' }
    ],
    script: [
      { src: 'https://hm.baidu.com/hm.js?69ae2b587adb2380abc5e263ee9c0079' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/lib/descriptions/style/css',
    'ant-design-vue/lib/anchor/style/css',
    'ant-design-vue/lib/skeleton/style/css',
    'ant-design-vue/lib/result/style/css',
    'ant-design-vue/lib/popover/style/css',
    'ant-design-vue/lib/progress/style/css',
    'ant-design-vue/lib/switch/style/css',
    'ant-design-vue/lib/checkbox/style/css',
    'ant-design-vue/lib/alert/style/css',
    'ant-design-vue/lib/date-picker/style/css',
    'ant-design-vue/lib/select/style/css',
    'ant-design-vue/lib/upload/style/css',
    'ant-design-vue/lib/tabs/style/css',
    'ant-design-vue/lib/radio/style/css',
    'ant-design-vue/lib/form-model/style/css',
    'ant-design-vue/lib/card/style/css',
    'ant-design-vue/lib/input/style/css',
    'ant-design-vue/lib/timeline/style/css',
    'ant-design-vue/lib/tag/style/css',
    'ant-design-vue/lib/dropdown/style/css',
    'ant-design-vue/lib/menu/style/css',
    'ant-design-vue/lib/config-provider/style/css',
    'ant-design-vue/lib/layout/style/css',
    'ant-design-vue/lib/button/style/css',
    'ant-design-vue/lib/row/style/css',
    'ant-design-vue/lib/col/style/css',
    'ant-design-vue/lib/icon/style/css',
    'ant-design-vue/lib/pagination/style/css',
    'ant-design-vue/lib/table/style/css',
    'ant-design-vue/lib/avatar/style/css',
    'ant-design-vue/lib/badge/style/css',
    'ant-design-vue/lib/modal/style/css',
    'ant-design-vue/lib/message/style/css',
    'ant-design-vue/lib/notification/style/css',
    'ant-design-vue/lib/divider/style/css',
    'ant-design-vue/lib/space/style/css',
    'ant-design-vue/lib/steps/style/css',
    'ant-design-vue/lib/input-number/style/css',
    'ant-design-vue/lib/tree-select/style/css',
    'ant-design-vue/lib/empty/style/css',
    'ant-design-vue/lib/statistic/style/css',
    'ant-design-vue/lib/affix/style/css',
    'ant-design-vue/lib/tooltip/style/css',
    'ant-design-vue/lib/back-top/style/css',
    'ant-design-vue/lib/slider/style/css',
    'ant-design-vue/lib/tree/style/css',
    'swiper/css/swiper.css',
    '~/static/css/reset.css',
    '~/static/css/variable.less',
    '~/static/css/main.less',
  ],

  loading:false,
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {
      src: '@/plugins/baidu'
    },
    '@/plugins/antd-ui',
    // { src: '@/plugins/socket', ssr: false },
    { src: '@/plugins/modals/share', ssr: false },
    { src: '@/plugins/modals/shareFeed', ssr: false },
    { src: '@/plugins/modals/resource', ssr: false },
    { src: '@/plugins/modals/auth', ssr: false },
    { src: '@/plugins/modals/cash', ssr: false },
    { src: '@/plugins/modals/pay', ssr: false },
    { src: '@/plugins/modals/upload', ssr: false },
    { src: '@/plugins/modals/payQr', ssr: false },
    { src: '@/plugins/modals/rechargeQr', ssr: false },
    { src: '@/plugins/modals/recharge', ssr: false },
    { src: '@/plugins/modals/charge', ssr: false },
    { src: '@/plugins/modals/report', ssr: false },
    { src: '@/plugins/modals/joinEdu', ssr: false },
    { src: '@/plugins/modals/imgPreview', ssr: false },
    { src: '@/plugins/axios'},
    { src: '@/plugins/echarts', ssr: false },
    { src: "@/plugins/swipe", ssr: false },
    { src: "@/plugins/clipboard", ssr: false },
    '@/plugins/mixins',
    '@/plugins/md5',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    "@nuxtjs/sitemap"
  ],
  

  server:{
    port: 3000,
    host: "0.0.0.0"
  },

  // axios: {
  //   prefix: '/v1/',
  //   proxy: true,
  // },
  // proxy: {
  //   "/v1/": {
  //     changeOrigin: true,
  //     target: "http://localhost:8199"
  //   }
  // },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    vendor: ['axios'], // 为防止重复打包
  }
}
