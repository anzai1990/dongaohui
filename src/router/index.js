import Vue from 'vue'
import Router from 'vue-router'


export default()=>{
	return new Router({
		base:'/wap/',
		routes:[
			{
				path: '*',
				redirect: '/'
			},
			{
				path: '/',
				redirect: '/match',
			},
			{
				path: '/signup',
				component: ()=>import ('@/pages/signup'),
				meta:{
					title:"立即报名",
				}
			},
			{
				path: '/index',
				component: ()=>import ('@/pages/index'),
				meta:{
					title:"报名成功",
				}
			},
			{
				path: '/pageNav',
				component: ()=>import ('@/pages/pageNav'),
				redirect: '/match',
				meta:{
					title:"活动规则",
				},
				children:[
					{
						path: '/match',
						component: ()=>import ('@/pages/match'),
						meta:{title:"最新参赛",},
					},
					{
						path: '/popularity',
						component: ()=>import ('@/pages/popularity'),
						meta:{title:"人气榜单",},
					},
					{
						path: '/rule',
						component: ()=>import ('@/pages/rule'),
						meta:{title:"活动规则",},
					},
					{
						path: '/userInfo',
						component: ()=>import ('@/pages/userInfo'),
						meta:{title:"个人信息",},
					},
				]
			},
		],
		scrollBehavior (to, from, savedPosition) {
			if (savedPosition) {
				return savedPosition
			} else {
				//console.log(1111)
				return { x: 0, y: 0 }
			}
		}
	  	
	})
}
