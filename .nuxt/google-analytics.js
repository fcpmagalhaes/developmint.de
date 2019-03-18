import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

export default async function ({ app: { router } }) {
  const options = {"dev":true,"debug":{"sendHitTask":false},"id":"UA-62902757-7","disabled":() => document.cookie.indexOf('ga_optout=true') !== -1,"set":[{"field":"anonymizeIp","value":true}]}

  Vue.use(VueAnalytics, {...{ router }, ...options})
}
