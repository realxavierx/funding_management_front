<template>
  <div>
    <h2 style="text-align: center">Funding Management</h2>
    <el-radio-group v-model="showTable">
      <el-radio-button label="multiTotalTable">多项经费使用一览表</el-radio-button>
      <el-radio-button label="multiDetailTable">经费授权明细一览表</el-radio-button>
      <el-radio-button label="teacherDetailTable">经费汇总表</el-radio-button>
    </el-radio-group>

    <div class="multi-total-table" v-if="showTable === 'multiTotalTable'">
<!--      每个经费的使用情况 - 包含所有老师(系里)-->
      <h3>多项经费使用一览表</h3>
      <el-table border>
        <el-table-column prop="id" label="序号"/>
        <el-table-column prop="num" label="经费编号"/>
        <el-table-column prop="name" label="经费名称"/>
        <el-table-column prop="time" label="授权有效期"/>
        <el-table-column prop="total" label="经费总额"/>
        <el-table-column prop="used" label="已使用经费"/>
        <el-table-column prop="remain" label="经费余额"/>
        <el-table-column prop="days" label="剩余时间天数"/>
        <el-table-column prop="rate" label="当前执行率"/>
        <el-table-column prop="qualified" label="当前是否达标"/>
      </el-table>
    </div>

    <div class="multi-detail-table" v-if="showTable === 'multiDetailTable'">
<!--      每个老师每个经费的具体使用的用处-->
      <h3>经费授权明细一览表</h3>
      <el-table border>
        <el-table-column prop="id" label="经费编号"/>
        <el-table-column prop="name" label="经费名称"/>
        <el-table-column prop="group" label="课题组"/>
        <el-table-column prop="total" label="可使用经费总额"/>
        <el-table-column prop="usedType_1" label="支出类别（一级）"/>
        <el-table-column prop="usedType_2" label="支出类别（二级）"/>
        <el-table-column prop="quota" label="可使用额度"/>
      </el-table>
    </div>

    <div class="teacher-detail-table" v-if="showTable === 'teacherDetailTable'">
<!--      每个老师每个经费的总体使用情况-->
      <h3>经费汇总表</h3>
      <el-table border>
        <el-table-column prop="id" label="经费编号"/>
        <el-table-column prop="name" label="经费名称"/>
        <el-table-column prop="group" label="课题组"/>
        <el-table-column prop="total" label="可使用经费总额"/>
        <el-table-column prop="used" label="已使用经费"/>
        <el-table-column prop="remain" label="经费余额"/>
        <el-table-column prop="rate" label="执行率"/>
        <el-table-column prop="qualified" label="执行率是否达标"/>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "FundingManagement",

  data() {

    return {
      showTable: 'multiTotalTable'
    }
  }
}
</script>

<style scoped>

</style>