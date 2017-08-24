<template>
	<div class="personal">
		<div class="personal-content">
			<div class="content-left">
				<i class="Img">
					<img src="../../assets/logo.png">
				</i>
				<p >{{ per.name }}</p>
			</div>
			<div class="content-right">
				<div class="personal-info">
					<div class="title">
						<span>个人信息</span>
						<el-button type="text" class="editor" @click="editorDialogForm">
							<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
							编辑
						</el-button>
						<!-- 对话框内容 -->
						<el-dialog title="编辑个人信息" :visible.sync="dialogFormVisible" >
						  	<el-form :model="form" :rules="rules" ref="form">
						   		<el-form-item label="用户类型:" :label-width="formLabelWidth">
						      		医生
						    	</el-form-item>
						    	<el-form-item label="所属科室:" :label-width="formLabelWidth">
						      		<el-select v-model="form.subordinate" placeholder="请选择所属科室" style="width:220px">
								        <el-option label="儿科" value="儿科"></el-option>
								        <el-option label="外科" value="外科"></el-option>
								        <el-option label="内科" value="内科"></el-option>
						      		</el-select>
						    	</el-form-item>
						    	<el-form-item label="姓名:" :label-width="formLabelWidth">
						      		<el-input v-model="name1" auto-complete="off" style="width:220px"></el-input>
						    	</el-form-item>
						    	<el-form-item label="" :label-width="formLabelWidth">
						      		<el-radio class="radio" v-model="form.sex" label="男">男</el-radio>
  									<el-radio class="radio" v-model="form.sex" label="女">女</el-radio>
						    	</el-form-item>
						    	<el-form-item label="年龄:" :label-width="formLabelWidth">
						      		<el-input v-model="form.age"  auto-complete="off" style="width:220px"></el-input>
						    	</el-form-item>
						    	<el-form-item label="电话:" :label-width="formLabelWidth" prop="phone">
						      		<el-input v-model="form.phone"  auto-complete="off" style="width:220px"></el-input>
						    	</el-form-item>
								<el-form-item label="职称:" :label-width="formLabelWidth">
						      		<el-input v-model="form.job" auto-complete="off" style="width:220px"></el-input>
						    	</el-form-item>
						    	<el-form-item label="备注:" :label-width="formLabelWidth">
						      		<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.note" style="width:350px">
						      		</el-input>
						    	</el-form-item>
						  	</el-form>
						  <div slot="footer" class="dialog-footer">
						    <el-button @click="dialogFormVisible = false">取 消</el-button>
						    <el-button type="primary" @click="handleDialogForm">确 定</el-button>
						  </div>
						</el-dialog>


					</div>
					<div class="title-content">
						<span class="left">
							<span>姓名：</span>
							<span class="change-text">{{ per.name }}</span>
						</span>
						<span class="left">
							<span>性别：</span>
							<span class="change-text">{{ personal.sex }}</span>
						</span>
					</div>
					<div class="title-content">
						<span class="left">
							<span>年龄：</span>
							<span class="change-text">{{ personal.age }}</span>
						</span>
						<span class="left">
							<span>所属科室：</span>
							<span class="change-text">{{ personal.subordinate }}</span>
						</span>
					</div>
					<div class="title-content">
						<span class="left">
							<span>职称：</span>
							<span class="change-text">{{ personal.job }}</span>
						</span>
						<span class="left">
							<span>电话：</span>
							<span class="change-text">{{ personal.phone }}</span>
						</span>
					</div>
				</div>
				<div class="personal-info special">
					<div class="title">
						<span>帐号信息</span>
					</div>
					<div class="title-content">
						<span class="left">
							<span>登录账号：</span>
							<span class="change-text">{{ loginForm.userName }}</span>
						</span>	
					</div>
					<div class="title-content">
						<span class="left">
							<span>关联邮箱：</span>
							<span class="change-text">{{ personal3.email }}</span>
						</span>
						<el-button type="text" class="editor editor1" @click="editorDialogForm3">
							<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
							编辑
						</el-button>
						<el-dialog title="绑定邮箱" :visible.sync="dialogFormVisible3">
						  <el-form :model="form3" :rules="rules">
						    	<el-form-item label="当前邮箱:" :label-width="formLabelWidth">
						    		<span v-if="personal3.email === '-'">
						    			{{ personal3.nEmail }}
						    		</span> 
						    		<span v-else>
						    			{{ personal3.email }}
						    		</span> 
						    	</el-form-item>
						   		<el-form-item label="新邮箱:" :label-width="formLabelWidth" prop="email">
						    		<el-input v-model="form3.email" auto-complete="off" style="width:220px"></el-input>
						    	</el-form-item>   
						  </el-form>
						  <div slot="footer" class="dialog-footer">
						    <el-button @click="dialogFormVisible3 = false">取 消</el-button>
						    <el-button type="primary" @click="handleDialogForm3">确 定</el-button>
						  </div>
						</el-dialog>

					</div>	
				</div>
				<div class="personal-info special">
					<div class="title">
						<span>医生信息</span>
						<el-button type="text" class="editor" @click="editorDialogForm2">
							<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
							编辑
						</el-button>
						<el-dialog title="编辑医生信息" :visible.sync="dialogFormVisible2">
						  <el-form :model="form2">
						    	<el-form-item label="姓名:" :label-width="formLabelWidth">
						    		{{ per.name }} 
						    	</el-form-item>
						   		<el-form-item label="挂号类型:" :label-width="formLabelWidth">
						    		{{ptype }}
						    	</el-form-item>
						    	<el-form-item label="出诊科室:" :label-width="formLabelWidth">
						    		<el-select v-model="form2.visitSubordinate" placeholder="请选择出诊科室" style="width:220px">
								        <el-option label="儿科" value="儿科"></el-option>
								        <el-option label="外科" value="外科"></el-option>
								        <el-option label="内科" value="内科"></el-option>
						      		</el-select>
						    	</el-form-item>
				    			<el-form-item label="擅长疾病:" :label-width="formLabelWidth">
				    	      		<el-input v-model="form2.disease" auto-complete="off" style="width:220px"></el-input>
				    	    	</el-form-item>
				    	    	<el-form-item label="个人介绍:" :label-width="formLabelWidth">
				    	      		<el-input type="textarea" :rows="4" v-model="form2.introduce" style="width:350px">
				    	      		</el-input>
				    	    	</el-form-item>
						  </el-form>
						  <div slot="footer" class="dialog-footer">
						    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
						    <el-button type="primary" @click="handleDialogForm2">确 定</el-button>
						  </div>
						</el-dialog>
					</div>
					<div class="title-content">
						<span class="left">
							<span>挂号类型：</span>
							<span class="change-text">{{ ptype }}</span>
						</span>
					</div>
					<div class="title-content">
						<span class="left">
							<span>出诊科室：</span>
							<span class="change-text">{{ personal2.visitSubordinate }}</span>
						</span>
					</div>
					<div class="title-content">
						<span class="left1">
							<span>擅长疾病：</span>
							<span class="change-text">{{ personal2.disease }}</span>
						</span>
					</div>
					<div class="title-content">
						<span class="left1">
							<span>个人介绍：</span>
							<span class="change-text">{{ personal2.introduce }}</span>
						</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<style scoped>
	.personal .navBar{
		display: inline-block;	
		color: #f1f1f1;
	}
	.personal .content-left,.personal .content-right{
		display: inline-block;
		text-align: left;
	}
	.personal .content-left{
		width: 300px;
		height: 100%;
		text-align: center;
		position: relative;
		top: -500px;
	}
	.personal .content-left img{
		width: 80px;
		height: 80px;
		vertical-align: middle;  
	}
	.personal .content-left p{
		padding-left: 14px;
	}
	.personal .content-right{
		color: #AEAEAE;
		width: 700px;
	}
	.personal .content-right .personal-info{
		border: 1px solid #f1f1f1;
		border-radius: 10px;
		background: #fff;
		height: 100%;
	}
	.personal .content-right .special{
		margin-top: 15px;
	}
	.personal .content-right .personal-info .title{
		color: #666;
		font-size: 18px;
		line-height: 50px;
		border-bottom: 1px solid #f1f1f1;
	}
	.personal .content-right .personal-info .title span{
		width: 50%;
		text-align: left;
		padding-left: 25px;
	}
	.personal .content-right .personal-info .title .editor{
		width: 50%;
		text-align: right;
		margin-left: 200px;
		font-size: 18px;
	}
	.personal .content-right .title-content{
		line-height: 50px;
		border:0.5px solid #f1f1f1; 
	}
	.personal .content-right .title-content .left{
		display: inline-block;
		width: 40%;
	}
	.personal .content-right .title-content .left1{
		width: 100%;
		display: inline-block;
	}
	.personal .content-right .title-content span:first-child{
		padding-left: 13px;
	}
	.personal .content-right .change-text{
		color: #666;
	}
	.personal .editor1{
		font-size: 18px;
		margin-left: 295px;
	}

</style>
<script>
	import store from '../../store';
	import {api} from '../../global/api';
	export default { 
		data() {
			// 校验输入的电话号码
			var validateNum = (rule, value, callback) => {
			    if (!value) {
			        callback(new Error('请输入电话号码'));
			    }
			    else {
			    	console.log("value的值",value);
			    	var reg1 = /^[0-9]{11}$/;
			    	if (! reg1.test(value)) {
			        	callback(new Error('请输入11位数字值'));
			    	} else {
			       		callback();
			    	}
				}
			};
			var validateeMail=(rule, value, callback) => {
	    		if (value === '') {
	    	        callback(new Error('请输入联系邮箱'));
	    	    }
	    	    else{
	    	    	var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9_-]+$/;
	    	    	if(!reg.test(value)){
	    	    		callback(new Error('输入的联系邮箱必须包含@'));
	    	    	}
	    	    	else{
	    	    		callback();
	    	    	}
	    	    }
	    	};
			return{
				// 姓名
				per:store.state.per,
				name1:'',
				// 个人信息
				personal:{
					// name:store.state.name,
					sex:'',
					age:'',
					subordinate:'',
					job:'',
					phone:'',
				},
				ptype:'',
				// 医生信息
				personal2:{
					visitSubordinate:'',
					disease:'',
					introduce:''
				},
				// 帐号信息
				personal3:{
					email:'',
					nEmail:''
				},
				// 获取state的值
				loginForm:store.state.userInfo,
				// 个人信息弹出框状态
				dialogFormVisible: false,
				// 医生信息弹出框状态
				dialogFormVisible2: false,
				// 帐号信息弹出框状态
				dialogFormVisible3: false,
				form: {
				    // name: '',
			        subordinate: '',
			        sex:'男',
			        age:'',
			        phone:'',
			        job:'',
			        note:''
				},
				form2:{
					visitSubordinate:'',
			        disease:'',
					introduce:''
				},
				form3:{
					email:''
				},
				formLabelWidth: '120px',
				// 校验输入的电话号码的规则
				rules: {
				  phone: [    
				    {validator: validateNum, trigger: 'blur' }
				  ],
				  email: [
				    {validator: validateeMail, trigger: 'blur' }
				  ]
				}
			}
		},
		mounted:function(){
			this.$http.get(api.personal).then(function(response){
				// console.log("response的值",response);
				this.personal=response.data.data.personal;
				this.personal2=response.data.data.personal2;
				this.personal3=response.data.data.personal3;
				this.ptype=response.data.data.ptype;
				// console.log("personal的值",this.personal);
			});
		},
		methods:{
			// 点击个人信息的编辑时初始化弹出框表单的内容
			editorDialogForm:function(){
				this.dialogFormVisible = true;
				this.form={
				    // name: '',
			        subordinate: '',
			        sex:'男',
			        date:'',
			        phone:'',
			        job:'',
			        note:''
				};
				this.name1='';
			},
			// 点击医生信息的编辑时初始化弹出框表单的内容
			editorDialogForm2:function(){
				this.dialogFormVisible2 = true;
				this.form2={
					visitSubordinate:'',
			        disease:'',
					introduce:''
				}
			},
			// 点击帐号信息的编辑时初始化弹出框表单的内容
			editorDialogForm3:function(){
				this.dialogFormVisible3 = true;
				this.form3={
					email:''
				}
			},
			// 个人信息部分提交时执行的操作
			handleDialogForm:function(){
				this.dialogFormVisible = false;
				// this.personal=this.form;  //浅拷贝
				this.personal=JSON.parse(JSON.stringify(this.form));
				// this.name=JSON.parse(JSON.stringify(this.form.name));  //深度拷贝
				this.per.name=this.name1;
			},
			// 医生信息部分提交时执行的操作
			handleDialogForm2:function(){
				this.dialogFormVisible2 = false;
				// this.personal=this.form;  //浅拷贝
				this.personal2=JSON.parse(JSON.stringify(this.form2));  //深度拷贝
			},
			// 帐号信息部分提交时执行的操作
			handleDialogForm3:function(){
				this.dialogFormVisible3 = false;
				// this.personal=this.form;  //浅拷贝
				this.personal3=JSON.parse(JSON.stringify(this.form3));  //深度拷贝
			}
			
		}
	}
</script>