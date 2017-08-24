<template>
  <div class="registration" >
  <!-- <br> -->
 <el-button class="filter-item" type="success" @click="handleCreate()">新增挂号费</el-button> 
  <div class="content">
  <el-table  :data="tableData"  style="width: 100%" >
    <el-table-column  label="序号"  width="100">
    <template scope="scope">
      {{scope.$index}}
    </template>
    </el-table-column>
    <el-table-column  prop="style" label="挂号类型"  width="100"></el-table-column>
    <el-table-column  prop="relate" label="关联的项目"  width="180"></el-table-column>
    <el-table-column  prop="price" label="合计价格"  width="130"></el-table-column>
    <el-table-column  prop="usestate" label="状态"  width="100"></el-table-column>
   
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
  <el-dialog title="修改挂号费" v-model="dialogFormVisible" size="tiny" >
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="类型名称">
        <el-input v-model="form.style"></el-input>
      </el-form-item>
      <el-form-item label="关联项目">
        <el-input v-model="form.relate"></el-input>
      </el-form-item>
      <el-form-item label="合计价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>   
      <el-form-item label="状态">
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
  <el-dialog title="修改挂号费" v-model="dialogFormVisibleadd" size="tiny" >
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="类型名称">
        <el-input v-model="form.style"></el-input>
      </el-form-item>
      <el-form-item label="关联项目">
        <el-input v-model="form.relate"></el-input>
      </el-form-item>
      <el-form-item label="合计价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>   
      <el-form-item label="状态">
      <el-select v-model="form.usestate" placeholder="请选择">
        <el-option label="ture" value="ture"></el-option>
        <el-option label="false" value="false"></el-option>
      </el-select>
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

export default {
  name: 'registration',
  data () {
    return {
      msg: '项目>挂号费',
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
          relate:'',
          price:'',
          usestate:'',
        },
      tableData: [{
                 style: '普通门诊',
                 relate:'挂号费，',
                 price:'120',
                 usestate:'true',
               }, {
                 style: '专家门诊',
                 relate:'挂号费，',
                 price:'1200',
                 usestate:'false',
               }, {
                 style: '普通门诊',
                 relate:'挂号费，诊查费',
                 price:'120',
                 usestate:'true',
               }, {
                 style: '普通门诊',
                 relate:'挂号费，',
                 price:'120',
                 usestate:'true',
               }]
    }
  },
  methods: {
     onSubmit() {
       this.$message('模拟数据，这个方法并不管用哦~');
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
          relate:'',
          price:'',
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
.registration{
  padding: 20px;
}

.registration .content{
 /* width: 95%;*/
  height: 400px;
  background: white;
 /* margin: 0 auto;*/
}
.registration .block{
  text-align: center;
}
.registration .center{
  text-align: center;
}



</style>
