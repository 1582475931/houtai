<template>
  <div class="mongadd">
    <el-button type="primary" plain @click="addOn">添加</el-button>
    <el-dialog title="添加|修改管理员" width="30%" :visible.sync="$store.state.isA">
      <div>
        <p class="p">账号</p>
        <el-input placeholder="请输入账号" clearable class="input" v-model="user.name" :disabled="dialogVisible"></el-input>
      </div>
      <div>
        <p class="p">密码</p>
        <el-input placeholder="请输入密码" clearable class="input" v-model="user.pass" show-password :disabled="dialogVisible"></el-input>
      </div>
      <div v-if="!dialogVisible">
        <p class="p">确认密码</p>
        <el-input placeholder="确认密码" clearable class="input" v-model="password" show-password></el-input>
      </div>
      <div>
        <p class="p">描述</p>
        <el-input placeholder="请输入描述" clearable class="input" v-model="user.des"></el-input>
      </div>
      <div>
        <p class="p">时间</p>
        <el-date-picker type="date" placeholder="选择日期" class="input" v-model="user.time"></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$store.state.isA=false">取消</el-button>
        <el-button type="primary" @click="add" v-if="!dialogVisible">确 定</el-button>
        <el-button type="primary" @click="addUpdate" v-else>修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      dialogVisible: true,
      is: "",
      user: {
        name: "",
        pass: "",
        time: "",
        des: ""
      },
      password: "",
      id: ""
    };
  },
  mounted() {},

  methods: {
    empey(){
      this.user= {
        name: "",
        pass: "",
        time: "",
        des: ""
      };
    },
    //修改
    addUpdate() {
      this.axios({
        method: "post",
        url: API.updateManage,
        data: this.user
      }).then(res => {
        console.log(res.data.isok);
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.$emit("getChild")
          this.$store.dispatch("changeA", (this.isA = false));
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    },
    find(id) {
       this.dialogVisible=true;
      this.id = id;
      this.axios({
        method: "post",
        url: API.findManage,
        data: {
          id: id
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.isok) {
          this.user = res.data.data[0];
        }
      });
    },
    addOn() {
      this.empey();
      this.dialogVisible=false;
      this.$store.dispatch("changeA", (this.isA = true));
    },
    handleClose() {
      this.$store.state.isA = false;
    },
    add() {
      // this.user = {
      //   name: this.user.name,
      //   pass: this.user.pass,
      //   time: this.user.time.getTime(),
      //   des: this.user.des
      // };
      // console.log(this.user);

      if (this.password == this.user.pass) {
        this.axios({
          method: "post",
          url: API.addManage,
          data: this.user
        }).then(res => {
          if (res.data.isok) {
            this.$store.state.isA = false;
            this.$message({
              message: res.data.info,
              type: "success"
            });
             this.$emit("getChild")
          } else {
            this.$message({
              showClose: true,
              message: res.data.info,
              type: "warning"
            });
          }
        });
      } else {
        this.$message({
          message: "密码不一样",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';

.mongadd {
  display: inline-block;

  >>>.el-dialog {
    width: 425px !important;
    height: 485px;
  }

  >>>.el-dialog__title {
    color: #ff8247;
    font-size: 30px;
  }

  .p {
    display: inline-block;
    width: 50px;
    font-size: 16px;
  }

  .input {
    width: 300px;
    height: 40px;
    margin: 5px 0;
  }
}
</style>