<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-05-14 17:07:45
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-15 17:10:52
-->
<template>
  <view class="m-10">
    <view v-if="complainData.length">
      <view
        class="box mb-10 flex"
        v-for="item in complainData"
        :key="item.id"
        @click="clickToDetails(item)"
      >
        <view class="name">
          <view class="mr-10">{{ item.name }}</view>
          <view :class="[item.status == 2 ? 'unRead' : 'read', 'status']">{{
            item.status == 2 ? '未读' : '已读'
          }}</view>
        </view>
        <view>{{ item.content }}</view>
      </view>
    </view>
    <u-empty v-else text="暂无投诉通知"></u-empty>
  </view>
</template>
<script>
import { upStatus } from '@/api/notice.js'
import { getNotice } from '@/api/notice.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      complainData: []
    }
  },
  computed: {
    ...mapState('appState', ['userInfo', 'identity'])
  },
  async onShow() {
    const noticeData = await getNotice(this.userInfo.openid)
    const userType = this.identity == 'student' ? '1' : '2'
    const complainData = noticeData.data.filter(item => {
      const content = JSON.parse(item.content)
      return content.type == 'complain' && content.userType == userType
    })
    this.complainData = complainData.map(item => {
      const data = JSON.parse(item.content)
      return {
        name: data.name,
        content: data.content,
        complainId: data.id,
        id: item.id,
        status: item.status
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
    display: flex;
    font-size: 36rpx;
    font-weight: bold;
    align-items: flex-start;
  }
  .status {
    font-size: 24rpx;
    font-weight: normal;
    border-radius: 3px;
    padding: 4rpx 6rpx;
  }
  .read {
    background: $uni-color-success;
    color: rgb(6, 121, 197);
  }
  .unRead {
    background: $uni-color-primary;
    color: rgb(218, 248, 81);
  }
}
</style>
