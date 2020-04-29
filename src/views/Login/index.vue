<template>
	<!--用户登录-->
	<div class="login">
	<div class="login-right">
		<h4>用户登录</h4>
		<div class="login-input">
			<span>
				<img src="./image/user.png">
			</span>
			<input placeholder="用户名" v-model="name"/>
		</div>
		<div class="login-input">
			<span>
				<img src="./image/pword.png">
			</span>
			<input placeholder="密码" type="password" v-model="password" @keyup.enter="login"/>
		</div>
		<div class="login-check">
			<!-- `checked` 为 true 或 false -->
			
		  <el-checkbox v-model="checked" >记住密码</el-checkbox>
		</div>
		<button @click="login()"><span>登录</span></button>
		<div class="login-res">
			<span>还没有账号？</span><i>立即注册</i>
		</div>
	</div>
	</div>
</template>

<script>
	import {
		add
	} from '@/api/index.js'
	export default{
		name:'login',
		data () {
		      return {
		        checked: true,
				name:'',
				password:''
		      };
		    },
		methods:{
			login(){
				if(this.name == ''){
					console.log("用户名不能为空哦~");
					return;
				}
				if(this.password == ''){
					console.log("请输入密码")
					return;
				}
				let data={
					name: this.name,
					password: this.password,
				}
				add(data).then(res => {
					let msg = res.data.msgText
				 if(res.data.msg == 'success'){
					 this.$router.push({path: '/'})
				 }else{
					 this.$message({
					 	message: msg,
					 	type: 'error'
					 });
				 }
					
				}).catch(err => {
					console.log(err);
				});
				//console.log(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .el-checkbox__input.is-checked+.el-checkbox__label{
		color:#6848c2;
	}
	/deep/ .el-checkbox__input.is-checked .el-checkbox__inner{
		background-color:#6848c2 !important;
		border-color:#6848c2;
	}
	.login{
		background: url(./image/bj2.png);
		width: 100%;
		height: 100%;
		position: absolute;
		background-size: cover;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	
	.login-right{
		margin-right: 76px;
		h4{
			font-size:16px;
			word-spacing: 1px;
			color: #6848c2;
			font-family: PingFang-SC-Bold;
			margin-bottom: 38px;
				height: 16px;
				line-height: 35px;
				letter-spacing: 1px;
				color: #6848c2;
		}
		.login-input{
			display: flex;
			justify-content: flex-start;
			align-items: center;
		    width: 278px;
				height: 36px;
				background-color: #ffffff;
				border: solid 2px #e5e5e5;
			margin-bottom: 30px;
			//flex: 1;
			span{
				margin-left: 16px;
				img{
					padding-top: 4px;
					width: 14px;
					height: 15px;
				}
			}
			
			input{
				margin-left: 10px;
				display: flex;
				align-items: center;
				border: none;
				background: none;
				//font-size: 10px;
			
				//height: 15px;
			}
		}
	    .login-check{
			margin-bottom: 23px;
		}
		button{
			width: 277px;
			height: 40px;
			background-color: #5945c8;
			border: none;
			margin-bottom: 17px;
			span{
				width: 36px;
					height: 17px;
					font-family: PingFang-SC-Bold;
					font-size: 18px;
					font-weight: normal;
					font-stretch: normal;
					line-height: 35px;
					letter-spacing: 1px;
					color: #ffffff;
			}
		}
		.login-res{
			//width: 106px;
				height: 10px;
				font-family: PingFang-SC-Bold;
				font-size: 10px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 35px;
				letter-spacing: 1px;
				color: #727272;
				font-weight: 550;
				i{
					color: #5945c8;
				}
		}
	}
	}
</style>
