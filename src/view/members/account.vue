<template>
  <div class="account" >
    
    <br>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item label="账户号">
        <el-input v-model="formInline.account" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="会员类型">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option label="黄金会员" value="黄金会员"></el-option>
          <el-option label="普通会员" value="普通会员"></el-option>
          <el-option label="vip会员" value="vip会员"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="账户创建人">
        <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" class="el-icon-search"@click="onSubmit"></el-button>
      </el-form-item> 

    </el-form>

    <!-- 表格内容 -->
    <div class="content">
      <el-table  :data="tableData"  account_type="width: 100%" >
        <el-table-column  prop="account"label="会员账户号"  width="110"></el-table-column>
       
        <el-table-column  prop="account_type" label="会员账户类型"  width="150"></el-table-column>
        <el-table-column  prop="username" label="账户创建人"  width="110"></el-table-column>
        <el-table-column  prop="share" label="账户共享人"  width="130"></el-table-column>
        <el-table-column  prop="money" label="账户余额（元）"  width="150"></el-table-column>
        <el-table-column  prop="deadline" label="账户有效期至"  width="130"></el-table-column>
        <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" type="success" @click="accountPay(scope.$index, scope.row)"> 账户充值</el-button>
                <el-button size="small" type="success" @click="account_typeChange(scope.$index, scope.row)"> 类型变更</el-button>
                <el-button size="small" type="success" @click="familyShare(scope.$index, scope.row)"> 家人共享</el-button>
                <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
              </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 点击账户首次充值出现的弹窗 -->
    <el-dialog title="账户首充登记" v-model="dialogFormVisible_moneypay" size="tiny" >
      <el-form ref="form" :model="form" label-width="100px">

        <i class="fa fa-user-circle-o fa-2x" aria-hidden="true"></i> <span>{{form.username}}</span>
        <br><br><br>

        <el-form-item label="充值金额：" class="lleft">
          <el-input v-model="form.money"></el-input>
        </el-form-item>

        <el-form-item label="账户类型：">
          <el-select v-model="form.account_type" placeholder="请选择">
            <el-option label="黄金会员" value="黄金会员"></el-option>
            <el-option label="普通会员" value="普通会员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="收费方式：">
        <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="center">
          <el-button type="primary" @click="handleSave" :loading="editLoading">确定</el-button>
          <el-button @click="dialogFormVisible_moneypay = false">取消</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>  

    <!-- 点击账户再次充值出现的弹窗 -->
    <el-dialog title="账户余额充值" v-model="dialogFormVisible_moneypayagain" size="tiny" >
      <el-form ref="form" :model="form" label-width="100px">

        <div class="left"><i class="fa fa-id-card fa-2x" aria-hidden="true"></i><span class="space">{{form.account}}</span></div>
        <div  class="right"><i class="fa fa-usd  fa-2x" aria-hidden="true">余额：</i><span class="content_size">{{form.money}}元</span></div>  <br><br><br>
        

        <el-form-item label="账户创建人："><span>{{form.username}}</span> </el-form-item>

        <el-form-item label="充值金额：" class="lleft">
          <el-input v-model="paymoney"></el-input>
        </el-form-item>

        <el-form-item label="收费方式：">
        <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      <el-form-item class="center">
      <template scope="scope">
        <el-button type="primary" @click="handleSave_moneypayagain(scope.$index, scope.row)" :loading="editLoading">确定</el-button>
        <el-button @click="dialogFormVisible_moneypayagain = false">取消</el-button>
      </template>
      </el-form-item>

      </el-form>
    </el-dialog>

    <!-- 点击类型变更出现的弹窗 -->
    <el-dialog title="账户类型变更" v-model="dialogFormVisible_changeaccount_type" size="tiny" >
      <el-form ref="form" :model="form" label-width="120px">
        <div class="left"><i class="fa fa-id-card fa-2x" aria-hidden="true"></i><span class="space">{{form.account}}</span></div>
        <div  class="right"><i class="fa fa-usd  fa-2x" aria-hidden="true">余额：</i><span class="content_size">{{form.money}}元</span></div>  <br><br><br>
        
        <el-form-item label="账户创建人："><span>{{form.username}}</span> </el-form-item>

        <el-form-item label="会员账户类型："><span>{{form.account_type}}</span> </el-form-item>

         <el-form-item label="变更类型为：">
          <el-select v-model="changeaccount_type" placeholder="请选择">
            <el-option label="黄金会员" value="黄金会员"></el-option>
            <el-option label="普通会员" value="普通会员"></el-option>
          </el-select>
          </el-form-item>

        <el-form-item class="center">
        <template scope="scope">
          <el-button type="primary" @click="handleSave_changeaccount_type()" :loading="editLoading">确定</el-button>
          <el-button @click="dialogFormVisible_changeaccount_type = false">取消</el-button>
        </template>
        </el-form-item>

      </el-form>
    </el-dialog>   

    <!-- 点击家人共享出现的弹窗 -->
    <el-dialog title="设置家人共享" v-model="dialogFormVisible_familyShare" size="tiny" >
      <el-form ref="form" :model="form" label-width="120px">
      <div class="left"><i class="fa fa-id-card fa-2x" aria-hidden="true"></i><span class="space">{{form.account}}</span></div>
      <div  class="right"><i class="fa fa-usd  fa-2x" aria-hidden="true">余额：</i><span class="content_size">{{form.money}}元</span></div> 
      <br><br><br>

      <el-form-item label="账户创建人："><span>{{form.username}}</span> </el-form-item>

      <el-form-item label="已有共享人："><span>{{form.share}}</span></el-form-item>

      <el-form-item label="添加共享人：">
        <el-input v-model="changefamilyShare" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item class="center">
      <template scope="scope">
        <el-button type="primary" @click="handleSave_familyShare()" :loading="editLoading">确定</el-button>
        <el-button @click="dialogFormVisible_familyShare = false">取消</el-button>
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
  username: 'account',
  data () {
    return {
      
      dialogFormVisible_moneypay:false,
      dialogFormVisible_moneypayagain:false,
      dialogFormVisible_changeaccount_type:false,
      dialogFormVisible_familyShare:false,
      editLoading:false,//是否显示修改状态
      currentPage1: 5,
      activeIndex: '1',
      value: '',
      paymoney:'',
      changeaccount_type:'',
      changefamilyShare:'',
      formInline: {
         user: '',
         region: '',
         account:'',
      },
     form: {
        account:'',
        account_type: '',
        username: '',
        share:'',
        money:'',
        deadline:'',
        type:'',

      },
      options: [{
        value: '选项1',
        label: '支付宝'
      }, {
        value: '选项2',
        label: '微信'
      }],
      tableData:[
                  {
                      account:'',
                      account_type: '',
                      username: '',
                      share:'',
                      money:'',
                      deadline:'',
                  }
                ]
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
       //账户充值
        accountPay (index, row) {

        let money=this.tableData[index].money;
        if(money===null){
         this.dialogFormVisible_moneypay = true;
        }
        else{
         
         this.dialogFormVisible_moneypayagain = true;
        }
         this.form = Object.assign({}, row);
         this.table_index = index;
        },
        //点击类型变更
        account_typeChange(index, row){
         this.changeaccount_type='';
         this.dialogFormVisible_changeaccount_type = true;
         this.form = Object.assign({}, row);
         this.table_index = index;
        },
        //点击家人共享
        familyShare(index, row){
         this.changefamilyShare='';
         this.dialogFormVisible_familyShare = true;
         this.form = Object.assign({}, row);
         this.table_index = index;
        },
        //点击首次充值确定
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
           this.dialogFormVisible_moneypay = false;
         })
        },
        //点击再次充值确定
        handleSave_moneypayagain (index,row) {
         this.$confirm('确认提交吗？', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           cancelButtonClass: 'cancel'
         }).then(() => {
          if(this.paymoney){
            this.form.money=parseInt(this.paymoney)+parseInt(this.form.money);
          }
          this.tableData[this.table_index] = this.form;
          this.tableData.splice(this.table_index, 1, this.form);//??
          this.paymoney='';
          this.value='';
          this.$message({
             message: "操作成功！",
             type: 'success'
           });
           this.editLoading = false;
           this.dialogFormVisible_moneypayagain = false;

          })
        },
        //点击类型更改确定
        handleSave_changeaccount_type () {
         this.$confirm('确认提交吗？', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           cancelButtonClass: 'cancel'
         }).then(() => {
          this.editLoading = true;//显示正在修改，圆圈跑起来
          this.form.account_type=this.changeaccount_type;
          this.tableData[this.table_index] = this.form;
          this.tableData.splice(this.table_index, 1, this.form);
          this.$message({
             message: "操作成功！",
             type: 'success'
           });
           this.editLoading = false;
           this.dialogFormVisible_changeaccount_type = false;
         })
        },
         //点击家人共享确定
        handleSave_familyShare() {
         this.$confirm('确认提交吗？', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           cancelButtonClass: 'cancel'
         }).then(() => {
          this.editLoading = true;//显示正在修改，圆圈跑起来
          this.form.share=(this.changefamilyShare+','+this.form.share);
          this.tableData[this.table_index] = this.form;
          this.tableData.splice(this.table_index, 1, this.form);
          this.$message({
             message: "操作成功！",
             type: 'success'
           });
           this.editLoading = false;
           this.dialogFormVisible_familyShare = false;
         })
        },
       //删除
        handleDelete (index, row) {
         this.tableData.splice(index, 1);
         this.$message({
           message: "操作成功！",
           type: 'success'
         });
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
    }
}
</script>
<style type="text/css">>
  .account{
    padding: 20px;
  }
  .account .content{
    height: 400px;
   background: white;
  }
  .account .block{
    text-align: center;
  }
  .account .center{
    text-align: center;
  }
  .account .left{
    width: 50%;
    float: left;
    text-align: center;
  }
  .account .right{
     width: 50%;
    float: right;
    text-align: center;
  }
  .account .lleft{
    text-align: left;
  }
  .account .el-form-item__content {
    font-size: 23px;
  }
  .account .content_size{
    font-size: 20px;
  }
  .el-dialog__header{
    background: #f6f6f6;
    padding-bottom: 10px;
  }
</style>
