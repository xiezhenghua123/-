<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-23 15:02:59
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-26 15:03:37
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
          <view class="box flex-column">
            <view class="box-top">
              <view class="name">{{ item.name }} </view>
              <view class="maxEducation">{{ item.maxEducation }}</view>
            </view>
            <view class="box-bottom">
              <view class="job">
                期望岗位：<text>{{ item.job }}</text>
              </view>
              <view class="salary">
                期望薪资：<text>{{ item.salary }}</text>
              </view>
            </view>
          </view>
        </u-swipe-action-item>
      </u-swipe-action>
    </view>
  </view>
</template>
<script>
import data from '../../my-resume/data.js'

export default {
  name: 'company-favorite',
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
      initData: [
        {
          name: '张三',
          job: '产品经理',
          maxEducation: '本科',
          salary: '10k-15k',
        },
        {
          name: '李四',
          job: '前端开发',
          maxEducation: '硕士',
          salary: '10k-20k',
        },
      ],
    }
  },
  onLoad() {},
  methods: {
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/components/person-details/index?data=${JSON.stringify(
          data
        )}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../style.scss';
.flex-column {
  flex-direction: column;
}
.box {
  align-items: stretch;
  &-top {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;
    .name {
      font-weight: bold;
      color: $uni-text-color;
    }
    .maxEducation {
      font-weight: bold;
      color: #02a7f0;
    }
  }
  &-bottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
