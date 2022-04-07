<template>
 <div>
    <div>
    username<input type="text" v-model="user.username">
    password<input type="password" v-model="user.password">
    </div>
  <input type="button" @click="login" value="登陆">
  <input type="button" @click="register" value="注册">
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      list: []
    }
  },
  methods: {
    login () {
      this.axios.post('/api/login', this.user).then(res => {
        if (res.data !== 'succ') {
          alert(res.data)
          return
        }
        location.href = '/userList'
      })
    },
    register () {
      this.axios.post('/api/register', this.user).then(res => {
        alert(res.data)
      })
    }
  }
}
</script>

<style>

</style>
