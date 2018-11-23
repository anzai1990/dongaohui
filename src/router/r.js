router.beforeEach((to, from, next) => {
	if(to.matched.some(res => res.meta.requireAuth)) {
		if(sessionStorage.getItem('sessiontoken')) {
			console.log(1111)
			next()
		} else {
			console.log(22222)
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else {
		next()
	}
})