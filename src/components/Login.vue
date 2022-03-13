

<template>
  <div class='login_container'>
    <div class='login_box'>
      <!--    头像区域-->
      <div class='avator_box'>
        <img src='../assets/img/logo.png' alt=''>
      </div>
      <!--    表单区域-->
      <el-form class='login_form' :model='loginForm' :rules='loginRules' ref='loginForm'>
        <el-form-item prop='username'>
          <el-input v-model='loginForm.username' placeholder='请输入用户名'>
            <template #prefix>
              <el-icon class='el-input__icon user_icon' :size='23'>
                <user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input v-model='loginForm.password' type='password' placeholder='请输入密码'>
            <template #prefix>
              <el-icon class='el-input__icon user_icon' :size='23'>
                <lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class='btn'>
          <el-button type='primary' @click='onSubmit'>登录</el-button>
          <el-button type='info' @click='onReset'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '用户名需要', trigger: 'blur' },
          { min: 3, max: 20, message: '用户名长度应在3~20', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码需要', trigger: 'blur' },
          { min: 3, max: 20, message: '密码长度应在3~20', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        //console.log(this);
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)   //发送请求
        if (res.meta.status !== 200) return ElMessage.error('登录失败')
        ElMessage.success('登录成功')

        //console.log(res);
        //记录token 保存到sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        //  编程方式导航跳转路由
        await this.$router.push('/home')
      })
    },
    onReset() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>


<style lang='less' scoped>
.login_container {
  background-color: #2d4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.avator_box {
  height: 120px;
  width: 120px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box; // 控制box是否绘制在父元素外面
}

.btn {
  display: flex;
  justify-content: flex-end;
}

.user_icon {
  transform: translateY(15%);
}
</style>
