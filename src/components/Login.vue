<template>
  <div class="login_container">
    <div class="login_box">
      <div style="text-align:center">大屏登录</div>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" prefix-icon="el-icon-s-goods"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登录表单的数据对象
      form: {
        username: 'admin',
        password: '123456',
      },
      //登录表单的验证规则
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.form)
        if (res.meta.status != 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        //1.将登录成功之后的 token，保存到客户端 sessionStorage中
        //  1.1 项目中除了登录，其他API接口必须携带token
        //  1.2 token只应在当前网站打开期间生效，所以将 token 保存在 sessionSstorage中
        window.sessionStorage.setItem('token', res.data.token)
        //2.通过编程式导航跳转到主页，路由地址是 /home
        this.$router.push('/home')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  .login_box {
    width: 320px;
    height: 280px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 50px 50px 0 50px;
    .el-form {
      margin-top: 30px;
    }
  }
}
</style>