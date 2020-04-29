<template>
	<div class="address">
		
		<div class="goodssize">
			<div class="search">
				<div>
					<i class="el-icon-search"></i>
					<el-select v-model="shop" placeholder="按店铺名称查询" @change="search">
					   <el-option
					     v-for="item in shops"
					     :key="item.id"
					     :label="item.name"
					     :value="item.id">
					   </el-option>
					 </el-select>
					<!-- <input placeholder="商品名称" @keyup.enter="search()" v-model="pname" /> -->
				</div>
			</div>
			<div class="goodsdata">
				<div class="dataheader">
					<div>账号ID</div> 
					<div>真实姓名</div>
					<div>登录账号</div>
					<div>手机号</div>
					<div>店铺名</div>
					<div>操作</div>
				</div>
				<div class="dataheader a" v-for="(item , index) in accountlist">
					<div>{{item.id}}</div>
					<div>{{item.realname}}</div>
					<div>{{item.username}}</div>					
					<div>{{item.mobile}}</div>
					<div>{{item.shopname}}</div>
					<div><em class="el-icon-edit" @click="edit(item.id )"></em>
						<span class="el-icon-delete" @click="detele(item.id)"></span></div>
				</div>
			</div>
			<div class="fenye" v-if="totalpage/12 > 1">
				<el-pagination background :page-size="12" layout="prev, pager, next" :total="totalpage" @current-change="change"
				 @prev-click="change" @next-click="change">
				</el-pagination>
			</div>
		</div>
		<el-dialog title="修改账号信息" :visible.sync="dialogVisible1" width="30%">
			<div class="addsize">
				<label>真实姓名：</label><input placeholder="请输入真实姓名" v-model="realname" />
			</div>
			<div class="addsize">
				<label>登录账号：</label><input placeholder="请输入登录账号" v-model="username" />
			</div>
			<div class="addsize">
				<label>手机号码：</label><input placeholder="请输入手机号码" v-model="mobile" />
			</div>
			<div class="addsize">
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
			<div class="addsize">
				<label>所在地区：</label>
				<div class='select1'>
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
			 <div class="addsize">
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
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="handleClose1">提交</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		 shop ,
		 manage,
		 add6 ,
		 role
	} from '@/api/index.js'
	export default {
		mounted() {
			this.tokendata()
			this.provicelist()
			this.shoplist()
			this.tokenrole()
		},
		data() {
			return {
				currentpage: 1,
				totalpage: 1, //总页数
				
				accountlist:'',
				name:'',
				dialogVisible1: false,
				accountid:'',
				account:'',//账号详情
				
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
		methods: {
			change(val) { //分页
				this.currentpage = val;
				console.log(this.currentpage);
				let data = {
					status: 'select',
					page: this.currentpage
				}
				manage(data).then(res => {
					if (res.data.msg == "success") {
						this.accountlist = res.data.data.reverse();
						//this.totalpage = this.goodslist.length
					}
					console.log(res)
				}).catch(err => {
					console.log(err);
				});
			},
			search(val){//按店铺名字搜索
				let obj = {};
				obj = this.shops.find((item) => {
					return item.id === val;
				});
				this.shopid = obj.id
				let data = {
					status: 'select',
					shopid: this.shopid
				}
				manage(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.accountlist = res.data.data.reverse();
					} else {
						this.$message({
						  type: 'error',
						  message: msg
						});
						this.shop = ''
					}
				
				}).catch(err => {
					console.log(err);
				});
			},
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
						//console.log(this.provinces)
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
			shoplist() {//获取店铺列表
				let data = {
					status: 'select'
				}
				shop(data).then(res => {
					if (res.data.msg == 'success') {
						this.shops = res.data.data
						//console.log(res)
					} else {
						console.log(res.data.msg)
					}
			
				}).catch(err => {
					console.log(err);
				});
			},
			tokendata() {//账号列表
				let data = {
					status: 'select'
				}
				manage(data).then(res => {
					if (res.data.msg == 'success') {
						this.accountlist = res.data.data.reverse();
						this.totalpage = res.data.sumnum
						//console.log(res)
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
			edit(id ){
				this.dialogVisible1 = true
				this.accountid = id
				let data = {
					status: 'searchOne',
					id: id
				}
				manage(data).then(res => {
					if (res.data.msg == 'success') {
						this.account= res.data.data;
						this.realname = this.account.realname
						this.username = this.account.username
						this.mobile = this.account.mobile
						// this.password = ''
						this.shop = this.account.shopname
						this.provincename =this.account.province
						this.cityname =this.account.city
						this.role = this.account.role
						console.log(this.account)
					} else {
						console.log(res.data.msg)
					}
				
				}).catch(err => {
					console.log(err);
				});
				
			},
			detele(id){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							let data={
								status: 'delete',
								id : id
							}
							manage(data).then(res => {
								let msg = res.data.msgText
								if (res.data.msg == 'success') {
									this.$message({
									  type: 'success',
									  message: '删除成功!'
									});
									this.tokendata()
								} else {
									this.$message({
									  type: 'error',
									  message: msg
									});
								}
							}).catch(err => {
								console.log(err);
							});
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          });          
				        });
			},
			handle3(val) { //获取角色id
				let obj = {};
				obj = this.roles.find((item) => {
					return item.id === val;
				});
				this.roleid = obj.id
			},
			handleClose1(){
				let data={
					status:'update',
					id: this.accountid,
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
							message: '账号信息修改成功',
							type: 'success'
						});
						this.dialogVisible1 = false
						this.tokendata()
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
	.address {
		//position:absolute;
		width: 100%;
		height: 100%;
		//top: 0;
		z-index: 99999;
		background: #fff;
		
	}

	.goodssize {
		width: 100%;
		//height: 190px;
		//border: #000000 solid 1px;
		padding: 15px;
		.search {
			width: 85%;
			margin: 0 auto;
			margin-bottom: 10px;
			div{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				//width: 30.77%;
				height: 30px;
				background-color: #ffffff;
				//border: solid 1px #dcdcdc;
				padding-left: 5px;
				i {
					color: #5945c8;
					font-size: 20px;
						
				}
				/deep/ .el-input__inner{
						width:280px !important;
						height: 30px;
					}
				/deep/ .el-input__icon{
					height: 30px;
					line-height: 30px;
				}
						
				
			}
			
			
		
			
		}

		.goodsdata {
			margin: 0 auto;
			width: 85%;
			height: 100%;
			border: solid 1.5px #dcdcdc;

			.dataheader {
				width: 100%;
				display: flex;
				font-size: 15px;
				//padding: 5px 0;
				color: #4d4d4d;
				justify-content: space-around;

				div {
					width: 16.6%;
					text-align: center;
					padding: 5px 0;
					cursor: pointer;

					//display: flex;
					.defaut {
						font-size: 14px;
						color: #ff000094;
						width: 20%;
						display: flex;
						display: inline-block;
						background: #cd5c5c59;
					}

					span {
						color: red;
						font-size: 20px;
						//margin-left: 10%;
						display: inline-block;
						width: 23%;
						//border: #000000 solid 1px;
					}

					em {
						color: #646566;
						width: 23%;
						font-size: 20px;
						display: inline-block;
						//border: #000000 solid 1px;
					}
				}

				i {
					display: flex;

					width: 100%;
					justify-content: center;
					font-size: 30px;
					color: #00CC66;
					padding: 5px 0;
					//background: #00A854;
				}
			}

			.a {
				border-top: solid 1px #dcdcdc;
			}
		}
		.fenye {
			padding: 20px 0;
			text-align: center;
		
			/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
				background-color: #5945c8;
			}
		
			/deep/ .el-pager li:hover {
				color: #5945c8;
			}
		}
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
			width: 28%;
			//border: #000000 solid 1px;
		}

		input {
			height: 30px;
			width: 60%;
			padding-left: 10px;
		}
		.select{
			width: 60%;
			text-align: left;
		/deep/ .el-input__inner{
				width:280px !important;
			}
		}
		.select1{
			width: 60%;
			text-align: left;
			display: flex;
		/deep/ .el-input__inner{
				width:140px !important;
			}
		}
		.select2{
			width: 60%;
			text-align: left;
			
		/deep/ .el-input__inner{
				width:140px !important;
			}
		}

		/deep/ .el-input__inner {
			height: 35px;

		}
	}
</style>
