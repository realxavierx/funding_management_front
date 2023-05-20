<template>
  <div class="adminHome">
    <div class="logoBox">
      <router-link active-class="initial" to="/admin/adminHomePage">
        <div class="logo">
          <img src="../../assets/sandy.png" alt="">
        </div>
      </router-link>
    </div>
    <AdminNavbar></AdminNavbar>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue';

export default {
  name: "AdminHome",
  components: {
    AdminNavbar
  },
  data() {
    return {
      path: ''
    }
  },
  // 判断路由
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
  height: 44px;
  display: block;
  margin-top: calc((48px - 44px) / 2);
}
</style>