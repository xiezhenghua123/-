<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-21 18:35:48
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-10 16:21:08
-->
<template>
  <view>
    <view v-if="initData.length">
      <view
        v-for="(item, index) in initData"
        :key="index"
        class="container m-10"
        @click="clickToDetails(item)"
        ><u-swipe-action>
          <u-swipe-action-item :options="options">
            <view class="box">
              <view class="box-left">
                <text class="name">{{ item.complainant }}</text>
                <text class="status" :class="[getColor(item.status)]">{{
                  getStatus(item.status)
                }}</text>
                <view class="content"
                  >岗位（工作内容）：<text class="detail">{{
                    item.content
                  }}</text></view
                >
              </view>
              <view class="box-right">
                <u-icon name="arrow-right"></u-icon>
              </view>
            </view>
          </u-swipe-action-item> </u-swipe-action
      ></view>
    </view>
    <u-empty text="暂无投诉" v-else></u-empty>
  </view>
</template>
<script>
import minix from './minix/index.js'
import { getMyComplainList } from '@/api/complain.js'
import { mapState } from 'vuex'

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
      this.identity == 'student' ? 1 : 2
    ).then(({ data }) => {
      this.initData = data
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
