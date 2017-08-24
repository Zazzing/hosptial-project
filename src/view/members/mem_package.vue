<template>
  <div class="mem_package" >
    
    <br>
    <!-- 表格各列名称 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item label="会员姓名">
        <el-input v-model="formInline.username" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item label="套餐名称">
        <el-input v-model="formInline.buy_package" placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item label="剩余有效天数：小于">
        <el-input v-model="formInline.avaliable_date" ></el-input>
      </el-form-item>

      <el-form-item >
        <template scope="scope">
        <el-button type="success" class="el-icon-search"@click="onSubmit"></el-button>
        <el-button type="success" @click="add_package(scope.$index,scope.row)">添加套餐</el-button>
        </template>
      </el-form-item>

    </el-form>

    <!-- 表格内容 -->
    <div class="content">
      <el-table  :data="tableData"  style="width: 100%" >
        <el-table-column  prop="username" label="会员姓名"  width="180"></el-table-column>
        <el-table-column  prop="buy_package" label="购买套餐"  width="180"></el-table-column>
        <el-table-column  prop="date" label="购买日期"  width="180"></el-table-column>
        <el-table-column  prop="avaliable_date" label="剩余有效天数"  width="180"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" class="font-color" ><i class="fa fa-book" aria-hidden="true"></i>详情</el-button>
          </template>
        </el-table-column>
          </el-table>
      </el-table>    
  </div>
  
  <!-- 点击添加套餐出现的弹窗 -->
  <el-dialog title="套餐购买登记" v-model="dialogFormVisible" size="tiny" >
    <el-form ref="form" :model="form" label-width="120px">

    <el-form-item label="会员姓名：">
      <el-input v-model="form.username"  ></el-input>
    </el-form-item>

    <el-form-item label="会员账号：">
      <el-input v-model="form.account"  ></el-input>
    </el-form-item>

    <el-form-item label="创建账户类型：">
    <el-select v-model="value3" placeholder="请选择">
      <el-option label="黄金会员" value="黄金会员"></el-option>
      <el-option label="普通会员" value="普通会员"></el-option>
    </el-select>
    </el-form-item>

    <el-form-item label="购买日期">
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions0">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="购买套餐">
      <el-input v-model="form.buy_package" placeholder="请输入套餐名称"></el-input>
    </el-form-item> 

    <el-form-item label="收费方式：">
      <el-select v-model="value2" placeholder="请选择">
        <el-option label="微信" value="微信"></el-option>
        <el-option label="支付宝" value="支付宝"></el-option>
        <el-option label="银行卡" value="银行卡"></el-option>
      </el-select>
    </el-form-item>
    
    <el-form-item class="center">
    <template scope="scope">
      <el-button type="primary" @click="handleSaveadd()" :loading="editLoading">确定</el-button>
      <el-button  @click="dialogFormVisible = false">取消</el-button>
    </template>
    </el-form-item>

    </el-form> 
  </el-dialog> 
  
  <!-- 分页 -->
  <div class="block">
     <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage1"
       :page-sizes="[10, 20, 30, 40]"
       :page-size="100"
       layout="total, sizes, prev, pager, next, jumper"
       :total="tableData.length">
     </el-pagination>
   </div>
   </div>
   </div>
</template>
<script >
  import {api} from '../../global/api';
export default {
  name: 'mem_package',
  data () {
    return {
     
      dialogFormVisible:false,
      editLoading:false,//是否显示修改状态
      currentPage1: 5,
      activeIndex: '1',
      value3:'',
      value1:'',
      value2:'',
      formInline: {
        username:'',
        buy_package:'',
        date:'',
        avaliable_date:'',
        account:'',
        style:'',
      },
      form : {
        username:'',
        buy_package:'',
        date:'',
        avaliable_date:'',
        account:'',
        style:'',
      },
      tableData: [{
                 username:'',
                 account:'',
                 buy_package:'',
                 date:'',
                 avaliable_date:'',
               }]
    }
  },
  //实例化就获取数据
  mounted:function(){
    this.$http.get(api.style).then(function(response){
      this.tableData=response.data.tableData;
    });
  },
  methods: {
    onSubmit() {
        this.$http.get(api.style_search,{params:this.formInline}).then(function(response){
        this.tableData=response.data.tableData;
     });
    },
    //点击添加套餐
    add_package (index, row) {
      this.dialogFormVisible = true;
      this.formInline = Object.assign({}, row);
      this.table_index = index;
    },
    //添加
    handleSaveadd () {

      this.$confirm('确认提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel'
      }).then(() => {
      //处理日期
       console.log(this.value1);
       let year= new Date(this.value1).getFullYear(),
           month=new Date(this.value1).getMonth()+1,
           day=new Date(this.value1).getDate();
       let dateformat=year+'-'+month+'-'+day;
       this.form.date=dateformat;
    
       this.tableData.push(this.form);
       this.$message({
          message: "操作成功！",
          type: 'success'
       });
       this.dialogFormVisible = false;
       //重置
       this.value1='';
       this.value2='';
       this.value3='';
       this.form={
         username:'',
         buy_package:'',
         date:'',
         avaliable_date:'',
         account:'',
         style:'',
       }
      });
    },

    handleSizeChange(val) {
     console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
     console.log(`当前页: ${val}`);
    },
    handleSelect(key, keyPath) {
     console.log(key, keyPath);
    },
    pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .mem_package{
    padding: 20px;
  }
  .mem_package .content{
    height: 400px;
    background: white;
  }
  .mem_package .block{
    text-align: center;
  }
  .mem_package .center{
    text-align: center;
  }
  .mem_package .font-color{
    color: #50bfff; 
     border:0px solid #50bfff;
  }
  .mem_package .left{
    float: left; 
    text-align: center;
    width: 50%;
  }
  .mem_package .right{
    float: right; 
    text-align: center;
    width: 50%;
  }
  .mem_package .center{
    text-align: center;
  }

</style>
