<template>
  <div>
    <h2 style="text-align: center">Funding Management</h2>
    <el-radio-group v-model="showTable" @change="threeTableAPI">
      <el-radio-button label="multiTotalTable">多项经费使用一览表</el-radio-button>
      <el-radio-button label="multiDetailTable">经费授权明细一览表</el-radio-button>
      <el-radio-button label="teacherDetailTable">经费汇总表</el-radio-button>
    </el-radio-group>

    <div class="multi-total-table" v-if="showTable === 'multiTotalTable'">
      <!--      每个经费的使用情况 - 包含所有老师(系里)-->
      <h3>多项经费使用一览表</h3>
      <el-table :data="multiTotalTableData" border style="width:100%"
                :header-cell-style="{ background: '#69727a', color: '#fff', 'text-align': 'center' }"
                highlight-current-row>
        <el-table-column prop="code" label="经费编号"/>
        <el-table-column prop="name" label="经费名称"/>
        <el-table-column prop="due_date" label="授权有效期"/>
        <el-table-column prop="total_sum" label="经费总额"/>
        <el-table-column prop="used_sum" label="已使用经费"/>
        <el-table-column prop="left_sum" label="经费余额"/>
        <el-table-column prop="days_left" label="剩余时间天数"/>
        <el-table-column prop="current_execution_rate" label="当前执行率"/>
        <el-table-column prop="qualified" label="当前是否达标"/>
      </el-table>
    </div>

    <div class="multi-detail-table" v-if="showTable === 'multiDetailTable'">
      <!--      每个老师每个经费的具体使用的用处  XX经费授权明细-->
      <h3>经费授权明细一览表</h3>
      <!--      <el-table :data="multiDetailTableData" border style="width:100%"-->
      <!--                :header-cell-style="{ background: '#69727a', color: '#fff', 'text-align': 'center' }"-->
      <!--                highlight-current-row>-->
      <!--        <el-table-column prop="code" label="经费编号"/>-->
      <!--        <el-table-column prop="name" label="经费名称"/>-->
      <!--        <el-table-column prop="groups" label="课题组"/>-->
      <!--        <el-table-column prop="total_sum" label="可使用经费总额"/>-->
      <!--        <el-table-column prop="first_category" label="支出类别（一级）"/>-->
      <!--        <el-table-column prop="second_category" label="支出类别（二级）"/>-->
      <!--        <el-table-column prop="used_sum" label="可使用额度"/>-->
      <!--      </el-table>-->
      <el-collapse v-model="activeData">
        <el-collapse-item v-for="(value, key, index) in aggregatedData" :title="key" :name="index">
          <h4>{{value[0].code}} - {{value[0].name}} - {{value[0].groups}}</h4>
          <h5>可使用经费总额：{{value[0].total_sum}}</h5>
          <div v-for="item in value" :key="item">
            <el-descriptions>
              <el-descriptions-item width="33%" label="支出类别（一级）">{{ item.first_category }}</el-descriptions-item>
              <el-descriptions-item width="33%" label="支出类别（二级）">{{ item.second_category }}</el-descriptions-item>
              <el-descriptions-item width="33%" label="可使用额度">{{ item.used_sum }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="teacher-detail-table" v-if="showTable === 'teacherDetailTable'">
      <!--      每个老师每个经费的总体使用情况-->
      <h3>经费汇总表</h3>
      <el-table :data="teacherDetailTableData" border style="width:100%"
                :header-cell-style="{ background: '#69727a', color: '#fff', 'text-align': 'center' }"
                highlight-current-row>
        <el-table-column prop="code" label="经费编号"/>
        <el-table-column prop="fund_name" label="经费名称"/>
        <el-table-column prop="group_name" label="课题组"/>
        <el-table-column prop="total" label="可使用经费总额"/>
        <el-table-column prop="used" label="已使用经费"/>
        <el-table-column prop="usable_left" label="经费余额"/>
        <el-table-column prop="current_execution_rate" label="执行率"/>
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
      showTable: 'multiTotalTable',
      multiTotalTableData: [],
      multiDetailTableData: [],
      teacherDetailTableData: [],
      activeData: '',
      aggregatedData: {},
    }
  },
  methods: {
    threeTableAPI() {
      let _this = this
      if (this.showTable === 'multiTotalTable') {
        this.$api.adminAPI.calculateFundingSum().then(resp => {
          // console.log(resp)
          _this.multiTotalTableData = resp.data.data.funding_info;
        }).catch(err => {
          console.log(err);
        });
      } else if (this.showTable === 'multiDetailTable') {
        this.$api.adminAPI.multiDetailTable().then(resp => {
          // console.log(resp)
          _this.multiDetailTableData = resp.data.data.funding_info;
          // console.log("明细", _this.multiDetailTableData)
          _this.aggregateGroupInfo()
        }).catch(err => {
          console.log(err);
        });
      } else {
        this.$api.adminAPI.calculateExpenditureSummary().then(resp => {
          // console.log(resp)
          _this.teacherDetailTableData = resp.data.data.funding_info;
        }).catch(err => {
          console.log(err);
        });
      }
    },

    aggregateGroupInfo() {
      for (const data of this.multiDetailTableData) {
        let key = data.groups + "-" + data.name
        if (this.aggregatedData.hasOwnProperty(key)) {
          this.aggregatedData[key].push(data)
        }
        else {
          this.aggregatedData[key] = []
          this.aggregatedData[key].push(data)
        }
      }
      // console.log(this.aggregatedData)
    }
  },
  mounted() {
    this.threeTableAPI()
  }
}
</script>

<style scoped>

</style>