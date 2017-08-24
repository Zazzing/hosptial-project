<template>
  <div class="appointreport" >
  <!-- <br> -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="创建时间" >
       <el-input v-model="formInline.time1" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="客户姓名">
      <el-input v-model="formInline.name1" placeholder="客户姓名"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="formInline.state" placeholder="请选择">
        <el-option label="生效中" value="ture"></el-option>
        <el-option label="已确认" value="false"></el-option>
        <el-option label="已过期" value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="success" class="el-icon-search"@click="onSubmit"></el-button>
    </el-form-item>
    <el-button class="filter-item" type="primary" @click="handleCreate()"  icon="edit">新增报备</el-button>   
  </el-form>
  
  <div class="content">
  <el-table  :data="tableData"  style="width: 100%" >
    <el-table-column  label="序号"  width="100">
    <template scope="scope">
      {{scope.$index}}
    </template>
    </el-table-column>
    <el-table-column  prop="time" label="创建时间"  width="100"></el-table-column>
    <el-table-column  prop="name" label="客户姓名"  width="100"></el-table-column>
    <el-table-column  prop="phone" label="联系电话"  width="100"></el-table-column>
    <el-table-column  prop="source" label="报备来源"  width="130"></el-table-column>
    <el-table-column  prop="indate" label="有效期"  width="100"></el-table-column>
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
  <el-dialog title="修改预约信息" v-model="dialogFormVisible" size="tiny" >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="创建时间">
        <el-input v-model="form.time"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="报备来源">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="有效期">
        <el-input v-model="form.indate"></el-input>
      </el-form-item>
      <el-form-item label="状态">
      <el-select v-model="form.usestate" placeholder="请选择">
        <el-option label="生效中" value="生效中"></el-option>
        <el-option label="已确认" value="已确认"></el-option>
        <el-option label="已过期" value="已过期"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item class="center">
        <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>  
  <!-- 点击添加项目出现的弹窗 -->
  <el-dialog title="添加预约信息" v-model="dialogFormVisibleadd" size="tiny">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="创建时间">
        <el-input v-model="form.time"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="报备来源">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="有效期">
        <el-input v-model="form.indate"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.usestate" placeholder="请选择">
        <el-option label="生效中" value="生效中"></el-option>
        <el-option label="已确认" value="已确认"></el-option>
        <el-option label="已过期" value="已过期"></el-option>
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
  name: 'appointreport',
  data () {
    return {

      dialogFormVisible:false,
      dialogFormVisibleadd:false,
      editLoading:false,//是否显示修改状态
      currentPage1: 5,
      activeIndex: '1',
      formInline: {
         time1: '',
         name1: '',
         state:'',
      },
       form: {
          time: '',
          name: '',
          phone:'',
          source:'',
          indate:'',
          usestate:'',
        },
      tableData: [{
                 
                 time: '2017-05-03',
                 name: '李春华',
                 phone:'13800138000',
                 source:'李笑笑',
                 indate:'20170503',
                 usestate:'生效中',
               }, 
               {
                 
                 time: '2017-05-03',
                 name: '李春华',
                 phone:'13800138000',
                 source:'李笑笑',
                 indate:'20170503',
                 usestate:'生效中',
               },
               {
                 time: '2017-05-03',
                 name: '李春华',
                 phone:'13800138000',
                 source:'李笑笑',
                 indate:'20170503',
                 usestate:'生效中',
               }, 
               {
               
                 time: '2017-05-03',
                 name: '李春华',
                 phone:'13800138000',
                 source:'李笑笑',
                 indate:'20170503',
                 usestate:'生效中',
               }]
    }
  },
  methods: {
     onSubmit() {
       this.$message('还没实现');
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
          time: '',
          name: '',
          phone:'',
          source:'',
          indate:'',
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
.appointreport{
  padding: 20px;
}

.appointreport .content{
 /* width: 95%;*/
  height: 450px;
  background: white;
 /* margin: 0 auto;*/
}
.appointreport .block{
  text-align: center;
}
.appointreport .center{
  text-align: center;
}
</style>
