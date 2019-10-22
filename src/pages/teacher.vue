<template>
  <div class="mong">
    <h3>{{$route.name}}</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家教banner" name="first"></el-tab-pane>
      <el-tab-pane label="家教类型" name="second"></el-tab-pane>
      <el-tab-pane label="家教排行" name="third"></el-tab-pane>
    </el-tabs>

    <v-jiajiao @getChild="addto" v-if="isAdd==0"></v-jiajiao>
    <v-type v-if="isAdd==1" @getType="gettype"></v-type>
    <v-paihang v-if="isAdd==2" @getPai="pai"></v-paihang>
    
    <!-- 家教banner -->
    <el-table :data="tableData" height="250" border class="table" v-show="isAdd==0">
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

    <!-- 家教类型 -->
    <el-table :data="d" height="250" border class="table" v-show="isAdd==1">
      <el-table-column type="index" width="250" label="序号"></el-table-column>
      <el-table-column label="图片" width="250" height="50px">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt class="img" />
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="250"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" @click="del1(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 家教排行 -->
    <el-table :data="d1" height="250" border class="table" v-show="isAdd==2">
      <el-table-column type="index" width="180" label="序号"></el-table-column>
      <el-table-column label="图片" width="250" height="50px">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt class="img" />
        </template>
      </el-table-column>

      <el-table-column prop="num" label="报名人数" width="150"></el-table-column>
      <el-table-column label="图片" width="250" height="50px">
        <template slot-scope="scope">
          <img :src="scope.row.teacherImg" alt class="img" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" @click="del2(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import API from "../common/js/API";
import vBanner from "../components/views/banneradd";
import vPaihang from "../components/views/paihang";
import vType from "../components/views/teacherType.vue";
import vJiajiao from "../components/views/jiajiao";
export default {
  components: {
    vJiajiao,
    vType,
    vPaihang
  },
  data() {
    return {
      tableData: [],
      d: [],
      d1: [],
      isA: "",
      id: "",
      activeName: "first",
      isAdd: "0"
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //添加的封装
    com(e, name) {
      this.axios({
        method: "get",
        url: name,
        params: e
      }).then(res => {
        if (res.data.isok) {
          this.$store.state.isA = false;
          this.$message({
            message: res.data.info,
            type: "success"
          });
          if (name == API.addTeacherTop) {
            this.init2();
            return;
          }
          if (name == API.addTeacherType) {
            this.init1();
            return;
          }
          if (name == API.addTeacherBanner) {
            this.init();
            return;
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.info,
            type: "warning"
          });
        }
      });
    },

    //添加家教banner
    addto(e) {
      this.com(e, API.addTeacherBanner);
    },
    //类型
    gettype(e) {
      this.com(e, API.addTeacherType);
    },
    //排行
    pai(e) {
      this.com(e, API.addTeacherTop);
    },
    handleClick() {
      switch (this.activeName) {
        case "first":
          this.init();
          this.isAdd = "0";
          break;
        case "second":
          this.init1();
          this.isAdd = "1";
          break;

        case "third":
          this.init2();
          this.isAdd = "2";
          break;
        default:
          break;
      }
    },

    //查询
    init() {
      this.axios({
        method: "get",
        url: API.teacherBanner
      }).then(res => {
        this.tableData = res.data.data;
      });
    },
    init1() {
      this.axios({
        method: "get",
        url: API.teacherType
      }).then(res => {
        this.d = res.data.data;
      });
    },
    init2() {
      this.axios({
        method: "get",
        url: API.teacherTop
      }).then(res => {
        this.d1 = res.data.data;
      });
    },

    //删除的封装
    delcom(id,name) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "get",
            url:name,
            params: {
              id: id
            }
          }).then(res => {
            if (res.data.isok) {
              if (name == API.delTeacherTop) {
            this.init2();
            return;
          }
          if (name == API.delTeacherType) {
            this.init1();
            return;
          }
          if (name ==API.delTeacherBanner) {
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
      this.delcom(id, API.delTeacherBanner);
    },

    del1(id) {
       this.delcom(id, API.delTeacherType);
    },

    del2(id) {
       this.delcom(id, API.delTeacherTop);
     
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