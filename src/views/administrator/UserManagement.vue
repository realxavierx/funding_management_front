<template>
  <div>
    <h2 style="text-align: center">User Management Center</h2>

    <div class="user-table">
      <el-row>
        <el-col v-for="user in users" :key="user.sid" :span="12">
          <el-card style="height: 250px">
            <el-row>
              <el-col :span="8">
                <el-avatar style="margin-top: 10px; margin-left: 20px" :size="140" :src="user.picture_url"
                           alt="logo.png"/>
                <el-button style="margin-top: 25px; margin-left: 30px"
                           v-if="user.status === 'normal'"
                           type="danger" @click="blockUser(user)">
                  Block User
                </el-button>
                <el-button style="margin-top: 30px; margin-left: 26px"
                           v-if="user.status === 'blocked'"
                           type="success" @click="unblockUser(user)">
                  Unblock User
                </el-button>
              </el-col>
              <el-col :span="1"></el-col>
              <el-col :span="14">
                <el-row>
                  <h4>{{ user.sid }}</h4>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <p>Role: {{ user.role }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <p>Name: {{ user.name }}</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-row>
                      <p>Status: </p>
                      <el-tag style="margin-left: 8px; margin-top: 15px" v-if="user.status === 'normal'">Normal</el-tag>
                      <el-tag style="margin-left: 8px; margin-top: 15px" type="danger" v-if="user.status === 'blocked'">
                        Blocked
                      </el-tag>
                    </el-row>
                  </el-col>
<!--                  <el-col :span="12">-->
<!--                    <el-tag style="margin-left: 8px; margin-top: 7px; width: 120px; height: 40px; font-size: 18px"-->
<!--                            type="success" v-if="user.online === 'True'">-->
<!--                      Online-->
<!--                    </el-tag>-->
<!--                    <el-tag style="margin-left: 8px; margin-top: 7px; width: 120px; height: 40px; font-size: 18px"-->
<!--                            type="info" v-if="user.online === 'False'">-->
<!--                      Offline-->
<!--                    </el-tag>-->
<!--                  </el-col>-->
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserManagement",

  data() {
    return {
      users: []
    }
  },

  methods: {

    getAllUsers() {
      let _this = this;
      this.$api.userAPI.getAllUsers()
          .then((resp) => {
            _this.users = resp.data.data.user
            console.log(_this.users)
          })
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
    }
  },

  mounted() {
    this.getAllUsers()
  }
}
</script>

<style scoped>

</style>