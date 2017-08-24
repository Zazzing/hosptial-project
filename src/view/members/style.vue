<template>
  <div class="style" >
    <br>
    <el-form :inline="true" class="demo-form-inline">
      <template scope="scope">
        <el-button type="success" @click="add_account_style()">新建账户类型</el-button>
      </template>
    </el-form>
    <!-- 表格内容 -->
    <div class="content">
      <el-table  :data="tableData"  style="width: 100%" >
        <el-table-column  prop="account_type" label="会员账户类型"  width="180"></el-table-column>
        <el-table-column  prop="avaliable_date" label="默认有效期"  width="180"></el-table-column>
        <el-table-column  prop="username" label="创建人"  width="180"></el-table-column>
        <el-table-column  prop="date" label="创建时间"  width="180"></el-table-column>
        <el-table-column  prop="edit_date" label="最后编辑时间"  width="180"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" class="font-color" ><i class="fa fa-book" aria-hidden="true"></i>详情</el-button>
            <el-button size="small" class="font-color" @click="add_account_change(scope.$index,scope.row)">修改</el-button>
          </template>
        </el-table-column>
          </el-table>
      </el-table>    
    </div>
    <!-- 点击新建账号类型出现的弹窗 -->
    <el-dialog title="新建账号类型" v-model="dialogFormVisible" size="tiny" >
      <el-form ref="form" :model="form" label-width="120px">

        <el-form-item label="会员账号类型：">
          <el-input v-model="form1.account_type"  ></el-input>
        </el-form-item>

        <el-form-item label="默认有效期：">
          <el-input v-model="form1.avaliable_date"  ></el-input>
        </el-form-item>

        <el-form-item label="创建人：">
          <el-input v-model="form1.username"  ></el-input>
        </el-form-item>

        <el-form-item class="center">
        <template scope="scope">
          <el-button type="primary" @click="handleSaveadd()" :loading="editLoading">确定</el-button>
          <el-button  @click="dialogFormVisible = false">取消</el-button>
        </template>
        </el-form-item>

      </el-form> 
    </el-dialog> 
     <!-- 点击修改出现的弹窗 -->
    <el-dialog title="修改账号信息" v-model="dialogFormVisible_change" size="tiny" >
      <el-form ref="form" :model="form" label-width="120px">

        <el-form-item label="会员账号类型：">
          <el-input v-model="form.account_type" ></el-input>
        </el-form-item>

        <el-form-item label="默认有效期：">
          <el-input v-model="form.avaliable_date"  ></el-input>
        </el-form-item>

        <el-form-item label="创建人：">
          <el-input v-model="form.username"  ></el-input>
        </el-form-item>

        <el-form-item class="center">
        <template scope="scope">
          <el-button type="primary" @click="handleSavechange" :loading="editLoading">确定</el-button>
          <el-button  @click="dialogFormVisible_change = false">取消</el-button>
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
</template>

<script >
import {api} from '../../global/api';
export default {
  name: 'style',
  data () {
    return {
     
      dialogFormVisible:false,
      dialogFormVisible_change:false,
      editLoading:false,//是否显示修改状态
      currentPage1: 5,
      activeIndex: '1',
      currentdate:'',
      tableData: [{
        account_type:'',
        account:'',
        username:'',
        date:'',
        avaliable_date:'',
        edit_date:'',
      }],
      formInline: {
        account_type:'',
        username:'',
        date:'',
        avaliable_date:'',
        account:'',
        style:'',
        edit_date:'',
      },
      form : {
        account_type:'',
        username:'',
        date:'',
        avaliable_date:'',
        account:'',
        style:'',
        edit_date:'',
      },
      form1: {
        account_type:'',
        username:'',
        date:'',
        avaliable_date:'',
        account:'',
        style:'',
        edit_date:'',
      },
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
      this.$message('模拟数据，这个方法并不管用哦~');
    },
    //以xxxx-xx-xx xx:xx的方式取得当前时间
    CurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year + "-";

    if(month < 10)
    clock += "0";

    clock += month + "-";

    if(day < 10)
    clock += "0";

    clock += day + " ";

    if(hh < 10)
    clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0'; 
    clock += mm + ":"; 

    if (ss < 10) clock += '0'; 
    clock += ss; 
    return(clock); 
    },
    //点击添加账户出现弹框
    add_account_style () {
       this.dialogFormVisible = true; 
       this.form1.date=this.CurentTime();//获取当前时间
       this.form1.edit_date=this.CurentTime();
    },
    //点击修改出现弹框
    add_account_change (index,row) {
       this.dialogFormVisible_change = true; 
       this.form = Object.assign({}, row);  
       this.table_index = index;
    },
    //点击添加确定
    handleSaveadd () {
      this.$confirm('确认提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancel',
      }).then(() => {
        let vm=this.form1;
       
       this.tableData.push(vm);
       this.form1={ 
         account_type:'',
         username:'',
         date:'',
         avaliable_date:'',
         account:'',
         style:'',
         edit_date:'',
       }
       this.$message({
          message: "操作成功！",
          type: 'success'
       });
       this.dialogFormVisible = false;
       //重置          
       
      });
    },
    //点击修改确定
    handleSavechange () {
     this.$confirm('确认提交吗？', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       cancelButtonClass: 'cancel'
     }).then(() => {
      this.editLoading = true;//显示正在修改，圆圈跑起来
      this.form.edit_date=this.CurentTime();
    
      this.tableData[this.table_index] = this.form;
      this.tableData.splice(this.table_index, 1, this.form);
      this.$message({
         message: "操作成功！",
         type: 'success'
       });
      this.editLoading = false;
      this.dialogFormVisible_change = false;
     });
      console.log(this.form);
      
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
    .style{
      padding: 20px;
    }
    .style .content{
      height: 400px;
      background: white;
    }
    .style .block{
      text-align: center;
    }
    .style .center{
      text-align: center;
    }
    .style .font-color{
      color: #50bfff; 
      border:0px solid #50bfff;
    }
    .style .left{
      float: left; 
      text-align: center;
      width: 50%;
    }
    .style .right{
      float: right; 
      text-align: center;
      width: 50%;
    }
    .style .center{
      text-align: center;
    }
</style>
