<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div class="collapse-btn" @click="collapseChage">
			<i v-if="collapse" class="el-icon-s-fold"></i>
			<i v-else class="el-icon-s-unfold"></i>
		</div>
		<div class="logo">后台管理系统</div>
		<div class="header-right">
			<div class="header-user-con">
				<!-- 全屏显示 -->
				<div class="btn-fullscreen" @click="handleFullScreen">
					<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
						<i class="el-icon-rank"></i>
					</el-tooltip>
				</div>
				<!-- 消息中心 -->
				<div class="btn-bell">
					<el-badge :value="message" class="item" >
					 <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    > 
					<router-link to="/tabs">
						<i class="el-icon-bell"></i>
					</router-link>
					</el-tooltip>
					</el-badge>
					<!-- <span class="btn-bell-badge" v-if="userlist != '' "></span> -->
				</div>
				<!-- 用户头像 -->
				<div class="user-avator">
					<img src="../../assets/img/img.jpg">
				</div>
				<!-- 用户名下拉菜单 -->
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{name}}
						<i class="el-icon-caret-bottom"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<a @click="update()">
							<el-dropdown-item>修改密码</el-dropdown-item>
						</a>
						<el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<el-dialog title="修改密码" :visible.sync="dialogVisible1" width="30%">
			<div class="addsize">
				<label>原始密码：</label><input placeholder="请输入原始密码" v-model="password" type="password" />
			</div>
			<div class="addsize">
				<label>新密码：</label><input placeholder="请输入新密码" v-model="password1" type="password" />
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="handleClose1">提交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import bus from '../common/bus';
	import {
		message,
		manage,
		check
	} from '../../api/index.js'
	export default {
		data() {
			return {
				collapse: true,
				fullscreen: false,
				name: '',
				message: 1, //客服消息
				userlist: '',
				dialogVisible1: false,
				password: '',
				password1: ''
			};
		},
		computed: {
			// username() {
			// 	let username = localStorage.getItem('ms_username');
			// 	return username ? username : this.name;
			// }
		},
		methods: {
			handleClose1() { //修改密码
				let data = {
					status: 'updateps',
					oldpassword: this.password,
					newpassword: this.password1
				}
				manage(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.$message({
							message: msg,
							type: 'success'
						});
						this.dialogVisible1 = false
					} else {
						this.$message({
							message: msg,
							type: 'error'
						});
					}

				}).catch(err => {
					console.log(err);
				});
			},
			update() {
				this.dialogVisible1 = true
			},
			// 用户名下拉菜单选择事件
			handleCommand(command) {
				if (command == 'loginout') {
					localStorage.removeItem('ms_username');
					this.$router.push('/login');
				}
			},
			// 侧边栏折叠
			collapseChage() {
				this.collapse = !this.collapse;
				bus.$emit('collapse', this.collapse);
			},
			// 全屏事件
			handleFullScreen() {
				let element = document.documentElement;
				if (this.fullscreen) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if (element.requestFullscreen) {
						element.requestFullscreen();
					} else if (element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if (element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			}
		},
		mounted() {
			if (document.body.clientWidth < 1500) {

			}
			this.collapseChage();

			let data = {
				status: 'search'
			}
			message(data).then(res => {
				if (res.data.msg == 'success') {
					this.userlist = res.data.data
					this.message = res.data.data.length
				}
			}).catch(err => {
				console.log(err);
			});
			check().then(res => {
				if (res.data.msg == 'success') {
					//localStorage.setItem('bsid', res.data.backid)
					// localStorage.setItem('bsname' , res.data.backname)
					this.name = res.data.backname
					//this.$store.commit('setName', res.data.backname)
					//console.log(localStorage.getItem('bsid'))
					// console.log(localStorage.getItem('bsname'))
				} else {
					//this.$router.push({
						//path: 'login'
					//})
				}
				console.log(res)
			}).catch(err => {
				console.log(err);
			});
		}
	};
</script>
<style lang="scss" scoped>
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		font-size: 22px;
		color: #fff;
	}

	.collapse-btn {
		float: left;
		padding: 0 21px;
		cursor: pointer;
		line-height: 70px;
	}

	.header .logo {
		float: left;
		width: 250px;
		line-height: 70px;
	}

	.header-right {
		float: right;
		padding-right: 50px;
	}

	.header-user-con {
		display: flex;
		height: 70px;
		align-items: center;
	}

	.btn-fullscreen {
		transform: rotate(45deg);
		margin-right: 5px;
		font-size: 24px;
	}

	.btn-bell,
	.btn-fullscreen {
		position: relative;
		width: 30px;
		height: 30px;
		text-align: center;
		border-radius: 15px;
		cursor: pointer;
	}

	.btn-bell-badge {
		position: absolute;
		right: 0;
		top: -2px;
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background: #f56c6c;
		color: #fff;
	}

	.btn-bell .el-icon-bell {
		color: #fff;
	}

	.user-name {
		margin-left: 10px;
	}

	.user-avator {
		margin-left: 20px;
	}

	.user-avator img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.el-dropdown-link {
		color: #fff;
		cursor: pointer;
	}

	.el-dropdown-menu__item {
		text-align: center;
	}

	.addsize {
		margin-bottom: 15px;
		display: flex;
		//flex: 1;
		height: 30px;
		text-align: center;
		//justify-content: center;
		align-items: center;

		label {
			//display: inline-block;
			width: 18%;
			//border: #000000 solid 1px;
		}

		input {
			height: 30px;
			width: 60%;
			padding-left: 10px;
		}

		/deep/ .el-input__inner {
			height: 35px;

		}
	}
</style>
