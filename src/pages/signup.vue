<template>
  <div class="signup">
		<img style="width:100%" :src="imgUrl+banner">

		<div class="group_input color_f">
			<h3>Zone</h3>
			<h3>赛区<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box" @click="openZone()">
				<div class="input_">{{Zone}}</div>
				<img class="poa" :src="imgUrl+icon_open">
			</div>
			<!-- 赛区弹框 -->
			<mt-popup
				v-model="popupVisible_zone"
				position="bottom" class=" popup_s">
				<mt-picker :slots="ZoneList" @change="onValuesChangeZone"></mt-picker>
			</mt-popup>
		</div>

		<div class="group_input color_f">
			<h3>Group</h3>
			<h3>参选组别<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box" @click="openGroup()">
				<div class="input_">{{Group}}</div>
				<img class="poa" :src="imgUrl+icon_open">
			</div>
			<!-- 参选组别弹框 -->
			<mt-popup
				v-model="popupVisible_group"
				position="bottom" class=" popup_s">
				<mt-picker :slots="GroupList" @change="onValuesChangeGroup"></mt-picker>
			</mt-popup>
		</div>

		<div class="group_input color_f">
			<h3>Name</h3>
			<h3>姓名<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="text" v-model="name">
			</div>
		</div>
		
		<div class="group_input color_f">
			<h3>Gender</h3>
			<h3>性别<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box" @click="openGender()">
				<div class="input_">{{Gender}}</div>
				<img class="poa" :src="imgUrl+icon_open">
			</div>
			<!-- 参选组别弹框 -->
			<mt-popup
				v-model="popupVisible_gender"
				position="bottom" class=" popup_s">
				<mt-picker :slots="GenderList" @change="onValuesChangeGender"></mt-picker>
			</mt-popup>
		</div>

		<div class="group_input color_f">
			<h3>One inch photo</h3>
			<h3>一寸照片<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<div class="input_"  @click="popupVisible_photo=!popupVisible_photo">
					{{phote_name}}
				</div>
				<input type="file" ref="file" @change="getFile" accept="image/gif,image/jpeg,image/jpg,image/png" class="van-uploader__input">
				<img class="poa button_file" :src="imgUrl+button_file">
			</div>
			<h6 class="mar_t10">提示：点击名称可预览照片</h6>
			<!-- 照片预览弹框 -->
			<mt-popup
				v-model="popupVisible_photo" class=" popup_photo">
				<img v-if="photo_url!=''" :src="photo_url">
				<template v-else>请选择照片</template>
			</mt-popup>
		</div>

		<div class="group_input color_f">
			<h3>Name of Chinese PhoneticAlphabet</h3>
			<h3>姓名汉语拼音<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="text" v-model="nameCh" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>Date of Birth</h3>
			<h3>出生日期<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="date" v-model="Birth" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>E-mail</h3>
			<h3>电子信箱<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="email" v-model="Email" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>School</h3>
			<h3>学校名称<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="text" v-model="School" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>Grade/Class</h3>
			<h3>年纪/班级<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="text" v-model="GradeClass" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>Home Address</h3>
			<h3>通讯地址<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="text" v-model="HomeAddress" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>Post Code</h3>
			<h3>邮编<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="number" v-model="PostCode" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>Parents’ Name</h3>
			<h3>家长1<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="text" v-model="ParentsName" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>Parents’ Mobile</h3>
			<h3>家长1手机号码<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="tel" v-model="ParentsMobile" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>Parents’ Name</h3>
			<h3>家长2</h3>
			<div class="por input_box">
				<input type="text" v-model="ParentsName2" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>Parents’ Mobile</h3>
			<h3>家长2手机号码</h3>
			<div class="por input_box">
				<input type="tel" v-model="ParentsMobile2" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>Tutor’s Name</h3>
			<h3>指导老师姓名<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="text" v-model="TutorName" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>Tutor’s Mobile</h3>
			<h3>指导老师手机号码<span style="color:#B00C0C">*</span></h3>
			<div class="por input_box">
				<input type="tel" v-model="TutorMobile" >
			</div>
		</div>
		<div class="group_input color_f">
			<h3>所参加英语比赛名称及获奖情况：</h3>
			<div class="por input_box">
				<textarea type="text" v-model="textArea" ></textarea>
			</div>
		</div>
		<div class="agrea">
			<div class="disIB" style="height: 1.2rem;" @click="agreae=!agreae">
				<img v-show="agreae" :src="imgUrl+agreae_img">
				<img v-show="!agreae" :src="imgUrl+agreae_img_no">
			</div>
			我同意
			<router-link to="/rule" tag="span" >参赛协议及注意事项</router-link>
		</div>
		<div class="btn_" @click="submit">提交</div>
		<a
			:href="item.ad_link"
			v-for="(item) in adlist"
			:key="item.ad_id"
		 	class="bg_nccc disB images_ad1 por" :style="{backgroundImage:'url('+item.ad_code+')'}">
			<img class="label_ad poa" :src="imgUrl+label_ad">
		</a>
  </div>
</template>

<script>

import { Popup ,Picker,Actionsheet,Toast,Indicator } from 'mint-ui';
import Vue from 'vue';
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Actionsheet.name, Actionsheet);

import baseConfig from '@/assets/baseConfig'
var imgUrl=baseConfig.imgUrl;
var baseUrl=baseConfig.baseUrl;
export default {
  name: 'Index',
  data () {
    return {
    	token:'',
    	imgUrl:imgUrl,
			banner:"banner_1.png",
			icon_open:"icon_open.png",

			popupVisible_zone:false,
    	ZoneList: [
				{
					flex: 1,
          values:[],
          className: 'slot1',
        },
			],
			Zone:'',

			popupVisible_group:false,
    	GroupList: [
				{
					flex: 1,
          values: [],
          className: 'slot1',
        },
			],
			Group:'',

			name:'',

			popupVisible_gender:false,
    	GenderList: [
				{
					flex: 1,
          values: ['男', '女'],
          className: 'slot1',
        },
			],
			Gender:'',

			button_file:"button_file.png",
			phote_name:'',//名称
			photo_img:'',//初始图片
			photo_url:'',//服务器返回图片地址
			popupVisible_photo:false,

			nameCh:'',
			Birth:'',
			Email:'',
			School:'',
			GradeClass:'',
			HomeAddress:'',
			PostCode:'',
			ParentsName:'',
			ParentsMobile:'',
			ParentsName2:'',
			ParentsMobile2:'',
			TutorName:'',
			TutorMobile:'',
			textArea:'',
			agreae:false,
			agreae_img:'icon_choose.png',
			agreae_img_no:'icon_choose_no.png',

			popupVisible_agreae:false,

			images_ad1:'images_ad1.png',
			label_ad:'label_ad.png',
			adlist:'',//底部广告
    }
  },
  mounted(){
	

		this.token=sessionStorage.getItem("token")
		this.init()
	},
  methods:{
  	init(){
			//报名表初始数据
			this.$http({
				method:"get",
				url:baseUrl+'user/sign?utoken='+this.token,
			}).then((res)=>{
				if(res.data.code=='200'){
					let data=res.data.data//获取页面数据
					//赛区
					let Zonearr=[];
					data.d_list.forEach(item=>{
						Zonearr.push(item.name)
					})
					this.ZoneList[0].values=Zonearr
					//参赛组别
					let Grouparr=[];
					data.group.forEach(item=>{
						Grouparr.push(item.name)
					})
					this.GroupList[0].values=Grouparr
					//广告
					this.adlist=data.ad
				}else if(res.data.code=='300'){
					window.location.href=res.data.data.url
				}else{
					console.log("msg:"+msg)
				}
			}).catch((err)=>{
				console.log(err);
			});
		},
		openZone(){
			this.popupVisible_zone=!this.popupVisible_zone
		},
		onValuesChangeZone(picker, values) {
			this.Zone=values[0]
		},
		
		openGroup(){
			this.popupVisible_group=!this.popupVisible_group
		},
		onValuesChangeGroup(picker, values) {
			this.Group=values[0]
		},
		
		openGender(){
			this.popupVisible_gender=!this.popupVisible_gender
		},
		onValuesChangeGender(picker, values) {
			this.Gender=values[0]
    },
		getFile(e){
			let type = /^image\/?(gif|png|jpg|jpeg)$/
			console.log(e.target.files[0].type)
			if(!type.test(e.target.files[0].type)){
				Toast({message:'文件格式不支持',duration: 1000,} );
				return false;
			}
		  if(e.target.files[0].size>2*1024*1024){
				Toast({message:'图片大小不得超过2M',duration: 1000,} );
				return false;
			}
			Indicator.open('图片上传中...');
			this.photo_img=e.target.files[0]
			this.phote_name=e.target.files[0].name
			console.log(this.photo_img);
			var formData = new FormData()
			formData.append('file',e.target.files[0])
			console.log(formData)
			this.$http.post(baseUrl+'file/uploadimage?utoken='+this.token, formData)
			.then(res=> {
				if(res.data.code="200"){
					Indicator.close()
					let data=res.data.data//获取页面数据
					this.photo_url=data.path
				}else if(res.data.code=='300'){
					window.location.href=res.data.data.url
				}else{
					console.log('通信错误')
				}
			})
		},
		submit(){
			if(!this.agreae){
				Toast({message:'请仔细阅读参赛协议及注意事项并选中',duration: 1000,} );
				return false;
			}
			this.$http({
				method:"post",
				url:baseUrl+'user/sign_form',
				data:this.toParams({
					utoken:this.token,
					region:this.Zone,//赛区名
					group:this.Group,//参赛组别
					user_name:this.name,//姓名
					image:this.photo_url,//图片路径
					sex:this.Gender,//性别
					alphabet:this.nameCh,//姓名汉语拼音
					birthday:this.Birth,//出生日期
					email:this.Email,//电子信箱
					school:this.School,//学校名称
					grade_class:this.GradeClass,//年级班级
					address:this.HomeAddress,//通信地址
					post_code:this.PostCode,//邮编
					parent_name:this.ParentsName,//家长1
					parent_tel:this.ParentsMobile,//家长1电话
					parent_name2:this.ParentsName2,//家长2
					parent_tel2:this.ParentsMobile2,//家长2电话
					tutor_name:this.TutorName,//指导老师姓名
					tutor_tel:this.TutorMobile,//指导老是电话
					desc:this.textArea,//获奖情况
				}),
				headers:{
					'Content-type': 'application/x-www-form-urlencoded',
				},
			}).then((res)=>{
				if(res.data.code=='200'){
					
					this.$router.push({
						path:'/index',
						query:{
							code:res.data.data.registration_num
						}
					})
				}else if(res.data.code=='300'){
					window.location.href=res.data.data.url
				}else{
					Toast({message:res.data.message,duration: 1000,});
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
	.popup_s{width: 100%;}
	.group_input{padding: 0 $pad_lr;margin-bottom:.25rem;
		.input_box{overflow: hidden;
			input,.input_{padding-left: .5rem;width: 100%;background: rgba(128,172,211,1);border: 0;height: 2rem;line-height: 2rem;color: #fff;font-size: 0.9rem;
				&.van-uploader__input{opacity: 0;position: absolute;width: 2.55rem;height: 100%;top: 0;right: 0;z-index: 3;padding: 0;}
			}
			textarea{width: 17.25rem;height: 6.875rem;background: rgba(128,172,211,1);border: 0;padding: .5rem;font-size: .8rem;color:#fff;}
			img{width: .75rem;height: 0.75rem;top: 0.625rem;right: 0.375rem;
				&.button_file{width: 2.55rem;height: 2rem;top: 0;right:0;}
			}
		}
	}
	.agrea{margin-top: .4rem;padding: 0 .75rem;font-size:.9rem;display:flex;align-items: center;
		span{color: #1EDB65}
		img{width: 1.2rem;height: 1.2rem;margin-right: .25rem}
	}
	
	.agreae_box{width: 16.25rem;padding: .5rem;
		>div{overflow-y: auto;height: 20rem;}
	}
	.images_ad1{width: 17.25rem;height: 4.95rem;margin: 0 auto 1rem;
		.label_ad{width: 1.5rem;right: 0;bottom: 0;}
	}
	.popup_photo{color:#fff;background: rgba(0,0,0,0);font-size: 0.75rem;
		img{max-width: 15rem;max-height: 20rem;}
	}
	
</style>
