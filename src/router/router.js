import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/components/common/Home.vue"

Vue.use(Router)

const router = new Router({
	routes: [
		  {
		  	path: '/',
		  	name: 'home',
		  	component: Home,
		  	meta: {
		  		title: ""
		  	},
		  },
		
		 {
		     path: '/',
		     component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
		     meta: { title: '' },
			 children: [
			     // {//客服中心
			     // 	path: '/tabs',
			     // 	name: 'tabs',
			     // 	component: () => import('@/views/Management/Service/index.vue' )
			     // },
				 // {
					//  path: '/分类添加',
					// component: () => import( '@/views/Management/Goods/classadd.vue' )
				 // }
			 ]
		 },
		
		{//登录
		  path: '/login', 
		  name: 'login',
		  component: () => import( '@/views/Login/index.vue' )
		},
		{//商品添加
		  path: '/add', 
		  name: 'add',
		  component: () => import( '@/views/Management/Goods/add.vue' )
		},
		{//商品列表
		  path: '/list', 
		  name: 'list',
		  component: () => import( '@/views/Management/Goods/list.vue' )
		},
		{//未上架商品列表
		  path: '/nshelves', 
		  name: 'nshelves',
		  component: () => import( '@/views/Management/Goods/nshelves.vue' )
		},
		
		{//分类添加
		  path: '/classadd', 
		  name: 'classadd',
		  component: () => import( '@/views/Management/Goods/classadd.vue' )
		},
		
		{//分类添加列表
		  path: '/classlist', 
		  name: 'classlist',
		  component: () => import( '@/views/Management/Goods/classlist.vue' )
		},
		
		{//订单列表
		  path: '/order', 
		  name: 'order',
		  component: () => import( '@/views/Management/Order/index.vue' )
		},
		{//未发货订单列表
		  path: '/undelivered', 
		  name: 'undelivered',
		  component: () => import( '@/views/Management/Order/undelivered.vue' )
		},
		{//未付款订单列表
		  path: '/npaid', 
		  name: 'npaid',
		  component: () => import( '@/views/Management/Order/npaid.vue' )
		},
		
		{//地址管理
			path: '/address',
			name: 'address',
			component: () => import('@/views/Management/Address/index.vue' )
		},
		{//店铺添加
			path: '/shopadd',
			name: 'shopadd',
			component: () => import('@/views/Management/Shop/add.vue' )
		},
		{//店铺列表
			path: '/shop',
			name: 'shop',
			component: () => import('@/views/Management/Shop/index.vue' )
		},
		{//账号列表
			path: '/account',
			name: 'account',
			component: () => import('@/views/Management/Account/index.vue' )
		},
		{//账号添加
			path: '/accountadd',
			name: 'accountadd',
			component: () => import('@/views/Management/Account/add.vue' )
		},
		{//账号列表
			path: '/role',
			name: 'role',
			component: () => import('@/views/Management/Role/index.vue' )
		},
		{//京东接口
			path: '/jindon',
			name: 'jindon',
			component: () => import('@/views/Management/JinDon/index.vue' ),
		},
		{//商品添加
		  path: '/JDadd', 
		  name: 'JDadd',
		  component: () => import( '@/views/Management/JinDon/JDadd.vue' )
		},
		{//客服中心index
			path: '/tabs',
			name: 'tabs',
			component: () => import('@/views/Service/index.vue' )
			
		},
		
		// {//客服中心
		// 	path: '/service',
		// 	name: 'service',
		// 	component: () => import('@/views/Management/Service/index.vue' )
		// },
		// {//店铺审核
		// 	path: '/check',
		// 	name: 'check',
		// 	component: () => import('@/views/Management/Check/index.vue' )
		// }
	]
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})
export default router;