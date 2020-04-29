<template>
	<!--    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div> -->
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
		 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
			<template v-for="item in items">
				<template v-if="item.children">
					<el-submenu :index="item.name" :key="item.id">
						<template slot="title">
							<i class="el-icon-lx-home"></i>
							<span slot="title">{{ item.name}}</span>
						</template>
						<template v-for="(subItem , index) in item.children">
							<div class="next">
								<el-submenu v-if="subItem.children" :index="subItem.name" :key="subItem.id">
									<template slot="title"><i @click="letf1( subItem.url , subItem.id)"><a :href="urla" target="myFrameName" style="text-decoration:none;color:rgb(191, 203, 217);display: inline-block;height: 100%;width: 100%;padding-left: 20px;"
											 :class="[currentIndex == subItem.id ? 'color' : '']">{{ subItem.name }}</a></i></template>
									<el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.name">{{ threeItem.name }}</el-menu-item>
								</el-submenu>
								<el-menu-item v-else :index="subItem.name" :key="subItem.id">{{ subItem.name }}</el-menu-item>
							</div>
						</template>
					</el-submenu>
				</template>
				<!--  <template v-else>
	                <el-menu-item :index="item.name" :key="item.id">
	                    <i class="el-icon-lx-home"></i>
	                    <span slot="title">{{ item.name }}</span>
	                </el-menu-item>
	            </template> -->
			</template>
		</el-menu>
	</div>
</template>

<script>
	import bus from '../common/bus';
	import {
		add3 
	} from "../../api/index.js"
	export default {

		mounted() {
			let data = {
				status: 'search'
			}
			add3(data).then(res => {
				console.log(res.data.data);
				this.items = res.data.data;
			}).catch(err => {
				console.log(err);
			});

		},
		data() {
			return {
				collapse: true,
				items: '',
				urla: '',
				currentIndex: null,
				/*items:[
					{
						id: 20,
						name: "角色管理",
						parent: 0,
						sort: 0,
						state: 1,
						children:[
							{
								children: [],
								id: 21,
								name: "角色管理1",
								parent: 20,
								sort: 1,
								state: "",
								url: "http://223.247.202.40:8088/shop/shopAdmin/html/#/role",
							}
						]
					},{
					id: 17,
					name: "账号管理",
					parent: 0,
					sort: 0,
					state: 1,
					children:[
						{
							children: [],
							id: 18,
							name: "账号添加",
							parent: 17,
							sort: 1,
							state: "",
							url: "http://223.247.202.40:8088/shop/shopAdmin/html/#/accountadd",
						},
						{
							children: [],
							id: 19,
							name: "账号列表",
							parent: 17,
							sort: 2,
							state: "",
							url: "http://223.247.202.40:8088/shop/shopAdmin/html/#/account",
						}
					]
				},]*/

			};
		},
		methods: {
			letf1(url1, id) {
				this.currentIndex = id
				//this.$router.go()
				this.urla = url1
				this.$store.commit('setValue', url1)
				//this.$store.commit('setValue' , url1)
				this.$store.commit('setValue1', false)
			}

		},
		computed: {
			onRoutes() {
				return this.$route.path.replace('/', '');
			}
		},
		created() {
			// 通过 Event Bus 进行组件间通信，来折叠侧边栏
			bus.$on('collapse', msg => {
				this.collapse = msg;
				bus.$emit('collapse-content', msg);
			});
		}
	};
</script>

<style lang="scss" scoped>
	.color {
		font-weight: 600;
		color: #007AFF !important;
	}

	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 70px;
		bottom: 0;
		overflow-y: scroll;
	}

	.sidebar::-webkit-scrollbar {
		width: 200px;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 200px;
	}

	.sidebar>ul {
		height: 100%;
	}

	.el-icon-arrow-down:before {
		content: '' !important;
	}

	.next {
		/deep/ .el-icon-arrow-down:before {
			content: "" !important
		}
	}
</style>
