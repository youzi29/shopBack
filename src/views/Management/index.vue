<template>
	<!--没有用到-->
	<div class="management">
		<h3>商品管理</h3>
		<div class="plus" v-if="0">
			<div class="plus-block">
				<div>
					<i class="el-icon-plus"></i>
					<span>添加商品</span>
				</div>
			</div>
		</div>
		<div class="goods-data">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="date" label="日期" width="150">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="province" label="省份" width="180">
				</el-table-column>

				<el-table-column prop="address" label="地址" width="350">
				</el-table-column>
				<el-table-column prop="zip" label="邮编" width="170">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination @size-change="handleSizeChange" background layout="prev, pager, next" :total="1000">
			</el-pagination>
		</div>

		<div class="img-files">
			<div v-if='imgs.length>0' >
				<div class="img-box" v-for="(item, i) in imgs" :key='i'>
					<img :src="item" alt=""> <span @click="del(i)"><i class="el-icon-delete"></i></span>
				</div>
			</div>
			<div class="img-file" v-if='imgs.length < size'>
				<input type="file" id='files' @change='fileChange'>
				<label for="files">上传图片</label>
			</div>
			<button @click="updata()">提交</button>
		</div>


	</div>
</template>

<script>
	export default {
		methods: {
			handleClick(row) {
				console.log(row);
			},
			handleSizeChange(val) {
				console.log(val)
			},
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
						_this.imgs.push(e.target.result); // base 64 图片地址形成预览                                 
					};
				}
			},
			del(i) { // 根据下标删除
				this.imgfiles.splice(i, 1)
				this.imgs.splice(i, 1)
				console.log(this.imgs)
				console.log(this.imgfiles)
			},
			updata(){
				console.log(this.imgs)
			}


		},

		data() {
			return {
				imgs: [], // 图片预览地址
				imgfiles: [], // 图片原文件，上传到后台的数据
				size: 5, // 限制上传数量

				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-04',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1517 弄',
					zip: 200333
				}, {
					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1519 弄',
					zip: 200333
				}, {
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333
				}]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.management {
		width: 100%;

		h3 {
			margin: 18px auto;
			text-align: center;
		}

		.plus {
			margin-top: 30px;
			display: flex;
			justify-content: center;

			.plus-block {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 450px;
				height: 250px;
				border: #E7E4EB 3px dotted;

				div {


					font-size: 40px;
					color: #E7E4EB;

					i {
						text-align: center;
						display: flex;
						justify-content: center;
					}

					span {

						font-size: 18px;
						display: flex;
						justify-content: center;
						text-align: center;
						width: 80px;
					}
				}
			}


		}

		.goods-data {
			width: 85%;
			margin: 0 auto;


		}

		.pagination {
			text-align: center;
			margin-top: 12px;
		}
	}

	.img-files {
		//width: 660px;
		border: #005C5F solid 1px;
		//margin: 0 auto;
		display: flex;
		align-items: center;
		div{
			display: inline-block;
			border: #000088 solid 2px;
			//width: 100%;
			.img-box {
				width: 160px;
				position: relative;
				border: 1px solid #e6e6e6;
				margin-right: 20px;
				background: #f6f6f6;
				display: inline-block;
			
				img {
					width: 160px;
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
			height: 160px;
			width: 160px;
			//display: inline-flex;
			align-items: center;
			font-size: 30px;
			text-align: center;
			border: 1px #333 dashed;
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
				color: #333;
			}
		
		}
	}

	

	
</style>
