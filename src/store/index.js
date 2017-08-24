import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
		state:{
			userInfo:{
				userName: "",
				password: ""
			},
			per:{
				name:'刘医生'
			},
			weeks_content:
	     	 	[
					{ todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
	     	 		{ todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
	     	 		{ todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
	     	 		{ todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
	     	 		{ todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
	     	 		{ todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] },
	     	 		{ todos: [{text:"暂无排班" , time_start:"" , time_end:"" , active:false ,findIndex_active : false}] }
	     	 	]
			
		},
		
})

export default store;