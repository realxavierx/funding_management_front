<template>

  <div class="userSignIn">
    <div class="background">
      <div class="change">
        <span class="already">New to Hotel?</span>
        <router-link to="/userLogin/UserSignUp">
          <el-button round>Creat an account</el-button>
        </router-link>
      </div>

      <div class="image">
        <img :src="require('@/assets/dz.png')" alt="dz">
      </div>

      <div class="login_container">
        <!-- 登录块 -->
        <div class="login_box">
          <!-- 表单区域 -->
          <h1>欢迎登录</h1>

          <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginRules"
                   :v-model="submitLoginForm" @keyup.enter.native="submitLoginForm()">

            <!-- 账号 -->
            <el-form-item label="账号" prop="id" label-width="100px">
              <el-input class="in" v-model="loginForm.id" prefix-icon="iconfont icon-denglu"
                        placeholder="请输入账号">
              </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password" label-width="100px">
              <div style="display:flex">
                <el-input class="in" v-model="loginForm.password" prefix-icon="iconfont icon-mima"
                          placeholder="请输入密码" show-password>
                </el-input>
                <router-link to="/userLogin/resetPassword">
                  <el-button type="primary">忘记密码?</el-button>
                </router-link>
              </div>
            </el-form-item>

            <!-- 按钮 -->
            <div class="btns">
              <el-button type="primary" @click="submitLoginForm()">确定</el-button>
              <el-button type="info" @click="resetLoginForm()">重置</el-button>
            </div>

          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const validateId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));//输入为空的提示信息
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      //value：password的值，callback:如果都不满足，则正常提交
      if (value === "") {
        callback(new Error("请输入密码"));//输入为空的提示信息
      } else {
        callback();
      }
    };
    return {
      //表单数据
      loginForm: {
        id: "",
        password: "",
      },
      //指定验证规则
      loginRules: {
        //校验id
        id: [
          {required: true, validator: validateId, trigger: 'blur'},
        ],
        //校验密码
        password: [{required: true, validator: validatePass, trigger: "blur"}],
      },
    };
  },
  methods: {
    resetLoginForm() {//重置用户名和密码方法
      this.$refs.loginFormRef.resetFields();
    },
    submitLoginForm() {
      this.$refs.loginFormRef.validate(async valid => {
        //1.验证失败则结束
        if (!valid) {
          return;
        } else {
          this.$api.loginApi.userSignIn(this.loginForm.id, this.loginForm.password)
              .then(res => {
                console.log(res)
                if (res.data.code == 8000) {
                  this.$message({
                    message: res.data.message,
                    type: "error"
                  });
                } else {
                  //保存token
                  let accessToken = res.data[0].token;
                  localStorage.setItem("token", accessToken)
                  this.$store.dispatch('asyncUpdateUser', {nickname: res.data[0].nickName, id: res.data[0].account})
                  sessionStorage.setItem('state', JSON.stringify(this.$store.state.user))
                  this.$router.push({path: "/client/hotelInfo"});
                }
              }).catch(err => {
            console.log(err);
          });
        }
      })
    }
  }
}
</script>

<style scoped>
.login_box {
  width: 40%;
  height: 45%;
  border-radius: 20px;
  position: absolute;
  left: 60%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #dccfcf;
  box-shadow: 0 0 25px #909399;
  background-color: rgba(255, 255, 255, 0.75);
}


.btns {
  display: flex;
  justify-content: center;
}

.login_form {
  position: absolute;
  margin-top: 5%;
  width: 100%;
  border: 20px;
}

.image {
  margin-left: 10%;
}

.in {
  margin-left: 10%;
  margin-right: 3%;
  width: 60%;
}

h1,
h2,
h3 {
  font-size: xxpx;
  color: #000;
  text-align: center;
}

.already {
  color: #fff;
  text-align: right;
  padding: 15px;
}

.change {
  text-align: right;
  padding: 15px;
  position: relative;
}

.background {
  position: relative;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(28, 28, 127, 0.826) 5%, rgb(3, 30, 65) 70%, rgb(0, 0, 0) 100%);
}
</style>