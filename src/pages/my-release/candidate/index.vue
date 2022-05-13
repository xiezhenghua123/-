<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-24 21:19:20
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 20:38:14
-->
<template>
  <view>
    <toast></toast>
    <view v-if="initData.length">
      <view v-for="(item, index) in initData" :key="index" class="m-10">
        <view class="box" @click="clickToPerson(item)">
          <view class="box-left flex">
            <u-avatar :src="item.worker_avatar" size="24"></u-avatar>
            <view class="name ml-10">{{ item.worker_name }}</view>
            <!-- <view class="expectation">
              期望岗位：<text class="font600">{{ item.expectation }}</text>
            </view> -->
          </view>
          <view class="box-right">
            <!-- <view class="education">{{ item.education }}</view> -->
            <view v-if="item.work_order_type == 'partTime'" class="flex">
              <view v-if="item.application_order_status == 2" class="flex">
                <view
                  class="accept mr-10"
                  @click.stop="clickAccept(item, index)"
                >
                  <u-button text="接受" type="primary" size="mini"></u-button>
                </view>
                <view @click.stop="reject(item, index)">
                  <u-button
                    text="拒绝"
                    class="reject"
                    type="error"
                    size="mini"
                  ></u-button>
                </view>
              </view>
              <view
                class="accept mr-10"
                @click.stop="comFirmComplete(item, index)"
                v-else-if="item.application_order_status == 5"
              >
                <u-button text="确认完成" type="primary" size="mini"></u-button>
              </view>
              <u-text
                :text="
                  getStatusText(
                    item.application_order_status,
                    item.work_order_type
                  )
                "
                type="primary"
                size="12"
                bold
                v-else
              >
              </u-text>
              <view @click.stop="clickToComplainant(item)" class="ml-10">
                <u-button text="投诉" type="error" size="mini"></u-button>
              </view>
            </view>
            <view class="button" v-else>
              <view v-if="item.application_order_status == 2" class="flex">
                <view
                  class="accept mr-10"
                  @click.stop="clickAccept(item, index)"
                >
                  <u-button text="录取" type="primary" size="mini"></u-button>
                </view>
                <view @click.stop="reject(item, index)">
                  <u-button
                    text="拒绝"
                    class="reject"
                    type="error"
                    size="mini"
                  ></u-button>
                </view>
              </view>
              <u-text
                :text="
                  getStatusText(
                    item.application_order_status,
                    item.work_order_type
                  )
                "
                type="primary"
                size="12"
                bold
                v-else
              >
              </u-text>
              <view @click.stop="clickToComplainant(item)" class="ml-10">
                <u-button text="投诉" type="error" size="mini"></u-button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <u-empty text="暂无应聘者" v-else></u-empty>
    <u-modal
      :show="show"
      :title="`该职位已有订单正在进行中，是否开启新的订单，并支付金额${salary}元`"
      showCancelButton
      @cancel="show = false"
      @confirm="confirm"
    ></u-modal>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>
<script>
import { getJobApplyPerson } from '@/api/recruit.js'
import { getMyResume } from '@/api/resume.js'
import { cancelApply } from '@/api/applyJob.js'
import { successToast } from '@/components/toast/index.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      initData: [],
      show: false,
      partTime: {},
      salary: 0
    }
  },
  onLoad({ id }) {
    this.id = id
    getJobApplyPerson(this.id).then(({ data }) => {
      this.initData = data
    })
  },
  computed: {
    ...mapState('appState', ['userInfo', 'identity']),
    isAgain() {
      return this.initData.some(item => {
        return (
          item.application_order_status == '0' ||
          item.application_order_status == '1'
        )
      })
    }
  },
  methods: {
    clickToComplainant(item) {
      uni.navigateTo({
        url: `/pages/complain-manage/complainant-upload/index?data=${JSON.stringify(
          {
            work_order_id: item.work_order_id,
            toId: item.worker_id.toString(),
            toName: item.worker_name,
            toType: '1',
            work: item.content,
            toOpenid: item.openid
          }
        )}`
      })
    },
    // 应聘状态文字
    getStatusText(status, type) {
      if (type == 'partTime') {
        switch (status) {
          case '0':
            return '进行中'
            break
          case '1':
            return '已完成'
            break

          case '3':
            return '您已拒绝该求职者'
            break
          case '4':
            return '求职者已取消应聘'
            break
        }
      } else {
        switch (status) {
          case '1':
            return '已录取该求职者'
            break
          case '3':
            return '您已拒绝该求职者'
            break
          case '4':
            return '求职者已取消应聘'
            break
        }
      }
    },
    async clickToPerson(item) {
      const data = await getMyResume(item.openid)
      uni.navigateTo({
        url: `/pages/components/person-details/index?data=${JSON.stringify(
          data.data
        )}&init=${JSON.stringify({
          uuid: item.openid + item.worker_id,
          name: item.worker_name,
          avatar: item.worker_avatar
        })}`
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
            message: `您已成功支付${this.salary}元`,
            type: 'success'
          })
          this.partTimeAccept()
        }
      })
    },
    clickAccept(item, index) {
      if (item.work_order_type == 'partTime') {
        this.salary = item.salary
        this.partTime = {
          item: item,
          index: index
        }
        if (this.isAgain) {
          this.show = true
          return
        }
        this.partTimeAccept()
      } else {
        cancelApply(item.id, { status: 1 }).then(() => {
          successToast('提交成功')
          this.initData[index].application_order_status = '1'
        })
      }
    },
    partTimeAccept() {
      cancelApply(this.partTime.item.id, { status: '0' }).then(() => {
        successToast('提交成功')
        this.initData[this.partTime.index].application_order_status = '0'
      })
    },
    reject(item, index) {
      cancelApply(item.id, { status: 3 }).then(() => {
        successToast('提交成功')
        this.initData[index].application_order_status = '3'
      })
    },
    comFirmComplete(item, index) {
      cancelApply(item.id, { status: 1 }).then(() => {
        successToast('提交成功')
        this.initData[index].application_order_status = '1'
      })
    }
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
  }

  .box-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    .education {
      font-size: 16px;
      font-weight: bold;
      color: #02a7f0;
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
