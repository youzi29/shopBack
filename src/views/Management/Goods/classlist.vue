<template>
	<!--商品分类添加列表-->

	<div class="add">
		<!-- <div class="header">
			<h3>商品分类列表</h3>
		</div> -->
		<div class="content">
			<div class="list">
				<div class="list-header">
					<div class="one"><i>&nbsp;</i>ID</div>
					<div>标题</div>
					<div>上级分类</div>
					<div>操作管理</div>
				</div>

				<div class="list-data" v-for="(item , index) in classllist" :key="item.id">
					<div class="list-one">
						<div class="one"><i :class="[currentIndex == index? 'el-icon-arrow-down': 'el-icon-arrow-right']" @click="select(item.id , index)"></i>{{item.id}}</div>
						<div>{{item.name}}</div>
						<div>{{item.parent}}</div>
						<div>
							<button @click="edit(item.id , index , 1)">编辑</button>
							<button @click="detele(item.id ,index,  1)" style="color: #fff;background-color: #f56c6c;border-color: #f56c6c;">删除</button>
						</div>
					</div>
					<el-collapse-transition>
						<div class="list-data1" v-if="currentIndex == index ">
							<div v-for="(item1 , index1) in classllist1" :key="item1.id">
								<div class="list-one1">
									<div class="two"><i :class="[currentIndex1 == index1? 'el-icon-arrow-down': 'el-icon-arrow-right']" @click="select1(item1.id , index1)"></i>{{item1.id}}</div>
									<div>{{item1.name}}</div>
									<div>{{item1.parent}}</div>
									<div>
										<button @click="edit(item1.id , index , 2)">编辑</button>
										<button @click="detele(item1.id ,index , 2)" style="color: #fff;background-color: #f56c6c;border-color: #f56c6c;">删除</button>
									</div>
								</div>
								<el-collapse-transition>
									<div class="list-data2" v-if="currentIndex1 == index1">
										<div class="list-one2" v-for="(item2 , index2) in classllist2" :key="item2.id">
											<div class="three" v-text="item2.id">{{item2.id}}</div>
											<div v-text="item2.name">{{item2.name}}</div>
											<div v-text="item2.parent">{{item2.parent}}</div>
											<div>
												<button @click="edit(item2.id , index ,3)">编辑</button>
												<button @click="detele(item2.id ,index ,3)" style="color: #fff;background-color: #f56c6c;border-color: #f56c6c;">删除</button>
											</div>
										</div>
									</div>
								</el-collapse-transition>
							</div>
						</div>
					</el-collapse-transition>
				</div>
			</div>
		</div>
		<div class="pop" v-if="show">
			<ClassModify :id="goodsid" @childevent="change"></ClassModify>
		</div>
		<!-- <ClassModify v-if="show" :id = "goodsid" @childevent="change()"></ClassModify> -->
	</div>
</template>

<script>
	import {
		add1,
		add2
	} from '@/api/index.js'
	import ClassModify from "./classmodify.vue"
	export default {
		name: 'classadd',
		components: {
			ClassModify
		},
		mounted() {
			this.tokedata();

		},
		data() {
			return {
				//classllist: [], //一级分类
				classllist: [{
						id: 16,
						name: "浣洗自营",
						parent: "无",
						img: ""
					},
					{
						id: 17,
						name: "品牌服饰",
						parent: "无",
						img: ""
					},
					{
						id: 18,
						name: "高端定制",
						parent: "无",
						img: ""
					},
					{
						id: 30,
						name: "本地生活",
						parent: "无",
						img: ""
					},
					{
						id: 31,
						name: "浣洗奢品",
						parent: "无",
						img: ""
					}
				],
				//classllist1: [], //二级分类
				classllist1: [{
						id: 47,
						name: "浣洗生活",
						parent: "浣洗自营"
					},
					{
						id: 48,
						name: "浣洗职业装",
						parent: "浣洗自营"
					},
				],

				parent1: '',
				//classllist2: [], //三级分类
				classllist2: [{
						id: 19,
						name: "生活用品",
						parent: "浣洗生活",
					},
					{
						id: 54,
						name: "小家电",
						parent: "浣洗生活",
					},
					{
						id: 55,
						name: "消毒清洁用品",
						parent: "浣洗生活",
					},
					{
						id: 56,
						name: "面巾",
						parent: "浣洗生活",
					}
				],

				parent2: '',
				currentIndex: null,
				currentIndex1: null,
				show: false,
				//show:this.$store.state.show,
				goodsid: '',
				index0: '',
				index1: '',
				index2: '',
				classone0: '',
				id1: '',
				id2: '',
				indextag: ''
			}
		},
		methods: {
			tokedata() {
				let data = {
					status: 'searchFirst'
				}
				add2(data).then(res => {
					if (res.data.msg == 'success') {
						this.classllist = res.data.data;
					}

				}).catch(err => {
					console.log(err);
				});
			},
			change(val) {

				if (this.classone0 == 1) {
					this.show = false
					let data = {
						status: 'searchFirst',
					}
					add2(data).then(res => {
						if (res.data.msg == 'success') {
							this.classllist = res.data.data;
							this.show = false
						}

					}).catch(err => {
						console.log(err);
					});
				}
				if (this.classone0 == 2) {

					this.currentIndex == this.index0
					let data = {
						status: 'searchOther',
						id: this.id1
					}
					add2(data).then(res => {
						if (res.data.msg == "success") {
							this.show = false
							this.classllist1 = res.data.data;
							this.parent1 = this.classllist1.parent;
						}

					}).catch(err => {
						console.log(err);
					});
				}

				if (this.classone0 == 3) {
					this.currentIndex1 = this.indextag;
					//this.currentIndex1 = this.index1;

					let data = {
						status: 'searchOther',
						id: this.id2
					}
					add2(data).then(res => {
						if (res.data.msg == 'success') {
							this.show = false
							this.classllist2 = res.data.data;
						}

					}).catch(err => {
						console.log(err);
					});
				}





			},
			edit(id, index, classone) { //编辑

				this.goodsid = id;
				this.show = true
				this.index0 = index
				this.classone0 = classone
				if (classone == 2) {
					this.index1 = index
				}
				if (classone == 1) {
					this.index2 = index
				}


			},
			detele(id, index, classone) { //删除
				let data = {
					status: 'delete',
					id: id
				}
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					add2(data).then(res => {

						if (res.data.msg == "success") {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});


							if (classone == 1) {

								let data = {
									status: 'searchFirst'
								}
								add2(data).then(res => {
									if (res.data.msg == 'success') {
										this.classllist = res.data.data;
										this.show = false
									}

								}).catch(err => {
									console.log(err);
								});
							}
							if (classone == 2) {
								this.currentIndex == index
								let data = {
									status: 'searchOther',
									id: id
								}
								add2(data).then(res => {
									this.classllist1 = res.data.data;
									this.parent1 = this.classllist1.parent;
								}).catch(err => {
									console.log(err);
								});
							}

							if (classone == 3) {
								this.currentIndex1 = index;

								let data = {
									status: 'searchOther',
									id: id
								}
								add2(data).then(res => {
									this.classllist2 = res.data.data;
								}).catch(err => {
									console.log(err);
								});
							}

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
				this.tokedata();


			},

			select(id, index) { //一级箭头向下展开
				this.id1 = id;
				this.classllist1 = '';
				this.classllist2 = '';
				this.parent1 = '';
				if (this.currentIndex == index) {
					this.currentIndex = null;
				} else {
					this.currentIndex = index;
				}
				let data = {
					status: 'searchOther',
					id: id
				}
				add2(data).then(res => {
					if (res.data.msg == 'success') {
						this.classllist1 = res.data.data;
						this.parent1 = this.classllist1.parent;
					}
				}).catch(err => {
					console.log(err);
				});

			},
			select1(id, index) { //二级箭头向下展开
				this.id2 = id;
				this.indextag = index;
				this.classllist2 = '';
				if (this.currentIndex1 == index) {
					this.currentIndex1 = null;
				} else {
					this.currentIndex1 = index;
				}
				let data = {
					status: 'searchOther',
					id: id
				}
				add2(data).then(res => {
					if (res.data.msg == 'success') {
						this.classllist2 = res.data.data;
					}

				}).catch(err => {
					console.log(err);
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
	/*.list-enter,
	     .list-leave-to {
	       opacity: 0;
	     transform: translateY(10px);
	     }
	 ​
	     .list-enter-active,
	     .list-leave-active {
	       transition: all 0.3s ease;
	     }*/
	.add {
		width: 100%;
		height: 100%;
		// margin-top: 70px;
		// margin-left: 210px;

		.header {
			position: fixed;
			top: 0;
			z-index: 900;
			width: 100%;
			height: 45px;
			background-color: #5945c8;
			border-radius: 0px 0px 33px 33px;
			display: flex;
			justify-content: center;
			align-items: center;

			h3 {

				font-family: PingFang-SC-Heavy;
				font-size: 20px;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 1px;
				color: #ffffff;
			}

		}

		.content {
			//margin-top: 70px;
			padding: 0 4.8%;

			.list {
				margin-top: 100px;
				width: 100%;
				padding-bottom: 50px;
				// background-image: linear-gradient(0deg,
				// 	#5945c8 0%,
				// 	#9944c7 100%),
				// 	linear-gradient(#f58029,
				// 	#f58029);
				border: #ebebeb solid 1.5px;
				border-radius: 5px;

				.list-header {
					display: flex;
					justify-content: space-around;
					padding-top: 30px;
					padding-bottom: 10px;
					color: #909399;
					font-weight: 600;

					div {
						width: 15.5%;
						text-align: center;
						//color: rgba(255, 255, 255, 0.7);
						font-size: 24px;
						font-family: PingFang-SC-Bold;


					}

					.one {
						width: 15%;
						align-items: center;
						justify-content: center;


						i {
							margin-right: 20px;
						}
					}
				}


				.list-data {
					.list-one {

						display: flex;
						justify-content: space-around;
						align-items: center;
						height: 60px;
						border-top: #ebebeb solid 1px;
						width: 100%;
						flex-wrap: wrap;

						div {
							width: 15.5%;
							text-align: center;
							//color: rgba(255, 255, 255, 0.7);
							color: #606266;
							font-size: 22px;
							font-family: PingFang-SC-Bold;

							button {
								font-size: 20px;
								background: none;
								//padding: 0 15px;
								border: none;
								//height: auto;
								//background: linear-gradient(45deg, #d3959b 20%, #bfe6ba);
								margin-right: 5px;
								margin-left: 5px;
								//display: inline-block;
								line-height: 1;
								white-space: nowrap;
								cursor: pointer;
								background: #fff;
								border: 1px solid #dcdfe6;
								color: #606266;
								border-radius: 3px;
								height: 40px;
								width: 90px;

							}
						}

						.one {
							width: 15%;
							align-items: center;
							justify-content: center;

							i {
								margin-right: 20px;
							}

						}

					}

					.list-data1 {
						.list-one1 {
							//border: #000000 solid 1px;

							display: flex;
							justify-content: space-around;
							align-items: center;
							height: 60px;
							border-top: #ebebeb solid 1px;
							width: 100%;
							flex-wrap: wrap;

							div {
								//border: #000000 solid 1px;
								width: 15.5%;
								text-align: center;
								//color: rgba(255, 255, 255, 0.7);
								font-size: 21px;
								font-family: PingFang-SC-Bold;
								color: #606266;


								button {
									font-size: 20px;
									background: none;
									//padding: 0 15px;
									border: none;
									margin-right: 5px;
									margin-left: 5px;
									//display: inline-block;
									line-height: 1;
									white-space: nowrap;
									cursor: pointer;
									background: #fff;
									border: 1px solid #dcdfe6;
									color: #606266;
									border-radius: 3px;
									height: 40px;
									width: 90px;
								}
							}

							.two {
								width: 15%;
								align-items: center;
								justify-content: center;


								i {
									margin-right: 20px;
									margin-left: 30px;
								}

							}

						}

						.list-data2 {
							height: auto;

							.list-one2 {

								display: flex;
								justify-content: space-around;
								align-items: center;
								height: 60px;
								border-top: #ebebeb solid 1px;
								width: 100%;
								flex-wrap: wrap;


								div {
									width: 15.5%;
									text-align: center;
									//color: rgba(255, 255, 255, 0.7);
									font-size: 20px;
									font-family: PingFang-SC-Bold;
									color: #606266;

									button {
										font-size: 20px;
										//padding: 10px;
										//border-radius: 20px;
										//color: #fff;
										//background: rgb(45, 110, 180);
										background: none;
										//padding: 0 15px;
										border: none;
										//height: auto;
										//background: linear-gradient(45deg, #d3959b 20%, #bfe6ba);
										margin-right: 5px;
										margin-left: 5px;
										//display: inline-block;
										line-height: 1;
										white-space: nowrap;
										cursor: pointer;
										background: #fff;
										border: 1px solid #dcdfe6;
										color: #606266;
										border-radius: 3px;
										height: 40px;
										width: 90px;
									}
								}

								.three {
									width: 15%;
									align-items: center;
									justify-content: center;

									i {
										margin-left: 60px;
										display: felx;
									}

								}

							}
						}
					}
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


		}
	}
</style>
