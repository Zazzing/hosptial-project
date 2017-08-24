<template >
	<div class="Mrliu">
		<div class="h-content">
			<div class="content-left" >
			    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="    text-align: left;margin-left: 4%;margin-top: 11%;}"> 
					  <el-form-item >
					    <el-select v-model="formInline.region" placeholder="全部科室">
					      <el-option label="科室一" value="shanghai"></el-option>
					      <el-option label="科室二" value="beijing"></el-option>
					    </el-select> 
					  </el-form-item>
				</el-form>
			    <el-menu default-active="1" class="el-menu-vertical-demo" style="background-color: #ffffff;" >
				    <router-link to="/home/reservation/Mrliu/Visdoctor" style="text-decoration:none;color:#48576a;">
				      	<el-menu-item index="1">出诊医生</el-menu-item>
				    </router-link>    
				    <router-link to="/home/reservation/Mrliu/liuContent" style="text-decoration:none;color:#48576a;">
				    	<el-menu-item index="2">刘医生</el-menu-item>
				    </router-link> 
				      <el-menu-item index="3">李医生</el-menu-item>
				      <el-menu-item index="4">张医生</el-menu-item>
				      <el-menu-item index="5">王医生</el-menu-item>
			    </el-menu>
		        
			</div>

			 <div class="content-right" style="height:700px;"  >
			 	<router-view></router-view> 
			</div> 
		</div>
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
            }
	    }
	  },
	
	  methods:{
	  	getData:function(){
	  	}
	  }
	}
</script>

<style>
	body{
		background-color: #F6F6F6;
	}

</style>