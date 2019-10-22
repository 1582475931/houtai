<template>
<div class="index">
   <v-hear></v-hear>
   <v-main></v-main>
</div>
</template>
<script>
import vHear from '../components/views/hear';
import vMain from '../components/views/main'
export default {
    components:{
        vHear,
        vMain
    }
}
</script>
<style lang="stylus" scoped>
.index{
    display flex;
    width 100vw;
    height 100vh;
    flex-direction column;
    }
</style>