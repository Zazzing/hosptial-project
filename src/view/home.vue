<template>
	<div class ="sideBar">
		<el-menu class="el-menu-vertical-demo menu" theme="dark">
			<el-menu-item index="1">
			    <router-link to="/home/hello">
			        <i class="fa fa-home icon" aria-hidden="true"></i>首页 
			    </router-link>
			</el-menu-item>
			<!-- <el-menu-item index="2">
			    <i class="fa fa-search icon" aria-hidden="true"></i>查询
			</el-menu-item> -->
			<el-menu-item index="3">
				<router-link to="/home/arrange">
			    	<i class="fa fa-calendar icon" aria-hidden="true"></i>排班
			    </router-link>
			</el-menu-item>
			<el-menu-item index="4">
				<router-link to="/home/reservation">
			   		<i class="fa fa-clock-o icon" aria-hidden="true"></i>预约
			   	</router-link>
			</el-menu-item>
			<el-menu-item index="5">
				<router-link to="/home/Inquiry">
			    	<i class="fa fa-plus-square icon" aria-hidden="true"></i>问诊
			    </router-link>
			</el-menu-item>
			<el-menu-item index="6">
				<router-link to="/home/project">
			    	<i class="fa fa-folder-open-o icon" aria-hidden="true"></i>项目
			    </router-link>
			</el-menu-item>
			<el-menu-item index="7">
				<router-link to="/home/members">
			    	<i class="fa fa-user-circle icon" aria-hidden="true"></i>会员
			    </router-link>
			</el-menu-item>
		</el-menu>
		<topBars class="topbar"></topBars>
		<!-- <span class="topbar"> 当前位置:</span> -->
		<Levelbar class="breadcrumb1"></Levelbar> 
		<router-view class="content"></router-view>	
	</div>
</template>
<style type="text/css" scoped>
	/*左边的导航条*/
	.sideBar .menu{
		width: 200px;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
	}
	.sideBar .menu a{
		color: #bfcbd9;
		text-decoration: none;
	}
	.sideBar a.router-link-active{
		color: #20a0ff;
		text-decoration: none;
	}
	/*导航条图标*/
	.sideBar .icon{
		padding-left: 15px;
		padding-right: 15px;
	}
	/*路由内容*/
	.sideBar .content{
		margin-left: 200px;
	}
	/*头顶的导航*/
	.sideBar .topbar{
		clear: both;
		padding: 0;
		margin-top: 0;
		margin-left: 200px;
	}
	.sideBar .breadcrumb1{
		clear: both;
		padding: 15px;
		margin-left: 200px;
		font-size: 18px;
	}
	
</style>
<script>
	import TopBars from '@/view/NavBar/topBars';
	import Levelbar from '@/view/NavBar/Levelbar';
  	export default {
  		components:{
  			topBars:TopBars,
  			Levelbar,
  		}
  	}
</script>