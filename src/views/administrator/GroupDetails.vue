<template>
  <h3>{{ group_name }}</h3>
  <div class="multi-detail-table">
    <!--      每个老师每个经费的具体使用的用处  XX经费授权明细-->
    <el-collapse style="width: 80%;margin:auto">
      <el-collapse-item v-for="(value, key, index) in tableAggregatedData" :title="key" :name="index">
        <h4>{{ value[0].code }} - {{ value[0].fund_name }}</h4>
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
</template>

<script>
export default {
  name: "GroupDetails",
  data() {
    return {
      group_name: this.$route.query.group_name,
      multiDetailTableData: [],
      tableAggregatedData: {},
    }
  },
  methods: {
    aggregateTableData() {
      for (const data of this.multiDetailTableData) {
        let key = data.fund_name
        if (this.tableAggregatedData.hasOwnProperty(key)) {
          this.tableAggregatedData[key].push(data)
        } else {
          this.tableAggregatedData[key] = [data]
        }
      }
    },
  },
  mounted() {
    let _this = this
    this.$api.adminAPI.oneGroupMultiDetailTable(this.group_name).then(resp => {
      console.log(resp)
      _this.multiDetailTableData = resp.data.data.funding_info;
      _this.aggregateTableData();
    }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
</style>