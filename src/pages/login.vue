<template>
  <div class="login">
    <div class="container">
      <div class="header">
        <div class="login-header">
          <img src="http://mi.futurefe.com/imgs/login-logo.png" />
        </div>
      </div>
      <div class="warpeer">
        <div class="login-middle">
          <div class="from">
            <div class="from-tilte">
              <h1>
                <span class="warper">账号登录</span>
                <span class="left">| </span>
                扫码登录
              </h1>
            </div>
            <div class="from-item">
              <el-input
                v-model="itemForm.name"
                placeholder="请输入账号"
              ></el-input>
              <el-input
                v-model="itemForm.password"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </div>
            <div class="from-footer">
              <el-button @click="SignIn()">登录</el-button>
              <div class="fromRegister">
                <a href="javascript:;" @click="PhoneMessage"
                  >手机短信登录/注册</a
                >
                <a href="javascript:;" class="item" @click="register()"
                  >立即注册 |
                  <a href="javascript:;" class="item">忘记密码?</a>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="login-footer">
        <a href="https://www.imooc.com/u/1343480">河畔一角主页</a>
        <span>|</span>
        <a href="https://coding.imooc.com/class/113.html">Vue全栈课程</a>
        <span>|</span>
        <a href="https://coding.imooc.com/class/236.html">React全家桶课程</a>
        <span>|</span>
        <a href="https://coding.imooc.com/class/343.html">微信支付专项课程</a>
        <span>|</span>
        <a href="https://coding.imooc.com/class/392.html"
          >配套课程：Java通用型支付+电商平台双系统实战</a
        >
        <div class="copyright">
          Copyright ©2020 mi.futurefe.com All Rights Reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      //登录信息
      itemForm: {
        name: "",
        password: "",
        userId: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    PhoneMessage() {
      this.$message({
        message: "功能暂未开发",
        type: "success",
      });
    },
    SignIn() {
      this.axios
        .post("/user/login", {
          username: this.itemForm.name,
          password: this.itemForm.password,
        })
        .then((res) => {
          //密码保存时间为1个月
          this.$cookie.set("userId", res.id, {
            expires: "Session",
            domain: "mi.futurefe.com",
          });
          //保存用户名
          this.$store.dispatch("saveUserName", res.username);
          this.$router.push({ name: "index", params: { from: "login" } });
        });
    },
    //注册
    register() {
      this.axios
        .post("/user/register", {
          username: "admi",
          password: "admi",
          email: "admi@163.com",
        })
        .then(() => {
          alert("注册成功");
        });
    },
  },
};
</script>

<style scoped lang="less">
@import "@/css/config.less";
.login {
  .container {
    .header {
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
    }
    .warpeer {
      background: url("http://mi.futurefe.com/imgs/login-bg.jpg") no-repeat
        center;
    }
    .login-header {
      background-color: @colorG;
      height: 100%;
      display: block;
    }
    .login-middle {
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
      padding: 30px 0 30px 0;
      height: 530px;
      position: relative;
      .from {
        background: @colorG;
        position: absolute;
        left: 68%;
        width: 410px;
        height: 500px;
        padding-top: 30px;

        .from-tilte {
          text-align: center;
          margin-bottom: 30px;

          .warper {
            color: @colorA;
            margin-right: 16px;
          }
          .left {
            margin-right: 16px;
          }
        }
        .from-item {
          text-align: center;
          .el-input {
            width: 90%;
            height: 50%;
            margin-bottom: 30px;
          }
        }
        .from-footer {
          width: 90%;
          height: 50%;
          margin-right: auto;
          margin-left: auto;
          .el-button {
            background-color: @colorA;
            color: @colorG;
            border: 1px solid @colorA;
            width: 100%;
            margin-bottom: 10px;
          }
          .fromRegister {
            a {
              display: inline;
              color: @colorA;
              text-decoration: none;
              font-size: 14px;
              margin-right: 30px;
            }
            .item {
              display: inline-block;
              color: #999999;
            }
          }
        }
      }
    }
    .login-footer {
      padding-top: 60px;
      height: 160px;
      text-align: center;

      a {
        display: inline-block;
        text-decoration: none;
        font-size: 16px;
        color: #999999;
        margin-right: 10px;
        text-align: center;
      }

      span {
        color: #999999;
        font-size: 16px;
        margin-right: 10px;
      }
      .copyright {
        color: #999999;
        font-size: 16px;
        margin-top: 15px;
      }
    }
  }
}
</style>
