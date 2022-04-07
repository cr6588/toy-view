<template>
  <div>
    <div>
    username<input type="text" v-model="user.usernameLike">
    name<input type="text" v-model="user.nameLike">
    </div>

  <input type="button" @click="fetchData" value="搜索">
  <div class="table-context">
      <table>
          <tr>
              <td>id</td>
              <td>username</td>
              <td>name</td>
              <td>operate</td>
          </tr>
        <tr v-for="u in list" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.username }}</td>
          <td>{{ u.name }}</td>
          <td><input type="button" @click="del(u.id)" value="删除"></td>
        </tr>
      </table>
  </div>
  <a @click="pager.current--;fetchData()">上一页</a>当前页{{ pager.current }},<a @click="pager.current++;fetchData()">下一页</a>,
  每页<select v-model="pager.size" @change="fetchData">
  <option value="10">10</option>
  <option value="20">20</option>
  <option value="50">50</option>
  <option value="100">100</option>
  <option value="200">200</option>
  </select>,
  总数{{ pager.total }}
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      user: {
        usernameLike: '',
        nameLike: ''
      },
      list: [],
      pager: {
        current: 1,
        size: 100,
        total: 0
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const query = Object.assign({}, this.user, this.pager)
      this.axios.get('/api/user', {
        params: query
      }).then(res => {
        const temp = res.data
        this.list = temp.body
        this.pager = temp.pager
      })
    },
    del (id) {
      const data = {
        ids: [id]
      }
      this.axios.delete('/api/user', {
        params: data,
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }
      }).then(res => {
        this.fetchData()
      })
    }
  }
}
</script>

<style scoped>
.table-context {
    max-height: 200px;
    overflow-y: scroll;
}
</style>
