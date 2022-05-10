<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-09 22:54:07
-->
<template>
  <view>
    <toast></toast>
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
                      item.work_order_status == 2
                        ? getStatusText(
                            item.application_order_status,
                            'partTime'
                          )
                        : '雇主已停止招聘'
                    "
                    type="primary"
                    size="12"
                    bold
                    v-if="item.work_order_type == 'partTime'"
                  ></u-text>
                  <u-text
                    :text="
                      item.work_order_status == 2
                        ? getStatusText(
                            item.application_order_status,
                            'fullTime'
                          )
                        : '企业已停止招聘'
                    "
                    type="primary"
                    size="12"
                    bold
                    v-else
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
              <view class="flex">
                <view
                  class="button"
                  @click.native.stop="
                    complete(item.id, item.application_order_status)
                  "
                  v-if="item.work_order_type == 'partTime'"
                >
                  <u-button
                    text="确认完成"
                    type="primary"
                    :disabled="item.application_order_status != 0"
                    size="mini"
                  ></u-button>
                </view>
                <view
                  class="button ml-10"
                  @click.native.stop="
                    cancel(
                      item.id,
                      item.application_order_status,
                      item.work_order_status
                    )
                  "
                >
                  <u-button
                    text="取消应聘"
                    type="error"
                    size="mini"
                    :disabled="
                      item.work_order_status != 2 ||
                      item.application_order_status == 1 ||
                      item.application_order_status == 3 ||
                      item.application_order_status == 4
                    "
                  ></u-button>
                </view>
              </view>
            </view>
          </view>
        </touch-hover>
      </view>
    </view>
    <u-empty text="暂无应聘职位" v-else></u-empty>
  </view>
</template>

<script>
import touchHover from '../../../../components/touch-hover/touch-hover.vue'
import { getApplyJobList, cancelApply } from '@/api/applyJob.js'
import { mapState } from 'vuex'
import { successToast } from '@/components/toast/index.js'
export default {
  components: { touchHover },
  data() {
    return {
      initData: []
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    // 兼容小程序的空函数
    emptyF() {},
    init() {
      getApplyJobList(this.userInfo.id).then(({ data }) => {
        this.initData = data
      })
    },
    // 全职薪资
    fullSalary(salary) {
      const data = JSON.parse(salary)
      return `${data.min}k-${data.max}k`
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
          case '2':
            return '待雇主接受'
            break
          case '3':
            return '雇主已拒绝'
            break
          case '4':
            return '已取消应聘'
            break
          case '5':
            return '待雇主确认完成'
            break
        }
      } else {
        switch (status) {
          case '1':
            return '已录取'
            break
          case '2':
            return '待企业录取'
            break
          case '3':
            return '企业已拒绝'
            break
          case '4':
            return '已取消应聘'
            break
        }
      }
    },
    clickToDetails(item) {
      if (item.type === '全职') {
        uni.navigateTo({
          url: `/pages/components/fullTime-details/index?id=${item.work_order_id}&key=applyOrder`
        })
      } else {
        uni.navigateTo({
          url: `/pages/components/partTime-details/index?id=${item.work_order_id}&key=applyOrder`
        })
      }
    },
    complete(id, status) {
      if (status != 0) {
        return
      }
      cancelApply(id, { status: '5' }).then(() => {
        successToast('提交成功！等待雇主确认')
        this.init()
      })
    },
    cancel(id, orderStatus, workStatus) {
      if (
        workStatus != 2 ||
        orderStatus == 1 ||
        orderStatus == 3 ||
        orderStatus == 4
      ) {
        return
      }
      cancelApply(id, { status: '4' }).then(() => {
        successToast('取消成功！')
        this.init()
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
