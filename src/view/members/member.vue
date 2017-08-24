<template>
  <div class="project" >

  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <router-link to="/home/members/account">
      <el-menu-item index="1">会员账号</el-menu-item>
    </router-link>
    <router-link to="/home/members/integral">
      <el-menu-item index="2">会员积分</el-menu-item>
    </router-link>
    <router-link to="/home/members/mem_package">
      <el-menu-item index="3">会员套餐</el-menu-item>
    </router-link>
    <router-link to="/home/members/style">
      <el-menu-item index="4">会员类型</el-menu-item>
    </router-link>
  </el-menu>

  <router-view ></router-view> 
  </div>
</template>
<script >

export default {
  name: 'project',
  data () {
    return {
      msg: '项目',
      activeIndex:'1',
      handleSelect(key, keyPath) {
      console.log(key, keyPath);
      }
    }
  }
}
</script>

<style scoped>
.project{
 
}

</style>
