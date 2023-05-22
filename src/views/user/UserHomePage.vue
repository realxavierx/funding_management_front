<template>
  <div class="home">
    <div class="userHomePage">
      <el-row>
        <div class="name-text-div">
          <h1>{{ nameText }}</h1>
        </div>
      </el-row>

      <el-row>
        <div>
          <h2>{{ roleText }}</h2>
        </div>
      </el-row>

      <el-row>
        <div class="group-text-div">
          <h3>{{ groupText }}</h3>
        </div>
      </el-row>

      <el-row>
        <div class="status-text-div">
          <h3>{{ statusText }}</h3>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserHomePage",

  data() {
    return {
      user: {},
      nameText: "",
      roleText: "",
      groupText: "",
      statusText: "",
    }
  },

  mounted() {
    let state = JSON.parse(sessionStorage.getItem("state"));
    this.user = JSON.parse(JSON.stringify(state.user));
    console.log(this.user);
    this.startTypingAnimation();
  },

  methods: {
    generateText2Type() {
      let textToType = [];

      let nameString = "你好, " + this.user.name + "。\n";
      textToType.push(nameString);

      let roleString = "你是一名" + this.user.role + "。\n";
      textToType.push(roleString);

      let groupString = "你所在的课题组为:\n\n";
      for (const groupNameKey of this.user.groupName) {
        groupString += "· " + groupNameKey + "\n";
      }
      textToType.push(groupString);

      let statusString = "";
      if (this.user.status === "normal") {
        statusString += "你现在能够使用的功能有：\n\n"
            + "1. 申请报销\n\n"
            + "2. 查看课题组信息\n\n"
            + "3. 查看并管理经费\n\n"
            + "4. 查看报销申请\n\n";
      } else if (this.user.status === "blocked") {
        statusString += "你现在能够使用的功能有：\n\n"
            + "1. 查看课题组信息\n\n"
            + "2. 查看并管理经费\n\n"
            + "3. 查看报销申请\n\n"
            + "但你无法申请报销。";
      }
      textToType.push(statusString);

      return textToType;
    },

    startTypingAnimation() {
      const textToType = this.generateText2Type();
      let currentText = 0;
      let currentTextIndex = 0;

      const typingInterval = setInterval(() => {
        switch (currentText) {
          case 0:
            this.nameText += textToType[currentText][currentTextIndex++];
            break;
          case 1:
            this.roleText += textToType[currentText][currentTextIndex++];
            break;
          case 2:
            this.groupText += textToType[currentText][currentTextIndex++];
            break;
          case 3:
            this.statusText += textToType[currentText][currentTextIndex++];
            break;
          default:
            break;
        }

        if (currentTextIndex === textToType[currentText].length) {
          currentText++;
          currentTextIndex = 0;
        }

        if (currentText >= textToType.length) {
          clearInterval(typingInterval);
        }
      }, 50); // Adjust the typing speed by changing the interval delay (in milliseconds)
    }
  },


}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap');
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap');

.home {

}

.userHomePage {
  font-family: 'ZCOOL XiaoWei', sans-serif;
  display: grid;
  place-items: center;
  align-items: center;
  margin-top: 5%
}

.name-text-div {
  font-family: 'Ma Shan Zheng', cursive;
}

.group-text-div {
  white-space: pre-line;
}

.status-text-div {
  white-space: pre-line;
}
</style>