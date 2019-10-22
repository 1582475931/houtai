<template>
<div class="hear">
  <div class="right">
        <span>欢迎你：{{name}}</span>
      <el-button type="warning" @click="addto">退出登录</el-button>
  </div>
</div>
</template>
<script>

export default {
    data(){
        return {
            name:'',
        }
    },
    mounted() {
        this.name=sessionStorage.getItem('name')
    },
    methods: {
        addto(){
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("type");
            this.$router.push('/login')
        }
    },
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';
.hear{
    height  80px;
    background color3;
    .right{
        float right ;
        margin-right 50px;
    }
    span{
        color #fff;
        line-height 80px;
        font-size 20px;
        margin-right 20px;
    }
}
</style>