<template>
  <div class="smallhome">
      <div class="todayReservation">
          <!-- <p>今日预约</p> -->
          <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="今日预约"> </el-table-column>
              <el-table-column prop="name" label="" ></el-table-column>
              <el-table-column prop="phone" label=""></el-table-column>
              <el-table-column>
                  <template scope="scope">
                     <router-link to="/home/reservation/Vdetails">查看</router-link>
                  </template>
              </el-table-column>
          </el-table>
      </div>
      <div class="todayArrange">
          <p class="title">
            <span class="arr">今日排班</span>
            <router-link to="/home/arrange">
              <span class="more">更多</span>
            </router-link>
          </p>
          <div class="content">
            <p v-for="item in dataArrange[0].todos" class="todayArrange-content">
              <span v-if="item.text !== '暂无排班'">{{ item.time_start}}~{{ item.time_end}}&nbsp;&nbsp;{{ item.text}}</span>
            </p>
          </div>
          
      </div>

      <div class="echart">
          <p>上周看病人数统计</p>
          <div :style="{height:height,width:width}" ref="myEchart">
          </div>
      </div>
      <div class="news">
        <p>
          <span class="new">最新动态</span>
          <span class="more">更多</span>
        </p>
      </div>
  </div>
</template>
<style type="text/css" scoped>
    .smallhome .todayReservation{
      margin-left:15px;
      text-align: center;
      float: left;
      width: 50%;
    }
    .smallhome .todayReservation p{
      font-size: 18px;
      line-height: 60px;
    }
    .smallhome .todayReservation a{
        text-decoration: none;
        color: #3398DB;
    }
    .smallhome .todayReservation a:hover,.smallhome .todayReservation a:active{
       color: red;
    }
    .smallhome .todayArrange{
      margin-left: 15px;
      border: 1px solid #dfe6ec;
      float: left;
      width: 30%;
      background: #fff;
    }    
    .smallhome .todayArrange .title{
      line-height: 40px;
      background-color: #eef1f6;
    }
    .smallhome .todayArrange .title .arr,
    .smallhome .news .new{
      font-size: 14px;
      color:#1f2d3d;
      padding-left: 18px;
      padding-right: 18px;
      font-weight: bold;
    }
    .smallhome .todayArrange .title .more,
    .smallhome .news .more{
      font-size: 14px;
      color:#3398DB;
      padding-right: 30px;
      float: right;
    }
    .smallhome .todayArrange .content{
      height: 117px;
    }
    .smallhome .todayArrange .todayArrange-content{
      line-height: 30px;
      padding-left: 18px;
      padding-right: 18px;
      font-size: 14px;
      color:#10181f;
      border-bottom: 1px solid #dfe6ec;
    }
    .smallhome .echart{
      clear: both;
      margin-left: 15px;
      background: #fff;
      width: 49.9%;
      overflow: hidden;
      border: 1px solid #dfe6ec;
      position: relative;
      top: 15px;
      float: left;
    }
    .smallhome .echart p{
      font-size: 14px;
      font-weight: bold;
      color:#1f2d3d;
      width: 100%;
      line-height: 40px;
      background-color: #eef1f6;
      padding-left: 15px;
    }
    .smallhome .news{
      float: left;
      margin-left: 15px;
      margin-top: 15px;
      background: #fff;
      width: 30%;
      height: 540px;
      border: 1px solid #dfe6ec;
    }
    .smallhome .news p{
      line-height: 40px;
      background-color: #eef1f6; 
    }
</style>
 <script>
    import echarts from 'echarts';
    import store from '../../store';
    import {api} from '../../global/api';
    export default {
      data() {
        return {
          tableData:[],
          chart: null,
          dataArrange:store.state.weeks_content
        }
      },
      mounted:function(){
        this.$http.get(api.testData).then(function(response){
          console.log("首页的值response",response.data);
          this.tableData=response.data;
        });

        this.initChart();
      },

      // 图表部分
      // props接收父组件的数据
      props: {
        // 设置图表的宽度
        width: {
          type: String,
          default: '500px'
        },
        // 设置图表的高度
        height: {
          type: String,
          default: '500px'
        }
      },
      beforeDestroy() {
        if (!this.chart) {
          return
        }
        this.chart.dispose();
        this.chart = null;
      },
      methods: {
        initChart() {
          // 对图表进行初始化
          this.chart = echarts.init(this.$refs.myEchart);
          // 把配置和数据放这里
          this.chart.setOption({
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                // 鼠标悬浮在柱上的效果
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            // 图表的位置
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              type: 'bar',
              barWidth: '60%',
              data: [50, 32, 100, 300, 190, 58, 350]
            }]
          })
        }
      }


    }
  </script>

<style scoped>

</style>
