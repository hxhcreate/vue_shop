<template>
  <div>
    <!--  面包屑-->
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    card-->
    <el-card border stripe style='margin-top: 10px;font-size:14px'>
      <el-table :data='rightsList'>
        <el-table-column type='index' />
        <el-table-column label='权限名称' prop='authName'></el-table-column>
        <el-table-column label='路径' prop='path'></el-table-column>
        <el-table-column label='权限等级' prop='level'></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  name: 'Rights',
  data() {
    return {
      //  权限列表
      rightsList: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return ElMessage.error('获取权限列表失败')
      }
      this.rightsList = res.data
      console.log(res.data)
    }
  }
}
</script>

<style scoped>

</style>
