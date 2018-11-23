<template>
  <div class="index">
		<div class="box_pop por">
			<img class="images_top poa" :src="imgUrl+images_top">
			<img class="pop_title poa" :src="imgUrl+pop_title">
			<div class="bg_f overHide" style="min-height:25rem">
				<table class="table_pop">
					<tr>
						<th>排名</th>
						<th>编号</th>
						<th>照片</th>
						<th>姓名</th>
						<th>票数</th>
					</tr>
					<router-link tag="tr" :to="{path:'/userInfo',query:{uid:item.user_id}}"
						v-for="(item,index) in list"
						:key="item.user_id"
						>
						<td>
							<img v-if="index==0" :src="imgUrl+toptip1" class="topTip">
							<img v-else-if="index==1" :src="imgUrl+toptip2" class="topTip">
							<img v-else-if="index==2" :src="imgUrl+toptip3" class="topTip">
							<template v-else>{{index+1}}</template>
						</td>
						<td>{{item.code}}</td>
						<td>
							<div :style="{backgroundImage:'url('+item.image[0]+')'}" class="userHeader bg_nccc"></div>
						</td>
						<td>{{item.user_name}}</td>
						<td>{{item.vote_number}}</td>
					</router-link>
				</table>
			</div>
			<h5 @click="read_more" class="more_ bg_f text_center pad_tb10 color_6">查看更多>></h5>
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
  name: 'popularity',
  data () {
    return {
    	token:'',
    	imgUrl:imgUrl,
    	images_top:"images_top.png",
    	pop_title:"pop_title.png",
    	userImg:"user_09.jpg",
    	toptip1:"icon_top1.png",
    	toptip2:"icon_top2.png",
			toptip3:"icon_top3.png",
			list:'',//选手排行列表
			page:0,//分页
    }
  },
  mounted(){
		this.token=sessionStorage.getItem("token")
  	this.init()
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
			Toast({message:'载入中...',duration: 500 ,} );
			this.$http({
				method:"get",
				url:baseUrl+'user/popularity?page='+this.page,
			}).then((res)=>{
				if(res.data.code=='200'){
					let data=res.data.data//获取页面数据
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
	.box_pop{width: 16.5rem;margin:3.8rem auto 1rem;border: .5rem solid #FAE9B4;box-shadow:0 0 0 .5rem #DF981D inset;padding: .5rem;
		.images_top{width: 18rem;margin-left: -9rem;left: 50%;top: -3.1rem;}
		.pop_title{width: 8.05rem;margin-left: -4.15rem;left: 50%;top: -1.4rem;}
		
	}
	.topTip{@include round(1.25rem,false);}
	.userHeader{@include round(1.675rem,true);margin: 0 auto;}
	.table_pop{width: 100%;margin-top:.5rem;
		th,td{font-weight: normal;color: #666;text-align: center;}
		th{font-size: .6rem;height: 1.5rem;}
		td{font-size: .7rem;border-bottom:1px dashed #F0F0F0;height: 2.75rem;
			img{
				vertical-align: middle;
			}
		}

	}
</style>
