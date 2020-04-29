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
					<div>店铺ID</div>
					<div>店铺名称</div>
					<div>操作</div>
				</div>
				<div class="dataheader a" v-for="(item , index) in shoplist">
					<div>{{item.id}}</div>
					<div>{{item.name}}</div>
					<div><em class="el-icon-edit" @click="edit(item.id , item.name)"></em>
						<span class="el-icon-delete" @click="detele(item.id)"></span></div>
				</div>
			</div>
		</div>
		<el-dialog title="修改店铺信息" :visible.sync="dialogVisible1" width="30%">
			<div class="addsize">
				<label>店铺名称：</label><input :placeholder='oldname' v-model="name" />
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
		shop
	} from '@/api/index.js'
	export default {
		mounted() {
			this.tokendata()
		},
		data() {
			return {
				shoplist:'',
				name:'',
				dialogVisible1: false,
				shopid:'',
				oldname:'',
				
				shop:'',//店铺名称
				shops:''
				
			}
		},
		methods: {
			search(val){
				let obj = {};
				obj = this.shops.find((item) => {
					return item.id === val;
				});
				this.shopid = obj.name
				let data = {
					status: 'select',
					name: this.shopid
				}
				shop(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.shoplist = res.data.data
					} else {
						this.$message({
						  type: 'error',
						  message: msg
						});
						
					}
				
				}).catch(err => {
					console.log(err);
				});
			},
			tokendata() {
				let data = {
					status: 'select'
				}
				shop(data).then(res => {
					if (res.data.msg == 'success') {
						this.shoplist = res.data.data
						this.shops = res.data.data
						//console.log(res)
					} else {
						console.log(res.data.msg)
					}

				}).catch(err => {
					console.log(err);
				});
			},
			edit(id , name){
				this.dialogVisible1 = true
				this.shopid = id
				this.oldname = name
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
							shop(data).then(res => {
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
			handleClose1(){
				let data = {
					status: 'update',
					id: this.shopid,
					name:this.name
				}
				shop(data).then(res => {
					let msg =res.data.msgText
					if (res.data.msg == 'success') {
						this.$message({
							message: '店铺信息修改成功',
							type: 'success'
						});
						this.dialogVisible1 = false
						this.tokendata()
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
		background: #fff
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
			//width: 60%;
			padding-left: 10px;
		}

		/deep/ .el-input__inner {
			height: 35px;

		}
	}
</style>
