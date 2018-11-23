<template>
  <div class="match">
		<ul class="match_ul" v-show="!no_active">
			<router-link 
				tag="li" :to="{path:'/userInfo',query:{uid:item.user_id}}"
				v-for="(item) in list" :key="item.user_id">
				<div class="img bg_nccc" :style="{backgroundImage:'url('+item.image[0]+')'}">
					<div class="tip bg_ncc100" :style="{backgroundImage:'url('+imgUrl+label_1+')'}">{{item.code}}号</div>
				</div>
				<div class="con_">
					<div class="name">
						<h4 class="color_3">{{item.user_name}}</h4>
						<h4 style="color:#B00C0C">{{item.vote_number}}票</h4>
					</div>
					<h6 class="color_6 ellipsis">{{item.school}}</h6>
				</div>
			</router-link>
		</ul>
		<h5 v-show="!no_active" @click="read_more" class="more_ text_center pad_tb10 color_f">查看更多>></h5>
		<div v-show="no_active" v-cloak class=" text_center h4 color_f mar_30">
			<img style="width:5rem;" :src="imgUrl+no_data" alt="">
			<div>
				换个搜索关键词试试
			</div>
		</div>
  </div>
</template>

<script>
import { InfiniteScroll,Loadmore,Toast  } from 'mint-ui';
import Vue from 'vue';
Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore);

import baseConfig from '@/assets/baseConfig'
var imgUrl=baseConfig.imgUrl;
var baseUrl=baseConfig.baseUrl;
export default {
  name: 'match',
  data () {
    return {
    	token:'',
    	imgUrl:imgUrl,
    	label_1:"label_1.png",
    	userImg:"user_09.jpg",
    	no_data:"1_01.png",
    	no_active:false,
			list:'',//参赛列表
			page:0,//分页
			keywords:'',//搜索关键词
    }
	},
  mounted(){
		this.page=0;
		this.keyword='';
		this.token=sessionStorage.getItem("token");
		this.keywords=this.$route.query.keywords;
		this.init()
	},
	watch: {
    '$route' (to, from) {
    //刷新参数放到这里里面去触发就可以刷新相同界面了
      this.page=0;
			this.keyword='';
			this.token=sessionStorage.getItem("token");
			this.keywords=this.$route.query.keywords;
			this.init()
    }
  },
  methods:{
  	init(){
			//默认加载一次列表
			this.page_ajax()
		},
		read_more(){
			//加载更多列表

			this.page_ajax()
		},
		page_ajax(){
			this.page++;
			this.no_active=false;
			Toast({message:'载入中...',duration: 500 ,} );
			let url='';
			if(this.keywords){
				url=baseUrl+'user/lists?page='+this.page+'&keywords='+this.keywords;
			}else{
				url=baseUrl+'user/lists?page='+this.page;
			}
			this.$http({
				method:"get",
				url,
			}).then((res)=>{
				if(res.data.code=='200'){
					let data=res.data.data//获取页面数据
					if(data.list==''&&this.keywords){//无数据显示小人
						this.no_active=true;
						return false
					}
					if(this.page>1){
						if(data.list==''){
							console.log("ddd")
							Toast({message:'没有啦...',duration: 500 ,} );
							return false
						}
						let arrNew=data.list
						let arrOld=this.list
						this.list = [...arrOld,...arrNew]
					}else{
						this.list=data.list
					}
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
	.match_ul{@include flex(flex-start,flex-start);flex-wrap: wrap ;min-height: 24rem;
		padding: 1.2rem  0 0 0.75rem;
		li{width: 8.25rem;margin-right: .725rem;border-radius:.1rem;overflow: hidden;background-color: #fff;margin-bottom:.75rem;box-shadow:0px 0.075rem 0.225rem 0px rgba(0, 0, 0, 0.2);
			.img{@include round(8.25rem,false);position: relative;
				.tip{height: 1.325rem;line-height: 1.325rem;padding-left:.5rem;padding-right:.7rem;position: absolute;color:#fff;right: 0;top: 10px;font-size: 0.6rem;}
			}
			.con_{padding:.35rem .25rem;height: 3.25rem;overflow: hidden;
				>.name{@include flex(space-between,center);margin-bottom: .2rem;}
			}
		}
	}
	.more_{position: relative;top: -0.4rem; }
</style>
