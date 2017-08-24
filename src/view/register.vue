<template>
	<div class="register">
		<div class="content">
			<div class="head">
				<ul>
					<li>
            <router-link to="/">
						  <i class="fa fa-user-o" aria-hidden="true"></i>返回登录
            </router-link>
					</li>
					<li>
						<i class="fa fa-question-circle" aria-hidden="true"></i>帮助
					</li>
				</ul>
			</div>
			<div class="part">
				<h1>百慧云诊所</h1>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form1">
				  	<el-form-item label="真实姓名：" prop="name">
				   		<el-input v-model="ruleForm.name"></el-input>
				  	</el-form-item>
					<el-form-item label="联系电话：" prop="num">
				   		<el-input v-model="ruleForm.num"></el-input>
				  	</el-form-item>
					<el-form-item label="联系邮箱：" prop="mail">
					   	<el-input v-model="ruleForm.mail"></el-input>
					</el-form-item>
					<el-form-item label="用户名：" prop="userName">
					   	<el-input v-model="ruleForm.userName"></el-input>
					</el-form-item>
					<el-form-item label="密码：" prop="password">
					   	<el-input v-model="ruleForm.password"></el-input>
					</el-form-item>
					<el-form-item label="重复密码：" prop="dbpassword">
					   	<el-input v-model="ruleForm.dbpassword"></el-input>
					</el-form-item>
				 	<el-form-item>
				    	<el-button type="primary" class="registerBtn" @click="submitForm('ruleForm')">注册</el-button>
				    	<el-button type="primary"  @click="resetForm('ruleForm')">重置</el-button>
				  	</el-form-item>
				</el-form>
			</div>
		</div>
		
	</div>
</template>
<style scoped>
	.register{
		width: 100%;
    text-align: center;
	}
	.register .head{
		line-height: 50px;
    background: #fff;
		text-align: right;
		border-bottom: 1px solid #f1f1f1;
	}
	.register .head ul li{
		list-style: none;
		display: inline-block;
		margin-left: 30px;
		color: #666;
		font-size: 14px;
	}
  .register .head a{
    color: #666;
    text-decoration: none;
  }
	.register .head ul li:last-child{
		margin-right: 100px;
	}
	.register .head ul li i{
		margin-right: 10px;
	}
	.register .part{
		width: 780px;
		margin: 0 auto;
		text-align: center;
	}
	.register .part h1{
		width: 100%;
    font-family: "华文行楷";
		line-height: 50px;
    margin-left:35px;
    margin-top: 25px; 
	}
  .register .part .form1{
    width: 400px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .register .part .registerBtn{
    margin-right: 50px;
  }
</style>
<script>
	import {api} from '../global/api';
  export default {
    data() {
    	var validateName = (rule, value, callback) => {
    	    if (!value) {
    	        return callback(new Error('请输入真实名字'));
    	    }
    	    else {
    	    	if (value.length>=3&&value.length<=5) {
    	    		callback();
    	    	} else {
    	       		callback(new Error('长度在3到5个字符之间'));
    	    	}
    		}
    	};
    	var validateNum = (rule, value, callback) => {
    	    if (!value) {
    	        return callback(new Error('请输入电话号码'));
    	    }
    	    else {
    	    	var reg1 = /^[0-9]{11}$/;
    	    	if (! reg1.test(value)) {
    	        	callback(new Error('请输入数字值'));
    	    	} else {
    	       		callback();
    	    	}
    		}
    	};
    	var validateMail=(rule, value, callback) => {
    		if (value === '') {
    	        callback(new Error('请输入联系邮箱'));
    	    }
    	    else{
    	    	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    	    	if(!reg.test(value)){
    	    		callback(new Error('输入的联系邮箱必须包含@'));
    	    	}
    	    	else{
    	    		callback();
    	    	}
    	    }
    	}
    	var validateUserName=(rule, value, callback) => {
    		if (value === '') {
    	        callback(new Error('请输入用户名'));
    	  }
        else{
          callback();
        }
        // else{
        //   console.log("xxxxxxxxxxxxx",api.login)
        //   this.$http.get(api.login).then(function(response){
        //      var flag=0;
        //      for(let i=0;i<response.data.length;i++){
        //        if(value === response.data[i].username){
        //          flag=1;
        //          break;
        //        }
        //      }
        //      if(flag ===1){
        //        callback(new Error("用户名已存在"));
        //      }
        //   });
        // }
    	    
    	};
      
    	var validatePass = (rule, value, callback) => {
    	    if (value === '') {
    	        callback(new Error('请输入密码'));
    	    }
          else if(value.length<6){
              callback(new Error('密码不能少于6位'));
          }
    	    else {
            if(this.ruleForm.dbpassword !== '') {
    	        this.$refs.ruleForm.validateField('dbpassword');
            }
            callback();
    	    }
  
    	};
    	var validatedbPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
     	 return {
	        ruleForm: {
	          name: '',
	          num: '',
	          mail: '',
	          userName: '',
	          password: '',
	          dbpassword: ''
	        },
        rules: {
          name: [
            {validator: validateName, trigger: 'blur' }
          ],
          num: [    
            {validator: validateNum, trigger: 'blur' }
          ],
          mail: [
            {validator: validateMail, trigger: 'blur' }
          ],
          userName: [
            {validator: validateUserName, trigger: 'blur' }
            
          ],
          password: [
            {validator: validatePass, trigger: 'blur' }          
          ],
          dbpassword: [
            {validator: validatedbPass, trigger: 'blur' }
          ],

        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>