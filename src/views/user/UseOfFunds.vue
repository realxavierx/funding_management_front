<template>
  <!--  <span>一个表展示该课题组的经费使用情况（余额、执行率等）</span>-->
  <div>
    <h2>课题组经费使用情况</h2>

    <el-radio-group v-model="selectedGroup">
      <el-radio-button v-for="group in user.groupName" :label="group" @change="groupChange"/>
    </el-radio-group>

    <div ref="useOfFundChartDom" id="useOfFundChart" style="width: 70%; height: 500px; margin:auto"></div>

    <el-table :data="tableData" border style="width:80%;margin: 3% auto 3%;"
              :header-cell-style="{ background: '#69727a', color: '#fff', 'text-align': 'center' }"
              highlight-current-row>
      <el-table-column prop="code" label="经费编号"/>
      <el-table-column prop="fund_name" label="经费名称"/>
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
import * as echarts from "echarts"

export default {
  name: "UseOfFunds",
  data() {
    return {
      tableData: [],
      user: this.$store.getters.getUser,
      selectedGroup: this.$store.getters.getUser.groupName[0],
      fundNames: new Set(),
    }
  },

  methods: {
    groupChange() {
      const _this = this
      this.$api.userAPI.calculateExpenditureSummaryUser(this.selectedGroup).then(resp => {
        console.log(resp)
        _this.tableData = resp.data.data.funding_info;
        _this.visualizeChart();
      }).catch(err => {
        console.log(err);
      });
    },

    getUseOfFundTableSeries() {
      let series = [];
      let usedData = [];
      let leftData = [];

      for (const data of this.tableData) {
        this.fundNames.add(data.fund_name);
        usedData.push(data.used_sum);
        leftData.push(data.left_sum);
      }

      series.push(
          {
            name: 'Used',
            type: 'bar',
            stack: 'used',
            emphasis: {
              focus: 'series'
            },
            data: usedData
          },
          {
            name: 'Left',
            type: 'bar',
            stack: 'left',
            emphasis: {
              focus: 'series'
            },
            data: leftData
          }
      )

      return series;
    },

    visualizeChart() {
      let _this = this;
      const useOfFundChartDom = document.getElementById("useOfFundChart");
      const chart = echarts.init(useOfFundChartDom);
      const series = _this.getUseOfFundTableSeries();
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [..._this.fundNames]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: series
      })
    },


  },
  mounted() {
    this.groupChange()
  }
}
</script>

<style scoped>

</style>