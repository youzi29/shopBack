<template>
	<div class="address">
		
		<div class="goodssize">
			<div class="goodsdata">
				<div class="dataheader">
					<div>发件人</div>
					<div>手机号</div>
					<div>省份</div>
					<div>城市</div>
					<div>详细地址</div>
					<div>门牌号</div>
					<div>操作</div>
				</div>
				
				<div class="dataheader a" v-for="(item , index) in addresslist" >
					<div @click="sureaddress(item)"><span class="defaut">{{item.default ? '默认' : ''}}</span>{{item.name}}</div>
					<div @click="sureaddress(item)">{{item.mobile}}</div>
					<div @click="sureaddress(item)">{{item.province}}</div>
					<div @click="sureaddress(item)">{{item.city}}</div>
					<div @click="sureaddress(item)">{{item.address}}</div>
					<div @click="sureaddress(item)">{{item.number}}</div>
					<div><em class="el-icon-edit" @click="edit(item.id, item.name, item.mobile , item.province, item.city , item.address , item.number , item.default)"></em>
						<span class="el-icon-delete" @click="detele(item.id)"></span></div>
				</div>
				<div class="dataheader a">
					<i class="el-icon-plus" @click="addressadd()"></i>
				</div>
			</div>
		</div>
		
		<el-dialog title="添加新地址" :visible.sync="dialogVisible" width="30%">
			<!--添加地址-->
			<div class="addsize">
				<label>省份：</label>
				<el-select v-model="value" :placeholder="chose" @change="handle">
					<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
					</el-option>
				</el-select>
			</div>
			<div class="addsize">
				<label>城市：</label>
				<el-select v-model="value1" :placeholder="chose1" @change="handle1">
					<el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
					</el-option>
				</el-select>
			</div>
			<div class="addsize">
				<label>详细地址：</label><input placeholder="请输入详细地址" v-model="address" />
			</div>
			<div class="addsize">
				<label>门牌号：</label><input placeholder="请输入门牌号(非必填)" v-model="number">
			</div>
			<div class="addsize">
				<label>发件人：</label><input placeholder="请输入发件人" v-model="name" />
			</div>
			<div class="addsize">
				<label>手机号：</label><input placeholder="请输入手机号" v-model="mobile">
			</div>
			<div class="addsize">
				<label>默认地址:</label>
				<div class="check-one">
					<el-radio v-model="radio" label="1">是</el-radio>
				</div>
				<div class="check-one">
					<el-radio v-model="radio" label="0">否</el-radio>
				</div>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleClose">提交</el-button>
			</span>
		</el-dialog>

		<el-dialog title="修改地址" :visible.sync="dialogVisible1" width="30%">
			<!--添加商品信息-->
			<div class="addsize">
				<label>省份：</label>
				 <el-select v-model="value" :placeholder="chose"  @change="handle">
				    <el-option
				      v-for="item in options"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id"
				      :disabled="item.disabled">
				    </el-option>
				  </el-select> 
				
			</div>
			<div class="addsize">
				<label>城市：</label>
				<el-select v-model="value1" :placeholder="chose1" @change="handle1">
					<el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
					</el-option>
				</el-select>
			</div>
			<div class="addsize">
				<label>详细地址：</label><input placeholder="请输入详细地址" v-model="address" />
			</div>
			<div class="addsize">
				<label>门牌号：</label><input placeholder="请输入门牌号(非必填)" v-model="number">
			</div>
			<div class="addsize">
				<label>发件人：</label><input placeholder="请输入发件人" v-model="name" />
			</div>
			<div class="addsize">
				<label>手机号：</label><input placeholder="请输入手机号" v-model="mobile">
			</div>
			<div class="addsize">
				<label>默认地址:</label>
				<div class="check-one">
					<el-radio v-model="radio" label="1">是</el-radio>
				</div>
				<div class="check-one">
					<el-radio v-model="radio" label="0">否</el-radio>
				</div>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="handleClose1">提交</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		add6
	} from '@/api/index.js'
	export default {
		mounted() {
			this.tokendata()
			let data = {
				status: 'province'
			}
			
			add6(data).then(res => {
				if (res.data.msg == 'success') {
					this.options = res.data.data
					console.log(this.options)
				} else {
					console.log(res.data.msg)
				}
			
			}).catch(err => {
				console.log(err);
			});
		},
		data() {
			return {
				addresslist: '',
				dialogVisible: false,
				dialogVisible1: false,
				//options:'',
				value: '', //省份
				options1: '',
				value1: '', //城市
				cityid: '',
				address: '',
				number: '',
				mobile: '',
				name: '',
				chose: '请选择',
				chose1: '请选择',
				radio: '1',
				addressid: '',
				
			}
		},
		methods: {
			tokendata() {
				let data = {
					status: 'searchList'
				}
				add6(data).then(res => {
					if (res.data.msg == 'success') {
						this.addresslist = res.data.data
						console.log(res)
					} else {
						console.log(res.data.msg)
					}

				}).catch(err => {
					console.log(err);
				});
			},
			sureaddress(id) { //确定发件人地址
				this.$emit('eventchild', id)
			},
			addressadd() {
				this.name = ""
				this.mobile = ""
				this.value = "请选择"
				this.value1 = "请选择"
				this.address = ""
				this.number = ""
				this.radio = '1'
				this.dialogVisible = true
				let data = {
					status: 'province'
				}
				//alert(111)
				add6(data).then(res => {
					if (res.data.msg == 'success') {
						this.options = res.data.data
						console.log(this.options)
					} else {
						console.log(res.data.msg)
					}

				}).catch(err => {
					console.log(err);
				});
			},

			handle(val) { //选着省 份
				let obj = {};
				obj = this.options.find((item) => {
					return item.id === val;
				});
				let data = {
					status: 'city',
					province: obj.id
				}
				add6(data).then(res => {
					//console.log(res)
					this.options1 = res.data.data;
					this.value1 = "请选择"
					//console.log(this.options1)
				}).catch(err => {
					console.log(err);
				});
			},
			handle1(val) { //选着城市
				let obj = {};
				obj = this.options1.find((item) => {
					return item.id === val;
				});
				this.cityid = obj.id
			},
			handleClose() { //添加地址
				if (this.cityid == '') {
					this.$message({
						message: '请选择省市',
						type: 'warning'
					});
					return;
				}
				if (this.address == '') {
					this.$message({
						message: '请填写详细地址',
						type: 'warning'
					});
					return;
				}
				if (this.name == '') {
					this.$message({
						message: '请填写你的名字',
						type: 'warning'
					});
					return;
				}
				if (this.mobile == '') {
					this.$message({
						message: '请填写手机号',
						type: 'warning'
					});
					return;
				}
				let data = {
					status: 'add',
					city: this.cityid,
					address: this.address,
					number: this.number,
					mobile: this.mobile,
					name: this.name,
					default: parseInt(this.radio),
				}
				add6(data).then(res => {
					console.log(res.data.msg)
					if (res.data.msg == "success") {
						this.$message({
							message: '添加成功',
							type: 'success'
						});
						this.name = ""
						this.mobile = ""
						this.chose = "请选择"
						this.chose1 = "请选择"
						this.address = ""
						this.number = ""
						this.radio = '1'
						this.dialogVisible = false
						this.tokendata()
					} else {
						this.$message.error('添加失败');
					}

					//console.log(this.options1)
				}).catch(err => {
					console.log(err);
				});
			},
			edit(id, name, mobile, province, city, address, number, default1) {
				this.addressid = id
				this.name = name
				this.mobile = mobile
				this.chose = province
				this.chose1 = city
				this.address = address
				this.number = number
				this.dialogVisible1 = true
				this.radio = default1.toString()

				let data = {
					status: 'province'
				}
				add6(data).then(res => {
					if (res.data.msg == 'success') {
						this.options = res.data.data
					} else {
						console.log(res.data.msg)
					}

				}).catch(err => {
					console.log(err);
				});
			},
			handleClose1() { //修改地址
				let data = {
					status: 'update',
					id: this.addressid,
					city: this.cityid,
					address: this.address,
					number: this.number,
					mobile: this.mobile,
					name: this.name,
					default: this.radio

				}
				add6(data).then(res => {
					console.log(res.data.msg)
					if (res.data.msg == "success") {
						this.$message({
							message: '修改成功',
							type: 'success'
						});
						this.name = ""
						this.mobile = ""
						this.chose = "请选择"
						this.chose1 = "请选择"
						this.address = ""
						this.number = ""
						this.radio = '1'
						this.dialogVisible1 = false
						this.tokendata()
					} else {
						this.$message.error('修改失败');
					}


				}).catch(err => {
					console.log(err);
				});

			},
			detele(id) {
				let data = {
					status: 'delete',
					id: id
				}
				add6(data).then(res => {
					if (res.data.msg == 'success') {
						this.tokendata()
					} else {
						console.log(res.data.msg)
					}

				}).catch(err => {
					console.log(err);
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.address {
		//position:absolute;
		width: 100%;
		height: 100%;
		//top: 0;
		z-index: 99999;
		background: #fff
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
					cursor: pointer;

					//display: flex;
					.defaut {
						font-size: 14px;
						color: #ff000094;
						width: 20%;
						display: flex;
						display: inline-block;
						background: #cd5c5c59;
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
					padding: 5px 0;
					//background: #00A854;
				}
			}

			.a {
				border-top: solid 1px #dcdcdc;
			}
		}
	}

	.addsize {
		margin-bottom: 15px;
		display: flex;
		//flex: 1;
		height: 30px;
		text-align: center;
		//justify-content: center;
		align-items: center;

		label {
			//display: inline-block;
			width: 28%;
			//border: #000000 solid 1px;
		}

		input {
			height: 30px;
			//width: 60%;
			padding-left: 10px;
		}

		/deep/ .el-input__inner {
			height: 35px;

		}
	}
</style>
