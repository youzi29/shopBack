<template>
	<div class="service">
	<div class="service-left">
		<div class="header1">消息列表</div>
		<div class="message">
			<div class="message-one" v-for="(item , index) in userlist" @click="message(item.id , index)" :class="[currentIndex == index ? 'currentone' :'' ]">
				<img src="./img/female.jpg">
				<div>{{item.id}}</div>
			</div>
		</div>
	</div>
	<div class="service-right" >
	  <div style="height: 100vh;"  v-if="!oldshow">暂无聊天内容</div> 
	<div class="app" v-if="oldshow">
		<div class="xw-header">
			<div class="xw-ring-wrap">
				<a :class="[bellStatus ? '' : 'xw-ring-icon-toggle', 'xw-ring-icon']" @click="hint('checkStaus')"></a>
			</div>
			<div class="xw-header-content">
				<div v-if="!toShowMaskInfo" :class="[toShowMaskInfo ? '' : 'bounceInRight' , 'animated']">
					<img src='./img/female.jpg' class="xw-header-avatar">
					<div class="xw-header-title-wrap">
						<div class="xw-header-title">{{sendid}}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="xw-content"  @click="toShowMaskInfo=false" ref="xwBody">
			<div class="xw-chat-wrap">
				<ul>
					<li v-for="messageList in records">
						<div v-if="messageList.from==1">
							<div class="xw-chat-time">{{messageList.time}}</div>
							<div class="xw-chat-servicer">
								<div class="xw-servicer-avantar-wrap">
									<img src="./img/female.jpg" class="xw-servicer-avantar">
								</div>
								<div class="xw-chat-msg">
									<span v-html="replaceFace(messageList.message)"></span>
									 <img :src="messageList.img" >
								</div>
							</div>
						</div>

						<!-- 用户发送的消息模板-->
						<div v-else>
							<div class="xw-chat-time">{{messageList.time}}</div>
							<div class="xw-chat-customer">
								<div class="xw-customer-avantar-wrap">
									<img src="./img/logo.jpg" class="xw-customer-avantar">
								</div>
								<div class="xw-chat-msg" style="display:inline-block">
								 <!-- <span v-html="replaceFace(messageList.message)" v-if="typeof(messageList.message) == 'string'"></span> -->
								  <span v-html="replaceFace(messageList.message)"></span> 
								  
									  <img :src="messageList.img" >
								 
								  
								</div>
							</div>
						</div>
						
					</li>
				</ul>
			</div>
		</div>



		<div class="xw-footer-wrap"  @click="toShowMaskInfo=false">
			<div class="xw-footer-content">
				<div class="xw-vmodel-wrap">
					<textarea class="xw-content-textarea" placeholder="请输入您的问题" v-model="content" @focus="onFocusText"></textarea>
				</div>
				<div class="xw-chat-tool">
					<div class="xw-chat-tool-item">
						<transition name="fade">
							<a href="javascript:void(0)" class="xw-send-btn-text" v-if="content.trim().length" @click="sendMsg">发送</a>
						</transition>
					</div>
					<!-- <div class="xw-chat-tool-item">
						<a href="javascript:;" :class="[showEmoji ? 'xw-face' :'xw-face-close','xw-chat-tool-btn']" @click="emojiFuc"></a>
					</div> -->
					<div class="xw-chat-tool-item">
						
						 <a class="el-icon-picture-outline-round" style="font-size: 18px;"  @click="showMoreOpratin=!showMoreOpratin"> 
						</a>
						 <transition name="fade">
							<div class="xw-window-text" v-if="showMoreOpratin">
								<label for="files">
									<span v-if='imgs.length < size' >
										<input type="file" name="image" accept="image/*" multiple style="display:none;" 
										id="files" 
										@change='fileChange'
										>图片
									</span>
								</label>
								<!-- <span @click="videoFuc">视频</span>
								<span  @click="showEvaluateFuc">评价</span>
								<span>结束</span> -->
							</div>
						</transition> 
					</div> 
				</div> 
			</div>
		</div>


		<audio style="display:none" preload="metadata" controls="controls" autoplay="autoplay" ref="hintAudio">
		<!-- 	<source :src="myaudio" type="audio/mpeg" /> -->
		</audio>

		<!-- 右上角的通话小窗口 -->
		<div class="xw-samll-pop-wrap animated bounceInUp" v-if="showNarrowPopVal">
			<span class="xw-big-pop" @click="showBigPopFuc">显示大窗</span>
		</div>

		<!-- 客服窗口 -->
		<div class="xw-pop-server animated bounceInRight" v-if="videoVal">
			<h5>客服</h5>
			<span class="xw-narrow-pop" @click="showNarrowPopFuc">显示小窗</span>
		</div>

		<!-- 顾客窗口 -->
		<div class="xw-pop-customer animated bounceInLeft" v-if="videoVal">
			顾客
			<div>
				<a class="xw-hang-up" href="#"><img src="/static/images/hang-up.png" class="xw-hang-up-icon"></a>
			</div>
		</div>

		<!--客服评分-->
		<evaluate :ScoreDB="ScoreDB" :showScore="showScore" @on-star="selectStar" @confirm-star="confrmStar">
		</evaluate>

		<Toast :showToast="showToast">{{toastText}}</Toast>
	</div>
     </div>
	</div>
</template>

<script>
	import evaluate from './evaluate.vue'
	import Toast from './toast'
	import {  message} from '../../api/index.js'
	import {
		getEmojiData,
	} from '../../api.js'
	export default {
		components: {
			evaluate,
			Toast,
			// emojiSlider
		},
		data() {
			return {
				imgs: [], // 图片预览地址
				imgfiles: [], // 图片原文件，上传到后台的数据
				size: 100, // 限制上传数量
				userlist:[{'id':11},{'id':22}],//用户列表
				productid:'',//商品id
				sendid:'',//用户索引
				comment: {},
				showEmoji: true, //是否显示表情
				showToast: false, //显示提示框
				toastText: '',
				showMoreOpratin: false, //是否显示更多操作
				toShowMaskInfo: false, //点击头部是否显示相信信息
				bellStatus: true, //头部区域铃声图标
				//myaudio: '../../static/audio/msg.mp3', //铃音
				videoVal: false, //点击视频文字时候
				showNarrowPopVal: false, //点击切换成小窗口
				testContents: ["今天天气不错", '这个问题还没遇到过', '你说什么，我听不明白', '今天周五了', '请稍后--', '当前客服忙', '您还有什么咨询的吗', '正在查询',
					'gone with the wind'
				],
				content: '',
				//聊天记录
				records: [{
						type: 1,
						time: new Date().toLocaleTimeString(),
						message: '您好！请问有什么能帮到您？'
					},
					// {
					// 	type: 2,
					// 	time: new Date().toLocaleTimeString(),
					// 	content: '谢谢您的帮助'
					// }
				],
				showScore: false, //显示评分
				ScoreDB: {
					scoreDatas: [{
							scoreTitle: '服务指数',
							scoreFlag: 0,
							scoreArr: [1, 2, 3, 4, 5]
						},
						{
							scoreTitle: '接通速度',
							scoreFlag: 1,
							scoreArr: [1, 2, 3, 4, 5]
						},
						{
							scoreTitle: '办事效率',
							scoreFlag: 2,
							scoreArr: [1, 2, 3, 4, 5]
						}
					],
					maxVal: [0, 0, 0]
				},
				imgFile: {},
				EXPS: [],
				currentIndex:null,
				oldshow:false
			}
		},
		created() {
			//this._loadEmojiData();
		},
		mounted() {
		   let data={
			   status: 'search'
		   }
			   message(data).then(res => {
			   	  if(res.data.msg == 'success'){
					  this.userlist = res.data.data
				  }
			   }).catch(err => {
			   	console.log(err);
			   });
		},
		methods: {
			
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
						_this.records.push({
							time: new Date().toLocaleTimeString(),
							message: '',
							img: e.target.result,
							from: 2
						});
						
						let data = {
							status: 'back',
							product: _this.productid,//商品id
							backid:parseInt(window.localStorage.getItem('bsid')) ,//商家索引
							sendid:_this.sendid ,
							message: '',
							img:e.target.result,
						}
						console.log(data)
						message(data).then(res => {
							console.log(res)
						}).catch(err => {
							console.log(err);
						});
					};
					
				}
				console.log(this.imgs)
				var content = ''
			},
			message(id , index){
				this.oldshow = true
				this.records = [{
					type: 1,
					time: new Date().toLocaleTimeString(),
					message: '您好！请问有什么能帮到您？'
				}]
				this.currentIndex = index;
				this.sendid = id;
				let data={
					status: 'searchOne',
					sendid: this.sendid,//用户索引
				    backid: localStorage.getItem('bsid'),
				}
				message(data).then(res => {
				 if(res.data.msg == 'success'){
					console.log(this.records)
					this.records = res.data.data.reverse();
					this.productid = this.records[0].productid
				 }
				}).catch(err => {
					console.log(err);
				});
			},
			showInfo() {
				this.toShowMaskInfo = true;
			},
			//点击控制表情切换（显示和隐藏）
			emojiFuc() {
				this.showEmoji = !this.showEmoji;
			},
			videoFuc() {
				this.videoVal = true;
				this.showNarrowPopVal = false;
			},
			//提示音
			hint(staus) {
				if (staus != undefined) {
					this.bellStatus = !this.bellStatus;
				}
				this.bellStatus ? this.$refs.hintAudio.play() : this.$refs.hintAudio.pause();
			},
			showNarrowPopFuc() {
				this.showNarrowPopVal = true;
				this.videoVal = false;
			},
			showBigPopFuc() {
				this.showNarrowPopVal = false;
				this.videoVal = true;
			},
			showEvaluateFuc() {
				this.showScore = !this.showScore;
			},
			sendMsg() {//发送信息
				console.log(this.content)
				let data= {
					status: 'back',
					product: this.productid,//商品id
					backid:parseInt(window.localStorage.getItem('bsid')) ,//商家索引
					sendid:this.sendid ,
					message: this.content
				}
				console.log(data)
				message(data).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err);
				});
				
				
				var content = this.content.trim();
				this.records.push({
					time: new Date().toLocaleTimeString(),
					message: content,
					from: 2
				});
				this.content = "";
				window.setInterval(()=>{
					
				setTimeout(() => {
					this.hint();
					// this.records.push({
					// 	time: new Date().toLocaleTimeString(),
					// 	content: this.testContents[Math.floor(Math.random() * 9)],
					// 	type: 1
					// });
					let data={
						status: 'searchOne',
						sendid: this.sendid,//用户索引
					    backid: localStorage.getItem('bsid'),
					}
					message(data).then(res => {
					 if(res.data.msg == 'success'){
						console.log(this.records)
						this.records = res.data.data.reverse();
						this.productid = this.records[0].productid
					 }
					}).catch(err => {
						console.log(err);
					});
					this.scrollToBottom();
				}, 0);
					
				} , 9000)
			},
			getEmotionData(pageNow, pageSize) {
				return this.EXPS.slice((pageNow - 1) * pageSize, pageSize * pageNow)
			},
			replaceFace(con) {
				if (!con) {
					return;
				}
				if (con.toString().indexOf('/:') > -1) {
					var exps = this.EXPS;
					for (var i = 0; i < exps.length; i++) {
						con = con.replace(exps[i].reg, '<img src="' + exps[i].file + '"  alt="" />');
					}
				}
				return con;
			},
			//点击星星进行星星评分
			selectStar(msg) {
				let index = msg[0];
				let scoreFlag = msg[1];
				let scoreArr = msg[2];
				var Target = [1, 2, 3, 4, 5];
				for (var i = 0; i < index; i++) {
					Target[i] = i;
				}
				//方便确定星星选中的个数，将不亮的星星数组设置为-1
				for (var j = index; j < Target.length; j++) {
					Target[j] = -1;
				}

				//评分结果数
				var tempArr = [];
				tempArr = this.ScoreDB.maxVal.slice(0);
				tempArr[scoreFlag] = index;
				this.ScoreDB.maxVal = tempArr.concat();
				this.ScoreDB.scoreDatas[scoreFlag].scoreArr = Target;
			},
			//点击确定关闭星星评价
			confrmStar(msg) {
				this.showToast = true;
				this.toastText = '您的评分依次是 ' + msg;
				this.showScore = false;
				setTimeout(() => {
					this.showToast = false;

				}, 2000)
			},

			//滚动到底
			scrollToBottom() {
				setTimeout(() => {
					//滚动条长度
					var currentDistance = this.$refs.xwBody.scrollHeight - this.$refs.xwBody.clientHeight;
					//当前滚动条距离顶部的距离
					var currentScroll_y = this.$refs.xwBody.scrollTop;
					if (currentDistance > 0 && currentDistance > currentScroll_y) {
						currentScroll_y = Math.ceil((currentDistance - currentScroll_y) / 10) + currentScroll_y;
						currentScroll_y = currentScroll_y > currentDistance ? currentDistance : currentScroll_y;
						//微信和qq浏览器不支持 scrollTo？
						//this.$refs.xwBody.scrollTo(0,currentScroll_y);
						this.$refs.xwBody.scrollTop = currentScroll_y;
						this.scrollToBottom();
					}
				}, 13);
			},
			onFocusText() {
				this.scrollToBottom();
			},
			_loadEmojiData() {
				getEmojiData().then((res) => {
					var json = eval('(' + res + ')');
					this.EXPS = json.EXPS.slice(0);
					console.log(this.EXPS)
				});
			}
		}
	}
</script>
<style lang="scss" >
	#app {
		
	}
	.currentone{
		background: #ecf5ff;
	}
  .service{
	  display: flex;
	  width: 100%;
	 
	  //position: relative;
	  .service-left{
		  width: 20%;
		  height: 100vh;
		 // background: #20A0FF;
		  border: #909399 solid 1px;
		  .header1{
			  font-size: 20px;
			  display: flex;
			  align-items: center;
			  justify-content: center;
			  background: #324157;
			  color: #fff;
			  height: 49px;
		  }
		  .message{
			 // padding: 10px;
			  .message-one{
				  display: flex;
				  align-items: center;
				  cursor: pointer;
				  padding: 10px 0px 7px 7px;
				  margin: 0px 0;
				  border-bottom: #324157 solid 1.5px;
				  img{
					  width: 50px;
					  height: 50px;
					  border-radius: 50%;
					  margin-right: 20px;
				  }
				  
			  }
		  }
	  }
	  .service-right{
		  width: 80%;
	  }
  }
	.app {
		display: flex;
		flex-direction: column;
		justify-content:  center;
		width: 60%;
		height: 100vh;
		//position: absolute;
		//height: 100%;
		width: 100%;
		//overflow: hidden;
	}

	.xw-content {
		flex: 1;
		position: relative;
		overflow: auto;
		transition: height .8s;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateX(20px);
		opacity: 0;
	}

	.animated {
		-webkit-animation-duration: 1s;
		animation-duration: 1s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}

	.animated.bounceIn,
	.animated.bounceOut {
		-webkit-animation-duration: .75s;
		animation-duration: .75s;
	}

	@-webkit-keyframes bounceInDown {

		from,
		60%,
		75%,
		90%,
		to {
			-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
		}

		0% {
			opacity: 0;
			-webkit-transform: translate3d(0, -3000px, 0);
			transform: translate3d(0, -3000px, 0);
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(0, 25px, 0);
			transform: translate3d(0, 25px, 0);
		}

		75% {
			-webkit-transform: translate3d(0, -10px, 0);
			transform: translate3d(0, -10px, 0);
		}

		90% {
			-webkit-transform: translate3d(0, 5px, 0);
			transform: translate3d(0, 5px, 0);
		}

		to {
			-webkit-transform: none;
			transform: none;
		}
	}

	.bounceInDown {
		-webkit-animation-name: bounceInDown;
		animation-name: bounceInDown;
	}

	@keyframes bounceInLeft {

		from,
		60%,
		75%,
		90%,
		to {
			-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
		}

		0% {
			opacity: 0;
			-webkit-transform: translate3d(-3000px, 0, 0);
			transform: translate3d(-3000px, 0, 0);
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(25px, 0, 0);
			transform: translate3d(25px, 0, 0);
		}

		75% {
			-webkit-transform: translate3d(-10px, 0, 0);
			transform: translate3d(-10px, 0, 0);
		}

		90% {
			-webkit-transform: translate3d(5px, 0, 0);
			transform: translate3d(5px, 0, 0);
		}

		to {
			-webkit-transform: none;
			transform: none;
		}
	}

	.bounceInLeft {
		-webkit-animation-name: bounceInLeft;
		animation-name: bounceInLeft;
	}

	@-webkit-keyframes bounceInRight {

		from,
		60%,
		75%,
		90%,
		to {
			-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
		}

		from {
			opacity: 0;
			-webkit-transform: translate3d(3000px, 0, 0);
			transform: translate3d(3000px, 0, 0);
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(-25px, 0, 0);
			transform: translate3d(-25px, 0, 0);
		}

		75% {
			-webkit-transform: translate3d(10px, 0, 0);
			transform: translate3d(10px, 0, 0);
		}

		90% {
			-webkit-transform: translate3d(-5px, 0, 0);
			transform: translate3d(-5px, 0, 0);
		}

		to {
			-webkit-transform: none;
			transform: none;
		}
	}

	.bounceInRight {
		-webkit-animation-name: bounceInRight;
		animation-name: bounceInRight;
	}

	@keyframes bounceInUp {

		from,
		60%,
		75%,
		90%,
		to {
			-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
			animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
		}

		from {
			opacity: 0;
			-webkit-transform: translate3d(0, 3000px, 0);
			transform: translate3d(0, 3000px, 0);
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(0, -20px, 0);
			transform: translate3d(0, -20px, 0);
		}

		75% {
			-webkit-transform: translate3d(0, 10px, 0);
			transform: translate3d(0, 10px, 0);
		}

		90% {
			-webkit-transform: translate3d(0, -5px, 0);
			transform: translate3d(0, -5px, 0);
		}

		to {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
	}

	.bounceInUp {
		-webkit-animation-name: bounceInUp;
		animation-name: bounceInUp;
	}

	::-webkit-scrollbar-track {
		border-radius: 0;
		padding: 0;
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		padding: 0;
		background-color: rgba(0, 0, 0, .2);
	}

	::-webkit-scrollbar {
		width: 7px;
		height: 7px;
		background-color: transparent;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .3s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}

	.xw-ring-wrap {
		position: absolute;
		right: 5px;
		top: 3px;
		padding: 0 2px;
		z-index: 4;
	}

	.xw-ring-icon {
		//background: url(/static/images/soundOn.svg) no-repeat 50%;
	}

	.xw-ring-icon-toggle {
		//background: url(/static/images/soundClose.svg) no-repeat 50%;
	}

	.xw-ring-icon {
		float: right;
		padding: 5px;
		margin-right: 3px;
		height: 30px;
		width: 30px;
		opacity: .6;
		cursor: pointer;
		text-indent: -9999px;
		overflow: visible;
	}

	.xw-body-wrap-scroll,
	.xw-body-wrap-scroll-main {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		overflow: hidden;
		-webkit-overflow-scrolling: auto;
	}


	.xw-header {
		z-index: 2;
		max-height: 360px;
		background: #324157;;
		box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
	}

	.xw-header-content {
		position: relative;
		overflow: hidden;
		padding: 0px 16px;
		min-height: 50px;
	}


	.xw-chat-servicer:after,
	.xw-chat-servicer:before,
	.xw-chat-customer:after,
	.xw-chat-customer:before,
	.xw-chat-wrap:after,
	.xw-chat-wrap:before,
	.xw-chat-tool:after,
	.xw-chat-tool:before,
	.xw-chat-ul-box:after,
	.xw-chat-ul-box:before {
		display: table;
		content: "";
	}

	.xw-header-avatar {
		float: left;
		height: 40px;
		width: 40px;
		border-radius: 100%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
		margin-right: 8px;
		margin-top: 5px;

	}

	.xw-header-title-wrap {
		padding: 3px 0;
		float: left;
		width: 200px;
	}

	.xw-header-title {
		font-size: 14px;
		color: #fff;
		margin-top: 8px;
	}


	.xw-chat-wrap {
		overflow: auto;
		padding-left: 16px;
		padding-bottom: 20px;

	}

	.xw-chat-wrap .xw-chat-time,
	.xw-chat-wrap time {
		line-height: 1;
		text-align: center;
		display: block;
		margin-bottom: 8px;
		margin-top: 8px;
		font-size: 12px;
		color: #999;
		text-shadow: 1px 1px 1px hsla(0, 0%, 100%, .6);
	}

	.xw-chat-servicer,
	.xw-chat-customer {
		position: relative;
		margin-bottom: 16px;
		padding: 0 10px 0 45px;

	}

	.xw-servicer-avantar-wrap {
		position: absolute;
		bottom: 0;
		line-height: 0;

	}

	.xw-send-btn-text {
		padding: 4px 8px;
		background-color: rgb(50, 65, 87);
		color: #fff;
		border-radius: 5px;

	}

	.xw-customer-avantar-wrap {
		//position: absolute;
		bottom: 0;
		right: 8px;
		line-height: 0;

		display: flex;
		justify-content: flex-end;
	}

	.xw-chat-servicer .xw-servicer-avantar-wrap,
	.xw-customer-avantar-wrap {
		left: 0;

	}


	.xw-servicer-avantar {
		border-radius: 100%;

	}

	.xw-servicer-avantar-wrap img,
	.xw-customer-avantar-wrap img {
		height: 34px;
		width: 34px;


	}

	.xw-chat-msg {
		-webkit-font-smoothing: antialiased;
		hyphens: auto;
		word-wrap: break-word;
		word-break: normal;
		position: relative;
		clear: both;
		padding: 8px 16px;
		border: 1px solid transparent;
		max-width: 100%;
		min-width: 50px;
		min-height: 22px;
		line-height: 1.6em;
		max-width: 70%;
	}

	.xw-chat-servicer .xw-chat-msg {
		background: #fff;
		border-color: #efefef;
		float: left;

	}

	.xw-chat-msg :last-child {
		margin-bottom: 0;
	}

	.xw-chat-msg span {
		white-space: pre-line;
	}

	.xw-chat-servicer,
	.xw-chat-customer {
		position: relative;
		margin-bottom: 16px;
		padding: 0 10px 0 45px;
	}

	.xw-chat-customer {
		text-align: right;


	}

	.xw-chat-customer .xw-chat-msg {
		float: right;
		text-align: left;
		background: rgb(50, 65, 87);

		color: #fff;
		margin-right: 45px;

	}


	.xw-customer-avantar {
		border-radius: 50%;
		text-align: right;


	}

	.xw-chat-msg :last-child {
		margin-bottom: 0;
	}

	.xw-chat-wrap .xw-system-info-time,
	.xw-chat-wrap time {
		line-height: 1;
		text-align: center;
		display: block;
		margin-bottom: 8px;
		font-size: 12px;
		color: #999;
		text-shadow: 1px 1px 1px hsla(0, 0%, 100%, .6);
	}

	.xw-system-info {
		margin-bottom: 8px;
	}

	.xw-chat-wrap>:last-child {
		margin-bottom: 16px;
	}

	.xw-system-info {
		text-align: center;
		font-size: 12px;
	}

	.xw-system-info span {
		display: inline-block;
		background: rgba(0, 0, 0, .08);
		padding: 4px 8px;
		line-height: 1;
		color: #7c7c7c;
		border-radius: 2px;
		text-shadow: 1px 1px 1px hsla(0, 0%, 100%, .6);
	}

	.xw-footer-wrap {
		//justify-content: flex-end;
		width: 100%;
		box-shadow: 0 -1px 4px rgba(0, 0, 0, .05);
		background: #fff;
		z-index: 2;
	}

	.xw-footer-content {
		position: relative;
		//width: 100%;
		//top: 200px;
		height: 52px;
		display: flex;
		box-shadow: rgba(0, 0, 0, 0.05) 0px -1px 4px;
	}

	.xw-vmodel-wrap {
		flex: 1;
		height: 40px;
	}

	.xw-content-textarea {
		//height: 40px;
		box-sizing: border-box;
		z-index: 1;
		overflow-y: auto;
		font-size: 14px;
		line-height: 14px;
		border: none;
		resize: none;
		padding: 16px 85px 16px 14px;
		font-family: inherit;
		white-space: pre;
		white-space: pre-wrap;
		word-wrap: break-word;
		width: 90%;
	}

	.xw-chat-tool {
		position: absolute;
		right: 0px;
		bottom: 0;
		z-index: 2;
	}

	.xw-chat-tool-item {
		height: 52px;
		line-height: 52px;
		position: relative;
		float: left;
		background: #fff;
	}


	.xw-chat-tool-btn {
		display: block;
	}

	.xw-chat-tool-btn {
		margin-top: 7px;
		height: 38px;
		width: 38px;
		border-radius: 100%;
		text-indent: -9999px;
		opacity: .5;
		overflow: hidden;
		transform: translateZ(0);
		margin-left: 10px;
	}

	.xw-chat-tool-btn.xw-face {
		background: url(/static/images/smileOn.svg) no-repeat 50%;
	}

	.xw-chat-tool-btn.xw-face-close {
		background: url(/static/images/smileClose.svg) no-repeat 50%;
	}

	.xw-chat-tool-item .xw-window-text {
		position: absolute;
		bottom: 100%;
		left: 50%;
		margin-bottom: -3px;
		-webkit-transform: translateX(-60%);
		transform: translateX(-60%);
		white-space: nowrap;
		box-shadow: 0 3px 18px 2px rgba(0, 0, 0, .1), 0 0 1px rgba(0, 0, 0, .05);
		font-size: 12px;
		background: #fff;
		line-height: 1em;
	}

	.xw-chat-tool-item .xw-window-text.xw-face-emoji-ul {
		right: -23px;
		left: auto;
		-webkit-transform: none;
		transform: none;
	}

	.xw-chat-tool-item .xw-window-text h4 {
		font-size: 12px;
		margin: 0;
		font-weight: 400;
		padding: 12px 8px;
		padding-bottom: 0;
	}


	.xw-chat-ul-box {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.xw-chat-ul-box {
		position: relative;
		z-index: 1;
		background: #fff;
		padding: 8px;
		height: 130px;
		overflow: hidden;
		width: 340px;
		margin: 0px auto;
	}

	.xw-chat-tool-item .xw-window-text .xw-chat-ul-box {
		padding: 8px;
	}

	.swiper-slide {
		float: left;
	}

	.xw-chat-ul-box a {
		display: block;
		height: 40px;
		width: 40px;
	}

	.swiper-pagination {
		display: flex;
		width: 100%;
		justify-content: center;
	}

	.swiper-pagination-bullet {
		width: 8px;
		height: 8px;
		display: inline-block;
		background: #ccc;
		border-radius: 10px;
		margin-left: 5px;
		margin-right: 5px;
	}

	.swiper-pagination-bullet-active {
		background: #007aff;
	}

	.xw-chat-tool-item {
		height: 52px;
		position: relative;
		float: left;
	}

	.xw-hide-operation {
		background: url(/static/images/addOn.svg) no-repeat 50%;
		width: 38px;
		height: 38px;
		margin-right: 10px;
		transform: scale(.7);
	}

	.xw-hide-operation-close {
		background: url(/static/images/addClose.svg) no-repeat 50%;
		width: 38px;
		height: 38px;
		margin-right: 10px;
		transform: scale(.7);
	}

	.xw-chat-tool-item .xw-window-text span {
		display: block;
		padding: 10px 12px;
		background: #fff;
		position: relative;
		z-index: 1;
		font-size: 17px;
		line-height: 16px;
	}


	.xw-chat-servicer:after,
	.xw-chat-customer:after,
	.xw-chat-wrap:after,
	.xw-chat-tool:after,
	.xw-chat-ul-box:after {
		clear: both;
	}

	.xw-chat-msg:last-child:before {
		bottom: -1px;
	}

	.xw-chat-msg:last-child:after,
	.xw-chat-msg:last-child:before {
		content: "";
		position: absolute;
		height: 0;
		width: 0;
		display: block;
	}

	.xw-chat-customer .xw-chat-msg:last-child:before {
		display: inline-block;
		height: 0;
		width: 0;
		border: 10px solid transparent;
		border-bottom: 10px solid #324157;
		right: -10px;
		border-left-width: 9px;
	}

	.xw-chat-servicer .xw-chat-msg:last-child:before {
		display: inline-block;
		height: 0;
		width: 0;
		border: 10px solid transparent;
		border-bottom: 10px solid #efefef;
		left: -10px;
		border-left-width: 9px;
	}

	.xw-chat-servicer .xw-chat-msg:last-child:after {
		display: inline-block;
		height: 0;
		width: 0;
		border: 10px solid transparent;
		border-bottom: 10px solid #fff;
		left: -8px;
		border-left-width: 9px;
		bottom: 0px;
	}

	.xw-show-info-box {
		height: 200px;
		margin-top: -50px;
		z-index: 1000;
		background: #ed4858;
		color: #fff;
	}

	.xw-logo {
		text-align: center;
	}

	.xw-logo img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-top: 20px;
	}

	.xw-header-info p {
		height: 110px;
		padding: 0 16px;
		line-height: 1.6rem;
		word-wrap: break-word;
		text-align: left;
		overflow: auto;
	}


	.xw-faceEmoji {
		margin-bottom: 7px;
		width: 20%;
		float: left;
	}

	.xw-faceEmoji-main {
		text-align: center;
	}

	.xw-samll-pop-wrap {
		position: absolute;
		height: 160px;
		width: 30%;
		top: 0;
		right: 0;
		background-size: 100% 100%;
		background: url(/static/images/s.jpg) no-repeat;
		z-index: 1000;
	}

	.xw-pop-server {
		background: url(/static/images/s.jpg) no-repeat;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
	}

	.xw-pop-customer {
		position: absolute;
		bottom: 20px;
		width: 80%;
		height: 200px;
		background: url(/static/images/c.jpg) no-repeat;
		z-index: 101;
		left: 50%;
		margin-left: -40%;
		text-align: center;
	}

	.xw-narrow-pop {
		width: 40px;
		height: 40px;
		position: absolute;
		right: 5px;
		top: 5px;
		display: inline-block;
		background: red;
		color: #fff;
		text-align: center;
	}

	.xw-big-pop {
		display: block;
		background: red;
		color: #fff;
		line-height: 40px;
		text-align: center;
	}

	.xw-hang-up {
		background: red;
		width: 100px;
		height: 34px;
		display: inline-block;
		border-radius: 20%;
		position: absolute;
		bottom: 10px;
		transform: translateX(-50%);
	}

	.xw-hang-up-icon {
		position: relative;
		z-index: 1290;
		width: 40px;
		height: 34px;

	}

	.xw-chat-msg span img {
		vertical-align: middle;
	}

	.mint-swipe-items-wrap>div {
		text-align: center;
	}

	.xw-scroll-ul {
		min-height: 340px;
	}

	.mint-swipe-indicator.is-active {
		background: #ff110;
		opacity: 1;
	}
</style>
