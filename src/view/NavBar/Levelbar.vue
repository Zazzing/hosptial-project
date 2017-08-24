<template>
  <!-- 面包屑导航 对element-ui的面包屑进行二次封装 -->
  <div class="levelbar">
      <span class="text"> 当前位置：</span>
      <el-breadcrumb class="app-levelbar" separator="/">
        <el-breadcrumb-item v-for="(item,index)  in levelList">
        
            <router-link v-if='index==levelList.length-1' to="" >{{item.name}}</router-link>

            <router-link v-else :to="item.path">{{item.name}}</router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
  </div>
  
</template>

<script>
    export default {
      created() {
        this.getBreadcrumb()
      },
      data() {
        return {
          levelList: null
        }
      },
      methods: {
        getBreadcrumb() {
          console.log('----', this.$route.matched)
          let matched = this.$route.matched.filter(item => item.name);
          const first = matched[0];
          if (first && (first.name !== '首页' || first.path !== '')) {
            matched = [{ name: '首页', path: '/home/hello' }].concat(matched)
          }
          console.log('面包屑:',matched);
          this.levelList = matched;
        }
      },
      watch: {
        $route() {
          this.getBreadcrumb();
        }
      }
    }
</script>

<style rel="stylesheet/scss"  scoped>
    .levelbar .text{
      display: inline-block;
      margin-top: -5px;
      font-size: 16px;
    }
    .levelbar .app-levelbar{
        display: inline-block;
    }
    .levelbar .app-levelbar  .el-breadcrumb__item__inner a {
        text-decoration: none;
        font-size: 14px;
    }
</style>
