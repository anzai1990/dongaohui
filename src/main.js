// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import Vuex from 'vuex'
import createRouter from './router'
import fastclick from 'fastclick'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import '../static/css/reset.css'
import VueTouch from 'vue-touch'

//import createStore from './store'

fastclick.attach(document.body);

Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(Router)
Vue.use(Vuex)
const router=createRouter()
//const store=createStore()
//注册module
/*store.registerModule('c',{
	state:{
		text:100
	}
})*/
//解绑module
//store.unregisterModule('c')
//监听变化
/*store.watch((state)=>state.count + 1,(newCount)=>{
	console.log("store watch count:"+newCount)
})*/
//监听mutation被调用的方法
/*store.subscribe((mutation,state)=>{
	console.log(mutation.type)
	console.log(mutation.payload)
})*/
//监听action被调用的方法
/*store.subscribeAction((action,state)=>{
	console.log(action.type)
	console.log(action.payload)
})*/


router.beforeEach((to,from,next)=>{
	window.document.title = to.meta.title;
  	next()
})

router.beforeEach((to,from,next)=>{
	if (to.path === '/match') {
    next();
  } else {
    let token = sessionStorage.getItem('token');
    if(!token){
      next('/match');
    } else {
      next();
    }
  }
})

/*全局路由守卫
 * router.beforeEach((to,from,next)=>{
	console.log("beforeEach work")
	if(to.fullPath==='/index'){
		next({path:'/login'});
	}else{
		next()
	}
})
router.beforeResolve((to,from,next)=>{
	console.log("beforeResolve work")
	next();
})
router.afterEach((to,from,next)=>{
	console.log("afterEach work")
})*/

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //store,
  components: { App },
  template: '<App/>',
})
