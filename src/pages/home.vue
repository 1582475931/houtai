<template>
  <div class="mong">
    <h3>{{$route.name}}</h3>
    <el-tabs @tab-click="handleClick" v-model="activeName">
      <el-tab-pane label="家政banner" name="家政banner"></el-tab-pane>
      <el-tab-pane label="人员管理" name="人员管理"></el-tab-pane>
    </el-tabs>
    <el-select v-model="value" placeholder="请选择" @focus="add1" v-if="isB==1">
      <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.name"></el-option>
    </el-select>
    <v-home ref="add" @getChild="addto" v-if="isB==0"></v-home>
    <v-guan v-if="isB==1" @getC="addto1" ref="add1"></v-guan>
    <el-table :data="tableData" height="250" border class="table" v-if="isB==0">
      <el-table-column type="index" width="250" label="序号"></el-table-column>
      <el-table-column label="图片" width="500">
        <template slot-scope="scope">
          <img :src="scope.row.img " alt class="img" />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="d" height="250" border class="table" v-ifif="isB==1">
      <el-table-column type="index" width="100" label="序号"></el-table-column>
      <el-table-column prop="name" label="用户名称" width="100"></el-table-column>
      <el-table-column prop="tel" label="电话" width="150"></el-table-column>

      <el-table-column prop="price" label="价格" width="150"></el-table-column>
      <el-table-column prop="age" label="年龄" width="100"></el-table-column>
      <el-table-column prop="edu" label="学历" width="100"></el-table-column>
      <el-table-column prop="type" label="服务类型" width="150"></el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="addClick(scope.row.id)">查看</el-button>
          <el-button type="danger" @click="del1(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import API from "../common/js/API";
import vHome from "../components/views/homeadd";
import vGuan from "../components/views/gunaHome";
export default {
  components: {
    vHome,
    vGuan
  },
  data() {
    return {
      tableData: [],
      d: [],
      isA: "",
      id: "",
      isB: "0",
      activeName: "家政banner",
      options: [
        {
          value: "",
          name: ""
        }
      ],
      value: ""
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    //人员添加
    addto1(e) {
      this.axios({
        method: "get",
        url: API.addHomeWorker,
        params: e
      }).then(res => {
        if (res.data.isok) {
          this.$store.state.isA = false;
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.init1();
        } else {
          this.$message({
            showClose: true,
            message: res.data.info,
            type: "warning"
          });
        }
      });
    },
    addto(e) {
      this.axios({
        method: "get",
        url: API.addHomeBanner,
        params: e
      }).then(res => {
        console.log();
        if (res.data.isok) {
          this.$store.dispatch("changeA", (this.isA = false));
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.init();
        } else {
          this.$message({
            message: res.data.info,
            type: "warning"
          });
        }
      });
    },

    add1() {
      this.axios({
        method: "get",
        url: API.findHomeWorker
      }).then(res => {
        this.options = res.data.data;
      });
    },
    handleClick() {
      switch (this.activeName) {
        case "家政banner":
          this.init();
          this.isB = "0";
          break;
        case "人员管理":
          this.init1();
          this.isB = "1";
          break;
        default:
          break;
      }
    },

    //查询
    init() {
      this.axios({
        method: "get",
        url: API.homeBanner
      }).then(res => {
        this.tableData = res.data.data;
      });
    },

    init1() {
      this.axios({
        method: "get",
        url: API.findHomeWorker
      }).then(res => {
        this.d = res.data.data;
      });
    },

    //查看
    addClick(id) {
      this.$store.dispatch("changeA", (this.isA = true));
      this.id = id;
      this.$refs.add1.find(this.id);
    },
    //删除的封装
    delcom(id, name) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "get",
            url: name,
            params: {
              id: id
            }
          }).then(res => {
            if (res.data.isok) {
              if (name == API.delTeacherTop) {
                this.init2();
                return;
              }
              if (name == API.delHomeWorker) {
                this.init1();
                return;
              }
              if (name == API.delHomeBanner) {
                this.init();
                return;
              }
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    del(id) {
      this.delcom(id, API.delHomeBanner);
    },
    del1(id) {
      this.delcom(id, API.delHomeWorker);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';

.mong {
  margin-left: 20px;

  h3 {
    font-size: 40px;
    color: mongSize;
    line-height: 60px;
  }

  .el-table {
    width: 100%;
    margin: 10px auto;
  }

  .input {
    width: 100px;
    margin-left: 20px;
  }

  .img {
    width: 290px;
    height: 100px;
  }

  >>>.has-gutter {
    width: 80%;
    margin: 0 auto;
  }

}
</style>