<template>
  <div class="left">
    <router-link to="/index/mong" active-class="select" v-if="type==0">管理员管理</router-link>
    <router-link to="/index/banner" active-class="select" v-if="type==1">baren管理</router-link>
    <router-link to="/index/teacher" active-class="select" v-if="type==1">家教管理</router-link>
    <router-link to="/index/water" active-class="select" v-if="type==1">水站管理</router-link>
    <router-link to="/index/repair" active-class="select" v-if="type==1">维修管理</router-link>
    <router-link to="/index/home" active-class="select" v-if="type==1">家政管理</router-link>
    <router-link to="/index/pass" active-class="select" v-if="type==1">密码修改</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type:''
    }
  },
  mounted() {
    this.type=sessionStorage.getItem('type')
  },
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.left {
  width: 150px;
  background: colorLeft;

  a {
    display: block;
    color: #ffffff;
    text-align: center;
    margin: 10px 0;
    text-decoration: none;
    height: 50px;
    line-height: 50px;
  }

  .select {
    background: color4;
  }
}
</style>