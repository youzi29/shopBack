<template>
	<!--商品分类添加-->
	<div class="add" style="width: 75% ; height: 95%;">
		<h3><div class="close"><i class="el-icon-close" @click="colse()"></i></div></h3>
		<!-- <div class="header">
			<h3>商品分类修改</h3>
		</div> -->
		<div class="content">
			<div class="content-left">
				
			</div>
			<div class="content-right">
				<div class="right-form">
				    <div class="listtwo">
						<label>分类图片:</label>
						<div class="listtwo-pic">
							<div class="img-files">
								<div v-if='imgs1.length>0'>
									<div class="img-box" v-for="(item, i) in imgs1" :key='i'>
										<img :src="item" alt=""> <span @click="del1(i)"><i class="el-icon-delete"></i></span>
									</div>
								</div>
								<div class="img-file" v-if='imgs1.length < size1'>
									<input type="file" id='files1' @change='fileChange1'>
									
									<label for="files1">
										<div v-show="change">
											<img :src="goodsinfo.img" alt="">
											<em @click="delete1()"><i class="el-icon-delete"></i>
											</em> 
										</div>
										
										 <span v-show="!change">
											<i class="el-icon-plus"></i>
										</span> 
									</label>
								</div>
							</div>
							
						</div>
					</div>
					
					
				    <div class="listone">
				    	<label>分类名称:</label>
				    	<input placeholder="请输入商品名称" v-model="name"><em></em>
				    </div>
					 <div class="listone">
						<label>上级分类:</label>
					    <div class="listone-class" >
					    	<!-- <label class="listone1">主分类</label> -->
					    	<span>
					    		<el-select v-model="value1" :placeholder="first || child" @change="handle" @focus="getdata">
					    			<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
					    			</el-option>
					    		</el-select>
					    	</span>
					    </div>
					    
					    <div class="listone-class" v-if="first" >
					    	<!-- <label class="listone1">次分类</label> -->
					    	<span>
					    		<el-select v-model="value2" :placeholder="child" @change="handle1" @focus="getdata1">
					    			<el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id">
					    			</el-option>
					    		</el-select>
					    	</span>
					    </div>
					</div> 
					<div class="listfour">
						<button @click="submit()"><span>确认保存</span></button>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import {
		add1 , add2
	} from '@/api/index.js'
	export default {
		name: 'add',
		props:['id'] ,  
		created() {
			 let data = {
			 	status: 'searchOne',
			 	id: this.id
			 }
			 add2(data).then(res => {
			 	this.goodsinfo = res.data.data;
			 	this.name= this.goodsinfo.name;
			 	this.first = this.goodsinfo.first;
			 	this.firstId = this.goodsinfo.firstId;
			 	this.child = this.goodsinfo.parent;
				this.childId = this.goodsinfo.parentId
			 	console.log(this.goodsinfo)
			 }).catch(err => {
			 	console.log(err);
			 });
		},
		mounted() {	
				
			 let data={
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
				console.log(this.id)
		},
		data() {
			return {
				goodsinfo:'',//商品信息
				first:'',
				firstId:'',
				child:'',
				childId:'',
				name:'',//分类图片
				cid:'',//商品分类id
				change: true,//更换图片
				//广告图片
				imgs1: [], // 图片预览地址
				imgfiles1: [], // 图片原文件，上传到后台的数据
				size1: 1, // 限制上传数量
				
			
				options:[],
				options1:[],
			
				
				value1: [],
				value2: [],
			

			}

		},
		methods: {
			colse(){//关闭商品修改
			   // this.show = false;
				this.$emit('childevent')
				
			},
			delete1(){
				this.change =false;
				console.log(12)
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
					_this.imgs1.push(e.target.result); // base 64 图片地址形成预览                                 
					};
				}
			},
			del1(i) { // 根据下标删除
				this.imgfiles1.splice(i, 1)
				this.imgs1.splice(i, 1)
				console.log(this.imgs1)
				console.log(this.imgfiles1)
			},
			getdata(){//获得主分类的数据
				let data = {
					status: 'searchFirst'
				}
				add2(data).then(res => {
					console.log(res)
					this.options = res.data.data;
					this.options1='';
					console.log(this.options)
				}).catch(err => {
					console.log(err);
				});				
			},
			getdata1(){//获得主分类的数据
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
				 let data={
				 	status: 'searchOther',
				 	id: obj.id 
				 }
				 add2(data).then(res => {
					 this.first = true;
					 this.child = "请选择"
				 	console.log(res)
				 	this.options1 = res.data.data;
				 	console.log(this.options1)
				 }).catch(err => {
				 	console.log(err);
				 });
			     this.firstId = obj.id;
			},
			handle1(val) {
				let obj = {};
				obj = this.options1.find((item) => {
					return item.id === val;
				});
				 this.childId = obj.id;
			},
			submit(){//确认保存
				let data = {
					status: "update",
					name: this.name,
					id:this.id,
					pid: this.childId,
					img: this.imgs1[0]
				}
				console.log(data)
				 add2(data).then(res => {
					 let msg =res.data.msgText
				 if(res.data.msg == "success"){
					 this.$message({
					 	type: 'success',
					 	message: '修改成功'
					 });
					 this.show = false;
					 this.$emit('childevent' , this.id)
					 console.log(res.data.msg)
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
	.add {
		
		background: url(./image/bj11.jpg);
		background-size: cover;
		//position: absolute;
		//top: 0;
		//z-index: 0;
		width: 75%;
		height:95%;
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
			margin-top: 60px;
			display: flex;

			.content-left {
				width: 45%;
				margin-top: 40px;

				
			}

			.content-right {
				margin-left: 5%;
				margin-top: 50px;

				.right-form {
					.listone {
						display: flex;
						align-items: center;
						width: 100%;
						height: 40px;
						flex-wrap: wrap;
						margin-bottom: 23px;
						

						label {
							display: flex;
							justify-content: space-between;
							width: 90px;
							//height: 17px;
							font-family: PingFang-SC-Heavy;
							font-size: 17px;
							font-weight: normal;
							font-stretch: normal;
							//line-height: 70px;
							letter-spacing: 1px;
							color: #4d4d4d;
							//border: #000000 solid 1px;
							
							
							i{
								//margin-left: 12px;
								display: flex;
								width: 100%;
								justify-content: space-between;
								
							}
						}
						em{
							display: flex;
							margin-left: 12px;
						}

						input {
							width: 330px;
							height: 35px;
							border: solid 1.5px #dcdcdc;
							padding-left: 6px;
							background: rgb(245,245,245);
							//margin-right: 12px;
						}
						
						.listone-class{
							display: flex;
							width: 200px;
							height: 40px;
							align-items: center;
							margin-right:15px ;
							//border: #000000 solid 1px;
							.listone1 {
								display: flex;
								width: 120px;
								align-items: center;
								font-family: PingFang-SC-Medium;
								font-size: 14px;
								font-weight: normal;
								font-stretch: normal;
								letter-spacing: 1px;
								color: #666666;
								height: 40px;
							}
							
							span {
								display: flex;
								width: 250px;
								height: 30px;
								//border: #dcdcdc solid 1.5px;
								/deep/ .el-input__inner{
									background:  rgb(245,245,245);
								}
							}
							
						}

						

					}
				    .listtwo{
						display: flex;
						width: 100%;
						margin-bottom: 23px;
						align-items: flex-start;
						align-content: flex-start;
						//border: #000000 solid 1px;
						label{
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
						.listtwo-pic{
							.img-files {
								//width: 660px;
								//border: #005C5F solid 1px;
								//margin: 0 auto;
								display: flex;
								//align-items: center;
								div{
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
										//border: #000000 solid 1px;
										//height: 140px;
										width: 140px;
										div{
											img{
												height: 140px;
												width: 140px;
											}
											em{
												position: absolute;
												//top: -3px;
												right: 5px;
												color: red;
												font-size: 20px;
												//width: 100%;
												//border: #000000 solid 1px;
												//display: none
											}
										}
										
									}
								
								}
							}
						}
					}
				    .listthree{
						display: flex;
						align-items: center;
						margin-bottom: 23px;
						label{
							
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
						.listone-check{//是否推荐
							display: flex;
							//margin-left: 5px;
							.check-one{
								margin-left: 10px;
								margin-right: 15px;
								/deep/ .el-radio__input.is-checked .el-radio__inner{
									border-color: #5945c8;
									    background: #5945c8;
								}
								/deep/ .el-radio__input.is-checked+.el-radio__label{
									color: #5945c8;
								}
							}
							
						}
					}
				    .listfour{
						//width: 100%;
						//text-align: center;
						margin-top: 130px;
						button{
							width: 230px;
							height: 40px;
							background-color: #5945c8;
							border: none;
							span{
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
