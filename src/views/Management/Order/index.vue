<template>
	<div class="add">
		<!-- <div class="header">
			<h3>订单列表</h3>
		</div> -->
		<div class="content">
			<div class="search">
				<!-- <div class="search-s">
					<i class="el-icon-search"></i>
					<input placeholder="搜索名称、分类" />
				</div> -->
				
			</div>
			<!--已发货-->
			<div class="list">
				<div class="list-header">
					<div class="one">编号</div>
					<!-- <div>订单号</div> -->
					<div class="one">姓名</div>
					<div>联系方式</div>
					<div class="one">下单件数</div>
					<div class="one">订单金额</div>
					<div>下单时间</div>
					<div>操作管理</div>
				</div>
				<div v-for="(item , index) in orderlist">
					<div class="list-data">
						<div class="one">{{item.id}}</div>
						<!-- <div>c123456789</div> -->
						<div class="one">{{item.name}}</div>
						<div>{{item.phone}}</div>
						<div class="one">{{item.count}}</div>
						<div class="one">{{item.price}}</div>
						<div>{{item.time}}</div>
						<div>
							<button @click="detail(item.id)">查看订单详情</button>
						</div>
					</div>
				</div>
			</div>
			<div class="fenye" v-if="totalpage/10 > 1">
				<el-pagination background :page-size="10" layout="prev, pager, next" :total="totalpage" @current-change="change"
				 @prev-click="change" @next-click="change">
				</el-pagination>
			</div>
		</div>

		<!--订单详情-->
		<div class="pop" v-if="show">
			<div class="pop-content">
				<h3><i>订单详情</i></h3>
				<div class="pop-text">
					<div class="text1">
						<label>订单编号：</label>
						<i>{{orderinfo.orderId}}</i>
					</div>
				</div>
				<div class="pop-text">
					<div class="text1">
						<label><a>收</a><a>件</a><a>人：</a></label>
						<i>{{orderinfo.sName}}</i>
					</div>
				</div>
				<div class="pop-text">
					<div class="text1">
						<label>联系方式：</label>
						<i>{{orderinfo.sMobile}}</i>
					</div>
				</div>
				<div class="pop-text">
					<div class="text1">
						<label>收件地址：</label>
						<i>{{orderinfo.sAddress}}</i>
					</div>
				</div>
				<div class="pop-text">
					<div class="text1">
						<label>下单件数：</label>
						<i>{{orderinfo.count}}</i>
					</div>
				</div>

				<div class="pop-text" style="margin-top: 10px;">
					<div class="text1">
						<label>商品规格：</label>
					</div>
				</div>
				<div class="goodsinfo" v-for="(item , index) in ordersize">
					<div class="info-left">
						<img :src="item.img">
					</div>
					<div class="info-right">
						<div class="info1" style="display: block;">
							<!-- <label style="display: inline-block;">商品名称：</label> -->
							<i style="display: inline-block;">{{item.title}}</i>
						</div>
						<div class="info1">
							<div>
								<label>商品价格：</label>
								<i>{{item.sizePrice}}</i>
							</div>
							<div>
								<label>商品尺寸：</label>
								<i>{{item.sizeName}}</i>
							</div>

						</div>
						<!-- <div class="info1">
							<label>商品尺寸：</label>
							<i>{{item.sizeName}}</i>
						</div> -->
						<div class="info1">
							<div>
								<label>商品净重：</label>
								<i>{{item.sizeWeight}}</i>
							</div>
							<div>
								<label>商品运费：</label>
								<i>{{item.sizePostprice}}</i>
							</div>

						</div>
					</div>
				</div>

				<!-- <div class="pop-text">
					<div class="text1">
						<label>预约发货时间：</label>
					    <i>{{orderinfo.sendTime}}</i>
					</div>
				</div> -->
				<template>
					<div class="pop-text">
						<div class="text1">
							<label><a>发</a><a>件</a><a>人：</a></label>
							<i>{{orderinfo.sendName}}</i>
						</div>
					</div>
					<div class="pop-text">
						<div class="text1">
							<label>发件人手机号：</a></label>
							<i>{{orderinfo.sendMobile}}</i>
						</div>
					</div>
					<div class="pop-text">
						<div class="text1">
							<label>发件地址：</a></label>
							<i>{{orderinfo.sProvince}} {{orderinfo.sendCity}} {{orderinfo.sendAddress}}</i>
						</div>
					</div>
					<div class="pop-text" v-if="orderinfo.sendTime">
						<div class="text1">
							<label class="text1-one">预约发件时间：</a></label>
							<i>{{orderinfo.sendTime}}</i>
						</div>
					</div>
					<div class="pop-text">
						<div class="text1">
							<label>快递名称：</a></label>
							<i>{{orderinfo.postName}}</i>
						</div>
					</div>
					<div class="pop-text">
						<div class="text1">
							<label>快递单号：</a></label>
							<i>{{orderinfo.postId}}</i>
						</div>
					</div>
					<div class="pop-text" style="margin-top: 10px;">
						<div class="text1">
							<label class="text1-one">物流详情：</a></label>
							<el-timeline :reverse="reverse">
								<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.time">
									{{activity.code}}-{{activity.value}}
								</el-timeline-item>
							</el-timeline>
						</div>
					</div>

				</template>
				<!-- <div class="pop-text">
					<div class="text1">
						<label class="text1-one">发货厂家：</a></label>
					    <i>
							<el-select v-model="value1" placeholder="请选择" @change="handle">
								<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</i>
					</div>
				</div>
				<div class="pop-text" style="margin-bottom: 30px;">
					<div class="text1">
						<label class="text1-one">添加时间：</a></label>
					    <i>2020.02.22 15:14:11</i>
					</div>
				</div> -->

				<div class="pop-btn">
					<!-- <button @click="order(oid)">下单</button> -->
					<button class="back" @click="cancle()">返回</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		add5
	} from '@/api/index.js'
	export default {
		mounted() {
			let data = {
				status: 'searchListA',
			}

			add5(data).then(res => {
				if (res.data.msg == 'success') {
					this.orderlist = res.data.data
					this.totalpage = res.data.sumnum
					//console.log(res)
				} else {
					console.log(res.data.msg)
				}

			}).catch(err => {
				console.log(err);
			});
		},
		data() {
			return {
				currentpage: 1,
				totalpage: 1, //总页数
				
				orderlist: '',
				orderinfo: '',
				ordersize: '',
				currentIndex: 0,
				show: false, //是否显示订单详情
				timea: '',
				oid: '', //下单id
				options: [], //发货厂家
				value1: [],

				reverse: false,
				activities: [{
					content: '活动按期开始',
					timestamp: '2018-04-15'
				}, {
					content: '通过审核',
					timestamp: '2018-04-13'
				}, {
					content: '创建成功',
					timestamp: '2018-04-11'
				}]
			}
		},
		methods: {
			change(val) { //分页
				this.currentpage = val;
				console.log(this.currentpage);
				let data = {
					status: 'searchListA',
					page: this.currentpage
				}
				add5(data).then(res => {
					if (res.data.msg == "success") {
						this.orderlist = res.data.data
						//this.totalpage = this.goodslist.length
					}
					console.log(res)
				}).catch(err => {
					console.log(err);
				});
			},
			detail(id) {
				//console.log(id)
				this.show = true;
				this.timea = id;
				this.oid = id;
				let data = {
					status: 'searchOne',
					id: id
				}
				add5(data).then(res => {
					if (res.data.msg == 'success') {
						//console.log(res)
						this.orderinfo = res.data.data;
						this.ordersize = this.orderinfo.product
						let data1 = {
							status: 'route',
							id: this.orderinfo.orderId
						}
						add5(data1).then(res => {
							if (res.data.msg == 'success') {
								console.log(res)
								this.activities = res.data.data
							} else {
								console.log(res.data.msg)
							}

						}).catch(err => {
							console.log(err);
						});
					}
				}).catch(err => {
					console.log(err);
				});



			},

			handle(val) { //选择发货厂家
				let obj = {};
				obj = this.options.find((item) => {
					return item.id === val;
				});
				// 	let data={
				// 		status: 'searchOther',
				// 		id: obj.id
				// 	}
				// 	add2(data).then(res => {
				// 		console.log(res)
				// 		this.options1 = res.data.data;
				// 		console.log(this.options1)
				// 	}).catch(err => {
				// 		console.log(err);
				// 	});

				console.log(obj.id)

			},
			//返回
			cancle() {
				this.show = false;
			},
			//下单
			order(id) {
				this.show = false;
				//console.log(id);
				this.$message({
					message: '以为您下单成功',
					type: 'success'
				});

			}
		}
	}
</script>

<style lang="scss" scoped>
	.add {
		// width: 90%;
		// //height: 100%;
		// margin-top: 80px;
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
			margin-top: 10px;
			padding: 0 4.8%;
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
			.search {
				//border: #000000 solid 1px;
				display: flex;
				align-items: center;

				.search-s {
					display: inline-flex;
					align-items: center;
					width: 20.77%;
					height: 36px;
					background-color: #ffffff;
					border: solid 1px #dcdcdc;
					padding-left: 5px;
					//margin-bottom: 60px;

					i {
						color: #5945c8;
						font-size: 20px;

					}

					input {
						border: none;
						padding-left: 5px;
					}
				}

				.status {
					margin-left: 15%;

					button {
						width: 180px;
						height: 36px;
						//background-color: #5945c8;
						border-radius: 18px;
						border: none;
						color: #fff;
						font-family: PingFang-SC-Heavy;
						font-size: 20px;
						margin-right: 15px;

					}

					.color {
						background-color: #5945c8;
					}
				}
			}

			.list {
				margin-top: 25px;
				width: 100%;
				//padding-bottom: 50px;
				border: 2px solid #eaeefb;
				border-radius: 4px;

				.list-header {
					display: flex;
					justify-content: space-around;
					padding-top: 30px;
					padding-bottom: 10px;

					div {
						width: 20.5%;
						text-align: center;
						color: #606266;
						font-size: 17px;
						font-family: PingFang-SC-Bold;
					}

					.one {
						width: 10%;
					}
				}

				.list-data {
					display: flex;
					justify-content: space-around;
					align-items: center;
					height: 50px;
					border-top: #ebeef5 solid 2px;

					//padding-top: 30px;
					div {
						width: 20.5%;
						text-align: center;
						color: #606266;
						font-size: 17px;
						font-family: PingFang-SC-Bold;

						button {
							
							padding: 0 15px;
							
							height: 30px;
						
							color: #409eff;
							border: 1px solid #d9ecff;
							border-radius: 4px;
							background-color: #ecf5ff;
						}
					}

					.one {
						width: 10%;
					}
				}
			}
		}

		.pop {
			//弹出层
			position: absolute;
			top: 0;
			z-index: 999;
			width: 100%;
			height: 100%;
			background: rgba(171, 171, 171, .3);
            overflow-y: auto;
			.pop-content {
				margin: 0 auto;
				//margin-top: 4%;
				width: 36%;
				//height: 90%;
				background-color: rgba(255, 255, 255, 1);
				border-radius: 20px;
				padding-bottom: 20px;
				
				h3 {
					width: 100%;
					height: 35px;
					display: flex;
					align-items: center;
					background-color: #5945c8;
					border-radius: 20px 20px 0px 0px;
					font-family: PingFang-SC-Medium;
					font-size: 15.5px;
					color: #fff;
					justify-content: center;
					margin-bottom: 10px;

				}

				.pop-text {
					padding: 0 30px;
					font-family: PingFang-SC-Medium;
					justify-content: flex-start;
					font-size: 16px;
					color: #333333;
					margin-bottom: 10px;
					display: flex;

					.text1 {
						//width: 75%;
						display: flex;

						//border: #000000 solid 1px;
						label {
							color: #999999;
							//display: flex;
							//justify-content: space-between;
							//border: #000000 solid 1px;
							//width: 80px;
						}

						div {
							display: flex;
							//width: 250px;
							//height: 30px;
							//border: #dcdcdc solid 1.5px;

							/deep/ .el-input__inner {
								//background:  rgb(245,245,245);
								height: 30px;
								width: 160px;

							}

							/deep/ .el-input__icon {
								height: 30px;
								//border: #000000 solid 1px;
								display: flex;
								align-items: center;
							}
						}

						.text1-one {
							//width: 113px;
							justify-content: flex-end;
							//border: #000000 solid 1px;
						}
					}



				}

				.goodsinfo {
					display: flex;
					padding-left: 30px;
					align-items: center;
					margin-bottom: 10px;

					.info-left {
						width: 20%;
						//height: 70px;
						border-radius: 10px;

						img {
							border-radius: 10px;
							width: 80%;
							//min-height: 70px;

						}
					}

					.info-right {
						margin-left: 10px;
						width: 90%;

						.info1 {
							width: 90%;
							overflow: hidden;
							
							//white-space: nowrap;
							font-size: 14px;
							display: flex;
							padding-right: 30px;
							
							text-overflow: ellipsis;

							div {
								width: 40%;
								//border: #000000 solid 1px;
							}

							label {
								color: rgba(153, 153, 153, 1);
							}
						}
					}
				}

				.pop-btn {
					text-align: center;
					padding-bottom: 30px;

					button {
						width: 50px;
						height: 20px;
						color: #fff;
						font-size: 14px;
						font-family: PingFang-SC-Regular;
						background-color: rgba(94, 191, 77, 1);
						box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.13);
						border: none;
						margin-right: 15px;
					}

					.back {
						background-color: rgba(204, 202, 204, 1);
					}
				}
			}
		}
	}
</style>
