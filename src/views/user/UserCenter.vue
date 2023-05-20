<template>
  <div class="general-info">
    <div class="general-info-t">
      <div class="general-info-avatar">
        <!-- <img :src="baseInfo.avatar_url" alt=""> -->
        <img :src="user.avatar_url" alt="">
      </div>
      <div class="general-info-t-info">
        <h3>{{ user.name }}</h3>
        <h3>{{ user.id }}</h3>
      </div>
    </div>

    <div class="base-info">
      <div class="base-info-head">基本信息</div>

      <div class="base-info-content">
        <el-descriptions>
          <el-descriptions-item label="Name:">{{ user.name }}</el-descriptions-item>
          <el-descriptions-item label="User ID:">{{ user.id }}</el-descriptions-item>
          <el-descriptions-item label="Email:">{{ user.email }}</el-descriptions-item>
          <el-descriptions-item label="SID:">{{ user.sid }}</el-descriptions-item>
          <el-descriptions-item label="Role:">{{ user.role }}</el-descriptions-item>
          <el-descriptions-item label="Status:">{{ user.status }}</el-descriptions-item>
          <el-descriptions-item label="Department:">{{ user.department }}</el-descriptions-item>

<!--          <el-descriptions-item label="职业">-->
<!--            <el-tag size="small">{{ baseInfo.type }}</el-tag>-->
<!--          </el-descriptions-item>-->
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {

      user: {}
    }
  },
  methods: {

  },

  mounted() {
    let state = JSON.parse(sessionStorage.getItem("state"));
    this.user = JSON.parse(JSON.stringify(state.user));
    console.log(this.user);
  }
}
</script>

<style scoped>
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
}

.general-info-avatar {
  flex-shrink: 0;
  position: relative;
  width: 150px;
  height: 150px;
  margin-right: 16px;
  -webkit-box-shadow: 0 0 10px 2px rgb(0 0 0 / 6%);
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 6%);
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
}

.general-info-avatar img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
}


.general-info-t-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.name {
  font-weight: 600;
  font-size: 250%;
}

.general-info-b {
  height: 48px;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 48px;
}

.general-info-b div {
  margin-left: 24px;
  display: inline-block;
}

.base-info {
  background-color: rgb(255, 255, 255);
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
  margin: 0 auto;
  margin-bottom: 20px;
}


</style>