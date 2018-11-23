//模块
export default {
	a:{
		namespaced:true,//模块命名空间
		state:{
			text:1
		},
		mutations:{
			updataText(state,text){
				console.log(state)
				state.text = text
			}
		},
		getters:{
			textPlus(state,getters,rootState){
				return state.text + rootState.b.text
			}
		},
		actions:{
			add({state,commit,rootState}){
				commit('updataCount',{num:56789},{root:true})
			}
		}
	},
	b:{
		namespaced:true,//模块命名空间
		state:{
			text:50
		},
		actions:{
			testAction({state,commit,rootState}){
				commit('a/updataText','test 222 text',{root:true})
			}
		}
	}
}