<template>
	<div class="app_first">
		<!-- 过滤栏 组件-->
		<div>
		    <!-- 本周(按钮) -->	    
	  		<div class="block">
		  		  <button class="el-icon-arrow-left btn" @click="getPrevWeek"></button>
		  		  <span class="week" v-text="weekText" v-model="weekText"></span>
		  		  <button class="el-icon-arrow-right btn" @click="getNextWeek"></button>
	  		</div>

	  		<!-- 日期 -->
	  		<div class="block">
	  		      <el-date-picker v-model="todayTime_value" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
	  		</div>

			<!-- 科室 -->
			<div class="block block_small">
	  		    <el-select v-model="office_value" placeholder="所有科室">
		  		      <el-option v-for="item in office_options" :key="item.office_value" :label="item.office_label" :value="item.office_value">
		  		      </el-option>
	  		  	</el-select>
	  		</div>
	  		  
	  	    <!-- 类型 -->
	  	    <div class="block block_small">
	  		    <el-select v-model="type_value" placeholder="所有类型">
		  		      <el-option v-for="item in type_options" :key="item.type_value" :label="item.type_label" :value="item.type_value">
		  		      </el-option>
	  		  </el-select>
	  		</div>
	  		  
	  	    <!-- 所有人 -->
	  	    <div class="block block_small">
	  		    <el-select v-model="doctor_value" placeholder="所有人">
		  		      <el-option v-for="item in doctor_options" :key="item.doctor_value" :label="item.doctor_label" :value="item.doctor_value">
		  		      </el-option>
	  		  </el-select>
	  		</div> 	

	  		<!-- 复选框(只看我的排班)-->
	  		<div class="block block1">
	  			<el-checkbox v-model="checked">只看我的排班</el-checkbox>
	  		</div> 
		</div>
  		<!-- 表单 组件-->
  		<div class="table1">
  			<table border="1" cellspacing="0">
					<tr>					
						<td v-for = "(item,index) in items" >
							<!-- {{ weeks[index].item.week_value }} -->
							<!-- 周几 -->
							<span v-model="which_weekDay" v-if="(which_weekDay+index)<7">{{ dayNames[which_weekDay+index]}}</span>
							<span v-else>{{ dayNames[which_weekDay+index-7]}}</span>	
							<br>




							<!-- 日期几月几号 -->
							<span v-if="month===1||month===3 ||month===5 ||month===7||month===8 ||month===10||month===12">
								<span v-if="(day+index)<=31">{{ month }}-{{ day+index }}</span>
								<span v-else>{{ month+1 }}-{{ day+index-31 }}</span>
							</span>
							<span v-else-if="month===4||month===6 ||month===9 ||month===11">
								<span v-if="(day+index)<=30">{{ month }}-{{ day+index }}</span>
								<span v-else>{{ month+1 }}-{{ day+index-30 }}</span>
							</span>
							<span v-else-if="year%4===0">
								<span v-if="(day+index)<=29">{{ month }}-{{ day+index }}</span>
								<span v-else>{{ month+1 }}-{{ day+index-29 }}</span>
							</span>
							<span v-else>
								<span v-if="(day+index)<=28">{{ month }}-{{ day+index }}</span>
								<span v-else>{{ month+1 }}-{{ day+index-28 }}</span>
							</span>





						</td>
					</tr>
					<tr class="td_65px">
						<!-- <td v-for="item in items">
							{{item.text}}
						</td> -->
						<td v-for="(item,week_index) in items">
							<span v-for="(item1,todo_index) in item.todos" @click="find_index(week_index,todo_index)" v-bind:class="{ add_catchUp_myClass : item1.active , findIndex_myClass : item1.findIndex_active}">
								<br>
								{{ item1.text }}
								<br>
								{{ item1.time_start }}
								{{ item1.time_end }}
							</span>
						</td>
					</tr>
			</table>
			<!-- 底部三个按钮 -->
	  		<div class="btns">
		  		<router-link to ="/home/arrange/new_add_work">
		  			<el-button type="success">
		  				新增排班
		  			</el-button>
		  		</router-link>
	  			<el-button class="btns_edit btn_foot">编辑排班</el-button>
	  			<el-button class="btn_delete btn_foot">删除排班</el-button>
	  		</div>  		
  		</div>			
		<router-view></router-view>
	</div>
</template>
<style type="text/css">
	body
	{
		background: #f1f1f1;
	}
	.app_first p
	{
	  color: #c2c2c2;
	  font-size: 14px;
	}
	.app_first .btn
	{
		border-radius: 100%;
		background: #ffffff;
		width: 30px;
		height: 30px;
		box-shadow: 1px 1px 5px #888888;
		border: #ebebeb;
		color: #b4b4b4;
		margin-left: 16px;
		float: left;
	}
	.app_first .week
	{
		background: #ffffff;
		color: #a1a1a3;
		width: 100px;
		height: 30px;
		display: block;
		padding-top: 5px;
		text-align: center;
		float: left;
		margin-left: 16px;
		margin-top: -3px;
	}
	.app_first .block
	{
		float: left;
		margin-left: 1%;
	}
	.app_first .block1
	{
		margin-top: 6px;
		padding-left: 20px;
	}
	.app_first .block_small
	{
		width: 120px;
	}
	.app_first .table1
	{
		width: 941px;
		height: 500px;
		position: absolute;
		margin: 57px 26px;
		background: #ffffff;
	}
	.app_first table
	{
		clear: left;
		border-color:rgba(255,255,255,.5);
		background: #ffffff;
		width: 850px;
		margin: 27px 48px;	

	}
	.app_first table
	{
		text-align: center;
	}
	.app_first .td_65px
	{
		height: 300px;
		opacity: .7;		
	}
	.app_first .btns
	{
		margin-left:35%;		
	}
	.app_first .btn_foot
	{
		margin-left: 18px;
		border: none;
		width: 80px;
		height: 30px;
		background: #f4f4f4;
	}
	.app_first .btn_add
	{
		background: green;
		color: #ffffff;
	}
</style>
<script>
	import store from '../../store';
	var myDate = new Date();
	import Vue from 'vue'; 
  	export default {
	    data () {
	     	 return {
	     	 	weekText:"本周",
	     	    pickerOptions0: {
	     	        disabledDate(time) {
	     	            return time.getTime() < Date.now() - 8.64e7;
	     	            }
	     	        },
	     	 	todayTime_value: Date.now(),
	     	 	year:myDate.getFullYear(),
	     	 	month:myDate.getMonth() + 1,
	     	 	day:myDate.getDate(),
	     	 	
	     	 	//获取今天是星期几(0-6 0代表星期天)
	     	 	which_weekDay:myDate.getDay(),
	     	 	dayNames:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],

	     	 	// 所有科室
	     	 	office_options: [{
		     	 	          office_value: '选项1',
		     	 	          office_label: '小儿科'
		     	 	        }, {
		     	 	          office_value: '选项2',
		     	 	          office_label: '眼睛科'
		     	 	        }, {
		     	 	          office_value: '选项3',
		     	 	          office_label: '口腔科'
		     	 	        }, {
		     	 	          office_value: '选项4',
		     	 	          office_label: '牙科'
		     	 	        }, {
		     	 	          office_value: '选项5',
		     	 	          office_label: '妇科'
		     	 	        }],
	     	 	office_value: '小儿科',
	     	 	// 所有科室
	     	 	type_options: [{
		     	 	          type_value: '选项1',
		     	 	          type_label: '普通门诊'
		     	 	        }, {
		     	 	          type_value: '选项2',
		     	 	          type_label: '专家门诊'
		     	 	        }, {
		     	 	          type_value: '选项3',
		     	 	          type_label: '专科门诊'
		     	 	        }, {
		     	 	          type_value: '选项4',
		     	 	          type_label: '特需门诊'
		     	 	        }, {
		     	 	          type_value: '选项5',
		     	 	          type_label: '夜间门诊'
		     	 	        }],
	     	 	type_value: '普通门诊',
	     	 	//所有人
	     	 	doctor_options: [{
		     	 	          doctor_value: '选项1',
		     	 	          doctor_label: '黄医生'
		     	 	        }, {
		     	 	          doctor_value: '选项2',
		     	 	          doctor_label: '李医生'
		     	 	        }, {
		     	 	          doctor_value: '选项3',
		     	 	          doctor_label: '牛医生'
		     	 	        }, {
		     	 	          doctor_value: '选项4',
		     	 	          doctor_label: '张医生'
		     	 	        }, {
		     	 	          doctor_value: '选项5',
		     	 	          doctor_label: '高医生'
		     	 	        }],
	     	 	doctor_value: '黄医生',
	     	 	//复选框
	     	 	checked: true,
	     	 	// 一个星期
	     	 	//7个休息
	     	 	items:store.state.weeks_content,
	     	 	// [
	     	 		// { text:"休息" },
	     	 		// { text:"休息" },
	     	 		// { text:"休息" },
	     	 		// { text:"休息" },
	     	 		// { text:"休息" },
	     	 		// { text:"休息" },
	     	 		// { text:"休息" }
	     	 	// ]


	     	}
	    },
	    mounted:function(){

	    	// this.items=JSON.parse(window.localStorage.getItem("weeks_contentValue"));
	    	// console.log("aaaaaaaaa",JSON.parse(window.localStorage.getItem("weeks_contentValue")));
	    },
	    methods:{

	    	getPrevWeek:function(){
	    		
	    		this.weekText = "上周";
	    		this.day = this.day - 7;
	    		console.log("打印出this.day",this.day);


	    		if(this.day <= 0)
	    		{
	    			this.day = this.day + 31;
	    			this.month = this.month - 1;
	    		}
	    		// if(this.day === this.todayTime_value.getDay() && this.month === (this.todayTime_value.getMonth() + 1))
	    		// {
	    		// 	this.weekText = "本周";
	    		// 	console.log("本周")
	    		// }
	    		if(this.month < 1)
	    		{
	    			this.month = this.month + 12;
	    			this.year = this.year - 1;
	    		}
	    		if(this.month > 12)
	    		{
	    			this.month = this.month - 12;
	    		}
	    	},
	    	getNextWeek:function(){
	    		console.log("下周");
	    		this.weekText="下周";
	    		this.day=this.day+7;
	    		if(this.day > 31)
	    		{
	    			this.day = this.day - 31;
	    			this.month = this.month + 1;
	    		}
	    		if(this.month > 12)
	    		{
	    			this.month = this.month - 12;
	    			this.year = this.year + 1;
	    		}
	    		
	    		if(this.day === new Date)
	    		{
	    			this.weekText = "本周";
	    		}




					// let that = this;
					// console.log("11111",this);
					// Vue.http.get('../static/next_week.json').then(function(response){
					// 	console.log(response);
					// 	console.log(response.data);
					// 	console.log(response.data.weekText);
					// 	that.weekText = response.data.weekText;
					// 	that.weeks = response.data.weeks;
					// 	// that.data = response.data;
					// 	// console.log(that.data);
					// },function(response){
					// 	alert("请求失败了");
					// })
				},
			
	    }
	}
</script>