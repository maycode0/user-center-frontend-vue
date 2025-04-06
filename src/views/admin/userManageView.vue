<template>
  <div id="userManageView">
    <a-input-search
      style="max-width: 320px; margin-bottom: 20px"
      v-model:value="searchValue"
      placeholder="请输入用户名"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <a-table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Nameaaaa
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <!-- 暂未使用 -->
        <template v-if="column.dataIndex === 'avatarUrl'">
          <a-image :src="record.avatarUrl" :width="120"></a-image>
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 0">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-button danger @click="doDelete(record.id)">删除</a-button>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { SmileOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { ref } from 'vue'

const searchValue = ref('')
const onSearch = () => {}
const doDelete = (id) => {}
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '操作',
    dataIndex: 'action',
  },
]

const data = [
  {
    id: '1',
    username: 'abc',
    userAccount: '0000',
    gender: '男',
    createTime: Date.now(),
    userRole: 0,
    action: '',
  },
]
</script>
