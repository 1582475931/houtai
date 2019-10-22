<template>
  <div class="mongadd">
    <el-button type="primary" plain @click="addOn">添加</el-button>
    <el-dialog title="添加水站" width="30%" :visible.sync="$store.state.isA">
      <div>
        <p class="p">名称</p>
        <el-input placeholder="名称" clearable class="input" v-model="user.name"></el-input>
      </div>
      <div>
        <p class="p">评分</p>
        <el-input placeholder="评分" clearable class="input" v-model="user.score"></el-input>
      </div>
      <div v-if="!dialogVisible">
        <p class="p">月销售量</p>
        <el-input placeholder="月销售量" clearable class="input" v-model="user.count"></el-input>
      </div>
      <div>
        <p class="p">点赞人数</p>
        <el-input placeholder="点赞人数" clearable class="input" v-model="user.likeNum"></el-input>
      </div>
      <div>
        <p class="p">浏览量</p>
        <el-input placeholder="浏览量" clearable class="input" v-model="user.readNum"></el-input>
      </div>

      <div>
        <p class="p">地址</p>
        <el-input placeholder="地址" clearable class="input" v-model="user.address"></el-input>
      </div>
      <div>
        <p class="p">距离</p>
        <el-input placeholder="距离" clearable class="input" v-model="user.len"></el-input>
      </div>
      <div v-if="!dialogVisible">
        <p class="p">商家信息</p>
        <el-input placeholder="商家信息" clearable class="input" v-model="user.des"></el-input>
      </div>
      <div>
        <p class="p">电话</p>
        <el-input placeholder="电话" clearable class="input" v-model="user.tel"></el-input>
      </div>
      <div>
        <p class="p">价格</p>
        <el-input placeholder="价格" clearable class="input" v-model="user.price"></el-input>
      </div>
      <div>
        <p class="p">图片路径</p>
        <el-input placeholder="图片路径" clearable class="input" v-model="user.img"></el-input>
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
        img: "",
        score: "",
        count: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        des: "",
        tel: "",
        price: ""
      },
      id: ""
    };
  },
  mounted() {},

  methods: {


    empey() {
      this.user = {
        name: "",
        img: "",
        score: "",
        count: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        des: "",
        tel: "",
        price: ""
      };
    },
    //修改
    addUpdate() {
      this.axios({
        method: "get",
        url: API.updateWater,
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
        url: API.findWater,
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
        url: API.addWater,
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