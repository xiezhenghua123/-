<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 22:45:25
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
        <u-swipe-action>
          <u-swipe-action-item
            :options="item.type === '兼职' ? optionsPart : optionsFull"
          >
            <touch-hover>
              <view class="box">
                <view class="box-left">
                  <view class="flex">
                    <view class="name">{{ item.content }}</view>
                    <view class="tag ml-10">
                      <u-text
                        :text="item.status"
                        type="primary"
                        size="12"
                        bold
                      ></u-text>
                    </view>
                  </view>
                  <text class="type"
                    ><text>{{ item.type }}</text></text
                  >
                </view>
                <view class="box-right">
                  <view class="payMent">{{ item.payMent }}</view>
                  <view>
                    <view
                      class="button"
                      @click.native.stop="complete"
                      v-if="item.type === '兼职'"
                    >
                      <u-button text="确认完成" type="primary"></u-button>
                    </view>
                    <view class="button" @click.native.stop="cancel" v-else>
                      <u-button text="取消应聘" type="primary"></u-button>
                    </view>
                  </view>
                </view>
              </view>
            </touch-hover>
          </u-swipe-action-item>
        </u-swipe-action>
      </view>
    </view>
    <u-empty text="暂无应聘职位"></u-empty>
  </view>
</template>

<script>
import touchHover from '../../../../components/touch-hover/touch-hover.vue'
import { getApplyJobList } from '@/api/applyJob.js'
import { mapState } from 'vuex'
export default {
  components: { touchHover },
  data() {
    return {
      optionsFull: [
        {
          text: '删除',
          style: {
            backgroundColor: '#f56c6c'
          }
        }
      ],
      optionsPart: [
        {
          text: '删除',
          style: {
            backgroundColor: '#f56c6c'
          }
        },
        {
          text: '取消应聘'
        }
      ],
      initData: []
    }
  },
  mounted() {
    getApplyJobList(this.userInfo.id).then(({ data }) => {
      this.initData = data
    })
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    // 兼容小程序的空函数
    emptyF() {},
    clickToDetails(item) {
      if (item.type === '全职') {
        uni.navigateTo({
          url: `/pages/components/fullTime-details/index?data=${JSON.stringify(
            item
          )}&key=applyOrder`
        })
      } else {
        uni.navigateTo({
          url: `/pages/components/partTime-details/index?data=${JSON.stringify(
            item
          )}&key=applyOrder`
        })
      }
    },
    complete() {},
    cancel() {}
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
