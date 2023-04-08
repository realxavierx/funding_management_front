<template>
  <!--  <span>一个表展示该课题组的经费使用情况（余额、执行率等）</span>-->
  <div>
    <h2>课题组经费使用情况</h2>

    <el-radio-group v-model="selectedGroup">
      <el-radio-button v-for="group in user.groupName" :label="group" @change="groupChange"/>
    </el-radio-group>

    <el-table :data="tableData" border style="width:100%"
              :header-cell-style="{ background: '#69727a', color: '#fff', 'text-align': 'center' }"
              highlight-current-row>
      <el-table-column prop="code" label="经费编号"/>
      <el-table-column prop="name" label="经费名称"/>
      <el-table-column prop="due_date" label="经费授权有效期"/>
      <el-table-column prop="total_sum" label="经费总额"/>
      <el-table-column prop="used_sum" label="已使用经费"/>
      <el-table-column prop="left_sum" label="经费余额"/>
      <el-table-column prop="days_left" label="剩余天数"/>
      <el-table-column prop="current_execution_rate" label="当前执行率"/>
      <el-table-column prop="qualified" label="当前是否达标"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UseOfFunds",
  data() {
    return {
      tableData: [],
      user: this.$store.getters.getUser,
      selectedGroup: this.$store.getters.getUser.groupName[0],
    }
  },

  methods: {
    groupChange() {
      const _this = this
      this.$api.userAPI.calculateExpenditureSummaryUser(this.selectedGroup).then(resp => {
        console.log(resp)
        _this.tableData = resp.data.data.funding_info
      }).catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.groupChange()
  }
}
</script>

<style scoped>

</style>