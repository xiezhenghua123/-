<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-23 15:02:59
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-02 22:52:26
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
          <u-swipe-action-item :options="options" @click="cancel(item)">
            <view class="box" @click="clickToDetails(item)">
              <view class="box-left">
                <view class="flex mb-10">
                  <u-avatar :src="item.avatar" size="24"></u-avatar>
                  <view class="name ml-10">{{ item.name }} </view>
                </view>
                <view class="expect">
                  <view class="job mr-10">
                    <text>期望岗位：{{ item.position }}</text>
                  </view>
                  <view class="salary">
                    <text>期望薪酬:{{ item.salary }}</text>
                  </view>
                </view>
              </view>
              <view class="flex">
                <view class="box-right">
                  <view class="maxEducation">{{ item.education }}</view>
                  <view class="button" @click.stop="enterChat(item)">
                    <u-button text="联系" type="primary"></u-button>
                  </view>
                </view>
              </view>
            </view>
          </u-swipe-action-item>
        </u-swipe-action>
      </view>
    </view>
    <u-empty v-else></u-empty>
  </view>
</template>
<script>
import { collect, cancelCollect, getCollect } from '@/api/resume.js'
import { successToast } from '@/components/toast/index'
import { mapState } from 'vuex'
export default {
  name: 'company-favorite',
  data() {
    return {
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ],
      initData: []
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  mounted() {
    getCollect(this.userInfo.id).then(({ data }) => {
      this.initData = data
    })
  },
  methods: {
    cancel(item) {
      cancelCollect(item.id.toString(), this.userInfo.id.toString()).then(
        () => {
          successToast('删除成功！')
          getCollect(this.userInfo.id).then(({ data }) => {
            this.initData = data
          })
        }
      )
    },
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/components/person-details/index?data=${JSON.stringify(
          item
        )}`
      })
    },
    enterChat(item) {
      this.$methods.chat.enterChat({
        uuid: item.openid + item.worker_id,
        name: item.name,
        avatar: item.avatar
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style.scss';
.flex-column {
  flex-direction: column;
}
.box {
  &-left {
    display: flex;
    flex-direction: column;
    margin-bottom: 20rpx;
    .name {
      font-size: 16px;
      font-weight: bold;
      color: $uni-text-color;
    }
    .expect {
      display: flex;
    }
  }
  &-right {
    display: flex;
    font-size: 16px;
    flex-direction: column;
    align-items: center;
    .maxEducation {
      font-weight: bold;
      color: #02a7f0;
      margin-bottom: 8px;
    }
  }
}
</style>
