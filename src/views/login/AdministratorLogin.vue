<template>
  <div class="administratorLogin">
    <div id="picture">
      <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4"
                     linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
                     :moveSpeed="3"
                     :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
      </vue-particles>

      <div class="login_container">
        <!-- 登录块 -->
        <div class="login_box">
          <!-- 表单区域 -->
          <h1>尊贵的管理员您好!</h1>

          <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginRules"
                   :v-model="submitLoginForm" @keyup.enter.native="submitLoginForm()">

            <!-- 账号 -->
            <el-form-item label="账号" prop="id" label-width="100px">
              <el-input class="in" v-model="loginForm.id" prefix-icon="iconfont icon-denglu" placeholder="请输入账号">
              </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password" label-width="100px">
              <el-input class="in" v-model="loginForm.password" prefix-icon="iconfont icon-mima"
                        placeholder="请输入密码"
                        show-password>
              </el-input>
            </el-form-item>


            <!-- 按钮 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="submitLoginForm()">确定</el-button>
              <el-button type="info" @click="resetLoginForm()">重置</el-button>
            </el-form-item>
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
          // console.log(this.loginForm.id)
          // console.log(this.loginForm.password)
          // this.$axios.get('http://10.16.38.64:8080/api/administration/getadministration?account=z&password=z', {
          // this.$axios.get('http://10.16.38.64:8080/api/administration/getadministration', {
          //   params: {
          //     account: this.loginForm.id,
          //     password: this.loginForm.password
          //   }
          // })
          this.$api.loginApi.administratorLogin(this.loginForm.id, this.loginForm.password)
              .then(res => {
                let data = res.data;
                if (data.code == 8000) {
                  this.$message({
                    message: data.message,
                    type: "error"
                  });
                } else {
                  let accessToken = res.data[0].token;
                  localStorage.setItem("token", accessToken)
                  this.$store.dispatch('asyncUpdateUser', {id: this.loginForm.id})
                  this.$router.push({path: "/admin/hotelInfo"});
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
  bottom: 0%;
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