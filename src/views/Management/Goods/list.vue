<template>
	<div class="add">

		<div class="content" style="margin-top: 20px;">
			<div class="search">
				<i class="el-icon-search" @click="search()"></i>
				<input placeholder="商品名称" @keyup.enter="search()" v-model="pname" />
			</div> 
			<div class="listone" style="margin-bottom: 20px;">
				<label>分类搜索：</label>


				<span>
					<el-select v-model="value1" placeholder="请选择" @change="handle" @focus="getdata1">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</span>




				<span v-if="options1 != '' ">
					<el-select v-model="value2" :placeholder="chose1" @change="handle1" @focus="getdata2">
						<el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</span>


				<span v-if="options2 != '' ">
					<el-select v-model="value3" :placeholder="chose2" @change="handle2">
						<el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</span>
				<!-- <i class="el-icon-search" @click="search()"></i> -->


			</div>
			<div class="list">
				<div class="list-one" v-for="(item , index) in goodslist">
					<div class="list-one-top" @click="detail(item.id)">
						<img :src="item.img" />
					</div>
					<div class="list-one-bottom">
						<div class="bottom-one a">
							<label><a>名</a><a>称：</a></label><i>{{item.title}}</i>
						</div>
						<div class="bottom-one">
							<label><a>分</a><a>类：</a></label><i>{{item.className}}</i>
						</div>
						<div class="bottom-one">
							<label><a>价</a><a>格：</a></label><i>{{item.price}}</i>
						</div>
						<div class="bottom-two">
							<span style="cursor: pointer;" @click="recomm(item.id)" v-if="item.isShow != '' && item.isShow == 1 "><img src="./image/yt.png"></span>
							<span style="cursor: pointer;" @click="recomm1(item.id)" v-if=" item.isShow === 0 "><img src="./image/wt.png"></span>
							<button  @click="edit(item.id)" style="border-radius: 9px;border: solid 1px #5ebf4d;">
								<img src="./image/edit.png"><i style="color: rgba(94,191,77,0.96);">编辑</i>
							</button>
								 <button @click="delete1(item.id)" style="background-color: #f58029;border-radius: 9px;">
									 <img src="./image/detele.png"><i style="color: #fff;">删除</i>
								</button>
						</div>
					</div>
				</div>
			</div>
			<div class="fenye" v-if="totalpage/12 > 1">
				<el-pagination background :page-size="12" layout="prev, pager, next" :total="totalpage" @current-change="change"
				 @prev-click="change" @next-click="change">
				</el-pagination>
			</div>
		</div>



		<div class="pop" v-if="show">
			<GoodsInfo :id="goodsid" @childevent="colse" />
			<!--商品详情 -->
		</div> 
		<div class="pop" v-if="show1">
			<GoodsModify :id="goodsid" @childevent="colse" />
		</div>

	</div>
</template>

<script>
	import {
		add1,
		add2
	} from '@/api/index.js'
	import GoodsInfo from "./goodsinfo.vue"
	import GoodsModify from "./goodsmodify.vue"
	export default {
		name: 'goodslist',
		components: {
			GoodsInfo,
			GoodsModify
		},
		mounted() {
			this.tokendata();
			let data = {
				status: 'searchFirst'
			}
			add2(data).then(res => {
				//console.log(res)
				this.options = res.data.data;
				//console.log(this.options)
			}).catch(err => {
				console.log(err);
			});
		},
		data() {
			return {
				show: false, //商品信息
				show1: false, //商品修改
				//show1: this.$store.state.show,
				currentpage: 1,
				goodslist: '',
				totalpage: 1, //总页数
				goodsid: '',
				goodsinfo: '', //商品信息
				goodssize: '', //商品规格

				pname: '',
				options: [],
				options1: [],
				options2: [],


				value1: [],
				value2: [],
				value3: [],
				chose1: '请选择',
				chose2: '请选择'
			}
		},
		methods: {
			getdata1() {
				this.value2 = "请选择"
				this.value3 = "请选择"

			},
			getdata2() {
				//this.options1 = ''
				this.options2 = ''
			},
			handle(val) {
				let obj = {};
				obj = this.options.find((item) => {
					return item.id === val;
				});
				let data = {
					status: 'searchOther',
					id: obj.id
				}
				add2(data).then(res => {
					console.log(res)
					this.options1 = res.data.data;
					//console.log(this.options1)
				}).catch(err => {
					console.log(err);
				});
				this.cid = obj.id;



				let data1 = {
					status: 'searchList',
					class: this.cid
				}
				//console.log(8)
				add1(data1).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.goodslist = res.data.data;
						this.totalpage = res.data.sumnum
					} else {
						this.$message({
							type: 'error',
							message: msg
						});
					}
				}).catch(err => {
					console.log(err);
				});
				//console.log(obj.id)

			},
			handle1(val) {
				let obj = {};
				obj = this.options1.find((item) => {
					return item.id === val;
				});
				let data = {
					status: 'searchOther',
					id: obj.id
				}
				add2(data).then(res => {
					if (res.data.msg == 'success') {
						this.options2 = res.data.data;
					} else {
						this.options2 = ''
					}
					console.log(res)

					//console.log(this.options2)
				}).catch(err => {
					console.log(err);
				});
				this.cid = obj.id;

				let data1 = {
					status: 'searchList',
					class: this.cid
				}
				//console.log(8)
				add1(data1).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.goodslist = res.data.data;
						this.totalpage = res.data.sumnum
					} else {
						this.$message({
							type: 'error',
							message: msg
						});
					}
				}).catch(err => {
					console.log(err);
				});

				//console.log(this.cid)

			},
			handle2(val) {
				let obj = {};
				obj = this.options2.find((item) => {
					return item.id === val;
				});
				this.cid = obj.id;

				let data1 = {
					status: 'searchList',
					class: this.cid
				}
				//console.log(8)
				add1(data1).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.goodslist = res.data.data;
						this.totalpage = res.data.sumnum
					} else {
						this.$message({
							type: 'error',
							message: msg
						});
					}
				}).catch(err => {
					console.log(err);
				});

				//console.log(this.cid)

			},
			search() { //搜索
				let data = {
					status: 'searchList',
					pname: this.pname
				}
				console.log(8)
				add1(data).then(res => {
					let msg = res.data.msgText
					if (res.data.msg == 'success') {
						this.goodslist = res.data.data;
						this.totalpage = res.data.sumnum
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
			recomm(id) { //取消推荐
				let data = {
					status: 'updateShow',
					id: id,
					isShow: 0
				}
				this.$confirm('是否确定该商品取消推荐?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',

				}).then(() => {
					add1(data).then(res => {
						let msg = res.data.msgText
						if (res.data.msg == 'success') {
							this.$message({
								type: 'success',
								message: '已取消推荐!'
							});
							this.tokendata();
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
						message: '已取消'
					});
				});
			},
			recomm1(id) { //推荐
				let data = {
					status: 'updateShow',
					id: id,
					isShow: 1
				}
				this.$confirm('将推荐该商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					add1(data).then(res => {
						let msg = res.data.msgText
						if (res.data.msg == 'success') {
							this.$message({
								type: 'success',
								message: '已为你推荐!'
							});
							this.tokendata();
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
						message: '已取消'
					});
				});
			},
			delete1(id) {

				this.$confirm('此操作将永久删除此商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						status: 'delete',
						id: id
					}
					add1(data).then(res => {
						if (res.data.msg == "success") {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							let data2 = {
								status: 'searchList',
								page: this.currentpage
							}
							add1(data2).then(res => {
								if (res.data.msg == "success") {
									this.goodslist = res.data.data;
									this.totalpage = res.data.sumnum
								}
								console.log(res)
							}).catch(err => {
								console.log(err);
							});

						} else {
							let msg = res.data.msgText
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
			tokendata() { //上架上商品列表
				let data = {
					status: 'searchList'
				}
				add1(data).then(res => {
					if (res.data.msg == "success") {
						this.goodslist = res.data.data;
						this.totalpage = res.data.sumnum
					}
					console.log(res)
				}).catch(err => {
					console.log(err);
				});
			},
			detail(id) { //商品详情
				this.show = true;
				this.goodsid = id;
				let data = {
					status: 'searchOne',
					id: id
				}
				add1(data).then(res => {
					if (res.data.msg == "success") {
						this.goodsinfo = res.data.data;
						this.goodssize = this.goodsinfo.size[0];
					}
					console.log(res)
				}).catch(err => {
					console.log(err);
				});
			},

			edit(id) { //编辑
				this.goodsid = id;
				this.show1 = true;
				//this.$store.commit('setValue1' , true)
			},
			colse(val) { //关闭商品详情
				//alert(111)
				let data = {
					status: 'searchList',
					page: this.currentpage
				}
				add1(data).then(res => {
					if (res.data.msg == "success") {
						this.goodslist = res.data.data;
						this.totalpage = res.data.sumnum
						this.show = false;
						this.show1 = false;
					}
					console.log(res)
				}).catch(err => {
					console.log(err);
				});


			},
			change(val) { //分页
				this.currentpage = val;
				console.log(this.currentpage);
				let data = {
					status: 'searchList',
					page: this.currentpage
				}
				add1(data).then(res => {
					if (res.data.msg == "success") {
						this.goodslist = res.data.data;
						//this.totalpage = this.goodslist.length
					}
					console.log(res)
				}).catch(err => {
					console.log(err);
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	.add {

		width: 100%;
		height: 100%;


		.content {
			//margin-top: 80px;
			padding: 0 4.8%;

			.search {
				display: flex;
				align-items: center;
				width: 20.77%;
				height: 36px;
				background-color: #ffffff;
				border: solid 1px #dcdcdc;
				padding-left: 5px;
				margin-bottom: 10px;

				i {
					color: #5945c8;
					font-size: 20px;

				}

				input {
					border: none;
					padding-left: 5px;
				}
			}

			.list {
				display: flex;
				flex-wrap: wrap;

				//justify-content: space-around;
				
				.list-one {
					margin-right: 1.3%;
					margin-bottom: 20px;
					width: 15%;
					background-color: #ffffff;
					box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.19);
					border-radius: 10px;
					

					.list-one-top {
						img { 
							min-width: 100%;
							max-height:180px;
							border-radius: 10px 10px 0px 0px;
						}
					}

					.list-one-bottom {
						padding-top: 10px;
						//border: #000000 solid 1px;
						margin-top: -1px;
						//width: 17%;
						padding-bottom: 10px;
						.a{
							//width: 200px;
							overflow: hidden;
							 
							white-space: nowrap;
							text-overflow: ellipsis;
						}

						.bottom-one {
							display: flex;
							align-items: center;
							font-family: PingFang-SC-Bold;
							font-size: 14px;
							padding-left: 9px;

							label {
								width: 23%;
								line-height: 30px;
								letter-spacing: 0px;
								color: #808080;
								display: flex;
								justify-content: space-between;
								
							}

							i {
								color: #333333;
								overflow: hidden;
								width: 85%;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}

						.bottom-two {
							display: flex;
							justify-content: space-around;

							margin-top: 12px;
							width: 100%;

							button {
								display: flex;
								justify-content: center;
								//padding: 2px 2px 2px 2px;
								align-items: center;
								padding: 0 10px;

								background: none;
								border: none;
								border-radius: 2px;
								font-size: 14px;
								color: #606266;
								height: 20px;

								i {
									display: inline-block;
									//padding: 0 2px 0 2px;
									margin-left: 5px;
								}
							}

							
						}

					}
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

		.pop {
			//弹出层
			position: absolute;
			top: 0;
			//z-index: 999;
			width: 100%;
			height: 100%;
			background: rgba(171, 171, 171, .3);
			display: flex;
			justify-content: center;
			align-items: center;

			.goodsinfo {
				//margin-top: 20px;
				//border-radius: 20px;
				height: 95%;
				width: 80%;
				padding-left: 15px;
				background: #fff;
				//border: #000000 solid 1px;
				display: flex;
				//justify-content: center;
				flex-wrap: wrap;

				//align-content: center;
				.close {
					width: 100%;
					margin-top: 10px;
					margin-right: 10px;
					font-size: 24px;
					display: flex;
					justify-content: flex-end;

					i {
						// border: #000000 solid 1px;
					}

				}

				.info-one {
					width: 100%;
					display: flex;
					margin-bottom: 20px;
				}
			}



		}
	}
</style>
