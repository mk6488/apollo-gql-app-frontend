import store from '../store'
import DashboardView from '../views/Auth/index.vue'

export default {
	path: '/dashboard',
	name: 'Dashboard',
	component: DashboardView,
	meta: { requiresAuth: true },
	redirect: '/dashboard/my-sessions',
	children: [{
			path: 'my-sessions',
			name: 'MySessions',
			component: () => import('../views/Dashboard/MySessions.vue')
		},
		{
			path: 'add-session',
			name: 'AddSession',
			component: () => import('../views/Dashboard/Add-Edit/AddSession.vue')
		},
		{
			path: 'my-athletes',
			name: 'MyAthletes',
			component: () => import('../views/Dashboard/MyAthletes.vue')
		},
		{
			path: 'add-athlete',
			name: 'AddAthlete',
			component: () => import('../views/Dashboard/Add-Edit/AddAthlete.vue')
		},
		{
			path: 'my-wellness',
			name: 'MyWellness',
			component: () => import('../views/Dashboard/MyWellness.vue')
		},
		{
			path: 'add-wellness',
			name: 'AddWellness',
			component: () => import('../views/Dashboard/Add-Edit/AddWellness.vue')
		},
		{
			path: 'my-loads',
			name: 'MyLoads',
			component: () => import('../views/Dashboard/MyLoads.vue')
		},
		{
			path: 'my-comments',
			name: 'MyComments',
			component: () => import('../views/Dashboard/MyComments.vue')
		},
		{
			path: 'my-tests',
			name: 'MyTests',
			component: () => import('../views/Dashboard/MyTests.vue')
		},
		{
			path: 'my-profile',
			name: 'MyProfile',
			component: () => import('../views/Dashboard/Profile.vue')
		},
		{
			path: 'logout',
			name: 'Logout',
			beforeEnter: (to, from, next) => {
				store.dispatch('Auth/logoutUser')
				next('/auth/login')
			}
		},
	]
}