<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-01 20:09:50
-->
<template>
  <view>
    <view
      v-for="(item, index) in initData"
      :key="index"
      class="container m-10"
      @click="clickToDetails(item)"
    >
      <u-swipe-action>
        <u-swipe-action-item :options="options">
          <touch-hover>
            <view class="box">
              <view class="box-left">
                <view class="name">{{ item.content }}</view>
                <text class="status"
                  >状态：<text>{{ item.status }}</text></text
                >
                <text class="type"
                  >类型：<text>{{ item.type }}</text></text
                >
              </view>
              <view class="box-right">
                <view class="payMent">{{ item.payMent }}</view>

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
</template>

<script>
import touchHover from '../../components/touch-hover/touch-hover.vue'
export default {
  components: { touchHover },
  data() {
    return {
      initData: [
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          number: 0,
          status: '招聘中',
        },
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          number: 1,
          status: '招聘中',
        },
        {
          content: '前端开发工程师',
          employer: '阿里巴巴（杭州）',
          type: '全职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '杭州',
          education: '本科',
          payMent: '15k-20k',
          scale: '500-999人',
          cash: '30元',
          number: 2,
          isReturnCash: false,
          status: '招聘中',
        },
      ],
      options: [
        {
          text: '停止招聘',
        },
      ],
    }
  },
  methods: {
    // 兼容小程序的空函数
    emptyF() {},
    clickToDetails(item) {
      if (item.type === '全职') {
        uni.navigateTo({
          url: `/pages/components/fullTime-details/index?data=${JSON.stringify(
            item
          )}&key=myRealease`,
        })
      } else {
        uni.navigateTo({
          url: `/pages/components/partTime-details/index?data=${JSON.stringify(
            item
          )}&key=myRealease`,
        })
      }
    },
    clickToCandidate(number) {
      uni.navigateTo({
        url: '/pages/my-release/candidate/index?number=number',
      })
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
