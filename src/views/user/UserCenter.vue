<template>
  <div class="general-info">

    <div class="general-info">
      <el-card class="card-info" shadow="always">
        <el-row>
          <el-col :span="2"/>
          <el-col :span="8">
            <el-avatar @click="dialogVisible = true" shape="square" :size="160"
                       :src="user.avatar !== null? user.avatar: require('@/assets/team.png')"/>
          </el-col>
          <el-col :span="7">
            <h2>{{ user.name }}</h2>
          </el-col>
          <el-col :span="7">
            <h2>{{ user.sid }}</h2>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <div class="base-info">
      <div class="base-info-head">基本信息</div>
      <div class="base-info-content">
        <el-descriptions size="large" border class="custom-descriptions">
          <el-descriptions-item label="Role:">{{ user.role }}</el-descriptions-item>
          <el-descriptions-item label="Status:">{{ user.status }}</el-descriptions-item>
          <el-descriptions-item label="Department:">{{ user.department }}</el-descriptions-item>
          <el-descriptions-item label="Email:">
            <el-row>
              <el-col :span="12">
                <el-input v-if="edit_email" v-model="email_input" style="width:400px"/>
                <span v-if="!edit_email">{{ user.email }}</span>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-button v-if="!edit_email" type="success" @click="handleEdit()">修改邮箱</el-button>
                  <el-button v-if="edit_email" type="success" @click="confirmEdit()">确认修改</el-button>
                </div>
              </el-col>
            </el-row>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>

    <el-dialog width="30%" v-model="dialogVisible" title="更换头像" center>
      <el-row>
        <el-col :span="3"></el-col>
        <el-col :span="8">
          <h3>请选择新头像: </h3>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="8">
          <el-upload
              v-model:file-list="fileList"
              action=""
              :on-change="handleAvatarUpload"
              :auto-upload="false"
              :show-file-list="false"
              accept=".png, .jpg, .JPG, .JPEG, .jpeg, .PNG"
          >
            <el-avatar :size="100" fit="fill" :src="newAvatar"></el-avatar>
            <div slot="tip" class="el-upload__tip">Only JPG/PNG images are allowed</div>
          </el-upload>

        </el-col>
        <el-col :span="3"></el-col>
      </el-row>

      <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmChangeAvatar">确认更换</el-button>
          </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      user: {},
      email_input: "",
      edit_email: false,
      dialogVisible: false,
      fileList: [],
      newAvatar: ""
    }
  },
  methods: {

    handleEdit() {
      this.edit_email = true
    },

    confirmEdit() {
      this.edit_email = false
    },

    getUserInfo(sid) {
      const _this = this
      this.$api.userAPI.getUserById(sid).then(resp => {
        _this.user = resp.data.data.user_info;
        _this.email_input = _this.user.email
        console.log(_this.user);
      }).catch(err => {
        console.log(err);
      });
    },

    handleAvatarUpload(file) {
      let _this = this;
      const reader = new FileReader();

      reader.onloadend = () => {
        // Use the base64String as needed
        _this.newAvatar = reader.result;
      };

      reader.readAsDataURL(file.raw);
    },

    confirmChangeAvatar() {
      let _this = this;
      this.$api.userAPI.updateAvatar(this.user.sid, this.newAvatar).then(resp => {
        if (resp.data.code === 200) {
          _this.getUserInfo(_this.user.sid);
          _this.dialogVisible = false;
          _this.newAvatar = "";
          ElMessage.success("更换头像成功！");
        }
      })
    }
  },

  mounted() {
    let state = JSON.parse(sessionStorage.getItem("state"));
    let sid = JSON.parse(JSON.stringify(state.user)).id;
    this.getUserInfo(sid);
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap');

.general-info {
  width: 80%;
  color: #000;
  margin: 5% auto;
}

.general-info-t {
  padding: 24px 0 40px 24px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background-color: rgb(255, 255, 255);
  margin-bottom: 10px;
  -webkit-box-shadow: 0 1px 8px 0 rgb(0 0 0 / 4%);
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 4%);
  text-align: center;
  align-items: center;
  justify-content: center;
}

.general-info-avatar img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
}

.general-info-b div {
  margin-left: 24px;
  display: inline-block;
}

.base-info {
  background-color: rgb(255, 255, 255);
  padding: 15px;
}

.base-info-head {
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  font-weight: 600;
  color: #000;

  padding-left: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f2;
}

.base-info-content {
  width: 90%;
  margin: 10px auto;
}

.custom-descriptions {
  font-size: 20px;
}

.card-info {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 40px;
  background-color: #ededea;
  opacity: 1;
  background: radial-gradient(circle, transparent 20%, #ededea 20%, #ededea 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #ededea 20%, #ededea 80%, transparent 80%, transparent) 45px 45px, linear-gradient(#deb9eb 3.6px, transparent 3.6px) 0 -1.8px, linear-gradient(90deg, #deb9eb 3.6px, #ededea 3.6px) -1.8px 0;
  background-size: 90px 90px, 90px 90px, 45px 45px, 45px 45px;
}

</style>