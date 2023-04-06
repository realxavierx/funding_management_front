<template xmlns="http://www.w3.org/1999/html">
  <div class="query">
    <el-form :model="queryForm" ref="queryForm" :inline="true">
      <el-form-item prop="groupName">
        <el-input prefix-icon="el-icon-search" placeholder="课题组名称" v-model="queryForm.groupName" clearable>
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="conditionQuery">查询</el-button>
    </el-form>
  </div>

  <div class="applicationTable">
    <el-table :data="applicationData" border style="width: 100%"
              :header-cell-style="{ background: '#69727a', color: '#fff', 'text-align': 'center' }"
              highlight-current-row>
      <el-table-column align="center" fixed prop="id" label="序号"></el-table-column>
      <el-table-column align="center" prop="group_name" label="课题组名称"></el-table-column>
      <el-table-column align="center" prop="applicant_name" label="经办人"></el-table-column>
      <el-table-column align="center" prop="fund_name" label="经费编号与经费名称"></el-table-column>
      <el-table-column align="center" prop="expense" label="支出金额"></el-table-column>
      <el-table-column align="center" prop="expense_category" label="支出类别"></el-table-column>
      <el-table-column prop="summary" label="内容摘要"></el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column align="center" prop="operation" label="操作" width="200px">
        <template #default="scope">
          <el-button type="success" round @click="handlePass(scope.$index, scope.row)">同意</el-button>
          <el-button type="danger" round @click="handleRefusal(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-size="pageSize" background @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" v-model:current-page="currentPage" :page-sizes="[5,10,15,20]"
                   layout="prev, pager, next, sizes, total, jumper" :total="totalCount"/>

  </div>
  <div class="refuse">
    <el-dialog v-model="dialogVisibleRefuse" width="35%" close-on-press-escape>
      <span>确认拒绝 {{ groupName }} 的申请？</span>
      <div style="text-align:right">
        <el-button type="primary" v-on:click="confirmRefusal()">确定</el-button>
        <el-button @click="unRefuse()">退出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getApplications} from "@/apis/adminAPI";

export default {
  name: "ApplicationManagement",
  data() {
    return {
      pageSize: 5,//每页显示的行数,默认为2
      currentPage: 1,
      totalCount: 0,//数据一共多少
      queryForm: {
        groupName: "",
      },
      dialogVisibleRefuse: false,
      groupName: "",
      applicationData: [],
    }
  },
  methods: {
    getTotalCount() {
      let _this = this
      this.$api.adminAPI.getTotalCount()
          .then((resp) => {
            console.log("totalCount", resp)
            _this.totalCount = resp.data.data.totalCount
            _this.getApplications()
          })
    },

    getApplications() {
      let _this = this

      _this.applicationData = []
      let offset = (this.currentPage - 1) * this.pageSize
      console.log(this.totalCount)
      let limit = Math.min(this.totalCount - offset, this.pageSize)
      this.$api.adminAPI.getApplications(limit, offset)
          .then((resp) => {
            for (const elem of resp.data.data.applications) {
              console.log(elem)
              let data = elem.application
              data['applicant_id'] = elem.applicant.sid
              data['applicant_name'] = elem.applicant.name
              data['applicant_role'] = elem.applicant.role
              _this.applicationData.push(data)
            }
          })
    },

    handleRefusal(row) {
      this.dialogVisibleRefuse = true
      this.groupName = row.group
    },

    unRefuse() {
      this.dialogVisibleRefuse = false;//对话框不显示
    },

    confirmRefusal() {

    },

    handlePass() {

    },

    //用于表格分页的方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.handleCurrentChange();//默认更改每页多少条后重新加载第一页
    },

    handleCurrentChange() {
      console.log("current page", this.currentPage)
      this.getApplications()
    },

  },

  mounted() {
    this.getTotalCount()
  },
}
</script>

<style scoped>
.query {
  text-align: right;
  margin: 10px 25px;
}
</style>