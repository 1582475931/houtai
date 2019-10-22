<template>
  <div class="mongadd">
    <el-button type="primary" plain @click="addOn">添加</el-button>
    <el-dialog title="添加家政人员" width="30%" :visible.sync="$store.state.isA">
      <div>
        <p class="p">姓名</p>
        <el-input placeholder="姓名" clearable class="input" v-model="user.name"></el-input>
      </div>
      <div>
        <p class="p">年龄</p>
        <el-input
          placeholder="年龄"
          clearable
          class="input"
          v-model="user.age"
          type="number"
          min="0"
          max="100"
        ></el-input>
      </div>
      <div>
        <p class="p">电话</p>
        <el-input placeholder="电话" clearable class="input" v-model="user.tel"></el-input>
      </div>
      <div>
        <p class="p">资格认证</p>
        <el-checkbox-group v-model="user.qualification">
          <el-checkbox label="身份证" value="身份证"></el-checkbox>
          <el-checkbox label="学位证" value="学位证"></el-checkbox>
          <el-checkbox label="健康证" value="健康证"></el-checkbox>
          <el-checkbox label="母婴护理师证" value="母婴护理师证"></el-checkbox>
          <el-checkbox label="催乳师证" value="催乳师证"></el-checkbox>
          <el-checkbox label="产后恢复师证" value="产后恢复师证"></el-checkbox>
          <el-checkbox label="助理家教管理师" value="助理家教管理师"></el-checkbox>
          <el-checkbox label="家政管理师" value="家政管理师"></el-checkbox>
          <el-checkbox label="高级家政管理师" value="高级家政管理师"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <p class="p">服务项目</p>
        <el-checkbox-group v-model="user.type">
          <el-checkbox label="保姆" value="保姆"></el-checkbox>
          <el-checkbox label="月嫂" value="月嫂"></el-checkbox>
          <el-checkbox label="钟点工" value="钟点工"></el-checkbox>
          <el-checkbox label="母婴护理师证" value="母婴护理师证"></el-checkbox>
          <el-checkbox label="保洁" value="保洁"></el-checkbox>
          <el-checkbox label="家电清洁" value="家电清洁"></el-checkbox>
          <el-checkbox label="家居保养" value="家居保养"></el-checkbox>
          <el-checkbox label="新居开荒" value="新居开荒"></el-checkbox>
        </el-checkbox-group>
      </div>

      <div>
        <p class="p">学历</p>
        <el-select v-model="user.edu" placeholder="请选择" class="input">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <p class="p">工作年限</p>
        <el-input placeholder="工作年限" clearable class="input" v-model="user.year"></el-input>
      </div>
      <div v-if="!dialogVisible">
        <p class="p">级别</p>
        <el-input placeholder="级别" clearable class="input" v-model="user.vNum"></el-input>
      </div>
      <div>
        <p class="p">价格</p>
        <el-input placeholder="价格" clearable class="input" v-model="user.price"></el-input>
      </div>
      <div>
        <p class="p">城市</p>
        <el-input placeholder="城市" clearable class="input" v-model="user.city"></el-input>
      </div>
      <div>
        <p class="p">经验</p>
        <el-input placeholder="经验" clearable class="input" v-model="user.experience"></el-input>
      </div>

      <div>
        <p class="p">点赞人数</p>
        <el-input placeholder="点赞人数" clearable class="input" v-model="user.likeNum"></el-input>
      </div>
      <div v-if="!dialogVisible">
        <p class="p">关注人数</p>
        <el-input placeholder="关注人数" clearable class="input" v-model="user.readNum"></el-input>
      </div>
      <div>
        <p class="p">距离</p>
        <el-input placeholder="距离" clearable class="input" v-model="user.len"></el-input>
      </div>
      <div>
        <p class="p">自我评价</p>
        <el-input placeholder="自我评价" clearable class="input" v-model="user.info"></el-input>
      </div>
      <div>
        <p class="p">免冠图片</p>
        <el-input placeholder="图片" clearable class="input" v-model="user.img"></el-input>
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
        img: "",
        name: "",
        year: "",
        vNum: "",
        img: "",
        qualification: [],
        price: "",
        city: "",
        age: "",
        edu: "",
        experience: "",
        readNum: "",
        likeNum: "",
        len: "",
        tel: "",
        info: "",
        type: []
      },
      options: [
        {
          value: "小学",
          label: "小学"
        },
        {
          value: "初中",
          label: "初中"
        },
        {
          value: "高中",
          label: "高中"
        },
        {
          value: "本科",
          label: "本科"
        },
        {
          value: "研究生",
          label: "研究生"
        },
        {
          value: "博士",
          label: "博士"
        }
      ],
      id: ""
    };
  },
  mounted() {},

  methods: {
    empey() {
      this.user = {
        img: "",
        name: "",
        year: "",
        vNum: "",
        img: "",
        qualification: [],
        price: "",
        city: "",
        age: "",
        edu: "",
        experience: "",
        readNum: "",
        likeNum: "",
        len: "",
        tel: "",
        info: "",
        type: []
      };
    },
    //修改
    addUpdate() {
      this.axios({
        method: "get",
        url: API.updateHomeWorker,
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
        url: API.findHomeWorker,
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

      this.$emit("getC", this.user);
      this.empey();
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