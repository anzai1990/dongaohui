<template>
  <div id="app">
  	<div class="content_">
			<canvas id="mycanvas" width="600" height="500">
				你的浏览器不支持canvas，请升级你的浏览器
			</canvas>
  		<div class="page_">
  			<div class="page_inner">
			    <router-view/>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
	//import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
	export default {
	  name: 'App',
	  data () {
	    return {
	    	num:'',
	    }
	  },
	  mounted(){
	  	this.init();
	  	/*console.log(this.$store)
	  	this.updataCountAsync({
	  		num:5,
	  		num2:15,
	  		time:2000
	  	})
	  	this['b/testAction']()*/
	  	/*let i=1
	  		setInterval(()=>{
	  		this.updataCount({
	  			num:i++,
	  			num2:2
	  		})
	  	},1000)*/
	  },
	  methods:{
	  	init(){
        var canvas=document.getElementById('mycanvas')
				//canvas.style.border="1px solid #ddd"
				var screenW=window.innerWidth
				var screenH=window.innerHeight
				canvas.width=screenW
				canvas.height=screenH
				var ctx=canvas.getContext("2d");
				//初始化粒子系统
				var snow_num =40;
				var snow = [];
				for(var i=0;i<snow_num;i++){
					snow.push({
						X:Math.random()*screenW,
						Y:Math.random()*screenH,
						R:Math.random()*3+1,
						D:Math.random()*snow_num,
					})
				//console.log(0.8*snow[i].R/4)
				}
				//console.log(snow)
				//绘制雪花
				function draw(){
					ctx.clearRect(0,0,screenW,screenH);
					for(var i=0;i<snow_num;i++){
						ctx.beginPath();
						var s=snow[i];
						ctx.fillStyle="rgba(255,255,255,"+s.R/4+")";
						ctx.moveTo(s.X,s.Y);
						ctx.arc(s.X,s.Y,s.R,0,Math.PI*2,true);
						ctx.fill();
					}
					update();
				}
				
				//制作飘落
				var angle=0;
				function update(){
					angle += 0.01;
					for(var i=0;i<snow_num;i++){
						var s=snow[i];
						s.Y += Math.cos(angle+s.D) + 1 + s.R/2;
						s.X += Math.sin(angle) * 2;
						if(s.X>screenW+5||s.X<-5||s.Y>screenH){
							if(i%3>0){
								snow[i]={X: Math.random()*screenW, Y: -10, R: s.R, D:s.D};
							}else{
								if(Math.sin(angle)>0){
									snow[i] = {X: -5, Y: Math.random()*screenH, R: s.R, D: s.D};
								}else{
									snow[i] = {X: screenW+5, Y: Math.random()*screenH, R: s.R, D: s.D};
								}
							}
						}
					}
				}

				setInterval(draw, 33);
			  
	  	},
	  	/*...mapActions(['updataCountAsync','a/add','b/testAction']),
	  	...mapMutations(['updataCount','a/updataText'])*/
	  },
	  computed:{
	  	/*textA(){
	  		return this.$store.state.a.text
	  	},*/
	  	/*...mapState({
	  		//counter:'count'
	  		counter:(state)=> state.count,
	  		textA:state=> state.a.text,
	  		textC:state=> state.c.text
	  	}),
	  	...mapGetters({
	  		'fullName':'fullName',
	  		textPlus:'a/textPlus'
	  	})*/
	  	/*fullName(){
	  		return this.$store.getters.fullName
	  	}*/
	  }
	}
</script>

<style lang="scss" >
	.content_, .page_{position: absolute; top: 0; right: 0; left: 0; bottom: 0;
		&.page_{overflow-y: scroll; -webkit-overflow-scrolling: touch; z-index: 1; height: 100%; margin-right: -20px; padding-right: 20px;z-index: 1;}
		&.content_{overflow: hidden;background: $body_color;}
	}
	.page_inner{height: calc(100% + 1px);}
	#mycanvas{z-index: 0;position: fixed;top: 0;left: 0}
</style>
