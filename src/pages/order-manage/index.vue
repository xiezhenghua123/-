<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-26 15:40:28
-->
<template>
  <view>
    <student v-if="identity === 'student'"></student>
    <company v-else></company>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import student from './student/index.vue'
import company from './company/index.vue'
export default {
  components: {
    student,
    company,
  },
  computed: {
    ...mapState('appState', ['identity']),
  },
}
</script>

<style></style>
