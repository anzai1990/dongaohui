<template>
  <div class="index">
		<div class="box_rule por">
			<img class="bg_circular poa" :src="imgUrl+bg_circular">
			<img class="bg_irregular poa" :src="imgUrl+bg_irregular">
			<div class="text_center title_br color_f poa">
				<h1 style="font-size:1.5rem">活动规则</h1>
				<h5>RULES OF ACTIVITY</h5>
			</div>
			<!-- <div class="lit_title">
				<div class="disIB bg_ncc100" :style="{backgroundImage:'url('+imgUrl+bg_rule1+')'}">招募条件</div>
			</div>
			<h5>
				人数不限制（限制报名时间），成都地区
			</h5>
			<div class="lit_title">
				<div class="disIB bg_ncc100" :style="{backgroundImage:'url('+imgUrl+bg_rule1+')'}">招募条件</div>
			</div>
			<h5>
				对冬季运动感兴趣的学前及中小学生。选拔活动分为小学低年级组（学前-3年级）、小学高年级组（4-6年级）、以及中学组（7到12年级）三个组别。
			</h5>
			<div class="lit_title">
				<div class="disIB bg_ncc100" :style="{backgroundImage:'url('+imgUrl+bg_rule1+')'}">招募条件</div>
			</div>
			<h5>
				神鸟资讯APP报名。填写个人信息资料。提交报名登记表。“我的冬奥梦”双语小记者全国选拔赛由地区赛和全国赛两个部分组成，经过四川赛区初赛、复赛和四川赛区决赛，进入全国半决赛和全国冠军赛五个阶段，到2019年2月正式收官。
			</h5> -->
			<div class="h4" v-html="rule">
			</div>


		</div>
  </div>
</template>

<script>
import { InfiniteScroll,Loadmore  } from 'mint-ui';
import Vue from 'vue';
Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore);

import baseConfig from '@/assets/baseConfig'
var imgUrl=baseConfig.imgUrl;
var baseUrl=baseConfig.baseUrl;
export default {
  name: 'rule',
  data () {
    return {
    	token:'',
    	imgUrl:imgUrl,
    	bg_circular:"bg_circular.png",
    	bg_irregular:"bg_irregular.png",
			bg_rule1:"bg_rule1.png",
			rule:'',//活动规则
    }
  },
  mounted(){
		this.token=sessionStorage.getItem("token")
  	this.init()
  },
  methods:{
  	init(){
  		this.$http({
				method:"get",
				url:baseUrl+'user/activityRule',
			}).then((res)=>{
				if(res.data.code=='200'){
					let data=res.data.data//获取页面数据
					this.rule=data.activity.rule
				}else if(res.data.code=='300'){
					window.location.href=res.data.data.url
				}else{
					console.log("msg:"+msg)
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
	.box_rule{width: 17.25rem;margin:4.2rem auto 1rem;box-shadow:0 .1rem .675rem .075rem rgba(131,113,13,.37);
		background: #fae9b4;min-height: 20rem;border-radius: .25rem;padding: 4rem .75rem .75rem;
		.bg_circular{width: 15.2rem;margin-left: -7.6rem;left: 50%;top: -3.4rem;}
		.bg_irregular{width: 16.65rem;margin-left: -8.325rem;left: 50%;top: -0.03rem;}
		.title_br{left: 0;right: 0;top: -1.5rem ;}
		.lit_title{
			div{position:relative;left: -0.25rem;height: 1.6rem;line-height: 1.6rem;padding: 0 1.25rem; font-size: .8rem;color:#333;}
			+h5{margin-bottom: .5rem;padding:0 .5rem;}
		}
	}
</style>
