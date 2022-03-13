<template>
  <el-container class='home_container'>
    <el-header>
      <div>
        <img class='home_img' src='../assets/img/home_logo.png' alt=''>
        <span>电商后台管理系统</span>
      </div>
      <div>
        <el-button type='info' @click='logout'>退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width='200px'>
        aside
      </el-aside>
      <el-main>
        main
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='less' scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }

}

.home_img {
  height: 50px;
  width: 50px;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.home_container {
  height: 100%;
}
</style>
