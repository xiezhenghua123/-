<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-05-08 22:39:26
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-09 20:39:15
-->
<template>
  <view>
    <view v-if="initData.length">
      <view
        v-for="(item, index) in initData"
        :key="index"
        class="container m-10"
        @click="clickToDetails(item)"
      >
        <touch-hover>
          <view class="box">
            <view class="box-left">
              <view class="flex">
                <view class="name">{{ item.content }}</view>
                <view class="tag ml-10">
                  <u-text
                    :text="
                      item.work_order_type == 'partTime' ? '已完成' : '已录取'
                    "
                    type="primary"
                    size="12"
                    bold
                  ></u-text>
                </view>
              </view>
              <text class="type"
                ><text>{{
                  item.work_order_type == 'partTime' ? '兼职' : '全职'
                }}</text></text
              >
            </view>
            <view class="box-right">
              <view class="payMent">{{
                item.work_order_type == 'partTime'
                  ? `${item.salary}元`
                  : fullSalary(item.salary)
              }}</view>
            </view>
          </view>
        </touch-hover>
      </view>
    </view>
    <u-empty v-else> </u-empty>
  </view>
</template>
<script>
import { getApplyJobList } from '@/api/applyJob.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      initData: []
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  mounted() {
    getApplyJobList(this.userInfo.id).then(({ data }) => {
      this.initData = data.filter(item => {
        return item.application_order_status == '1'
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  padding: 15rpx 30rpx;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  .name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .box-right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .payMent {
    color: #02a7f0;
    margin-bottom: 8px;
    font-weight: bold;
  }
}
.flex {
  align-items: stretch;
}
</style>
