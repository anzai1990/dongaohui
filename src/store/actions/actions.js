//处理异步修改数据的方法
export default {
	updataCountAsync(store,data){
		setTimeout(()=>{
			store.commit("updataCount",{
				num:data.num,
				num2:data.num2
			})
		},data.time)
	}
}
