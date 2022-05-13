<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-21 18:35:48
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 16:17:39
-->
<template>
  <view>
    <toast></toast>
    <view v-if="initData.length">
      <view
        v-for="(item, index) in initData"
        :key="index"
        class="container m-10"
        @click="clickToDetails(item, index)"
        ><u-swipe-action>
          <div @click.stop="cancel(item)">
            <u-swipe-action-item :options="options">
              <view class="box">
                <view class="box-left">
                  <text class="name">{{ item.toName }}</text>
                  <text class="status" :class="[getColor(item.status)]">{{
                    getStatus(item.status)
                  }}</text>
                  <view class="content"
                    >岗位（工作内容）：<text class="detail">{{
                      item.work
                    }}</text></view
                  >
                </view>
                <view class="box-right">
                  <u-icon name="arrow-right"></u-icon>
                </view>
              </view>
            </u-swipe-action-item>
          </div> </u-swipe-action
      ></view>
    </view>
    <u-empty text="暂无投诉" v-else></u-empty>
  </view>
</template>
<script>
import minix from './minix/index.js'
import { getMyComplainList, cancelComplain } from '@/api/complain.js'
import { mapState } from 'vuex'
import { errorToast, successToast } from '@/components/toast/index.js'

export default {
  name: 'complainant',
  mixins: [minix],
  data() {
    return {
      options: [
        {
          text: '撤销',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ],
      initData: []
    }
  },
  computed: {
    ...mapState('appState', ['userInfo', 'identity'])
  },
  onLoad() {
    getMyComplainList(
      this.userInfo.id.toString(),
      this.identity == 'student' ? '1' : '2'
    ).then(({ data }) => {
      this.initData = data
    })
  },
  methods: {
    cancel(item, index) {
      if (item.status == '3' || item.status == '4') {
        errorToast('投诉已完成，无法撤销！')
      } else {
        cancelComplain(item.id, { ...item, status: '5' }).then(() => {
          successToast('撤销成功！')
          this.initData[index].status = '5'
        })
      }
    },
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/complain-manage/details/index?data=${JSON.stringify(item)}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
