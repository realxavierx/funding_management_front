<template>
  <div class="userSignUp">
    <div id="picture">

      <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle"
                     :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4"
                     :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
                     clickMode="push">
      </vue-particles>

      <div class="change">
        <span class="already">Already have an account?</span>
        <router-link to="/userLogin/UserSignIn">
          <!-- 用户注册 -->
          <el-button round>Sign In</el-button>
        </router-link>
      </div>
      <div class="login_container">
        <!-- 登录块 -->
        <div class="login_box">
          <!-- 表单区域 -->
          <h1>欢迎注册</h1>

          <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginRules"
                   :v-model="submitLoginForm" @keyup.enter.native="submitLoginForm()">

            <el-form-item label="姓名" prop="name" label-width="100px">
              <el-input class="in" v-model="loginForm.name" prefix-icon="iconfont icon-nicheng"
                        placeholder="请输入姓名">
              </el-input>
            </el-form-item>
            <!-- 账号 -->
            <el-form-item label="账号" prop="id" label-width="100px">
              <el-input class="in" v-model="loginForm.id" prefix-icon="iconfont icon-denglu"
                        placeholder="请输入账号">
              </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password" label-width="100px">
              <el-input class="in" v-model="loginForm.password" prefix-icon="iconfont icon-mima"
                        placeholder="请输入密码" show-password>
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass" label-width="100px">
              <el-input class="in" v-model="loginForm.checkPass" prefix-icon="iconfont icon-mima"
                        placeholder="请再次输入密码" show-password>
              </el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" label-width="100px">
              <el-input class="in" v-model="loginForm.email" prefix-icon="iconfont icon-shouji"
                        placeholder="请输入邮箱">
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
    const validatePass = (rule, value, callback) => {
      //value：password的值，callback:如果都不满足，则正常提交
      if (value === "") {
        callback(new Error("请输入密码"));//输入为空的提示信息
      } else if (value.length < 6 || value.length > 15) {
        callback(new Error("密码长度须在 6 到 15 个字符"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginFormRef.validateField("checkPass");//如果确认密码不为空，则去validatePass2这个函数
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的邮箱"));
        } else {
          callback();
        }
      }
    };
    return {
      //表单数据
      loginForm: {
        id: "",
        password: "",
        checkPass: "",
        name: "",
        email: "",
      },
      code: "0",
      //指定验证规则
      loginRules: {
        //校验id
        id: [
          {required: true, message: '请输入工号', trigger: 'blur'},
          {min: 8, max: 8, message: '工号长度须为8位数字', trigger: 'blur'}
        ],
        //校验密码
        password: [{required: true, validator: validatePass, trigger: "blur"}],
        checkPass: [{required: true, validator: validatePass2, trigger: "blur"}],
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
        email: [{required: true, validator: validateEmail, trigger: "blur"}],
      },
    };

  },
  methods: {
    resetLoginForm() {//重置用户名和密码方法
      this.$refs.loginFormRef.resetFields();
    },
    submitLoginForm() {
      const _this = this
      this.$refs.loginFormRef.validate(async valid => {
        //1.验证失败则结束
        if (valid) {
          this.$api.loginAPI.register(this.loginForm.name, this.loginForm.id,
              this.loginForm.password, this.loginForm.email).then(resp => {
            console.log(resp)
            if (resp.data.code === 200) {
              _this.$message({
                message: "您已成功注册，请等待管理员审批",
                type: "success"
              })
            }
          }).catch(err => {
            _this.$message({
              message: "该工号已存在，请重新输入",
              type: "error"
            })
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
  width: 45%;
  height: 75%;
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
  justify-content: center;
}

.login_form {
  position: absolute;
  margin-top: 5%;
  width: 100%;
  border: 20px;
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
</style>