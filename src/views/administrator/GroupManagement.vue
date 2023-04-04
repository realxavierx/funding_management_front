<template>
  <div>
    <div class="query">
      <el-form :model="queryForm" ref="queryForm" :inline="true">
        <el-form-item prop="groupName">
          <el-input prefix-icon="el-icon-search" placeholder="课题组名称" v-model="queryForm.groupName" clearable>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="conditionQuery">查询</el-button>
      </el-form>
    </div>

    <div class="card">
      <el-card v-for="(info, index) in information" :key="index"
               style="margin-top: 1%;margin-left:10%;margin-right:10%;width: 80%"
               :body-style="{ display: 'flex', flexWrap: 'wrap',textAlign: 'left' }">
        <div style="flex-basis: 10%">
          <h3>课题组 {{ info.title }}</h3>
          <span>负责人{{ info.professor }}</span>
        </div>

        <div style="flex-basis: 30%">
          <div ref="chartDom" :id="'chart_' + index" style="height: 200px;"></div>
        </div>

        <div style="flex-basis: 25%">
        </div>
        <div style="flex-basis: 25%">
        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "GroupManagement",
  data() {
    return {
      queryForm: {
        groupName: "",
      },
      information: [
        {
          title: "A",
          professor: "123",
          chartData: [
            {name: 'A', value: 100},
            {name: 'B', value: 200},
            {name: 'C', value: 300},
          ],
        },
        {
          title: "B",
          professor: "456",
          chartData: [
            {name: 'A', value: 100},
            {name: 'B', value: 400},
            {name: 'C', value: 500},
          ],
        },
        {
          title: "C",
          professor: "789",
          chartData: [
            {name: 'A', value: 100},
            {name: 'B', value: 200},
            {name: 'C', value: 300},
          ],
        },
      ],

    }
  },
  methods: {
    conditionQuery() {
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.information.forEach((info, index) => {
        const chartDom = document.getElementById(`chart_${index}`);
        const chart = echarts.init(chartDom);
        chart.setOption({
          title: {
            text: '经费总览',
            left: 'center', // 标题左侧距离为图表区域的中心
            top: 0, // 标题顶部距离为图表区域高度的一半
            // text: '经费总览',
            // x: 'center',
            // y: 'top',
            // textAlign: 'center',
            // textBaseline: 'top',
          },
          tooltip: {},
          series: [{
            type: 'pie',
            data: info.chartData,
          }],
        });
      });
    });
  },
}
</script>

<style scoped>
.query {
  text-align: right;
  margin: 10px 25px;
}

</style>