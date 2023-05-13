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
               style="margin-top: 1%;margin-left:2.5%;margin-right:2.5%;width: 95%"
               :body-style="{ display: 'flex', flexWrap: 'wrap',textAlign: 'left' }">
        <div style="flex-basis: 10%">
          <div class="title">课题组</div>
          <span> {{ info.group_name }}</span>
        </div>

        <div style="flex-basis: 35%">
          <div class="title" style="text-align: center">经费总览</div>
          <div ref="chartDom" :id="'chart_' + index" style="height: 300px"></div>
        </div>

        <div style="flex-basis: 50%">
          <div class="container">
            <div class="title" style="text-align: center;flex:1">经费使用情况</div>
            <el-button type="success" round @click="viewDetails(info.group_name)" class="button">
              查看详情
            </el-button>
          </div>
          <div class="applicationTable">
            <el-table :data="info.fundings" border style="width:100%"
                      :header-cell-style="{ background: '#69727a', color: '#fff', 'text-align': 'center' }"
                      highlight-current-row>
              <el-table-column align="center" fixed prop="fund_name" label="经费"></el-table-column>
              <el-table-column align="center" prop="value" label="总额"></el-table-column>
              <el-table-column align="center" prop="used" label="已使用"></el-table-column>
              <el-table-column align="center" prop="rest" label="余额"></el-table-column>
              <el-table-column align="center" prop="execute_rate" label="执行率"></el-table-column>

              <el-table-column align="center" prop="qualify" label="是否达标"></el-table-column>
            </el-table>
          </div>
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
          group_name: "唐博",
          fundings: [
            {
              name: "国自然",
              value: 100,
              used: 50,
              rest: 50,
              execute_rate: "50%",
              qualify: "是"
            },
            {
              name: "中央财政支持地方高校经费",
              value: 200,
              used: 100,
              rest: 50,
              execute_rate: "50%",
              qualify: "是"
            },
            {
              name: "高水平",
              value: 300,
              used: 150,
              rest: 50,
              execute_rate: "50%",
              qualify: "是"
            }],
        },
      ],
    }
  },
  methods: {
    conditionQuery() {
      let _this = this
      if (this.queryForm.groupName !== "") {
        this.$api.adminAPI.queryFundingInfo(this.queryForm.groupName).then(resp => {
          console.log(resp)
          _this.information = resp.data.data.funding_info
          if (_this.information.length === 0) {
            _this.$message({
              message: "未查询到相关信息",
              type: "error"
            })
          } else {
            _this.information.forEach((info, index) => {
              const chartDom = document.getElementById(`chart_${index}`);
              const chart = echarts.init(chartDom);
              chart.setOption({
                title: {
                  left: 'center', // 标题左侧距离为图表区域的中心
                  top: 0, // 标题顶部距离为图表区域高度的一半
                },
                tooltip: {},
                series: [{
                  type: 'pie',
                  data: info.fundings,
                }],
              });
            });
          }
        }).catch(err => {
          console.log(err);
        });
      } else {
        window.location.reload()
      }
    },
    viewDetails(name) {
      console.log(name)
      this.$router.push({
        name: "groupDetails",
        query: {
          group_name: name
        }
      });
    },
    dealData(data) {
      let result = []
      data.forEach(item => {
        result.push({
          name: item.fund_name,
          value: item.value,
          used: item.used,
          rest: item.rest,
          execute_rate: item.execute_rate,
          qualify: item.qualify
        })
      })
      return result
    }
  },
  mounted() {
    let _this = this
    this.information = []
    this.$api.adminAPI.getAllFundingInfo().then(resp => {
      console.log(resp)
      _this.information = resp.data.data.funding_info
      let fund_data = _this.dealData(_this.information[0].fundings)
      _this.$nextTick(() => {
        _this.information.forEach((info, index) => {
          const chartDom = document.getElementById(`chart_${index}`);
          const chart = echarts.init(chartDom);
          chart.setOption({
            title: {
              left: 'center', // 标题左侧距离为图表区域的中心
              top: 0, // 标题顶部距离为图表区域高度的一半
            },
            tooltip: {},
            series: [{
              type: 'pie',
              data: fund_data,
            }],
          });
        });
      });
    }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
.query {
  text-align: right;
  margin: 10px 25px;
}

.title {
  font-size: 20px;
  line-height: 1.5;
  font-weight: bold;
  text-align: left;
  margin-bottom: 2%;
}

.button {
  display: inline-block;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>