<template><!--没有用到-->
	<div>
		<div class="goodssize">
			<div class="goodsdata">
				<div class="dataheader">
					<div>店铺名称</div>
					<div>负责人姓名</div>
					<div>负责人电话</div>
					<div>所在省市</div>
					<div>详细地址</div>
					<div>经营范围</div>
					<div>操作</div>
				</div>
				 <div class="dataheader a" v-for="item in 4">
					<div>与uuy</div>
					<div>与uuy</div>
					<div>与uuy</div>
					<div>与uuy</div>
					<div>与uuy</div>
					<div>是压缩过的工商局</div>
					<div>
						<!-- <em class="el-icon-edit" @click="edit()"></em>
					    <span class="el-icon-delete" @click="detele()"></span> -->
						<span class="defaut" @click="dialogVisible = true">审核</span>
					</div>
				</div> 
				
			</div>
		
		</div>
		<el-dialog title="店铺详情" :visible.sync="dialogVisible" width="30%"><!--添加商品信息-->
		    <div class="addsize">
		    	<label>店铺名称：</label>
				<div>永远永远</div>
		    </div>
			<div class="addsize">
				<label>负责人姓名：</label>
				<div>永远永远</div>
			</div>
			<div class="addsize">
				<label>负责人电话：</label>
				<div>11111112234</div>
			</div>
			<div class="addsize">
				<label>所在省市：</label>
				<div>山东省日照市</div>
			</div>
			<div class="addsize">
				<label>详细地址：</label>
				<div>烟台路80号ssssssffdfsgdbvfb</div>
			</div>
			<div class="addsize">
				<label>经营范围：</label>
				<div>哈哈哈哈哈</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">稍后审核</el-button>
				<el-button type="primary" @click="handleClose">审核通过</el-button>
			</span>
		</el-dialog>
		
		
	</div>
</template>

<script>
	import {
		add6
	} from '@/api/index.js'
	export default{
		mounted() {
			this.tokendata()
		},
		data(){
			return{
			    dialogVisible:true
			}
		},
		methods:{
			tokendata(){
				
			},
			addressadd(){
				
			},
			
			handle(val) {//选着省 份
				
			
			},
			handle1(val) {//选着城市
			
			},
			handleClose() { //添加地址
			 
			},
		    edit(id,name, mobile ,province, city , address ,number , default1){
				
				
			},
		    detele(id){
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.goodssize {
		margin-top: 20px;
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
				font-size: 17px;
				//font-weight: 550;
				//padding: 5px 0;
				color: #4d4d4d;
				justify-content: space-around;
	
				div {
					width: 16.6%;
					text-align: center;
					padding: 10px 0;
					//display: flex;
					.defaut{
						font-size: 16px;
						color: #ff000094;
						width: 20%;
						color: #fff;
						display: flex;
						padding: 0 5px;
						border-radius: 2px;
						padding-top: 2px;
						display: inline-block;
						background: rgb(64,158,255);
						cursor: pointer;
					}
					span {
						color: red;
						font-size: 20px;
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
		font-size: 17px;
		padding-left: 5%;
		//justify-content: center;
		align-items: center;
	}
</style>
