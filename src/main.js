import Vue from 'vue'
import App from './App.vue'
import zxcvbn from './lib/zxcvbn'

Vue.prototype.$zxcvbn = zxcvbn

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
