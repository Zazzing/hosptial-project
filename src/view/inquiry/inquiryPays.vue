<template>
	<div class="inOne-pay">
		<div>
			<el-table :data="drugDatas" border style="width: 100%">
				<el-table-column align="center" label='选择' width="180">
		      		<template scope="props">
		        		<el-checkbox v-model="props.row.isactive"></el-checkbox>
		    		</template>
		  		</el-table-column>
				
				<el-table-column align="center" label='分类' width="300" >
		      		<template scope="props">
		        		{{ props.row.id }}
		    		</template>
		  		</el-table-column>

		  		<el-table-column align="center" label='价钱(元)'>
		      		<template scope="props">
		        		{{ props.row.costSpend }}
		    		</template>
		  		</el-table-column>
			</el-table>
		</div>
		<div class="AllTotal">
			<h2>总价：{{ this.total() }}</h2>
			<el-button type="primary" @click="selectAll()">全选</el-button>
			<el-button type="primary" @click="selectNone()">取消全选</el-button>
			<el-button type="success" @click="payData()" :disabled="this.total() == 0 ">缴费</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
		    return {
		    	drugDatas: [{
		    		id:'挂号费',
		    	    name: '1',
		    	    price: 300,
					costSpend:32,
		    	    isactive:false
		    	},{
		    		id:'医药费',
		    	    name: '2',
		    	    price: 400,
		    	    costSpend:800,
		    	    isactive:false
		    	},{
		    		id:'材料费',
		    	    name: '3',
		    	    price: 250,
		    	    costSpend:2.1,
		    	    desc: '荷兰优质淡奶，奶香浓而不腻',
		    	    isactive:false
		    	}]
		    }
		},
	  	methods:{
	  		payData() {
      			let that = this
        		// console.log('单个删除选择的row：',index,'-----',row);
    			that.$confirm('确认缴费吗？', '提示', {}).then(() => {
    				that.$message({
	    				type: 'success',
	    				message: '已缴费了哟'
    				});
    				console.log(JSON.stringify(this.total()));
    			}).catch(() => {
    				this.$message({
    			    	type: 'info',
    			    	message: '已取消缴费'
    				}); 
				});	
    		},
    		selectAll(){
    			this.drugDatas.forEach(function(s){
		        	// console.log(s.isactive)
		            s.isactive = true;
		        });
    		},
    		selectNone(){
    			this.drugDatas.forEach(function(s){
		        	// console.log(s.isactive)
		            s.isactive = false;
		        });
    		},
		    total: function(){
		    	var total = 0;
		    	let that = this;
		        this.drugDatas.forEach(function(s){
		        	// console.log(s.isactive)
		            if (s.isactive){
		            	total+= s.costSpend;
		            }
		        });
		        return total;
		    }
		}
	}
</script>

<style>
	.active{
		background: blue;
	}
	.costDetail{
		font-weight: bold;
	}
	.AllTotal{
		margin-top: 50px;
	}
	.AllTotal h2{
		float: right;
		margin-right: 150px;
		color: #20a0ff;
		font-size: 20px;
	}
</style>