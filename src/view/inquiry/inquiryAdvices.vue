<template>
	<div>
		<div class="inOne-advice">
		  <el-input v-model="searchTxt" placeholder="请输入内容" style="width:25%"></el-input>
		  <el-button type="primary" icon="search">搜索</el-button>
		  <el-button type="primary" icon="edit" @click="handleAdd()">新增</el-button>
		</div>
		<!-- 列表 -->
		<div class="inOne-table">
		  <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
		    <el-table-column type="selection" width="50">
		    </el-table-column>
		    <el-table-column align="center" label='组号' width="100">
		        <template scope="scope">
		          {{ scope.row.groupIndex}}
		      </template>
		    </el-table-column>
		    <el-table-column align="center" label='名称(规格)' width="150">
		        <template scope="scope">
		          {{ scope.row.dragName }}
		      </template>
		    </el-table-column>
		    <el-table-column align="center" label='天数' width="100">
		        <template scope="scope">
		         {{ scope.row.days }}
		      </template>
		    </el-table-column>
		    <el-table-column align="center" label='数量' width="100">
		        <template scope="scope">
		          {{ scope.row.number }}
		      </template>
		    </el-table-column>
		    <el-table-column align="center" label='单价(元)' width="100">
		        <template scope="scope">
		          {{ scope.row.price }}
		      </template>
		    </el-table-column>
		    <el-table-column label="操作">
		      <template scope="scope">
		      	<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>		        
		      </template>
		    </el-table-column>
		  </el-table>
		</div>		
		<!--新增界面-->
		<div>
			<el-dialog title="表单新增" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
          		<el-form label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'
          		:model="addform" :rules="addFormRules" ref="addform">
					<el-form-item label="组号" prop="groupIndex">
            			<el-select v-model="addform.groupIndex" placeholder="组号">
    						<el-option v-for="item in values" :key="item.value" v-model="item.value">
    						</el-option>
  						</el-select>
            		</el-form-item>
            		<el-form-item label="名称(规格)" prop="dragName">
              			<el-input v-model="addform.dragName"></el-input>
            		</el-form-item>
            		<el-form-item label="天数" prop="days">
						<el-input-number :min="1" :max="58" v-model="addform.days"></el-input-number>
					</el-form-item>
			        <el-form-item label="数量" prop="number">
			            <el-input-number :min="1" :max="200" v-model="addform.number"></el-input-number>
			        </el-form-item>
			        <el-form-item label="单价(元)" prop="price">
			            <el-input-number :min="1" v-model="addform.price"></el-input-number>
			        </el-form-item>
          		</el-form>
          		<div slot="footer" class="dialog-footer">
          			<el-button type="primary" @click="handleSubmit()">确定</el-button>
            		<el-button type="primary" @click="handleReset()">重置</el-button>
            		<el-button @click="addCancel()">取消</el-button>
          		</div>
   		    </el-dialog>
   		</div>	
   		<!--编辑界面-->
		<div>
			<el-dialog title="表单编辑" :visible.sync="dialogEditVisible" :close-on-click-modal="false">
          		<el-form label-position="left" label-width="90px" style='width: 400px; margin-left:50px;' :model="editform" :rules="addFormRules" ref="editform">
					<el-form-item label="组号" prop="groupIndex">
            			<el-select v-model="editform.groupIndex" placeholder="组号">
    						<el-option v-for="item in values" :key="item.value" v-model="item.value">
    						</el-option>
  						</el-select>
            		</el-form-item>
            		<el-form-item label="名称(规格)" prop="dragName">
              			<el-input v-model="editform.dragName"></el-input>
            		</el-form-item>
            		<el-form-item label="天数" prop="days">
						<el-input-number :min="1" :max="58" v-model="editform.days"></el-input-number>
					</el-form-item>
			        <el-form-item label="数量" prop="number">
			            <el-input-number :min="1" :max="200" v-model="editform.number"></el-input-number>
			        </el-form-item>
			        <el-form-item label="单价(元)" prop="price">
			            <el-input-number :min="1" v-model="editform.price"></el-input-number>
			        </el-form-item>
          		</el-form>
          		<div slot="footer" class="dialog-footer">
          			<el-button type="primary" @click="editSubmit()">确定</el-button>
            		<el-button @click="editCancel()">取消</el-button>
          		</div>
   		    </el-dialog>
   		</div>		
		<!-- <div class="inOne-Bottom">
			<el-button type="danger" @click="handleDelAll()">批量删除</el-button>
		</div> -->
    </div>
</template>

<style>
	.inOne-Bottom{
		margin-top: 20px;
	}
	.toolbarBottom{
		padding: 0 !important;
	}
</style>

<script>
import Vue from 'vue'
import {api} from '../../global/api'
export default {
	data() {
    	return {
	    	value:'',
	    	input:'',
	        tableData: [],
	        // dialogTableVisible: false,
	        dialogFormVisible: false,
	        dialogEditVisible: false,
	        values:[{
	        	value:'001'
	        },{
	        	value:'002'
	        },{
	        	value:'003'
	        },{
	        	value:'004'
	        },{
	        	value:'005'
	        },{
	        	value:'006'
	        },{
	        	value:'007'
	        }],
	        //新增界面数据
	        addform: {
	            groupIndex:'001',
	            dragName: '',
	            days: null,
	            number: null,
	            price: null
	        },
	        addFormRules: {
	        	dragName:[
	        		{ required: true, message: '请输入名称(规格)', trigger: 'blur' }
	        	]
	        },
	        editform: {
	            groupIndex:'',
	            dragName: '',
	            days: null,
	            number: null,
	            price: null
	        },
	        editIndex: null,
	        multipleSelection: [],
	        len:null,
			searchTxt: ''
    	}
  	},
	methods:{
	    //获取数据列表
    	getLists(){
    		let that = this
	      	Vue.http.get(api.inquiryData).then(response  => {
	      		console.log("请求成功了");
	      		console.log(response);
	      			
	      		let formdata = response.data.adviceDatas;
	      		console.log("这是我们需要的json数据",formdata);
	      		that.tableData = formdata;
	      	}, response => {
	      		alert("请求失败了")
	      	})
    	},
    	//删除
    	handleDelete(index, row) {
    		let that = this
        	// console.log('单个删除选择的row：',index,'-----',row);
    		that.$confirm('确认删除吗？', '提示', {}).then(() => {
    			that.$message({
    				type: 'success',
    				message: '删除成功'
    			});
    			that.tableData.splice(index,1)
    		}).catch(() => {
    			this.$message({
    			    type: 'info',
    			    message: '已取消删除'
    			}); 
			});	
    	},
    	//勾选的数据列表
    	handleSelectionChange(selection){
    		// console.log(selection)   //selection 数组 对象的集合
    		this.multipleSelection = selection;
    		this.len = this.multipleSelection.length;
    	},
    	//新增界面显示
    	handleAdd(){
    		this.dialogFormVisible = true;
    		//再次新增时，初始化
    		this.addform = {
	            groupIndex:'001',
	            dragName: '',
	            days: null,
	            number: null,
	            price: null
	        }
    	},
    	//新增界面里的确定提交按钮
    	handleSubmit(){
    		this.$refs.addform.validate((valid) => {
    			let that = this
    			if(valid){
    				that.$confirm('确认提交吗？', '提示', {}).then(() => {
    					that.$message({
    						type: 'success',
    						message: '提交成功'
    					});
    					that.tableData.push(that.addform);
    					that.dialogFormVisible = false;
    					// that.$refs.addform.resetFields();
    				}).catch(() => {
    					 // that.$refs.addform.resetFields();
					});	
    			}
	    	})
    	},
    	//新增界面里的取消按钮
    	addCancel(){
    		this.dialogFormVisible = false;
    	},
    	//新增界面里的重置按钮
    	handleReset(){
    		this.$refs.addform.resetFields();
    	},
    	//编辑界面显示
    	handleEdit(index, row) {
      		this.dialogEditVisible = true;
      		// this.editform = row;                  //浅度拷贝 指向同一地址
      		this.editform = Object.assign({}, row);  //深度拷贝，两个对象对应不同的地址
      		this.editIndex = index;
    	},
    	//编辑界面里的确定提交按钮
    	editSubmit(){
    		this.$refs.editform.validate((valid) => {
    			let that = this
    			if(valid){
    				that.$confirm('确认提交吗？', '提示', {}).then(() => {
    					that.$message({
    						type: 'success',
    						message: '修改成功'
    					});
    					that.tableData[that.editIndex] = that.editform;
						that.dialogEditVisible = false;
    				}).catch(() => {
    		
					});	
    			}
	    	})
    	},
    	//编辑界面里的取消按钮
    	editCancel(){
    		this.dialogEditVisible = false;
    	}
  	},
  	mounted() {
  		this.getLists();
	}
}
</script>