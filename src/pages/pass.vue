<template>
  <div class="pass">
    <h3>{{$route.name}}</h3>

    <div>
      <p class="p">账号</p>
      <el-input v-model="user.name" placeholder="请输入内容" class="input" :disabled="newName!=0"></el-input>
    </div>
    <div>
      <p class="p">旧密码</p>
      <el-input v-model="user.oldpass" placeholder="请输入内容" class="input" show-password></el-input>
    </div>
    <div>
      <p class="p">新密码</p>
      <el-input v-model="user.newpass" placeholder="请输入内容" class="input" show-password></el-input>
    </div>
    <div>
      <p class="p">确认密码</p>
      <el-input placeholder="请输入内容" class="input" v-model="password" show-password></el-input>
    </div>
    <el-button type="success" plain @click="xiugai" class="cheng">修改密码</el-button>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      user: {
        name: "",
        oldpass: "",
        newpass: ""
      },
      newName: "",
      password: ""
    };
  },
  mounted() {
    this.newName = sessionStorage.getItem("name");
    this.user.name = this.newName;
  },
  methods: {
    xiugai() {
      if (this.password != this.user.newpass) {
        this.$message({
          message: "密码不对",
          type: "warning"
        });
        return;
      }
      this.axios({
        method: "post",
        url: API.changePassManage,
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
        console.log(res);
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';

.pass {
  margin-left: 20px;

  h3 {
    font-size: 40px;
    color: mongSize;
    line-height: 60px;
  }

  .input {
    width: 500px;
    margin-top 10px;
  }
  .p{
      text-align center;
      width 100px;
      display inline-block;
  }
  .cheng{
     margin 20px 0 0 250px
  }
}
</style>