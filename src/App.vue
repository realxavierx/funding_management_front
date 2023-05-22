<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>

import {ElMessage} from "element-plus";

export default {
  name: 'app',
}
</script>
<style>
/* 有了这一段，走马灯可以布满整个屏幕了 */
body {
  margin: 0;
  padding: 0;
  border: 0;
}

#app {
  background-color: #edede1;
  opacity: 1;
  background-image: radial-gradient(#e7b6f9 1.5px, transparent 1.5px), radial-gradient(#e7b6f9 1.5px, #edede1 1.5px);
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;

  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
}

#picture {
  background: url("assets/haimian1.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

#particles-js {
  width: 100%;
  height: 100%;
  position: absolute;
  /* 设置absolute,其他DIV设置为relative，这样这个例子效果就作为背景 */
}
</style>