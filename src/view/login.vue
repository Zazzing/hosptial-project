<template>
	<div class="login">
		<div class="login-container">
			<el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="card-box login-form">
			    <h1 class="title">百慧云诊所</h1>
			    <el-form-item prop="userName" class="item userItem">
			        <span class="svg-container">
			        	<i class="fa fa-user-o" aria-hidden="true"></i>
			        </span>
			        <el-input name="userName" type="text" v-model="loginForm.userName"  placeholder="用户名" class="input-content"></el-input>
			    </el-form-item>
			    <el-form-item prop="password" class="item">
			        <span class="svg-container">
			        	<i class="fa fa-lock" aria-hidden="true"></i>
			        </span>
			        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="密码" class="input-content"></el-input>
			    </el-form-item>
			    <el-form-item>
			    	测试账号：1111/vuex  密码：123456
			    </el-form-item>
			    <el-form-item>
			        <el-button type="primary" @click="handleLogin">
			            登录
			        </el-button>
			        <el-button type="primary">
			            <router-link to="/register">注册</router-link>
			        </el-button>
			    </el-form-item>
			</el-form>
		</div>
		<router-view></router-view>
	</div>
</template>
<style scoped>
	.login .login-container{
		position: relative;
		width: 500px;
		height: 350px;
		margin: 15% auto;
		background: #fff;
		text-align: center;
		border-radius: 5px;
	}
	.login .login-container .title{
		position: relative;
		top: 30px;
		font-family: "华文行楷"
	}
	.login .login-container .userItem{
		margin-top: 50px;

	}
	.login .login-container .item .svg-container{
		display: inline-block;
		width: 40px;
		text-align: center;
		color: #889aa4;
		font-size: 20px;
	}
	.login .login-container .item .input-content{
		display: inline-block;
		height: 47px;
    	width: 55%;
	}
	.login .login-container a{
		color: #fff;
		text-decoration: none;
	}
</style>
<script>
	import Home from '@/view/home'
	import Hello from '@/view/home_content/hello'
	import store from './../store';
	export default{
		// mounted:function(){
		// 	this.$http.get('../../static/login.json').then(function(response){
		// 		this.username=response.data;
		// 		console.log("数组",this.username);
		// 	});
		// },
		data(){
			var validateUserName=(rule, value, callback) =>{
				console.log("aaaa");
				if(!value){
					callback(new Error("请输入用户名"));
				}
				else{
					if(value != "1111" && value != "vuex"){
						callback(new Error("用户名不存在"));
					}		
					else{
						callback();
					}
					// this.$http.get('../../static/login.json').then(function(response){
						// var flag=0;
						// for(let i=0;i<this.username.length;i++){
						// 	if(value === this.username[i].username){
						// 		flag=1;
						// 		this.loginForm.psw=this.username[i].password;
						// 		break;
						// 	}
						// }
						// if(flag !=1){
						// 	callback(new Error("用户名不存在"));
						// }
					// });
				}
				

			};
			var validatePass = (rule, value, callback) => {
	    	    if (value === '') {
	    	        callback(new Error('请输入密码'));
	    	    } 
	    	    else if(value.length<6){
	    	        callback(new Error('密码不能少于6位'));
	    	    }
	    	    else if(value != "123456")
	    	    // else if(value != this.loginForm.psw){
	    	    	callback(new Error('密码错误'));
	    	    // }
	    	    else{
	    	    	callback();
	    	    }
    		};
			return{
				loginForm:store.state.userInfo,
				// loginForm:{
				// 	userName:'',
				// 	password:'',
					// psw:''
				// },
				// username:[],
				loginRules:{
					userName:[
						{validator: validateUserName, trigger: 'blur' }
					],
					password:[
						{validator: validatePass, trigger: 'blur' }
					]
				}
			};
			
		},
		methods:{
			handleLogin:function(){
				 this.$refs.loginForm.validate((valid) => {
		          	if (valid) {
		           		this.$router.push({ path: 'home/hello',component:Hello});
		       		} else {
		            	console.log('error submit!!');
		            	return false;
		        	}
		      	});
			}	
		},
		mounted:function(){
	  	console.log("stor内容" ,store.state.userInfo);
	  }
	}
</script>