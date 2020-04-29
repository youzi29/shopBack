<template>
	<div class="add">
		<div class="addname">
			<label>真实姓名：</label>
			<input placeholder="请输入真实姓名" v-model="realname">
		</div>
		<div class="addname">
			<label>登录账号：</label>
			<input placeholder="请输入登录账号" v-model="username">
		</div>
		<div class="addname">
			<label>手机号码：</label>
			<input placeholder="请输入手机号码" v-model="mobile">
		</div>
		<div class="addname">
			<label>登录密码：</label>
			<input placeholder="请输入登录密码" v-model="password" type="password">
		</div>
		
		<div class="addname">
			<label>店铺名称：</label>
			<div class="select">
				<el-select v-model="shop" placeholder="请选择" @change="handle">
				   <el-option
				     v-for="item in shops"
				     :key="item.id"
				     :label="item.name"
				     :value="item.id">
				   </el-option>
				 </el-select>
			</div>
		</div>
		<div class="addname">
			<label>所在地区：</label>
			<div class="select1">
				<el-select v-model="provincename" placeholder="请选择" @change="handle1">
				   <el-option
				     v-for="item in provinces"
				     :key="item.id"
				     :label="item.name"
				     :value="item.id">
				   </el-option>
				 </el-select>
				 <el-select v-model="cityname" placeholder="请选择"  @change="handle2">
				    <el-option
				      v-for="item in cities"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
			</div>
		</div>
		 <div class="addname">
			<label>系统角色：</label>
			<div class="select2">
				<el-select v-model="role" placeholder="请选择" @change="handle3">
				   <el-option
				     v-for="item in roles"
				     :key="item.id"
				     :label="item.name"
				     :value="item.id">
				   </el-option>
				 </el-select>
			</div> 
		</div> 
		
		<div class="namebtn">
		<button class="addbtn" @click="submit()"><span>提交</span></button>
		</div>
	</div>
</template>

<script>
	import {
		shop , add6 , manage , role
	} from '@/api/index.js'
	export default {
		name: 'add',
		mounted() {
			this.tokendata()
			this.provicelist()
			this.tokenrole()
		},
		data() {
			return{
				shops:'',//店铺列表
				shop:'',//店铺名称
				shopid:'',//店铺id
				
				provinces:'',//省份列表
				provincename:'',
				provinceid:'',//省份id
				cities:'',
				cityname:'',
				cityid:'',
				
				role:'',//角色名字
				roles:'',//角色列表
				roleid:'',
								
				realname:'',
				password:'',
				mobile:'',
				username:''
				
			}

		},
		methods:{
			handle1(val) { //选着省 份
				let obj = {};
				obj = this.provinces.find((item) => {
					return item.id === val;
				});
				this.provinceid = obj.id
				let data = {
					status: 'city',
					province: this.provinceid
				}
				add6(data).then(res => {
					//console.log(res)
					this.cities = res.data.data;
					this.cityname = "请选择"
					//console.log(this.options1)
				}).catch(err => {
					console.log(err);
				});
			},
			handle2(val) { //选着城市
				let obj = {};
				obj = this.cities.find((item) => {
					return item.id === val;
				});
				this.cityid = obj.id
			},
			provicelist(){
				let data = {
					status: 'province'
				}
				add6(data).then(res => {
					if (res.data.msg == 'success') {
						this.provinces = res.data.data
						console.log(this.provinces)
					} else {
						console.log(res.data.msg)
					}
				
				}).catch(err => {
					console.log(err);
				});
			},
			handle(val) { //选着店铺名称
				let obj = {};
				obj = this.shops.find((item) => {
					return item.id === val;
				});
				this.shopid = obj.id
			},
			tokendata() {//获取店铺列表
				let data = {
					status: 'select'
				}
				shop(data).then(res => {
					if (res.data.msg == 'success') {
						this.shops = res.data.data
						console.log(res)
					} else {
						console.log(res.data.msg)
					}
			
				}).catch(err => {
					console.log(err);
				});
			},
			tokenrole() {//获取角色列表
				let data = {
					status: 'search'
				}
				role(data).then(res => {
					if (res.data.msg == 'success') {
						this.roles = res.data.data
						console.log(res)
					} else {
						console.log(res.data.msg)
					}
			
				}).catch(err => {
					console.log(err);
				});
			},
			handle3(val) { //获取角色id
				let obj = {};
				obj = this.roles.find((item) => {
					return item.id === val;
				});
				this.roleid = obj.id
			},
			submit(){
				if(this.realname== ''){
					this.$message({
						message: '请输入真实姓名',
						type: 'error'
					});
					return;
				}
				if(this.username == ''){
					this.$message({
						message: '请输入登录账号',
						type: 'error'
					});
					return;
				}
				if(this.mobile== ''){
					this.$message({
						message: '请输入手机号码',
						type: 'error'
					});
					return;
				}
				if(this.password== ''){
					this.$message({
						message: '请输入密码',
						type: 'error'
					});
					return;
				}
				if(this.shopid== ''){
					this.$message({
						message: '请选择店铺',
						type: 'error'
					});
					return;
				}
				if(this.cityid== ''){
					this.$message({
						message: '请选择在地区',
						type: 'error'
					});
					return;
				}
				if(this.roleid == ''){
					this.$message({
						message: '请选择角色',
						type: 'error'
					});
					return;
				}
				let data={
					status:'add',
					username: this.username,
					mobile: this.mobile,
					password: this.password,
					realname: this.realname,
					shop: this.shopid,
					role: this.roleid,
					province: this.provinceid,
					city: this.cityid
				}
				manage(data).then(res => {
					let msg=res.data.msgText
					if (res.data.msg == 'success') {
						this.$message({
							message: '账号添加成功',
							type: 'success'
						});
						this.username = ''
						this.mobile = ''
						this.password = ''
						this.realname = ''
						this.shop = ''
						this.provincename = ''
						this.cityname = ''
						this.role = ''
						
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
		margin-top: 30px;
		.addname{
			display: flex;
			justify-content: center;
			align-items: center;
			//margin-top: 100px;
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
			.select{
				width: 400px;
			/deep/ .el-input__inner{
					width: 400px !important;
				}
			}
			.select1{
				width: 400px;
			/deep/ .el-input__inner{
					width: 200px !important;
				}
			}
			.select2{
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
