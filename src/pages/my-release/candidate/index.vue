<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-24 21:19:20
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-01 20:05:43
-->
<template>
  <view>
    <view v-for="(item, index) in initData" :key="index" class="m-10">
      <view class="box" @click="clickToPerson">
        <view class="box-left">
          <view class="name">{{ item.name }}</view>
          <view class="expectation">
            期望岗位：<text class="font600">{{ item.expectation }}</text>
          </view>
        </view>
        <view class="box-right">
          <view class="education">{{ item.education }}</view>
          <view class="button">
            <view class="accept mr-10" @click.stop="clickAccept(index, item)">
              <u-button
                :text="item.accept ? '录取' : '接受'"
                type="primary"
              ></u-button>
            </view>
            <u-button text="拒绝" class="reject" type="error"></u-button>
          </view>
        </view>
      </view>
    </view>
    <u-modal
      :show="show"
      title="该职位已有订单正在进行中，是否开启新的订单，并支付金额xx元"
      showCancelButton
      @cancel="show = false"
      @confirm="confirm"
    ></u-modal>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>
<script>
import data from '../../my-resume/data.js'
export default {
  data() {
    return {
      show: false,
      number: 0,
      initData: [
        {
          name: '张三',
          expectation: '产品经理',
          education: '本科',
          accept: false,
        },
        {
          name: '李四',
          expectation: '算法工程师',
          education: '硕士',
          accept: false,
        },
      ],
    }
  },
  onLoad(optios) {
    this.number = optios.number
  },
  methods: {
    clickToPerson() {
      uni.navigateTo({
        url: `/pages/components/person-details/index?data=${JSON.stringify(
          data
        )}`,
      })
    },
    confirm() {
      this.show = false
      this.$refs.uToast.show({
        loading: true,
        message: '支付中',
        type: 'loading',
        complete: data => {
          this.$refs.uToast.show({
            message: `您已成功支付xx元`,
            type: 'success',
          })
        },
      })
    },
    clickAccept(index, item) {
      if (this.number) {
        this.show = true
      }
      this.initData[index].accept = true
    },
  },
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
    .education {
      font-size: 16px;
      font-weight: bold;
      color: #02a7f0;
      margin-bottom: 8px;
    }
  }
}
::v-deep .button {
  display: flex;

  .u-button {
    height: 25px;
  }
}
</style>
