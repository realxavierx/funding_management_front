<template>
  <h3>课题组细节</h3>
  <span>{{ group_name }}</span>
  <div class="multi-detail-table">
    <!--      每个老师每个经费的具体使用的用处  XX经费授权明细-->
    <el-collapse v-model="activeData" style="width: 80%;margin:3% auto">
      <el-collapse-item v-for="(value, key, index) in aggregatedData" :title="key" :name="index">
        <h4>{{ value[0].code }} - {{ value[0].name }} - {{ value[0].groups }}</h4>
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
      aggregatedData: {},
    }
  },
  methods: {
    aggregateGroupInfo() {
      for (const data of this.multiDetailTableData) {
        let key = data.groups + "-" + data.name
        if (this.aggregatedData.hasOwnProperty(key)) {
          this.aggregatedData[key].push(data)
        } else {
          this.aggregatedData[key] = []
          this.aggregatedData[key].push(data)
        }
      }
    }
  },
  mounted() {
    let _this = this
    this.$api.adminAPI.multiDetailTable().then(resp => {
      // console.log(resp)
      _this.multiDetailTableData = resp.data.data.funding_info;
      _this.aggregateGroupInfo()
    }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
</style>