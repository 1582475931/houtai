<template>
  <div class="mong">
    <h3>{{$route.name}}</h3>
    <v-mongadd ref="add" @getChild="init"></v-mongadd>

    <el-table :data="tableData" height="250" border class="table">
      <el-table-column type="index" width="180" label="序号"></el-table-column>
      <el-table-column prop="name" label="姓名" width="250"></el-table-column>
      <el-table-column prop="des" label="属性" width="250"></el-table-column>
      <el-table-column label="时间" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.time|time(scope.row.time)}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="addClick(scope.row.id)">查看</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import API from "../common/js/API";
import vMongadd from "../pages/mongadd";
export default {
  components: {
    vMongadd
  },
  data() {
    return {
      tableData: [],
      isA: "",
      id: "",
      username: ""
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    //查询
    init() {
      this.axios({
        method: "post",
        url: API.findManage
      }).then(res => {
        this.tableData = res.data.data;
      });
    },
    //查看
    addClick(id) {
      this.$store.dispatch("changeA", (this.isA = true));
      this.id = id;
      this.$refs.add.find(this.id);
    },
    //添加

    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "post",
            url: API.delManage,
            data: {
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
}
</style>