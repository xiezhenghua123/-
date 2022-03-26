<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-26 15:48:08
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-26 21:14:49
-->
<template></template>
<script></script>
<style></style>
<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-26 20:23:59
-->
<template>
  <view>
    <view
      v-for="(item, index) in initData"
      :key="index"
      class="container m-10"
      @click="clickToDetails(item)"
    >
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

            <view class="button" @click.native.stop="complete">
              <u-button
                :disabled="
                  item.status === '面试完成' || item.status === '已完成'
                "
                text="确认完成"
                :type="
                  item.status === '已完成' || item.status === '面试完成'
                    ? 'info'
                    : 'primary'
                "
              ></u-button>
            </view>
          </view>
        </view>
      </touch-hover>
    </view>
  </view>
</template>

<script>
import touchHover from '../../../../components/touch-hover/touch-hover.vue'
export default {
  components: { touchHover },
  data() {
    return {
      initData: [
        {
          content: '前端开发工程师',
          employer: '阿里巴巴（杭州）',
          candidate: '郭小天',
          type: '全职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '杭州',
          education: '本科',
          payMent: '15k-20k',
          scale: '500-999人',
          status: '面试完成',
        },
        {
          content: '前端开发工程师',
          employer: '阿里巴巴（杭州）',
          type: '全职',
          candidate: '黄大熊',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '杭州',
          education: '本科',
          payMent: '15k-20k',
          scale: '500-999人',
          status: '面试中',
        },
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          candidate: '李四',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          education: '本科',
          status: '进行中',
        },
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          candidate: '李四',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          education: '不限',
          status: '已完成',
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
          )}&key=applyOrder`,
        })
      } else {
        uni.navigateTo({
          url: `/pages/components/partTime-details/index?data=${JSON.stringify(
            item
          )}&key=applyOrder`,
        })
      }
    },
    complete() {},
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
