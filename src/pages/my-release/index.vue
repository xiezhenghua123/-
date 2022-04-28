<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-28 18:35:05
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
        <u-swipe-action>
          <u-swipe-action-item :options="options" @click="del(item.id)">
            <touch-hover>
              <view class="box">
                <view class="box-left">
                  <view class="name">{{ item.content }}</view>
                  <!-- <text class="status"
                  >状态：<text>{{ item.status }}</text></text
                > -->
                  <text class="type"
                    >类型：<text>{{ item.type }}</text></text
                  >
                </view>
                <view class="box-right">
                  <view class="payMent">{{ item.salary }}</view>

                  <view
                    class="button"
                    @click.native.stop="clickToCandidate(item.number)"
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
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    getData() {
      getMyReleaseJob(this.userInfo.uuid).then(data => {
        console.log(data)
      })
    },
    del(id) {
      delJob(id).then(() => {
        successToast(' 职位下架成功!')
        this.getData()
      })
    },
    // 兼容小程序的空函数
    emptyF() {},
    clickToDetails(item) {
      if (item.type === '全职') {
        uni.navigateTo({
          url: `/pages/components/fullTime-details/index?data=${JSON.stringify(
            item
          )}&key=myRealease`
        })
      } else {
        uni.navigateTo({
          url: `/pages/components/partTime-details/index?data=${JSON.stringify(
            item
          )}&key=myRealease`
        })
      }
    },
    clickToCandidate(number) {
      uni.navigateTo({
        url: '/pages/my-release/candidate/index?number=number'
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
