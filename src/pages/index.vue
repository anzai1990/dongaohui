<template>
  <div class="index">
		<a :href="link" class="gg disB bg_nccc" :style="{backgroundImage:'url('+addInfo1_img+')'}"></a>
		<a :href="link" class="text_center disB color_f brand_name" >
			<div class="disIB" :style="{backgroundImage:'url('+imgUrl+bg_gg_name+')'}">
				<h3>{{ad_name}}</h3>
				<h5>提醒你</h5>
			</div>
		</a>
		<div class="text_center brand_con color_f ">
			<router-link tag="h5" style="text-decoration:underline" :to="{path:'/match'}">你已成功参与<br/>“我的冬奥梦”双语小记者全球选拔赛</router-link>
			<h4 class="color_yellow">你的报名号是：{{code}}</h4>
			<h6>此号是你参与活动的唯一识别号码<br/>
请截图保存</h6>
		</div>
		<a :href="link" style="height:4.5rem;" class="disB gg gg2 bg_nccc" :style="{backgroundImage:'url('+addInfo2_img+')'}"></a>
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
  name: 'index',
  data () {
    return {
    	token:'',
    	imgUrl:imgUrl,
    	gg:"images_ad2.png",
    	gg2:"images_ad3.png",
			bg_gg_name:"bg_gg_name.png",
			code:'',//报名号
			addInfo1_img:'',//
			addInfo2_img:'',//
			link:'',
			ad_name:'',
    }
  },
  mounted(){
		this.token=sessionStorage.getItem("token")
		this.code=this.$route.query.code
  	this.init()
  },
  methods:{
  	init(){
  		this.$http({
				method:"get",
				url:baseUrl+'user/prompt?utoken='+this.token,
			}).then((res)=>{
				if(res.data.code=='200'){
					let data=res.data.data//获取页面数据
					this.addInfo1_img=data.info.ad_success_prompt
					this.addInfo2_img=data.info.adv_language
					this.link=data.info.ad_link
					this.ad_name=data.info.ad_name
				}else if(res.data.code=='300'){
					window.location.href=res.data.data.url
				}else{
					console.log("msg:"+msg)
				}
			}).catch((err)=>{
				console.log(err);
			});
  	},
  	handleTopChange(status) {
      this.topStatus = status;
    },
  	loadTop() {
		  console.log("...加载更多数据")
		  this.$refs.loadmore.onTopLoaded();
		},
  	loadMore() {
		  this.loading = true;
		  /*setTimeout(() => {
		    let last = this.list[this.list.length - 1];
		    for (let i = 1; i <= 10; i++) {
		      this.list.push(last + i);
		    }
		    console.log("loading...")
		    this.loading = false;
		  }, 2500);*/
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
	.index{padding: 0 $pad_lr;}
	.logo{width: 5.625rem;height: 3.25rem;}
	.gg{width: 17.25rem;height: 7.25rem;margin: 0 auto;margin-top: 1.75rem;border:.35rem solid #fff;
		&.gg2{border: 0}
	}
	.brand_name{
		>.disIB{min-width: 8.5rem;padding: .325rem;margin-top: 1.2rem;}
	}
	.color_yellow{color:#F3CF0D;}
	.brand_con{
		margin-top: 1.35rem;
		h4{margin-top: .75rem;}
		h6{margin-top: .25rem;}
	}
</style>
