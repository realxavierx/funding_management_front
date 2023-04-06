<template>
<!--  <span>一个表展示该课题组的经费使用情况（余额、执行率等）</span>-->
  <div>
    <h2>课题组经费使用情况</h2>

    <el-table border>
      <el-table-column prop="id" label="经费编号"/>
      <el-table-column prop="name" label="经费名称"/>
      <el-table-column prop="total" label="经费总额"/>
      <el-table-column prop="used" label="已使用经费"/>
      <el-table-column prop="remain" label="经费余额"/>
      <el-table-column prop="rate" label="当前执行率"/>
      <el-table-column prop="qualified" label="当前是否达标"/>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "UseOfFunds"
}
</script>

<style scoped>

</style>