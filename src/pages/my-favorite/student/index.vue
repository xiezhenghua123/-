<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-23 15:03:05
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-26 21:14:09
-->
<template>
  <view>
    <view
      v-for="(item, index) in allData"
      :key="index"
      class="container m-10"
      @click="clickToDetails(item)"
    >
      <u-swipe-action>
        <u-swipe-action-item :options="options">
          <touch-hover>
            <view class="box">
              <view class="box_left">
                <view class="content">{{ item.content }}</view>
                <text class="name">{{ item.employer }}</text>
                <text class="type">{{ item.type }}</text>
              </view>
              <view class="box_right">
                <view class="payment">{{ item.payMent }}</view>
                <view class="button" @click.native.stop="relation">
                  <u-button text="我要应聘" type="primary"></u-button>
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
import touchHover from '../../../components/touch-hover/touch-hover.vue'
export default {
  components: { touchHover },
  name: 'student-favorite',
  data() {
    return {
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d',
          },
        },
      ],
      // 兼职
      partTime: [
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
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
          status: '招聘中',
        },
      ],
      // 全职
      fullTime: [
        {
          content: '前端开发工程师',
          employer: '阿里巴巴（杭州）',
          type: '全职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '杭州',
          education: '本科',
          payMent: '15k-20k',
          scale: '500-999人',
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
          status: '招聘中',
        },
      ],
    }
  },
  computed: {
    allData() {
      return [...this.fullTime, ...this.partTime]
    },
  },
  methods: {
    relation() {},
    clickToDetails(item) {
      if (item.type === '全职') {
        uni.navigateTo({
          url: `/pages/components/fullTime-details/index?data=${JSON.stringify(
            item
          )}&key=myFavorite`,
        })
      } else {
        uni.navigateTo({
          url: `/pages/components/partTime-details/index?data=${JSON.stringify(
            item
          )}&key=myFavorite`,
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../style.scss';
</style>
