<template>
  <div>
    <div>
    username<input type="text" v-model="user.usernameLike">
    name<input type="text" v-model="user.nameLike">
    </div>

  <input type="button" @click="fetchData" value="搜索">
  <el-table :data="list" stripe style="width: 100%" v-loading="loading" height="250">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="username" label="username" width="180" />
    <el-table-column prop="name" label="name" width="180" />
    <el-table-column label="operate">
      <template #default="scope">
        <el-button size="small" @click="del(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :page-sizes="[10, 20, 50, 100, 200]"
    background
    layout="prev, pager, next, jumper, total, sizes, "
    :total="pager.total"
    v-model:page-size="pager.size"
    v-model:currentPage="pager.current"
    @size-change="fetchData"
    @current-change="fetchData"
  >
  </el-pagination>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      loading: false,
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
      this.loading = true
      const query = Object.assign({}, this.user, this.pager)
      this.axios.get('/api/user', {
        params: query
      }).then(res => {
        this.list = res.body
        this.pager = res.pager
        this.loading = false
      })
    },
    del (id) {
      const data = {
        ids: [id]
      }
      this.loading = true
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
