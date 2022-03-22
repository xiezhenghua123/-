<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-22 22:37:41
-->
<template>
  <view>
    <u-sticky bgColor="#fff">
      <u-tabs
        :list="list"
        :current="current"
        @click="click"
        :activeStyle="activeStyle"
      ></u-tabs>
    </u-sticky>
    <be-complainant v-if="current === 1"></be-complainant>
    <complainant v-else></complainant>
  </view>
</template>

<script>
import beComplainant from './beComplainant/index.vue'
import complainant from './complainant/index.vue'
export default {
  components: {
    beComplainant,
    complainant,
  },
  data() {
    return {
      activeStyle: {
        'font-weight': 'bold',
        color: '#303133',
      },
      current: 0,
      list: [{ name: '投诉方' }, { name: '被投诉方' }],
    }
  },
  methods: {
    click(data) {
      this.current = data.index
    },
  },
}
</script>

<style></style>
