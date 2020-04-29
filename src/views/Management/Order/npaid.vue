<template>
	<div>


		<div class="add">
			
			<div class="content">
				<div class="search">
					<!-- <div class="search-s">
						<i class="el-icon-search"></i>
						<input placeholder="搜索名称、分类" />
					</div> -->
					
				</div>

				<!--未发货-->
				<div class="list">
					<div class="list-header">
						<div class="one">编号</div>
						<!-- <div>订单号</div> -->
						<div class="one">姓名</div>
						<div>联系方式</div>
						<div class="one">下单件数</div>
						<div class="one">订单金额</div>
						<div class="one">优惠金额</div>
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
							<div class="one">{{item.vocher}}</div>
							<div>{{item.time}}</div>
							<div>
								<button @click="detail(item.id ,item.name, item.count ,item.price )">添加优惠金额</button>
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

			<!--添加优惠金额-->
			<div class="pop" v-if="show">
			 <div class="pop-content">
					
					<h3><i>添加优惠金额</i></h3>
					<div class="pop-text">
						<div class="text1">
							<label>下单用户：</label>
							<i>{{name}}</i>
						</div>
					</div>
					<div class="pop-text">
						<div class="text1">
							<label>下单金额：</a></label>
							<i>{{price}}</i>
						</div>
					</div>
					<div class="pop-text">
						<div class="text1">
							<label>下单件数：</label>
							<i>{{count}}</i>
						</div>
					</div>
					<div class="pop-text">
						<div class="text1">
							<label>输入优惠金额：</label>
							<input v-model="vocher" placeholder="请输入优惠金额" />
						</div>
					</div>
					<div class="pop-btn">
						<button @click="order(did)">确定</button>
						<button class="back" @click="cancle()">返回</button>
					</div>
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
			this.tokendata()
		},
		data() {
			return {
				currentpage: 1,
				totalpage: 1, //总页数
				
				show: false, //是否显示订单详情
				orderlist: '',
				name:'',
				count:'',
				price:'',
				vocher:'',
				orderid:''
				}
				
		},
		methods: {
			change(val) { //分页
				this.currentpage = val;
				console.log(this.currentpage);
				let data = {
					status: 'searchListM',
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
			tokendata() {
				let data = {
					status: 'searchListM',
				}

				add5(data).then(res => {
					if (res.data.msg == 'success') {
						this.orderlist = res.data.data
						this.totalpage = res.data.sumnum
					} else {
						console.log(res.data.msg)
					}

				}).catch(err => {
					console.log(err);
				});
			},
			
			detail(id , name, count ,price) {
				this.orderid = id
				this.name= name
				this.price = price
				this.count = count
				this.show = true;
			},
		
			cancle() { //返回
				this.show = false;
			},

			order(id) { //确定
			
			    
				let data = {
					status: 'upVocher',
					id: this.orderid,
					vocher: this.vocher
					
				}
				
				console.log(data);
				add5(data).then(res => {
					if (res.data.msg == 'success') {
						this.tokendata();
						this.$message({
							message: '已添加优惠金额',
							type: 'success'
						});
						this.show = false;
					} else {
						let msg = res.data.msgText
						this.$message({
							message: msg,
							type: 'error'
						});
					}
				}).catch(err => {
					console.log(err);
				});
			},
			

			
		}
	}
</script>

<style lang="scss" scoped>
	.add {
		// width: 90%;
		 // height: 100%;
		// margin-top: 80px;
		// margin-left: 210px;
	

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
				// background-image: linear-gradient(0deg,
				// 	#5945c8 0%,
				// 	#9944c7 100%),
				// 	linear-gradient(#f58029,
				// 	#f58029);
				// border-radius: 20px;
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
					border-top:2px solid #ebeef5;

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
			z-index: 1;
			width: 100%;
			height: 100%;
			background: rgba(171, 171, 171, .3);
			overflow-y: auto;

			.pop-content {
				margin: 0 auto;
				//margin-top: 4%;
				width: 36%;
				//height: 130px;
				background-color: rgba(255, 255, 255, 1);
				border-radius: 20px;
				padding-bottom: 20px;

				//padding: 15px;
				//padding-top: 15px;
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
						align-items: center;

						//border: #000000 solid 1px;
						label {
							color: #999999;
							//display: flex;
							//justify-content: space-between;
							//border: #000000 solid 1px;
							//width: 80px;
						}
						input{
							height: 40px;
							width: 260px;
							border-radius: 4px;
							border: 1px solid #DCDFE6;
							-webkit-box-sizing: border-box;
							box-sizing: border-box;
							color: #606266;
							padding-left: 15px;
							font-size: 15px;
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
