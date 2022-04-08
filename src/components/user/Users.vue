<template>
  <div>
    <!--  面包屑-->
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{path: '/home'}">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    卡片-->
    <el-card>
      <el-row :gutter='24'>
        <el-col :span='8'>
          <el-input
            placeholder='请输入内容'
            v-model='queryInfo.query'
            clearable
            @clear='getUserList'
          >
            <template #append>
              <el-button
                icon='el-icon-search'
                @click='getUserList'
              />
            </template>
          </el-input>
        </el-col>
        <el-col :span='4'>
          <el-button
            type='primary'
            @click='addDialogVisible = true'
          >
            添加用户
          </el-button>
        </el-col>
      </el-row>
      <el-table
        :data='userList'
        border
        stripe
        style='margin-top: 20px;font-size:14px'
      >
        <el-table-column type='index' />
        <el-table-column
          label='姓名'
          prop='username'
        />
        <el-table-column
          label='邮箱'
          prop='email'
        />
        <el-table-column
          label='电话'
          prop='mobile'
        />
        <el-table-column
          label='角色'
          prop='role_name'
        />
        <el-table-column label='状态'>
          <template #default='scope'>
            <el-switch
              v-model='scope.row.mg_state '
              @change='userStateChange(scope.row)'
            />
          </template>
        </el-table-column>
        <el-table-column
          label='操作'
          width='190px'
        >
          <template #default='scope'>
            <el-tooltip
              content='编辑用户'
              effect='dark'
              placement='top'
              :enterable='false'
            >
              <el-button
                type='primary'
                icon='el-icon-edit'
                size='mini'
                @click='showEditDialog(scope.row.id)'
              />
            </el-tooltip>
            <el-tooltip
              content='删除用户'
              effect='dark'
              placement='top'
              :enterable='false'
            >
              <el-button
                type='danger'
                icon='el-icon-delete'
                size='mini'
                @click='delUser(scope.row.id)'
              />
            </el-tooltip>
            <el-tooltip
              content='分配角色'
              effect='dark'
              placement='top'
              :enterable='false'
            >
              <el-button
                type='warning'
                icon='el-icon-setting'
                size='mini'
                @click='setRole(scope.row)'
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!--      分页区域-->
      <el-pagination
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
        :current-page='queryInfo.pagenum'
        :page-sizes='[1,3,5,10]'
        :page-size='queryInfo.pagesize'
        :total='total'
        layout='total, sizes, prev, pager, next, jumper'
        style='margin-top: 15px;'
      />
    </el-card>

    <!--    新增用户对话框-->
    <el-dialog
      title='提示'
      v-model='addDialogVisible'
      width='50%'
      @close='addDialogClosed'
    >
      <el-form
        ref='addUserForm'
        :model='addUserForm'
        :rules='addUserRules'
        label-width='70px'
      >
        <el-form-item
          label='用户名'
          prop='username'
        >
          <el-input v-model='addUserForm.username' />
        </el-form-item>
        <el-form-item
          label='密码'
          prop='password'
        >
          <el-input v-model='addUserForm.password' />
        </el-form-item>
        <el-form-item
          label='邮箱'
          prop='email'
        >
          <el-input v-model='addUserForm.email' />
        </el-form-item>
        <el-form-item
          label='电话'
          prop='mobile'
        >
          <el-input v-model='addUserForm.mobile' />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class='dialog-footer'>
          <el-button @click='addDialogVisible = false'>取消</el-button>
          <el-button
            type='primary'
            @click='addUser'
          >确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!--    修改用户对话框-->
    <el-dialog
      title='提示'
      v-model='editDialogVisible'
      width='50%'
    >
      <el-form
        ref='editUserForm'
        :model='editUserForm'
        :rules='editUserRules'
        label-width='70px'
      >
        <el-form-item
          label='用户名'
          prop='username'
        >
          <el-input
            v-model='editUserForm.username'
            disabled
          />
        </el-form-item>
        <el-form-item
          label='邮箱'
          prop='email'
        >
          <el-input v-model='editUserForm.email' />
        </el-form-item>
        <el-form-item
          label='电话'
          prop='mobile'
        >
          <el-input v-model='editUserForm.mobile' />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class='dialog-footer'>
          <el-button @click='editDialogVisible = false'>取消</el-button>
          <el-button
            type='primary'
            @click='editUser()'
          >确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--分配角色对话框-->
    <el-dialog
      title='分配权限'
      v-model='setRoleDialogVisible'
      width='50%'
      @close='setRoleDialogClosed'
    >
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的角色： {{ userInfo.role_name }}</p>
        <p>要分配的角色：
          <el-select v-model='selectedRoleId' class='m-2' placeholder='Select' size='large'>
            <el-option
              v-for='role in rolesList' :key='role.id'
              :label='role.roleName'
              :value='role.id'
            />
          </el-select>
        </p>
      </div>
      <template #footer>
        <span class='dialog-footer'>
          <el-button @click='setRoleDialogVisible = false'>取消</el-button>
          <el-button
            type='primary'
            @click='allotRole()'
          >确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { ElMessageBox, ElMessage } from 'element-plus'


export default {
  name: 'Users',
  components: {},
  created() {
    this.getUserList()
  },
  data() {
    let checkEmail = (rule, value, cb) => {
      const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }
    let checkPhone = (rule, value, cb) => {
      const regMobile = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法手机号'))  //申明的回调函数
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '请输入有效名字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码长度3到15位', trigger: 'blur' },
          { min: 3, max: 15 }
        ],
        mobile: [
          { required: true, message: '电话号码不正确', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱格式不正确', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editUserForm: {},  //直接不设初值  使用请求的返回data
      editUserRules: {
        mobile: [
          { required: true, message: '电话号码不正确', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱格式不正确', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      setRoleDialogVisible: false,
      userInfo: {}, //需要被分配的用户信息
      rolesList: [], //所有的角色列表
      selectedRoleId: ''
    }
  },
  methods: {
    async getUserList() {
      //promise对象标准解析方法
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userList = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    async userStateChange(userInfo) {
      const { data: res } = await this.$http.put('users/' + userInfo.id + '/state/' + userInfo.mg_state)
      console.log(res)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('修改用户状态失败')
      }
      return this.$message.success('修改用户状态成功')

    },
    //监听Pagesize改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    //监听页码改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    //重置我的表单
    addDialogClosed() {
      this.$refs.addUserForm.resetFields()
      this.addDialogVisible = false
    },
    //  表单你预校验
    addUser() {
      this.$refs.addUserForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addUserForm)
        if (res.meta.status !== 201) {
          return this.$message.error('新增用户失败')
        }
        await this.getUserList()
        this.addDialogVisible = false
        return this.$message.success('添加成功')
      })
    },
    async showEditDialog(id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户信息失败！')
      }
      this.editUserForm = res.data
      this.editDialogVisible = true
    },
    editUser() {
      this.$refs.editUserForm.validate(async valid => {
          if (!valid) {
            return
          }
          const { data: res } = await this.$http.put('users/' + this.editUserForm.id, {
            mobile: this.editUserForm.mobile,
            email: this.editUserForm.email
          })
          if (res.meta.status !== 200) {
            return this.$message.error('修改失败')
          }
          this.editDialogVisible = false
          return this.$message.success('修改成功')

        }
      )
    },
    delUser(id) {
      ElMessageBox.confirm(
        '你确定要删除该用户吗?',
        'Warning',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async () => {
          const { data: res } = await this.$http.delete('users/' + id)
          if (res.meta.status !== 200) {
            return ElMessage({
              type: 'error',
              message: '删除失败'
            })

          }
          await this.getUserList()
          return ElMessage({
            type: 'success',
            message: '成功删除'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除'
          })

        })
    },
    setRoleDialogClosed() {
      this.selectedRoleId = ''
      this.userInfo = []
    },
    async setRole(userInfo) {
      this.userInfo = userInfo
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return ElMessage.error('获取角色信息失败')
      }
      this.rolesList = res.data

      this.setRoleDialogVisible = true
    },
    async allotRole() {
      if (!this.selectedRoleId) {
        ElMessage.error('请选择分配角色')
      }
      const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, { rid: this.selectedRoleId })
      if (res.meta.status !== 200) {
        ElMessage.error('分配角色失败')
      }
      ElMessage.success('分配角色成功')
      await this.getUserList()
      this.setRoleDialogVisible = false
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
