<template>
	<div class="add">
		<h3><div class="close"><i class="el-icon-close" @click="colse()"></i></div></h3>
		<div class="content">
			<div class="content-left">
				<div class="img-files">
					<div v-if='imgs.length>0'>
						<div class="img-box" v-for="(item, i) in imgs" :key='i'>
							<img :src="item" alt=""> <!-- <span @click="del(i , goodsinfo.coverId)"><i class="el-icon-delete"></i></span> -->
						</div>
					</div>
					<div class="img-file" v-if='imgs.length < size'>
						<input type="file" id='files' @change='fileChange'>
						<label for="files">
							<span>
								<i class="el-icon-plus"></i>
								<a>封面图片</a>
							</span>
						</label>
					</div>

				</div>
			</div>
			<div class="content-right">
				<div class="right-form">
					<div class="listone">
						<label>商品名称:</label>
						<textarea placeholder="请输入商品名称" v-model="name"></textarea>
					</div>
					<div class="listone">
						<label>商品分类:</label>
						<div class="classfiy">
							<div class="listone-class">
								<label class="listone1">主分类</label>
								<span>
									<el-select v-model="value1" :placeholder="chose1" @change="handle" @focus="getdata">
										<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</span>
							</div>

							<div class="listone-class">
								<label class="listone1">次分类</label>
								<span>
									<el-select v-model="value2" :placeholder="chose2" @change="handle1">
										<el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</span>
							</div>

							<div class="listone-class">
								<label class="listone1">再次分类</label>
								<span>
									<el-select v-model="value3" :placeholder="chose3" @change="handle2">
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
										<img :src="item.url" alt=""> <!-- <span @click="del1(i , item.id)"><i class="el-icon-delete"></i></span> -->
									</div>
								</div>
								<div class="img-file" v-if='imgs1.length < size1'>
									<input type="file" id='files1' @change='fileChange1'>
									<label for="files1">
										<span>
											<i class="el-icon-plus"></i>

										</span>
									</label>
								</div>

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
						<button @click="submit"><span>发布</span></button>
						<button @click="save()"><span>保存</span></button>
					</div>
				</div>
			</div>
			<div class="goodssize">
				<div class="goodsdata">
					<div class="dataheader a">
						<div class="only">商品规格/尺寸</div>
						<div>协议价格</div>
						<div>京东价格</div>
						<div>洗护价格</div>
						<div>净重量</div>
						<!-- <div>运费</div> -->
						<div class="last">
							<!-- <i class="el-icon-plus" @click="addone()"></i> -->
							操作
						</div>
					</div>
					<div class="dataheader" v-for="item in count">
						<div  class="only"><textarea v-model="gsize[item-1]" placeholder="规格/尺寸"></textarea></div>
						<div><input v-model="money[item-1]" placeholder="协议价格"></div>
						<div><input v-model="JDprice[item-1]" placeholder="京东价格"></div>
						<div><input v-model="washprice[item-1]" placeholder="请输入洗护价格"></div>
						<div><input v-model="weight[item-1]" placeholder="净重量"></div>
						<!-- <div><input v-model="fcosts[item]" placeholder="运费"></div> -->
						<div class="last">
							<!-- <i class="el-icon-minus" @click="deleteone(item)"></i> -->
							<button @click="deleteone(item)">删除</button>
						</div>
					</div>
				</div>
			</div>
			<div  style="width: 50%;margin: 0 auto;" v-html="goodsdetail"></div>
		</div>
	</div>

</template>

<script>
	import {
		add1,
		add2,
		getProduct
	} from '@/api/index.js'
	export default {
		name: 'add',
		props: ['id'],
		mounted() {
			this.getdatail()
			this.getsize()
			//console.log(this.id)
			let data1 = { //主分类
				status: 'searchFirst'
			}
			add2(data1).then(res => {
				//console.log(res)
				this.options = res.data.data;
				//console.log(this.options)
			}).catch(err => {
				console.log(err);
			});
		},
		data() {
			return {
				dialogVisible: false, //添加商品信息
				dialogVisible1: false, //修改商品信息
				goodsinfo: '',
				goodssize: '',
				goodsad: '',
				goodsdetail: '',
				chose1: '请选择',
				chose2: '请选择',
				chose3: '请选择',

				name: '', //商品名称
				count: 0,
				gsize: [], //商品规格
				money: [], //协议价格
				JDprice: [], //京东价格
				washprice:[],//洗护价格
				Jid:[],
				Jimg:[],
				weight: [], //商品净重
				fcosts: [], //运费
				radio: '1', //是否推荐
				//封面图片

				imgs: [], // 图片预览地址
				imgfiles: [], // 图片原文件，上传到后台的数据
				size: 1, // 限制上传数量

				//广告图片
				imgs1: [], // 图片预览地址
				imgs1_1: [],
				imgfiles1: [], // 图片原文件，上传到后台的数据
				size1: 1, // 限制上传数量

				
				options: [],
				options1: [],
				options2: [],


				value1: [],
				value2: [],
				value3: [],
				classid: '', //分类id
			}

		},
		methods: {
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
						/*this.goodscover = res.data.data.img
						this.goodsinfo = res.data.data;
						this.goodsad =this.goodsinfo.introduction
						console.log(this.goodsad)*/
						
						    this.goodsinfo = res.data.data;
							this.goodssize = this.goodsinfo.size;
							//console.log(this.goodssize)
							this.goodsad = this.goodsinfo.ad;
							this.goodsdetail = this.goodsinfo.introduction;
							this.name = this.goodsinfo.name;
							
							this.imgs = []
							this.imgs1 = []
							
						
							//this.imgs = this.goodsinfo.cover
							this.imgs.push(this.goodsinfo.img)
						    //console.log(res.data.data.img)
							for (let i = 0; i < this.imgs.length; i++) {
								//this.imgs1.push(this.goodsinfo.ad[i].url)
								this.imgs1.push({
									'url': this.imgs[i],
								})
								this.imgs1_1.push(this.imgs[i],)
								
							}
							
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
						//console.log(res)
						this.goodssize = res.data.data
						this.count = this.goodssize.length
						this.sizeadd = this.goodssize
						for( let i = 0 ; i < this.count ; i++){
							this.gsize.push(this.goodssize[i].pname)
							this.money.push(this.goodssize[i].price)
							this.JDprice.push(this.goodssize[i].JDprice)
							this.washprice.push('')
							this.weight.push(this.goodssize[i].weight)
							this.Jid.push(this.goodssize[i].id)
							this.Jimg.push(this.goodssize[i].img)
						}
						console.log(this.goodssize)
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
			deleteone(item) {
				console.log(this.money[item-1])
				this.gsize.splice(item-1, 1)
				this.money.splice(item-1, 1)
				this.JDprice.splice(item-1, 1)
				this.weight.splice(item-1, 1)
				this.washprice.splice(item-1,1)
				this.Jimg.splice(item-1 , 1)
				this.count--
			},
            submit() { //发布
            
            	if (this.count == 1) {
            		this.sizeadd = [{
            			'name': this.gsize[1], //规格
            			'price': parseInt(this.JDprice[1]), //京东价格
						'wprice': this.money[1], //协议价格
						'washprice' : this.washprice[1],//洗护价格
            			'weight': parseInt(this.weight[1]), //净重
						'Jid':parseInt(this.Jid[1]),
						'img':this.Jimg[1],
            		}]
            
            	} else {
            		//this.gsize1 = this.sizeadd
            		this.sizeadd = []
					
            		for (let i = 1; i <= this.count; i++) {
            			this.sizeone = {
            				name: this.gsize[i-1],
            				wprice: this.money[i-1],
            				price: +this.JDprice[i-1],
							washprice : +this.washprice[i-1],//洗护价格
            				weight: +this.weight[i-1],
							Jid:parseInt(this.Jid[i-1]),
							img:this.Jimg[i-1],
            			}
            			this.sizeadd.push(this.sizeone)
            		}
            	}
            	
            	let data = {
            		status: "addJingDong",
            		cover: this.imgs[0], //封面图片
            		ad: this.imgs1_1, //广告图片
            		detail: this.goodsdetail, //详细图片
            		//isshow: parseInt(this.radio), //是否推荐
            		name: this.name, //名字
            		class: parseInt(this.classid), //分类索引
            		size: this.sizeadd,
            	}
				console.log(data)
				for(let i =0 ; i < this.sizeadd.length ; i++){
					if(this.sizeadd[i].washprice == ''){
						alert("请填入洗护价格")
						return
					}
				}
            	/*if (this.imgs[0] == '') {
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
            	}*/
            	
            	add1(data).then(res => {
            		if (res.data.msg == 'success') {
            			this.$message({
            				message: '商品发布成功',
            				type: 'success'
            			});
						this.colse()
            			this.imgs = []
            			this.imgs1 = []
            			this.goodsdetail = ''
            			this.value1 = '请选择'
            			this.value2 = '请选择'
            			this.value3 = '请选择'
            			this.name = []
            			this.gsize = [] //规格
            			this.money = [] //价格
            			this.JDprice = [] //库存
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
			save() { //保存
			
				if (this.count == 1) {
					this.sizeadd = [{
						'name': this.gsize[1], //规格
						'price': this.money[1], //商品价格
						'washprice': parseInt(this.JDprice[1]), //京东价格
						'weight': parseInt(this.weight[1]), //净重
						'Jid':parseInt(this.Jid[1]),
						 'img':this.Jimg[1],
					}]
			
				} else {
					//this.gsize1 = this.sizeadd
					this.sizeadd = []
					
					for (let i = 1; i <= this.count; i++) {
						this.sizeone = {
							name: this.gsize[i-1],
							price: this.money[i-1],
							washprice: parseInt(this.JDprice[i-1]),
							weight: +this.weight[i-1],
							Jid:parseInt(this.Jid[i-1]),
							img:this.Jimg[i-1],
						}
						this.sizeadd.push(this.sizeone)
					}
				}
				
				let data = {
					status: "addJingDong",
					cover: this.imgs[0], //封面图片
					ad: this.imgs1_1, //广告图片
					detail: this.goodsdetail, //详细图片
					//isshow: parseInt(this.radio), //是否推荐
					name: this.name, //名字
					class: parseInt(this.classid), //分类索引
					size: this.sizeadd,
					del: -1,
				}
				console.log(data)
				add1(data).then(res => {
					if (res.data.msg == 'success') {
						this.$message({
							message: '商品保存成功',
							type: 'success'
						});
						this.colse()
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
			
			
			//封面图片
			fileChange() { // 加入图片
				var _this = this
				var event = event || window.event;
				var file = event.target.files
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
					
					/*var reader = new FileReader(); // 使用 FileReader 来获取图片路径及预览效果
					_this.imgfiles.push(file[i])
					reader.readAsDataURL(file[i]);
					reader.onload = function(e) {
						_this.imgs.push(e.target.result);
					};*/
				}
			},
			del(i, id) { // 根据下标删除
				// this.imgfiles.splice(i, 1)
				// this.imgs.splice(i, 1)
				// console.log(id)
				let flag = 1 
				if(flag == 1){
					this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let data = {
							status: 'deleteImg',
							id: this.id,
							imgid: id
						}
						add1(data).then(res => {
							console.log(res.data)
							if (res.data.msg == "success") {
								this.imgfiles.splice(i, 1)
								this.imgs.splice(i, 1)
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
					
							} else {
								this.$message({
									type: 'success',
									message: '删除失败!'
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
					this.flag = 2
				}else{
				    this.imgfiles.splice(i, 1)
				     this.imgs.splice(i, 1)
				    console.log(id)
				}

				
				//console.log(this.imgs1)
				//console.log(this.imgfiles1)
			},

			//广告图片
			fileChange1() { // 加入图片
				var _this = this
				var event = event || window.event;
				var file = event.target.files
				var leng = file.length;
				for (var i = 0; i < leng; i++) {
					/*var reader = new FileReader(); // 使用 FileReader 来获取图片路径及预览效果
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
							_this.imgs1.push({
								'url': data
							}); // base 64 图片地址形成预览    
							_this.imgs1_1.push(data);
								console.log(image.width)
							}else{
								alert("宽不超过750px,长不超过650px")
							}
						}
						
					};*/
					
					var reader = new FileReader(); // 使用 FileReader 来获取图片路径及预览效果
					_this.imgfiles1.push(file[i])
					reader.readAsDataURL(file[i]);
					reader.onload = function(e) {
						_this.imgs1.push({
							'url': e.target.result
						}); // base 64 图片地址形成预览    
						_this.imgs1_1.push(e.target.result);
					};
				}
			},
			del1(i, id) { // 根据下标删除
				// this.imgfiles1.splice(i, 1)
				// this.imgs1.splice(i, 1)
				let flag = 1
				if(flag == 1){
					this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let data = {
							status: 'deleteImg',
							id: this.id,
							imgid: id
						}
						add1(data).then(res => {
							if (res.data.msg == "success") {
								this.imgfiles1.splice(i, 1)
								this.imgs1.splice(i, 1)
								this.$message({
									type: 'success',
									message: '删除成功!'
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
					this.flag = 2
				}else{
					this.imgfiles1.splice(i, 1)
					this.imgs1.splice(i, 1)
				}

				
				//console.log(this.imgs1)
				//console.log(this.imgfiles1)
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
								_this.imgs2.push({
									'url': data
								}); // base 64 图片地址形成预览
								_this.imgs2_2.push(data);
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
						_this.imgs2.push({
							'url': e.target.result
						}); // base 64 图片地址形成预览
						_this.imgs2_2.push(e.target.result);
					};*/
				}
			},
			del2(i, id) { // 根据下标删除
				// this.imgfiles1.splice(i, 1)
				// this.imgs2.splice(i, 1)
				let flag = 1;
				if(flag == 1){
					this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let data = {
							status: 'deleteImg',
							id: this.id,
							imgid: id
						}
						add1(data).then(res => {
							if (res.data.msg == "success") {
								this.imgfiles2.splice(i, 1)
								this.imgs2.splice(i, 1)
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
					
							} else {
								this.$message({
									type: 'error',
									message: '删除失败!'
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
					this.flag = 2
				}else{
					this.imgfiles2.splice(i, 1)
					this.imgs2.splice(i, 1)
				}

				
				//console.log(this.imgs2)
				//console.log(this.imgfiles2)
			},
			getdata() { //获得主分类的数据
				let data = {
					status: 'searchOther',
					id: this.firstId
				}
				add2(data).then(res => {
					console.log(res)
					this.options1 = res.data.data;
					console.log(this.options1)
				}).catch(err => {
					console.log(err);
				});
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
					if (res.data.msg == "success") {
						//console.log(res)
						this.options1 = res.data.data;
						this.chose2 = "请选择"
					} else {
						this.options1 = res.data.data;
						this.chose2 = "无数据"
					}

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
					if (res.data.msg == "success") {
						this.options2 = res.data.data;
						this.chose3 = "请选择"
					}
					//console.log(res)

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

		}
	}
</script>

<style lang="scss" scoped>
	.add {
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
				margin-top: 10px;

				.right-form {
					//border: #000000 solid 1px;
					width: 100%;

					

					.listone {
						display: flex;
						align-items: center;
						width: 100%;
						//height: 40px;
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

							textarea {
								width: 400px;
								height: auto;
								word-wrap: wrap;
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

						textarea {
							width: 100%;
							height: 50px;
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
							margin-right: 10px;

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
		    .goodssize {
		    	width: 88.2%;
		    	margin-bottom: 20px;
		    	padding: 15px;
		        margin: 10px auto;
		    	.goodsdata {
		    		margin: 0 auto;
		    		//width: 85%;
		    		height: 100%;
		    		border: solid 1.5px #5945c8;
		    
		    		.dataheader {
		    			width: 100%;
		    			display: flex;
						flex:1;
		    			font-size: 15px;
		    			//padding: 5px 0;
		    			color: #4d4d4d;
						border-bottom: #5945c8 solid 1px;
		    			justify-content: space-around;
						.only{
							width: 35%;
						}
						.last{
							width: 10%;
						}
		    
		    			div {
		    				width: 15%;
		    				text-align: center;
		    				padding: 5px 0;
		    				display: flex;
		    				align-items: center;
		    				padding-left: 5px;
							//border: #000000 solid 1px;
		    
		    				span {
		    					color: red;
		    					font-size: 20px;
		    					//margin-left: 10%;
		    					display: inline-block;
		    					//width: 23%;
		    					//border: #000000 solid 1px;
		    				}
		    
		    				em {
		    					color: #646566;
		    					width: 23%;
		    					font-size: 20px;
		    					display: inline-block;
		    					//border: #000000 solid 1px;
		    				}
		    				textarea{
		    					 cursor: pointer;
								width: 100%;
		    					//width: 220px;
		    					//border: none;
		    					 padding: 5px;
		    					 resize:none;
								 border: none;
								 overflow-y: hidden;
		    				}
		    				input{
		    					//height: 120px;
								border: none;
								 padding: 5px;
								 cursor: pointer;
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
						button {
							font-size: 17px;
							font-family: PingFang-SC-Bold;
							color: #5945c8;
							background: #5945c847;
							border: none;
							border-radius: 15px;
							white-space: 10px;
							letter-spacing: 2px;
							padding: 2px 15px;
							font-weight: 500;
							//margin-top: 10px;
						}
		    		}
		    
		    		.a {
		    			border-top: solid 1px #dcdcdc;
		    		}
		    	}
		    }
		}

		.addsize {
			margin-bottom: 15px;
			display: flex;
			height: 30px;
			align-items: center;

			input {
				height: 30px;
				width: 80%;
				padding-left: 10px;
			}
		}
	}
</style>
