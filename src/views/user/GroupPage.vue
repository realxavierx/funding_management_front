<template>
  <div style="text-align: center">
    <h3>课题组情况</h3>
    <el-radio-group v-model="selectedGroup" @change="getGroupMembers">
      <el-radio-button v-for="group in groups" :label="group"/>
    </el-radio-group>

    <div>
      <el-card v-for="member in groupMembers" :key="member.sid" style="width:80%;margin:auto">
        <el-card style="height: 200px">
          <el-row>
            <el-col :span="8">
              <el-avatar style="margin-top: 10px; margin-left: 20px" :size="140"
                         :src="member.avatar !== null? member.avatar: require('@/assets/team.png')"/>
            </el-col>
            <el-col :span="14">
<!--              <el-row>-->
<!--                <h4>{{ member.sid }}</h4>-->
<!--              </el-row>-->
              <el-row>
                <el-col :span="24">
                  <h4>{{ member.sid }}</h4>
                  <p>Role: {{ member.role }}</p>
                  <p>Name: {{ member.name }}</p>
                </el-col>
              </el-row>
<!--              <el-row>-->
<!--                <el-col :span="24">-->
<!--                  <p>Name: {{ member.name }}</p>-->
<!--                </el-col>-->
<!--              </el-row>-->
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
      // console.log(this.$store.getters.getUser)
      // console.log(this.groups)
    },

    getGroupMembers() {
      let _this = this
      this.$api.userAPI.getAllUsersByGroup(this.selectedGroup)
          .then((resp) => {
            // console.log(resp);
            _this.groupMembers = resp.data.data.user
          })
    }
  },

  mounted() {
    this.getGroups()
    this.getGroupMembers()
  }
}
</script>

<style scoped>

</style>