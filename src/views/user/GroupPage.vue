<template>
  <div style="text-align: center">
    <h2>用户所在课题组情况</h2>
    <el-radio-group v-model="selectedGroup" @change="getGroupMembers">
      <el-radio-button v-for="group in groups" :label="group"/>
    </el-radio-group>

    <div class="user_groups">
      <el-card v-for="member in groupMembers" :key="member.sid" class="user_groups_card">
        <el-card style="height: 200px;">
          <el-row>
            <el-col :span="8">
              <el-avatar style="margin-top: 10px; margin-left: 20px" :size="140"
                         :src="member.avatar !== null? member.avatar: require('@/assets/team.png')"/>
            </el-col>
            <el-col :span="16">
              <el-row>
                <el-col :span="24">
                  <h2 style="color: #b076ff">{{ member.sid }}</h2>
                  <p>Role: {{ member.role }}</p>
                  <p>Name: {{ member.name }}</p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupPage",

  data() {

    return {
      selectedGroup: "",
      groups: [],
      groupMembers: []
    }
  },

  methods: {
    getGroups() {
      this.groups = this.$store.getters.getUser.groupName
      this.selectedGroup = this.groups[0]
    },
    getGroupMembers() {
      let _this = this
      this.$api.userAPI.getAllUsersByGroup(this.selectedGroup).then((resp) => {
        _this.groupMembers = []
        _this.groupMembers = resp.data.data.user
      }).catch(err => {
        console.log(err);
      });
    }
  },

  mounted() {
    this.getGroups()
    this.getGroupMembers()
  }
}
</script>

<style scoped>
.user_groups {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.user_groups_card {
  width: 30%;
  margin: 1% auto;
  border-radius: 20px;
  box-shadow: 0 0 25px #909399;
  background-color: rgba(255, 255, 255, 0.75);
}
</style>