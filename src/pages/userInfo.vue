<template>
  <div class="userDelete">
		<ul class="match_ul">
			<li >
				<div class="img bg_nccc" :style="{backgroundImage:'url('+user_image+')'}">
					<div class="tip bg_ncc100" :style="{backgroundImage:'url('+imgUrl+label_1+')'}">{{userInfo.code}}号</div>
				</div>
			</li>
		</ul>
		<ul class="userInfo">
			<li >姓名：{{userInfo.user_name}}</li>
			<li >年龄：{{userInfo.age}}岁</li>
			<li >得票数：{{userInfo.vote_number}}票</li>
			<li >所在学校班级：{{userInfo.school}}
			</li>
			<li >
				<div>
					所参加英语比赛名称及获奖情况：
				</div>
				<div style="text-indent:1.4rem;">
					{{userInfo.desc}}
				</div>
			</li>
		</ul>
		<div class="btn_" @click="vote">喜欢就为Ta加油</div>
  </div>
</template>

<script>
import { InfiniteScroll,Loadmore,Toast } from 'mint-ui';
import Vue from 'vue';
Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore);

import baseConfig from '@/assets/baseConfig'
var imgUrl=baseConfig.imgUrl;
var baseUrl=baseConfig.baseUrl;
export default {
  name: 'userInfo',
  data () {
    return {
    	token:'',
    	imgUrl:imgUrl,
			label_1:"label_1.png",
			userImg:"user_09.jpg",
			userInfo:'',//user信息
			uid:'',//path路径上的id
			user_image:'',//用户头像
    }
  },
  mounted(){
		this.token=sessionStorage.getItem("token")
		this.uid=this.$route.query.uid
  	this.init()
  },
  methods:{
  	init(){
  		this.$http({
				method:"get",
				url:baseUrl+'user/userInfo?uid='+this.uid,
			}).then((res)=>{
				if(res.data.code=='200'){
					let data=res.data.data//获取页面数据
					this.userInfo=data
					this.user_image=data.image[0]
				}else{
					console.log("msg:"+msg)
				}
			}).catch((err)=>{
				console.log(err);
			});
		},
		vote(){
			this.$http({
				method:"post",
				url:baseUrl+'user/vote?',
				data:this.toParams({
					uid:this.uid,//赛区名
				}),
				headers:{
					'Content-type': 'application/x-www-form-urlencoded',
				},
			}).then((res)=>{
				if(res.data.code=='200'){
					Toast({message:res.data.message,duration: 300,});
				}else if(res.data.code=='300'){
					window.location.href=res.data.data.url
				}else{
					Toast({message:res.data.message,duration: 300,});
				}
			}).catch((err)=>{
				console.log(err);
			});
		},
		
	  toParams(obj) {	//拼接post参数
			var param = ""
			for(const name in obj) {
				if(typeof obj[name] != 'function') {
					param += "&" + name + "=" + encodeURI(obj[name])
				}
			}
			return param.substring(1)
		},
  },
}
</script>
<style lang="scss" scoped>
.match_ul{@include flex(center,center);flex-wrap: wrap ;
	padding: .85rem 0 0 0.75rem;
	li{width: 8.25rem;margin-right: .725rem;border-radius:.1rem;overflow: hidden;background-color: #fff;margin-bottom:.75rem;box-shadow:0px 0.075rem 0.225rem 0px rgba(0, 0, 0, 0.2);
		.img{@include round(8.25rem,false);position: relative;
			.tip{height: 1.325rem;line-height: 1.325rem;padding-left:.5rem;padding-right:.7rem;position: absolute;color:#fff;right: 0;top: 10px;font-size: 0.6rem;}
		}
	}
}
.userInfo{
	padding: $pad_lr;color: #fff;
	font-size: .7rem;
	li{margin-bottom: .5rem;background: rgba(255, 255, 255,.5);padding: .5rem;border-radius: .25rem;box-shadow: 0px 0.075rem 0.175rem 0px rgba(0, 0, 0, 0.37);}
}
.btn_{margin-top: 0;}



</style>
