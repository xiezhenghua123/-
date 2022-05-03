<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 22:44:11
-->
<template>
  <view>
    <toast></toast>
    <view v-if="initData.length">
      <view
        v-for="(item, index) in initData"
        :key="index"
        class="container m-10"
      >
        <u-swipe-action>
          <u-swipe-action-item :options="options" @click="del(item)">
            <touch-hover>
              <view class="box" @click.stop="clickToDetails(item)">
                <view class="box-left">
                  <view class="name">{{ item.content }}</view>
                  <view class="flex">
                    <u-avatar :src="item.avatar" size="24"></u-avatar>
                    <text class="ml-10">{{ item.name }}</text>
                    <text class="type" style="margin-right: 20px"
                      >类型：<text>{{
                        item.order_type == 'partTime' ? '兼职' : '全职'
                      }}</text></text
                    >
                  </view>
                </view>
                <view class="box-right">
                  <view class="payMent">{{
                    item.order_type == 'partTime'
                      ? item.salary + '元'
                      : salary(item.salary)
                  }}</view>

                  <view
                    class="button"
                    @click.native.stop="clickToCandidate(item)"
                  >
                    <u-button text="查看应聘者" type="primary"></u-button>
                  </view>
                </view>
              </view>
            </touch-hover>
          </u-swipe-action-item>
        </u-swipe-action>
      </view>
    </view>
    <u-empty text="暂无数据" v-else mode="data"></u-empty>
  </view>
</template>

<script>
import touchHover from '../../components/touch-hover/touch-hover.vue'
import { getMyReleaseJob, delJob } from '@/api/recruit.js'
import { mapState } from 'vuex'
import { successToast } from '@/components/toast/index.js'
export default {
  components: { touchHover },
  data() {
    return {
      initData: [],
      options: [
        {
          text: '停止招聘'
        }
      ]
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('appState', ['userInfo', 'identity'])
  },
  methods: {
    salary(salary) {
      return `${JSON.parse(salary).min}k-${JSON.parse(salary).max}k`
    },
    getData() {
      getMyReleaseJob(this.userInfo.openid).then(({ data }) => {
        this.initData = data
          .filter(item => {
            if (this.identity == 'student') {
              return item.user_type == '1'
            } else {
              return item.user_type == '2'
            }
          })
          .map(item => {
            return {
              ...item,
              name: this.userInfo.name,
              avatar: this.userInfo.avatar
            }
          })
      })
    },
    del(item) {
      delJob(item.id).then(() => {
        let text
        if (item.order_type == 'partTime') {
          text = '职位下架成功！职位薪酬和服务费正在返还中'
        } else {
          text = '职位下架成功！服务费正在返还中'
        }
        successToast(text, {
          loading: true,
          type: 'loading',
          complete: () => {
            successToast('返还成功！')
          }
        })
        this.getData()
      })
    },
    // 兼容小程序的空函数
    emptyF() {},
    clickToDetails(item) {
      if (item.order_type === 'fullTime') {
        uni.navigateTo({
          url: `/pages/components/fullTime-details/index?id=${item.id}&key=releaseOrder`
        })
      } else {
        uni.navigateTo({
          url: `/pages/components/partTime-details/index?id=${item.id}&key=releaseOrder`
        })
      }
    },
    clickToCandidate(item) {
      uni.navigateTo({
        url: `/pages/my-release/candidate/index?id=${item.id}`
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

  .type {
    margin-left: 10px;
  }
  .payMent {
    color: #02a7f0;
    margin-bottom: 8px;
    font-weight: bold;
  }
}
</style>
