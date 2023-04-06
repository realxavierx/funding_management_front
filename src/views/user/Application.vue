<template>
  <div class="application">
    <div class="title">
      报销申请表
    </div>

    <div class="roomForm">
      <el-form :model="applicationForm" style="width: 100%">
        <el-form-item label="经费编号与经费名称" label-width="150px">
          <el-select v-model="applicationForm.fundNameAndId" placeholder="请选择经费编号及名称" size="large"
                     style="width: 100%" clearable>
            <el-option
                v-for="item in funds"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="课题组" label-width="150px">
          <el-select v-model="applicationForm.group" placeholder="请选择您所在的课题组" size="large"
                     style="width: 100%" clearable>
            <el-option
                v-for="item in groups"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="经办人" label-width="150px">
          <!--与账号关联-->
          <el-input v-model="applicationForm.identity" disabled/>
        </el-form-item>


        <el-form-item label="您选择经费的课题组" label-width="150px">
          <el-tag type="primary" size="large">总额度为 {{ totalMoney }} 万元</el-tag>
          <el-tag type="success" size="large">已使用额度为 {{ usedMoney }} 万元</el-tag>
          <el-tag type="warning" size="large">可用额度为 {{ restMoney }} 万元</el-tag>
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
          <el-input v-model="applicationForm.abstract" prefix-icon="el-icon-search" placeholder="请请入内容摘要"
                    type="textarea" :rows="2">
          </el-input>
        </el-form-item>


        <el-form-item label="备注" label-width="150px">
          <el-input v-model="applicationForm.remarks" prefix-icon="el-icon-search" placeholder="请请入备注"
                    type="textarea" :rows="2">
          </el-input>
        </el-form-item>

        <div class="btns">
          <el-button type="info" size="large" round @click="handleClear()">清空</el-button>
          <el-button type="success" size="large" round @click="handleSubmit()">提交</el-button>
        </div>
      </el-form>
    </div>
    <div class="submit">
      <el-dialog v-model="dialogVisibleSubmit" width="35%" close-on-press-escape>
        <span>确认提交报销申请吗</span>
        <div style="text-align:right">
          <el-button type="primary" v-on:click="confirmSubmit()">确定</el-button>
          <el-button @click="unSubmit()">退出</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: "Application",
  data() {
    return {
      dialogVisibleSubmit: false,
      fundChanged: false,  //用于判断fund值是否改变
      groupChanged: false,  //用于判断group是否改变
      totalMoney: 0,
      usedMoney: 0,
      restMoney: 0,
      applicationForm: {
        fundNameAndId: "",
        identity: "唐博",
        group: "",
        money: "",
        category: "",
        abstract: "",
        remarks: ""
      },
      funds: [
        {
          value: '国自然（Y012300XX）',
          label: '国自然（Y012300XX）',
        },
        {
          value: '中央财政支持地方高校经费（Y120XX）',
          label: '中央财政支持地方高校经费（Y120XX）',
        },
        {
          value: '高水平（G000XX）',
          label: '高水平（G000XX）',
        }],
      groups: [
        {
          value: '张老师',
          label: '张老师',
        },
        {
          value: '李老师',
          label: '李老师',
        },
        {
          value: '王老师',
          label: '王老师',
        }],
      categories: [
        {
          value: '专用材料费',
          label: '专用材料费',
          children: [
            {
              value: '学生活动用品',
              label: '学生活动用品'
            },
            {
              value: '体育用品',
              label: '体育用品'
            }
          ]
        },
        {
          value: '无形资产',
          label: '无形资产',
          children: [
            {
              value: '专利权',
              label: '专利权'
            }, {
              value: '非专利技术',
              label: '非专利技术'
            }
          ]
        }
      ],
    }
  },
  methods: {
    confirmSubmit() {
      const fundName = this.applicationForm.fundNameAndId.split("（")
      const _this = this
      // console.log(fundName)
      this.$api.userAPI.applyFunding(fundName[0],
          this.applicationForm.identity, this.applicationForm.group,
          Number(this.applicationForm.money), this.applicationForm.category[0],
          this.applicationForm.category[1], this.applicationForm.abstract,
          this.applicationForm.remarks).then(resp => {
        this.dialogVisibleSubmit = false
        this.$message({
          showClose: true,
          message: '您已成功提交',
          type: 'success'
        });
      }).catch(err => {
        console.log(err);
      });
    },

    handleSubmit() {
      this.dialogVisibleSubmit = true
    },
    unSubmit() {
      this.dialogVisibleSubmit = false;//对话框不显示
    },
    handleClear() {
      this.applicationForm = {
        fundNameAndId: "",
        identity: "",
        group: "",
        money: "",
        category: "",
        abstract: "",
        remarks: ""
      }
    },

    getMoneyInfo() {
      const fundName = this.applicationForm.fundNameAndId.split("（")
      const _this = this
      this.$api.userAPI.getFundingInfoByGroupAndFundingName(fundName[0], _this.applicationForm.group).then(resp => {
        console.log(resp)
        _this.totalMoney = resp.data.data.funding_info.total
        _this.usedMoney = resp.data.data.funding_info.used
        _this.restMoney = resp.data.data.funding_info.rest
      }).catch(err => {
        console.log(err);
      });
    }
  },
  watch: {
    'applicationForm.fundNameAndId'(newValue, oldValue) {
      if (oldValue === "" && newValue !== "") {
        this.fundChanged = true
        if (this.groupChanged) {
          this.getMoneyInfo()
          this.fundChanged = false
          this.groupChanged = false
        }
      }
    },
    'applicationForm.group'(newValue, oldValue) {
      if (oldValue === "" && newValue !== "") {
        this.groupChanged = true
        if (this.fundChanged) {
          this.getMoneyInfo()
          this.fundChanged = false
          this.groupChanged = false
        }
      }
    }

  },
  mounted() {
    let _this = this
    _this.groups = []
    _this.categories = []
    this.$api.userAPI.getAllResearchGroups().then(resp => {
      for (const elem of resp.data.data.research_groups) {
        _this.groups.push({
          value: elem.name,
          label: elem.name
        })
      }
    }).catch(err => {
      console.log(err);
    });
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
  }
}
</script>

<style scoped>
.roomForm {
  width: 60%;
  margin: auto;
}

.title {
  font-size: 20px;
  line-height: 1.5;
  font-weight: bold;
  text-align: center;
  margin: 1%;
}

.el-form-item .el-tag {
  margin-right: 20px;
  font-size: 16px;
}

.btns {
  display: flex;
  justify-content: center;
}
</style>