<template>
  <div class="adminHome">
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
</style>