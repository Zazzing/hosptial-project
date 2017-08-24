<template >
	<div class="liuContent">
			<div class="content-right" style="height:700px;"  >
				<div class="content-right-top"  style="margin-top:1.25%;">	
			        <el-row style="line-height:50px;">
						<span class="p1-name">刘医生</span>
						<el-radio-button>出诊</el-radio-button>
						<el-time-picker is-range v-model="value3" placeholder="选择时间范围">
						</el-time-picker>	  							 
					</el-row>	
				</div>
				<div class="content-right-bottom" style="padding-top: 2%">
					<img src="../../assets/40.png" class="bells" style="margin-left: 40%;margin-top: 16%;" > 
					<p style="margin-left: 45%;opacity: 0.6;">暂无预约信息</p>		
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