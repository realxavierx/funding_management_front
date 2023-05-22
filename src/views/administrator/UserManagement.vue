<template>
  <div>
    <h2 style="text-align: center">User Management Center</h2>

    <div class="user-table">
      <el-row>
        <el-col v-for="user in users" :key="user.sid" :span="12">
          <el-card class="users_card">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-avatar style="margin-top: 10px;" :size="140"
                           :src="user.avatar !== null? user.avatar: require('@/assets/team.png')"/>
                <el-button style="margin-top: 5px; margin-left: 17px"
                           v-if="user.status === 'normal'"
                           type="danger" @click="blockUser(user)">
                  Block User
                </el-button>
                <el-button style="margin-top: 5px; margin-left: 8px"
                           v-if="user.status === 'blocked'"
                           type="success" @click="unblockUser(user)">
                  Unblock User
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <h2>{{ user.name }}</h2>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <p>ID: {{ user.sid }}</p>
                  </el-col>
                  <el-col :span="12">
                    <p>Role: {{ user.role }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <p>Email: {{ user.email }}</p>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <h4>所属课题组：</h4>
                <p v-for="group in user.groups" :key="group">{{ group }}</p>
                <el-button type="primary" size="small" @click="addUserGroup(user)">添加课题组</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

      <el-dialog width="30%" v-model="dialogVisible" title="用户课题组管理" center>
        <h3>请选择要为{{ selectedUser.name }}添加的课题组</h3>
        <el-select v-model="selectedGroup">
          <el-option
              v-for="group in groups"
              :key="group"
              :label="group"
              :value="group"
              :disabled="selectedUser.groups.includes(group)"
          />
        </el-select>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmAddUserGroup">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "UserManagement",

  data() {
    return {
      users: [],
      selectedUser: "",
      dialogVisible: false,
      selectedGroup: "",
      groups: [],
    }
  },

  methods: {

    getAllUsers() {
      let _this = this;
      this.$api.userAPI.getAllUsers()
          .then((resp) => {
            _this.users = resp.data.data.user;
            for (let user of _this.users) {
              _this.$api.userAPI.getUserGroup(user.sid).then(resp => {
                user.groups = [];
                for (const group of resp.data.data.groups_info) {
                  user.groups.push(group);
                }
              })
            }
            console.log("users", _this.users);
          })
    },

    getGroupInfo() {
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

    blockUser(user) {
      this.$api.userAPI.blockUser(user.sid)
          .then((resp) => {
            console.log(resp)
            if (resp.status === 200) {
              user.status = 'blocked'
            }
          })
    },

    unblockUser(user) {
      this.$api.userAPI.unblockUser(user.sid)
          .then((resp) => {
            console.log(resp)
            if (resp.status === 200) {
              user.status = 'normal'
            }
          })
    },

    addUserGroup(user) {
      this.selectedUser = user;
      this.dialogVisible = true;
    },

    confirmAddUserGroup() {
      let _this = this;
      this.$api.userAPI.addUserGroup(this.selectedUser.sid, this.selectedGroup).then(resp => {
        if (resp.data.code === 200) {
          _this.getAllUsers();
          _this.dialogVisible = false;
          ElMessage({
            message: '添加课题组成功！',
            type: 'success',
          })
        }
      })
    }
  },

  mounted() {
    this.getAllUsers();
    this.getGroupInfo();
  }
}
</script>

<style scoped>
.user-table {
  margin-bottom: 4%
}
</style>