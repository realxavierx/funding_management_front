<template>
  <div class="resetPassword">
    <div id="picture">
      <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle"
                     :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
                     :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
                     clickMode="push">
      </vue-particles>
      <div class="login_container">
        <!-- 登录块 -->
        <div class="login_box">
          <!-- 表单区域 -->
          <h1>请重置密码</h1>
          <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginRules"
                   :v-model="submitLoginForm" @keyup.enter.native="submitLoginForm()">
            <!-- 账号 -->
            <el-form-item label="账号" prop="id" label-width="100px">
              <el-input class="in" v-model="loginForm.id" prefix-icon="iconfont icon-denglu"
                        placeholder="请输入账号">
              </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="新密码" prop="password" label-width="100px">
              <el-input class="in" v-model="loginForm.password" prefix-icon="iconfont icon-mima"
                        placeholder="请输入密码" show-password>
              </el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass" label-width="100px">
              <el-input class="in" v-model="loginForm.checkPass" prefix-icon="iconfont icon-mima"
                        placeholder="请再次输入新密码" show-password>
              </el-input>
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
    var validatePass = (rule, value, callback) => {
      //value：password的值，callback:如果都不满足，则正常提交
      if (value === "") {
        callback(new Error("请输入新密码"));//输入为空的提示信息
      } else if (value.length < 6 || value.length > 15) {
        callback(new Error("密码长度须在 6 到 15 个字符"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginFormRef.validateField("checkPass");//如果确认密码不为空，则去validatePass2这个函数
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      //表单数据
      loginForm: {
        id: "",
        password: "",
        checkPass: "",
      },
      //指定验证规则
      loginRules: {
        //校验id
        id: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 0, max: 10, message: '账号长度须在 0 到 10 个字符', trigger: 'blur'}
        ],
        //校验密码
        password: [{required: true, validator: validatePass, trigger: "blur"}],
        checkPass: [{required: true, validator: validatePass2, trigger: "blur"}],
      },
    };

  },
  methods: {
    resetLoginForm() {//重置用户名和密码方法
      this.$refs.loginFormRef.resetFields();
    },
    submitLoginForm() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          this.$api.loginAPI.modifyPasswd(this.loginForm.id, this.loginForm.password)
              .then(resp => {
                console.log(resp)
                console.log(resp.data.data.result)
                if (resp.data.data.result === false) {
                  this.$message({
                    message: "用户不存在，请重新输入账号",
                    type: "error"
                  });
                } else {
                  this.$router.push({path: "/userLogin"});
                }
              }).catch(err => {
            console.log(err);
          });
        }
      })
    },
  },
}
</script>

<style scoped>
.login_box {
  width: 40%;
  height: 50%;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #dccfcf;
  box-shadow: 0 0 25px #909399;
  background-color: rgba(255, 255, 255, 0.75);
}


.btns {
  display: flex;
  justify-content: space-around;
}

.login_form {
  position: absolute;
  margin-top: 5%;
  width: 100%;
  border: 20px;
}

.in {
  margin-left: 10%;
  margin-right: 10%;
  width: 60%;
}

h1,
h2,
h3 {
  font-size: xxpx;
  color: #000;
  text-align: center;
}
</style>