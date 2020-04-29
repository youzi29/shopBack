<template>
	<div class="addgoods">
		<div class="addgoods-left">
			<div v-for="(item , index) in firstdata" :key="item.catId" class="text item" @click="firstevent(item.catId , index)"
			 :class="[index == currentIndex ? 'back' :'']">
				<div>{{item.name}}</div>
			</div>
			<div class="fenye" v-if="totalpage/100 > 1">
				<el-pagination background :page-size="100" layout="prev, pager, next" :total="totalpage" @current-change="change"
				 @prev-click="change" @next-click="change">
				</el-pagination>
			</div>
		</div>
		<div class="addgoods-right" ref="scroll_back">
			<GoodsInfo :id="goodsid" v-if="showdetail" @childevent="colsedetail"></GoodsInfo>
			<div v-if="!showdetail">
				
			
			<div class="right-top" :class="[topheight ? 'back1' : '']">
				<div class="right-top-list" v-for="(item , index) in sconddata" :key="item.catId">
					<div class="divone" :class="[index == currentIndex1 ? 'back2' :'']">
						<span class="divone-span" @click="scondevent(item.catId , index)" style="font-weight: 600;">{{item.name}}</span>
						<div class="top-in">
							<span @click="scondevent(item1.catId , index)" v-for="(item1 , index1) in thriddata" v-if="index == currentIndex1">
								{{item1.name}}
							</span>
						</div>
					</div>
				</div>
				<div class="fenye" style="width: 100%;" v-if="totalpage1/100 > 1">
					<el-pagination background :page-size="100" layout="prev, pager, next" :total="totalpage1" @current-change="change1"
					 @prev-click="change1" @next-click="change1">
					</el-pagination>
				</div>
			</div>

			<div class="right-bottom" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
			 element-loading-background="rgba(0, 0, 0, 0.8)">
				<div class="select" >
					<template>
						<el-select v-model="brand" clearable placeholder="品牌分类" @change="selectbrand">
							<el-option v-for="item in brandlist" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</template>
					<template>
						<el-select v-model="price" clearable placeholder="价格区间" @change="selectprice">
							<el-option v-for="(item , index) in pricelist" :key="index" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</template>
				</div>
				<div class="jdgoods" ><!--商品列表-->
					<div class="goodsone" v-for="(item , index) in goodslist" :key="item.wareId" @click="detail(item.wareId)">
						<div class="goods-img">
							<img :src="item.imageUrl">
						</div>
						<div class="goods-price">
							<span>￥{{item.price}}</span>
							<i style="color: #666;font-size: 15px;margin-left: 4px;text-decoration: line-through;">￥{{item.JDprice}}</i>
						</div>
						<div class="goods-name" :title="item.wareName">
							{{item.wareName}}
						</div>
						<div class="goods-brand">
							{{item.brand}}
						</div>
					</div>
				</div>
				<div style="color: #999;" v-if="ngoods">该分类没有商品哦~</div>
				<div class="fenye" v-if="totalpage2/20 > 1" ref="srcoll_back">
					<el-pagination background :page-size="20" layout="prev, pager, next" :total="totalpage2" @current-change="change2"
					 @prev-click="change2" @next-click="change2">
					</el-pagination>
				</div>
			</div>
		    </div>
		</div>
	</div>
</template>

<script>
	import {
		getProduct
	} from '../../../api/index.js'
	import GoodsInfo from './goodsinfo.vue'
	export default {
		components:{GoodsInfo},
		mounted() {
			this.takenfirst()
		},
		data() {
			return {
				showdetail: false,
				goodsid:'',
				loading: false,
				ngoods: false,
				goodslist: '',
				brandlist: '',
				pricelist: [],
				brands: '',
				brand: '',
				price: '',
				price1: [],
				topheight: true,
				currentpage: 1,
				totalpage: 1, //总页数
				currentIndex: 0,
				firstdata: [{
						catId: 15126,
						parentId: 0,
						name: "艺术品",
						catClass: 0,
						state: 1
					},
					{
						catId: 5272,
						parentId: 0,
						name: "数字内容",
						catClass: 0,
						state: 1
					},
					{
						catId: 15083,
						parentId: 0,
						name: "房地产",
						catClass: 0,
						state: 1
					}
				],
				firstid: '',
				currentpage1: 1,
				totalpage1: 1, //总页数
				currentIndex1: null,
				sconddata: [{
						catId: 15126,
						parentId: 0,
						name: "艺术品",
						catClass: 0,
						state: 1
					},
					{
						catId: 5272,
						parentId: 0,
						name: "数字内容",
						catClass: 0,
						state: 1
					},
					{
						catId: 15083,
						parentId: 0,
						name: "房地产",
						catClass: 0,
						state: 1
					}
				],
				sconedid: '',
				currentpage2: 1,
				totalpage2: 1, //总页数
				currentIndex2: null,
				thriddata: [{
						catId: 15126,
						parentId: 0,
						name: "艺术品",
						catClass: 0,
						state: 1
					},
					{
						catId: 5272,
						parentId: 0,
						name: "数字内容",
						catClass: 0,
						state: 1
					},
					{
						catId: 15083,
						parentId: 0,
						name: "房地产",
						catClass: 0,
						state: 1
					}
				],

			}
		},
		methods: {
			selectbrand(val) { //一级分类的商品
				let obj = {};
				this.price = ''
				obj = this.brandlist.find((item) => {
					return item.id === val;
				});
				console.log(obj.name)
				let data1 = {
					status: 'searchList',
					page: 1,
					catId: this.sconedid,
					brands: obj.name,
					min: '',
					max: ''
				}
				this.loading = true

				this.brands = obj.name
				getProduct(data1).then(res => {
					if (res.data.msg == 'success') {
						this.loading = false
						this.goodslist = res.data.data.hitResult
						//this.brandlist = res.data.data.brand
						this.totalpage2 = res.data.data.resultCount
						//this.price = res.data.data.price
						if (res.data.data.resultCount == 0) {
							this.ngoods = true
						}
						console.log(this.goodslist)
					}
				}).catch(err => {
					console.log(err);
				});
			},
			selectprice(val) {
				let obj = {};

				obj = this.pricelist.find((item) => {
					return item.id === val;

				});
				this.loading = true
				let pricecover = []
				var ret = obj.name.replace(/[0-9]*(\.[0-9]*)?/g, function(e) {
					pricecover.push(e)
					console.log(pricecover)
				});
				let data1 = {
					status: 'searchList',
					page: 1,
					catId: this.sconedid,
					brands: this.brands,
					min: parseInt(pricecover[0]),
					max: parseInt(pricecover[2])
				}
				console.log(data1)
				getProduct(data1).then(res => { //获取商品数据
					if (res.data.msg == 'success') {
						this.loading = false
						this.goodslist = res.data.data.hitResult
						//this.brandlist = res.data.data.brand
						this.totalpage2 = res.data.data.resultCount
						//this.price = res.data.data.price
						if (res.data.data.resultCount == 0) {
							this.ngoods = true
						}
						console.log(this.goodslist)
					}
				}).catch(err => {
					console.log(err);
				});
			},
			change(val) { //分页
				this.currentpage = val;
				console.log(this.currentpage);
				let data = {
					status: 'CateGorys',
					page: this.currentpage,
					class: 0
				}
				getProduct(data).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err);
				});
			},
			change1(val) { //分页
				this.currentpage1 = val;
				console.log(this.currentpage1);
				let data = {
					status: 'CateGorys',
					page: this.currentpage1,
					class: 1,
					parent: this.firstid
				}
				getProduct(data).then(res => {
					if (res.data.msg == 'success') {
						this.sconddata = res.data.data.categorys
						this.totalpage1 = res.data.data.totalRows
					}
				}).catch(err => {
					console.log(err);
				});
			},
			change2(val) { //分页
				this.currentpage2 = val;
				console.log(this.currentpage2);
				this.loading = true

				var top = this.$refs.scroll_back.offsetTop;

				this.$refs.scroll_back.scrollTop = 0

				//this.$refs.scoll_back.scrollTop(-top.offsetTop);
				let data1 = {
					status: 'searchList',
					page: this.currentpage2,
					catId: this.sconedid,
					brands: this.brands
				}
				getProduct(data1).then(res => { //获取商品数据
					if (res.data.msg == 'success') {
						this.loading = false
						this.goodslist = res.data.data.hitResult
						//this.brandlist = res.data.data.brand
						this.totalpage2 = res.data.data.resultCount
						//this.price = res.data.data.price
						console.log(this.goodslist)
					}
				}).catch(err => {
					console.log(err);
				});
			},
			takenfirst() {
				let data = {
					status: 'CateGorys',
					page: 1,
					class: 0
				}
				getProduct(data).then(res => {
					if (res.data.msg == 'success') {
						this.firstdata = res.data.data.categorys
						this.totalpage = res.data.data.totalRows
						let data = {
							status: 'CateGorys',
							page: 1,
							class: 1,
							parent: this.firstdata[0].catId
						}
						getProduct(data).then(res => {
							if (res.data.msg == 'success') {
								this.sconddata = res.data.data.categorys
								this.totalpage1 = res.data.data.totalRows

							}
						}).catch(err => {
							console.log(err);
						});

						let data1 = {
							status: 'searchList',
							page: 1,
							catId: this.firstdata[0].catId,
						}
						getProduct(data1).then(res => {
							if (res.data.msg == 'success') {
								this.goodslist = res.data.data.hitResult
								this.brandlist = res.data.data.brand
								this.totalpage2 = res.data.data.resultCount
								this.price = res.data.data.brandList.price
								if (res.data.data.resultCount == 0) {
									this.ngoods = true
								}

							}
						}).catch(err => {
							console.log(err);
						});
					}
				}).catch(err => {
					console.log(err);
				});
			},
			firstevent(id, index) {
				this.currentIndex = index
				this.topheight = false
				this.ngoods = false
				this.loading = true
				this.thriddata = ''
				this.$refs.scroll_back.scrollTop = 0

				this.firstid = id
				this.sconedid = id
				let data = {
					status: 'CateGorys',
					page: 1,
					class: 1,
					parent: id
				}
				getProduct(data).then(res => { //获取分类数据
					if (res.data.msg == 'success') {
						this.sconddata = res.data.data.categorys
						this.totalpage1 = res.data.data.totalRows

					}
				}).catch(err => {
					console.log(err);
				});

				let data1 = {
					status: 'searchList',
					page: 1,
					catId: id,
				}
				getProduct(data1).then(res => { //获取商品数据
					this.loading = true
					if (res.data.msg == 'success') {
						this.loading = false
						this.goodslist = res.data.data.hitResult
						this.brandlist = res.data.data.brand
						this.totalpage2 = res.data.data.resultCount
						if (res.data.data.resultCount == 0) {
							this.ngoods = true
						}
						this.price1 = res.data.data.brandList.price
						let len = this.price1.length
						for (let i = 0; i <= len; i++) {
							let min = this.price1[i].min
							let max = this.price1[i].max
							this.pricelist.push({
								'id': i,
								'name': min + '-' + max
							})
						}
						console.log(this.pricelist)
					}
				}).catch(err => {
					console.log(err);
				});
			},
			scondevent(id, index) {
				this.currentIndex1 = index
				this.currentIndex2 = index
				this.ngoods = false
				this.loading = true
				//this.topheight = true
				//alert(id)
				//this.firstid = id
				let data = {
					status: 'CateGorys',
					page: 1,
					class: 2,
					parent: id
				}
				getProduct(data).then(res => {
					if (res.data.msg == 'success') {
						this.thriddata = res.data.data.categorys
						this.totalpage1 = res.data.data.totalRows
						this.loading = false
					}
				}).catch(err => {
					console.log(err);
				});
				let data1 = {
					status: 'searchList',
					page: 1,
					catId: id,
				}
				getProduct(data1).then(res => { //获取商品数据
					if (res.data.msg == 'success') {
						this.loading = false
						this.goodslist = res.data.data.hitResult
						this.totalpage2 = res.data.data.resultCount
						if (res.data.data.resultCount == 0) {
							this.ngoods = true
						}
					}
				}).catch(err => {
					console.log(err);
				});
			},
		    detail(id){
				this.goodsid = id;
				this.showdetail = true
				
			},
		    colsedetail(){
				this.showdetail = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .el-icon-loading:before {
		color: #5945c8 !important;
	}

	/deep/ .el-loading-spinner .el-loading-text {
		color: #5945c8 !important;
	}

	.back {
		background: #5945c8;
		color: #fff !important;
	}

	.back1 {
		//height: 14% !important;
	}

	.back2 {
		//background: #B4BCCC;
		margin-bottom: 0;
		font-weight: 600;

		//width: 95%;
		.top-in {
			font-weight: normal;
		}

	}

	.text {
		font-size: 18px;
		padding-left: 20px;
		color: #242F42;
	}

	.item {
		margin-bottom: 18px;
		//border-bottom: #E4E4E4 solid 1px;
		padding: 10px 0;
		padding-left: 15px;
		cursor: pointer;


	}
	/deep/ .addgoods-left::-webkit-scrollbar {
	 width: 5px;
	}
	/deep/ .addgoods-left::-webkit-scrollbar-track {
	 background-color:transparent;
	 -webkit-border-radius: 2em;
	 -moz-border-radius: 2em;
	 border-radius:2em;
	}
	/deep/ .addgoods-left::-webkit-scrollbar-thumb {
	 background-color:#5945c8d9;
	 -webkit-border-radius: 1em;
	 -moz-border-radius: 1em;
	 border-radius:1em;
	}
	/deep/ .addgoods-right::-webkit-scrollbar {
	 width: 5px;
	}
	/deep/ .addgoods-right::-webkit-scrollbar-track {
	 background-color:transparent;
	 -webkit-border-radius: 2em;
	 -moz-border-radius: 2em;
	 border-radius:2em;
	}
	/deep/ .addgoods-right::-webkit-scrollbar-thumb {
	 background-color:transparent;
	 -webkit-border-radius: 1em;
	 -moz-border-radius: 1em;
	 border-radius:1em;
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

	.addgoods {
		display: flex;

		.addgoods-left {
			width: 10%;
			height: 100vh;
			border: #E4E4E4 solid 1px;
			padding-top: 10px;
			overflow-y: auto;
		}

		.addgoods-right {
			width: 90%;
			height: 100vh;
			//border: #B4BCCC solid 1px;
			overflow-y: auto;
			overflow-x: hidden;

			.right-top {
				height: auto;
				width: 100%;
				//border: #B4BCCC solid 1px;
				display: flex;
				flex-wrap: wrap;
				overflow-y: auto;
				//box-shadow:  #666 0px 0px 10px;
				//margin-top: 10px;
				padding: 5px 5px;

				.right-top-list {
					overflow-y: auto;

					.divone {
						padding: 10px 10px;
						//margin: 10px 10px 0px 5px;
						display: flex;
						//background: #97A8BE;
						//border: #8C939D solid 1px;
						font-size: 18px;
						border-radius: 2px;

						.divone-span {
							cursor: pointer;
						}

						//cursor: pointer;
						.top-in {
							font-size: 17px;
							padding: 10px;

							span {
								//margin: 0 5px 0 5px;
								padding: 0 5px 0 5px;
								padding-left: 7px;
								//border: #000000 solid 1px;
								border-left: #5945c8 solid 2px;
								border-radius: 1px;
								cursor: pointer;
							}

						}
					}

				}
			}

			.right-bottom {
				height: 100vh;
				width: 100%;

				.select {
					margin: 5px 0;
				}

				.jdgoods {

					display: flex;
					flex-wrap: wrap;

					//justify-content: space-around;
					.goodsone {
						width: 220px;
						padding: 10px 10px;
						margin: 10px 18px 10px 18px;
						cursor: pointer;
						border: 2px solid transparent;
					}

					.goods-img {
						width: 100%;

						img {
							min-height: 300px;
						}

					}

					.goods-price {
						color: #e4393c;
						font-size: 20px;
					}

					.goods-name {
						color: #666;
						overflow: hidden;
						/*超出部分隐藏*/
						white-space: nowrap;
						/*不换行*/
						text-overflow: ellipsis;
						/*超出部分文字以...显示*/

					}

					.goods-brand {
						color: #999;

					}
				}

				.goodsone:hover {

					//transition: border-color .1s ease;
					border: 2px solid #EBEEF5;
				}

				.goods-name:hover {
					color: #DD6161;

				}
			}

		}
	}
</style>
