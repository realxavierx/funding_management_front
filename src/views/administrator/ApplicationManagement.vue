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
    <el-table :data="tableData" border style="width: 100%"
              :header-cell-style="{ background: '#69727a', color: '#fff', 'text-align': 'center' }"
              highlight-current-row>
      <el-table-column align="center" fixed prop="group" label="课题组名称"></el-table-column>
      <el-table-column align="center" prop="identity" label="经办人"></el-table-column>
      <el-table-column align="center" prop="fundName" label="经费编号与经费名称"></el-table-column>
      <el-table-column align="center" prop="money" label="支出金额"></el-table-column>
      <el-table-column align="center" prop="category" label="支出类别"></el-table-column>
      <el-table-column prop="abstract" label="内容摘要"></el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column align="center" prop="operation" label="操作" width="200px">
        <template #default="scope">
          <el-button type="success" round @click="handlePass(scope.$index, scope.row)">同意</el-button>
          <el-button type="danger" round @click="handleRefusal(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:page-size="pageSize" background @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[2, 4, 6, 8]"
                   layout="prev, pager, next, sizes, total, jumper" :total="total"/>
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
export default {
  name: "ApplicationManagement",
  data() {
    return {
      pageSize: 5,//每页显示的行数,默认为2
      currentPage: 1,
      total: 10,//数据一共多少
      queryForm: {
        groupName: "",
      },
      dialogVisibleRefuse: false,
      groupName: "",
      tableData: [
        {
          group: "A",
          identity: "秘书",
          fundName: "国自然",
          money: "200",
          category: "其他资本性支出/图书",
          abstract: "",
          remarks: "",
        }
      ],
    }
  },
  methods: {
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
    },

    handleCurrentChange() {
      this.currentPage = 2
    },
  }
}
</script>

<style scoped>
.query {
  text-align: right;
  margin: 10px 25px;
}
</style>