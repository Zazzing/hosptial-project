<template>
  <div class="smallproject" >
  <!-- <br> -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="项目分类">
      <el-select v-model="formInline.region" placeholder="请选择">
        <el-option label="检查费" value="检查费"></el-option>
        <el-option label="检验费" value="检验费"></el-option>
        <el-option label="其他" value="其他"></el-option>
        <el-option label="治疗费" value="治疗费"></el-option>
        <el-option label="材料费" value="材料费"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="项目名称">
      <el-input v-model="formInline.user" placeholder="请输入姓名/手机"></el-input>
    </el-form-item>
    <el-form-item label="启用状态">
      <el-select v-model="formInline.state" placeholder="请选择">
        <el-option label="启用" value="ture"></el-option>
        <el-option label="禁止" value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="success" class="el-icon-search"@click="onSubmit"></el-button>
    </el-form-item>
    <el-button class="filter-item" type="primary" @click="handleCreate()"  icon="edit">添加</el-button>   
  </el-form>

  <div class="content">
  <el-table  :data="tableData"  style="width: 100%" >
    <el-table-column  label="序号"  width="100">
    <template scope="scope">
      {{scope.$index}}
    </template>
    </el-table-column>
    <el-table-column  prop="style" label="项目分类"  width="100"></el-table-column>
    <el-table-column  prop="name" label="项目名称"  width="100"></el-table-column>
    <el-table-column  prop="company" label="单位"  width="100"></el-table-column>
    <el-table-column  prop="price" label="单价（元）"  width="130"></el-table-column>
    <el-table-column  prop="department" label="执行科室"  width="100"></el-table-column>
    <el-table-column  prop="usestate" label="启用状态"  width="100"></el-table-column>
   
    <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small"  @click="handleEdit(scope.$index, scope.row)"> 编辑</el-button>
            <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
          </template>
        </el-table-column>
      </el-table>
  </el-table>    
  
  </div>
  <!-- 点击编辑出现的弹窗 -->
  <el-dialog title="修改个人信息" v-model="dialogFormVisible" size="tiny" >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="项目类型">
        <el-input v-model="form.style"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="执行科室">
        <el-input v-model="form.department"></el-input>
      </el-form-item>
      <el-form-item label="启用状态">
      <el-select v-model="form.usestate" placeholder="请选择">
        <el-option label="ture" value="ture"></el-option>
        <el-option label="false" value="false"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item class="center">
        <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>  
  <!-- 点击添加项目出现的弹窗 -->
  <el-dialog title="添加项目信息" v-model="dialogFormVisibleadd" size="tiny">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="项目类型">
        <el-input v-model="form.style"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="执行科室">
        <el-input v-model="form.department"></el-input>
      </el-form-item>
      <el-form-item label="启用状态">
        <el-input v-model="form.usestate"></el-input>
      </el-form-item>
      <el-form-item class="center">
        <el-button type="primary" @click="handleSaveadd" :loading="editLoading">修改</el-button>
        <el-button @click="dialogFormVisibleadd = false">取消</el-button>
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
  name: 'smallproject',
  data () {
    return {
      msg: '项目',
      dialogFormVisible:false,
      dialogFormVisibleadd:false,
      editLoading:false,//是否显示修改状态
      currentPage1: 5,
      activeIndex: '1',
      formInline: {
         user: '',
         region: '',
         state:'',
      },
       form: {
          style: '',
          name: '',
          company:'',
          price:'',
          department:'',
          usestate:'',
        },
      tableData: [{
                 
                 style: '',
                 name: '',
                 company:'',
                 price:'',
                 department:'',
                 usestate:'',
               }]
    }
  }, //实例化就获取数据
    mounted:function(){
      this.$http.get(api.smallproject).then(function(response){
        this.tableData=response.data.tableData;
      });
    },
  methods: {
     onSubmit() {
             this.$http.get(api.smallproject_search,{params:this.formInline}).then(function(response){
            this.tableData=response.data.tableData;
          });
     },
     handleEdit (index, row) {
       this.dialogFormVisible = true;
       this.form = Object.assign({}, row);
       this.table_index = index;
     },

     handleSave () {
       this.$confirm('确认提交吗？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         cancelButtonClass: 'cancel'
       }).then(() => {
        this.editLoading = true;//显示正在修改，圆圈跑起来
        this.tableData[this.table_index] = this.form;
        this.tableData.splice(this.table_index, 1, this.form);
        this.$message({
           message: "操作成功！",
           type: 'success'
         });
         this.editLoading = false;
         this.dialogFormVisible = false;
       })
     },

     handleSaveadd () {

       this.$confirm('确认提交吗？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         cancelButtonClass: 'cancel'
       }).then(() => {
        //this.editLoading = true;//显示正在修改，圆圈跑起来
        let vm=this;
        vm.tableData.push(vm.form);
        this.$message({
           message: "操作成功！",
           type: 'success'
        });
        this.dialogFormVisibleadd = false;
       });
     },

     handleDelete (index, row) {
       this.tableData.splice(index, 1);
       this.$message({
         message: "操作成功！",
         type: 'success'
       });
     },

     handleCreate(){    
      this.initform();// //每次都初始化
      this.dialogFormVisibleadd = true; 
     },

     //每次都初始化为空
     initform(){
      this.form={
          style: '',
          name: '',
          company:'',
          price:'',
          department:'',
          usestate:'',
        }
     },

      handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      },
      handleSelect(key, keyPath) {
      console.log(key, keyPath);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.smallproject{
  padding: 20px;
}

.smallproject .content{
 /* width: 95%;*/
  height: 400px;
  background: white;
 /* margin: 0 auto;*/
}
.smallproject .block{
  text-align: center;
}
.smallproject .center{
  text-align: center;
}




</style>
