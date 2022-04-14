<template>
    <el-form
      :model="user"
      label-width="120px"
      class="center"
      :rules="rules"
      ref="ruleFormRef"
      v-loading="loading"
    >
      <el-form-item label="username" prop="username">
        <el-input v-model="user.username" class="w200"/>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password"  class="w200" show-password v-model="user.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登陆</el-button>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'Please input username', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async login () {
      await this.$refs.ruleFormRef.validate((valid, fields) => {
        if (valid) {
          this.loading = true
          this.axios.post('/api/login', this.user).then(res => {
            this.loading = false
            this.$router.push('/userList')
          }, () => {
            this.loading = false
          })
        }
      })
    },
    async register () {
      await this.$refs.ruleFormRef.validate((valid, fields) => {
        if (valid) {
          this.loading = true
          this.axios.post('/api/register', this.user).then(res => {
            this.loading = false
            this.$message.success('注册成功')
          }, () => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.center {
  width: 400px;
  margin: 0 auto;
}
.w200 {
  width: 200px
}
</style>
