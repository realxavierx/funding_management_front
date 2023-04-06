<template>
  <div>
    <h2 align="center">XXX课题组</h2>

    <h3>课题组成员</h3>
    <div>
      <el-card v-for="elem in members">

      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "groupPage",

  data() {

    return {
      members: []
    }
  }
}
</script>

<style scoped>

</style>