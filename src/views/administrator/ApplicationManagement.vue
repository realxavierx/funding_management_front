<template>
  <div class="applicationManagement">
    <div style="display: flex;  margin: 10px 25px;justify-content: space-between;">
      <div class="select" style="float: left">
        <el-radio-group v-model="showData">
          <el-radio-button label="total">全部</el-radio-button>
          <el-radio-button label="pending">待处理</el-radio-button>
          <el-radio-button label="pass">通过</el-radio-button>
          <el-radio-button label="refuse">拒绝</el-radio-button>
        </el-radio-group>
      </div>

      <!--      <div class="query" style="float: right;clear: both;">-->
      <!--        <el-form :model="queryForm" ref="queryForm" :inline="true">-->
      <!--          <el-form-item prop="groupName">-->
      <!--            <el-input prefix-icon="el-icon-search" placeholder="课题组名称" v-model="queryForm.groupName" clearable>-->
      <!--            </el-input>-->
      <!--          </el-form-item>-->
      <!--          <el-button type="primary" @click="conditionQuery">查询</el-button>-->
      <!--        </el-form>-->
      <!--      </div>-->
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
        <el-table-column prop="abstracts" label="内容摘要"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>

        <el-table-column v-if="buttonShow" align="center" prop="operation" label="操作" width="200px">
          <template #default="scope">
            <el-button type="success" round @click="handlePass(scope.$index)">同意</el-button>
            <el-button type="danger" round @click="handleRefusal(scope.$index,scope.row)">拒绝</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination :page-size="pageSize" background @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" v-model:current-page="currentPage" :page-sizes="[5,10,15,20]"
                     layout="prev, pager, next, sizes, total, jumper" :total="totalCount"/>
    </div>
    <div class="refuse">
      <el-dialog v-model="dialogVisibleRefuse" width="35%" close-on-press-escape>
        <div class="title">
          请填写拒绝原因
        </div>
        <span>确认拒绝 {{ groupName }} 的申请？</span>
        <el-input v-model="refuseComment" prefix-icon="el-icon-search"
                  type="textarea" :rows="2" style="margin-top: 3%">
        </el-input>
        <div style="text-align:right;margin-top: 5%">
          <el-button type="primary" v-on:click="confirmRefusal()">确定</el-button>
          <el-button @click="unRefuse()">退出</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
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
      refuseResult: "refuse",
      passResult: "pass",
      passComment: "通过",
      refuseComment: "",
      currentRow: 0,
      showData: "total",
      buttonShow: false,
    }
  },
  methods: {
    getTotalCount() {
      this.applicationData = []
      let _this = this
      this.$api.adminAPI.getTotalCount(this.showData)
          .then((resp) => {
            _this.totalCount = resp.data.data.totalCount
            if (_this.totalCount !== 0) {
              _this.getApplications()
            }
          })
    },

    getApplications() {
      const _this = this
      _this.applicationData = []
      let offset = (this.currentPage - 1) * this.pageSize
      let limit = Math.min(this.totalCount - offset, this.pageSize)
      this.$api.adminAPI.getApplications(limit, offset, this.showData).then((resp) => {
        console.log(resp)
        for (const elem of resp.data.data.applications) {
          let data = elem.application
          data['applicant_id'] = elem.applicant.sid
          data['applicant_name'] = elem.applicant.name
          data['applicant_role'] = elem.applicant.role
          data['expense_category'] = elem.expenseCategory.first + " - " + elem.expenseCategory.second
          _this.applicationData.push(data)
        }
      }).catch(err => {
        console.log(err);
      });
    },

    handleRefusal(row_index, row) {
      this.dialogVisibleRefuse = true
      this.groupName = row.group_name
      this.currentRow = row_index
    },

    unRefuse() {
      this.dialogVisibleRefuse = false;//对话框不显示
    },

    confirmRefusal() {
      const _this = this
      this.$api.adminAPI.approvalApplication(parseInt(this.applicationData[this.currentRow].id), this.refuseResult, this.refuseComment).then((resp) => {
        // console.log(resp)
        _this.getApplications()
      }).catch(err => {
        console.log(err);
      });
      this.dialogVisibleRefuse = false;//对话框不显示
    },

    handlePass(row_index) {
      const _this = this
      this.$api.adminAPI.approvalApplication(parseInt(this.applicationData[row_index].id), this.passResult, this.passComment).then((resp) => {
        _this.getApplications()
      }).catch(err => {
        console.log(err);
      });
    },

    //用于表格分页的方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.handleCurrentChange();//默认更改每页多少条后重新加载第一页
    },

    handleCurrentChange() {
      this.getApplications()
    },
  },

  mounted() {
    this.getTotalCount()
  },
  watch: {
    showData(newValue, oldValue) {
      this.buttonShow = newValue === "pending";
      this.pageSize = 5;
      this.currentPage = 1;
      // this.getApplications()
      this.getTotalCount()
    },
  }
}
</script>

<style scoped>
.title {
  font-size: 20px;
  line-height: 1.5;
  font-weight: bold;
  text-align: left;
  margin-bottom: 2%;
}
</style>