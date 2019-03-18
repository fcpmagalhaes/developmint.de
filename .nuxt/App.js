import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../assets/styles/app.pcss'

import _6f6c098b from '../layouts/default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"titleTemplate":c => c ? `${c} - Developmint` : 'Developmint',"noscript":[{"innerHTML":"This website requires JavaScript."}],"__dangerouslyDisableSanitizers":["script"],"script":[{"type":"application\u002Fld+json","innerHTML":"{\"@context\":\"http:\u002F\u002Fschema.org\",\"@type\":\"Corporation\",\"name\":\"Developmint\",\"legalName\":\"Developmint GbR - Alexander Lichter, Max Langer\",\"address\":{\"@type\":\"PostalAddress\",\"addressCountry\":\"DE\",\"addressLocality\":\"Leipzig\",\"addressRegion\":\"Sachsen\",\"postalCode\":\"04289\",\"streetAddress\":\"Corotweg 15\"},\"logo\":\"https:\u002F\u002Fdevelopmint.de\u002Flogo.png\",\"email\":\"mailto:support@developmint.de\",\"telephone\":\"+49 17670625208\",\"url\":\"https:\u002F\u002Fdevelopmint.de\",\"sameAs\":[\"https:\u002F\u002Fgithub.com\u002FDevelopmint\"],\"foundingDate\":\"2015-08-10\",\"founders\":[{\"@context\":\"http:\u002F\u002Fschema.org\",\"@type\":\"Person\",\"address\":{\"@type\":\"PostalAddress\",\"addressCountry\":\"DE\",\"addressLocality\":\"Leipzig\",\"addressRegion\":\"Sachsen\",\"postalCode\":\"04289\",\"streetAddress\":\"Corotweg 15\"},\"name\":\"Alexander Lichter\",\"image\":\"https:\u002F\u002Fdevelopmint.de\u002Falex@2x.jpg\",\"email\":\"mailto:alichter@developmint.de\",\"telephone\":\"+49 17670625208\",\"jobTitle\":\"Founder of Developmint\",\"sameAs\":[\"https:\u002F\u002Ftwitter.com\u002FTheAlexLichter\",\"https:\u002F\u002Fgithub.com\u002FmanniL\",\"https:\u002F\u002Flichter.io\",\"https:\u002F\u002Flinkedin.com\u002Fin\u002Falexanderlichter\"]},{\"@context\":\"http:\u002F\u002Fschema.org\",\"@type\":\"Person\",\"name\":\"Max Langer\",\"image\":\"https:\u002F\u002Fdevelopmint.de\u002Fmax@2x.jpg\",\"email\":\"mailto:mlanger@developmint.de\",\"jobTitle\":\"Founder of Developmint\",\"sameAs\":[\"https:\u002F\u002Ftwitter.com\u002Fmangerlahn\",\"https:\u002F\u002Fgithub.com\u002Fmangerlahn\",\"https:\u002F\u002Fmax.codes\u002F\",\"https:\u002F\u002Fwww.linkedin.com\u002Fin\u002Fmax-langer-17b133136\u002F\"]}],\"numberOfEmployees\":2,\"vatID\":\"DE301268038\",\"taxID\":\"231\u002F158\u002F16101\"}"}],"meta":[{"hid":"charset","charset":"utf-8"},{"hid":"viewport","name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"Developmint"},{"hid":"author","name":"author","content":"Developmint"},{"hid":"description","name":"description","content":"Developmint is an experienced Software agency based in Dresden (Germany). Let your visions become reality with us!"},{"hid":"theme-color","name":"theme-color","content":"#199922"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"Developmint"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"Developmint"},{"hid":"og:description","name":"og:description","property":"og:description","content":"Developmint is an experienced Software agency based in Dresden (Germany). Let your visions become reality with us!"},{"hid":"og:url","name":"og:url","property":"og:url","content":"https:\u002F\u002Fdevelopmint.de\u002F"},{"hid":"og:image","name":"og:image","property":"og:image","content":"https:\u002F\u002Fdevelopmint.de\u002Flogo.png"},{"hid":"twitter:card","name":"twitter:card","property":"twitter:card","content":"summary"}],"link":[{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.722b19f9.json"},{"rel":"shortcut icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_64.9kZqIaB3twM.png"},{"rel":"apple-touch-icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_512.9kZqIaB3twM.png","sizes":"512x512"}],"style":[],"htmlAttrs":{"lang":"en"}},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if(layout && typeof layout !== 'string') throw new Error('[nuxt] Avoid using non-string value as layout property.')

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
