<template>
	<div class="add">
		<div class="addname">
			<label>店铺名称：</label>
			<input placeholder="请输入店铺名称" v-model="name">
		</div>
		<div class="namebtn">
		<button class="addbtn" @click="submit()"><span>提交</span></button>
		</div>
	</div>
</template>

<script>
	import {
		shop
	} from '@/api/index.js'
	export default {
		name: 'add',
		
		data() {
			return{
				name:''
			}

		},
		methods:{
			submit(){
				let data={
					status:'add',
					name: this.name
				}
				shop(data).then(res => {
					let msg=res.data.msgText
					if (res.data.msg == 'success') {
						this.$message({
							message: '添加店铺成功',
							type: 'success'
						});
						this.name = ''
						
					} else {
						this.$message({
							message: msg,
							type: 'error'
						});
					}
				
				}).catch(err => {
					console.log(err);
				});
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.add{
		.addname{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 100px;
			margin-bottom: 20px;
			label{
				font-size: 18px;
				letter-spacing: 1px;
				color: #4d4d4d;
			}
			input{
				height: 40px;
				border: solid 1.5px #dcdcdc;
				padding-left: 6px;
				width: 400px;
			}
		}
		.namebtn{
			display: flex;
			justify-content: center;
			.addbtn{
				width: 10%;
				height: 40px;
				background-color: #5945c8;
				border: none;
				span {
					width: 37px;
					height: 18px;
					font-family: PingFang-SC-Heavy;
					font-size: 18px;
				
					letter-spacing: 4px;
					color: #ffffff;
				}
			}
		}
		
	}
</style>
