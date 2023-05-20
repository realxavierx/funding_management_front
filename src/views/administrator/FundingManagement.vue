<template>
  <div>
    <h2 style="text-align: center">Funding Management</h2>
    <el-radio-group v-model="showTable" @change="threeTableAPI">
      <el-radio-button label="multiTotalTable">多项经费使用一览表</el-radio-button>
      <el-radio-button label="multiDetailTable">经费授权明细一览表</el-radio-button>
      <el-radio-button label="teacherDetailTable">经费汇总表</el-radio-button>
    </el-radio-group>

    <el-popover placement="top" :width="170" trigger="click">
      <template #reference>
        <el-button type="success" @click="exportData">导出表格</el-button>
      </template>
      <template #default>
        <p>您确定要导出数据吗?</p>
        <vue3-json-excel
            :json-data="excelData"
            :name="excelName"
            :fields="excelFields"
        >
          <el-button style="margin-left: 50px" type="primary">确认</el-button>
        </vue3-json-excel>
      </template>
    </el-popover>

    <div class="multi-total-table" v-if="showTable === 'multiTotalTable'">
      <!--      每个经费的使用情况 - 包含所有老师(系里)-->
      <div ref="multiTotalChartDom" id="multiTotalChart" style="width: 70%; height: 500px;margin:auto"></div>
      <div class="table">
        <el-button type="primary" @click="handleRefresh()">刷新金额</el-button>
        <el-table :data="multiTotalTableData" border style="margin-bottom:3%"
                  :header-cell-style="{ background: '#69727a', color: '#fff', 'text-align': 'center' }"
                  highlight-current-row>
          <el-table-column prop="code" label="经费编号"/>
          <el-table-column prop="fund_name" label="经费名称"/>
          <el-table-column prop="due_date" label="授权有效期"/>
          <el-table-column prop="total_sum" label="经费总额"/>
          <el-table-column prop="used_sum" label="已使用经费"/>
          <el-table-column prop="left_sum" label="经费余额"/>
          <el-table-column prop="days_left" label="剩余时间天数"/>
          <el-table-column prop="current_execution_rate" label="当前执行率"/>
          <el-table-column prop="qualified" label="当前是否达标"/>

          <el-table-column prop="qualified_rate" label="标准执行率">
            <template #default="scope">
              <template v-if="editRow && editRow.code === scope.row.code">
                <el-input v-model="editRow.qualified_rate"/>
              </template>
              <template v-else>
                <span>{{ scope.row.qualified_rate }}</span>
              </template>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="operation" label="操作" width="200px">
            <template #default="scope">
              <template v-if="editRow && editRow.code === scope.row.code">
                <el-button type="primary" round @click="handleConfirmEdit(scope.row)">确认</el-button>
                <el-button type="danger" round @click="handleCancleEdit()">取消</el-button>
              </template>
              <template v-else>
                <el-button type="success" round @click="handleEdit(scope.row)">修改执行率</el-button>
              </template>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>

    <div class="multi-detail-table" v-if="showTable === 'multiDetailTable'">
      <!--      每个老师每个经费的具体使用的用处  XX经费授权明细-->
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
      <!--      <div ref="multiDetailChartDom" id="multiDetailChart" style="width: 70%; height: 500px"></div>-->

      <el-collapse v-model="activeData">
        <el-collapse-item v-for="(value, key, index) in tableAggregatedData" :title="key" :name="index"
                          class="collapse">
          <h4>{{ value[0].code }} - {{ value[0].fund_name }} - {{ value[0].group_name }}</h4>
          <h5>可使用经费总额：{{ value[0].total_sum }}</h5>
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
      <div ref="teacherDetailChartDom" id="teacherDetailChart" style="width: 70%; height: 500px;margin:auto"></div>
      <el-table :data="teacherDetailTableData" border style="width:80%;margin:auto"
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
import * as echarts from "echarts";

export default {
  name: "FundingManagement",
  data() {
    return {
      showTable: 'multiTotalTable',
      multiTotalTableData: [],
      multiDetailTableData: [],
      teacherDetailTableData: [],
      activeData: '',
      tableAggregatedData: {},
      aggregatedData: {},
      fundNames: new Set(),
      excelName: '',
      excelFields: '',
      excelData: [],
      nowData: [],
      editRow: "",
    }
  },
  methods: {
    handleRefresh() {
      const _this = this
      this.$api.adminAPI.updateTotalMoneyByExecutionRate().then(resp => {
        _this.$api.adminAPI.calculateFundingSum().then(resp => {
          console.log(resp)
          _this.multiTotalTableData = resp.data.data.funding_info;
          _this.visualizeMultiTotalTable();
          _this.nowData = _this.multiTotalTableData;
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
    },
    handleCancleEdit() {
      this.editRow = "";
    },
    handleConfirmEdit(row) {
      const _this = this
      this.$api.adminAPI.updateExecutionRate(row.code, row.qualified_rate).then(resp => {
        _this.threeTableAPI()
      }).catch(err => {
        console.log(err);
      });
      this.editRow = "";
    },
    handleEdit(row) {
      this.editRow = row;
    },
    threeTableAPI() {
      let _this = this
      if (this.showTable === 'multiTotalTable') {
        this.$api.adminAPI.calculateFundingSum().then(resp => {
          _this.multiTotalTableData = resp.data.data.funding_info;
          for (const ele of _this.multiTotalTableData) {
            ele.days_left = Math.ceil((new Date(ele.due_date) - new Date()) / (1000 * 60 * 60 * 24));
            console.log(ele.days_left)
          }
          _this.visualizeMultiTotalTable();
          _this.nowData = _this.multiTotalTableData;
        }).catch(err => {
          console.log(err);
        });
      } else if (this.showTable === 'multiDetailTable') {
        this.$api.adminAPI.multiDetailTable().then(resp => {
          _this.multiDetailTableData = resp.data.data.funding_info;
          _this.aggregateTableData();
          _this.nowData = _this.multiDetailTableData;
        }).catch(err => {
          console.log(err);
        });
      } else {
        this.$api.adminAPI.calculateExpenditureSummary().then(resp => {
          _this.teacherDetailTableData = resp.data.data.funding_info;
          _this.aggregateData(_this.teacherDetailTableData);
          _this.visualizeTeacherDetailTable();
          _this.nowData = _this.teacherDetailTableData;
        }).catch(err => {
          console.log(err);
        });
      }
    },

    aggregateTableData() {
      for (const data of this.multiDetailTableData) {
        let key = data.group_name + " - " + data.fund_name
        if (this.tableAggregatedData.hasOwnProperty(key)) {
          this.tableAggregatedData[key].push(data)
        } else {
          this.tableAggregatedData[key] = [data]
        }
      }
    },

    aggregateData(tableData) {
      for (const data of tableData) {
        let group_key = data.group_name;
        let fund_key = data.fund_name;
        this.fundNames.add(fund_key);
        if (this.aggregatedData.hasOwnProperty(group_key)) {
          if (this.aggregatedData[group_key].hasOwnProperty(fund_key)) {
            this.aggregatedData[group_key][fund_key].push(data);
          } else {
            this.aggregatedData[group_key][fund_key] = [data];
          }
        } else {
          this.aggregatedData[group_key] = [];
          this.aggregatedData[group_key][fund_key] = [data];
        }
      }
      console.log("Aggregated Data:", this.aggregatedData);
    },

    getMultiTotalTableSeries() {
      let series = [];
      let usedData = [];
      let leftData = [];

      for (const data of this.multiTotalTableData) {
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

    visualizeMultiTotalTable() {
      let _this = this;
      const multiTotalChartDom = document.getElementById("multiTotalChart");
      const chart = echarts.init(multiTotalChartDom);
      const series = _this.getMultiTotalTableSeries();
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

    getTeacherDetailTableSeries() {
      let series = [];
      for (const fundName of this.fundNames) {
        let usedData = [];
        let leftData = [];
        for (const key of Object.keys(this.aggregatedData)) {
          let data = this.aggregatedData[key];
          if (data.hasOwnProperty(fundName)) {
            usedData.push(data[fundName][0].used);
            leftData.push(data[fundName][0].usable_left);
          } else {
            usedData.push(0);
            leftData.push(0);
          }
        }
        series.push(
            {
              name: fundName + ' - Used',
              type: 'bar',
              stack: fundName,
              emphasis: {
                focus: 'series'
              },
              data: usedData
            },
            {
              name: fundName + ' - Left',
              type: 'bar',
              stack: fundName,
              emphasis: {
                focus: 'series'
              },
              data: leftData
            }
        )
      }
      console.log(series);
      return series;
    },

    visualizeTeacherDetailTable() {
      let _this = this;
      const teacherDetailChartDom = document.getElementById("teacherDetailChart");
      const chart = echarts.init(teacherDetailChartDom);
      const series = _this.getTeacherDetailTableSeries();
      console.log(series)
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
            data: Object.keys(_this.aggregatedData)
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: series
      });
    },

    exportData() {
      this.excelData = [];
      if (this.showTable === "multiTotalTable") {
        this.excelName = "多项经费使用一览表.xls";
        this.excelFields = {
          "经费编号": "code",
          "经费名称": "fund_name",
          "经费授权有效期": "due_date",
          "经费总额": "total_sum",
          "已使用经费": "used_sum",
          "经费余额": "left_sum",
          "剩余时间天数": "days_left",
          "当前执行率": "current_execution_rate",
          "执行率是否达标": "qualified",
        };
        for (const data of this.nowData) {
          this.excelData.push({
            code: data.code,
            fund_name: data.fund_name,
            due_date: data.due_date,
            total_sum: data.total_sum,
            used_sum: data.used_sum,
            left_sum: data.left_sum,
            days_left: data.days_left,
            current_execution_rate: data.current_execution_rate,
            qualified: data.qualified,
          })
        }
      } else if (this.showTable === "multiDetailTable") {
        this.excelName = "经费授权明细一览表.xls";
        this.excelFields = {
          "经费编号": "code",
          "经费名称": "fund_name",
          "课题组": "group_name",
          "可使用经费总额": "total_sum",
          "支出类别（一级）": "first_category",
          "支出类别（二级）": "second_category",
          "可使用额度": "used_sum",
        };
        for (const data of this.nowData) {
          this.excelData.push({
            code: data.code,
            fund_name: data.fund_name,
            group_name: data.group_name,
            total_sum: data.total_sum,
            first_category: data.first_category,
            second_category: data.second_category,
            used_sum: data.used_sum,
          })
        }
      } else if (this.showTable === "teacherDetailTable") {
        this.excelName = "经费使用汇总表.xls";
        this.excelFields = {
          "经费编号": "code",
          "经费名称": "fund_name",
          "课题组": "group_name",
          "可使用经费总额": "total",
          "已使用经费": "used",
          "经费余额": "usable_left",
          "当前执行率": "current_execution_rate",
          "执行率是否达标": "qualified"
        };
        for (const data of this.nowData) {
          this.excelData.push({
            code: data.code,
            fund_name: data.fund_name,
            group_name: data.group_name,
            total: data.total,
            used: data.used,
            usable_left: data.usable_left,
            current_execution_rate: data.current_execution_rate,
            qualified: data.qualified
          })
        }
      }

      console.log(this.excelData)
    },
  },

  mounted() {
    this.threeTableAPI()
  }
}
</script>

<style scoped>
.table {
  margin: auto;
  width: 80%;
}

.multi-detail-table {
  width: 80%;
  margin: 3% auto;
}
</style>