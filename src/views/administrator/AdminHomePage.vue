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
    <div style="flex-basis: 40%">
      <el-carousel height="500px">
        <el-carousel-item v-for="(item,index) in img_list" :key="index">
          <img :src="item" alt @click="handleCarouselClick(index)"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="flex-basis: 30%">
      <el-card style="text-align: left;width:70%;margin:auto" class="wrapperCard">
        <h3>用户在线列表</h3>
        <el-scrollbar height="450px">
          <div v-for="(item, index) in onlineUsers" :key="index">
            <el-card class="showCard">
              {{ index + 1 }}. &nbsp {{ item.name }}
            </el-card>
          </div>
        </el-scrollbar>
      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: "AdminHomePage",
  data() {
    const img1 = require("../../assets/bigstar.png");
    const img2 = require("../../assets/haimian.png");
    const img3 = require("../../assets/sandy.png");
    return {
      img_list: [img1, img2, img3],
      user: {},
      nameText: "",
      roleText: "",
      functionText: "",
      onlineUsers: [],
    }
  },

  mounted() {
    let state = sessionStorage.getItem("state");

    if (state === null) {
      this.$router.push({path: "/"});
    }
    else {
      state = JSON.parse(state);
      this.user = JSON.parse(JSON.stringify(state.user));
      console.log(this.user);
      this.startTypingAnimation();
      this.getAllOnlineUsers()
    }
  },

  methods: {
    getAllOnlineUsers() {
      const _this = this;
      setInterval(() => {
        _this.$api.userAPI.getOnlineUsers().then(resp => {
          _this.onlineUsers = resp.data.data.online_users
          console.log(resp);
        }).catch(err => {
          console.log(err);
        })
      }, 10000);
    },

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
      }, 50); // Adjust the typing speed by changing the interval delay (in milliseconds)
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap');

.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 93vh;
}

.adminHomePage {
  font-family: 'ZCOOL XiaoWei', sans-serif;
  display: grid;
  place-items: center;
  align-items: center;
  flex-basis: 30%;
}

.name-text-div {
  font-family: 'Ma Shan Zheng', cursive;
}

.function-text-div {
  white-space: pre-line;
}

.wrapperCard {
  border: 1px solid #dccfcf;
  box-shadow: 0 0 25px #909399;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
}

.showCard {
  border: 1px solid #dccfcf;
  box-shadow: 0 0 25px #909399;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.75);
  margin-bottom: 1.5%;
}
</style>