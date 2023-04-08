<template>
  <div class="applicationCheck">
    <div style="display: flex;  margin: 10px 25px;justify-content: space-between;">
      <div class="select" style="float: left">
        <el-select v-model="selectedGroup" placeholder="选择查看的课题组" size="large">
          <el-option
              v-for="item in groupName"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
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
        <el-table-column align="center" prop="applicant_name" label="经办人"></el-table-column>
        <el-table-column align="center" prop="fund_name" label="经费编号与经费名称"></el-table-column>
        <el-table-column align="center" prop="expense" label="支出金额"></el-table-column>
        <el-table-column align="center" prop="expense_category" label="支出类别"></el-table-column>
        <el-table-column prop="abstracts" label="内容摘要"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>

        <el-table-column v-if="buttonShow" align="center" prop="operation" label="操作" width="200px">
          <template #default="scope">
            <el-button type="success" round @click="handleModify(scope.row)">修改申请</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination :page-size="pageSize" background @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" v-model:current-page="currentPage" :page-sizes="[5,10,15,20]"
                     layout="prev, pager, next, sizes, total, jumper" :total="totalCount"/>
    </div>
    <div class="modify">
      <el-dialog v-model="dialogVisible" width="35%" close-on-press-escape>
        <div class="title">
          请修改申请内容
        </div>
        <span>您选择经费的课题组</span>
        <el-tag type="primary" size="large">总额度为 {{ totalMoney }} 万元</el-tag>
        <el-tag type="success" size="large">已使用额度为 {{ usedMoney }} 万元</el-tag>
        <el-tag type="warning" size="large">可用额度为 {{ restMoney }} 万元</el-tag>

        <el-form :model="applicationForm" style="width: 100%">
          <el-form-item label="经费编号与经费名称" label-width="150px">
            <el-select v-model="applicationForm.fundNameAndId" placeholder="请选择经费编号及名称" size="large"
                       style="width: 100%" clearable>
              <el-option
                  v-for="item in funds"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="支出金额" label-width="150px">
            <el-input v-model="applicationForm.money" placeholder="支出金额不能大于可使用额度" clearable>
            </el-input>
          </el-form-item>

          <el-form-item label="支出类别" label-width="150px">
            <el-cascader v-model="applicationForm.category" :options="categories"
                         :props="{ expandTrigger: 'hover' }"
                         style="width: 100%" placeholder="请选择支出类别" clearable
            />
          </el-form-item>

          <el-form-item label="内容摘要" label-width="150px">
            <el-input v-model="applicationForm.abstract" prefix-icon="el-icon-search" placeholder="请输入内容摘要"
                      type="textarea" :rows="2">
            </el-input>
          </el-form-item>

          <el-form-item label="备注" label-width="150px">
            <el-input v-model="applicationForm.remarks" prefix-icon="el-icon-search" placeholder="请输入备注"
                      type="textarea" :rows="2">
            </el-input>
          </el-form-item>
        </el-form>
        <div style="text-align:right;margin-top: 5%">
          <el-button type="primary" v-on:click="confirmModify()">确定</el-button>
          <el-button @click="unModify()">退出</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApplicationCheck",
  data() {
    return {
      pageSize: 5,//每页显示的行数,默认为2
      currentPage: 1,
      totalCount: 0,//数据一共多少
      dialogVisible: false,
      groupName: this.$store.getters.getUser.groupName,
      selectedGroup: this.$store.getters.getUser.groupName[0],
      applicationData: [],
      currentRow: 0,
      showData: "total",
      buttonShow: false,
      totalMoney: 0,
      usedMoney: 0,
      restMoney: 0,
      userName: this.$store.getters.getUser.name,
      userId: this.$store.getters.getUser.id,
      applicationForm: {
        fundNameAndId: "",
        group: "",
        money: "",
        category: "",
        abstract: "",
        remarks: ""
      },
      funds: [
        '国自然（Y012300XX）',
        '中央财政支持地方高校经费（Y120XX）',
        '高水平（G000XX）',
      ],
      categories: [],
    }
  },
  methods: {
    getMoneyInfo() {
      const fundName = this.applicationForm.fundNameAndId.split("（")
      const _this = this
      this.$api.userAPI.getFundingInfoByGroupAndFundingName(fundName[0], this.selectedGroup).then(resp => {
        _this.totalMoney = resp.data.data.funding_info.total
        _this.usedMoney = resp.data.data.funding_info.used
        _this.restMoney = resp.data.data.funding_info.rest
      }).catch(err => {
        console.log(err);
      });
    },
    getTotalCount() {
      this.applicationData = []
      let _this = this
      this.$api.userAPI.getApplicationCountByGroup(this.selectedGroup, this.showData).then((resp) => {
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
      this.$api.userAPI.getApplicationsByGroup(this.selectedGroup, limit, offset, this.showData).then((resp) => {
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
    unModify() {
      this.dialogVisible = false;//对话框不显示
    },
    handleModify(row) {
      this.dialogVisible = true
      let _this = this
      _this.categories = []
      this.$api.userAPI.getAllExpenseCategories().then(resp => {
        for (const elem of resp.data.data.expense_categories) {
          let selected = _this.categories.findIndex((e) => e.value === elem.first)
          if (selected !== -1) {
            _this.categories[selected].children.push({
              value: elem.second,
              label: elem.second
            })
          } else {
            _this.categories.push({
              value: elem.first,
              label: elem.first,
              children: []
            })
            _this.categories[_this.categories.length - 1].children.push({
              value: elem.second,
              label: elem.second
            })
          }
        }
      }).catch(err => {
        console.log(err);
      });
      let fundName = ""
      for (const item of this.funds) {
        if (item.includes(row.fund_name)) {
          fundName = item
          break
        }
      }
      let category = row.expense_category.split(" - ")
      this.applicationForm = {
        id: row.id,
        fundNameAndId: fundName,
        group: row.groupName,
        money: row.expense,
        category: category,
        abstract: row.abstracts,
        remarks: row.remarks
      }
    },
    confirmModify() {
      const fundName = this.applicationForm.fundNameAndId.split("（")
      const _this = this
      // console.log(this.applicationForm.id)
      // console.log(fundName[0])
      // console.log(this.userId)
      // console.log(this.selectedGroup)
      // console.log(this.applicationForm.money)
      // console.log(this.applicationForm.category[0])
      // console.log(this.applicationForm.category[1])
      // console.log(this.applicationForm.abstract)
      // console.log(this.applicationForm.remarks)
      this.$api.userAPI.applyFunding(parseInt(this.applicationForm.id), fundName[0],
          this.userId, this.selectedGroup,
          Number(this.applicationForm.money), this.applicationForm.category[0],
          this.applicationForm.category[1], this.applicationForm.abstract,
          this.applicationForm.remarks).then(resp => {
        _this.dialogVisible = false
        _this.$message({
          showClose: true,
          message: '您已成功提交',
          type: 'success'
        });
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
    selectedGroup(newValue, oldValue) {
      this.pageSize = 5;
      this.currentPage = 1;
      this.showData = "total"
      this.getTotalCount()
    },
    showData(newValue, oldValue) {
      this.buttonShow = newValue === "refuse";
      this.pageSize = 5;
      this.currentPage = 1;
      this.getTotalCount()
    },
    'applicationForm.fundNameAndId'(newValue, oldValue) {
      this.getMoneyInfo()
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