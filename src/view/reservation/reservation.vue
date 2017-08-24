<template >
	<div class="reservation">
		<div class="h-header-bottom">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="background-color: #ffffff;">
				<router-link to="/home/reservation/Mrliu">
			        <el-menu-item index="1">今日预约</el-menu-item>
			    </router-link>


			    <router-link to="/home/reservation/appointreport">
			        <el-menu-item index="2">预约报备</el-menu-item>
			    </router-link>
<!-- 			    
			    <router-link to="">
			        <el-menu-item index="3">所有预约</el-menu-item>
			    </router-link> -->

			</el-menu> 	
		</div>
		<router-view></router-view> 
	</div>
	
	
</template>

<script>
import "../../assets/css/style1.css"
	//npm i element-ui -S 等同于
	//npm install element-ui --save
	export default {
	  name: 'home',
	  data: function () {
	    return {
	    	 value3: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
	    	formInline: {
                user: '',
                region: ''
            },
            activeIndex:'1'
	    }
	  },
	  
	  methods:{
	  	getData:function(){
	  		//这里可以写ajax方法
	  		//       let me = this;
				

					// Vue.http.get('testData.json').then(function(response){

					// 	console.log(response)
					// 	console.log("这是我们需要的json数据",response.data)
					// 	// this.formData = response.data; //this.formData拿不到
					// 	me.formData = response.data;

					// }, function(response){
					// 	alert("请求失败了")
					// })
	  	}
	  }
	}
</script>

<style>
	body{
        /*background-color: #333;*/
        background-color: #F6F6F6;
    }
    
	
</style>