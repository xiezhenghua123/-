<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-05-14 17:07:45
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 18:20:37
-->
<template>
  <view class="m-10">
    <view
      class="box mb-10 flex"
      v-for="item in complainData"
      :key="item.id"
      @click="clickToDetails(item)"
    >
      <view class="name">{{ item.name }}</view>
      <view>{{ item.content }}</view>
    </view>
  </view>
</template>
<script>
import { upStatus } from '@/api/notice.js'
export default {
  data() {
    return {
      complainData: []
    }
  },
  onLoad({ data }) {
    this.complainData = JSON.parse(data).map(item => {
      const data = JSON.parse(item.content)
      return {
        name: data.name,
        content: data.content,
        complainId: data.id,
        id: item.id
      }
    })
  },
  methods: {
    async clickToDetails(item) {
      await upStatus(item.id, { status: '1' })
      console.log('已读成功')
      uni.navigateTo({
        url: `/pages/complain-manage/details/index?id=${item.complainId}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  padding: 30rpx;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  .name {
    font-size: 36rpx;
    font-weight: bold;
  }
}
</style>
