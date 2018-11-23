<template>
  <div class="rull">
    <div class="por">
		  <img class="disB" style="width:100%" :src="imgUrl+images_1">
      <img class="poa bg_1" :src="imgUrl+bg_1">
      <img class="poa images_panda" :src="imgUrl+images_panda">
      <router-link to="/signup" class="signup poa" tag="div"></router-link>
    </div>
    <div class="num_group">
      <div>
        <h5>参与报名</h5>
        <h3>{{info.forward}}</h3>
      </div>
      <div>
        <h5>当前票数</h5>
        <h3>{{info.forward}}</h3>
      </div>
      <div>
        <h5>总点击数</h5>
        <h3>{{info.click}}</h3>
      </div>
      <div>
        <h5>转发</h5>
        <h3>{{info.num}}</h3>
      </div>
    </div>
    <div class="time_box bg_ncc100" :style="{backgroundImage:'url('+imgUrl+bg_down+')'}">
      <img class="icon_clock" :src="imgUrl+icon_clock" >
      <div>
        <h5 style="color:#B00C0C">活动倒计时：{{daojishi}}</h5>
        <h6 class="color_6">{{start_time|time('yyyy-MM-dd hh:mm:ss')}}至{{end_time|time('yyyy-MM-dd hh:mm:ss')}}</h6>
      </div>
    </div>
    <div class="page_nav">
      <router-link tag="div" to="/match">
        <img :src="imgUrl+icon_match">
        最新参赛
      </router-link>
      <router-link tag="div" to="/popularity">
        <img :src="imgUrl+icon_popularity">
        人气榜单
      </router-link>
      <router-link tag="div" to="/rule">
        <img :src="imgUrl+icon_rule">
        活动规则
      </router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="active_imp">
      <h5>
        <img :src="imgUrl+iocn_synopsis">
        活动简介
      </h5>
      <h6>
1、本次活动唯一官方入口：成都电视台新闻综合频道官方微信公众号“一头条”；<br/>
2、每个人可以同一天对10个参赛选手投票，每人最多三票；<br/>
3、投票过程中如发现恶意刷票行为，为保证活动的公正性，工作人员有权对其处理。
扫一扫，下载神鸟资讯APP，了解更多
      <img :src="imgUrl+images_code">
      </h6>
    </div>
    <div class="tip_PN">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="pof search_box">
      <input type="search" v-model="search" @keyup.13="show($event)" placeholder="请输入关键字">
      <router-link tag="div" class="btn_" :to="{path:'/match',query:{'keywords':search}}">搜索</router-link> 
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
  name: 'pageNav',
  data () {
    return {
    	token:'',
    	imgUrl:imgUrl,
    	gg:"images_ad2.png",
    	gg2:"images_ad3.png",
      bg_gg_name:"bg_gg_name.png",
      images_1:'images_1.png',
      bg_1:'bg_1.png',
      images_panda:'images_panda.png',
      icon_clock:'icon_clock.png',
      icon_match:'icon_match.png',
      icon_popularity:'icon_popularity.png',
      icon_rule:'icon_rule.png',
      iocn_synopsis:'iocn_synopsis.png',
      images_code:'images_code.png',
      bg_down:'bg_down.png',

      info:'',//数据
      search:'',//搜索学生

      start_time:'',//开始时间
      end_time:'',//结束时间
      daojishi:'',//倒计时时间
    }
  },
  mounted(){
		this.token=sessionStorage.getItem("token")
  	this.init()
  },
  methods:{
  	init(){
  		this.$http({
  				method:"post",
			    url:baseUrl+'user/activityRule',
			    data:this.toParams({
			    	token:this.token,
			  	}),
			  	headers:{
			        'Content-type': 'application/x-www-form-urlencoded',
			    },
			}).then((res)=>{
				if(res.data.code=='200'){
					let data=res.data.data//获取页面数据
          this.info=data.info
          this.end_time=data.activity.end_time
          this.start_time=data.activity.start_time
          setInterval( ()=> {
            var rightTime = this.end_time*1000 - new Date().getTime();
            if (rightTime > 0) {
              var dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
              var hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
              var mm = Math.floor((rightTime / 1000 / 60) % 60);
              var ss = Math.floor((rightTime / 1000) % 60);
              this.daojishi = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
            }else{
              this.daojishi='活动结束了'
            }
          }, 1000);
          this.InitTime(this.daojishi);
				}else if(res.data.code=='300'){
					window.location.href=res.data.data.url
				}else{
					console.log("msg:"+msg)
				}
			}).catch((err)=>{
				console.log(err);
			});
    },
    show(ev){
			if(ev.keyCode == 13){
        this.$router.push({ 
        	path:'/match',
        	query:{'keywords':this.search}
        })
      }
    },
    InitTime(endtime){//倒计时方法
      var dd,hh,mm,ss = null;
      var time = parseInt(endtime) -  parseInt(new Date().getTime());
      dd = Math.floor(time / 60 / 60 / 24);
      hh = Math.floor((time / 60 / 60) % 24);
      mm = Math.floor((time / 60) % 60);
      ss = Math.floor(time  % 60);
      var str = dd+"天"+hh+"小时"+mm+"分"+ss+"秒";
      return str;
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
  filters: {
    time: function (value,fmt) {
      let getDate = new Date(value*1000);
      let o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      'S': getDate.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      }
      return fmt;
    }
  }
}
</script>
<style lang="scss" scoped>
  .search_box{top: 3.5rem;left: 0;border-radius: 0 .75rem .75rem 0;background: #fff;@include flex($jc:center,$ai:center);height:1.5rem;box-shadow: 0px 0.075rem 0.175rem 0px rgba(0, 0, 0, 0.37);
    .btn_{width: 3rem;height: 1.5rem;margin: 0;margin-right: -.2rem;}
    input[type='search']{height: 1.5rem;
      width: 6.5rem;border: 0;font-size: .7rem;padding: 0 .25rem;
    }
  }
	.logo{width: 5.625rem;height: 3.25rem;}
	
  .signup{bottom: 0;height: 4.6rem;left: 36%;right: 36%;}
  .bg_1{width: 100%;left: 0;bottom: -.8rem;}
  .images_panda{width:4.95rem;left: 0;bottom: -.8rem;}
  .num_group{margin-top: .8rem;@include flex($jc:space-around);text-align: center;color: #fff;padding-bottom: .625rem;border-bottom:1px solid #80ACD3;margin-bottom: 0.75rem}
  .icon_clock{
    width:2rem;height: 2rem;
  }
  .time_box{@include flex($jc:flex-start);padding-left: 1.5rem;margin:0 auto 1rem;
   width:17.7rem;height:3.925rem;border-radius:17.275rem;
   img{margin-right: .5rem}
  }
  .page_nav{@include flex($jc:space-around);
    >div{@include flex($jc:center);color: #fff;font-size: .7rem;
    width:5rem;height:1.5rem;
      &.router-link-active{background:linear-gradient(180deg,rgba(243,207,13,1),rgba(223,191,16,1));
box-shadow:0px 0.075rem 0.175rem 0px rgba(0, 0, 0, 0.37);
border-radius:0.75rem;}
    }
    img{width: 1.25rem;height: 1.25rem;}
  }
  .active_imp{
    padding: $pad_lr;border-top: 1px solid #80ACD3;color:#fff;
    h5{@include flex($jc:flex-start);margin-bottom:.25rem;
      img{width: .75rem;height: 0.75rem;margin-right: .25rem;}
    }
    h6{
      img{display: block;margin: .75rem auto;width: 6.5rem;}
    }
  }
  @keyframes tip_pN{
    from{opacity: 0;}
    50%{opacity: 1;}
    to{opacity: 0;}
  }
  .tip_PN{position: fixed;bottom:1rem;right:1rem;opacity: .5;
    span{position: absolute;top: 0;left: 0;display: block;width: .5rem;height: .1rem;background: #fff;
      @for $i from 1 through 3{
        &:nth-child(#{$i*2-1}){
          top: .25*($i - 1)+rem;
          transform: rotate(30deg) translateX(-45%);
          animation: tip_pN 1s .3*($i - 1)+s ease infinite;
        }
        &:nth-child(#{$i*2}){
          top: .25*($i - 1)+rem;
          transform: rotate(-30deg) translateX(45%);
          animation: tip_pN 1s .3*($i - 1)+s ease infinite;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }
  .fade-enter {
    opacity: 0;
    transform: translateX(-50%)
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(50%)
  }

</style>
