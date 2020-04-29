<template>
	<div class="add">
		<!-- <div class="header">
			<h3>添加商品</h3>
		</div> -->
		<div class="content">
			<div class="content-left">
				<div class="img-files">
					<div v-if='imgs.length>0'>
						<div class="img-box" v-for="(item, i) in imgs" :key='i'>
							<img :src="item" alt=""> <span @click="del(i)"><i class="el-icon-delete"></i></span>
						</div>
					</div>
					<el-tooltip content="上传图片长宽不可超过700px" placement="bottom" effect="light">
					<div class="img-file" v-if='imgs.length < size'>
						<input type="file" id='files1' @change='fileChange'>
						<label for="files1">
							<span>
								<i class="el-icon-plus"></i>
								<a>封面图片</a>
							</span>
						</label>
					</div>
					</el-tooltip>
				</div>
			</div>
			<div class="content-right">
				<div class="right-form">
					<div class="listone">
						<label>商品名称:</label>
						<input placeholder="请输入商品名称" v-model="name">
					</div>
					<div class="listone">
						<label>商品分类:</label>
						<div class="classfiy">
							<div class="listone-class">
								<label class="listone1">主分类</label>
								<span>
									<el-select v-model="value1" placeholder="请选择" @change="handle">
										<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</span>
							</div>

							<div class="listone-class">
								<label class="listone1">次分类</label>
								<span>
									<el-select v-model="value2" placeholder="请选择" @change="handle1">
										<el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</span>
							</div>

							<div class="listone-class">
								<label class="listone1">再次分类</label>
								<span>
									<el-select v-model="value3" placeholder="请选择" @change="handle2">
										<el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</span>
							</div>
						</div>


					</div>
					<div class="listtwo">
						<label>广告图片:</label>
						<div class="listtwo-pic">
							<div class="img-files">
								<div v-if='imgs1.length>0'>
									<div class="img-box" v-for="(item, i) in imgs1" :key='i'>
										<img :src="item" alt=""> <span @click="del1(i)"><i class="el-icon-delete"></i></span>
									</div>
								</div>
								<el-tooltip content="上传图片:宽小于等于750px,长小于等于650px " placement="bottom" effect="light">
								<div class="img-file" v-if='imgs1.length < size1'>
									<input type="file" id='files1' @change='fileChange1'>
									<label for="files1">
										<span>
											<i class="el-icon-plus"></i>
											<!-- <a>封面图片</a> -->
										</span>
									</label>
								</div>
								</el-tooltip>
							</div>

						</div>
					</div>
					<div class="goodssize">
						<div class="goodsdata">
							<div class="dataheader a">
								<div>商品规格</div>
								<div>商品价格</div>
								<div>库存量</div>
								<div>净重量</div>
								<div>运费</div>
								<div>
									<i class="el-icon-plus" @click="addone()"></i>
								</div>
							</div>
							<div class="dataheader" v-for="item in count">
								<div><input v-model="gsize[item]" placeholder="商品规格"></div>
								<div><input v-model="money[item]" placeholder="商品价格"></div>
								<div><input v-model="stock[item]" placeholder="库存量"></div>
								<div><input v-model="weight[item]" placeholder="净重量"></div>
								<div><input v-model="fcosts[item]" placeholder="运费"></div>
								<div>
									<i class="el-icon-minus" @click="deleteone(item)"></i>
								</div>
							</div>
							<!-- <div class="dataheader a">
								<i class="el-icon-plus" @click="dialogVisible = true"></i>
							</div> -->
						</div>

					</div>
					<div class="listtwo">
						<label>详细图片:</label>
						<div class="listtwo-pic">
							<div class="img-files">
								<div v-if='imgs2.length>0'>
									<div class="img-box" v-for="(item, i) in imgs2" :key='i'>
										<img :src="item" alt=""> <span @click="del2(i)"><i class="el-icon-delete"></i></span>
									</div>
								</div>
								<el-tooltip content="上传图片:宽小于等于750px 长小于等于1546px " placement="bottom" effect="light">
								<div class="img-file" v-if='imgs2.length < size2'>
									<input type="file" id='files2' @change='fileChange2'>
									<label for="files2">
										<span>
											<i class="el-icon-plus"></i>
											<!-- <a>封面图片</a> -->
										</span>
									</label>
								</div>
								</el-tooltip>
								<!-- <button @click="updata()">提交</button> -->
							</div>

						</div>
					</div>
					<div class="listone" style="margin-bottom: 100px;">
						<label>面向城市:</label>
						<div class="classfiy">
							<div class="listone-class" style="width: 100px;">
								<label>全国：</label>
								<el-checkbox v-model="checked"></el-checkbox>
							</div>

							<div class="listone-class" v-if="!checked">

								<label>部分省市：</label>
								<el-select v-model="value4" placeholder="请选择省份" @change="handle3">
									<el-option v-for="item in provincelist" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
									</el-option>
								</el-select>

							</div>

							<div class="listone-class" v-if="!checked">

								<el-select v-model="value5" multiple placeholder="请选择城市" @change="handle14">
									<el-option v-for="item in citylist" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>

							</div>
						</div>


					</div>
					<!-- <div class="listthree">
						<label>是否推荐:</label>
						<div class="listone-check">
							<div class="check-one">
								<el-radio v-model="radio" label="1">是</el-radio>
							</div>
							<div class="check-one">
								<el-radio v-model="radio" label="0">否</el-radio>
							</div>
						</div>
					</div> -->
					<div class="listfour">
						<button @click="submit()"><span>发布</span></button>
						<button @click="submit1()" style="margin-left: 20px;"><span>保存</span></button>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import {
		add1,
		add2,
		add6
	} from '@/api/index.js'
	export default {
		name: 'add',
		/*mounted() {
			let data = {
				status: 'searchFirst'
			}
			add2(data).then(res => {
				console.log(res)
				this.options = res.data.data;
				console.log(this.options)
			}).catch(err => {
				console.log(err);
			});

			let data1 = {
				status: 'province'
			}

			add6(data1).then(res => { //省份
				if (res.data.msg == 'success') {
					this.provincelist = res.data.data
					//console.log(this.options)
				} else {
					console.log(res.data.msg)
				}

			}).catch(err => {
				console.log(err);
			});

		},*/
		data() {
			return {
				cityid: '', //城市id
				checked: true, //全国
				provincelist: '', //省份列表
				citylist: '', //城市列表
				sizeadd: [],
				sizeone: '',
				count: 1,
				name: '', //商品名称
				gsize: [], //商品规格
				money: [], //商品价格
				stock: [], //商品库存
				weight: [], //商品净重
				fcosts: [], //运费
				radio: '1', //是否推荐
				//封面图片
				imgs: [], // 图片预览地址
				imgfiles: [], // 图片原文件，上传到后台的数据
				size: 1, // 限制上传数量

				//广告图片
				imgs1: [], // 图片预览地址
				imgfiles1: [], // 图片原文件，上传到后台的数据
				size1: 10, // 限制上传数量

				//详细图片
				imgs2: [], // 图片预览地址
				imgfiles2: [], // 图片原文件，上传到后台的数据
				size2: 20, // 限制上传数量
				options: [],
				options1: [],
				options2: [],


				value1: [],
				value2: [],
				value3: [],

				value4: [], //省份
				value5: [], //城市
				classid: '', //分类id
			}

		},
		computed: {

		}, 
		methods: {
			handle3(val) { //选着省 份
				let obj = {};
				obj = this.provincelist.find((item) => {
					return item.id === val;
				});
				let data = {
					status: 'city',
					province: obj.id
				}
				add6(data).then(res => {
					//console.log(res)
					this.citylist = res.data.data;
					this.value5 = []
					//console.log(this.citylist)
				}).catch(err => {
					console.log(err);
				});
			},
			handle14(val) { //选着城市
				this.cityid = ''
				for (let i = 0; i < val.length; i++) {
					this.cityid += val[i] + ','
				}
				console.log(this.cityid)
			},
			addone() {
				this.sizeadd = []
				for (let i = 1; i <= this.count; i++) {
					this.sizeone = {
						name: this.gsize[i],
						price: this.money[i],
						num: parseInt(this.stock[i]),
						weight: parseInt(this.weight[i]),
						postprice: this.fcosts[i],
					}
					this.sizeadd.push(this.sizeone)

				}
				this.count++
				//this.sizeadd.push(this.sizeone)

				this.gsize[this.count] = ''
				this.money[this.count] = ''
				this.stock[this.count] = ''
				this.weight[this.count] = ''
				this.fcosts[this.count] = ''
				//console.log(this.sizeadd)

			},
			deleteone(item) {
				console.log(item)
				console.log(this.sizeadd[2])
				this.gsize.splice(item, 1)
				this.money.splice(item, 1)
				this.stock.splice(item, 1)
				this.weight.splice(item, 1)
				this.fcosts.splice(item, 1)
				//this.sizeadd.splice(item, 1)
				this.count--
			},
			//封面图片
			fileChange() { // 加入图片
				var _this = this
				var event = event || window.event;
				var file = event.target.files;
				var leng = file.length;
				for (var i = 0; i < leng; i++) {
						var reader = new FileReader(); // 使用 FileReader 来获取图片路径及预览效果
						_this.imgfiles.push(file[i])
						reader.readAsDataURL(file[i]);
						reader.onload = function(e) {
						   // _this.imgs.push(e.target.result); // base 64 图片地址形成预览 
							var data = e.target.result
							var image = new Image()
							image.src = data
							image.onload = function(e){
								//console.log(image.width)
								if(image.width <= 700 || image.height <= 700){
									_this.imgs.push(data); // base 64 图片地址形成预览 
									console.log(image.width)
								}else{
									alert("选的啥玩意，长宽均不能超过700px呢~")
								}
							}
							
						};
						
						/*var reader1 = new FileReader(); // 使用 FileReader 来获取图片路径及预览效果
						_this.imgfiles.push(file[i])
						reader1.readAsDataURL(file[i]);
						reader1.onload = function(e) {
						    _this.imgs.push(e.target.result); // base 64 图片地址形成预览 
						};*/
						
						
				}
				
			},
			del(i) { // 根据下标删除
				this.imgfiles.splice(i, 1)
				this.imgs.splice(i, 1)
			//	console.log(this.imgs)
				//console.log(this.imgfiles)
			},

			//广告图片
			fileChange1() { // 加入图片
				var _this = this
				var event = event || window.event;
				var file = event.target.files
				var leng = file.length;
				for (var i = 0; i < leng; i++) {
					var reader = new FileReader(); // 使用 FileReader 来获取图片路径及预览效果
					_this.imgfiles1.push(file[i])
					reader.readAsDataURL(file[i]);
					reader.onload = function(e) {
					   // _this.imgs.push(e.target.result); // base 64 图片地址形成预览 
						var data = e.target.result
						var image = new Image()
						image.src = data
						image.onload = function(e){
							//console.log(image.width)
							if(image.width <= 750|| image.height <= 650){
								_this.imgs1.push(data); // base 64 图片地址形成预览 
								console.log(image.width)
							}else{
								alert("宽不超过750px,长不超过650px")
							}
						}
						
					};
					
					/*var reader = new FileReader(); // 使用 FileReader 来获取图片路径及预览效果
					_this.imgfiles1.push(file[i])
					reader.readAsDataURL(file[i]);
					reader.onload = function(e) {
						_this.imgs1.push(e.target.result); // base 64 图片地址形成预览                                 
					};*/
				}
			},
			del1(i) { // 根据下标删除
				this.imgfiles1.splice(i, 1)
				this.imgs1.splice(i, 1)
				console.log(this.imgs1)
				console.log(this.imgfiles1)
			},

			//详细图片
			fileChange2() { // 加入图片
				var _this = this
				var event = event || window.event;
				var file = event.target.files;
				var leng = file.length;
				for (var i = 0; i < leng; i++) {
					var reader = new FileReader(); // 使用 FileReader 来获取图片路径及预览效果
					_this.imgfiles2.push(file[i])
					reader.readAsDataURL(file[i]);
					reader.onload = function(e) {
					   // _this.imgs.push(e.target.result); // base 64 图片地址形成预览 
						var data = e.target.result
						var image = new Image()
						image.src = data
						image.onload = function(e){
							//console.log(image.width)
							if(image.width <= 750 && image.height <= 1546){
								_this.imgs2.push(data); // base 64 图片地址形成预览 
								console.log(image.width)
							}else{
								alert("图片宽不超过750px,长不超过1546px")
							}
						}
						
					};
					
					/*var reader = new FileReader(); // 使用 FileReader 来获取图片路径及预览效果
					_this.imgfiles2.push(file[i])
					reader.readAsDataURL(file[i]);
					reader.onload = function(e) {
						_this.imgs2.push(e.target.result); // base 64 图片地址形成预览                                 
					};*/
				}
			},
			del2(i) { // 根据下标删除
				this.imgfiles1.splice(i, 1)
				this.imgs2.splice(i, 1)
				console.log(this.imgs2)
				console.log(this.imgfiles2)
			},
			//主分类
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
					//console.log(res)
					this.options1 = res.data.data;
					//console.log(this.options1)
				}).catch(err => {
					console.log(err);
				});
				this.classid = obj.id;

			},
			//次分类
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
					//console.log(res)
					this.options2 = res.data.data;
					//console.log(this.options2)
				}).catch(err => {
					console.log(err);
				});
				this.classid = obj.id;

				//console.log(obj.id)

			},
			handle2(val) {
				let obj = {};
				obj = this.options2.find((item) => {
					return item.id === val;
				});
				this.classid = obj.id;

			},

			submit() { //发布

				if (this.count == 1) {
					this.sizeadd = [{
						'name': this.gsize[1], //规格
						'price': this.money[1], //价格
						'postprice': this.fcosts[1], //运费
						'num': parseInt(this.stock[1]), //库存
						'weight': parseInt(this.weight[1]), //净重
					}]

				} else {
					//this.gsize1 = this.sizeadd
					this.sizeadd = []
					for (let i = 1; i <= this.count; i++) {
						this.sizeone = {
							name: this.gsize[i],
							price: this.money[i],
							num: parseInt(this.stock[i]),
							weight: parseInt(this.weight[i]),
							postprice: this.fcosts[i],
						}
						this.sizeadd.push(this.sizeone)

					}
				}
				if (this.checked) {
					this.cityid = '0'
				}
				//  console.log(this.sizeadd)
				let data = {
					status: "add",
					cover: this.imgs[0], //封面图片
					ad: this.imgs1, //广告图片
					detail: this.imgs2, //详细图片
					//isshow: parseInt(this.radio), //是否推荐
					name: this.name, //名字
					class: parseInt(this.classid), //分类索引
					size: this.sizeadd,
					city: this.cityid, //城市索引
				}
				if (this.imgs[0] == '') {
					this.$message({
						message: '请添加封面图片',
						type: 'error'
					});
					return;
				}
				if (this.imgs1 == '') {
					this.$message({
						message: '请添加广告图片',
						type: 'error'
					});
					return;
				}
				if (this.imgs2 == '') {
					this.$message({
						message: '请添详细面图片',
						type: 'error'
					});
					return;
				}
				
				add1(data).then(res => {
					if (res.data.msg == 'success') {
						this.$message({
							message: '商品发布成功',
							type: 'success'
						});
						this.imgs = []
						this.imgs1 = []
						this.imgs2 = []
						this.value1 = '请选择'
						this.value2 = '请选择'
						this.value3 = '请选择'
						this.name = []
						this.gsize = [] //规格
						this.money = [] //价格
						this.fcosts = [] //运费
						this.stock = [] //库存
						this.weight = [] //净重
						this.count = 1
						this.checked = true
						this.value4 = "请选择"
						this.value5 = "请选择"
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
			submit1() { //保存
				if (this.count == 1) {
					this.sizeadd = [{
						'name': this.gsize[1], //规格
						'price': this.money[1], //价格
						'postprice': this.fcosts[1], //运费
						'num': parseInt(this.stock[1]), //库存
						'weight': parseInt(this.weight[1]), //净重
					}]

				} else {
					//this.gsize1 = this.sizeadd
					this.sizeadd = []
					for (let i = 1; i <= this.count; i++) {
						this.sizeone = {
							name: this.gsize[i],
							price: this.money[i],
							num: parseInt(this.stock[i]),
							weight: parseInt(this.weight[i]),
							postprice: this.fcosts[i],
						}
						this.sizeadd.push(this.sizeone)

					}
				}
				if (this.checked) {
					this.cityid = '0'
				}
				let data = {
					status: "add",
					del: -1,
					cover: this.imgs[0], //封面图片
					ad: this.imgs1, //广告图片
					detail: this.imgs2, //详细图片
					//isshow: parseInt(this.radio), //是否推荐
					name: this.name, //名字
					class: parseInt(this.classid), //分类索引
					size: this.sizeadd,
					city: this.cityid, //城市索引
				}
				add1(data).then(res => {
					//console.log(res)
					if (res.data.msg == 'success') {
						this.$message({
							message: '商品保存成功',
							type: 'success'
						});
						this.imgs = []
						this.imgs1 = []
						this.imgs2 = []
						this.value1 = '请选择'
						this.value2 = '请选择'
						this.value3 = '请选择'
						this.name = []
						this.gsize = [] //规格
						this.money = [] //价格
						this.fcosts = [] //运费
						this.stock = [] //库存
						this.weight = [] //净重
						this.count = 1
						this.checked = true
						this.value4 = "请选择"
						this.value5 = "请选择"
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
				//console.log(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add {
		width: 100%;
		height: 100%;
		//margin-top: 70px;
		//margin-left: 210px;
		//border: solid red 1px;

		.header {
			position: fixed;
			top: 0;
			z-index: 999;
			width: 100%;
			height: 45px;
			background-color: #5945c8;
			border-radius: 0px 0px 33px 33px;
			display: flex;
			justify-content: center;
			align-items: center;

			h3 {

				//height: 12px;
				font-family: PingFang-SC-Heavy;
				font-size: 20px;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 1px;
				color: #ffffff;
			}

		}

		.content {
			//margin-top: 60px;
			display: flex;
			//margin-left: 200px;

			.content-left {
				//border: #000000 solid 1px;
				width: 40%;
				margin-top: 40px;
				display: flex;
				justify-content: center;

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
							width: 400px;
							height: 400px;
							position: relative;
							border: 1px solid #e6e6e6;
							margin-right: 20px;
							background: #f6f6f6;
							display: inline-block;

							img {
								width: 400px;
								height: 400px;
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
							flex-wrap: wrap;
							justify-content: center;

							a {
								display: flex;
								width: 100%;
								font-size: 20px;
							}
						}

					}
				}
			}

			.content-right {
				margin-left: 4%;
				width: 100%;
				margin-top: 10px;

				.right-form {
					//border: #000000 solid 1px;
					width: 100%;

					.listone {
						display: flex;
						align-items: center;
						width: 100%;
						height: 40px;
						//flex-wrap: wrap;
						margin-bottom: 13px;

						//border: #000000 solid 1px;
						.size {
							//border: #000000 solid 1px;
							display: flex;

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

							input {
								width: 330px;
								height: 30px;
								border: solid 1.5px #dcdcdc;
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

						.classfiy {
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
									/deep/ .el-input__inner {
										height: 30px;
									}

									/deep/ .el-input__icon {
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
						//border: #000000 solid 1px;
						padding: 15px;

						.goodsdata {
							margin: 0 auto;
							width: 85%;
							height: 100%;

							//border:#5945c8 solid 1.5px ;
							.dataheader {
								width: 100%;
								font-size: 15 px;
								display: flex;

								padding: 5px 0;
								color: #4d4d4d;
								justify-content: space-between;


								div {
									width: 16.5%;
									text-align: center;
									//padding: 5px 0;
									height: 100%;
									border: #dcdcdc solid 1px;
									height: 40px;

									input {
										height: 100%;
										border: none;
										//border: #eee solid 1px;
										padding: 0;
										text-align: center;
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
									//padding: 5px 0;
									//background: #00A854;
								}
							}

							.a {
								div {
									display: flex;
									align-items: center;
									justify-content: space-around;
									font-size: 18px;
								}

								//border-top: solid 1px #5945c8;
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
							width: 15%;
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
