<template>
  <div class="userHome">
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

</style>