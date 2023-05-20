<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>

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
  background-color: #c9c9e7;
  opacity: 1;
  background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #c9c9e7 34px ), repeating-linear-gradient( #e5e6f555, #e5e6f5 );

  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position:fixed;
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