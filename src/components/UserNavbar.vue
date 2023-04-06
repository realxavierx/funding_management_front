<template>
  <div class="clientNavbar">
    <el-menu class="navbar" :default-active="this.$route.path" router mode="horizontal" @open="handleOpen"
             @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

      <div class="navbar-container">
        <el-menu-item index="/user/application">报销申请</el-menu-item>
        <el-menu-item index="/user/groupPage">课题组管理</el-menu-item>
        <el-menu-item index="/user/useOfFunds">课题组经费使用情况</el-menu-item>

        <el-menu-item index="/admin/">
          <template v-slot:title>
            <i class="el-icon-bell"></i>
            <span>消息中心</span>
          </template>
        </el-menu-item>

        <el-menu-item index="/">退出登录</el-menu-item>

      </div>
    </el-menu>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isLogin: false,
      nickname: "",
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

  },

}
</script>

<style scoped>
.navbar {
  position: relative;
  z-index: 100;
}

.navbar-container {
  display: flex;
  justify-content: flex-end;
}

</style>

