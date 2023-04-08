<template>
  <div class="userHome">
    <div class="logoBox">
      <router-link active-class="initial" to="/user/userHomePage">
        <div class="logo">
          <img src="../../assets/haimian.png" alt="">
        </div>
      </router-link>
    </div>
    <UserNavbar></UserNavbar>
  </div>
</template>

<script>
import UserNavbar from "@/components/UserNavbar";

export default {
  name: "UserHome",
  components: {
    UserNavbar
  },
  data() {
    return {
      path: ''
    }
  },
  mounted() {
    this.path = this.$route.path;
  },
  watch: {
    $route(to, from) {
      this.path = to.path
    }
  }
}
</script>
<style scoped>
.logoBox {
  position: relative;
  z-index: 200;
  padding: 0 15px;
}

.logo {
  position: relative;
  float: left;
  margin-right: 8px;
  /* 当箭头鼠标移到会变成手式鼠标 */
  cursor: pointer;
}

.logo img {
  /*width: 80px;*/
  /*max-width: 80px;*/
  height: 44px;
  display: block;
  margin-top: calc((48px - 44px) / 2);
}
</style>