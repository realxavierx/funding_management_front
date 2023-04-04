<template>
  <div id="home">
    <div class="home_background">
      <vue-particles color="#409EFF" :particleOpacity="0.7" :particlesNumber="100" shapeType="star" :particleSize="5"
                     linesColor="#409EFF" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
                     :moveSpeed="4" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="bubble">
      </vue-particles>
      <h1>Home</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>
<style>
/* 主页渐变背景 */
.home_background {
  position: relative;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  /* background: linear-gradient(0deg, rgba(242, 96, 96, 0.826) 0%, rgb(249, 221, 83) 50%, rgb(249, 234, 163) 100%); */
  /* background: linear-gradient(0deg, rgba(179, 242, 96, 0.826) 0%, rgb(249, 221, 83) 50%, rgb(249, 234, 163) 100%); */
  background: linear-gradient(rgba(28, 28, 127, 0.826) 5%, rgb(1, 73, 155) 70%, rgb(85, 175, 179) 100%);
}
</style>
  
  
  
  