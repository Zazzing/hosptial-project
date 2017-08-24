<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
}
body{
	width: 100%;
	height: 100%;
	background: #f1f1f1;
}
</style>
