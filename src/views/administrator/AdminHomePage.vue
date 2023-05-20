<template>
  <div class="home">
    <div class="adminHomePage">
      <el-row>
        <div class="name-text-div">
          <h1>{{ nameText }}</h1>
        </div>
      </el-row>

      <div class="pattern-checks-md bg-yellow black h-5"></div>

      <el-row>
        <div>
          <h2>{{ roleText }}</h2>
        </div>
      </el-row>

      <el-row>
        <div class="function-text-div">
          <h3>{{ functionText }}</h3>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminHomePage",

  data() {
    return {
      user: {},
      nameText: "",
      roleText: "",
      functionText: "",

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

      let functionString = "你可以使用的功能有：\n\n"
          + "· 查看并管理用户的报销权限\n\n"
          + "· 查看并管理课题组\n\n"
          + "· 查看并管理经费\n\n"
          + "· 查看并管理报销申请\n\n"
      textToType.push(functionString);

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
            this.functionText += textToType[currentText][currentTextIndex++];
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
      }, 100); // Adjust the typing speed by changing the interval delay (in milliseconds)
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap');

.home {

}

.adminHomePage {
  font-family: 'ZCOOL XiaoWei', sans-serif;
  display: grid;
  place-items: center;
  align-items: center;
  margin-top: 5%;
}

.name-text-div {
  font-family: 'Ma Shan Zheng', cursive;
}

.function-text-div {
  white-space: pre-line;
}

</style>