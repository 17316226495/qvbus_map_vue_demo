// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { DatetimePicker} from 'mint-ui';
import 'mint-ui/lib/style.css'
import VueAMap  from 'vue-amap'
import App from './App'
import router from './router'
import './assets/utils/cookieSetting'
Vue.config.productionTip = false
Vue.use(VueAMap)
Vue.component(DatetimePicker.name, DatetimePicker);
VueAMap .initAMapApiLoader({
  key: 'c1d6a1e1fb3c6ebed7d428745ae52cd7',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Transfer']
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})



