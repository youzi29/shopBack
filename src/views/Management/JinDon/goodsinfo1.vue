<template>
	<div class="goodsinfo">
	<h3><div class="close"><i class="el-icon-close" @click="colse()"></i></div></h3>
	<div class="content">
		<div class="content-left">
			<div class="img-files">
				<div>
				 <img :src="goodscover" alt=""> 
				</div>
			</div>
		</div>
		<div class="content-right">
			<div class="right-form">
				<div class="listone">
					<label>商品名称:</label>
					<div>{{goodsinfo.name}}</div>
				</div>
				<!-- <div class="listone">
					<label>商品分类:</label>
					<div class="classfiy">
						{{goodsinfo.firstName}} {{goodsinfo.parentName}} {{goodsinfo.className}}
					</div>
				</div> -->
				<div class="listtwo">
					<label>广告图片:</label>
					 <div class="listtwo-pic">
						<div class="img-files">
							<div>
								<div class="img-box" >
									<img :src="goodscover" alt=""> </span>
								</div>
							</div>
						</div>
					</div> 
				</div>
				 <div class="goodssize">
					<!-- <div class="goodsdata">
						<div class="dataheader">
							<div>商品规格</div>
							<div>商品价格</div>
							<div>库存量</div>
							<div>净重量</div>
							<div>运费</div>
						</div>
						<div class="dataheader a" v-for="(item , index) in goodssize">
							<div>{{item.name}}</div>
							<div>{{item.price}}</div>
							<div>{{item.num}}</div>
							<div>{{item.weight}}</div>
							<div>{{item.postprice}}</div>
						</div>
					</div> -->
					
						<div class="goodssize-one" v-for="(item , index) in goodssize">
							<img :src="item.img" />
							<div class="size-right">
								<div class="size-name">{{item.pname}}</div>
								<div class="size-weight">净重：{{item.weight}}kg</div>
								<div class="size-price">￥{{item.price}}<span>￥{{item.JDprice}}</span></div>
							</div>
						</div>
				</div> 
				
				
				
				<!-- <div class="listtwo">
					<label>详细图片:</label>
					<div class="listtwo-pic">
						<div class="img-files">
							<div>
								<div class="img-box" v-for="(item , index) in goodsdetail" >
									<img :src="item.url" alt="">
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<!-- <div class="listone">
					<label>是否推荐:</label>
					<div>{{goodsinfo.show ? '是' : '否'}}</div>
				</div> -->
			</div>
		</div>
	
	</div>
	<div style="width: 50%;margin: 0 auto;" v-html="goodsad"></div>
	</div>
</template>

<script>
	import {
		add1,
		add2,
		getProduct
	} from '@/api/index.js'
	export default {
		name: "goodinfo",
		props:['id'],
		mounted(){
			//alert(this.id)
			this.getdatail()
			this.getsize()
		},
		data(){
			return{
				goodsinfo:'',
				goodssize:'',
				goodsad:'',
				goodsdetail:'',
				goodscover:''
			}
		},
		methods:{
			colse(){//关闭商品详情
			   // this.show = false;
				this.$emit('childevent')
			},
			getdatail(){
				let data = {
					status: 'Detail',
					id: this.id
				}
				getProduct(data).then(res => {
					let msg = res.data.msgText
					if(res.data.msg == "success"){
						this.goodscover = res.data.data.img
						this.goodsinfo = res.data.data;
						this.goodsad =this.goodsinfo.introduction
						console.log(this.goodsad)

						//this.goodssize= this.goodsinfo.size;
						//this.goodsdetail = this.goodsinfo.detail;
						
					}else{
						this.$message({
							type: 'error',
							message: msg
						});
					}
				}).catch(err => {
					console.log(err);
				});
			},
			getsize(){
				let data = {
					status: 'jdSize',
					id: this.id
				}
				getProduct(data).then(res => {
					let msg = res.data.msgText
					if(res.data.msg == "success"){
						console.log(res)
						this.goodssize = res.data.data
					}else{
						this.$message({
							type: 'error',
							message: msg
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
	.goodsinfo{
		height: 100%;
		width: 100%;
		background: #fff;
		overflow-style: none;
		h3{	
			display: flex;
			justify-content: flex-end;
			text-align: right;
			align-items: center;
			width: 100%;
			height: 30px;
			div{
				width: 20px;
				height: 20px;
				//border: #000000 solid 1px;
				text-align: right;
				padding: 10px;
				margin-right: 30px;
				font-size:28px;
			}
		}
	
	.content {
		//margin-top: 60px;
		display: flex;
		//margin-left: 200px;
		
		height: 100%;
		
		width: 100%;
		flex-wrap: wrap;
		align-items: flex-start;
		
	    
		.content-left {
			//border: #000000 solid 1px;
			width: 40%;
			//margin-top: 10px;
	
			.img-files {
				//width: 660px;
				//border: #005C5F solid 1px;
				//margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: center;
	
				div {
					display: inline-block;
					//border: #000088 solid 2px;
	
					//width: 100%;
					.img-box {
						width: 400px;
						position: relative;
						border: 1px solid #e6e6e6;
						margin-right: 20px;
						background: #f6f6f6;
						display: inline-block;
	
						img {
							width: 400px;
						}
	
						span {
							position: absolute;
							top: 5px;
							right: 10px;
							color: red;
							display: none;
						}
	
						&:hover span {
							display: block;
						}
					}
				}
	
				.img-file {
					height: 400px;
					width: 400px;
					display: inline-flex;
					align-items: center;
					font-size: 30px;
					text-align: center;
					border: solid 1px #e5e5e5;
					justify-content: center;
					margin: 0;
					position: relative;
	
	
					>input {
						//width: 100%;
						//height: 100%;
						opacity: 0;
					}
	
					>label {
						position: absolute;
						font-size: 18px;
						color: #808080;
						display: flex;
						justify-content: center;
	
						span {
							display: flex;
							justify-content: center;
							flex-wrap: wrap;
	
							i {
								width: 100%;
								font-size: 28px;
							}
						}
	
					}
	
				}
			}
		}
	
		.content-right {
			margin-left: 4%;
			width: 50%;
			//margin-top: 10px;
			.right-form {
				
				width: 100%;
				.listone {
					display: flex;
					align-items: center;
					width: 100%;
					height: 40px;
					//flex-wrap: wrap;
					margin-bottom: 13px;
					//border: #000000 solid 1px;
					.size{
						//border: #000000 solid 1px;
						display: flex;
						//width: 100%;
						label {
							display: flex;
							//border: #000000 solid 1px;
							justify-content: space-between;
							width: 90px;
							//height: 17px;
							font-family: PingFang-SC-Heavy;
							font-size: 15px;
							font-weight: normal;
							font-stretch: normal;
							//line-height: 70px;
							letter-spacing: 1px;
							color: #4d4d4d;
							//border: #000000 solid 1px;
						
						
							i {
								//margin-left: 12px;
								display: flex;
								width: 100%;
								justify-content: space-between;
						
							}
						}
						
						em {
							display: flex;
							margin-left: 12px;
						}
						
						div {
							width: 330px;
							height: 30px;
							//border: solid 1.5px #dcdcdc;
							padding-left: 6px;
							//margin-right: 12px;
						}
					}
	
					label {
						display: flex;
						justify-content: space-between;
						width: 90px;
						//height: 17px;
						font-family: PingFang-SC-Heavy;
						font-size: 15px;
						font-weight: normal;
						font-stretch: normal;
						//line-height: 70px;
						letter-spacing: 1px;
						color: #4d4d4d;
						//border: #000000 solid 1px;
	
	
						i {
							//margin-left: 12px;
							display: flex;
							width: 100%;
							justify-content: space-between;
	
						}
					}
	
					em {
						display: flex;
						margin-left: 12px;
					}
	
					input {
						width: 330px;
						height: 30px;
						border: solid 1.5px #dcdcdc;
						padding-left: 6px;
						//margin-right: 12px;
					}
					.classfiy{
						//border: #000000 solid 1px;
						display: flex;
						align-items: center;
						.listone-class {
							display: flex;
							//width: 200px;
							height: 30px;
							align-items: center;
							margin-right: 15px;
							margin-bottom: 5px;
							
						
							
							.listone1 {
								display: flex;
								width: 40%;
								align-items: center;
								font-family: PingFang-SC-Medium;
								font-size: 14px;
								font-weight: normal;
								font-stretch: normal;
								letter-spacing: 1px;
								color: #666666;
								height: 40px;
								//border: #000000 solid 1px;
								
							}
						
							span {
								display: flex;
								//width: 250px;
								height: 30px;
								//border: #dcdcdc solid 1.5px;
								/deep/ .el-input__inner{
									height: 30px;
								}
								/deep/ .el-input__icon{
									height: 30px;
								    display: flex;
									align-items: center;
								}
							}
						
						}
						
					}
	
					
	
	
	
				}
				.goodssize {
					width: 100%;
					//height: 190px;
					
					padding: 15px;
					.goodssize-one:hover{
						border: solid #eee 1.5px;
					}
					.goodssize-one{
						border: transparent solid 1.5px;
						display: flex;
						margin-top: 5px;
						overflow: hidden;
						width: 100%;
						transition: all 0.1s;
						img{
							width: 150px;
							transition: all 0.1s;
						}
						img:hover{
							transform: scale(1.1);
						}
						.size-right{
							margin-left: 20px;
							.size-weight{
								margin-top: 5px;
								margin-bottom: 5px;
							}
							.size-price{
								color: red;
								font-size: 18px;
								span{
									font-size: 16px;
									text-decoration: line-through;
									margin-left: 10px;
								}
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
	
				.listtwo {
					display: flex;
					width: 100%;
					margin-bottom: 12px;
					align-items: flex-start;
					align-content: flex-start;
	
					//border: #000000 solid 1px;
					label {
						width: 90px;
						//height: 17px;
						margin-top: -4px;
						font-family: PingFang-SC-Heavy;
						font-size: 17px;
						font-weight: normal;
						font-stretch: normal;
						//line-height: 70px;
						letter-spacing: 1px;
						color: #4d4d4d;
						display: flex;
						align-items: flex-start;
						padding: 0;
						//border: #0074D9 solid 1px;
						justify-content: space-between;
					}
	
					.listtwo-pic {
						.img-files {
							//width: 660px;
							//border: #005C5F solid 1px;
							//margin: 0 auto;
							display: flex;
	
							//align-items: center;
							div {
								display: flex;
								//flex:1;
								flex-wrap: wrap;
								//border: #000088 solid 2px;
								width: 100%;
	
								.img-box {
									width: 140px;
									height: 140px;
									position: relative;
									border: 1px solid #e6e6e6;
									margin-right: 20px;
									background: #f6f6f6;
									display: inline-block;
	
									img {
										width: 140px;
										height: 140px;
									}
	
									span {
										position: absolute;
										top: 5px;
										right: 10px;
										color: red;
										display: none;
									}
	
									&:hover span {
										display: block;
									}
								}
							}
	
							.img-file {
								height: 140px;
								width: 140px;
								//display: inline-flex;
								align-items: center;
								font-size: 30px;
								text-align: center;
								border: solid 2px #e5e5e5;
								justify-content: center;
								margin: 0;
								position: relative;
	
	
								>input {
									//width:100%;
									//height: 100%;
									opacity: 0;
								}
	
								>label {
									position: absolute;
									font-size: 45px;
									color: #bfbfbf;
									display: flex;
									justify-content: center;
								}
	
							}
						}
					}
				}
	
				.listthree {
					display: flex;
					align-items: center;
	
					label {
	
						////margin-top: -4px;
						font-family: PingFang-SC-Heavy;
						font-size: 17px;
						font-weight: normal;
						font-stretch: normal;
						//line-height: 70px;
						letter-spacing: 1px;
						color: #4d4d4d;
						display: flex;
						align-items: flex-start;
						padding: 0;
						//border: #0074D9 solid 1px;
						justify-content: space-between;
					}
	
					.listone-check {
						//是否推荐
						display: flex;
	
						//margin-left: 5px;
						.check-one {
							margin-left: 10px;
							margin-right: 15px;
	
							/deep/ .el-radio__input.is-checked .el-radio__inner {
								border-color: #5945c8;
								background: #5945c8;
							}
	
							/deep/ .el-radio__input.is-checked+.el-radio__label {
								color: #5945c8;
							}
						}
	
					}
				}
	
				.listfour {
					width: 100%;
					text-align: center;
	
					button {
						width: 230px;
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
		}
	}
   }
</style>
