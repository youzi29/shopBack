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

			<!--下单-->
			<div class="pop" v-if="show">
				<Address  @eventchild="sureaddress($event)" v-if='seladdress'> </Address>
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

					<template>
						<div class="pop-text" v-if="addressinfo">
							<div class="text1">
								<label><a>发</a><a>件</a><a>人：</a></label>
								<div>{{addressinfo.name}}</div>
							</div>
						</div>
						<div class="pop-text" v-if="addressinfo">
							<div class="text1">
								<label>发件人手机号：</a></label>
								<div>{{addressinfo.mobile}}</div>
							</div>
						</div>

						<div class="pop-text" v-if="!addressinfo">
							<div class="text1" style="cursor: pointer;">
								<label>发件地址：</a></label>
								<!-- <input placeholder="请输入发件城市" v-model="sendCity"/> -->
								<div @click="selectaddress()" >选择发件地址</div>
							</div>
						</div>
						<div class="pop-text" v-if="addressinfo" @click="selectaddress()" style="cursor: pointer;">
							<div class="text1">
								<label>发件地址：</a></label>
								<div>{{addressinfo.province}} {{addressinfo.city}} {{addressinfo.address}}</div>
							</div>
						</div>
						<div class="pop-text">
							<div class="text1">
								<label class="text1-one">选择发货物流：</a></label>
							    <i>
									
									<el-select
									    v-model="value"
									    filterable
									    allow-create
									    default-first-option
									    placeholder="请选择发货物流"
										 @change="handle">
									    <el-option
									      v-for="item in options2"
									     :key = "item.name"
									      :label="item.name"
									      :value="item.name">
									    </el-option>
									  </el-select>
								</i>
							</div>
						</div>
						<div class="pop-text" style="margin-top: 10px;" v-if="expressid == 1">
							<div class="text1" style="display: flex; align-items: center;">
								<label class="text1-one">预约发件时间：</a></label>
								<div class="block">
									<el-date-picker v-model="values1" type="datetime" placeholder="选择日期时间">
									</el-date-picker>
								</div>
							</div>
						</div>
						<div class="pop-text" v-if="expressid != 1">
							<div class="text1" style="cursor: pointer;">
								<label>输入快递单号：</a></label>
								<input placeholder="请输入快递单号" v-model="postid"/>
							</div>
						</div>
					</template>
					<div class="pop-btn">
						<button @click="order(did)" v-if="expressid == 1">下单</button>
						<button @click="otherorder(did)" v-if="expressid != 1">下单</button>
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
	import Address from '../Address/index.vue'
	export default {
		components: {
			Address
		},
		mounted() {
			this.tokendata()
		},
		data() {
			return {
				currentpage: 1,
				totalpage: 1, //总页数
				
				seladdress: false,
				addressinfo: '', //地址信息
				orderinfo: '',
				ordersize: '',
				btn: ["已发货", "未发货"],
				currentIndex: 0,
				show: false, //是否显示订单详情
				timea: '',
				did: '', //订单id
				orderlist: '',
				sendName: '',
				sendPhone: '',
				sendProvince: '',
				sendCity: '',
				sendAddress: '',

				
				values1: '',
				dweight: '', //订单总重量
				postid:'',//快递单号
				value: [],
				postname:'',//其他快递名字
				expressid: 1 ,//选择的物流id
				sun:'顺丰速运',
				options2: [{
				          //id: 1,
				          name: '顺丰速运'
				        },
						{
						          //id: 1,
						 name: '京东物流'
						 },
						{
				         // id: 2,
				          name: '圆通快递'
				        }, {
				         // id: 3,
				          name: '韵达快递'
				        },
						{
						 // id: 4,
						  name: '天天快递'
						},
						{
						 // id: 4,
						  name: '中通快递'
						},
						{
						 // id: 4,
						  name: '申通快递'
						},
						{
						 // id: 4,
						  name: '百世快递'
						},
						{
						 // id: 4,
						  name: 'EMS快递'
						},
						{
						 // id: 4,
						  name: '邮政小包'
						},
						{
						 // id: 4,
						  name: '德邦物流'
						},
						],
			}
		},
		methods: {
			change(val) { //分页
				this.currentpage = val;
				console.log(this.currentpage);
				let data = {
					status: 'searchListN',
					page: this.currentpage
				}
				add5(data).then(res => {
					if (res.data.msg == "success") {
						this.orderlist = res.data.data
					}
					console.log(res)
				}).catch(err => {
					console.log(err);
				});
			},
			handle(val){
			 	/*let obj = {};
			   obj = this.options2.find((item) => {
			   	return item.id === val;
			   });
			   this.expressid = obj.id
			   this.postname = obj.name
			     console.log(this.postname)*/
				 if(val == this.sun){
					 this.expressid = 1;
				 }else{
					 this.expressid = 2;
				 }
				 this.postname = val
				 console.log(val)
			},
			tokendata() {
				let data = {
					status: 'searchListN',
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
			status(index) {
				this.currentIndex = index;
				let flag = 1;
				if (this.flag == 1) {
					console.log("未发货");
					this.flag = 2;
				} else {
					console.log("已发货");
					this.flag = 1;
				}
			},
			detail(id) {
				console.log(id)
				this.show = true;
				this.timea = id;
				this.did = id;
				let data = {
					status: 'searchOne',
					id: id
				}
				add5(data).then(res => {
					if (res.data.msg == 'success') {
						console.log(res)
						this.orderinfo = res.data.data;
						this.ordersize = this.orderinfo.product
					}
				}).catch(err => {
					console.log(err);
				});


			},
			selectaddress() {
				this.seladdress = true
			},
			sureaddress(item) {
				this.addressinfo = item;
				console.log(this.addressinfo)
				this.seladdress = false
			},

			cancle() { //返回
				this.show = false;
			},

			order(id) { //顺丰下单
			//alert("顺丰")
			     if(this.addressinfo.id == ''){
					 alert(this.addressinfo.id)
			     	this.$message({
			     		message: '请选择发件人地址',
			     		type: 'error'
			     	});
			     	return;
			     }
			     if(this.values1 == ''){
			     	this.$message({
			     		message: '请选择预约时间',
			     		type: 'error'
			     	});
			     	return;
			     }
				for (let i = 0; i < this.ordersize.length; i++) { //订单总重量
					this.dweight += parseInt(this.ordersize[i].sizeWeight);
				}
				//
				console.log(this.formatDate(this.values1));
				let data = {
					status: 'send',
					id: this.did, //订单索引
					send: this.addressinfo.id,//发件地址索引
					orderid: this.orderinfo.orderId, //订单编号
					sendName: this.addressinfo.name, //发件人
					sendPhone: this.addressinfo.mobile,
					sendProvince: this.addressinfo.province,
					sendCity: this.addressinfo.city,
					sendAddress: this.addressinfo.address,
					sName: this.orderinfo.sName, //收件人
					sPhone: this.orderinfo.sMobile,
					sProvince: this.orderinfo.sProvince,
					sCity: this.orderinfo.sCity,
					sAddress: this.orderinfo.sAddress,
					weight: this.dweight,
					name: this.ordersize[0].title,
					sendTime: this.formatDate(this.values1)
				}
				
				console.log(data);
				add5(data).then(res => {
					if (res.data.msg == 'success') {
						this.tokendata();
						this.$message({
							message: '以为您下单成功',
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
			otherorder(id){//其他快递发货
				let data = {
					status: 'otherSend',
					id: this.did, //订单索引
					send: this.addressinfo.id,//发件地址索引
					postid: this.postid,//快递单号
					postname: this.postname,//快递名称
				}
				if(this.addressinfo.id == ''){
					this.$message({
						message: '请选择发件人地址',
						type: 'error'
					});
					return;
				}
				if(this.postid == ''){
					this.$message({
						message: '请填写快递单号',
						type: 'error'
					});
					return;
				}
				if(this.postname == ''){
					this.$message({
						message: '请填写快递名称',
						type: 'error'
					});
					return;
				}
				console.log(data);
				add5(data).then(res => {
					if (res.data.msg == 'success') {
						this.tokendata();
						this.$message({
							message: '以为您下单成功',
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

			formatDate(date) { //格式化日期
				var myyear = date.getFullYear();
				var mymonth = date.getMonth() + 1;
				var myweekday = date.getDate();
				var myhours = date.getHours();
				var myminutes = date.getMinutes();
				var mysecond = date.getSeconds();
				if (mymonth < 10) {
					mymonth = "0" + mymonth;
				}
				if (myweekday < 10) {
					myweekday = "0" + myweekday;
				}

				if (myhours < 10) {
					myhours = "0" + myhours;
				}
				if (myminutes < 10) {
					myminutes = "0" + myminutes;
				}
				if (mysecond < 10) {
					mysecond = "0" + mysecond;
				}
				return (myyear + "-" + mymonth + "-" + myweekday + ' ' + myhours + ':' + myminutes + ':' + mysecond);
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
					border-top: 2px solid #ebeef5;

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
