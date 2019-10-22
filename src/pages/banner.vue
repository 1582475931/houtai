<template>
  <div class="mong">
    <h3>{{$route.name}}</h3>

    <v-banner @getChild="addto"></v-banner>
    <el-table :data="tableData" height="250" border class="table">
      <el-table-column type="index" width="250" label="序号"></el-table-column>
      <el-table-column label="图片" width="250" height="50px">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt class="img" />
        </template>
      </el-table-column>
      <el-table-column prop="des" label="描述" width="250"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import API from "../common/js/API";
import vBanner from "../components/views/banneradd";
export default {
  components: {
    vBanner
  },
  data() {
    return {
      tableData: [],
      isA: "",
      id: ""
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    //图片添加
    addto(e) {
      this.axios({
        method: "get",
        url: API.addBanner,
        params: e
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.init();
        } else {
          this.$message({
            showClose: true,
            message: res.data.info,
            type: "warning"
          });
        }
      });
    }, //查询
    init() {
      this.axios({
        method: "get",
        url: API.banner
      }).then(res => {
        this.tableData = res.data.data;
      });
    },

    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "get",
            url: API.delBanner,
            params: {
              id: id
            }
          }).then(res => {
            if (res.data.isok) {
              this.init();
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

  img {
    height: 100px;
    width: 230px;
  }
}
</style>