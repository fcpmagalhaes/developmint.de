import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _1670f9ff = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _494ccece = () => interopDefault(import('../pages/disclaimer.vue' /* webpackChunkName: "pages/disclaimer" */))
const _397c79aa = () => interopDefault(import('../pages/legal.vue' /* webpackChunkName: "pages/legal" */))
const _d079540c = () => interopDefault(import('../pages/privacy.vue' /* webpackChunkName: "pages/privacy" */))
const _2e9a238f = () => interopDefault(import('../pages/work.vue' /* webpackChunkName: "pages/work" */))
const _6d9b82d2 = () => interopDefault(import('../pages/work/index.vue' /* webpackChunkName: "pages/work/index" */))
const _3628d4c4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/about-us",
      component: _1670f9ff,
      name: "about___en"
    }, {
      path: "/de/ueber-uns",
      component: _1670f9ff,
      name: "about___de"
    }, {
      path: "/disclaimer",
      component: _494ccece,
      name: "disclaimer___en"
    }, {
      path: "/de/haftungsausschluss",
      component: _494ccece,
      name: "disclaimer___de"
    }, {
      path: "/legal",
      component: _397c79aa,
      name: "legal___en"
    }, {
      path: "/de/impressum",
      component: _397c79aa,
      name: "legal___de"
    }, {
      path: "/privacy",
      component: _d079540c,
      name: "privacy___en"
    }, {
      path: "/de/datenschutz",
      component: _d079540c,
      name: "privacy___de"
    }, {
      path: "/work",
      component: _2e9a238f,
      children: [{
        path: "",
        component: _6d9b82d2,
        name: "work___en"
      }]
    }, {
      path: "/de/referenzen",
      component: _2e9a238f,
      children: [{
        path: "",
        component: _6d9b82d2,
        name: "work___de"
      }]
    }, {
      path: "/",
      component: _3628d4c4,
      name: "index___en"
    }, {
      path: "/de/",
      component: _3628d4c4,
      name: "index___de"
    }],

    fallback: false
  })
}
