import { createApp as createVueApp, createSSRApp, defineAsyncComponent, h } from 'vue'
import { createRouter as createVueRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { createMetaManager as createVueMetaManager, defaultConfig, deepestResolver } from 'vue-meta'
import BootstrapVue from '@coreui/vue'
import App from './App.vue';
import { routes } from './router'
// import store from './store'
import './registerServiceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // semua di import
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

// import 'bootstrap/dist/css/bootstrap.min.css'
// import '@coreui/coreui/dist/css/coreui.min.css'
import './assets/css/font-icon.css'
import './assets/css/all.css'

/* eslint-disable */
// @ts-ignore
// import GAuth from 'vue3-google-oauth2'
// @ts-ignore
// import VueTour from 'vue3-tour'
/* eslint-enable */
// import 'vue3-tour/dist/vue3-tour.css'

const createMetaManager = (isSSR = false) => createVueMetaManager(
  isSSR,
  {
    ...defaultConfig,
    esi: {
      group: true,
      namespaced: true
      // TODO?: attributes: ['src', 'test', 'text']
    }
  },
  deepestResolver
)

export const createRouter = (base: string, isSSR = false) => createVueRouter({
  history: isSSR ? createMemoryHistory(base) : createWebHistory(base),
  routes
})

export const createApp = (base: string, isSSR = false) => {
  const component = {
    render: () => h(App),
    mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
  }
  const router = createRouter(base, !!isSSR)
  const metaManager = createMetaManager(!!isSSR)
  const app = isSSR === null ? createVueApp(component) : createSSRApp(component)
  app.component('font-awesome', FontAwesomeIcon)
  .component('fawesome-pro', defineAsyncComponent(() => import('./components/FAwesomeMaker.vue')))
  
  // .use(GAuth, {
  //   clientId: '481692414285-l3hd8qi21epi2qdc4bfo35nr2sq292is.apps.googleusercontent.com',
  //   scope: 'profile email',
  //   prompt: 'select_account'
  // })
  // .use(VueTour)
  // .use(store)
  .use(router)
  .use(metaManager)
  .use(BootstrapVue)

  return { app, router, metaManager }
}

const { app, router } = createApp('/')
router.isReady().then(() => app.mount('#app'))
