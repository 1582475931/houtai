<template>
  <div class="box">
    <div class="login">
      <h3>登录</h3>
      <el-select v-model="user.type" clearable placeholder="请选择角色" class="input">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input placeholder="请输入用户名" v-model="user.name" clearable class="input"></el-input>

      <el-input placeholder="请输入内密码" v-model="user.pass" clearable class="input" show-password></el-input>
      <el-button type="success" @click="on">成功按钮</el-button>
    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ],
      user: {
        name: "",
        pass: "",
        type: ""
      }
    };
  },
  methods: {
    on() {
      this.axios({
        method: "post",
        url: API.login,
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
            sessionStorage.setItem("type", res.data.type);
          sessionStorage.setItem('name',this.user.name)
          this.$router.push("/index");
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';

.box {
  background: red;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.login {
  width: 400px;
  height: 300px;
  background: color1;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;

  h3 {
    font-size: 34px;
    text-align: center;
    line-height: 70px;
    color: color2;
  }

  .input {
    width: 320px;
    margin-bottom: 10px;
  }
}
</style>