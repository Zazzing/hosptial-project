<template>
	<div class="inOne-visitType">
	  <h2>随访类型</h2>
	  <div class="inOne-visitRadio">
	    <el-radio class="radio visitBtn" v-model="radioVisit" label="1">不需要</el-radio>
	      <el-radio class="radio visitBtn" v-model="radioVisit" label="2">
	      每
	      <el-select v-model="visitdate" placeholder="请选择" style="width:30%">
	        <el-option v-for="item in valueWeeks" :key="item.visitdate" :label="item.visitdate" :value="item.visitdate">
	        </el-option>
	      </el-select>
	      一次周期随访，共
	      <el-input v-model="inputTimes" placeholder="请输入内容" style="width:20%"></el-input>
	      次
	    </el-radio>
	  </div>
	</div>
</template>

<script>
	export default {
		data() {
	    	return {
		        radioVisit:'1',
		        visitdate:'',
		        valueWeeks:[{
		        	visitdate:'1'
		        },{
		        	visitdate:'2'
		        },{
		        	visitdate:'3'
		        }],
		        visitdate:'1',
		        inputTimes:''
	      	}
	    }
	}
</script>

<style>
	.inOne-visitType h2{
	  color: black;
	  display: inline-block;
	  width: 12%;
	  float: left;
	  padding: 0;
	}
	.inOne-visitRadio{
	  display: inline-block;
	  width: 70%;
	}
	.visitBtn{
	  display: block;
	  margin-left: 0 !important;
	}
	.selectTimes{
	  display: inline;
	  /*float: left;*/
	}
	.inOne-TabBttom{
	  font-size: 20px;
	  margin-top: 10px;
	  margin-left: 18px;
	}
	.inOne-TabBttom h2{
	  font-size: 20px;
	}
	.inOne-TabBttom h2 i{
	  margin-right: 8px;
	}
</style>