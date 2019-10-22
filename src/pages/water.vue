<template>
  <div class="mong">
    <h3>{{$route.name}}</h3>
    <el-tabs @tab-click="handleClick" v-model="activeName">
      <el-tab-pane label="水站" name="水站"></el-tab-pane>
      <el-tab-pane label="水站评论" name="水站评论"></el-tab-pane>
    </el-tabs>
    <el-select v-model="value" placeholder="请选择" @focus="add1" v-show="isB==1">
      <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.name"></el-option>
    </el-select>
    <v-waterad ref="add" @getChild="init" v-show="isB==0"></v-waterad>

    <el-table :data="tableData" height="250" border class="table" v-show="isB==0">
      <el-table-column type="index" width="180" label="序号"></el-table-column>
      <el-table-column prop="name" label="水站名称" width="250"></el-table-column>
      <el-table-column prop="tel" label="电话" width="250"></el-table-column>
      <el-table-column label="价格" width="180" prop="price"></el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="addClick(scope.row.id)">查看</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="d" height="250" border class="table" v-show="isB==1">
      <el-table-column type="index" width="180" label="序号"></el-table-column>
      <el-table-column prop="name" label="用户名称" width="250"></el-table-column>
      <el-table-column prop="content" label="评价的内容" width="250"></el-table-column>
      <el-table-column label="时间" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.time|time(scope.row.time)}}</span>
        </template>
      </el-table-column>

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
import vWaterad from "../components/views/wateradd";
export default {
  components: {
    vWaterad
  },
  data() {
    return {
      tableData: [],
      d: [],
      isA: "",
      id: "",
      isB: "0",
      activeName: "水站",
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
    add1() {
      console.log(this.value);
      
      this.axios({
        method: "get",
        url: API.findWater
      }).then(res => {
        this.options = res.data.data;
      });
    },
    handleClick() {
      switch (this.activeName) {
        case "水站":
          this.init();
          this.isB = "0";
          break;
        case "水站评论":
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
        url: API.findWater
      }).then(res => {
        this.tableData = res.data.data;
      });
    },

    init1() {
      this.axios({
        method: "get",
        url: API.findComment
      }).then(res => {
        this.d = res.data.data;
      });
    },

  //查看
    addClick(id) {
      this.$store.dispatch("changeA", (this.isA = true));
      this.id = id;
      this.$refs.add.find(this.id);
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
            url: API.delComment,
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
}
</style>