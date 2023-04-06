<template>
  <div class="application">
    <div class="title">
      报销申请表
    </div>

    <div class="roomForm">
      <el-form :model="applicationForm" style="width: 100%">
        <el-form-item label="经费编号与经费名称" label-width="150px">
          <el-select v-model="applicationForm.fundName" placeholder="请选择经费编号及名称" size="large"
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
          <el-input v-model="applicationForm.identity" clearable>
          </el-input>
        </el-form-item>


        <el-form-item label="您选择经费的课题组" label-width="150px">
          <el-tag type="primary" size="large">总额度为 {{ totalMoney }} 万元</el-tag>
          <el-tag type="success" size="large">已使用额度为 {{ usedMoney }} 万元</el-tag>
          <el-tag type="warning" size="large">可用额度为 {{ totalMoney - usedMoney }} 万元</el-tag>
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
  </div>
</template>

<script>

export default {
  name: "Application",
  data() {
    return {
      totalMoney: 0,
      usedMoney: 0,
      applicationForm: {
        fundName: "",
        identity: "",
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
      ]
    }
  },
  methods: {
    handleClear() {
      this.applicationForm = {
        fundName: "",
        identity: "",
        group: "",
        money: "",
        category: "",
        abstract: "",
        remarks: ""
      }
    },
    handleSubmit() {

    }
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