<template>
<div class="main">
 <v-left></v-left>
 <v-right></v-right>
</div>
</template>
<script>
import vLeft from '../views/left';
import vRight from '../views/right';
export default {
  components:{
vLeft,
vRight
  }
    }
</script>
<style lang="stylus" scoped>
.main{
    flex 1;
    display flex;
    }
</style>