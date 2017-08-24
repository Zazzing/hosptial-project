<template >
	<div class="Visdoctor">
		<div class="h-content">
			<div class="content-right"  >
				<div class="content-right-top">	
			            <el-row style="line-height:50px;">
							<span class="p1-name">刘医生</span>
							<el-radio-button >出诊</el-radio-button>
							<el-time-picker is-range v-model="value3" placeholder="选择时间范围">
							</el-time-picker>	  							 
						</el-row>	
<!-- 						<el-button class="filter-item" type="primary" @click="handleCreate()"  icon="edit">新增报备</el-button>    -->						  									
				</div>
				<div class="content-right-bottom" style="padding-top: 0">
				<template>
					<el-table :data="tableData" border style="width: 100%;">
					    <el-table-column label="时间" width="180">
					     	<template scope="scope">
					        	<el-icon name="time"></el-icon>
					        	<span style="margin-left: 10px">{{ scope.row.date }}</span>
					      	</template>
					    </el-table-column>
					    <el-table-column label="预约人" width="180">
					        <template scope="scope">
					            <div slot="reference" class="name-wrapper">
					                <p>姓名: {{ scope.row.name }}</p>
					           	 	<p class="phone-s">手机号码: {{ scope.row.phone }}</p>
					          	</div>
					      </template>
					    </el-table-column>
					    <el-table-column label="状态更改" style="text-aligin:left;">
					      <template scope="scope">
					            <div slot="reference" class="name-span">
					       		<span><el-button type="text"><i class="el-icon-time"></i>  签到</el-button></span>
						  		<span><el-button type="text"><i class="el-icon-edit"></i>  测量</el-button></span>
						  		<span>
						  		<router-link to="/home/reservation/Vdetails">
						  		<el-button type="text"><i class="el-icon-document"></i>  详情</el-button>
						  		</router-link>
						  		</span>
						  		<span><el-button type="text"  @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-close"></i>  取消</el-button></span>
						  		</div>
					      </template>
					    </el-table-column>
					  </el-table>
				</template>
				</div>
			</div>
		</div>
	</div>
		
</template>
<script>	
   import "../../assets/css/style1.css"
   import {api} from '../../global/api';
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
            
		    
       tableData: null
	        
	    }
	  },
	
	  methods:{
	  	getData:function(){
	  		// 这里可以写ajax方法
	  		     let me = this;			
					this.$http.get(api.testData).then(function(response){
						// alert(0)
						console.log(response)												
						console.log("这是我们需要的json数据",response.data)
						this.tableData = response.data;

					}, function(response){
						alert("请求失败了")
					})
	  	},
	  	//点击取消
	  	handleDelete (index, row) {
	  	  this.tableData.splice(index, 1);
	  	  this.$message({
	  	    message: "操作成功！",
	  	    type: 'success'
	  	  });
	  	},
	  },

	 mounted(){
	 			 this.getData();
			}

	}
</script>

<style>
	body{
		/*background-color: #333;*/
		background-color: #F6F6F6;
	}
	.Visdoctor .name-span span{
		margin-left: 25px;
	}
	.Visdoctor .name-wrapper{
		text-align: left;
	}
	.Visdoctor .phone-s{
		width: 175px;
	}
</style>