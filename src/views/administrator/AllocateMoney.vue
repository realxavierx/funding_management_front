<template>
  <div class="allocateMoney">
    <div class="roomForm">
      <el-form :model="allocateForm" ref="allocateFormRef" style="width: 100%" :rules="formRules">
        <el-form-item label="经费编号与经费名称" prop=fundNameAndId label-width="150px">
          <el-select v-model="allocateForm.fundNameAndId" placeholder="请选择经费编号及名称" size="large"
                     style="width: 100%" clearable>
            <el-option
                v-for="item in funds"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="课题组" prop=group label-width="150px">
          <el-select v-model="allocateForm.group" placeholder="请选择您想分配金额的课题组" size="large"
                     style="width: 100%" clearable>
            <el-option
                v-for="item in groups"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="您选择的经费" label-width="150px">
          <el-tag type="primary" size="large">经费总额{{ totalMoney }} 万元</el-tag>
          <el-tag type="success" size="large">已使用额度为 {{ usedMoney }} 万元</el-tag>
          <el-tag type="warning" size="large">经费余额{{ restMoney }} 万元</el-tag>
        </el-form-item>

        <el-form-item label="支出金额" prop=money label-width="150px">
          <el-input v-model="allocateForm.money" placeholder="给课题组分配的金额不能大于可使用额度" clearable>
          </el-input>
        </el-form-item>

        <div class="btns">
          <el-button type="primary" size="large" round @click="handleAllocate">分配</el-button>
        </div>
      </el-form>

      <el-table :data="allocateData">
        <el-table-column prop="fundNameAndId" label="经费名称"/>
        <el-table-column prop="group" label="课题组"/>
        <el-table-column prop="money" label="分配金额"/>
        <el-table-column label="操作">
          <el-button type="danger">取消分配</el-button>
        </el-table-column>
      </el-table>

      <el-button type="primary" size="large">提交分配</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "AllocateMoney",

  data() {
    const validateMoney = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入支出金额"));
      } else if (value > this.restMoney) {
        callback(new Error("支出金额不能大于剩余金额"));
      } else {
        callback();
      }
    };
    return {
      totalMoney: 0,
      usedMoney: 0,
      restMoney: 0,
      groups: [
        "唐博", "于仕琪"
      ],
      allocateForm: {
        fundNameAndId: "",
        group: "",
        money: "",
      },
      formRules: {
        fundNameAndId: [{required: true, message: '请选择基金名称和编号', trigger: 'blur'}],
        group: [{required: true, message: '请选择分配金额的课题组', trigger: "blur"}],
        money: [{required: true, validator: validateMoney, trigger: "blur"}],
      },
      funds: [
        '国自然（Y012300XX）',
        '中央财政支持地方高校经费（Y120XX）',
        '高水平（G000XX）',
      ],
      allocateData: [],

    }
  },

  methods: {

    getMoneyInfo() {
      const fundName = this.allocateForm.fundNameAndId.split("（")
      const _this = this;
      this.$api.userAPI.getFundingInfoByGroupAndFundingName(fundName[0]).then(resp => {
        console.log(resp)
      }).catch(err => {
        console.log(err);
      });
    },

    handleAllocate() {
      this.allocateData.push({
        fundNameAndId: this.allocateForm.fundNameAndId,
        group: this.allocateForm.group,
        money: this.allocateForm.money
      });

      this.totalMoney -= this.allocateForm.money;
      this.restMoney -= this.allocateForm.money;
      this.usedMoney += this.allocateForm.money;
    },


  },

  mounted() {
    const _this = this
    this.$api.userAPI.getAllResearchGroups().then(resp => {
      _this.groups = []
      for (const ele of resp.data.data.research_groups) {
        _this.groups.push(ele.name)
      }
    }).catch(err => {
      console.log(err);
    });
  },

  watch: {
    'allocateForm.fundNameAndId'(newValue, oldValue) {
      this.getMoneyInfo()
    },
  }
}
</script>

<style scoped>
.roomForm {
  width: 60%;
  margin: 5% auto;
}
</style>