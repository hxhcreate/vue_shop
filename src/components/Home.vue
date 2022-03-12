<template>
<div class="home">
  <el-button type="info" @click="logout">退出登录</el-button>
</div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return{

    }
  },
  methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>

</style>
