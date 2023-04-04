<template>
  <div>
    <div class="orderQuery">
      <el-form :model="queryForm" ref="queryForm" :inline="true">
        <el-form-item prop="groupName">
          <el-input prefix-icon="el-icon-search" placeholder="课题组名称" v-model="queryForm.groupName" clearable>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="conditionQuery">查询</el-button>
      </el-form>

      <div v-for="(x, index) in information" :key="index">
        <el-card :title="information.title" style="margin-top: 1%"
                 :body-style="{ display: 'flex', flexWrap: 'wrap',textAlign: 'left' }">
          <!--          flex把内容分为4列显示-->
          <div style="flex-basis: 10%">
            <h3>课题组 {{ x.title }}</h3>
            <span>负责人{{ x.professor }}</span>
          </div>
          <div style="flex-basis: 25%">

          </div>
          <div style="flex-basis: 25%">

          </div>
          <div style="flex-basis: 25%">
          </div>


        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
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
        },
        {
          title: "B",
          professor: "456",
        },
        {
          title: "C",
          professor: "789",
        },
      ],
    }
  },
  methods: {
    conditionQuery() {
    },
  }
}
</script>

<style scoped>
.orderQuery {
  text-align: right;
  margin: 10px 25px;
}


</style>