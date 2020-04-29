<template>
	<div id="role">
		<div class="content">
			<div class="content-add">
				<el-button type="primary" @click="dialogVisible = true" class="btn">添加角色</el-button>
			</div>

			<el-dialog title="添加角色" :visible.sync="dialogVisible" width="30%" >
				<span>
					<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
						<el-form-item label="角色名称">
							<el-input v-model="formLabelAlign.name"></el-input>
						</el-form-item>
					</el-form>
					<div style="margin: auto 3%;">
						<div>模块</div>
						<el-tree :data="data" show-checkbox node-key="id" ref="tree" 
						 :props="defaultProps">
						</el-tree>
					</div>
				</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="submit">确 定</el-button>
				</span>
			</el-dialog>
			<template><!--角色列表-->
				<el-table :data="tableData">
					<el-table-column fixed prop="id" label="角色id" width="100">
					</el-table-column>
					<el-table-column prop="name" label="角色名称" width="280">
					</el-table-column>
					<el-table-column prop="sort" label="排序" width="420" align="right">
						<template slot-scope="scope">
							<el-button size="mini">升序</el-button>
							<el-button size="mini">降序</el-button>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="420" align="right">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<el-dialog title="编辑角色" :visible.sync="dialogVisible1" width="30%">
				<span>
					<el-form :label-position="labelPosition1" label-width="80px" :model="formLabelAlign1">
						<el-form-item label="角色名称">
							<el-input v-model="formLabelAlign1.name"></el-input>
						</el-form-item>
					</el-form>
					<div style="margin: auto 3%;">
						<div>模块</div>
						<el-tree :data="data" show-checkbox node-key="id" ref="tree1" :default-expanded-keys = "current"
						 :default-checked-keys="current" :props="defaultProps">
						</el-tree>
					</div>
				</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible1 = false">取 消</el-button>
					<el-button type="primary" @click="submit1">确 定</el-button>
				</span>
			</el-dialog>

		</div>
	</div>
</template>

<script>
	import {
		role , add3
	} from '@/api/index.js'
	export default {
		mounted() {
			this.takendata()
			this.takenm()
		},
		data() {
			return {
				show: false,
				isIndeterminate: true,
				labelPosition: 'right',
				formLabelAlign: {
					name: '',
				},
				dialogVisible: false,
				
				labelPosition1: 'right',
				formLabelAlign1: {name: ''},
				dialogVisible1: false,
				current:[],
				mid:'',//角色的id
				
				data: [{
					id: 2,
					name: '商铺管理员',
					children: [
						{
							id: 5,
							name: '未付款订单列表',
						},{
							id:6,
							name: '已上架商品列表'
						}
					]
				},{
					id: 3,
					name: '商铺管理员',
					children: [
						{
							id: 7,
							name: '未付款订单列表',
						},{
							id:8,
							name: '已上架商品列表'
						}
					]
				},
				],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				tableData: [{
						"id": 2,
						"name": "测试角色",
						"sort": 1
					},
					{
						"id": 3,
						"name": "测试",
						"sort": 2
					}
				]
			}
		},
		methods: {
			takenm(){//获取模块列表
				let data = {
					status: 'search'
				}
				add3(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.data = res.data.data
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
			takendata(){//角色列表
				let data = {
					status: 'search',
				}
				role(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.tableData = res.data.data
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
			submit() { //确定添加角色
				//this.takenm()
				/*var permits = this.$refs.tree.getCheckedNodes()
				var permit = []
				var len = permits.length
				for (let i = 0; i < len; i++) {
					permit.push(permits[i].id)
				}
				var string = permit.join(',')*/
				//console.log( this.$refs.tree.getHalfCheckedKeys());
				var permits = this.$refs.tree.getCheckedKeys();
				var half = this.$refs.tree.getHalfCheckedKeys();
				var len = half.length
				for (let i = 0; i < len; i++) {
					permits.push( half[i])
				}
				var string = permits.sort().join(',')
				console.log(string);
				let data = {
					status: 'add',
					name: this.formLabelAlign.name,
					permit: string
				}
				
				if(this.formLabelAlign.name == ''){
					this.$message({
						message: '请填写角色名称',
						type: 'error'
					});
					return;
				}
				if(string == ''){
					this.$message({
						message: '请选择权限',
						type: 'error'
					});
					return;
				}
				
				role(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.$message({
							message: '添加成功',
							type: 'success'
						});
						this.takendata()
						this.dialogVisible = false
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
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
						this.current = []
						this.data = []
					})
					.catch(_ => {});
			},
			handleEdit(index, row) {//编辑
				//console.log(index, row);
				this.takenm()
				this.mid = row.id
				this.dialogVisible1 = true
				this.formLabelAlign1.name = row.name
				let data={
					status: 'searchOne',
					id: this.mid
				}
				var list1= []
				this.current = []
				role(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						var list = res.data.data.moudle
						for(let i = 0 ; i< list.length ; i++){
							list1.push(list[i].id)
							this.current = list1
						}
						//this.current.push(this.mid)
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
			submit1() { //提交编辑
				var permits = this.$refs.tree1.getCheckedKeys();
				var half = this.$refs.tree1.getHalfCheckedKeys();
				var len = half.length
				for (let i = 0; i < len; i++) {
					permits.push( half[i])
				}
				var string = permits.sort().join(',')
				console.log(string);
				
				
				let data = {
					status: 'edit',
					id: this.mid,
					name: this.formLabelAlign1.name,
					permit: string
				}
				if(this.formLabelAlign1.name == ''){
					this.$message({
						message: '请填写角色名称',
						type: 'error'
					});
					return;
				}
				if(string == ''){
					this.$message({
						message: '请选择权限',
						type: 'error'
					});
					return;
				}
				
				role(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.$message({
							message: '修改成功',
							type: 'success'
						});
						this.takendata()
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
			handleDelete(index, row) {//删除
				console.log(index, row);
				this.mid = row.id
				let data = {
					status: 'delete',
					id: this.mid,
				}
				console.log(data);
				  this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							role(data).then(res => {
								let msg = res.data.msgText
								if (res.data.msg == 'success') {
									this.$message({
										message: '删除成功',
										type: 'success'
									});
									this.takendata()
								} else {
									this.$message({
										message: msg,
										type: 'error'
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.el-table::before {
		width: auto !important
	}

	#role {
		width: 100%;
		height: auto;

		.content {
			width: 80%;
			margin: 15px auto;
			overflow-y: auto;

			.content-add {
				margin-bottom: 10px;

				.btn {
					height: 35px !important;
					display: flex !important;
					align-items: center !important;
					padding-top: 0 !important;
					padding-bottom: 0 !important;
				}
			}
		}
	}
</style>

