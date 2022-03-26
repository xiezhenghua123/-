<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-23 20:48:10
-->
<template>
  <view>
    <company-favorite v-if="identity === 'company'"></company-favorite>
    <student-favorite v-else></student-favorite>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import companyFavorite from './company/index.vue'
import studentFavorite from './student/index.vue'
export default {
  components: {
    companyFavorite,
    studentFavorite,
  },
  computed: {
    ...mapState('appState', ['identity']),
  },
}
</script>

<style></style>
