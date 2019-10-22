<template>
  <div class="mongadd" >
    <el-button type="primary" plain @click="addOn">添加</el-button>
    <el-dialog
      title="添加家教排行"
      width="30%"
      :before-close="handleClose"
      :visible.sync="$store.state.isA"
    >

     <div>
    
        <p class="p">图片</p>
        <el-input placeholder="请输入图片" clearable class="input" v-model="user.img" ></el-input>
      </div>
       <div>
    
        <p class="p">机构图片</p>
        <el-input placeholder="机构图片" clearable class="input" v-model="user.teacherImg" ></el-input>
      </div>
        <div>
        <p class="p">报名人数</p>
        <el-input placeholder="报名人数" clearable class="input" v-model="user.num" ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$store.state.isA=false">取消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>

      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
  data() {
    return {
      dialogVisible: false,
      user: {
        img: "",
        num: "",
        teacherImg:""
      },
      id: ""
    };
  },
  mounted() {},


  methods: {
    addOn() {
      this.$store.dispatch("changeA", (this.isA = true));
    },
    handleClose() {
      this.$store.state.isA = false;
    },
    add() {
          this.$emit("getPai",this.user)

       this.user={
        img: "",
        des: ""
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.mongadd {
  display inline-block;
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