<template>
  <div class="allocateMoney">
    <div class="roomForm">
      <h2 style="text-align: center">Funding Distribution</h2>

      <el-form :model="allocateForm" ref="allocateFormRef" style="width: 100%"
               :rules="formRules">
        <el-form-item label="经费编号与经费名称" prop="fund" label-width="150px">
          <el-select v-model="allocateForm.fund" value-key="name" placeholder="请选择经费编号及名称"
                     size="large" style="width: 100%" clearable>
            <el-option
                v-for="item in funds"
                :key="item.name"
                :label="item.name + '（' + item.code + '）'"
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
          <el-tag type="primary" size="large">经费总额 {{ allocateForm.fund.temp_total }} 万元</el-tag>
          <el-tag type="success" size="large">已使用额度为 {{ allocateForm.fund.temp_used }} 万元</el-tag>
          <el-tag type="warning" size="large">经费余额 {{ allocateForm.fund.temp_left }} 万元</el-tag>
        </el-form-item>

        <el-form-item label="支出金额" prop=money label-width="150px">
          <el-input-number v-model="allocateForm.money" clearable/>
          <span> 万元 </span>
        </el-form-item>

        <el-form-item>
          <el-button style="margin-left: 40%" type="primary" size="large" round @click="handleAllocate">分配</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="distribution-table">
      <h2 style="text-align: center">当前预分配列表</h2>
      <el-table :data="allocateData">
        <el-table-column prop="fundNameAndId" label="经费名称"/>
        <el-table-column prop="group" label="课题组"/>
        <el-table-column prop="money" label="分配金额"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" @click="cancelAllocate(scope.$index, scope.row)">取消分配</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button style="margin-top: 15px; margin-left: 40%" type="primary" size="large" @click="submitAllocate">提交分配</el-button>
    </div>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
  name: "AllocateMoney",

  data() {
    const validateMoney = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入支出金额"));
      } else if (value > this.allocateForm.fund.temp_left) {
        callback(new Error("支出金额不能大于剩余金额"));
      } else {
        callback();
      }
    };

    return {
      totalMoney: 0,
      usedMoney: 0,
      restMoney: 0,
      groups: [],
      allocateForm: {
        fund: "",
        group: "",
        money: 0,
      },
      formRules: {
        fund: [{required: true, message: '请选择经费名称和编号', trigger: 'blur'}],
        group: [{required: true, message: '请选择分配金额的课题组', trigger: "blur"}],
        money: [{required: true, validator: validateMoney, trigger: "blur"}],
      },
      funds: [],
      allocateData: [],
    }
  },

  methods: {

    getResearchGroups() {
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

    getFundsInfo() {
      let _this = this;
      this.$api.adminAPI.getFundsInfo().then(resp => {
        _this.funds = resp.data.data.funds;
        for (let fund of _this.funds) {
          fund.temp_total = fund.total_available;
          fund.temp_used = fund.total_used;
          fund.temp_left = fund.total_available - fund.total_used;
        }
        console.log(_this.funds);
      })
    },

    getMoneyInfo() {
      const fundName = this.allocateForm.fund.split("（")
      this.$api.userAPI.getFundingInfoByGroupAndFundingName(fundName[0]).then(resp => {
        console.log(resp)
      }).catch(err => {
        console.log(err);
      });
    },

    resetForm() {
      this.allocateForm = {
        fund: "",
        group: "",
        money: 0,
      };
    },

    handleAllocate() {
      if (this.allocateForm.fund !== "" && this.allocateForm.group !== "" &&
          this.allocateForm.money > 0 && this.allocateForm.money <= this.allocateForm.fund.temp_left) {
        this.allocateData.push({
          fundNameAndId: this.allocateForm.fund.name + "（" + this.allocateForm.fund.code + "）",
          fund: this.allocateForm.fund,
          group: this.allocateForm.group,
          money: this.allocateForm.money
        });

        let idx = this.funds.findIndex(elem => elem.name === this.allocateForm.fund.name);
        this.funds[idx].temp_left -= this.allocateForm.money;
        this.funds[idx].temp_used += this.allocateForm.money;
        this.resetForm();
      } else {
        ElMessage({
          message: '请正确选择经费，课题组以及分配金额！',
          type: 'error',
        })
      }
    },

    cancelAllocate(row_index, row) {
      let idx = this.funds.findIndex(elem => elem.name === row.fund.name);
      this.funds[idx].temp_left += row.money;
      this.funds[idx].temp_used -= row.money;
      this.allocateData.splice(row_index, 1);
    },

    async submitAllocate() {
      let _this = this;
      let success = true;
      for (const data of this.allocateData) {
        this.$api.adminAPI.allocateMoney(data.group, data.fund.name, data.money).then(resp => {
          success = success && true;
          console.log("here", resp)
        })
            .catch(err => {
              success = false;
              console.log(err);
            })
      }

      setTimeout(() => {
        if (success) {
          ElMessage({
            message: '经费分配提交成功！',
            type: 'success',
          });
          _this.getFundsInfo();
          _this.allocateData = [];
        } else {
          ElMessage({
            message: '经费分配提交失败！',
            type: 'error',
          })
        }
      }, 1000)
    }
  },

  mounted() {
    this.getResearchGroups();
    this.getFundsInfo();
  },

}
</script>

<style scoped>
.roomForm {
  width: 60%;
  margin: 3% auto;
}

.distribution-table {
  width: 60%;
  margin: 0 auto;
}
</style>