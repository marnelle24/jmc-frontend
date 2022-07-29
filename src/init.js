export function initialize(store, router) {

	router.beforeEach((to, from, next) => {

		const requiresAuth 	= to.matched.some(record => record.meta.requiresAuth);
		const loggedIn 	= store.state.user.currentUser;

		if(requiresAuth) {
			if(!loggedIn) {
				next({ path: "/login", query: { redirect: to.fullPath }});
			}
			else {
				next();
			}
		}
		else if(to.path === '/login' && loggedIn) {
			next('/');
		}
		else {
			next()
		}
	});

}

