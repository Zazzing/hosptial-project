<template>
  <div class="inOne-Checks">
    <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column prop="type" label="类型" width="180">
      </el-table-column>
      <el-table-column prop="deparment" label="执行科室" width="100">
      </el-table-column>
      <el-table-column prop="deparment" label="项目名称" width="100">
      </el-table-column>
      <el-table-column label="注意事项" width="350">
        <template scope="props">
          <el-input v-model="props.row.attention"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="prices" label="价格(元)" align="center" sortable>
      </el-table-column>
    </el-table>
    <div class="checeksub">
      <el-button type="primary" @click="onload()">保存</el-button>
    </div>
  </div>
</template>

<style>
  .checeksub{
    margin-top: 10px;
  }
</style>

<script>
  import Vue from 'vue'
  import {api} from '../../global/api';
  export default {
    data() {
      return {
        tableData: [],
      }
    },
    methods: {
     onload(){
        let that = this
          // console.log('单个删除选择的row：',index,'-----',row);
        that.$confirm('确认保存吗？', '提示', {}).then(() => {
          that.$message({
            type: 'success',
            message: '已保存在控制台'
          });
          console.log(JSON.stringify(this.tableData));
        }).catch(() => {
      }); 
     }
    },
    mounted() {
      let that = this
      Vue.http.get(api.inquiryData).then(response  => {
        console.log("请求成功了");
        console.log(response);
          
        let formdata = response.data.tableDatas;
        console.log("这是我们需要的json数据",formdata);
        that.tableData = formdata;
      }, response => {
        alert("请求失败了")
      })
    }
  }
</script>