<template>
  <div>
    <!--  面包屑-->
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    card-->
    <el-card border stripe style='margin-top: 10px'>
      <el-row :gutter='10'>
        <el-col :span='6'>
          <el-button type='primary' @click='addDialogVisible = true'>添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data='roleList'>
        <el-table-column type='expand'></el-table-column>
        <el-table-column type='index' />
        <el-table-column label='角色名称' prop='roleName'></el-table-column>
        <el-table-column label='角色描述' prop='roleDesc'></el-table-column>
        <el-table-column label='操作' width='300px'>
          <template #default='scope'>
            <el-button type='primary' size='small'>编辑</el-button>
            <el-button type='danger' size='small'>删除</el-button>
            <el-button type='warning' size='small'>分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--    新增角色对话框-->
    <el-dialog title='提示' v-model='addDialogVisible' width='50%'
               @close='addDialogClosed'
    >
      <el-form ref='addRoleForm'
               :model='addRoleForm'
               :rules='addRoleRules'
               label-width='70px'
      >
        <el-form-item label='角色名称' prop='roleName'>
          <el-input v-model='addRoleForm.roleName'></el-input>
        </el-form-item>
        <el-form-item label='角色描述' prop='roleDesc'>
          <el-input v-model='addRoleForm.roleDesc'></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
          <span class='dialog-footer'>
          <el-button @click='addDialogVisible = false'>取消</el-button>
          <el-button type='primary' @click='addRole'>确定</el-button>
          </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  name: 'Roles',
  data() {
    return {
      roleList: [],
      addDialogVisible: false,
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      addRoleRules: {
        roleName: [
          { required: true, message: '请输入有效名字', trigger: 'blur' },
          { min: 3, max: 15 }
        ],
        roleDesc: [
          { required: false, message: '请输入有效描述', trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return ElMessage.error('获取角色列表失败')
      }
      this.roleList = res.data
    },
    addDialogClosed() {
      this.$refs.addRoleForm.resetFields()
      this.addDialogVisible = false
    },
    async addRole() {
      await this.$refs.addRoleForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('roles', this.addRoleForm)
        if (res.meta.status !== 201) {
          return ElMessage.error('添加角色失败')
        }
        this.addDialogVisible = false
        await this.getRolesList()
        ElMessage.success('添加角色成功')
      })
    }
  }
}
</script>

<style scoped>

</style>
