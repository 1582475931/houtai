<template>
  <div class="mongadd">
    <el-button type="primary" plain @click="addOn">添加</el-button>
    <el-dialog title="添加维修" width="30%" :visible.sync="$store.state.isA">
      <div>
        <p class="p">名称</p>
        <el-input placeholder="名称" clearable class="input" v-model="user.name"></el-input>
      </div>
      <div>
        <p class="p">评分</p>
        <el-input placeholder="评分" type="number" clearable class="input" v-model="user.score" max="5" min="0"></el-input>
      </div>
      <div >
        <p class="p">类型</p>
        <el-input placeholder="类型" clearable class="input" v-model="user.type" ></el-input>
      </div>
      <div>
        <p class="p">点赞数量</p>
        <el-input placeholder="点赞数量" clearable class="input" v-model="user.likeNum"></el-input>
      </div>
      <div>
        <p class="p">关注人数</p>
        <el-input placeholder="关注人数" clearable class="input" v-model="user.readNum"></el-input>
      </div>
      <div>
        <p class="p">地址</p>
        <el-input placeholder="地址" clearable class="input" v-model="user.address"></el-input>
      </div>
      <div>
        <p class="p">距离</p>
        <el-input placeholder="距离" clearable class="input" v-model="user.len"></el-input>
      </div>
      <div >
        <p class="p">商家信息</p>
        <el-input placeholder="商家信息" clearable class="input" v-model="user.info"></el-input>
      </div>
      <div>
        <p class="p">电话</p>
        <el-input placeholder="电话" clearable class="input" v-model="user.tel"></el-input>
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
import API from "../../common/js/API";
export default {
  data() {
    return {
      dialogVisible: true,
      is: "",
      user: {
        name: "",
        score: "",
        type: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        info: "",
        tel: "",
      },
      id: ""
    };
  },
  mounted() {},

  methods: {

    empey() {
      this.user = {
       name: "",
        score: "",
        type: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        info: "",
        tel: "",
      };
    },
    //修改
    addUpdate() {
      this.axios({
        method: "get",
        url: API.updateRepair,
        params: this.user
      }).then(res => {
        console.log(res.data.isok);
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.$emit("getChild");
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
      this.dialogVisible = true;
      this.id = id;
      this.axios({
        method: "get",
        url: API.findRepair,
        params: {
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
      this.dialogVisible = false;
      this.$store.dispatch("changeA", (this.isA = true));
    },
    handleClose() {
      this.$store.state.isA = false;
    },
    add() {
      console.log(this.user);

      this.axios({
        method: "get",
        url: API.addRepair,
        params: this.user
      }).then(res => {
        if (res.data.isok) {
          this.$store.state.isA = false;
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.$emit("getChild");
        } else {
          this.$message({
            showClose: true,
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
@import '../../common/stylus/index.styl';

.mongadd {
  display: inline-block;

  >>>.el-dialog {
    width: 425px !important;
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