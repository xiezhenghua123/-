<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-09 20:57:07
-->
<template>
  <view>
    <my-release></my-release>
    <!-- <completed v-else>已完成</completed> -->
  </view>
</template>
<script>
import myRelease from '@/pages/my-release/index.vue'
// import completed from '../student/completed/index.vue'

export default {
  components: { myRelease },
  data() {
    return {}
  },
  methods: {
    // click(data) {
    //   this.current = data.index
    // }
  }
}
</script>
