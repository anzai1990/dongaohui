//同步的修改数据的方法
export default {
	updataCount(state,{num,num2}){
		console.log(num2)
		state.count = num
	}
}
