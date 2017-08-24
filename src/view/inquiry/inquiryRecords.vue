<template>
	<div class="inOne-records">
		<div class="inOne-TabRecords">
		  <h3>主诉:</h3>
		  <p>发热，感到不舒服，之前几天一直睡不着，吃了药也没用............</p>
		</div>
		<form>
			<div class="inOne-TabRecords" v-for="item in formData">
			  <h3>{{ item.text }}</h3>
			  <textarea placeholder="请输入....." v-model="item.checkText"></textarea>
			</div>
		</form>
		<div class="inOne-TabBttom">
          <el-button  @click="saveData()" type="primary"><i class="fa fa-floppy-o"></i>保存</el-button>
          <el-button @click="resetData()" type="primary"><i class="fa fa-pencil" aria-hidden="true"></i>重置</el-button>
        </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formData:[
					{text:'病史:',checkText:''},
					{text:'体格检查:',checkText:''},
					{text:'辅助检查及治疗:',checkText:''},
					{text:'诊断:',checkText:''}
				]
			}
		},
		methods:{
			saveData(){
				let that = this
        		// console.log('单个删除选择的row：',index,'-----',row);
    			that.$confirm('确认保存吗？', '提示', {}).then(() => {
    				that.$message({
	    				type: 'success',
	    				message: '已保存在控制台了哟'
    				});
    				console.log(JSON.stringify(this.formData));
    			}).catch(() => {
    				this.$message({
    			    	type: 'info',
    			    	message: '已取消保存'
    				}); 
				});	
			},
			resetData(){
				let that = this
        		// console.log('单个删除选择的row：',index,'-----',row);
    			that.$confirm('确认重置吗？', '提示', {}).then(() => {
    				that.$message({
	    				type: 'success',
	    				message: '已重置了哟'
    				});
    				that.formData = [
						{text:'病史:',checkText:''},
						{text:'体格检查:',checkText:''},
						{text:'辅助检查及治疗:',checkText:''},
						{text:'诊断:',checkText:''}
					]
    			}).catch(() => {
    				this.$message({
    			    	type: 'info',
    			    	message: '已取消保存'
    				}); 
				});	
			}
		}
	}
</script>

<style>
	.inOne-TabRecords{
	    padding-top: 30px;
	    padding-bottom: 30px;
	    border-bottom: 1px solid #dcdcdc;
  	}
	.inOne-NoRecords{
	    border-bottom: none;
	}
  	.inOne-TabRecords h3,.inOne-TabRecords p{
    	margin: 0;
  	}
  	.inOne-TabRecords p{
    	margin-left: 20px;
  	}
  	.inOne-TabRecords h3{
	    float: left;
	    font-size: 18px;
	    font-weight: normal;
	    width: 10%;
  	}
  	.inOne-TabRecords p{
	   	width: 75%;
	    display: inline-block;
	    white-space: pre-wrap;
	    color: #646a6b;
  	}
  	.inOne-TabRecords textarea{
	    width: 80%;
	    display: inline-block;
	    white-space: pre-wrap;
	    color: #646a6b;
	    height: 100px;
	    margin-left: 20px;
  	}
  	.inOne-TabBttom{
  		text-align: center;
  	}
  	.inOne-TabBttom h2{
  		color: blue;
  		padding-left: 0;
  		margin-right: 20px;
  		cursor: pointer;
  	}
</style>